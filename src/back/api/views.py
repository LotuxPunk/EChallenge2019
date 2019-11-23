from django.shortcuts import render
from django.contrib.auth.models import User, Group
from . import serializers
from rest_framework import viewsets
from . import models
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer


class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer