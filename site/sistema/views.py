# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.generic.base import View
from django.core.urlresolvers import reverse
from sistema.forms import SistemaForm
from sistema.models import Sistema

def list(request):
    sistemas = Sistema.objects.all()
    return render(request, 'list.html', {'sistemas' : sistemas})

def create(request):
    template_name = 'fields.html'    

    if request.method == 'POST':
        form = SistemaForm(request.POST)

        if form.is_valid():
            dados_form = form.data

            sistema = Sistema(nome_sistema=dados_form['nome_sistema'])

            sistema.save()

            return redirect('sistema_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Sistema', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form_variables = get_form_variables('Cadastro de Sistema', request.path)                

        return render(request, template_name, form_variables)

def update(request, sistema_id):
    template_name = 'fields.html'

    if request.method == 'POST':
        form = SistemaForm(request.POST)

        if form.is_valid():
            dados_form = form.data

            sistema = Sistema.objects.get(id=sistema_id)
            sistema.nome_sistema = dados_form['nome_sistema']

            sistema.save()

            return redirect('sistema_consulta')

        else:
            form_variables = get_form_variables('Alteração de Sistema', request.path, form)
        
            return render(request, template_name, form_variables)
    else:
        sistema = Sistema.objects.get(id=sistema_id)

        form_variables = get_form_variables('Alteração de Sistema', request.path, sistema=sistema)

        return render(request, template_name, form_variables)

def delete(request, sistema_id):
    template_name = 'delete.html'

    if request.method == 'POST':
        sistema = Sistema.objects.get(id=sistema_id)        

        sistema.delete()

        return redirect('sistema_consulta')
    else:
        sistema = Sistema.objects.get(id=sistema_id)

        return render(request, template_name, {'sistema': sistema})

def get_form_variables(page_header, url_destino, form=None, sistema=None):
    form_variables = {
        'page_header' : page_header,
        'url_destino' : url_destino,
        'form' : form,
        'sistema' : sistema
    }

    return form_variables