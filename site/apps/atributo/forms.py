from django import forms
from apps.atributo.choices import *
from apps.sistema.models import Sistema
from apps.atributo.models import Atributo
from django.utils.translation import gettext_lazy  as _


class AtributoForm(forms.ModelForm):
    class Meta:
        model = Atributo
        fields = '__all__'
        widgets = {            
            'valor_minimo_atributo': forms.TextInput(),
            'valor_maximo_atributo': forms.TextInput(),
        }

    def __init__(self, *args, **kwargs):
        super(AtributoForm, self).__init__(*args, **kwargs)
        self.fields['valor_minimo_atributo'].required = False
        self.fields['valor_maximo_atributo'].required = False

    tipo_atributo = forms.ChoiceField(
        choices=TIPO_ATRIBUTO_CHOICES,
        required=True
    )

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),        
        empty_label="Selecione",
        required=True        
    )

    def clean_valor_minimo_atributo(self):
        valor = self.cleaned_data['valor_minimo_atributo']
        self.verifica_valor_min_max_atributo(valor,
                                             self.cleaned_data['tipo_atributo'])
        return valor

    def clean_valor_maximo_atributo(self):
        valor = self.cleaned_data['valor_maximo_atributo']
        self.verifica_valor_min_max_atributo(valor,
                                             self.cleaned_data['tipo_atributo'])
        return valor

    def verifica_valor_min_max_atributo(self, valor, tipo_atributo):
        if int(tipo_atributo) != TIPO_ATRIBUTO_CHOICES[0][0]:
            if valor is None:
                raise forms.ValidationError(_('This field is required.'))
            else:
                if (int(tipo_atributo) in [TIPO_ATRIBUTO_CHOICES[1][0], TIPO_ATRIBUTO_CHOICES[3][0]]) \
                        and (valor % 1 != 0):
                    raise forms.ValidationError(_('Enter a whole number.'))

    def clean(self):
        cleaned_data = super(AtributoForm, self).clean()
        valor_maximo = cleaned_data.get('valor_maximo_atributo')
        valor_minimo = cleaned_data.get('valor_minimo_atributo')


        if (not valor_maximo is None) and (not valor_minimo is None) and (valor_minimo >= valor_maximo):
            raise forms.ValidationError('Valor mínimo deve ser menor que o valor máximo')