from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from apps.ficha.forms import *
from apps.subatributo.models import Subatributo
from apps.narracao.models import Narracao
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.serializer import Serializer
from distorcao.json_response import json_response
from distorcao.json_complex_encoder import *
from django.urls import reverse
from django.db import transaction
import json

# Create your views here.


@login_required
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


@login_required
def create(request):
    template_name = 'ficha/fields.html'    

    if request.method == 'POST':
        request_data = json.loads(request.body)
        form = FichaForm(request_data['ficha'])

        if form.is_valid():
            try:
                with transaction.atomic():
                    ficha_nova = form.save()

                with transaction.atomic():

                    for atributo in request_data['ficha_atributo']:
                        atributo['fk_id_ficha'] = ficha_nova.id
                        atributo_form = FichaAtributoForm(atributo)
                        if atributo_form.is_valid():
                            atributo_form.save()

                    with transaction.atomic():

                        for subatributo in request_data['ficha_subatributo']:
                            subatributo['fk_id_ficha'] = ficha_nova.id
                            subatributo_form = FichaSubatributoForm(subatributo)
                            if subatributo_form.is_valid():
                                subatributo_form.save()

                resposta = json_response()
                resposta.status = 'OK'
                resposta.data = reverse('ficha_consulta')
            except Exception as e:
                resposta = json_response()
                resposta.status = 'ERRO'
                resposta.data = str(e)

            json_string = json.dumps(resposta, cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')
        else:
            form_variables = get_form_variables('Cadastro de Ficha', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form_variables = get_form_variables('Cadastro de Ficha', request.path)

        return render(request, template_name, form_variables)


@login_required
def update(request, ficha_id):
    template_name = 'ficha/fields.html'

    ficha = Ficha.objects.get(id=ficha_id)

    if request.method == 'POST':
        request_data = json.loads(request.body)
        form = FichaForm(request_data['ficha'], instance=ficha)

        if form.is_valid():
            try:
                with transaction.atomic():
                    ficha_nova = form.save()

                with transaction.atomic():

                    for atributo in request_data['ficha_atributo']:
                        atributo['fk_id_ficha'] = ficha_nova.id
                        atributo_db = Ficha_atributo.objects.filter(fk_id_ficha=ficha_nova.id,
                                                                    fk_id_atributo=atributo['fk_id_atributo'])

                        if atributo_db:
                            atributo_form = FichaAtributoForm(atributo, instance=Ficha_atributo.objects.get(id=atributo_db[0].id))
                        else:
                            atributo_form = FichaAtributoForm(atributo)

                        if atributo_form.is_valid():
                            atributo_form.save()

                    with transaction.atomic():

                        for subatributo in request_data['ficha_subatributo']:
                            subatributo['fk_id_ficha'] = ficha_nova.id
                            subatributo_db = Ficha_subatributo.objects.filter(fk_id_ficha=ficha_nova.id,
                                                                              fk_id_subatributo=subatributo['fk_id_subatributo'])

                            if subatributo_db:
                                subatributo_form = FichaSubatributoForm(subatributo, instance=Ficha_subatributo.objects.get(id=subatributo_db[0].id))
                            else:
                                subatributo_form = FichaSubatributoForm(subatributo)

                            if subatributo_form.is_valid():
                                subatributo_form.save()

                resposta = json_response()
                resposta.status = 'OK'
                resposta.data = reverse('ficha_consulta')
            except Exception as e:
                resposta = json_response()
                resposta.status = 'ERRO'
                resposta.data = str(e)

            json_string = json.dumps(resposta, cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')
        else:
            form_variables = get_form_variables('Cadastro de Ficha', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form_variables = get_form_variables('Alteração de Ficha', request.path, id=ficha_id)

        return render(request, template_name, form_variables)


@login_required
def delete(request, ficha_id):
    template_name = 'ficha/delete.html'

    if request.method == 'POST':
        ficha_id = Ficha.objects.get(id=ficha_id)

        ficha_id.delete()

        return redirect('ficha_consulta')
    else:
        ficha = Ficha.objects.get(id=ficha_id)

        return render(request, template_name, {'ficha': ficha})


@login_required
def get_ficha(request, ficha_id):
    ficha_db = Ficha.objects.filter(id=ficha_id)

    narracao_db = Narracao.objects.get(id=ficha_db[0].fk_id_narracao.id)

    ficha_atributo_db = Ficha_atributo.objects.filter(fk_id_ficha=ficha_id)

    subatributo_db = Subatributo.objects.filter(fk_id_sistema=narracao_db.fk_id_sistema)

    ficha_subatributo_db = Ficha_subatributo.objects.filter(fk_id_ficha=ficha_id)

    lista_subatributos_json = []

    for subatributo in subatributo_db:
        subatributo_json = FichaSubatributoJson()
        subatributo_json.fk_id_ficha = ficha_id
        subatributo_json.fk_id_subatributo = subatributo.id
        subatributo_json.valor_subatributo = ""
        for ficha_subatributo in ficha_subatributo_db:
            if ficha_subatributo.fk_id_subatributo.id == subatributo.id:
                subatributo_json.valor_subatributo = ficha_subatributo.valor_subatributo

        lista_subatributos_json.append(subatributo_json)

    lista_subatributos_dict = []
    for item in lista_subatributos_json:
        lista_subatributos_dict.append(item.to_dict())

    custom_serializer = Serializer()

    ficha_dict = dict(
        ficha=custom_serializer.serialize(ficha_db),
        ficha_atributo=custom_serializer.serialize(ficha_atributo_db),
        ficha_subatributo=lista_subatributos_dict
    )

    return JsonResponse(ficha_dict, safe=False)
