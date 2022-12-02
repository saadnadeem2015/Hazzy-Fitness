from rest_framework import serializers
from membership.models import SubscriptionMedia, SubscriptionPlan, UserMembership, PaymentMethod


class SubscriptionMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionMedia
        fields = '__all__'


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    plan_media = SubscriptionMediaSerializer(many=True, read_only=True)

    class Meta:
        model = SubscriptionPlan
        fields = '__all__'


class SubscriptionPlanChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ('id', 'plan_name', 'monthly_price', 'total_price')


class UserMembershipSerializer(serializers.ModelSerializer):
    plan = SubscriptionPlanChangeSerializer(read_only=True)

    class Meta:
        model = UserMembership
        fields = '__all__'


class ActiveSubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'


class UserActiveMembershipSerializer(serializers.ModelSerializer):
    plan = ActiveSubscriptionPlanSerializer(read_only=True)

    class Meta:
        model = UserMembership
        fields = ('plan', )


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
