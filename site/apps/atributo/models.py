from django.db import models
from apps.sistema.models import Sistema
from apps.atributo.choices import *

# Create your models here.
class Atributo(models.Model):
    nome_atributo = models.CharField(
        max_length=150, 
        null=False
    )

    tipo_atributo = models.IntegerField(
        choices=TIPO_ATRIBUTO_CHOICES,
        null=False
    )
    
    valor_minimo_atributo = models.DecimalField(null=True, max_digits=6, decimal_places=2)
    valor_maximo_atributo = models.DecimalField(null=True, max_digits=6, decimal_places=2)
    fk_id_sistema = models.ForeignKey(Sistema, null=False, on_delete=models.CASCADE,)

    def __str__(self):
        return self.nome_atributo