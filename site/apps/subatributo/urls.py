from django.conf.urls import url
from apps.subatributo import views
from apps.subatributo.views import SubatributoList, SubatributoCreate, SubatributoUpdate, SubatributoDelete

urlpatterns = [
    url(r'^cadastro$', SubatributoCreate.as_view(), name='subatributo_cadastro'),
    url(r'^consulta$', SubatributoList.as_view(), name='subatributo_consulta'),
    #url(r'^ajax/filtro-tabela$', views.ajax_table, name='atributo_filtro_tabela'),
    url(r'^alteracao/(?P<pk>\d+)$', SubatributoUpdate.as_view(), name='subatributo_alteracao'),
    url(r'^exclusao/(?P<pk>\d+)$', SubatributoDelete.as_view(), name='subatributo_exclusao'),
    url(r'^ajax/subatributos_sistema/(?P<sistema_id>\d+)$', views.get_subatributos_sistema, name='get_subatributos_sistema'),

]