# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from sistema import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='sistema_cadastro'),
    url(r'^consulta$', views.list, name='sistema_consulta'),
    url(r'^alteracao/(?P<sistema_id>\d+)$', views.update, name='sistema_alteracao'),
    url(r'^exclusao/(?P<sistema_id>\d+)$', views.delete, name='sistema_exclusao'),
    
]