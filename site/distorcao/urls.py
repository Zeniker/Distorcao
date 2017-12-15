from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'distorcao.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('menu.urls')),
    url(r'^sistema/', include('sistema.urls')),
    url(r'^atributo/', include('atributos.urls')),
)
