from django.test import TestCase, RequestFactory
from django.contrib.auth.models import AnonymousUser
from apps.sistema.views import *


class SistemaCreateTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_get(self):
        caminho = reverse('sistema_cadastro')
        # print(caminho)
        request = self.factory.get(caminho)
        request.user = AnonymousUser()

        response = SistemaCreate.as_view()(request)
        self.assertEqual(response.status_code, 200)

    # def test_post(self):
    #     caminho = reverse('sistema_cadastro')
    #     request = self.factory.post(caminho)
    #     request.user = AnonymousUser()
    #
    #     response = SistemaCreate.as_view()(request)
    #     self.assertEqual(response.status_code, 200)
