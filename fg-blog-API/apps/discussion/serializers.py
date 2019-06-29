from abc import ABC

from rest_framework import serializers
from apps.authen.serializers import UserSerializer
from .models import PostComment
from django.core.exceptions import ObjectDoesNotExist


class SubPostCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = "__all__"


class RecursiveField(serializers.BaseSerializer, ABC):
    def to_representation(self, value):
        ParentSerializer = self.parent.parent.__class__
        serializer = ParentSerializer(value, context=self.context)
        return serializer.data

    def to_internal_value(self, data):
        ParentSerializer = self.parent.parent.__class__
        Model = ParentSerializer.Meta.model
        try:
            instance = Model.objects.get(pk=data)
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                "Object not found".format(
                    Model().__class__.__name__
                )
            )
        return instance


class PostCommentsSerializer(serializers.ModelSerializer):
    children = RecursiveField(
        many=True,
        required=False
    )
    author_data = serializers.SerializerMethodField()

    def get_author_data(self, obj):
        author = obj.author
        serial = UserSerializer(author)
        return serial.data

    class Meta:
        model = PostComment
        fields = '__all__'
