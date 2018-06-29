from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

#List of functions to be used by all views

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