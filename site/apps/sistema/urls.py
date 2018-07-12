# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.sistema import views
from apps.sistema.views import SistemaCreate, SistemaUpdate, SistemaDelete, SistemaList

urlpatterns = [
    url(r'^cadastro$', SistemaCreate.as_view(), name='sistema_cadastro'),
    url(r'^consulta$', SistemaList.as_view(), name='sistema_consulta'),
    url(r'^alteracao/(?P<pk>\d+)$', SistemaUpdate.as_view(), name='sistema_alteracao'),
    url(r'^exclusao/(?P<pk>\d+)$', SistemaDelete.as_view(), name='sistema_exclusao'),
    url(r'^ajax/get_lista_sistema$', views.get_lista_sistema_json, name='get_lista_sistema'),
    
]