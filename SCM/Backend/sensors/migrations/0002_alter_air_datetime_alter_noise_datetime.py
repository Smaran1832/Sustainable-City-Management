# Generated by Django 4.1 on 2024-02-01 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sensors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='air',
            name='datetime',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='noise',
            name='datetime',
            field=models.DateTimeField(),
        ),
    ]