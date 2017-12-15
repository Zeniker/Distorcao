# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from subatributo import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='subatributo_cadastro'),
    url(r'^consulta$', views.list, name='subatributo_consulta'),
    #url(r'^ajax/filtro-tabela$', views.ajax_table, name='atributo_filtro_tabela'),
    #url(r'^alteracao/(?P<atributo_id>\d+)$', views.update, name='atributo_alteracao'),
    #url(r'^exclusao/(?P<atributo_id>\d+)$', views.delete, name='atributo_exclusao'),
    
]