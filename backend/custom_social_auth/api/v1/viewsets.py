from rest_framework import authentication
from custom_social_auth.models import FacebookAccount
from .serializers import FacebookAccountSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet, ViewSet
from datetime import datetime
from custom_social_auth.models import FacebookAccount
from allauth.utils import generate_unique_username
from rest_framework.authtoken.models import Token
from users.api.v1.serializers import UserInfoSerializer

import facebook

User = get_user_model()


class FacebookConnectViewSet(ViewSet):
    serializer_class = FacebookAccountSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [permissions.AllowAny]
    http_method_names = ["post"]

    def create(self, request):
        try:
            access_token = request.data['access_token']
        except:
            return Response({
                'Error': 'Please provide the facebook access token.'
            })

        try:
            graph = facebook.GraphAPI(access_token=access_token, version="2.12")
        except:
            return Response({
                'Error': 'Invalid Access Token, Facebook error.'
            }, 400)

        data = graph.get_object(id='me', fields=('id', 'email'))
        if "id" in data:
            user_fb_id = data['id']
            local_facebook = FacebookAccount.objects.filter(app_id=user_fb_id)
            if len(local_facebook) > 0:
                local_facebook = local_facebook.first()
            else:
                if "email" in data:
                    user_email = data['email']
                    user = User(
                        email=user_email,
                        username=generate_unique_username([
                            user_fb_id,
                            user_email,
                            'user'
                        ])
                    )
                    user.save()

                    local_facebook = FacebookAccount.objects.create(
                        app_id=user_fb_id,
                        email=user_email,
                        user=user
                    )
                else:
                    return Response({
                        'Error': 'Facebook not returning enough data, no email provided.'
                    }, 400)

            token, created = Token.objects.get_or_create(user=local_facebook.user)

            return Response({
                'token': token.key,
                "user": UserInfoSerializer(local_facebook.user).data
            })
