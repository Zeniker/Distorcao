from django import forms
from sistema.models import Sistema

class SistemaForm(forms.ModelForm):
    class Meta:
        model = Sistema
        fields = '__all__'
        
    def is_valid(self):
        valid = True
        if not super(SistemaForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)