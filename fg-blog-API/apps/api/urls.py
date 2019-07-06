from django.urls import include, path
from apps.authen import social_views

urlpatterns = [
    path('authen/', include('apps.authen.urls')),
    path('post/', include('apps.post.urls')),
    path('discussion/', include('apps.discussion.urls')),
    path('question/', include('apps.question.urls')),
]
