# Generated by Django 2.2.28 on 2023-07-07 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_auto_20230203_0042'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gender',
            options={'verbose_name': 'Sex', 'verbose_name_plural': 'Sex'},
        ),
        migrations.RenameField(
            model_name='user',
            old_name='gender',
            new_name='sex',
        ),
    ]
