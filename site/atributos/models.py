from django.db import models
from sistema.models import Sistema

# Create your models here.
class Atributos(models.Model):
    nome_atributo = models.CharField(max_length=150, null=False)
    tipo_atributo = models.IntegerField(null=False)
    valor_minimo_atributo = models.IntegerField(null=False)
    valor_maximo_atributo = models.IntegerField()
    fk_id_sistema = models.ForeignKey(Sistema, null=False)