# -*- coding: utf-8 -*-
import json
from django.shortcuts import render
from django.shortcuts import redirect
from django.urls import reverse
from distorcao.classviews import CustomCreateView
from django.views.generic import CreateView
from apps.sistema.forms import SistemaForm
from apps.sistema.models import *
from distorcao.views import get_form_variables
from distorcao.viewhelper import update_context
from django.http import JsonResponse, HttpResponse
from distorcao.json_complex_encoder import *

class SistemaCreate(CustomCreateView):
    template_name = 'sistema/fields.html'
    form_class = SistemaForm

    def get_success_url(self):
        return reverse('sistema_consulta')

    def get_context_data(self, **kwargs):
        context_data = super(SistemaCreate, self).get_context_data(**kwargs)
        context_data = update_context(context_data, 'Cadastro de Sistema', self.request.path)
        return context_data

def list(request):
    sistemas = Sistema.objects.all()
    return render(request, 'sistema/list.html', {'sistemas' : sistemas})

def create(request):


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

def get_lista_sistemas():
    lista_sistema = Sistema.objects.all()
    lista_sistema_json = []

    for sistema in lista_sistema:
        sistema_json = Sistema_json()
        sistema_json.id = sistema.id
        sistema_json.nome_sistema = sistema.nome_sistema
        lista_sistema_json.append(sistema_json)

    return lista_sistema_json

def get_lista_sistema_json(request):
    lista_sistema = get_lista_sistemas()

    json_string = json.dumps(lista_sistema,cls=ComplexEncoder)

    return HttpResponse(json_string, content_type='application/json')
