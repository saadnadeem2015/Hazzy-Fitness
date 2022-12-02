from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import serializers, status
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.utils import timezone

import datetime as dt

from membership.api.v1.serializers import (
    SubscriptionPlanSerializer,
    UserMembershipSerializer,
    PaymentMethodSerializer,
)
from membership.models import (
                               SubscriptionPlan,
                               UserMembership,
                               PaymentMethod,
                               )
from django.db.models import F, Case, When, Value, IntegerField
from decimal import *
from membership.helpers import *
from django.core.mail import send_mail


class SubscriptionPlanViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = SubscriptionPlan.objects.all()
    http_method_names = ["get"]
    paginator = None

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)


class UserMembershipViewSet(ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserMembership.objects.all()
    http_method_names = ["get"]
    paginator = None

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def list(self, request):
        return Response(UserMembershipSerializer(request.user.active_membership).data)


class SubscribeViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        try:
            plan_id = int(request.data['plan_id'])
            sub_plan = SubscriptionPlan.objects.get(id=plan_id)
        except:
            return Response({
                'Error': 'Kindly provide a valid plan id.'
            }, 400)

        try:
            card_id = request.data['card_id']
        except:
            card_id = None

        if card_id:
            if request.user.stripe_cust_id:
                stripe_user_id = request.user.stripe_cust_id
            else:
                stripe_user_id = create_stripe_customer(request.user.name, request.user.email)

            stripe_sub = stripe_subscribe_customer(
                stripe_user_id,
                sub_plan.stripe_price_id,
                card_id,
            )
            request.user.stripe_cust_id = stripe_user_id
            request.user.save()

            new_membership = UserMembership.objects.create(
                plan=sub_plan,
                start_date=dt.datetime.fromtimestamp(int(stripe_sub['current_period_start'])),
                end_date=dt.datetime.fromtimestamp(int(stripe_sub['current_period_end'])),
                stripe_sub_id=stripe_sub['id'],
                is_stripe_active=True
            )
        else:
            return Response({
                'Error': 'Kindly provide a valid card ID'
            }, 400)
        request.user.active_membership = new_membership
        request.user.save()

        return Response(UserMembershipSerializer(new_membership).data)


class CancelSubscriptionViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        if request.user.active_membership:
            result = cancel_stripe_subscription(request.user.active_membership.stripe_sub_id)
            if result['canceled_at']:
                request.user.active_membership.canceled_at = dt.datetime.fromtimestamp(int(result['canceled_at']))
                #request.user.active_membership.is_stripe_active = False
                request.user.active_membership.save()
            else:
                return Response({
                    'Error': 'Failed To Cancel Subscription'
                }, 400)

            return Response(UserMembershipSerializer(request.user.active_membership).data)
        else:
            return Response({
                'Error': 'User Does not have any active subscription'
            }, 400)


class PaymentMethodViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post", "get"]

    def create(self, request):
        try:
            card_number = request.data['card_number']
            expiry_date_month = request.data['expiration_month']
            expiry_date_year = request.data['expiration_year']
            security_code = request.data['security_code']
            card_holder_name = request.data['card_holder']
        except:
            return Response({
                'Error': 'Kindly provide valid card info.'
            }, 400)

        if card_number and expiry_date_month and expiry_date_year and security_code and card_holder_name:
            if request.user.stripe_cust_id is not None:
                cust_id = request.user.stripe_cust_id
            else:
                cust_id = create_stripe_customer(request.user.name, request.user.email)
                request.user.stripe_cust_id = cust_id
                request.user.save()
            stripe_payment_id = create_stripe_payment_card(
                card_number,
                expiry_date_month,
                expiry_date_year,
                security_code,
                cust_id
            )

            new_payment_method = PaymentMethod.objects.create(
                card_number=card_number[-4:],
                expiry_date_month=expiry_date_month,
                expiry_date_year=expiry_date_year,
                security_code=security_code,
                card_holder_name=card_holder_name,
                stripe_id=stripe_payment_id
            )
            request.user.payment_method = new_payment_method
            request.user.save()
            request.user.payment_cards.add(new_payment_method)
            return Response(PaymentMethodSerializer(request.user.payment_cards, many=True).data)
        else:
            return Response({
                'Error': 'Kindly provide full card info.'
            }, 400)

    def list(self, request):
        return Response(PaymentMethodSerializer(request.user.payment_cards, many=True).data)


class SetDefaultCardViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        try:
            card_id = request.data['card_id']
        except:
            return Response({
                'Error': 'Kindly provide card ID.'
            }, 400)

        try:
            card = PaymentMethod.objects.get(id=card_id)
        except:
            return Response({
                'Error': 'Invalid Card ID'
            }, 400)

        query = request.user.payment_cards.filter(is_default=True)
        for item in query:
            item.is_default = False
            item.save()

        card.is_default = True
        card.save()

        return Response(
            PaymentMethodSerializer(card).data
        )


class DeletePaymentCardViewSet(ViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        try:
            card_id = request.data['card_id']
        except:
            return Response({
                'Error': 'Kindly provide card ID.'
            }, 400)

        try:
            card = PaymentMethod.objects.get(id=card_id)
        except:
            return Response({
                'Error': 'Invalid Card ID'
            }, 400)

        query = request.user.payment_cards.filter(is_default=False).exclude(id=card_id)

        if len(query) > 0:
            next_card = query.first()
            next_card.default = True
            next_card.save()

        card.delete()

        return Response(
            PaymentMethodSerializer(card).data
        )
