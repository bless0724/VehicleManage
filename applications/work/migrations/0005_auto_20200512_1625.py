# Generated by Django 2.0.2 on 2020-05-12 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0004_remove_routeinfo_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='routeinfo',
            name='speed',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='routeinfo',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]