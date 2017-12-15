from django import forms
from atributo.choices import *
from sistema.models import Sistema
from atributo.models import Atributo

class AtributoForm(forms.ModelForm):
    class Meta:
        model = Atributo
        fields = '__all__'
        widgets = {            
            'valor_minimo_atributo': forms.TextInput(),
            'valor_maximo_atributo': forms.TextInput(),                        
        }
    
    '''def __init__(self, *args, **kwargs):
        super(AtributoForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            if(field_name == 'tipo_atributo'):
                #print(type(self.fields[field_name].widget))
                print(isinstance(self.fields[field_name].widget, forms.Select))
            
            if isinstance(self.fields[field_name].widget, forms.Select):
                self.fields[field_name].empty_label = "Selecione"        
                self.fields[field_name].widget.choices = self.fields[field_name].choices'''

    nome_atributo = forms.CharField(required=True, max_length=150)

    tipo_atributo = forms.ChoiceField(
        choices=TIPO_ATRIBUTO_CHOICES,
        required=True
    )

    fk_id_sistema = forms.ModelChoiceField(
        queryset=Sistema.objects.all(),
        to_field_name="nome_sistema",
        empty_label="Selecione",
        required=True        
    )    

    def is_valid(self):
        valid = True
        if not super(AtributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)