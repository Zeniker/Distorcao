# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo
from apps.sistema.models import Sistema
from apps.atributo_subatributo.choices import *
from distorcao.choice_para_dict import choice_para_dict

# Create your models here.
class Atributo_subatributo(models.Model):
    fk_id_atributo = models.ForeignKey(Atributo, null=False, on_delete=models.CASCADE)
    fk_id_subatributo = models.ForeignKey(Subatributo, null=False, on_delete=models.CASCADE)
    fk_id_sistema = models.ForeignKey(Sistema, null=False, on_delete=models.CASCADE)

    tipo_relacao_atributo_subatributo = models.IntegerField(
        choices=TIPO_RELACAO_CHOICES,
        null=False
    )

    intervalo_atributo_subatributo = models.CharField(
        max_length=150,
        null=True
    )

    multiplicador_atributo_subatributo = models.CharField(
        max_length=150,
        null=True
    )

class Atributo_subatributo_json(object):
    def __init__(self):
        id = 0
        fk_id_subatributo = 0
        fk_id_atributo = 0
        tipo_relacao_atributo_subatributo = 0
        intervalo_atributo_subatributo = ""
        multiplicador_atributo_subatributo = ""

    def to_dict(self):
        return dict(
            id=self.id,
            fk_id_subatributo=self.fk_id_subatributo,
            fk_id_atributo=self.fk_id_atributo,
            tipo_relacao_atributo_subatributo=self.tipo_relacao_atributo_subatributo,
            intervalo_atributo_subatributo=self.intervalo_atributo_subatributo,
            multiplicador_atributo_subatributo=self.multiplicador_atributo_subatributo
        )

class calculo_choices(object):    
    def __init__(self):
        self.sistemas = None        
        self.tipos_calculo = choice_para_dict().executar(TIPO_RELACAO_CHOICES)
    
    def to_dict(self):
        return dict(
            sistemas=self.sistemas,
            tipos_calculo=self.tipos_calculo
        )        