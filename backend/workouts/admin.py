from django.contrib import admin

# Register your models here.
from .models import (
    WorkoutCategory,
    WorkoutMedia,
    Workout,
    WorkoutSubscription
)

admin.site.register(WorkoutCategory)
admin.site.register(WorkoutMedia)
admin.site.register(Workout)
admin.site.register(WorkoutSubscription)
