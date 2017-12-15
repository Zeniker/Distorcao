#List of functions to be used by all views

def get_form_variables(page_header, url_destino, form=None):
    form_variables = {
        'page_header' : page_header,
        'url_destino' : url_destino,
        'form' : form
    }

    return form_variables