# Generated by Django 4.1 on 2024-03-19 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='snapshot',
            name='available_bike_stands',
        ),
        migrations.AddField(
            model_name='snapshot',
            name='usage_percent',
            field=models.FloatField(default=50.0),
            preserve_default=False,
        ),
    ]
