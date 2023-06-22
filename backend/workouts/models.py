from django.db import models
from django.core.validators import FileExtensionValidator
# Create your models here.


class ExerciseCategory(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class ExerciseMedia(models.Model):
    media_file = models.FileField(upload_to="exercises_media/",
                                  validators=[FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])],
                                  null=True,
                                  blank=True)
    is_media_video = models.BooleanField(default=False)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class Exercise(models.Model):
    title = models.CharField(max_length=256)
    poster = models.FileField(upload_to="exercise_posters/",
                                  validators=[FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])],
                                  null=True,
                                  blank=True)

    substitute = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    exercise_media = models.ManyToManyField(ExerciseMedia, blank=True)

    category = models.ForeignKey(ExerciseCategory, on_delete=models.CASCADE, null=True, blank=True)

    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.title


class WorkoutItem(models.Model):
    order = models.IntegerField(default=0)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.IntegerField(null=True, blank=True)
    reps = models.IntegerField(null=True, blank=True)
    seconds = models.IntegerField(null=True, blank=True)


class DayWorkout(models.Model):
    name = models.CharField(max_length=256)
    internal_name = models.CharField(max_length=256, null=True, blank=True)

    workout_items = models.ManyToManyField(WorkoutItem, blank=True)
    rounds = models.IntegerField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class ProgramWeek(models.Model):
    name = models.CharField(max_length=256)

    week_number = models.IntegerField()

    monday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                       related_name="monday_workouts")
    tuesday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                        related_name="tuesday_workouts")
    wednesday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                          related_name="wednesday_workouts")
    thursday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                         related_name="thursday_workouts")
    friday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                       related_name="friday_workouts")
    saturday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                         related_name="saturday_workouts")
    sunday_workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE, null=True, blank=True,
                                       related_name="sunday_workouts")

    def __str__(self):
        return self.name


class Program(models.Model):
    name = models.CharField(max_length=256)
    weeks = models.ManyToManyField(ProgramWeek, blank=True)

    pdf_document = models.FileField(upload_to="program_pdf/", null=True, blank=True)

    def __str__(self):
        return self.name


class ProgramAnswers(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    workout_availability = models.ForeignKey('questionnaire.WorkoutAvailability', on_delete=models.CASCADE)
    training_for = models.ForeignKey('questionnaire.TrainingFor', on_delete=models.CASCADE)
    goal = models.ForeignKey('questionnaire.Goal', on_delete=models.CASCADE)


class WorkoutSubscription(models.Model):
    workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)

    is_complete = models.BooleanField(default=False, null=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class WorkoutRating(models.Model):
    workout = models.ForeignKey(DayWorkout, on_delete=models.CASCADE)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)

    value = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
