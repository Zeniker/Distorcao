# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.atributo import views
from apps.atributo.views import AtributoList, AtributoCreate, AtributoUpdate, AtributoDelete

urlpatterns = [
    url(r'^cadastro$', AtributoCreate.as_view(), name='atributo_cadastro'),
    url(r'^consulta$', AtributoList.as_view(), name='atributo_consulta'),
    url(r'^alteracao/(?P<pk>\d+)$', AtributoUpdate.as_view(), name='atributo_alteracao'),
    url(r'^exclusao/(?P<pk>\d+)$', AtributoDelete.as_view(), name='atributo_exclusao'),
    url(r'^ajax/atributos_sistema/(?P<sistema_id>\d+)$', views.get_atributos_sistema, name='get_atributos_sistema'),
]