from django.contrib import admin
from . import models
# Register your models here.




class TeacherAdmin(admin.ModelAdmin):
    list_display = ("user", "school_name")

class Student_GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "teacher")

class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'group')


admin.site.register(models.Student_Group, Student_GroupAdmin)
admin.site.register(models.Student, StudentAdmin)
admin.site.register(models.Teacher, TeacherAdmin)
admin.site.register(models.Tag)
admin.site.register(models.PlayerActivity)
admin.site.register(models.Activity)
admin.site.register(models.DialogStrings)