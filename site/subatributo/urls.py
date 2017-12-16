# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from subatributo import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='subatributo_cadastro'),
    url(r'^consulta$', views.list, name='subatributo_consulta'),
    #url(r'^ajax/filtro-tabela$', views.ajax_table, name='atributo_filtro_tabela'),
    url(r'^alteracao/(?P<subatributo_id>\d+)$', views.update, name='subatributo_alteracao'),
    url(r'^exclusao/(?P<subatributo_id>\d+)$', views.delete, name='subatributo_exclusao'),
    
]