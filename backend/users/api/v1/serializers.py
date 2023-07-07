from rest_framework import serializers
from users.models import (
    User,
    PasswordResetToken,
    Gender,
    Country,
    AccountVerifyToken
)

from membership.api.v1.serializers import *


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'


class UserBriefSerializer(serializers.ModelSerializer):
    sex = GenderSerializer(read_only=True)
    country = CountrySerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'sex', 'country', 'is_verified']


class UserInfoSerializer(serializers.ModelSerializer):
    sex = GenderSerializer(read_only=True)
    sex_id = serializers.PrimaryKeyRelatedField(write_only=True, source='sex', queryset=Gender.objects.all())

    country = GenderSerializer(read_only=True)
    country_id = serializers.PrimaryKeyRelatedField(write_only=True, source='country', queryset=Country.objects.all())

    active_membership = UserActiveMembershipSerializer(read_only=True)
    memberships = UserActiveMembershipSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id',
                  'email',
                  'name',
                  'profile_image',
                  'sex',
                  'sex_id',
                  'country',
                  'country_id',
                  'user_questionnaire',
                  'goal_calories',
                  'goal_protein',
                  'goal_carbohydrates',
                  'goal_fats',
                  'active_membership',
                  'memberships',
                  'is_verified'
                  ]


class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['id', 'expiry_date']


class AccountVerifyTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountVerifyToken
        fields = '__all__'


class PasswordResetTokenVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['id', 'requested_user', 'expiry_date']
