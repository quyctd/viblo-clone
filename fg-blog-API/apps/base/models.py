from django.db import models
import uuid
from apps.authen.models import CustomUser

# Create your models here.


class BasePost(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    vote = models.IntegerField(default=0)
    content = models.TextField()

    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    create_time = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.id)



