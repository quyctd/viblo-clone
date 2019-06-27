from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Post


class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ['title', 'create_time', 'updated_time']


admin.site.register(Post, PostAdmin)
