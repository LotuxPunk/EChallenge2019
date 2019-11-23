from django.contrib.auth.models import User, Group
from rest_framework import serializers
from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):


    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['school_name', 'verification', 'user']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class TeacherUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100, min_length=3, trim_whitespace=True)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    school_name = serializers.CharField(max_length=100)
    password = serializers.CharField(required=True)

    class Meta:
        fields = ['username', 'email', 'first_name', 'last_name', 'school_name', 'password']


class StudentEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    group = serializers.CharField(max_length=30)
    class Meta:
        fields = ['email', 'group']

class StudentSignUpSerializer(serializers.Serializer):
    code = serializers.UUIDField()
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100, trim_whitespace=True, required=True)
    password = serializers.CharField(required=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        fields = ['email', 'code']

class DialogStringsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DialogStrings
        fields = ["text", "lang","answer", "position"]