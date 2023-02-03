from django.contrib import admin

# Register your models here.
from .models import (
    MealCategory,
    MealFilter,
    MealIngredient,
    MealInstruction,
    Meal,
    MealPlan,
    MealCompletion,
    MealMedia
)

admin.site.register(MealCategory)
admin.site.register(MealFilter)
admin.site.register(MealIngredient)
admin.site.register(MealInstruction)
admin.site.register(MealMedia)
admin.site.register(Meal)
admin.site.register(MealPlan)
admin.site.register(MealCompletion)
