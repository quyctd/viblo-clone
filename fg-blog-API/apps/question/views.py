# question/views.py

from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 10000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'num_pages': self.page.paginator.num_pages,
            'results': data
        })


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all().order_by('-create_time')
    serializer_class = serializers.QuestionSerializer


class QuestionClipViewSet(viewsets.ModelViewSet):
    queryset = models.QuestionClipsUser.objects.all()
    serializer_class = serializers.QuestionClipSerializer


class QuestionClipFindView(APIView):

    @staticmethod
    def get(request, *args, **kwargs):
        question_id = kwargs.get('question_id', None)
        user_id = kwargs.get('user_id', None)
        if question_id and user_id:
            question_clip = models.QuestionClipsUser.objects.filter(question=question_id, user=user_id).first()

            if question_clip:
                return Response({'status': True, 'clip_id': question_clip.id})
            else:
                return Response({'status': False, 'clip_id': None})


class NewestQuestionList(generics.ListAPIView):

    serializer_class = serializers.QuestionSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        """
        This view should return a list of all the newest question.
        """
        return models.Question.objects.all().order_by('-create_time')
