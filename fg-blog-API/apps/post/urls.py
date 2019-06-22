# users/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include
from django.urls import path

router = routers.DefaultRouter()
router.register(r'', views.PostViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r"^author/(?P<post_id>\d+)/",  views.AuthorOfPostView.as_view()),
]
