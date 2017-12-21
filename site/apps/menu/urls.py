# arquivo connectedin/perfis/urls.py

from django.conf.urls import url
from apps.menu.views import *

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^ficha$', ficha_simulador, name='ficha_simulador'),    
    url(r'^calculadora/dano$', calculadora_dano, name='calculadora_dano'),
    url(r'^acoes$', acoes, name='acoes'),
    url(r'^simulador/combate$', simulador_combate, name='simulador_combate'),
    url(r'^tabela/inicializacao$', tabela_inicializacao, name='tabela_inicializacao'),
]