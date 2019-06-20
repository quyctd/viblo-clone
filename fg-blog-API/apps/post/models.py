from django.db import models
import uuid
from taggit.managers import TaggableManager
from django.template.defaultfilters import slugify
from apps.authen.models import CustomUser
from django.core.validators import MinValueValidator
from apps.base.models import BasePost

# Create your models here.

STATUS_CHOICES = (
        ("draft", "draft"),
        ('draft_public', "draft_public"),
        ('public', "public")
)


class Post(BasePost):
    title = models.CharField(max_length=2048)
    tags = TaggableManager()
    feature_image = models.CharField(max_length=2048, blank=True)
    status = models.CharField(max_length=64, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0])
    slug = models.SlugField(max_length=2048, blank=True)

    views = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    clips = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
