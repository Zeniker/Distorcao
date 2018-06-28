from django import forms
from apps.calculo.choices import *
from apps.atributo.models import Sistema
from apps.subatributo.models import Subatributo
from apps.atributo.models import Atributo
from apps.calculo.models import Calculo

class CalculoForm(forms.ModelForm):
    class Meta:
        model = Calculo
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CalculoForm, self).__init__(*args, **kwargs)
        self.fields['intervalo_calculo'].required = False
        self.fields['multiplicador_calculo'].required = False
        self.fields['percentual_calculo'].required = False

    def is_valid(self):
        valid = True
        if not super(CalculoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)