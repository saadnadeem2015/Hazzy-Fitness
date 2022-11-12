from rest_framework import serializers
from workouts.models import (
    WorkoutCategory,
    WorkoutMedia,
    Workout,
    WorkoutSubscription
)
from users.api.v1.serializers import UserBriefSerializer
from users.models import User


class WorkoutCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutCategory
        fields = '__all__'


class WorkoutMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutMedia
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    category = WorkoutCategorySerializer(read_only=True)
    workout_media = WorkoutMediaSerializer(read_only=True, many=True)

    class Meta:
        model = Workout
        fields = '__all__'


class WorkoutSubscriptionSerializer(serializers.ModelSerializer):
    workout = WorkoutSerializer(read_only=True)
    workout_id = serializers.PrimaryKeyRelatedField(write_only=True, source='workout',
                                                       queryset=Workout.objects.all())
    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = WorkoutSubscription
        fields = '__all__'
