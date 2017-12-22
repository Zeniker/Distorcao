from django import forms
from apps.narracao.models import Narracao
from apps.ficha.models import Ficha

class FichaForm(forms.ModelForm):
    class Meta:
        model = Ficha
        fields = '__all__'

    fk_id_narracao = forms.ModelChoiceField(
        queryset=Narracao.objects.all(),        
        empty_label="Selecione",
        required=True        
    )    