# Generated by Django 2.0 on 2018-06-27 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculo',
            name='percentual_calculo',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
    ]