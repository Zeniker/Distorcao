from django.shortcuts import render
from atributos.forms import AtributoForm

# Create your views here.
def create(request):
    template_name = 'atributos/fields.html'    

    if request.method == 'POST':
        form = AtributoForm(request.POST)

        '''if form.is_valid():
            dados_form = form.data

            sistema = Sistema(nome_sistema=dados_form['nome_sistema'])

            sistema.save()

            return redirect('sistema_consulta')
        else:
            form_variables = get_form_variables('Cadastro de Sistema', request.path, form)

            return render(request, template_name, form_variables)'''
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