from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Usuario(AbstractUser): #O AbstractUser já adiciona automaticamente os campos de username, password e email
    funcaoUsuario = [
        ('Professor', 'Professor'),
        ('Gestor', 'Gestor'),
    ]
    funcao = models.CharField(max_length=20, choices=funcaoUsuario, default="Professor") #default: valor padrão caso o usuário não escolha uma opção

    def __str__(self):
        return self.username

class Professores(models.Model):
    ni = models.PositiveBigIntegerField()
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    dataNascimento = models.DateField()
    dataContratacao = models.DateField()
    disciplina = models.CharField(max_length=30)

    def __str__(self):
        return self.nome

class Disciplinas(models.Model):
    nome = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    cargaHoraria = models.PositiveIntegerField()
    descricao = models.TextField()
    professorResponsavel = models.ForeignKey('Professores', on_delete=models.CASCADE, related_name='professores_representantes') #CASCADE: Se um professor for deletado, todos os registros da tabela de disciplinas também serão deletados. related_name: Permite acessar todos os registros que referenciam um professor pelo nome "professores_representantes"

    def __str__(self):
        return self.nome

class Ambientes(models.Model):
    periodoAmbiente = [
        ('Manhã', 'Manhã'),
        ('Tarde', 'Tarde'),
        ('Noite', 'Noite'),
    ]
    dataInicio = models.DateField()
    dataTermino = models.DateField()
    periodo = models.CharField(max_length=20, choices=periodoAmbiente, default="Manhã") #default: valor padrão caso o usuário não escolha uma opção 
    salaReservada = models.PositiveIntegerField()
    professorRepresentante = models.ForeignKey(Professores, on_delete=models.CASCADE) #CASCADE: Se um professor for deletado, todos os registros da tabela de disciplinas também serão deletados
    disciplinaAssociada = models.ForeignKey(Disciplinas, on_delete=models.CASCADE) #CASCADE: Se um professor for deletado, todos os registros da tabela de disciplinas também serão deletados

    def __str__(self):
        return self.periodo