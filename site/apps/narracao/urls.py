# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.narracao import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='narracao_cadastro'),
    url(r'^consulta$', views.list, name='narracao_consulta'),
    url(r'^alteracao/(?P<narracao_id>\d+)$', views.update, name='narracao_alteracao'),
    url(r'^exclusao/(?P<narracao_id>\d+)$', views.delete, name='narracao_exclusao'),   
]