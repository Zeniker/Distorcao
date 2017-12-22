# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo
from apps.atributo_subatributo.choices import *

# Create your models here.
class Atributo_subatributo(models.Model):
    fk_id_atributo = models.ForeignKey(Atributo, null=False, on_delete=models.CASCADE,)
    fk_id_subatributo = models.ForeignKey(Subatributo, null=False, on_delete=models.CASCADE,)

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