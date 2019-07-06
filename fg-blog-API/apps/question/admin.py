from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    model = Question
    list_display = ['title', 'create_time', 'updated_time']


admin.site.register(Question, QuestionAdmin)
