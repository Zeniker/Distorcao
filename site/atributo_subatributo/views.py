# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from atributo_subatributo.models import Atributo_subatributo
from atributo_subatributo.forms import Atributo_subatributoForm
from distorcao.views import get_form_variables, get_paginated_result

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
        form = Atributo_subatributoForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('atributo_subatributo_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Relação', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = Atributo_subatributoForm()

        form_variables = get_form_variables('Cadastro de Relação', request.path, form)

        return render(request, template_name, form_variables)

def update(request, atributo_subatributo_id):
    template_name = 'atributo_subatributo/fields.html'
    atributo_subatributo = Atributo_subatributo.objects.get(id=atributo_subatributo_id)

    initial = {
        'fk_id_atributo':atributo_subatributo.fk_id_atributo,
        'fk_id_subatributo':atributo_subatributo.fk_id_subatributo,
    }

    if request.method == 'POST':        
        form = Atributo_subatributoForm(request.POST, instance=atributo_subatributo, initial=initial)

        if form.is_valid():
            form.save()

            return redirect('atributo_subatributo_consulta')

        else:
            form_variables = get_form_variables('Alteração de Relação', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = Atributo_subatributoForm(instance=atributo_subatributo, initial=initial)

        form_variables = get_form_variables('Alteração de Relação', request.path, form=form)

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