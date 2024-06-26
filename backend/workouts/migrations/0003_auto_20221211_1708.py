# Generated by Django 2.2.28 on 2022-12-11 17:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0002_auto_20221211_1703'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workouts.ExerciseCategory'),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='exercise_media',
            field=models.ManyToManyField(blank=True, to='workouts.ExerciseMedia'),
        ),
    ]
