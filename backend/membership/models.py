from django.db import models

# Create your models here.


class SubscriptionMedia(models.Model):
    name = models.CharField(max_length=256)
    media = models.FileField(upload_to="plans_media/")


class SubscriptionPlan(models.Model):
    plan_name = models.CharField(
        max_length=256,
    )

    short_name = models.CharField(
        max_length=256,
    )

    description = models.TextField()

    monthly_price = models.DecimalField(
        max_digits=30,
        decimal_places=2,
        null=True,
        blank=True
    )
    total_price = models.DecimalField(
        max_digits=30,
        decimal_places=2,
    )
    sub_type = models.CharField(max_length=256,
                                choices=(('Billed Monthly', 'Billed Monthly'), ('Billed Yearly', 'Billed Yearly')),
                                null=True,
                                blank=True
                                )
    duration = models.IntegerField()
    duration_days = models.IntegerField()
    plan_media = models.ManyToManyField(SubscriptionMedia)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    stripe_product_id = models.CharField(max_length=256, null=True, blank=True)
    stripe_price_id = models.CharField(max_length=256, null=True, blank=True)
    apple_product_id = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.plan_name


class UserMembership(models.Model):
    plan = models.ForeignKey(
        SubscriptionPlan,
        on_delete=models.CASCADE,
    )
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    is_stripe_active = models.BooleanField(null=True, blank=True)
    canceled_at = models.DateTimeField(null=True, blank=True)
    stripe_sub_id = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.plan.plan_name


class PaymentMethod(models.Model):
    card_number = models.CharField(
        max_length=256,
    )
    expiry_date_month = models.IntegerField()
    expiry_date_year = models.IntegerField()
    security_code = models.IntegerField()
    card_holder_name = models.CharField(
        max_length=256,
    )
    stripe_id = models.CharField(max_length=256, null=True, blank=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        if self.stripe_id:
            try:
                return self.stripe_id
            except:
                return str(self.id)
        else:
            return str(self.id)
