# users/views.py
from rest_framework import generics
from rest_framework import routers, serializers, viewsets

from . import models
from . import serializers


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
