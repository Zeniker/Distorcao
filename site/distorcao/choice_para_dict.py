# -*- coding: utf-8 -*-
from __future__ import unicode_literals

class choice_para_dict():

    def executar(self, choice_tuple):        
        lista = []
        for escolha in choice_tuple:
            tipo = dict(id=escolha[0], nome=escolha[1])
            lista.append(tipo)

        return lista
