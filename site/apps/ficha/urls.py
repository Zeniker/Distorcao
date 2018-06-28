
from django.conf.urls import url
from apps.ficha import views

urlpatterns = [
    url(r'^cadastro$', views.create, name='ficha_cadastro'),    
    url(r'^consulta$', views.list, name='ficha_consulta'),
    url(r'^ajax/get_ficha/(?P<ficha_id>\d+)$', views.get_ficha, name='get_ficha'),
    url(r'^alteracao/(?P<ficha_id>\d+)$', views.update, name='ficha_alteracao'),
    url(r'^exclusao/(?P<ficha_id>\d+)$', views.delete, name='ficha_exclusao'),
]