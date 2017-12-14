from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def ficha_simulador(request):
    return render(request, 'ficha_simulador.html')

def calculadora_dano(request):
    return render(request, 'calculadora_dano.html')

def acoes(request):
    return render(request, 'acoes.html')

def simulador_combate(request):
    return render(request, 'simulador_combate.html')

def tabela_inicializacao(request):
    return render(request, 'tabela_inicializacao.html')