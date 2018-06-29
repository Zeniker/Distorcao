from django.views.generic import CreateView, UpdateView, DeleteView
from django.utils.translation import activate

class CustomCreateView(CreateView):
    def __init__(self):
        super(CustomCreateView, self).__init__()
        activate('pt_BR')

class CustomUpdateView(UpdateView):
    def __init__(self):
        super(CustomUpdateView, self).__init__()
        activate('pt_BR')

class CustomDeleteView(DeleteView):
    def __init__(self):
        super(CustomDeleteView, self).__init__()
        activate('pt_BR')