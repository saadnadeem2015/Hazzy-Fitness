from django.db import models
from django.contrib.humanize.templatetags import humanize


class Notification(models.Model):
    content = models.TextField()
    from_user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="sent_notifications", null=True, blank=True)
    to_user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="recieved_notifications")

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    @property
    def posted_at_view(self):
        return humanize.naturaltime(self.created_at) if self.created_at is not None else 0


class Feedback(models.Model):
    email = models.CharField(max_length=256)
    message = models.TextField()
    feedback_by = models.ForeignKey('users.User', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
