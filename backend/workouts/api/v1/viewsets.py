from rest_framework import viewsets, generics, permissions, serializers, authentication
from rest_framework.pagination import PageNumberPagination

from .serializers import (
    ExerciseCategorySerializer,
    ExerciseMediaSerializer,
    ExerciseSerializer,
    ProgramSerializer,
    WorkoutSubscriptionSerializer,
    WorkoutRatingSerializer
)

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.viewsets import ViewSet
import re
from workouts.models import (
    ExerciseCategory,
    ExerciseMedia,
    Exercise,
    Program,
    ProgramAnswers,
    WorkoutSubscription,
    DayWorkout,
    WorkoutRating
)
from datetime import datetime, timedelta
import random as r
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token


class ExerciseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]


class ListPagination(PageNumberPagination):
    page_size = 24
    page_query_param = 'page'
    page_size_query_param = 'page_size'


class ExerciseListViewSet(generics.ListAPIView):
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = ListPagination
    queryset = Exercise.objects.all()

    def get_queryset(self, *args, **kwargs):
        query = Exercise.objects.all()

        try:
            category_id = self.request.GET.get('category_id')
            category = ExerciseCategory.objects.get(id=category_id)
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


class TrainingProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post", "get"]

    def list(self, request):
        return Response(ProgramSerializer(request.user.workout_program, context={'request': request}).data)

    def create(self, request):
        # Get Questionnaire
        questionnaire = request.user.user_questionnaire

        if questionnaire.workout_availability is not None and questionnaire.training_for is not None and questionnaire.goal is not None:
            query = ProgramAnswers.objects.filter(
                workout_availability=questionnaire.workout_availability,
                training_for=questionnaire.training_for,
                goal=questionnaire.goal
            )

            if len(query) > 0:
                option = query.first()
                request.user.workout_program = option.program
                request.user.save()

                return Response(ProgramSerializer(option.program).data)

            else:
                return Response({
                    'Error': 'No Program available.'
                }, 400)
        else:
            return Response({
                'Error': 'Please Complete your questionnaire first!'
            }, 400)


class WorkoutSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSubscription.objects.all()
    serializer_class = WorkoutSubscriptionSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def perform_create(self, serializer):
        item = serializer.save(owner=self.request.user)


class CompleteWorkoutViewSet(ViewSet):
    queryset = WorkoutSubscription.objects.all()
    serializer_class = WorkoutSubscriptionSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def create(self, request):
        try:
            workout_id = request.data['workout_id']
            workout = DayWorkout.objects.get(id=workout_id)
        except:
            return Response({
                'Error': 'Please Provide a valid workout ID'
            })

        subs = WorkoutSubscription.objects.filter(workout=workout, owner=request.user)
        if len(subs) > 0:
            subs.update(is_complete=True)
        else:
            WorkoutSubscription.objects.create(
                workout=workout,
                owner=request.user,
                is_complete=True
            )

        return Response(ProgramSerializer(request.user.workout_program, context={'request': request}).data)


class WorkoutRatingViewSet(viewsets.ModelViewSet):
    queryset = WorkoutRating.objects.all()
    serializer_class = WorkoutRatingSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["post"]

    def perform_create(self, serializer):
        item = serializer.save(owner=self.request.user)


class NextWorkoutViewSet(ViewSet):
    queryset = WorkoutSubscription.objects.all()
    serializer_class = WorkoutSubscriptionSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get"]

    def list(self, request):
        program = ProgramSerializer(request.user.workout_program, context={'request': request}).data
        if "weeks" in program:
            counter = 1
            for item in program['weeks']:
                if item['monday_workout']:
                    if item['monday_workout']['workout_status'] is None or item['monday_workout']['workout_status'] is False:
                        output_data = item['monday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['tuesday_workout']:
                    if item['tuesday_workout']['workout_status'] is None or item['tuesday_workout']['workout_status'] is False:
                        output_data = item['tuesday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['wednesday_workout']:
                    if item['wednesday_workout']['workout_status'] is None or item['wednesday_workout']['workout_status'] is False:
                        output_data = item['wednesday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['thursday_workout']:
                    if item['thursday_workout']['workout_status'] is None or item['thursday_workout']['workout_status'] is False:
                        output_data = item['thursday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['friday_workout']:
                    if item['friday_workout']['workout_status'] is None or item['friday_workout']['workout_status'] is False:
                        output_data = item['friday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['saturday_workout']:
                    if item['saturday_workout']['workout_status'] is None or item['saturday_workout']['workout_status'] is False:
                        output_data = item['saturday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                if item['sunday_workout']:
                    if item['sunday_workout']['workout_status'] is None or item['sunday_workout']['workout_status'] is False:
                        output_data = item['sunday_workout']
                        output_data['week_number'] = counter
                        return Response(output_data)
                counter += 1
        return Response(None)
