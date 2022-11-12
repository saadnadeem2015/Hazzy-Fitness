from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    WorkoutCategoryViewSet,
    WorkoutListViewSet,
    WorkoutSubscriptionViewSet,
)

router = DefaultRouter()

router.register("workout_category", WorkoutCategoryViewSet, basename="workout_category")
router.register("my_subscriptions", WorkoutSubscriptionViewSet, basename="my_subscriptions")


urlpatterns = [
    path("", include(router.urls)),
    path('workouts_list/', WorkoutListViewSet.as_view(), name="workouts_list"),
]
