# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.narracao import views
from apps.narracao.views import NarracaoCreate, NarracaoUpdate, NarracaoDelete, NarracaoList

urlpatterns = [
    url(r'^cadastro$', NarracaoCreate.as_view(), name='narracao_cadastro'),
    url(r'^consulta$', NarracaoList.as_view(), name='narracao_consulta'),
    url(r'^alteracao/(?P<pk>\d+)$', NarracaoUpdate.as_view(), name='narracao_alteracao'),
    url(r'^exclusao/(?P<pk>\d+)$', NarracaoDelete.as_view(), name='narracao_exclusao'),
    url(r'^ajax/get_narracao_sistema/(?P<sistema_id>\d+)$', views.get_narracao_sistema_json, name='get_narracao_sistema'),
    url(r'^ajax/get_narracao/(?P<narracao_id>\d+)$', views.get_narracao, name='get_narracao'),
]