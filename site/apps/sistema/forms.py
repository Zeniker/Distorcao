from django import forms
from apps.sistema.models import Sistema

class SistemaForm(forms.ModelForm):
    class Meta:
        model = Sistema
        fields = '__all__'

    nome_sistema = forms.CharField(
        max_length=150,
        error_messages = {
            'invalid': 'Nome inválido',
            'required': 'Informe o nome'
        }
    )