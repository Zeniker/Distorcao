from django import forms
from atributo_subatributo.choices import *
from atributo.models import Sistema
from subatributo.models import Subatributo
from atributo.models import Atributo
from atributo_subatributo.models import Atributo_subatributo

class Atributo_subatributoForm(forms.ModelForm):
    class Meta:
        model = Atributo_subatributo
        fields = '__all__'    

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
        choices=TIPO_RELACAO_CHOICES,
        required=True        
    )

    def is_valid(self):
        valid = True
        if not super(Atributo_subatributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)