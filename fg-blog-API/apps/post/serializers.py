# post/serializers.py
from rest_framework import serializers
from . import models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from apps.authen.serializers import UserSerializer
from apps.authen.models import CustomUser
import markdown


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    author = AuthorSerializer()
    toc = serializers.SerializerMethodField()

    def get_toc(self, obj):
        content = obj.content
        md = markdown.Markdown(extensions=['toc'])
        html = md.convert(content)
        toc = md.toc_tokens
        ret = self.flatten_toc(toc)
        return ret

    def flatten_toc(self, toc):
        if len(toc) == 0:
            return toc
        if isinstance(toc[0]['children'], list):
            heading = {"level": toc[0]['level'], 'id': toc[0]['id'], 'name': toc[0]['name']}
            child = toc[0]['children']
            return [heading] + self.flatten_toc(child)
        return toc[:1] + self.flatten_toc(toc[1:])

    class Meta:
        model = models.Post
        fields = '__all__'
