# Generated by Django 2.2.7 on 2019-11-23 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_student_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='coins',
            field=models.IntegerField(default=0),
        ),
    ]