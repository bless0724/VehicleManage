# Generated by Django 2.0.2 on 2020-05-12 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0006_auto_20200512_1646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routeinfo',
            name='longitude',
            field=models.FloatField(),
        ),
    ]
