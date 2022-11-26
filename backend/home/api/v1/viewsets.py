from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions

from home.api.v1.serializers import (
    SignupSerializer,
    UserSerializer,
    NotificationSerializer,
    FeedbackSerializer
)
from rest_framework.pagination import PageNumberPagination
from home.models import Notification, Feedback

from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .serializers import CustomAppleSocialLoginSerializer


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class ListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class NotificationListViewSet(generics.ListAPIView):
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = ListPagination
    queryset = Notification.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        query = Notification.objects.filter(to_user=user)

        try:
            is_read = str(self.request.GET.get('is_read'))
        except:
            is_read = None

        if is_read:
            if is_read == "true":
                query = query.filter(is_read=True)
            elif is_read == "false":
                query = query.filter(is_read=False)

        query = query.order_by('-created_at')

        return query


class ReadNotificationViewSet(ViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def create(self, request):
        try:
            notification_ids = list(request.data['notification_ids'])
        except:
            return Response({
                'Error': 'Invalid Notification IDs.'
            }, 400)

        try:
            notifications = Notification.objects.filter(id__in=notification_ids)
        except:
            return Response({
                'Error': 'Can not find the notifications.'
            }, 400)

        notifications.update(is_read=True)

        return Response(NotificationSerializer(notifications, many=True).data)


class FeedbackViewSet(ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        try:
            email = request.data['email']
        except:
            return Response({
                'Error': 'Invalid title'
            }, 400)

        try:
            message = request.data['message']
        except:
            return Response({
                'Error': 'Invalid message'
            }, 400)

        feedback = Feedback.objects.create(
            email=email,
            message=message,
            feedback_by=request.user
        )
        return Response(FeedbackSerializer(feedback).data)


class GoogleLogin(SocialLoginView):
    permission_classes = (permissions.AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        res = super().post(request, *args, **kwargs)
        token = res.data["key"]
        token_object = Token.objects.get(key=token)
        user_serializer = UserSerializer(token_object.user)
        return Response(
            {"token": token, "user": user_serializer.data}
        )


class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleSocialLoginSerializer
    callback_url = f"https://{APP_DOMAIN}/accounts/apple/login/callback/"

    def post(self, request, *args, **kwargs):
        res = super().post(request, *args, **kwargs)
        token = res.data["key"]
        token_object = Token.objects.get(key=token)
        user_serializer = UserSerializer(token_object.user)
        return Response(
            {"token": token, "user": user_serializer.data}
        )
