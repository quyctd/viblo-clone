# question/serializers.py
from rest_framework import serializers
from . import models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from apps.authen.serializers import UserSerializer


class QuestionSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author_data = serializers.SerializerMethodField()
    # comment_count = serializers.SerializerMethodField()

    def get_author_data(self, obj):
        author = obj.author
        serial = UserSerializer(author)
        return serial.data

    # def get_comment_count(self, obj):
    #     count = PostComment.objects.filter(post_parent=obj.id, level=0).count()
    #     return count

    class Meta:
        model = models.Question
        fields = '__all__'


class QuestionClipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuestionClipsUser
        fields = '__all__'
