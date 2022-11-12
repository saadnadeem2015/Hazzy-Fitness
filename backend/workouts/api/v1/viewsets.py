from rest_framework import viewsets, generics, permissions, serializers, authentication
from rest_framework.pagination import PageNumberPagination

from .serializers import (
    WorkoutCategorySerializer,
    WorkoutMediaSerializer,
    WorkoutSerializer,
    WorkoutSubscriptionSerializer
)

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.viewsets import ViewSet
import re
from workouts.models import (
    WorkoutCategory,
    WorkoutMedia,
    Workout,
    WorkoutSubscription
)
from datetime import datetime, timedelta
import random as r
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token


class WorkoutCategoryViewSet(viewsets.ModelViewSet):
    queryset = WorkoutCategory.objects.all()
    serializer_class = WorkoutCategorySerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class ListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class WorkoutListViewSet(generics.ListAPIView):
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = ListPagination
    queryset = Workout.objects.all()

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        try:
            user_id = self.request.GET.get('user_id')
        except:
            user_id = None

        query = Workout.objects.all()

        try:
            category_id = self.request.GET.get('category_id')
            category = WorkoutCategory.objects.get(id=category_id)
        except:
            category = None

        if category:
            query = query.filter(category=category)

        try:
            q = self.request.GET.get('q')
        except:
            q = None

        if q:
            query = query.filter(title__icontains=q)

        return query


class WorkoutSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSubscription.objects.all()
    serializer_class = WorkoutSubscriptionSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post", "get", "patch"]

    def list(self, request):
        try:
            workout_date = self.request.GET.get('workout_date')
        except:
            workout_date = None

        try:
            start_date = self.request.GET.get('start_date')
        except:
            start_date = None

        try:
            end_date = self.request.GET.get('end_date')
        except:
            end_date = None

        query = WorkoutSubscription.objects.filter(owner=request.user)

        if workout_date == "today":
            query = WorkoutSubscription.objects.filter(owner=request.user, workout_date=datetime.today().date())
            return Response(WorkoutSubscriptionSerializer(query, many=True).data)

        elif workout_date is not None:
            query = query.filter(workout_date=workout_date)

        elif start_date and end_date:
            query = WorkoutSubscription.objects.filter(owner=request.user, workout_date__range=(start_date, end_date))
            return Response(WorkoutSubscriptionSerializer(query, many=True, context={'request': request}).data)

        return Response(WorkoutSubscriptionSerializer(query, many=True).data)

    def perform_create(self, serializer):
        item = serializer.save(owner=self.request.user)
