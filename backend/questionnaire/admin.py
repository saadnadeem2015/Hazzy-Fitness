from django.contrib import admin
from .models import (
    LifeStyle,
    WeightUnit,
    HeightUnit,
    ActivityLevel,
    WorkoutAvailability,
    Goal,
    TrainingFor,
    Questionnaire
)
# Register your models here.

admin.site.register(LifeStyle)
admin.site.register(WeightUnit)
admin.site.register(HeightUnit)
admin.site.register(ActivityLevel)
admin.site.register(WorkoutAvailability)
admin.site.register(Goal)
admin.site.register(TrainingFor)
admin.site.register(Questionnaire)
