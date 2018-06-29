from django import forms
from apps.sistema.models import Sistema

class SistemaForm(forms.ModelForm):
    class Meta:
        model = Sistema
        fields = '__all__'