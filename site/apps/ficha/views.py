from django.shortcuts import render, redirect
from django.http import HttpResponse
from apps.ficha.models import Ficha
from apps.narracao.models import Narracao
from apps.ficha.forms import FichaForm
from distorcao.views import get_form_variables, get_paginated_result
from distorcao.json_response import json_response
from distorcao.json_complex_encoder import *
from django.urls import reverse
import json

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
        form = FichaForm(json.loads(request.body))

        if form.is_valid():
            #ficha_nova = form.save()

            resposta = json_response()
            resposta.status = 'OK'
            resposta.data = 1#ficha_nova.id

            json_string = json.dumps(resposta,cls=ComplexEncoder)

            return HttpResponse(json_string, content_type='application/json')
        else:
            form_variables = get_form_variables('Cadastro de Ficha', request.path, form)

            return render(request, template_name, form_variables)
    else:
        #form = FichaForm()

        form_variables = get_form_variables('Cadastro de Ficha', request.path)

        return render(request, template_name, form_variables)