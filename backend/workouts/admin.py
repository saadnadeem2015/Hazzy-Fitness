from django.contrib import admin

# Register your models here.
from .models import (
    ExerciseCategory,
    ExerciseMedia,
    Exercise,
    WorkoutItem,
    DayWorkout,
    ProgramWeek,
    Program,
    ProgramAnswers,
    WorkoutSubscription,
    WorkoutRating
)

admin.site.register(ExerciseCategory)
admin.site.register(ExerciseMedia)
admin.site.register(Exercise)
admin.site.register(WorkoutItem)
admin.site.register(DayWorkout)
admin.site.register(ProgramWeek)
admin.site.register(Program)
admin.site.register(ProgramAnswers)
admin.site.register(WorkoutSubscription)
admin.site.register(WorkoutRating)
