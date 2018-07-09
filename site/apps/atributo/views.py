# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.urls import reverse
from apps.atributo.forms import AtributoForm
from apps.atributo.models import Atributo
from apps.sistema.models import Sistema
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer
from django.http import JsonResponse
from distorcao.classviews import CustomCreateView, CustomUpdateView, CustomDeleteView, CustomListView
from distorcao.viewhelper import update_context


# Views do Atributo
class AtributoList(CustomListView):
    template_name = 'atributo/list.html'
    model = Atributo
    paginate_by = 10
    context_object_name = 'lista_atributos'


class AtributoCreate(CustomCreateView):
    template_name = 'atributo/fields.html'
    form_class = AtributoForm

    def get_success_url(self):
        return reverse('atributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(AtributoCreate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Cadastro de Atributo')
        return context_data


class AtributoUpdate(CustomUpdateView):
    template_name = 'atributo/fields.html'
    form_class = AtributoForm
    model = Atributo

    def get_success_url(self):
        return reverse('atributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(AtributoUpdate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Alteração de Atributo')
        return context_data


class AtributoDelete(CustomDeleteView):
    template_name = 'atributo/delete.html'
    form_class = AtributoForm
    model = Atributo

    def get_success_url(self):
        return reverse('atributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(AtributoDelete, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Exclusão de Atributo')
        return context_data


def get_atributos_sistema(request, sistema_id):
    atributos = Atributo.objects.filter(fk_id_sistema=sistema_id)    

    custom_serializer = Serializer()

    atributos_json = custom_serializer.serialize(atributos)

    return JsonResponse(atributos_json, safe=False)


def get_atributos_sistema_sem_texto(request, sistema_id):
    atributos = Atributo.objects.filter(fk_id_sistema=sistema_id).exclude(tipo_atributo=1)

    custom_serializer = Serializer()

    atributos_json = custom_serializer.serialize(atributos)

    return JsonResponse(atributos_json, safe=False)