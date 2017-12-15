# Distorção

Este sistema tem como objetivo, facilitar a criação de fichas de um sistema próprio de RPG.

Tentaremos seguir o seguinte style guide durante o desenvolvimento:
    - https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
---
### Começando

Para instalar o projeto é necessário seguir os passos abaixo


- Instalar o Python
- Instalar o framework Django v1.7.4 através do comando abaixo
```
    >>> pip install django==1.7.4
```
- Instalar o Django Widget Tweaks através do comando
```
    >>> pip install django-widget-tweaks
```
- Utilizando o terminal, ir até a pasta distorcao/site
- Rodar os comandos abaixo

```
    >>> python manage.py makemigrations
    >>> python manage.py migrate
```
- Com isso o projeto já está instalado
- Para subir o servidor, utilizar o comando

```
    >>> python manage.py runserver
```