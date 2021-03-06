"""mealing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from reporter.views import UserViewSet, ReporterViewSet, AuthView
from meal.views import MealViewSet
from .views import MealingIndexView

api_v1_router = routers.DefaultRouter()
api_v1_router.register(r'user', UserViewSet)
api_v1_router.register(r'reporter', ReporterViewSet)
api_v1_router.register(r'meal', MealViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(api_v1_router.urls)),
    url(r'^api/v1/auth/$', AuthView.as_view()),
    url(r'^$', MealingIndexView.as_view()),
]
