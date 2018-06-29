def update_context(context, page_header, url_destino=None, form=None, id=None):
    context['page_header'] = page_header
    context['url_destino'] = url_destino
    context['id'] = id

    return context