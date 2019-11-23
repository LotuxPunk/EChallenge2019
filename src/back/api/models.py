import uuid
from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
	school_name = models.CharField(max_length = 30)
	verification = models.BooleanField(default = True)
	user = models.ForeignKey(User,null = True, on_delete=models.CASCADE)

	def __str__(self):
		return self.user.username


class Student_Group(models.Model):
	name = models.CharField(max_length = 30)
	teacher = models.OneToOneField(Teacher, on_delete = models.CASCADE)
	name = models.CharField(max_length = 30)

	def __str__(self):
		return self.name

class Tag(models.Model):
	name = models.CharField(max_length = 30)

	def __str__(self):
		return self.name

class Student(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
	group = models.ForeignKey(Student_Group, on_delete = models.CASCADE)
	language = models.CharField(max_length=6)
	email = models.EmailField(null = True)
	coins = models.IntegerField(default=0)
	code = models.UUIDField(default=uuid.uuid4)
	tag = models.ManyToManyField(Tag, related_name="student_tags", blank=True)

	def __str__(self):
		return self.user.username

class Quest(models.Model):
	subject = models.CharField(max_length = 100)
	nb_words = models.IntegerField()
	xp_gain = models.IntegerField()
	group = models.OneToOneField(Student_Group, on_delete = models.CASCADE)

class HomeWork(models.Model):
	text = models.CharField(max_length = 10000)
	is_valide = models.BooleanField()
	students = models.ManyToManyField(Student, related_name='+')

class PlayerActivity(models.Model):
	player_1 = models.ForeignKey(Student, related_name="player_1", on_delete=models.CASCADE)
	player_2 = models.ForeignKey(Student, related_name="player_2", on_delete=models.CASCADE)
	state = models.IntegerField()
	current_position = models.IntegerField()

class Activity(models.Model):
	name = models.CharField(max_length=50)
	lang = models.CharField(max_length=50)
	
class DialogStrings(models.Model):
	text = models.TextField()
	lang = models.CharField(max_length=50)
	answer = models.CharField(max_length=250)
	position = models.IntegerField()
	activity = models.ForeignKey(Activity, related_name="activity", on_delete=models.CASCADE)

