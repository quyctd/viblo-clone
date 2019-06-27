# users/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'clips', views.PostClipViewSet)
router.register(r'', views.PostViewSet)

urlpatterns = [
    url(r'^newest/$', views.NewestPostList.as_view()),
    url(r"^author/(?P<post_id>\d+)/",  views.AuthorOfPostView.as_view()),
    url(r"^clips/find/(?P<post_id>\d+)/(?P<user_id>\d+)/", views.PostClipFindView.as_view()),
    url(r'^', include(router.urls)),
]
