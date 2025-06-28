from django.urls import path
from . import views

urlpatterns = [ #Rotas da API
    path('login/', view=views.LoginUsuario.as_view(), name="Login do usuário."),
    path('professor/', view=views.ProfessorLCAPIView.as_view(), name="Listar e criar professores."),
    path('professor/<int:pk>/', view=views.ProfessorRUDAPIView.as_view(), name="Listar, deletar e atualizar professores."),
    path('disciplina/', view=views.DisciplinaLCAPIView.as_view(), name="Listar e criar disciplinas."),
    path('disciplina/<int:pk>/', view=views.DisciplinaRUDAPIView.as_view(), name="Listar, deletar e atualizar disciplinas."),
    path('ambiente/', view=views.AmbientesLCAPIView.as_view(), name="Listar e criar ambientes."),
    path('ambiente/<int:pk>/', view=views.AmbientesRUDAPIView.as_view(), name="Listar, deletar e atualizar ambientes."),
    path('reservaSalaProfessor/', view=views.BuscarReservaProfessores.as_view(), name="Buscar uma reserva de sala pelo nome do professor."),
    path('disciplinaProfessor/', view=views.BuscarDisciplinaProfessores.as_view(), name="Buscar a disciplina pelo nome do professor."),
]