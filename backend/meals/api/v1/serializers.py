from rest_framework import serializers
from meals.models import (
    MealCategory,
    MealFilter,
    MealIngredient,
    MealInstruction,
    Meal,
    MealPlan,
    MealCompletion,
    MealMedia,
    MealSubscription
)
from users.api.v1.serializers import UserBriefSerializer
import datetime


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


class MealMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealMedia
        fields = '__all__'


class MealSerializer(serializers.ModelSerializer):
    ingredients = MealIngredientSerializer(read_only=True, many=True)
    instructions = MealInstructionSerializer(read_only=True, many=True)
    prep_media_videos = MealMediaSerializer(read_only=True, many=True)

    category = MealCategorySerializer(read_only=True)
    filters = MealFilterSerializer(read_only=True)

    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Meal
        fields = '__all__'

    def get_is_completed(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        if len(MealCompletion.objects.filter(meal=obj, owner=user, is_complete=True)) > 0:
            return True
        else:
            return False


class MealSubscriptionSerializer(serializers.ModelSerializer):
    subscriber = UserBriefSerializer(read_only=True)
    meal = MealSerializer(read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = MealSubscription
        fields = '__all__'

    def get_is_completed(self, obj):
        try:
            user = self.context['request'].user
        except:
            return None
        query = MealCompletion.objects.filter(
                                             meal=obj.meal,
                                             meal_subscription=obj,
                                             owner=user,
                                             is_complete=True,
                                             completion_date=datetime.datetime.now().date()
                                             )
        if len(query) > 0:
            return True
        else:
            return False


class MealPlanSerializer(serializers.ModelSerializer):
    meals_subscriptions = MealSubscriptionSerializer(read_only=True, many=True)

    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = MealPlan
        fields = '__all__'


class MealCompletionSerializer(serializers.ModelSerializer):
    meal = MealSerializer(read_only=True)
    meal_id = serializers.PrimaryKeyRelatedField(write_only=True, source='meal',
                                                    queryset=Meal.objects.all())

    meal_subscription = MealSubscriptionSerializer(read_only=True)
    meal_subscription_id = serializers.PrimaryKeyRelatedField(write_only=True, source='meal_subscription',
                                                 queryset=MealSubscription.objects.all())
    owner = UserBriefSerializer(read_only=True)

    class Meta:
        model = MealCompletion
        fields = '__all__'
