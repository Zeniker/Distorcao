from django.views.generic import CreateView, UpdateView, DeleteView, ListView
from django.utils.translation import activate
from django.core.paginator import Paginator, EmptyPage


class CustomPaginator(Paginator):
    def page(self, number):
        try:
            self.validate_number(number)
        except EmptyPage:
            number = self.num_pages

        return super(CustomPaginator, self).page(number)


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


class CustomListView(ListView):
    paginator_class = CustomPaginator

    def __init__(self):
        super(CustomListView, self).__init__()
        activate('pt_BR')
