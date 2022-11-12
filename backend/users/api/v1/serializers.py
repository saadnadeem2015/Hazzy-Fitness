from rest_framework import serializers
from users.models import (
    User,
    PasswordResetToken,
    Gender,
    Country
)


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'


class UserBriefSerializer(serializers.ModelSerializer):
    gender = GenderSerializer(read_only=True)
    country = CountrySerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'gender', 'country']


class UserInfoSerializer(serializers.ModelSerializer):
    gender = GenderSerializer(read_only=True)
    gender_id = serializers.PrimaryKeyRelatedField(write_only=True, source='gender', queryset=Gender.objects.all())

    country = GenderSerializer(read_only=True)
    country_id = serializers.PrimaryKeyRelatedField(write_only=True, source='country', queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ['id',
                  'email',
                  'name',
                  'profile_image',
                  'gender',
                  'gender_id',
                  'country',
                  'country_id',
                  'user_questionnaire',
                  'goal_calories',
                  'goal_protein',
                  'goal_carbohydrates',
                  'goal_fats',
                  ]


class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['id', 'expiry_date']


class PasswordResetTokenVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['id', 'requested_user', 'expiry_date']
