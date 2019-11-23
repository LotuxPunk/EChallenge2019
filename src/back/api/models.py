from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
	school_name = models.CharField(max_length = 30)
	verification = models.BooleanField(default = True)
	user = models.ForeignKey(User,null = True, on_delete=models.CASCADE)

class Group(models.Model):
	name = models.CharField(max_length = 30)
	teacher = models.OneToOneField(Teacher, on_delete = models.CASCADE)

class Student(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	first_name = models.CharField(max_length = 30)
	group = models.OneToOneField(Group, on_delete = models.CASCADE)