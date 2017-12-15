from django import forms
from atributo.choices import *
from sistema.models import Sistema

class AtributoForm(forms.Form):
    nome_atributo = forms.CharField(required=True, max_length=150)

    tipo_atributo = forms.ChoiceField(
        choices=TIPO_ATRIBUTO_CHOICES,
        required=True
    )
    valor_minimo_atributo = forms.IntegerField(
        required=True,
        widget=forms.TextInput
    )
    valor_maximo_atributo = forms.IntegerField(widget=forms.TextInput)
    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),
        to_field_name="nome_sistema",
        empty_label="Selecione",
        required=True        
    )

    '''widgets = {
            'name': Textarea(attrs={'cols': 80, 'rows': 20}),
        }'''

    def is_valid(self):
        valid = True
        if not super(AtributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)