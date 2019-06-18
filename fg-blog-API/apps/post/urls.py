# users/urls.py

from . import views
from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'post', views.PostViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]

