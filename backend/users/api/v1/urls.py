from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    UserViewSet,
    CustomChangePasswordViewSet,
    PasswordResetRequestViewSet,
    VerifyResetTokenViewSet,
    ConfirmPasswordResetViewSet,
    UpdateProfilePictureViewSet,
    GenderViewSet,
    CountryViewSet,
    UpdateUserMacrosViewSet,
    VerifyAccountViewSet
)

router = DefaultRouter()
router.register("user_info", UserViewSet, basename="user")

router.register("gender", GenderViewSet, basename="gender")
router.register("country", CountryViewSet, basename="country")

router.register("change_user_password", CustomChangePasswordViewSet, basename="change_user_password")

router.register("email_reset_token", PasswordResetRequestViewSet, basename="email_reset_token")
router.register("verify_reset_token", VerifyResetTokenViewSet, basename="verify_reset_token")
router.register("confirm_password_reset", ConfirmPasswordResetViewSet, basename="confirm_password_reset")
router.register("verify_account", VerifyAccountViewSet, basename="verify_account")

router.register("profile_picture", UpdateProfilePictureViewSet, basename="profile_picture")

router.register("update_macros", UpdateUserMacrosViewSet, basename="update_macros")


urlpatterns = [
    path("", include(router.urls)),
]
