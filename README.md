# Distorção

Este sistema tem como objetivo, facilitar a criação de fichas de um sistema próprio de RPG.

---
### Começando

Para instalar o projeto é necessário seguir os passos abaixo


- Instalar o Python v3.6.4
- Instalar o framework Django v2.0 através do comando abaixo
```
    >>> pip install django==2.0
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