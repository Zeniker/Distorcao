# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from atributo.models import Atributo
from subatributo.models import Subatributo
from atributo_subatributo.choices import *

# Create your models here.
class Atributo_subatributo(models.Model):
    fk_id_atributo = models.ForeignKey(Atributo, null=False)
    fk_id_subatributo = models.ForeignKey(Subatributo, null=False)

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