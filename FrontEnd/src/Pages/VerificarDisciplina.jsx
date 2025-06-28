import css from "./VerificarDisciplina.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function VerificarDisciplina() {
    const [buscarDisciplina, setBuscarNome] = useState([]); //Armazenando as disciplinas recuperadas na API

    const nome = localStorage.getItem("username"); //Buscando o nome do professor salvo no login

    const navigate = useNavigate();

    async function BuscarDisciplina() {
        const token = localStorage.getItem("access_token"); //Pegando o token do usuário salvo no login

        try {
            const response = await axios.get("http://127.0.0.1:8000/escolucas/disciplinaProfessor/", { //Realizando uma requisição GET na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                }
            })

            setBuscarNome(response.data); //Atualizando setBuscarNome com os resultados
        }
        catch(error) {
            console.error("Erro ao buscar o nome do professor: ");
        }
    }

    return (
        <main className={css.container}>
            <div className={css.busca}>
                <h1>Verifique sua disciplina aqui, {nome}</h1>
                <div className={css.botao}>
                    <button type="button" onClick={BuscarDisciplina}>Buscar</button>
                    <button type="button" className={css.botaoVoltar} onClick={() => navigate("/professor")}>Voltar</button>
                </div>
            </div>        
            <table className={css.tabela}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Carga horária</th>
                        <th>Descrição</th>
                        <th>Professor responsável (ID)</th>                        
                    </tr>
                </thead>
                <tbody>
                    {/* Se buscarDisciplina tiver resultados, será exibido cada disciplina do professor responsável */}
                    {buscarDisciplina.length > 0 ? (
                        buscarDisciplina.map((disciplina) => (
                            <tr key={disciplina.id}>
                                <td>{disciplina.id}</td>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.curso}</td>
                                <td>{disciplina.cargaHoraria}</td>
                                <td style={{ width:"500px" }}>{disciplina.descricao}</td>
                                <td>{disciplina.professorResponsavel}</td>
                            </tr>
                        ))
                    ) : (
                        <tr> 
                            {/* Se não tiver nenhuma disciplina que o professor seja responsável, será exibido uma mensagem de aviso */}
                            {/* colSpan: Define o quando de colunas o td irá ocupar */}                                   
                            <td colSpan="7">Nenhum ambiente reservado com seu nome.</td>
                        </tr>
                    )}  
                </tbody>
            </table>
        </main>
    )
}