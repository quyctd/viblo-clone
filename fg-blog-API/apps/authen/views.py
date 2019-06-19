# users/views.py
from rest_framework import generics, viewsets, authentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import json
from rest_framework.views import APIView
from django.core import serializers as dj_serializer

from . import models
from . import serializers


class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class TokenToUser(APIView):
    queryset = []
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = serializers.TokenUserSerializer

    def get(self, request):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        token = self.request.META.get("HTTP_AUTHORIZATION", None)
        token = token.replace("Token ", "")
        if token:
            token_obj = Token.objects.get(key=token)
            if token_obj:
                user_id = token_obj.user.id
                self.queryset = models.CustomUser.objects.get(id=user_id)
                serializer = serializers.TokenUserSerializer(self.queryset)
                return Response(serializer.data)
            else:
                return Response(self.queryset)
        else:
            return Response(self.queryset)
