from django.db import models
from django.core.validators import FileExtensionValidator
# Create your models here.


class WorkoutCategory(models.Model):
    name = models.CharField(max_length=256)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class WorkoutMedia(models.Model):
    media_file = models.FileField(upload_to="posts_media/",
                                  validators=[FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])],
                                  null=True,
                                  blank=True)
    is_media_video = models.BooleanField(default=False)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class Workout(models.Model):
    title = models.CharField(max_length=256)
    poster = models.FileField(upload_to="posts_media/",
                                  validators=[FileExtensionValidator(['jpg', 'png', 'jpeg', 'mp4'])],
                                  null=True,
                                  blank=True)

    workout_media = models.ManyToManyField(WorkoutMedia)

    category = models.ForeignKey(WorkoutCategory, on_delete=models.CASCADE)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class WorkoutSubscription(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)

    workout_date = models.DateField()

    is_complete = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
