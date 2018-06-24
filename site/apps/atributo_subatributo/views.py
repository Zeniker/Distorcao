# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from apps.atributo_subatributo.models import *
from apps.atributo_subatributo.forms import Atributo_subatributoForm
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.json_complex_encoder import *
from distorcao.serializer import Serializer
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from apps.atributo_subatributo.choices import *
from apps.sistema.views import get_sistemas_json
import json
from distorcao.json_response import json_response

# Create your views here.
def list(request):
    result_list = Atributo_subatributo.objects.all()    

    page = request.GET.get('page', 1)

    atributos_subatributos = get_paginated_result(result_list, page, 10)

    context = {        
        'atributos_subatributos': atributos_subatributos
    }

    return render(request, 'atributo_subatributo/list.html', context)

def create(request):    
    template_name = 'atributo_subatributo/fields.html'    

    if request.method == 'POST':            
        form = Atributo_subatributoForm(json.loads(request.body))        

        if form.is_valid():
            form.save()

            resposta = json_response()
            resposta.status = 'OK'
            resposta.data = reverse('atributo_subatributo_consulta')

            json_string = json.dumps(resposta,cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')
        else:
            form_variables = get_form_variables('Cadastro de Cálculo', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = Atributo_subatributoForm()

        form_variables = get_form_variables('Cadastro de Cálculo', request.path)

        return render(request, template_name, form_variables)

def update(request, atributo_subatributo_id):
    template_name = 'atributo_subatributo/fields.html'
    atributo_subatributo = Atributo_subatributo.objects.get(id=atributo_subatributo_id)

    initial = {
        'fk_id_atributo':atributo_subatributo.fk_id_atributo,
        'fk_id_subatributo':atributo_subatributo.fk_id_subatributo,
    }

    if request.method == 'POST':        
        form = Atributo_subatributoForm(json.loads(request.body), instance=atributo_subatributo, initial=initial)

        if form.is_valid():
            form.save()

            resposta = json_response()
            resposta.status = 'OK'
            resposta.data = reverse('atributo_subatributo_consulta')

            json_string = json.dumps(resposta,cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')            
        else:
            form_variables = get_form_variables('Alteração de Cálculo', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        #form = Atributo_subatributoForm(instance=atributo_subatributo, initial=initial)

        form = Atributo_subatributoForm()

        form_variables = get_form_variables('Alteração de Cálculo', request.path, form=form, id=atributo_subatributo_id)

        return render(request, template_name, form_variables)

def delete(request, atributo_subatributo_id):
    template_name = 'atributo_subatributo/delete.html'

    if request.method == 'POST':
        atributo_subatributo = Atributo_subatributo.objects.get(id=atributo_subatributo_id)        

        atributo_subatributo.delete()

        return redirect('atributo_subatributo_consulta')
    else:
        atributo_subatributo = Atributo_subatributo.objects.get(id=atributo_subatributo_id)

        return render(request, template_name, {'atributo_subatributo': atributo_subatributo})

def getAtributo_subatributo_json(subatributo_id):
    lista_atributo_subatributo = Atributo_subatributo.objects.filter(fk_id_subatributo=subatributo_id)
    lista_atributo_subatributo_json = []

    for atributo_subatributo in lista_atributo_subatributo:
        atributo_subatributo_json = Atributo_subatributo_json()
        atributo_subatributo_json.id = atributo_subatributo.id
        atributo_subatributo_json.fk_id_atributo = atributo_subatributo.fk_id_atributo.id
        atributo_subatributo_json.fk_id_subatributo = atributo_subatributo.fk_id_subatributo.id
        atributo_subatributo_json.tipo_relacao_atributo_subatributo = atributo_subatributo.tipo_relacao_atributo_subatributo
        atributo_subatributo_json.intervalo_atributo_subatributo = atributo_subatributo.intervalo_atributo_subatributo
        atributo_subatributo_json.multiplicador_atributo_subatributo = atributo_subatributo.multiplicador_atributo_subatributo
        lista_atributo_subatributo_json.append(atributo_subatributo_json)

    return lista_atributo_subatributo_json

def get_atributo_subatributo(request, id_atributo_subatributo):    
    atributo_subatributo = Atributo_subatributo.objects.filter(id=id_atributo_subatributo)    

    custom_serializer = Serializer()

    atributo_subatributo_json = custom_serializer.serialize(atributo_subatributo)

    return JsonResponse(atributo_subatributo_json, safe=False)

def get_form_options(request):
    teste = get_sistemas_json()
    choices = calculo_choices()
    
    choices.sistemas = teste

    json_string = json.dumps(choices,cls=ComplexEncoder)

    return HttpResponse(json_string, content_type='application/json')
    
