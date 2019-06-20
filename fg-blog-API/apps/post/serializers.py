# post/serializers.py
from rest_framework import serializers
from . import models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = models.Post
        fields = '__all__'
