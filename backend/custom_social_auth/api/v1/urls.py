from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import FacebookConnectViewSet

router = DefaultRouter()
router.register("facebook_connect", FacebookConnectViewSet, basename="facebook_connect")


urlpatterns = [
    path("", include(router.urls)),
]
