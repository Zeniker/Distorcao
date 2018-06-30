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

    # def get_paginator(self, queryset, per_page, orphans=0,
    #                   allow_empty_first_page=True, **kwargs):
    #     paginator = super(CustomListView, self).get_paginator(queryset, per_page, orphans=orphans,
    #                                                            allow_empty_first_page=allow_empty_first_page)
    #     try:
    #         if 'page' in self.request.GET:
    #             paginator.page(self.request.GET['page'])
    #         else:
    #             paginator.page(1)
    #     except PageNotAnInteger:
    #         return paginator.page(1)
    #     except EmptyPage:
    #         return paginator.page(paginator.num_pages)
    #
    #     return paginator
