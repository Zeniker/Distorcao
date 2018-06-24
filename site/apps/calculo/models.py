# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo
from apps.sistema.models import Sistema
from apps.calculo.choices import *
from distorcao.choice_para_dict import choice_para_dict

# Create your models here.
class Calculo(models.Model):
    fk_id_atributo = models.ForeignKey(Atributo, null=False, on_delete=models.CASCADE)
    fk_id_subatributo = models.ForeignKey(Subatributo, null=False, on_delete=models.CASCADE)
    fk_id_sistema = models.ForeignKey(Sistema, null=False, on_delete=models.CASCADE)

    tipo_calculo = models.IntegerField(
        choices=TIPO_CALCULO_CHOICES,
        null=False
    )

    intervalo_calculo = models.CharField(
        max_length=150,
        null=True
    )

    multiplicador_calculo = models.CharField(
        max_length=150,
        null=True
    )

class CalculoJson(object):
    def __init__(self):
        id = 0
        fk_id_subatributo = 0
        fk_id_atributo = 0
        tipo_calculo = 0
        intervalo_calculo = ""
        multiplicador_calculo = ""

    def to_dict(self):
        return dict(
            id=self.id,
            fk_id_subatributo=self.fk_id_subatributo,
            fk_id_atributo=self.fk_id_atributo,
            tipo_calculo=self.tipo_calculo,
            intervalo_calculo=self.intervalo_calculo,
            multiplicador_calculo=self.multiplicador_calculo
        )

class CalculoChoices(object):    
    def __init__(self):
        self.sistemas = None        
        self.tipos_calculo = choice_para_dict().executar(TIPO_CALCULO_CHOICES)
    
    def to_dict(self):
        return dict(
            sistemas=self.sistemas,
            tipos_calculo=self.tipos_calculo
        )        