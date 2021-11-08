# Generated by Django 2.0.2 on 2020-04-18 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('work', '0002_auto_20200322_2143'),
    ]

    operations = [
        migrations.CreateModel(
            name='RouteInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('data', models.CharField(max_length=200)),
            ],
        ),
    ]
