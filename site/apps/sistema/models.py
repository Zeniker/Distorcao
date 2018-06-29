from django.db import models

# Create your models here.
class Sistema(models.Model):
    nome_sistema = models.CharField(max_length=150, null=False)

    def __str__(self):
        return self.nome_sistema

class Sistema_json(object):
    def __init__(self):
        self.id = 0
        self.nome_sistema = ""

    def to_dict(self):
        return dict(
            id=self.id,
            nome_sistema=self.nome_sistema
        )
