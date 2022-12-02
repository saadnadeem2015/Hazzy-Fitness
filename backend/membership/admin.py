from django.contrib import admin
from .models import (
    SubscriptionMedia,
    SubscriptionPlan,
    UserMembership,
    PaymentMethod
)
# Register your models here.

admin.site.register(SubscriptionMedia)
admin.site.register(SubscriptionPlan)
admin.site.register(UserMembership)
admin.site.register(PaymentMethod)
