import { useEffect, useState } from "react";
import css from "./DisciplinaCRUD.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeletarDisciplinaModal } from "../Components/DeletarDisciplinaModal";

export function DisciplinaCRUD() {
    const [disciplina, setDisciplina] = useState([]); //Estado que armazena uma lista de disciplinas obtida na API
    const [deletarDisciplina, setDeletarDisciplina] = useState(false); //Estado que controla a exibição do modal

    const navigate = useNavigate();

    const token = localStorage.getItem("access_token"); //Pegando o token do usuário salvo no login

    async function ObterDisciplinas() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/escolucas/disciplina/", { //Realizando uma requisição GET na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho   
                }
            });

            setDisciplina(response.data); //Armazenando os dados da disciplina para exibi-los na tabela
        }
        catch(error) {
            console.error("Erro ao ver disciplina: ", error);
        }
    }

    useEffect(() => {
        if (!token) { //Verificando se o usuário possui um token
            console.log("Token não encontrado.");
            return;
        }

        ObterDisciplinas(); //A função é executada quando o componente for montado
    }, [])
    
    return (
        <main className={css.container}>
            <h1>Conheça as disciplinas existentes na EscoLucas</h1>
            <div className={css.botoes}>
                <button type="button" className={css.botaoCriar} onClick={() => navigate("/criarDisciplina")}>
                    <i class="bi bi-plus-lg"></i>
                    <p>Adicionar disciplina</p>
                </button>
                <button type="button" onClick={() => navigate("/gestor")} className={css.botaoVoltar}>
                    <i class="bi bi-arrow-left"></i>
                    <p>Voltar</p>
                </button>
            </div>
            <table className={css.tabelaDisciplinas}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Carga horária</th>
                        <th>Descrição</th>
                        <th>Professor Responsável (ID)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {/* "Duplicando" os dados da lista de disciplinas com o map() para exibir os dados das disciplinas */}
                {disciplina.map((disciplina) => (
                    <tr key={disciplina.id}>
                        <td>{disciplina.id}</td>
                        <td>{disciplina.nome}</td>
                        <td>{disciplina.curso}</td>
                        <td>{disciplina.cargaHoraria}</td>
                        <td>{disciplina.descricao}</td>
                        <td>{disciplina.professorResponsavel}</td>
                        <td>
                            <i class="bi bi-pencil-square" style={{cursor:"pointer"}} onClick={() => {
                                localStorage.setItem("id", disciplina.id); //Incluindo o ID da disciplina na rota para a página de editar disciplina 
                                navigate("/editarDisciplina");
                            }}>
                            </i>
                            <i class="bi bi-trash" style={{cursor:"pointer"}} onClick={() => {
                                localStorage.setItem("id", disciplina.id); //Incluindo o ID da disciplina na rota para a página de deletar disciplina
                                setDeletarDisciplina(true); //Aqui, é exibido o modal de exclusão se o setDeletarDisciplina for true
                            }}>
                            </i>
                            {/* Depois de excluir uma disciplina, a função ObterDisciplina é chamada para atualizar a tabela */}
                            <DeletarDisciplinaModal openModal={deletarDisciplina} closeModal={() => 
                                setDeletarDisciplina(false)}
                                atualizarTabelaDisciplina={ObterDisciplinas}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>    
        </main>
    )
}