# Generated by Django 2.2.28 on 2023-04-11 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0007_auto_20230320_1954'),
    ]

    operations = [
        migrations.AddField(
            model_name='mealcompletion',
            name='completion_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
