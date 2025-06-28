from .models import Professores, Disciplinas, Ambientes
from .serializers import *
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .permissions import IsGestor
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import date

# Create your views here.

class LoginUsuario(TokenObtainPairView): #Classe que permite que os usuários façam login para obter o token
    serializer_class = LoginUsuarioSerializer #Customizando os dados para retornar para o usuário no formato JSON

class ProfessorLCAPIView(ListCreateAPIView): #Classe que lista e cria professores 
    queryset = Professores.objects.all() #Pegando todos os dados da tabela dos professores

    serializer_class = ProfessoresSerializer #Transformando os dados da tabelas dos professores em JSON

    permission_classes = [IsGestor] #Apenas gestores podem acessar essa rota

    def perform_create(self, serializer):
        dataNascimento = serializer.validated_data["dataNascimento"]
        dataContratacao = serializer.validated_data["dataContratacao"]

        if dataNascimento > date.today() and dataContratacao > date.today():
            raise Exception("Datas de aniversário e de contratação inválidas!")
        
        serializer.save()
 
class ProfessorRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe que atualiza, lista e exclui professores
    queryset = Professores.objects.all()

    serializer_class = ProfessoresSerializer

    permission_classes = [IsGestor]

    lookup_field = "pk" #Aqui, a busca será feita pelo ID do professor

    def perform_create(self, serializer):
        dataNascimento = serializer.validated_data["dataNascimento"]
        dataContratacao = serializer.validated_data["dataContratacao"]

        if dataNascimento > date.today() and dataContratacao > date.today():
            raise Exception("Datas de aniversário e de contratação inválidas!")
        
        serializer.save()

class DisciplinaLCAPIView(ListCreateAPIView): #Classe que lista e cria disciplinas
    queryset = Disciplinas.objects.all()

    serializer_class = DisciplinasSerializer

    permission_classes = [IsGestor]

class DisciplinaRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe que atualiza, lista e exclui disciplinas
    queryset = Disciplinas.objects.all()

    serializer_class = DisciplinasSerializer
    
    permission_classes = [IsGestor]

    lookup_field = "pk"

class AmbientesLCAPIView(ListCreateAPIView): #Classe que lista e cria ambientes
    queryset = Ambientes.objects.all()

    serializer_class = AmbientesSerializer

    permission_classes = [IsGestor]

class AmbientesRUDAPIView(RetrieveUpdateDestroyAPIView): #Classe que atualiza, lista e exclui ambientes
    queryset = Ambientes.objects.all()

    serializer_class = AmbientesSerializer

    permission_classes = [IsGestor]

    lookup_field = "pk"

class BuscarReservaProfessores(ListAPIView): #Classe que lista o ambiente que os professores reservaram
    permission_classes = [IsAuthenticated] #Apenas usuários autenticados podem acessar essa rota

    serializer_class = AmbientesSerializer 

    def get_queryset(self): 
        nome = self.request.user #Obtendo o usuário que fez o login 

        try: 
            professor = Professores.objects.get(nome=nome) #Buscando o nome do professor 
        except Professores.DoesNotExist:
            return Professores.objects.none() #Aqui, retorna um queryset vazio, caso o professor não exista

        return Ambientes.objects.filter(professorRepresentante=professor) #Retornando todos os ambientes no qual o professor reservou
    
class BuscarDisciplinaProfessores(ListAPIView): #Classe que lista a disciplina que os professores lecionam
    permission_classes = [IsAuthenticated] 

    serializer_class = DisciplinasSerializer

    def get_queryset(self):
        nome = self.request.user

        try:
            professor = Professores.objects.get(nome=nome)
        except Professores.DoesNotExist:
            return Professores.objects.none()
        
        return Disciplinas.objects.filter(professorResponsavel=professor) #Retornando todas as disciplinas no qual o professor é representante