# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from apps.subatributo.forms import SubatributoForm
from apps.subatributo.models import *
from distorcao.serializer import Serializer
from django.http import JsonResponse
from distorcao.classviews import CustomCreateView, CustomUpdateView, CustomDeleteView, CustomListView
from distorcao.viewhelper import update_context

# Views do subatributo.


class SubatributoCreate(LoginRequiredMixin, CustomCreateView):
    template_name = 'subatributo/fields.html'
    form_class = SubatributoForm

    def get_success_url(self):
        return reverse('subatributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SubatributoCreate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Cadastro de Subatributo')
        return context_data


class SubatributoUpdate(LoginRequiredMixin, CustomUpdateView):
    template_name = 'subatributo/fields.html'
    form_class = SubatributoForm
    model = Subatributo

    def get_success_url(self):
        return reverse('subatributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SubatributoUpdate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Alteração de Subatributo')
        return context_data


class SubatributoDelete(LoginRequiredMixin, CustomDeleteView):
    template_name = 'subatributo/delete.html'
    form_class = SubatributoForm
    model = Subatributo

    def get_success_url(self):
        return reverse('subatributo_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SubatributoDelete, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Exclusão de Sistema')
        return context_data


class SubatributoList(LoginRequiredMixin, CustomListView):
    template_name = 'subatributo/list.html'
    model = Subatributo
    paginate_by = 10
    context_object_name = "lista_subatributos"


@login_required
def get_subatributos_sistema(request, sistema_id):    
    subatributos = Subatributo.objects.filter(fk_id_sistema=sistema_id)    

    custom_serializer = Serializer()

    subatributos_json = custom_serializer.serialize(subatributos)

    return JsonResponse(subatributos_json, safe=False)            


def getSubatributos_json(sistema_id):
    lista_subatributo = Subatributo.objects.filter(fk_id_sistema=sistema_id)
    lista_subatributo_json = []

    for subatributo in lista_subatributo:
        subatributo_json = Subatributo_json()
        subatributo_json.id = subatributo.id
        subatributo_json.fk_id_sistema = subatributo.fk_id_sistema.id
        subatributo_json.nome_subatributo = subatributo.nome_subatributo
        subatributo_json.tipo_subatributo = subatributo.tipo_subatributo
        subatributo_json.valor_inicial_subatributo = subatributo.valor_inicial_subatributo
        lista_subatributo_json.append(subatributo_json)

    return lista_subatributo_json