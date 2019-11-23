from django.db import models
from django.contrib.auth.models import User


class Professeur(models.Model):
	nom_ecole = model.CharField(max_length = 30)
	verification = model.BooleanField(edfault = True)
	user = models.ForeignKey(User,null = True, on_delete=models.CASCADE)