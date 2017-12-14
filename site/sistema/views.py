from django.shortcuts import render
from django.shortcuts import redirect
from django.views.generic.base import View
from sistema.forms import SistemaForm
from sistema.models import Sistema

def list(request):
    sistemas = Sistema.objects.all()
    return render(request, 'list.html', {'sistemas' : sistemas})

def create(request):
    template_name = 'create.html'

    if request.method == 'POST':
        form = SistemaForm(request.POST)

        if form.is_valid():
            dados_form = form.data

            sistema = Sistema(nome_sistema=dados_form['nome_sistema'])

            sistema.save()

            return redirect('sistema_consulta')
        
        return render(request, template_name, {'form' : form})
    else:
        return render(request, template_name)

def update(request, sistema_id):
    template_name = 'update.html'

    if request.method == 'POST':
        form = SistemaForm(request.POST)

        if form.is_valid():
            dados_form = form.data

            sistema = Sistema.objects.get(id=sistema_id)
            sistema.nome_sistema = dados_form['nome_sistema']

            sistema.save()

            return redirect('sistema_consulta')
        
        return render(request, template_name, {'form' : form})
    else:
        sistema = Sistema.objects.get(id=sistema_id)

        return render(request, template_name, {'sistema': sistema})