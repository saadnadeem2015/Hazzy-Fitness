# Generated by Django 2.2.28 on 2023-04-11 23:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0008_mealcompletion_completion_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='mealcompletion',
            name='meal_subscription',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='meals_subscribed_completed', to='meals.MealSubscription'),
        ),
    ]
