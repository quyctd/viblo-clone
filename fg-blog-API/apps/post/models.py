from django.db import models
import uuid
from taggit.managers import TaggableManager
from django.template.defaultfilters import slugify
from apps.authen.models import CustomUser
from django.core.validators import MinValueValidator
from apps.base.models import BasePost
import jsonfield

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
    views_id = jsonfield.JSONField(default={"view_users": []})
    clips = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        self.views = len(self.views_id['view_users'])
        self.clips = PostClipsUser.objects.filter(post=self.id).count()
        super(Post, self).save(*args, **kwargs)


class PostClipsUser(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str("User: %d - Post: %d" % (self.user.id, self.post.id))

    def save(self, *args, **kwargs):
        super(PostClipsUser, self).save(*args, **kwargs)
        clips = PostClipsUser.objects.filter(post=self.post.id).count()
        post = Post.objects.get(id=self.post.id)
        post.clips = clips
        post.save(update_fields=["clips"])

    def delete(self, *args, **kwargs):
        super(PostClipsUser, self).delete(*args, **kwargs)
        post = Post.objects.get(id=self.post.id)
        post.clips -= 1
        post.save(update_fields=["clips"])
