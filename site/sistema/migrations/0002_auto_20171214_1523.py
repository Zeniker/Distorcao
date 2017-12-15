# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sistema', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sistema',
            old_name='nome',
            new_name='nome_sistema',
        ),
    ]
