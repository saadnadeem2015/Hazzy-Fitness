from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from membership.models import PaymentMethod, UserMembership


class Gender(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Sex"
        verbose_name_plural = "Sex"


class Country(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)

    sex = models.ForeignKey(Gender, on_delete=models.CASCADE, null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True)

    profile_image = models.ImageField(upload_to="profile_media/", null=True, blank=True)

    goal_calories = models.FloatField(null=True, blank=True)
    goal_protein = models.FloatField(null=True, blank=True)
    goal_carbohydrates = models.FloatField(null=True, blank=True)
    goal_fats = models.FloatField(null=True, blank=True)

    workout_program = models.ForeignKey('workouts.Program', on_delete=models.CASCADE, null=True, blank=True)

    payment_method = models.ForeignKey(
        PaymentMethod,
        on_delete=models.SET_NULL,
        null=True,
        related_name="payment_method_user"
    )

    active_membership = models.ForeignKey(
        UserMembership,
        on_delete=models.SET_NULL,
        null=True,
        related_name="active_membership"
    )

    memberships = models.ManyToManyField(
        UserMembership, blank=True
    )

    payment_cards = models.ManyToManyField(
        PaymentMethod, blank=True
    )

    stripe_cust_id = models.CharField(max_length=256, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class PasswordResetToken(models.Model):
    requested_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    token = models.IntegerField()
    expiry_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.token)


class AccountVerifyToken(models.Model):
    requested_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    token = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    email_sent = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return str(self.token)
