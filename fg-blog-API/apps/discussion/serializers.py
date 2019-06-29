from rest_framework import serializers
from .models import PostComment


class PostCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = '__all__'
