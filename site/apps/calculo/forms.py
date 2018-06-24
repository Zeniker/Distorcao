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

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),
        empty_label="Selecione",
        required=True
    )

    fk_id_subatributo = forms.ModelChoiceField(
        queryset=Subatributo.objects.all(),
        empty_label="Selecione",
        required=True        
    )

    fk_id_atributo = forms.ModelChoiceField(
        queryset=Atributo.objects.all(),        
        empty_label="Selecione",
        required=True        
    )

    tipo_relacao_atributo_subatributo = forms.ChoiceField(
        choices=TIPO_CALCULO_CHOICES,
        required=True        
    )

    def is_valid(self):
        valid = True
        if not super(CalculoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)