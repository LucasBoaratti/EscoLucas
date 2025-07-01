# Como usar a aplicação:

## BackEnd

1. Baixe a aplicação clicando em code e vá em Download ZIP;

2. Após baixar os arquivos, abra-o no VSCode;

3. Após abrir o VSCode, abra um terminal e acesse a pasta BackEnd: 

```bash
cd .\BackEnd\
```

4. Depois crie o ambiente virtual: 

```python
python -m venv .venv
```

5. Acesse a .venv: 

```python
.\.venv\Scripts\activate
````

6. Instale as bibliotecas do python: 

```python
pip install -r requirements.txt
```

7. Antes de rodar o projeto, coloque o seu usuário e sua senha do seu banco de dados MySQL em settings.py (Caminho do settings.py: BackEnd\Escola\settings.py

- No arquivo, você encontrará um código assim:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', #Definindo qual banco de dados será usado para guardar os dados na tabela
        'NAME': 'escolucas', #Nome do database
        'USER': '', #Usuário do banco de dados mysql
        'PASSWORD': '', #Senha do banco de dados mysql
        'HOST': 'localhost', #Servidor do banco de dados 
        'PORT': '3306', #Porta onde está rodando o servidor do banco de dados
    }
}
```

No 'USER' e no 'PASSWORD', você irá colocar o nome do seu usuário do banco de dados MySQL (por padrão, é root) e sua senha do banco de dados MySQL;

8. Agora entre no seu banco de dados MySQL e crie um DataBase e selecione o mesmo:

```SQL
DROP DATABASE IF EXISTS escolucas; #Se existir o mesmo banco de dados com o mesmo nome, exclua ele :)

CREATE DATABASE escolucas;

USE escolucas;
```

9. Após criar o banco de dados, volte no terminal do VSCode e digite o seguinte comando: 

```python
python .\manage.py makemigrations
```

10. E depois digite esse: 

```python
python .\manage.py migrate
```

11. Após esses comandos, você irá criar o super usuário: 

```python
python .\manage.py createsuperuser
```

12. E depois é só adicionar o nome, não precisa adicionar o email, e digite uma senha de pelo menos 8 dígitos (Porque senão não terá como logar no front, já que lá pede uma senha de no mínimo 8 dígitos), depois aceita a criação do usuário;

13. Depois, se tudo estiver certo, rode o programa: 

```python
python .\manage.py runserver
```

14. Após isso, acesse a url: 

```bash
http://127.0.0.1:8000/admin
```

15. Depois entre com o seu super usuário admin

16. E depois você irá mudar a função do seu usuário admin, seguindo os seguintes passos:

- Na tela inicial, clique em Users, logo abaixo de Escola_app;
- Escolha o seu usuário admin; (ele provavelmente estará com o Staff Status verde)
- Vá até o fim da página e ache a opção funcao e coloque a função de Gestor.
- E depois é só salvar :D

17. Agora, volte a tela inicial e crie outro usuário, seguindo os seguintes passos:

- Clique no ícone "+ Add";
- Adicione outro usuário com um nome diferente e uma senha de no mínimo 8 dígitos;
- E coloque a função dele de Professor;
- E depois é só salvar :D

## FrontEnd

18. Agora você irá abrir outro terminal no VSCode e acessar a pasta FrontEnd: 

```bash
cd .\FrontEnd\
```

19. Nessa pasta, você irá instalar a pasta node_modules: 

```node
npm install
```

20. E também as bibliotecas do front: 

```node
npm install axios react-hook-form zod @hookform/resolvers react-router-dom
```

21. Depois de instalar as bibliotecas e a pasta node_modules, rode o projeto: 

```node
npm run dev
```

22. Depois é só clicar no link gerado no terminal e acessar o FrontEnd da aplicação!!! 🥳🥳🥳

## Documentação

https://documenter.getpostman.com/view/41931850/2sB2j97p8L

# Linguagens e tecnologias utilizadas

## FrontEnd

<div style="display: flex;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width="70px" height="70px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" width="70px" height="70px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" width="70px" height="70px"/>
</div>

## BackEnd

<div style="display: flex;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width="70px" height="70px"/>
  <img src="https://icon.icepanel.io/Technology/png-shadow-512/Django.png" alt="Django" title="Django" width="70px" height="70px"/>
</div>

## Banco de dados

<div style="display: flex;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" width="70px" height="70px"/>
</div>

## Ferramentas e tecnologias

<div style="display: flex;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" width="70px" height="70px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" alt="Canva" width="70px" height="70px"/>
</div>

