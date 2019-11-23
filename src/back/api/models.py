from django.db import models
from django.contrib.auth.models import User


class Professeur(models.Model):
	nom_ecole = models.CharField(max_length = 30)
	verification = models.BooleanField(default = True)
	user = models.ForeignKey(User,null = True, on_delete=models.CASCADE)

class Group(models.Model):
	name = models.CharField(max_length = 30)
	teacher = models.OneToOneField(Teacher, on_delete = models.CASCADE)

class Student(models.Model):
	email = models.EmailField(max_length = 100)
	pw = models.CharField(max_length = 30)
	first_name = models.CharField(max_length = 30)
	group = models.OneToOneField(Group, on_delete = models.CASCADE)
