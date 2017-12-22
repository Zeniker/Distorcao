# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.ficha import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='ficha_cadastro'),
    url(r'^ajax/atributos/(?P<narracao_id>\d+)$', views.get_atributos, name='ficha_get_atributos'),
    url(r'^ajax/subatributos/(?P<narracao_id>\d+)$', views.get_subatributos, name='ficha_get_subatributos'),
    #url(r'^consulta$', views.list, name='atributo_consulta'),    
    #url(r'^alteracao/(?P<atributo_id>\d+)$', views.update, name='atributo_alteracao'),
    #url(r'^exclusao/(?P<atributo_id>\d+)$', views.delete, name='atributo_exclusao'),   
]