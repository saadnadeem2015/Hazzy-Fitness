import stripe
from django.utils.crypto import get_random_string
import datetime as dt
from .models import PaymentMethod, SubscriptionPlan
stripe.api_key = "sk_test_51JifhFGjf6iOtLuPGLss1wenzm9EkGjPzeZ6mzJ4vC69UzufBVdjYxFsKl8OgINKrJF1ndowERSgi6pwJFCSplUE004g5jEbPA"


def create_stripe_customer(name, email):
    customer = stripe.Customer.create(
        description="Hazzy Fitness Customer",
        email=email,
        name=name
    )
    return customer['id']


def create_stripe_payment_card(number, exp_month, exp_year, cvv, customer):
    payment = stripe.PaymentMethod.create(
        type="card",
        card={
            "number": number,
            "exp_month": exp_month,
            "exp_year": exp_year,
            "cvc": cvv,
        },
    )

    stripe.PaymentMethod.attach(
        payment['id'],
        customer=customer,
    )
    #stripe.Customer.modify(
    #    customer,
    #    invoice_settings={"default_payment_method": payment['id']},
    #)
    return payment['id']


def stripe_subscribe_customer(customer, price, payment_method):
    plan_obj = SubscriptionPlan.objects.filter(stripe_price_id=price).first()
    if plan_obj:
        trial_days = plan_obj.trial_days
    else:
        trial_days = 0
    subscription = stripe.Subscription.create(
        customer=customer,
        items=[
            {"price": price},
        ],
        off_session=True,
        enable_incomplete_payments=False,
        collection_method="charge_automatically",
        default_payment_method=payment_method,
        trial_period_days=trial_days
    )

    return subscription


def create_stripe_payment(customer, price, payment):

    subscription = stripe_subscribe_customer(customer, price, payment)

    return subscription


def create_payment_method(stripe_id):
    user_payment = PaymentMethod.objects.create(
        stripe_id=stripe_id,
    )

    return user_payment


def cancel_stripe_subscription(sub_id):
    sub_info = stripe.Subscription.delete(
        sub_id,
    )

    return sub_info
