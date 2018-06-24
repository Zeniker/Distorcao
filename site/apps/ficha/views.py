from django.shortcuts import render, redirect
from django.http import HttpResponse
from apps.ficha.models import Ficha
from apps.narracao.models import Narracao
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo
from apps.calculo.models import Calculo
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
        #form = FichaForm()

        form_variables = get_form_variables('Cadastro de Ficha', request.path)

        return render(request, template_name, form_variables)