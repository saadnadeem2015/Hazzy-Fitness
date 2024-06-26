from django.urls import path, include
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    FeedbackViewSet,
    ReadNotificationViewSet,
    NotificationListViewSet,
    GoogleLogin,
    AppleLogin,
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("feed_back", FeedbackViewSet, basename="feed_back")
router.register("read_notification", ReadNotificationViewSet, basename="read_notification")

urlpatterns = [
    path("", include(router.urls)),
    path('notifications/', NotificationListViewSet.as_view(), name="notifications"),
    path("google/login/", GoogleLogin.as_view(), name="social_google_login"),
    path("apple/login/", AppleLogin.as_view(), name="social_apple_login"),
]
