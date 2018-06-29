# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.sistema import views
from apps.sistema.views import SistemaCreate

urlpatterns = [
    url(r'^cadastro$', SistemaCreate.as_view(), name='sistema_cadastro'),
    url(r'^consulta$', views.list, name='sistema_consulta'),
    url(r'^alteracao/(?P<sistema_id>\d+)$', views.update, name='sistema_alteracao'),
    url(r'^exclusao/(?P<sistema_id>\d+)$', views.delete, name='sistema_exclusao'),
    url(r'^ajax/get_lista_sistema$', views.get_lista_sistema_json, name='get_lista_sistema'),
    
]