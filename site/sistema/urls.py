# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from sistema.views import *

urlpatterns = [
    url(r'^cadastro$', create, name='sistema_cadastro'),
]