# Generated by Django 2.2.28 on 2023-02-03 00:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0005_mealcompletion'),
    ]

    operations = [
        migrations.CreateModel(
            name='MealMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('media_file', models.FileField(blank=True, null=True, upload_to='meals_media/', validators=[django.core.validators.FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])])),
                ('is_media_video', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='meal',
            name='prep_media_videos',
            field=models.ManyToManyField(blank=True, to='meals.MealMedia'),
        ),
    ]
