from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'teachers', views.TeacherUserViewSet, basename='teachers')
router.register(r'hello', views.Hello, basename='hello')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/', include('rest_auth.urls'))
]