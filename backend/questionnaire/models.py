from django.db import models

# Create your models here.


class LifeStyle(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class WeightUnit(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class HeightUnit(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class ActivityLevel(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class WorkoutAvailability(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Goal(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Questionnaire(models.Model):
    user = models.OneToOneField(
        'users.User',
        on_delete=models.CASCADE,
        related_name="user_questionnaire",
        blank=True,
        null=True,
    )
    birth_date = models.DateField(null=True, blank=True)

    life_style = models.ForeignKey(LifeStyle, on_delete=models.CASCADE, null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    weight_unit = models.ForeignKey(WeightUnit, on_delete=models.CASCADE, null=True, blank=True)

    height = models.FloatField(null=True, blank=True)
    height_unit = models.ForeignKey(HeightUnit, on_delete=models.CASCADE, null=True, blank=True)

    activity_level = models.ForeignKey(ActivityLevel, on_delete=models.CASCADE, null=True, blank=True)
    workout_availability = models.ForeignKey(WorkoutAvailability, on_delete=models.CASCADE, null=True, blank=True)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, null=True, blank=True)
