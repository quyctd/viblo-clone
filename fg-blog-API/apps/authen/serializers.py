# users/serializers.py
from rest_framework import serializers
from . import models
from rest_auth.registration.serializers import RegisterSerializer
from apps.post.models import Post


class UserSerializer(serializers.ModelSerializer):

    post_count = serializers.SerializerMethodField()

    def get_post_count(self, obj):
        post_count = Post.objects.filter(author=obj.id, status="public").count()
        return post_count

    class Meta:
        model = models.CustomUser
        fields = '__all__'


class TokenUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = '__all__'


class CustomRegistrationSerializer(RegisterSerializer):
    name = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.name = self.validated_data.get('name', '')
        user.save(update_fields=['name',])

