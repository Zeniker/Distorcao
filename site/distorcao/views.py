from django.contrib.auth.views import LoginView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.urls import reverse
from django.utils.translation import activate

# List of functions to be used by all views


def get_form_variables(page_header, url_destino, form=None, id=None):
    form_variables = {
        'page_header' : page_header,
        'url_destino' : url_destino,
        'form' : form,
        'id' : id
    }

    return form_variables


def get_paginated_result(item_list, page, items_per_page=10):
    paginator = Paginator(item_list, items_per_page)
    try:
        return paginator.page(page)
    except PageNotAnInteger:
        return paginator.page(1)
    except EmptyPage:
        return paginator.page(paginator.num_pages)


class CustomLoginView(LoginView):
    template_name = 'login.html'

    def __init__(self):
        super()
        activate('pt_BR')

    def get_success_url(self):
        return reverse('index')