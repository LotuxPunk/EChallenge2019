from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
	school_name = models.CharField(max_length = 30)
	verification = models.BooleanField(default = True)
	user = models.ForeignKey(User,null = True, on_delete=models.CASCADE)

class Group(models.Model):
	name = models.CharField(max_length = 30)
	teacher = models.OneToOneField(Teacher, on_delete = models.CASCADE)
	name = models.CharField(max_length = 30)

class Student(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	first_name = models.CharField(max_length = 30)
	group = models.OneToOneField(Group, on_delete = models.CASCADE)
	email = models.EmailField(null = True)
	code = models.CharField(max_length = 100)

class Quest(models.Model):
	subject = models.CharField(max_length = 100)
	nb_words = models.IntegerField()
	xp_gain = models.IntegerField()
	group = models.OneToOneField(Group, on_delete = models.CASCADE)

class HomeWork(models.Model):
	text = models.CharField(max_length = 10000)
	is_valide = models.BooleanField()
	students = models.ManyToManyField(Student, on_delete = models.CASCADE, related_name='+')

class Tag(models.Model):
	name = models.CharField(max_length = 30)
	students = models.ManyToManyField(Student, on_delete = models.CASCADE, related_name='+')
