# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from sistema.models import Sistema
from atributo.choices import *
from subatributo.choices import *

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

    fk_id_sistema = models.ForeignKey(Sistema, null=False)