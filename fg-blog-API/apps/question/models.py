from django.db import models
from taggit.managers import TaggableManager
from django.template.defaultfilters import slugify
from apps.authen.models import CustomUser
from django.core.validators import MinValueValidator
from apps.base.models import BasePost
import jsonfield

# Create your models here.


class Question(BasePost):
    title = models.CharField(max_length=2048)
    tags = TaggableManager()
    slug = models.SlugField(max_length=2048, blank=True)

    views = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    views_id = jsonfield.JSONField(default={"view_users": []})
    clips = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        self.views = len(self.views_id['view_users'])
        self.clips = QuestionClipsUser.objects.filter(question=self.id).count()
        super(Question, self).save(*args, **kwargs)


class QuestionClipsUser(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str("User: %d - Question: %d" % (self.user.id, self.question.id))

    def save(self, *args, **kwargs):
        super(QuestionClipsUser, self).save(*args, **kwargs)
        clips = QuestionClipsUser.objects.filter(question=self.question.id).count()
        question = Question.objects.get(id=self.question.id)
        question.clips = clips
        question.save(update_fields=["clips"])

    def delete(self, *args, **kwargs):
        super(QuestionClipsUser, self).delete(*args, **kwargs)
        question = Question.objects.get(id=self.question.id)
        question.clips -= 1
        question.save(update_fields=["clips"])
