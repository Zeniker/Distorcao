# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.shortcuts import redirect
from apps.subatributo.forms import SubatributoForm
from apps.subatributo.models import *
from apps.sistema.models import Sistema
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer
from django.http import JsonResponse

# Create your views here.
def list(request):
    subatributos_list = Subatributo.objects.all()
    sistemas = Sistema.objects.all()

    page = request.GET.get('page', 1)

    subatributos = get_paginated_result(subatributos_list, page, 10)

    context = {
        'sistemas': sistemas,
        'subatributos': subatributos
    }

    return render(request, 'subatributo/list.html', context)

def create(request):    
    template_name = 'subatributo/fields.html'    

    if request.method == 'POST':
        form = SubatributoForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('subatributo_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Subatributo', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = SubatributoForm()

        form_variables = get_form_variables('Cadastro de Subatributo', request.path, form)

        return render(request, template_name, form_variables)


def update(request, subatributo_id):
    template_name = 'subatributo/fields.html'
    subatributo = Subatributo.objects.get(id=subatributo_id)

    if request.method == 'POST':        
        form = SubatributoForm(request.POST, instance=subatributo, initial={'fk_id_sistema':subatributo.fk_id_sistema})

        if form.is_valid():
            form.save()

            return redirect('subatributo_consulta')

        else:
            form_variables = get_form_variables('Alteração de Subatributo', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = SubatributoForm(instance=subatributo, initial={'fk_id_sistema':subatributo.fk_id_sistema})

        form_variables = get_form_variables('Alteração de Subatributo', request.path, form=form)

        return render(request, template_name, form_variables)

def delete(request, subatributo_id):
    template_name = 'subatributo/delete.html'

    if request.method == 'POST':
        subatributo = Subatributo.objects.get(id=subatributo_id)        

        subatributo.delete()

        return redirect('subatributo_consulta')
    else:
        subatributo = Subatributo.objects.get(id=subatributo_id)

        return render(request, template_name, {'subatributo': subatributo})

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