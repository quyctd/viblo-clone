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
    author_data = serializers.SerializerMethodField()
    toc = serializers.SerializerMethodField()
    preview_content = serializers.SerializerMethodField()

    def get_author_data(self, obj):
        author = obj.author
        serial = UserSerializer(author)
        return serial.data

    def get_toc(self, obj):
        content = obj.content
        md = markdown.Markdown(extensions=['toc'])
        html = md.convert(content)
        toc = md.toc_tokens
        ret = flatten_toc(toc)
        return ret

    def get_preview_content(self, obj):
        prev_content = obj.content[:200]
        prev_content = prev_content.replace("### ", " ").replace("## ", " ").replace("# ", " ")
        return prev_content

    class Meta:
        model = models.Post
        fields = '__all__'


def flatten_toc(toc):
    if len(toc) == 0:
        return toc
    if isinstance(toc[0]['children'], list):
        item = toc[0]
        level = item['level']
        id = item['id'].replace("_", "-")
        name = item['name'].replace("_", "-")
        heading = {"level": level, 'id': id, 'name': name}
        child = toc[0]['children']
        return [heading] + flatten_toc(child) + flatten_toc(toc[1:])
    return toc[:1] + flatten_toc(toc[1:])


class PostClipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostClipsUser
        fields = '__all__'
