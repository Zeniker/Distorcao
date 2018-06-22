from django.db import models
from apps.narracao.models import Narracao

# Create your models here.
class Ficha(models.Model):
    nome_ficha = models.CharField(
        max_length=150,
        null=False
    )

    fk_id_narracao = models.ForeignKey(Narracao, null=False, on_delete=models.CASCADE,)

    def __str__(self):
        return self.nome_ficha


class Subatributo_calculo(object):

    def __init__(self):
        self.calculos = []
        self.subatributo = object()

    def to_dict(self):
        return dict(
            calculos=self.calculos,
            subatributo=self.subatributo
        )

