# Generated by Django 2.2.28 on 2023-02-13 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0008_auto_20221216_1412'),
    ]

    operations = [
        migrations.AddField(
            model_name='workoutsubscription',
            name='day',
            field=models.CharField(blank=True, choices=[('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'), ('Sunday', 'Sunday')], max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='workoutsubscription',
            name='week_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
