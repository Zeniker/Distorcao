from django import forms
from apps.atributo.choices import *
from apps.sistema.models import Sistema
from apps.atributo.models import Atributo

class AtributoForm(forms.ModelForm):
    class Meta:
        model = Atributo
        fields = '__all__'
        widgets = {            
            'valor_minimo_atributo': forms.TextInput(),
            'valor_maximo_atributo': forms.TextInput(),                        
        }

    nome_atributo = forms.CharField(required=True, max_length=150)

    tipo_atributo = forms.ChoiceField(
        choices=TIPO_ATRIBUTO_CHOICES,
        required=True
    )

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),        
        empty_label="Selecione",
        required=True        
    )

    def is_valid(self):
        valid = True
        if not super(AtributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)