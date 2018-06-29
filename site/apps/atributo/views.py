# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from apps.atributo.forms import AtributoForm
from apps.atributo.models import Atributo
from apps.sistema.models import Sistema
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer
from django.http import JsonResponse


def list(request):
    atributos_list = Atributo.objects.all()
    sistemas = Sistema.objects.all()

    page = request.GET.get('page', 1)

    atributos = get_paginated_result(atributos_list, page, 10)

    context = {
        'sistemas': sistemas,
        'atributos': atributos
    }

    return render(request, 'atributo/list.html', context)

def ajax_table(request):
    #sistema_id = request.POST['sistema_id']
    sistema_id = '0'
    
    if sistema_id != '0':
        atributos_list = Atributo.objects.filter(fk_id_sistema=sistema_id)
    else:
        atributos_list = Atributo.objects.all()

    atributos = get_paginated_result(atributos_list, 1, 1)

    return render(request, 'atributo/table.html', {'atributos': atributos})

def create(request):
    template_name = 'atributo/fields.html'    

    if request.method == 'POST':
        form = AtributoForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('atributo_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Atributo', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = AtributoForm()

        form_variables = get_form_variables('Cadastro de Atributo', request.path, form)

        return render(request, template_name, form_variables)

def update(request, atributo_id):
    template_name = 'atributo/fields.html'
    atributo = Atributo.objects.get(id=atributo_id)

    if request.method == 'POST':        
        form = AtributoForm(request.POST, instance=atributo, initial={'fk_id_sistema':atributo.fk_id_sistema})

        if form.is_valid():
            form.save()

            return redirect('atributo_consulta')

        else:
            form_variables = get_form_variables('Alteração de Atributo', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = AtributoForm(instance=atributo, initial={'fk_id_sistema':atributo.fk_id_sistema})

        form_variables = get_form_variables('Alteração de Atributo', request.path, form=form)

        return render(request, template_name, form_variables)

def delete(request, atributo_id):
    template_name = 'atributo/delete.html'

    if request.method == 'POST':
        atributo = Atributo.objects.get(id=atributo_id)        

        atributo.delete()

        return redirect('atributo_consulta')
    else:
        atributo = Atributo.objects.get(id=atributo_id)

        return render(request, template_name, {'atributo': atributo})

def get_atributos_sistema(request, sistema_id):    
    atributos = Atributo.objects.filter(fk_id_sistema=sistema_id)    

    custom_serializer = Serializer()

    atributos_json = custom_serializer.serialize(atributos)

    return JsonResponse(atributos_json, safe=False)        