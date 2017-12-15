from django.db import models

# Create your models here.
class Sistema(models.Model):
    nome_sistema = models.CharField(max_length=150, null=False)

    def __unicode__(self):
        return u'{0}'.format(self.nome_sistema)