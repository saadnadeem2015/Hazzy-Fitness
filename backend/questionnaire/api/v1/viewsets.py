from rest_framework import viewsets, generics, permissions, serializers, authentication
from rest_framework.pagination import PageNumberPagination
from .serializers import (
    LifeStyleSerializer,
    WeightUnitSerializer,
    HeightUnitSerializer,
    ActivityLevelSerializer,
    WorkoutAvailabilitySerializer,
    GoalSerializer,
    QuestionnaireSerializer,
)
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.viewsets import ViewSet
import re
from questionnaire.models import (
    LifeStyle,
    WeightUnit,
    HeightUnit,
    ActivityLevel,
    WorkoutAvailability,
    Goal,
    Questionnaire
)
from datetime import datetime, timedelta
import random as r
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token


class LifeStyleViewSet(viewsets.ModelViewSet):
    queryset = LifeStyle.objects.all()
    serializer_class = LifeStyleSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class WeightUnitViewSet(viewsets.ModelViewSet):
    queryset = WeightUnit.objects.all()
    serializer_class = WeightUnitSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class HeightUnitViewSet(viewsets.ModelViewSet):
    queryset = HeightUnit.objects.all()
    serializer_class = HeightUnitSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class ActivityLevelViewSet(viewsets.ModelViewSet):
    queryset = ActivityLevel.objects.all()
    serializer_class = ActivityLevelSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class WorkoutAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = WorkoutAvailability.objects.all()
    serializer_class = WorkoutAvailabilitySerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "patch"]
