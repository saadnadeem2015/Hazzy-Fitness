from rest_framework import serializers
from workouts.models import (
    ExerciseCategory,
    ExerciseMedia,
    Exercise,
    WorkoutItem,
    DayWorkout,
    ProgramWeek,
    Program,
    WorkoutSubscription,
    WorkoutRating
)
from users.api.v1.serializers import UserBriefSerializer
from users.models import User


class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = '__all__'


class ExerciseMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseMedia
        fields = '__all__'


class ExerciseSubstituteSerializer(serializers.ModelSerializer):
    category = ExerciseCategorySerializer(read_only=True)
    exercise_media = ExerciseMediaSerializer(read_only=True, many=True)

    class Meta:
        model = Exercise
        fields = ['id', 'title', 'poster', 'exercise_media', 'category', 'description']


class ExerciseSerializer(serializers.ModelSerializer):
    category = ExerciseCategorySerializer(read_only=True)
    exercise_media = ExerciseMediaSerializer(read_only=True, many=True)
    substitute = ExerciseSubstituteSerializer(read_only=True)

    class Meta:
        model = Exercise
        fields = '__all__'


class WorkoutItemSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = WorkoutItem
        fields = '__all__'


class DayWorkoutSerializer(serializers.ModelSerializer):
    workout_items = WorkoutItemSerializer(read_only=True, many=True)

    workout_status = serializers.SerializerMethodField()
    completion_date = serializers.SerializerMethodField()

    class Meta:
        model = DayWorkout
        fields = '__all__'

    def get_workout_status(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        query = WorkoutSubscription.objects.filter(workout=obj, owner=user)

        if len(query) <= 0:
            return None
        else:
            item = query.first()
            return item.is_complete

    def get_completion_date(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        query = WorkoutSubscription.objects.filter(workout=obj, owner=user)

        if len(query) <= 0:
            return None
        else:
            item = query.first()
            if item.is_complete:
                return item.updated_at.date()
            else:
                return None


class ProgramWeekSerializer(serializers.ModelSerializer):
    monday_workout = DayWorkoutSerializer(read_only=True)
    tuesday_workout = DayWorkoutSerializer(read_only=True)
    wednesday_workout = DayWorkoutSerializer(read_only=True)
    thursday_workout = DayWorkoutSerializer(read_only=True)
    friday_workout = DayWorkoutSerializer(read_only=True)
    saturday_workout = DayWorkoutSerializer(read_only=True)
    sunday_workout = DayWorkoutSerializer(read_only=True)

    class Meta:
        model = ProgramWeek
        fields = '__all__'


class ProgramSerializer(serializers.ModelSerializer):
    weeks = ProgramWeekSerializer(read_only=True, many=True)

    class Meta:
        model = Program
        fields = '__all__'


class WorkoutSubscriptionSerializer(serializers.ModelSerializer):
    workout = DayWorkoutSerializer(read_only=True)
    workout_id = serializers.PrimaryKeyRelatedField(write_only=True, source='workout'
                                                         , queryset=DayWorkout.objects.all(), required=False)

    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = WorkoutSubscription
        fields = '__all__'


class WorkoutRatingSerializer(serializers.ModelSerializer):
    workout = DayWorkoutSerializer(read_only=True)
    workout_id = serializers.PrimaryKeyRelatedField(write_only=True, source='workout'
                                                         , queryset=DayWorkout.objects.all(), required=False)

    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = WorkoutRating
        fields = '__all__'
