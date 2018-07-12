from django import forms
from django.utils.translation import gettext_lazy  as _
from apps.calculo.choices import *
from apps.atributo.models import Sistema
from apps.subatributo.models import Subatributo
from apps.atributo.models import Atributo
from apps.calculo.models import Calculo
from django.core.exceptions import NON_FIELD_ERRORS, ValidationError

class CalculoForm(forms.ModelForm):
    class Meta:
        model = Calculo
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(CalculoForm, self).__init__(*args, **kwargs)
        self.fields['intervalo_calculo'].required = False
        self.fields['multiplicador_calculo'].required = False
        self.fields['percentual_calculo'].required = False
        self.fields['tipo_calculo'].value = None

    def clean(self):
        cleaned_data = super(CalculoForm, self).clean()
        tipo_calculo = cleaned_data.get('tipo_calculo', None)

        error_dict = dict()

        if(tipo_calculo == TIPO_CALCULO_CHOICES[0][0]):
            multiplicador = cleaned_data.get('multiplicador_calculo')
            intervalo = cleaned_data.get('intervalo_calculo')

            if(multiplicador is None):
                error_dict.update({'multiplicador_calculo': ValidationError(_('This field is required.'))})

            if(intervalo is None):
                error_dict.update({'intervalo_calculo': ValidationError(_('This field is required.'))})

        else:
            percentual = cleaned_data.get('percentual_calculo')
            if(percentual is None):
                error_dict.update({'percentual_calculo': ValidationError(_('This field is required.'))})

        if(len(error_dict) > 0):
            raise forms.ValidationError(error_dict)

