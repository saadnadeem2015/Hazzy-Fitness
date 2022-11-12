from rest_framework import serializers
from meals.models import (
    MealCategory,
    MealFilter,
    MealIngredient,
    MealInstruction,
    Meal,
    MealPlan,
)
from users.api.v1.serializers import UserBriefSerializer


class MealCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MealCategory
        fields = '__all__'


class MealFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealFilter
        fields = '__all__'


class MealIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealIngredient
        fields = '__all__'


class MealInstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealInstruction
        fields = '__all__'


class MealSerializer(serializers.ModelSerializer):
    ingredients = MealIngredientSerializer(read_only=True, many=True)
    instructions = MealInstructionSerializer(read_only=True, many=True)

    category = MealCategorySerializer(read_only=True)
    filters = MealFilterSerializer(read_only=True)

    class Meta:
        model = Meal
        fields = '__all__'


class MealPlanSerializer(serializers.ModelSerializer):
    meals = MealSerializer(read_only=True, many=True)
    meals_ids = serializers.PrimaryKeyRelatedField(write_only=True, source='meals',
                                                       queryset=Meal.objects.all(), many=True)

    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = MealPlan
        fields = '__all__'
