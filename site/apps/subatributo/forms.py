from django import forms
from apps.atributo.choices import *
from apps.subatributo.choices import *
from apps.sistema.models import Sistema
from apps.subatributo.models import Subatributo

class SubatributoForm(forms.ModelForm):
    class Meta:
        model = Subatributo
        fields = '__all__'    

    tipo_subatributo = forms.ChoiceField(
        choices=TIPO_ATRIBUTO_CHOICES,
        required=True
    )

    valor_inicial_subatributo = forms.ChoiceField(
        choices=TIPO_SUBATRIBUTO_CHOICES,
        required=True,
        widget=forms.RadioSelect()
    )

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),        
        empty_label="Selecione",
        required=True        
    )