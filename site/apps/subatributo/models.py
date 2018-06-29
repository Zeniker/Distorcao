# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from apps.sistema.models import Sistema
from apps.atributo.choices import *
from apps.subatributo.choices import *

# Create your models here.
class Subatributo(models.Model):
    nome_subatributo = models.CharField(
        max_length=150, 
        null=False
    )

    tipo_subatributo = models.IntegerField(
        choices=TIPO_ATRIBUTO_CHOICES,
        null=False
    )

    valor_inicial_subatributo = models.IntegerField(
        choices=TIPO_SUBATRIBUTO_CHOICES,
        null=False
    )

    fk_id_sistema = models.ForeignKey(Sistema, null=False, on_delete=models.CASCADE,)

    def __str__(self):
        return u'{0}'.format(self.nome_subatributo)

class Subatributo_json(object):
    def __init__(self):
        id = 0
        fk_id_sistema = 0
        nome_subatributo = ""
        tipo_subatributo = 0
        valor_inicial_subatributo = 0

    def to_dict(self):
        return dict(
            id=self.id,
            fk_id_sistema=self.fk_id_sistema,
            nome_subatributo=self.nome_subatributo,
            tipo_subatributo=self.tipo_subatributo,
            valor_inicial_subatributo=self.valor_inicial_subatributo
        )

