from django.db import models
from apps.sistema.models import Sistema

# Create your models here.
class Narracao(models.Model):
    nome_narracao = models.CharField(
        max_length=150, 
        null=False
    )    
        
    fk_id_sistema = models.ForeignKey(Sistema, null=False, on_delete=models.CASCADE,)

    def __str__(self):
        return self.nome_narracao


class NarracaoJson(object):
    def __init__(self):
        self.id = 0
        self.fk_id_sistema = 0
        self.nome_narracao = ""

    def to_dict(self):
        return dict(
            id=self.id,
            fk_id_sistema=self.fk_id_sistema,
            nome_narracao=self.nome_narracao
        )