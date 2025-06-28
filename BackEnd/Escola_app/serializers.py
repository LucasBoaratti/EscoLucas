from rest_framework import serializers
from .models import Usuario, Professores, Disciplinas, Ambientes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer): #Classe que transforma os campos do usuário em JSON
    class Meta:
        model = Usuario

        fields = "__all__"

class ProfessoresSerializer(serializers.ModelSerializer): #Classe que transforma os campos do professor em JSON
    class Meta:
        model = Professores

        fields = "__all__"

class DisciplinasSerializer(serializers.ModelSerializer): #Classe que transforma os campos da disciplina em JSON
    class Meta:
        model = Disciplinas

        fields = "__all__"

class AmbientesSerializer(serializers.ModelSerializer): #Classe que transforma os campos do ambiente em JSON
    class Meta:
        model = Ambientes

        fields = "__all__"

class LoginUsuarioSerializer(TokenObtainPairSerializer): #Classe que autentica o login do usuário baseada no JWT
    def validate(self, attrs): #Validando os dados recebidos 
        data = super().validate(attrs) #Chamando a validação orginal da classe 

        data["usuario"] = { #Adicionando algumas informações adicionais do usuário para retornar no serializer
            "username": self.user.username, 
            "funcao": self.user.funcao,
        }

        return data #Retornando o nome, a função e os tokens de acesso e renovação na tela, para o usuário