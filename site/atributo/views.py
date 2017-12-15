# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from atributo.forms import AtributoForm
from atributo.models import Atributo
from distorcao.views import get_form_variables


def list(request):
    atributos = Atributo.objects.all()
    return render(request, 'atributo/list.html', {'atributos' : atributos})

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
            form_variables = get_form_variables('Alteração de Cadastro', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = AtributoForm(instance=atributo, initial={'fk_id_sistema':atributo.fk_id_sistema})

        form_variables = get_form_variables('Alteração de Cadastro', request.path, form=form)

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