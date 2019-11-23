from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import django_filters.rest_framework
from . import models
from . import serializers
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


class SignStudent(viewsets.ViewSet):
    serializer_class = serializers.StudentEmailSerializer
    
    def create(self, request):
        if (request.user.groups.filter(name="teachers").exists()):
            sr = serializers.StudentEmailSerializer(data=request.data)
            if sr.is_valid():
                group = models.Student_Group.objects.filter(name=sr.data["group"], teacher=models.Teacher.objects.get(user=request.user))[0]
                if group:
                    student = models.Student(email=sr.data["email"], group=group)
                    student.save()
                    return Response({
                        "student_code":student.code
                    })
                else:
                    return Response({'error':'Bug filter'})
            return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error':'Unauthorized action'})

class StudentSignUp(viewsets.ViewSet):
    serializer_class = serializers.StudentSignUpSerializer

    def create(self, request):
        sr = serializers.StudentSignUpSerializer(data=request.data)
        if sr.is_valid():
            student = models.Student.objects.filter(code=sr.data["code"], email=sr.data["email"])[0]
            if student:
                user = User.objects.create_user(
                    username=sr.data["username"],
                    password=sr.data["password"],
                    first_name=sr.data["first_name"],
                    last_name=sr.data["last_name"],
                    email=sr.data["email"],
                )
                user.save()
                student.user = user
                student.save()

                return(Response({'status':'ok'}))

class DialogStringViewSet(viewsets.ModelViewSet):
    queryset = models.DialogStrings.objects.all()
    serializer_class = serializers.DialogStringsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]


    def get_queryset(self):
        queryset = models.DialogStrings.objects.all()
        position = self.request.query_params.get('position', None)
        if position:
            queryset = queryset.filter(position=position)

        return queryset