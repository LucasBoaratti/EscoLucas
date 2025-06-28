import css from "./Professor_Endpoints.module.css";
import Lupa_Sala from "../assets/Images/Lupa_Sala.png";
import Lupa_Disciplina from "../assets/Images/Lupa_Disciplina.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Professor_Endpoints() {
    const navigate = useNavigate();

    const [username, setUsername] = useState(''); //Criando um estado para armazenar o nome do professor

    function ObterNome() {
        try {
            axios.get('http://127.0.0.1:8000/escolucas/login/'); //Realizando uma requisição GET na API

            setUsername(data.usuario.username); //Armazenando o nome do professor no estado para ser exibido na tela

            localStorage.setItem('username', data.usuario.username); //Salvando o nome do gestor
        }
        catch(error) {
            console.error("Erro ao obter nome.", error);
        }
    }

    useEffect(() => {
        const nome = localStorage.getItem('username'); //Buscando o nome do professor salvo no login

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
                {/* Exibindo o nome do professor */}
                <h1>Bem vindo(a) à página de professores! o que você deseja fazer, {username}?</h1>
                <div className={css.endpointsProfessor}>
                    <div className={css.buscarSala} onClick={() => navigate("/buscarSala")}>
                        <img src={Lupa_Sala} alt="Lupa com uma sala ao fundo." />
                        <p>Verificar sala reservada</p>
                    </div>
                    <div className={css.buscarDisciplina} onClick={() => navigate("/buscarDisciplina")}>
                        <img src={Lupa_Disciplina} alt="Lupa com uma sala ao fundo." />
                        <p>Verificar disciplina</p>
                    </div>
                </div>  
                <button type="button" onClick={() => navigate("/inicial")} className={css.botaoVoltar}>
                    <i class="bi bi-arrow-left"></i>
                    <p>Voltar</p>
                </button>  
            </div>
        </main>
    )
}