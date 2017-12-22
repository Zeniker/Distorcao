from django.shortcuts import render, redirect
from apps.narracao.models import Narracao
from apps.narracao.forms import NarracaoForm
from distorcao.views import get_form_variables, get_paginated_result

# Create your views here.
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
