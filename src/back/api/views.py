from django.shortcuts import render
from django.contrib.auth.models import User, Group
from . import serializers
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from . import models
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = models.Teacher.objects.all()
    serializer_class = serializers.TeacherSerializer

class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer

class TeacherUserViewSet(viewsets.ViewSet):
    serializer_class = serializers.TeacherUserSerializer
    def create(self, request):

        sr = serializers.TeacherUserSerializer(data=request.data)
        if sr.is_valid():
            print(sr.data)
            group = Group.objects.get(name="teachers")
            user = User.objects.create_user(
                sr.data['username'], 
                sr.data['email'], 
                sr.data['password'], 
                first_name=sr.data['first_name'], 
                last_name=sr.data['last_name'],
            )
            group.user_set.add(user)
            teacher = models.Teacher(school_name=sr.data['school_name'], user=user)
            user.save()
            teacher.save()
            return Response({
                'status':'ok',
            })
        else:
            print('sr is not valid')
            return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

class Hello(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request, pk=None):
        print(request.user.username)
        return Response({'message':'Hello there!' + request.user.username})