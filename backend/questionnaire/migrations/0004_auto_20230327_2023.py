# Generated by Django 2.2.28 on 2023-03-27 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0003_auto_20221122_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionnaire',
            name='height',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
