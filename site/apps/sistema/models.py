from django.db import models

# Create your models here.
class Sistema(models.Model):
    nome_sistema = models.CharField(max_length=150, null=False)

    def __str__(self):
        return self.nome_sistema