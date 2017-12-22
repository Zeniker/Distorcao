from django.conf.urls import url
from apps.atributo_subatributo import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='atributo_subatributo_cadastro'),
    url(r'^consulta$', views.list, name='atributo_subatributo_consulta'),    
    url(r'^alteracao/(?P<atributo_subatributo_id>\d+)$', views.update, name='atributo_subatributo_alteracao'),
    url(r'^exclusao/(?P<atributo_subatributo_id>\d+)$', views.delete, name='atributo_subatributo_exclusao'),
    
]