# Generated by Django 2.2.7 on 2019-11-23 12:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_group_homework_quest_student_tag'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Group',
            new_name='Student_Group',
        ),
        migrations.AlterField(
            model_name='student',
            name='code',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]