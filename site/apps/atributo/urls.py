# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.atributo import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='atributo_cadastro'),
    url(r'^consulta$', views.list, name='atributo_consulta'),
    url(r'^ajax/filtro-tabela$', views.ajax_table, name='atributo_filtro_tabela'),
    url(r'^alteracao/(?P<atributo_id>\d+)$', views.update, name='atributo_alteracao'),
    url(r'^exclusao/(?P<atributo_id>\d+)$', views.delete, name='atributo_exclusao'),   
    url(r'^ajax/atributos_sistema/(?P<sistema_id>\d+)$', views.get_atributos_sistema, name='get_atributos_sistema'),
]