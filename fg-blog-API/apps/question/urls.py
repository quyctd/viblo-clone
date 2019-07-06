# post/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'clips', views.QuestionClipViewSet)
router.register(r'', views.QuestionViewSet)

urlpatterns = [
    url(r'^newest/$', views.NewestQuestionList.as_view()),
    url(r"^clips/find/(?P<question_id>\d+)/(?P<user_id>\d+)/", views.QuestionClipFindView.as_view()),
    url(r'^', include(router.urls)),
]
