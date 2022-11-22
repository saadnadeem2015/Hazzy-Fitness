from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    LifeStyleViewSet,
    WeightUnitViewSet,
    HeightUnitViewSet,
    ActivityLevelViewSet,
    WorkoutAvailabilityViewSet,
    GoalViewSet,
    TrainingForViewSet,
    QuestionnaireViewSet
)

router = DefaultRouter()

router.register("life_style", LifeStyleViewSet, basename="life_style")
router.register("weight_unit", WeightUnitViewSet, basename="weight_unit")
router.register("height_unit", HeightUnitViewSet, basename="height_unit")
router.register("activity_level", ActivityLevelViewSet, basename="activity_level")
router.register("workout_availability", WorkoutAvailabilityViewSet, basename="workout_availability")
router.register("goal", GoalViewSet, basename="goal")
router.register("training_for", TrainingForViewSet, basename="training_for")

router.register("questionnaire", QuestionnaireViewSet, basename="questionnaire")


urlpatterns = [
    path("", include(router.urls)),
]
