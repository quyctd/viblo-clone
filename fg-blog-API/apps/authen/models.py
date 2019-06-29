from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
# Create your models here.


class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    reputations = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.name and self.first_name and self.last_name:
            self.name = self.first_name + " " + self.last_name
        my_post = self.basepost_set.all()
        reputations = 0
        for post in my_post:
            score = 0
            if post.vote == 1:
                score = 3
            else:
                score = 0
            reputations += score
        if reputations > 0:
            self.reputations = reputations
        else:
            self.reputations = 0
        super(CustomUser, self).save(*args, **kwargs)
