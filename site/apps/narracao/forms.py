from django import forms
from apps.sistema.models import Sistema
from apps.narracao.models import Narracao

class NarracaoForm(forms.ModelForm):
    class Meta:
        model = Narracao
        fields = '__all__'

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),        
        empty_label="Selecione",
        required=True        
    )    