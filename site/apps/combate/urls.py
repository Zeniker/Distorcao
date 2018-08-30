
from django.conf.urls import url
from apps.combate.views import *

urlpatterns = [
    url(r'^principal$', CombateView.as_view(), name='combate_principal'),
]

