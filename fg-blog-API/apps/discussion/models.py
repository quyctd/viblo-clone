from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from apps.authen.models import CustomUser
from apps.base.models import BasePost
from apps.post.models import Post
# Create your models here.


class PostComment(MPTTModel, BasePost):
    parent = TreeForeignKey('self', related_name='children', null=True, db_index=True, on_delete=models.CASCADE)
    post_parent = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_of_comments")

    def __str__(self):
        return str(self.id)

    class MPTTMeta:
        order_insertion_by = ['vote']
