# Generated by Django 2.2.7 on 2019-11-23 12:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('teacher', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('code', models.CharField(max_length=100)),
                ('group', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Group')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('students', models.ManyToManyField(related_name='_tag_students_+', to='api.Student')),
            ],
        ),
        migrations.CreateModel(
            name='Quest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=100)),
                ('nb_words', models.IntegerField()),
                ('xp_gain', models.IntegerField()),
                ('group', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Group')),
            ],
        ),
        migrations.CreateModel(
            name='HomeWork',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=10000)),
                ('is_valide', models.BooleanField()),
                ('students', models.ManyToManyField(related_name='_homework_students_+', to='api.Student')),
            ],
        ),
    ]
