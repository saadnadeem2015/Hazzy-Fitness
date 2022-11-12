from django.db import models

# Create your models here.


class MealCategory(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class MealFilter(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class MealIngredient(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class MealInstruction(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class Meal(models.Model):
    title = models.CharField(max_length=256)
    picture = models.ImageField(upload_to="meals_media/", null=True, blank=True)
    prep_video = models.FileField(upload_to="meals_prep_media/", null=True, blank=True)

    category = models.ForeignKey(MealCategory, on_delete=models.CASCADE, null=True, blank=True,
                                 related_name="category_meals")
    filters = models.ForeignKey(MealFilter, on_delete=models.CASCADE, null=True, blank=True,
                                related_name="filter_meals")

    calories = models.FloatField()
    protein = models.FloatField()
    carbohydrates = models.FloatField()
    fats = models.FloatField()

    ingredients = models.ManyToManyField(MealIngredient, blank=True)
    instructions = models.ManyToManyField(MealInstruction, blank=True)

    cook_time = models.IntegerField()
    prep_time = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.title


class MealPlan(models.Model):
    plan_calories = models.FloatField(default=0)
    plan_protein = models.FloatField(default=0)
    plan_carbohydrates = models.FloatField(default=0)
    plan_fats = models.FloatField(default=0)

    meals = models.ManyToManyField(Meal)

    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="user_meal_plans")

    is_current = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class MealCompletion(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="meals_completed")
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="completed_meals")

    is_complete = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
