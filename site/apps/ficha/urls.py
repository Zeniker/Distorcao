
from django.conf.urls import url
from apps.ficha import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='ficha_cadastro'),    
    url(r'^consulta$', views.list, name='ficha_consulta'),    
    #url(r'^alteracao/(?P<atributo_id>\d+)$', views.update, name='atributo_alteracao'),
    #url(r'^exclusao/(?P<atributo_id>\d+)$', views.delete, name='atributo_exclusao'),   
]