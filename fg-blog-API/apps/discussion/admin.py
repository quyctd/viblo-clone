from django.contrib import admin
from .models import PostComment
# Register your models here.


class PostCommentAdmin(admin.ModelAdmin):
    model = PostComment
    list_display = ['id', 'create_time', 'updated_time']


admin.site.register(PostComment, PostCommentAdmin)
