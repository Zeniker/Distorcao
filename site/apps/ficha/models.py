from django.db import models
from apps.narracao.models import Narracao
from apps.atributo.models import Atributo
from apps.subatributo.models import Subatributo

# Create your models here.
class Ficha(models.Model):
    nome_ficha = models.CharField(
        max_length=150,
        null=False
    )

    fk_id_narracao = models.ForeignKey(Narracao, null=False, on_delete=models.CASCADE,)

    def __str__(self):
        return self.nome_ficha

class Ficha_atributo(models.Model):
    fk_id_ficha = models.ForeignKey(Ficha, null=False, on_delete=models.CASCADE)
    fk_id_atributo = models.ForeignKey(Atributo, null=False, on_delete=models.CASCADE)
    valor_atributo = models.CharField(
        max_length=10,
        null=False
    )

class Ficha_subatributo(models.Model):
    fk_id_ficha = models.ForeignKey(Ficha, null=False, on_delete=models.CASCADE)
    fk_id_subatributo = models.ForeignKey(Subatributo, null=False, on_delete=models.CASCADE)
    valor_subatributo = models.CharField(
        max_length=10,
        null=False
    )