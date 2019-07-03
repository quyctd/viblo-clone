from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import PostCommentsSerializer
from rest_framework.generics import ListAPIView
from rest_framework import viewsets
import datetime
from django.utils.timezone import utc
# Create your views here.


class ListCommentInPostView(ListAPIView):
    serializer_class = PostCommentsSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('post_id', None)
        query = PostComment.objects.none()
        if post_id:
            query = PostComment.objects.filter(post_parent=post_id, level=0)
        return query


class CommentViewSet(viewsets.ModelViewSet):
    queryset = PostComment.objects.all().order_by('-create_time')
    serializer_class = PostCommentsSerializer

    def create(self, request, **kwargs):
        # do your thing here
        print(request.data)
        return super().create(request)


class DeleteCommentView(APIView):

    def post(self, request, *args, **kwargs):
        comment_id = kwargs.get('comment_id', None)
        if comment_id:
            comment = PostComment.objects.get(id=comment_id)
            comment.content = ""
            comment.updated_time = datetime.datetime.utcnow().replace(tzinfo=utc)
            comment.save(update_fields=['content', 'updated_time'])
            return Response({"status": "Delete success"})
        return Response({'status': "Delete failed"})
