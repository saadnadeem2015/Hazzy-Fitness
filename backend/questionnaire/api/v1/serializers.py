from rest_framework import serializers
from questionnaire.models import (
    LifeStyle,
    WeightUnit,
    HeightUnit,
    ActivityLevel,
    WorkoutAvailability,
    Goal,
    TrainingFor,
    Questionnaire
)


class LifeStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LifeStyle
        fields = '__all__'


class WeightUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightUnit
        fields = '__all__'


class HeightUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeightUnit
        fields = '__all__'


class ActivityLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLevel
        fields = '__all__'


class WorkoutAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutAvailability
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'


class TrainingForSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingFor
        fields = '__all__'


class QuestionnaireSerializer(serializers.ModelSerializer):
    life_style = LifeStyleSerializer(read_only=True)
    life_style_id = serializers.PrimaryKeyRelatedField(write_only=True, source='life_style',
                                                       queryset=LifeStyle.objects.all())

    weight_unit = LifeStyleSerializer(read_only=True)
    weight_unit_id = serializers.PrimaryKeyRelatedField(write_only=True, source='weight_unit',
                                                       queryset=WeightUnit.objects.all())

    height_unit = LifeStyleSerializer(read_only=True)
    height_unit_id = serializers.PrimaryKeyRelatedField(write_only=True, source='height_unit',
                                                       queryset=HeightUnit.objects.all())

    activity_level = LifeStyleSerializer(read_only=True)
    activity_level_id = serializers.PrimaryKeyRelatedField(write_only=True, source='activity_level',
                                                       queryset=ActivityLevel.objects.all())

    workout_availability = LifeStyleSerializer(read_only=True)
    workout_availability_id = serializers.PrimaryKeyRelatedField(write_only=True, source='workout_availability',
                                                       queryset=WorkoutAvailability.objects.all())

    goal = LifeStyleSerializer(read_only=True)
    goal_id = serializers.PrimaryKeyRelatedField(write_only=True, source='goal',
                                                                 queryset=Goal.objects.all())

    training_for = TrainingForSerializer(read_only=True)
    training_for_id = serializers.PrimaryKeyRelatedField(write_only=True, source='training_for',
                                                 queryset=TrainingFor.objects.all())

    class Meta:
        model = Questionnaire
        fields = ['id',
                  'user',
                  'birth_date',
                  'life_style',
                  'life_style_id',
                  'weight',
                  'weight_unit',
                  'weight_unit_id',
                  'height',
                  'height_unit',
                  'height_unit_id',
                  'activity_level',
                  'activity_level_id',
                  'workout_availability',
                  'workout_availability_id',
                  'goal',
                  'goal_id',
                  'training_for',
                  'training_for_id',
                  ]
