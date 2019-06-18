from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Post


class CustomPostCreationForm(forms.Form):
    class Meta(UserCreationForm):
        model = Post
        fields = ('name', 'email', 'username', 'password')


class CustomUserChangeForm(forms.Form):
    class Meta:
        model = Post
        fields = UserChangeForm.Meta.fields
