# Generated by Django 2.0.2 on 2020-03-22 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdminInfo',
            fields=[
                ('aid', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=256)),
                ('real_name', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=30)),
                ('phone', models.CharField(max_length=11)),
                ('wechat', models.CharField(max_length=30)),
                ('register_time', models.DateTimeField(auto_now_add=True, null=True)),
                ('last_login_time', models.DateTimeField(null=True)),
            ],
        ),
    ]