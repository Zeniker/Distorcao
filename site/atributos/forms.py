from django import forms

class AtributoForm(forms.Form):
    nome_atributo = forms.CharField(required=True, max_length=150)

    escolhas_tipo_atributo = (
        (1, 'Texto'),
        (2, 'Numeral'),
        (3, 'Decimal'),
    )
    tipo_atributo = forms.CharField(
        choicest=escolhas_tipo_atributo,
        required=True
    )
    valor_minimo_atributo = forms.IntegerField(required=True)
    valor_maximo_atributo = forms.IntegerField()
    fk_id_sistema = forms.IntegerField(required=True)    

    def is_valid(self):
        valid = True
        if not super(AtributoForm, self).is_valid():
            self.adiciona_erro('Por favor, verifique os dados informados')
            valid = False

        return valid

    def adiciona_erro(self, message):
        errors = self._errors.setdefault(forms.forms.NON_FIELD_ERRORS, forms.utils.ErrorList())
        errors.append(message)