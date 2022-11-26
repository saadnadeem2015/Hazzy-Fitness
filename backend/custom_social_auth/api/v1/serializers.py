from rest_framework import serializers
from custom_social_auth.models import FacebookAccount


class FacebookAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacebookAccount
        fields = "__all__"
