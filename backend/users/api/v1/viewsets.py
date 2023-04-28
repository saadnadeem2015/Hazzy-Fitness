from rest_framework import viewsets, generics, permissions, serializers, authentication
from rest_framework.pagination import PageNumberPagination
from .serializers import (
    UserInfoSerializer,
    PasswordResetTokenSerializer,
    PasswordResetTokenVerifySerializer,
    GenderSerializer,
    CountrySerializer,
    AccountVerifyTokenSerializer
)
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.viewsets import ViewSet
import re
from users.models import (
    User,
    PasswordResetToken,
    Gender,
    Country,
    AccountVerifyToken
)
from datetime import datetime, timedelta
import random as r
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.contrib.gis.measure import D, Distance
from django.utils.translation import gettext as _

import base64
from django.core.files.base import ContentFile
from django.conf import settings

from .helper import calculate_age, calculate_user_numbers_updated


class GenderViewSet(viewsets.ModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "post"]


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "patch"]

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user and pk == "me":
            return Response(UserInfoSerializer(request.user).data)
        return super(UserViewSet, self).retrieve(request, pk)


class UpdateProfilePictureViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser,)
    serializer_class = UserInfoSerializer


class CustomChangePasswordViewSet(ViewSet):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        current_password = request.data['current_password']
        new_password1 = request.data['new_password1']
        new_password2 = request.data['new_password2']

        if new_password1 != new_password2:
            return Response({
                'Error': 'New Password is not matching.'
            }, 400)

        if not request.user.check_password(current_password):
            return Response({
                'Error': 'Incorrect Password.'
            }, 400)

        if re.search('[A-Z]', new_password1) == None:
            return Response({
                'Error': 'This password is not strong'
            }, 400)
        elif re.search('[0-9]', new_password1) == None:
            return Response({
                'Error': 'This password is not strong. Add a number'
            }, 400)
        elif len(new_password1) < 8:
            return Response({
                'Error': 'This password is too short, 8 characters is the minimum.'
            }, 400)

        request.user.set_password(new_password1)
        request.user.save()

        return Response({
            'Message': 'Password Changed Successfully.'
        }, 200)


class PasswordResetRequestViewSet(ViewSet):
    serializer_class = PasswordResetTokenSerializer

    def create(self, request):
        try:
            user_email = request.data['user_email']
            request_user = User.objects.get(email=user_email)
        except:
            return Response({
                'Error': 'Invalid Email.'
            }, 400)
        random_token = str(r.randint(1000, 9999))
        # Look for old tokens
        my_token = PasswordResetToken.objects.filter(requested_user=request_user, expiry_date__gte=datetime.now())

        if len(my_token) > 0:
            my_token = my_token.first()
            random_token = str(my_token.token)
        else:

            my_token = PasswordResetToken.objects.create(
                requested_user=request_user,
                token=int(random_token),
                expiry_date=datetime.now() + timedelta(days=2)
            )
            random_token = str(my_token.token)

        email_content = '''
        Hello,

        You requested password reset for User email: {0}
        Please enter this token in your app: {1}
                '''.format(user_email, random_token)
        try:
            send_mail('Password Reset Token', email_content, settings.DEFAULT_FROM_EMAIL,
                      [user_email], fail_silently=False)
        except:
            return Response({
                'Error': 'Failed to send the email.'
            }, 404)

        return Response(PasswordResetTokenSerializer(my_token).data)


class VerifyResetTokenViewSet(ViewSet):
    serializer_class = PasswordResetTokenSerializer

    def create(self, request):
        try:
            token = request.data['token']
            my_token = PasswordResetToken.objects.get(token=token, expiry_date__gte=datetime.now())
        except:
            return Response({
                'Error': 'Invalid token.'
            }, 400)

        return Response(AccountVerifyTokenSerializer(my_token).data)


class VerifyAccountViewSet(ViewSet):
    serializer_class = AccountVerifyTokenSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            token = request.data['token']
            my_token = AccountVerifyToken.objects.get(token=token, requested_user=request.user)
            my_token.requested_user.is_verified = True
            my_token.requested_user.save()
        except:
            return Response({
                'Error': 'Invalid token.'
            }, 400)

        return Response(UserInfoSerializer(request.user).data)


class ConfirmPasswordResetViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        try:
            new_password = request.data['new_password']
        except:
            return Response({
                'Error': 'Invalid Password.'
            }, 400)
        try:
            reset_token_id = request.data['reset_token_id']
            reset_token = PasswordResetToken.objects.get(id=int(reset_token_id))
        except:
            return Response({
                'Error': 'Invalid token ID.'
            }, 400)

        user = reset_token.requested_user
        user.set_password(new_password)
        user.save()
        reset_token.delete()
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserInfoSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class UpdateUserMacrosViewSet(ViewSet):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        qu = request.user.user_questionnaire
        complete = qu.birth_date and qu.life_style and qu.weight and qu.weight_unit and qu.height and qu.height_unit
        complete = complete and qu.activity_level and qu.workout_availability and qu.goal
        if complete:
            age = calculate_age(qu.birth_date)
            result = calculate_user_numbers_updated(
                age,
                request.user.gender.name.lower(),
                qu.weight,
                qu.weight_unit.name,
                qu.height,
                qu.height_unit.name,
                qu.activity_level.value,
                qu.goal.value,
            )
            request.user.goal_calories = str(result[0]).replace(",", "")
            request.user.goal_protein = str(result[1]).replace(",", "")
            request.user.goal_carbohydrates = str(result[2]).replace(",", "")
            request.user.goal_fats = str(result[3]).replace(",", "")
            request.user.save()

            return Response(UserInfoSerializer(request.user).data)
        else:
            return Response({
                'Error': 'Please Complete your profile first!'
            }, 400)
