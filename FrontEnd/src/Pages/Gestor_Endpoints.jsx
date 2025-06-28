import css from "./Gestor_Endpoints.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Professor_CRUD from "../assets/Images/Professor_CRUD.png";
import Disciplina_CRUD from "../assets/Images/Disciplina_CRUD.png";
import Ambiente_CRUD from "../assets/Images/Ambiente_CRUD.png";

export function Gestor_Endpoints() {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); //Criando um estado para armazenar o nome do gestor

    async function ObterNome() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/escolucas/login/');  //Realizando uma requisição GET na API

            setUsername(response.data.usuario.username); //Armazenando o nome do gestor no estado para ser exibido na tela

            localStorage.setItem('username', response.data.usuario.username); //Salvando o nome do gestor
        }
        catch(error) {
            console.error("Erro ao obter nome.", error);
        }
    }

    useEffect(() => {
        const nome = localStorage.getItem('username'); //Buscando o nome do gestor salvo no login
        
        if (nome) { //Verificando se o nome está salvo no localStorage
            setUsername(nome); 
        }
        else { 
            ObterNome(); //Chamando a função para obter os dados do usuário
        }
    }, []);

    return (
        <main>
            <div className={css.container}>
                {/* Exibindo o nome do gestor */}
                <h1>Bem vindo(a) à página de gestores, {username}!</h1>
                <div className={css.endpointsGestor}>
                    <div className={css.professor} onClick={() => navigate("/professorCRUD")}>
                        <img src={Professor_CRUD} alt="Professor com símbolos de mais, olhos, setas girando no sentido horário e uma lixeira abaixo da foto." />
                        <p>Professores</p>
                    </div>
                    <div className={css.disciplina} onClick={() => navigate("/disciplinaCRUD")}>
                        <img src={Disciplina_CRUD} alt="Livros com símbolos de mais, olhos, setas girando no sentido horário e uma lixeira abaixo da foto." />
                        <p>Disciplinas</p>
                    </div>
                    <div className={css.ambiente} onClick={() => navigate("/ambienteCRUD")}>
                        <img src={Ambiente_CRUD} alt="Sala de aula com símbolos de mais, olhos, setas girando no sentido horário e uma lixeira abaixo da foto." />
                        <p>Ambientes</p>
                    </div>
                </div>
                <button type="button" className={css.botaoVoltar} onClick={() => navigate("/inicial")}>
                    <i class="bi bi-arrow-left"></i>
                    <p>Voltar</p>
                </button>
            </div>
        </main>
    )
}