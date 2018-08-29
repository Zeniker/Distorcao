from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.shortcuts import render, redirect

# Create your views here.


class CombateView(LoginRequiredMixin, TemplateView):
    template_name = 'combate/principal.html'


