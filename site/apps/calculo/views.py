# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.shortcuts import render, redirect
from apps.calculo.models import *
from apps.calculo.forms import CalculoForm
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.json_complex_encoder import *
from distorcao.serializer import Serializer
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from apps.calculo.choices import *
from apps.sistema.views import get_lista_sistemas
from distorcao.json_response import json_response

# Create your views here.
def list(request):
    result_list = Calculo.objects.all()    

    page = request.GET.get('page', 1)

    calculos = get_paginated_result(result_list, page, 10)

    context = {        
        'calculos': calculos
    }

    return render(request, 'calculo/list.html', context)

def create(request):    
    template_name = 'calculo/fields.html'    

    if request.method == 'POST':            
        form = CalculoForm(json.loads(request.body))        

        if form.is_valid():
            form.save()

            resposta = json_response()
            resposta.status = 'OK'
            resposta.data = reverse('calculo_consulta')

            json_string = json.dumps(resposta,cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')
        else:
            form_variables = get_form_variables('Cadastro de Cálculo', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = CalculoForm()

        form_variables = get_form_variables('Cadastro de Cálculo', request.path)

        return render(request, template_name, form_variables)

def update(request, calculo_id):
    template_name = 'calculo/fields.html'
    calculo = Calculo.objects.get(id=calculo_id)

    initial = {
        'fk_id_atributo':calculo.fk_id_atributo,
        'fk_id_subatributo':calculo.fk_id_subatributo,
    }

    if request.method == 'POST':        
        form = CalculoForm(json.loads(request.body), instance=calculo, initial=initial)

        if form.is_valid():
            form.save()

            resposta = json_response()
            resposta.status = 'OK'
            resposta.data = reverse('calculo_consulta')

            json_string = json.dumps(resposta,cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')            
        else:
            form_variables = get_form_variables('Alteração de Cálculo', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        #form = Atributo_subatributoForm(instance=atributo_subatributo, initial=initial)

        #form = CalculoForm()

        form_variables = get_form_variables('Alteração de Cálculo', request.path, id=calculo_id)

        return render(request, template_name, form_variables)

def delete(request, calculo_id):
    template_name = 'calculo/delete.html'

    if request.method == 'POST':
        calculo = Calculo.objects.get(id=calculo_id)        

        calculo.delete()

        return redirect('calculo_consulta')
    else:
        calculo = Calculo.objects.get(id=calculo_id)

        return render(request, template_name, {'calculo': calculo})

# def get_calculo_json(calculo_id):
#     lista_atributo_subatributo = Atributo_subatributo.objects.filter(fk_id_subatributo=subatributo_id)
#     lista_atributo_subatributo_json = []

#     for atributo_subatributo in lista_atributo_subatributo:
#         atributo_subatributo_json = Atributo_subatributo_json()
#         atributo_subatributo_json.id = atributo_subatributo.id
#         atributo_subatributo_json.fk_id_atributo = atributo_subatributo.fk_id_atributo.id
#         atributo_subatributo_json.fk_id_subatributo = atributo_subatributo.fk_id_subatributo.id
#         atributo_subatributo_json.tipo_relacao_atributo_subatributo = atributo_subatributo.tipo_relacao_atributo_subatributo
#         atributo_subatributo_json.intervalo_atributo_subatributo = atributo_subatributo.intervalo_atributo_subatributo
#         atributo_subatributo_json.multiplicador_atributo_subatributo = atributo_subatributo.multiplicador_atributo_subatributo
#         lista_atributo_subatributo_json.append(atributo_subatributo_json)

#     return lista_atributo_subatributo_json

def get_calculo(request, calculo_id):    
    calculo = Calculo.objects.filter(id=calculo_id)

    custom_serializer = Serializer()

    calculo_json = custom_serializer.serialize(calculo)

    return JsonResponse(calculo_json, safe=False)

def get_form_options(request):
    lista_sistemas = get_lista_sistemas()
    choices = CalculoChoices()
    
    choices.sistemas = lista_sistemas

    json_string = json.dumps(choices,cls=ComplexEncoder)

    return HttpResponse(json_string, content_type='application/json')

def get_calculo_sistema(sistema_id):
    return Calculo.objects.filter(fk_id_sistema=sistema_id)  
    
def get_calculo_sistema_json(request, sistema_id):
    lista_calculo = get_calculo_sistema(sistema_id)

    custom_serializer = Serializer()

    calculo_json = custom_serializer.serialize(lista_calculo)

    return JsonResponse(calculo_json, safe=False)
