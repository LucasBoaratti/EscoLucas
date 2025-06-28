from rest_framework.permissions import BasePermission

class IsProfessor(BasePermission): #Classe que permite acesso apenas para professores autenticados
    def has_permission(self, request, view): 
        if request.user.is_authenticated and request.user.funcao == "Professor":
            return True
        return False
    
class IsGestor(BasePermission): #Classe que permite acesso apenas para gestores autenticados
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.funcao == "Gestor":
            return True
        return False    