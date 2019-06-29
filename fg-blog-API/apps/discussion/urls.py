# discussions/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
# router.register(r'clips', views.PostClipViewSet)

urlpatterns = [
    url(r'^comments/?P<post_id>\d+$', views.ListCommentInPostView.as_view()),
]
