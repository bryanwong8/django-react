# Generated by Django 4.0a1 on 2021-10-18 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='priority',
            field=models.CharField(choices=[('LOW', 'Low'), ('MID', 'Mid'), ('HIGH', 'High')], default='LOW', max_length=4),
        ),
    ]
