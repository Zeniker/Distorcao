from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.


@login_required
def index(request):
    return render(request, 'index.html')


@login_required
def ficha_simulador(request):
    return render(request, 'ficha_simulador.html')


@login_required
def calculadora_dano(request):
    return render(request, 'calculadora_dano.html')


@login_required
def acoes(request):
    return render(request, 'acoes.html')


@login_required
def simulador_combate(request):
    return render(request, 'simulador_combate.html')


@login_required
def tabela_inicializacao(request):
    return render(request, 'tabela_inicializacao.html')