from django.urls import path, include
from rest_framework.routers import DefaultRouter

from membership.api.v1.viewsets import (
    SubscriptionPlanViewSet,
    UserMembershipViewSet,
    SubscribeViewSet,
    CancelSubscriptionViewSet,
    PaymentMethodViewSet,
    SetDefaultCardViewSet,
    DeletePaymentCardViewSet
)

router = DefaultRouter()
router.register("subscription_plans", SubscriptionPlanViewSet)
router.register("my_subscription", UserMembershipViewSet)
router.register("subscribe", SubscribeViewSet, basename="subscribe")
router.register("cancel_subscription", CancelSubscriptionViewSet, basename="cancel_subscription")
router.register("payment_method", PaymentMethodViewSet, basename="payment_method")
router.register("set_default_card", SetDefaultCardViewSet, basename="set_default_card")
router.register("delete_payment_card", DeletePaymentCardViewSet, basename="delete_payment_card")

urlpatterns = [
    path("", include(router.urls)),
]
