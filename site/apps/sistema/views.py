# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.urls import reverse
from distorcao.classviews import CustomCreateView, CustomUpdateView, CustomDeleteView, CustomListView
from apps.sistema.forms import SistemaForm
from apps.sistema.models import Sistema, SistemaJson
from distorcao.viewhelper import update_context
from django.http import HttpResponse
from distorcao.views import get_paginated_result
from distorcao.json_complex_encoder import *


class SistemaCreate(CustomCreateView):
    template_name = 'sistema/fields.html'
    form_class = SistemaForm

    def get_success_url(self):
        return reverse('sistema_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SistemaCreate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Cadastro de Sistema')
        return context_data


class SistemaUpdate(CustomUpdateView):
    template_name = 'sistema/fields.html'
    form_class = SistemaForm
    model = Sistema

    def get_success_url(self):
        return reverse('sistema_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SistemaUpdate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Alteração de Sistema')
        return context_data


class SistemaDelete(CustomDeleteView):
    template_name = 'sistema/delete.html'
    form_class = SistemaForm
    model = Sistema

    def get_success_url(self):
        return reverse('sistema_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SistemaDelete, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Exclusão de Sistema')
        return context_data


class SistemaList(CustomListView):
    template_name = 'sistema/list.html'
    model = Sistema
    paginate_by = 10
    context_object_name = "lista_sistemas"

def get_lista_sistemas():
    lista_sistema = Sistema.objects.all()
    lista_sistema_json = []

    for sistema in lista_sistema:
        sistema_json = SistemaJson()
        sistema_json.id = sistema.id
        sistema_json.nome_sistema = sistema.nome_sistema
        lista_sistema_json.append(sistema_json)

    return lista_sistema_json


def get_lista_sistema_json(request):
    lista_sistema = get_lista_sistemas()

    json_string = json.dumps(lista_sistema,cls=ComplexEncoder)

    return HttpResponse(json_string, content_type='application/json')
