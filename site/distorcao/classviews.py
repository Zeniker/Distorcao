from django.views.generic import CreateView
from django.utils.translation import activate

class CustomCreateView(CreateView):
    def __init__(self):
        super(CustomCreateView, self).__init__()
        activate('pt_BR')
