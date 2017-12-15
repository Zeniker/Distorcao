# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sistema', '0002_auto_20171214_1523'),
    ]

    operations = [
        migrations.CreateModel(
            name='Atributos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nome_atributo', models.CharField(max_length=150)),
                ('tipo_atributo', models.IntegerField()),
                ('valor_minimo_atributo', models.IntegerField()),
                ('valor_maximo_atributo', models.IntegerField()),
                ('fk_id_sistema', models.ForeignKey(to='sistema.Sistema')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
