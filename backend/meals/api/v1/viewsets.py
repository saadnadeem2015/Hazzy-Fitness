from rest_framework import viewsets, generics, permissions, serializers, authentication
from rest_framework.pagination import PageNumberPagination

from .serializers import (
    MealCategorySerializer,
    MealFilterSerializer,
    MealIngredientSerializer,
    MealInstructionSerializer,
    MealSerializer,
    MealPlanSerializer,
)

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.viewsets import ViewSet
import re
from meals.models import (
    MealCategory,
    MealFilter,
    MealIngredient,
    MealInstruction,
    Meal,
    MealPlan,
)
from datetime import datetime, timedelta
import random as r
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token


class MealCategoryViewSet(viewsets.ModelViewSet):
    queryset = MealCategory.objects.all()
    serializer_class = MealCategorySerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class MealFilterViewSet(viewsets.ModelViewSet):
    queryset = MealFilter.objects.all()
    serializer_class = MealFilterSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post", "get"]

    def create(self, request):

        try:
            meals_ids = list(request.data['meals_ids'])
            meals = Meal.objects.filter(id__in=meals_ids)
        except:
            return Response({
                'Error': 'Invalid Meal IDs provided'
            }, 400)

        request.user.user_meal_plans.all().update(is_current=False)

        plan = MealPlan.objects.create(
            owner=request.user,
            is_current=True,
        )
        plan.meals.add(*meals)

        plan_calories = 0
        plan_protein = 0
        plan_carbohydrates = 0
        plan_fats = 0
        for meal in plan.meals.all():
            plan_calories += meal.calories
            plan_protein += meal.protein
            plan_carbohydrates += meal.carbohydrates
            plan_fats += meal.fats

        plan.plan_calories = plan_calories
        plan.plan_protein = plan_protein
        plan.plan_carbohydrates = plan_carbohydrates
        plan.plan_fats = plan_fats
        plan.save()

        return Response(MealPlanSerializer(plan).data)

    def list(self, request):
        return Response(MealPlanSerializer(request.user.user_meal_plans.filter(is_current=True).first()).data)


class ListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class MealListViewSet(generics.ListAPIView):
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = ListPagination
    queryset = Meal.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        try:
            user_id = self.request.GET.get('user_id')
        except:
            user_id = None

        query = Meal.objects.all()

        try:
            category_id = self.request.GET.get('category_id')
            category = MealCategory.objects.get(id=category_id)
        except:
            category = None

        try:
            filter_id = self.request.GET.get('filter_id')
            filter = MealFilter.objects.get(id=filter_id)
        except:
            filter = None

        if category:
            query = query.filter(category=category)

        if filter:
            query = query.filter(filters=filter)

        try:
            q = self.request.GET.get('q')
        except:
            q = None

        if q:
            query = query.filter(title__icontains=q)

        return query
