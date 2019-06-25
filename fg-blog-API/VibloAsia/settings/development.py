# Python imports
from os.path import join

# project imports
from .common import *

# uncomment the following line to include i18n
# from .i18n import *


# ##### DEBUG CONFIGURATION ###############################
DEBUG = True

# allow all hosts during development
ALLOWED_HOSTS = ['*']


# adjust the minimal login
LOGIN_URL = 'core_login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = 'core_login'


# ##### DATABASE CONFIGURATION ############################
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': join(PROJECT_ROOT, 'run', 'dev.sqlite3'),
    }
}

# ##### APPLICATION CONFIGURATION #########################

INSTALLED_APPS = DEFAULT_APPS + [
    'django.contrib.sites',

    # 3rd party app

    # basic authen
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'taggit',
    'taggit_serializer',

    # Social authentic
    'social_django',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.github',

    'apps.api',
    'apps.authen',
    'apps.base',
    'apps.post',
    'apps.discussion',
    'corsheaders',
]

# Time zone
TIME_ZONE = "Asia/Ho_Chi_Minh"

SITE_ID = 2


AUTH_USER_MODEL = 'authen.CustomUser'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly', )
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

MIDDLEWARE += ['corsheaders.middleware.CorsMiddleware']

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

AUTHENTICATION_BACKENDS = (
    'social_core.backends.open_id.OpenIdAuth',  # for Google authentication
    'social_core.backends.google.GoogleOpenId',  # for Google authentication
    'social_core.backends.google.GoogleOAuth2',  # for Google authentication
    'social_core.backends.github.GithubOAuth2',  # for Github authentication
    'social_core.backends.facebook.FacebookOAuth2',  # for Facebook authentication

    'django.contrib.auth.backends.ModelBackend',
)

#Taggit
TAGGIT_CASE_INSENSITIVE = True

#Google login
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY ='671755523680-kl8oatubi2m7andl8pstad21t9eneoqf.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'M1hDXZbe-M7LVRnJe25dWPXe' #Paste Secret Key

#Facebook login
SOCIAL_AUTH_FACEBOOK_KEY = '836707276705341'
SOCIAL_AUTH_FACEBOOK_SECRET = '164a63bb6bcc619f0ee810edec3f8d1e'
