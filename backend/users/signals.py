from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User
from questionnaire.models import Questionnaire

# from bongo_applicants.models import Applicantion

# from occupational_info.models import OccupationalInfo
# from educational_info.models import EducationalInfo


@receiver(post_save, sender=User)
def create_related_profile(sender, instance, created, *args, **kwargs):
    # Notice that we're checking for `created` here. We only want to do this
    # the first time the `User` instance is created. If the save that caused
    # this signal to be run was an update action, we know the user already
    # has a profile.
    if instance and created:
        instance.profile = Questionnaire.objects.create(user=instance)
        # instance.application = Applicantion.objects.create(user=instance)
        # instance.occupational_info = OccupationalInfo.objects.create(user=instance)
        # instance.educational_info = EducationalInfo.objects.create(user=instance)
