from django import forms
from apps.ficha.models import *

class FichaForm(forms.ModelForm):
    class Meta:
        model = Ficha
        fields = '__all__'

    def is_valid(self):
        valid = True
        if not super(FichaForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)

class FichaAtributoForm(forms.ModelForm):
    class Meta:
        model = Ficha_atributo
        fields = '__all__'

    def is_valid(self):
        valid = True
        if not super(FichaAtributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)

class FichaSubatributoForm(forms.ModelForm):
    class Meta:
        model = Ficha_subatributo
        fields = '__all__'

    def is_valid(self):
        valid = True
        if not super(FichaSubatributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)

