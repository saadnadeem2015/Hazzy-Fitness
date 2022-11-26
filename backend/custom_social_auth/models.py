from django.db import models

# Create your models here.


class FacebookAccount(models.Model):
    app_id = models.CharField(max_length=256, null=True, blank=True)
    email = models.CharField(max_length=256, null=True, blank=True)
    name = models.CharField(max_length=256, null=True, blank=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)
