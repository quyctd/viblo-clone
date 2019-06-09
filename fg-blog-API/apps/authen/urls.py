# users/urls.py
from django.urls import include, path

from . import views, social_views

urlpatterns = [
    path('', views.UserListView.as_view()),

    path('accounts/', include('rest_auth.urls')),
    path('accounts/registration/', include('rest_auth.registration.urls')),
    path('login/facebook/', social_views.FacebookLogin.as_view(), name='fb_login'),
    path('login/google/', social_views.GoogleLogin.as_view(), name='gg_login'),
    path('login/github/', social_views.GithubLogin.as_view(), name='gh_login'),

]
