# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.generic.base import View
from apps.sistema.forms import SistemaForm
from apps.sistema.models import Sistema
from distorcao.views import get_form_variables

def list(request):
    sistemas = Sistema.objects.all()
    return render(request, 'sistema/list.html', {'sistemas' : sistemas})

def create(request):
    template_name = 'sistema/fields.html'    

    if request.method == 'POST':
        form = SistemaForm(request.POST)

        if form.is_valid():        
            form.save()

            return redirect('sistema_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Sistema', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = SistemaForm()

        form_variables = get_form_variables('Cadastro de Sistema', request.path, form)                

        return render(request, template_name, form_variables)

def update(request, sistema_id):
    template_name = 'sistema/fields.html'
    sistema = Sistema.objects.get(id=sistema_id)

    if request.method == 'POST':        
        form = SistemaForm(request.POST, instance=sistema)

        if form.is_valid():
            form.save()

            return redirect('sistema_consulta')

        else:
            form_variables = get_form_variables('Alteração de Sistema', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = SistemaForm(instance=sistema)

        form_variables = get_form_variables('Alteração de Sistema', request.path, form=form)

        return render(request, template_name, form_variables)

def delete(request, sistema_id):
    template_name = 'sistema/delete.html'

    if request.method == 'POST':
        sistema = Sistema.objects.get(id=sistema_id)        

        sistema.delete()

        return redirect('sistema_consulta')
    else:
        sistema = Sistema.objects.get(id=sistema_id)

        return render(request, template_name, {'sistema': sistema})