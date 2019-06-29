from django.db import models
import uuid
from apps.authen.models import CustomUser
import jsonfield
# Create your models here.


class BasePost(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    vote = models.IntegerField(default=0)
    vote_users = jsonfield.JSONField(default={})
    content = models.TextField()

    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    create_time = models.DateTimeField(auto_now_add=True, blank=True)
    updated_time = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        vote_count = 0
        for key, value in self.vote_users.items():
            vote_count += value
        self.vote = vote_count
        super(BasePost, self).save(*args, **kwargs)
        self.author.save()

