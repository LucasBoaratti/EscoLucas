from django.contrib import admin
from .models import Usuario
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class UsuarioAdmin(UserAdmin): 
    fieldsets = UserAdmin.fieldsets + ( #Definindo os campos que serão exibidos ao editar um usuário
        ('Campos', {'fields': ('funcao',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + ( #Definindo os campos que irão aparecer ao criar um novo usuário
        ("Novos Campos", {'fields': ('funcao',)}),
    )

admin.site.register(Usuario, UsuarioAdmin)