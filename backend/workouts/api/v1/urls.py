from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    ExerciseCategoryViewSet,
    ExerciseListViewSet,
    TrainingProgramViewSet,
    WorkoutSubscriptionViewSet,
    CompleteWorkoutViewSet,
    WorkoutRatingViewSet
)

router = DefaultRouter()

router.register("exercise_category", ExerciseCategoryViewSet, basename="exercise_category")
router.register("training_program", TrainingProgramViewSet, basename="training_program")
router.register("workout_subscription", WorkoutSubscriptionViewSet, basename="workout_subscription")
router.register("complete_workout", CompleteWorkoutViewSet, basename="complete_workout")
router.register("rate_workout", WorkoutRatingViewSet, basename="rate_workout")


urlpatterns = [
    path("", include(router.urls)),
    path('exercises_list/', ExerciseListViewSet.as_view(), name="exercises_list"),
]
