# users/urls.py
from django.urls import path

from . import views, social_views

from rest_framework import routers
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'token_to_user', views.TokenToUserViewSet, base_name="getUserFromToken")

urlpatterns = [
    path('', views.UserListView.as_view()),

    path('accounts/', include('rest_auth.urls')),
    path('accounts/registration/', include('rest_auth.registration.urls')),
    path('login/facebook/', social_views.FacebookLogin.as_view(), name='fb_login'),
    path('login/google/', social_views.GoogleLogin.as_view(), name='gg_login'),
    path('login/github/', social_views.GithubLogin.as_view(), name='gh_login'),
    url(r'^token/', include(router.urls)),


]
