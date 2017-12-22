from django.shortcuts import render, redirect
from apps.ficha.models import Ficha
from apps.narracao.models import Narracao
from apps.atributo.models import Atributo
from apps.ficha.forms import FichaForm
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer

from django.http import JsonResponse

# Create your views here.
def create(request):
    template_name = 'ficha/fields.html'    

    if request.method == 'POST':
        form = FichaForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('ficha_cadastro')
        else:
            form_variables = get_form_variables('Cadastro de Ficha', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = FichaForm()

        form_variables = get_form_variables('Cadastro de Ficha', request.path, form)

        return render(request, template_name, form_variables)

def get_atributos(request, narracao_id):
    narracao = Narracao.objects.get(id=narracao_id)

    atributos = Atributo.objects.filter(fk_id_sistema=narracao.fk_id_sistema.id)    

    custom_serializer = Serializer()

    atributos_json = custom_serializer.serialize(atributos)

    return JsonResponse(atributos_json, safe=False)

