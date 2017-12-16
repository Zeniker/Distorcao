# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.shortcuts import redirect
from subatributo.forms import SubatributoForm
from subatributo.models import Subatributo
from sistema.models import Sistema
from distorcao.views import get_form_variables, get_paginated_result

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