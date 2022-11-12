from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    MealCategoryViewSet,
    MealFilterViewSet,
    MealPlanViewSet,
    MealListViewSet,
    MealViewSet
)

router = DefaultRouter()

router.register("meal_category", MealCategoryViewSet, basename="meal_category")
router.register("meal_filter", MealFilterViewSet, basename="meal_filter")
router.register("meal_plan", MealPlanViewSet, basename="meal_plan")
router.register("meal", MealViewSet, basename="meal")


urlpatterns = [
    path("", include(router.urls)),
    path('meals_library/', MealListViewSet.as_view(), name="meals_library"),
]
