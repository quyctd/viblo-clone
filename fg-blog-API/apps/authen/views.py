# users/views.py
from rest_framework import generics, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
import json

from . import models
from . import serializers


class UserListView(generics.ListCreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer


class TokenToUserViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = serializers.TokenUserSerializer

    def get_queryset(self):
        """
                This view should return a list of all the purchases for
                the user as determined by the username portion of the URL.
                """
        req = self.request
        body_unicode = req.body.decode('utf-8')
        body = json.loads(body_unicode)
        token = body['key']
        # token = req.query_params.get("key")
        if token:
            token_list = Token.objects.filter(key=token)
            list_id = [i.user.id for i in token_list]
            self.queryset = models.CustomUser.objects.filter(id__in=list_id)

            return self.queryset
        else:
            return self.queryset


