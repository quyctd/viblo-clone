# discussions/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    url(r'^comments/post/(?P<post_id>\d+)/$', views.ListCommentInPostView.as_view()),
    url(r'^comments/delete/(?P<comment_id>\d+)/$', views.DeleteCommentView.as_view()),
    url(r'^', include(router.urls)),
]
