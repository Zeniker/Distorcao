import json
from django.shortcuts import render, redirect
from apps.narracao.models import Narracao, NarracaoJson
from apps.narracao.forms import NarracaoForm
from distorcao.views import get_form_variables, get_paginated_result
from django.http import JsonResponse, HttpResponse
from distorcao.json_complex_encoder import *
from distorcao.serializer import Serializer


def list(request):
    narracao_list = Narracao.objects.all()

    page = request.GET.get('page', 1)

    narracoes = get_paginated_result(narracao_list, page, 10)

    context = {
        'narracoes': narracoes
    }

    return render(request, 'narracao/list.html', context)


def create(request):
    template_name = 'narracao/fields.html'    

    if request.method == 'POST':
        form = NarracaoForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('narracao_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Narração', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = NarracaoForm()

        form_variables = get_form_variables('Cadastro de Narração', request.path, form)

        return render(request, template_name, form_variables)


def update(request, narracao_id):
    template_name = 'narracao/fields.html'
    narracao = Narracao.objects.get(id=narracao_id)

    if request.method == 'POST':        
        form = NarracaoForm(request.POST, instance=narracao, initial={'fk_id_sistema':narracao.fk_id_sistema})

        if form.is_valid():
            form.save()

            return redirect('narracao_consulta')

        else:
            form_variables = get_form_variables('Alteração de Narração', request.path, form)
        
            return render(request, template_name, form_variables)
    else:    
        form = NarracaoForm(instance=narracao, initial={'fk_id_sistema':narracao.fk_id_sistema})

        form_variables = get_form_variables('Alteração de Narração', request.path, form=form)

        return render(request, template_name, form_variables)


def delete(request, narracao_id):
    template_name = 'narracao/delete.html'

    if request.method == 'POST':
        narracao = Narracao.objects.get(id=narracao_id)        

        narracao.delete()

        return redirect('narracao_consulta')
    else:
        narracao = Narracao.objects.get(id=narracao_id)

        return render(request, template_name, {'narracao': narracao})


def get_narracao_sistema(sistema_id):
    lista_narracao_db = Narracao.objects.filter(fk_id_sistema=sistema_id)
    lista_narracao = []

    for narracao_db in lista_narracao_db:
        narracao = NarracaoJson()
        narracao.id = narracao_db.id
        narracao.fk_id_sistema = narracao_db.fk_id_sistema.id
        narracao.nome_narracao = narracao_db.nome_narracao
        lista_narracao.append(narracao)

    return lista_narracao


def get_narracao_sistema_json(request, sistema_id):
    lista_narracao = get_narracao_sistema(sistema_id)

    json_string = json.dumps(lista_narracao,cls=ComplexEncoder)

    return HttpResponse(json_string, content_type='application/json')


def get_narracao(request, narracao_id):
    narracao = Narracao.objects.filter(id=narracao_id)

    custom_serializer = Serializer()

    return JsonResponse(custom_serializer.serialize(narracao), safe=False)
