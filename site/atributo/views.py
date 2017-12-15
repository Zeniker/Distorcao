from django.shortcuts import render
from django.shortcuts import redirect
from atributo.forms import AtributoForm
from atributo.models import Atributo


def list(request):
    atributos = Atributo.objects.all()
    return render(request, 'atributo/list.html', {'atributos' : atributos})

def create(request):
    template_name = 'atributo/fields.html'    

    if request.method == 'POST':
        form = AtributoForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('index')
        else:
            form_variables = get_form_variables('Cadastro de Atributo', request.path, form)

            return render(request, template_name, form_variables)
    else:
        form = AtributoForm()

        form_variables = get_form_variables('Cadastro de Atributo', request.path, form)

        return render(request, template_name, form_variables)

def get_form_variables(page_header, url_destino, form=None, atributo=None):
    form_variables = {
        'page_header' : page_header,
        'url_destino' : url_destino,
        'form' : form,
        'atributo' : atributo
    }

    return form_variables