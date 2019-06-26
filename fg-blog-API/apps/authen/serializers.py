# users/serializers.py
from rest_framework import serializers
from . import models
from rest_auth.registration.serializers import RegisterSerializer


class UserSerializer(serializers.ModelSerializer):
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

