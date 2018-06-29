from django.conf.urls import url
from apps.calculo import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='calculo_cadastro'),
    url(r'^consulta$', views.list, name='calculo_consulta'),    
    url(r'^alteracao/(?P<calculo_id>\d+)$', views.update, name='calculo_alteracao'),
    url(r'^exclusao/(?P<calculo_id>\d+)$', views.delete, name='calculo_exclusao'),
    url(r'^ajax/get_calculo/(?P<calculo_id>\d+)$', views.get_calculo, name='get_calculo'),
    url(r'^ajax/get_form_options$', views.get_form_options, name='get_calculo_form_options'),
    url(r'^ajax/get_calculo_sistema/(?P<sistema_id>\d+)$', views.get_calculo_sistema_json, name='get_calculo_sistema'),

    
]