import css from "./VerificarSala.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function VerificarSala() {
    const [buscarAmbiente, setBuscarAmbiente] = useState([]); //Armazenando as disciplinas recuperadas na API

    const nome = localStorage.getItem("username"); //Buscando o nome do professor salvo no login

    const navigate = useNavigate();

    async function BuscarSala() {
        const token = localStorage.getItem("access_token"); //Pegando o token do usuário salvo no login

        try {
            const response = await axios.get("http://127.0.0.1:8000/escolucas/reservaSalaProfessor/", { //Realizando uma requisição GET na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                }
            });

            setBuscarAmbiente(response.data); //Atualizando setBuscarNome com os resultados
        }

        catch(error) {
            console.error("Erro ao buscar nome: ", error);
        }
    }

    return (
        <main className={css.container}>
            <div className={css.busca}>
                <h1>Verifique sua sala aqui, {nome}</h1>
                <div className={css.botao}>
                    <button type="button" onClick={BuscarSala}>Buscar</button>
                    <button type="button" className={css.botaoVoltar} onClick={() => navigate("/professor")}>Voltar</button>
                </div>        
            </div>
            <table className={css.tabela}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sala reservada</th>
                        <th>Data de início</th>
                        <th>Data de término</th>
                        <th>Período</th>
                        <th>Professor representante</th>
                        <th>Disciplina associada</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Se buscarAmbiente tiver resultados, será exibido cada ambiente reservado do professor responsável */}
                    {buscarAmbiente.length > 0 ? (
                        buscarAmbiente.map((ambiente) => (
                            <tr key={ambiente.id}>
                                <td>{ambiente.id}</td>
                                <td>{ambiente.salaReservada}</td>
                                <td>{ambiente.dataInicio}</td>
                                <td>{ambiente.dataTermino}</td>
                                <td>{ambiente.periodo}</td>
                                <td>{ambiente.professorRepresentante}</td>
                                <td>{ambiente.disciplinaAssociada}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            {/* Se não tiver nenhum ambiente que o professor seja responsável, será exibido uma mensagem de aviso */}
                            {/* colSpan: Define o quando de colunas o td irá ocupar */}
                            <td colSpan="7">Nenhum ambiente reservado com seu nome.</td>
                        </tr>
                    )}  
                </tbody>
            </table>
        </main>
    )
}