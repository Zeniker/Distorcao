"""distorcao URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import LogoutView

from distorcao.views import CustomLoginView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('apps.menu.urls')),
    url(r'^login$', CustomLoginView.as_view(), name='distorcao_login'),
    url(r'^logout', LogoutView.as_view(), name='distorcao_logout'),
    url(r'^sistema/', include('apps.sistema.urls')),
    url(r'^atributo/', include('apps.atributo.urls')),
    url(r'^subatributo/', include('apps.subatributo.urls')),
    url(r'^calculo/', include('apps.calculo.urls')),
    url(r'^narracao/', include('apps.narracao.urls')),
    url(r'^ficha/', include('apps.ficha.urls')),
]
