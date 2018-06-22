from django.shortcuts import render, redirect
from django.http import HttpResponse
from apps.ficha.models import Ficha, Subatributo_calculo
from apps.narracao.models import Narracao
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo
from apps.atributo_subatributo.models import Atributo_subatributo
from apps.ficha.forms import FichaForm
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer
from django.http import JsonResponse

# Create your views here.
def list(request):
    fichas_list = Ficha.objects.all()
    narracoes = Narracao.objects.all()

    page = request.GET.get('page', 1)

    fichas = get_paginated_result(fichas_list, page, 10)

    context = {
        'narracoes': narracoes,
        'fichas': fichas
    }

    return render(request, 'ficha/list.html', context)

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

def get_subatributos(request, narracao_id):
    narracao = Narracao.objects.get(id=narracao_id)

    subatributos = Subatributo.objects.filter(fk_id_sistema=narracao.fk_id_sistema.id)

    custom_serializer = Serializer()

    subatributos_json = custom_serializer.serialize(subatributos)

    return JsonResponse(subatributos_json, safe=False)

def get_atributos_subatributos(request, narracao_id):
    narracao = Narracao.objects.get(id=narracao_id)

    subatributos = Atributo_subatributo.objects.filter(fk_id_sistema=narracao.fk_id_sistema.id)

    custom_serializer = Serializer()

    subatributos_json = custom_serializer.serialize(subatributos)

    return JsonResponse(subatributos_json, safe=False)