# Generated by Django 2.2.28 on 2023-07-12 19:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0010_auto_20230622_2205'),
    ]

    operations = [
        migrations.AddField(
            model_name='dayworkout',
            name='poster',
            field=models.FileField(blank=True, null=True, upload_to='day_workout_poster/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])]),
        ),
    ]