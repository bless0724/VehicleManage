# Generated by Django 2.0.2 on 2020-05-22 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0016_carworkday_workdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carworkday',
            name='workDate',
            field=models.DateField(auto_now_add=True),
        ),
    ]