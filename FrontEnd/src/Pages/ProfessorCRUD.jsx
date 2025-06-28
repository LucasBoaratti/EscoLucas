import css from "./ProfessorCRUD.module.css"; 
import { useState, useEffect } from "react"; //o useState gerencia o estado do componente 
//o useEffect executa ações quando o componente é montado
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeletarProfessorModal } from "../Components/DeletarProfessorModal"; //Importando o modal de deletar professores

export function ProfessorCRUD() {
    const [professor, setProfessor] = useState([]); //Estado que armazena uma lista de professores obtida na API
    const [deletarProfessor, setDeletarProfessor] = useState(false); //Estado que controla a exibição do modal

    const navigate = useNavigate();

    const token = localStorage.getItem('access_token'); //Pegando o token do usuário salvo no login

    async function ObterDadosProfessor() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/escolucas/professor/", { //Realizando uma requisição GET na API
                headers: {
                    'Authorization': `Bearer ${token}`, //Incluindo o token no cabeçalho   
                },
            });

            setProfessor(response.data); //Armazenando os dados do professor para exibi-los na tabela

            localStorage.setItem("nomeProfessor", response.data[0].nome); //Salvando o nome do professor logado para usar em filtragens
        }

        catch(error) {
            console.error("Erro ao encontrar professor: ", error);
        }
    }

    useEffect(() => {   
        if (!token) {
            console.error("Token não encontrado.");
            return;
        }

        ObterDadosProfessor(); //A função é executada quando o componente for montado 
    }, [])

    return (
        <main className={css.containerTabela}>
            <h1>Professores registrados na EscoLucas</h1>
            <div className={css.botoes}>
                <button type="button" className={css.botaoCriar} onClick={() => navigate("/criarProfessor")}>
                    <i class="bi bi-plus-lg"></i>
                    <p>Adicionar professor</p>
                </button>
                <button type="button" className={css.botaoVoltar} onClick={() => navigate("/gestor")}>
                    <i class="bi bi-arrow-left"></i>
                    <p>Voltar</p>
                </button>
            </div>
            <table className={css.tabela}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NI</th>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Data de Contratação</th>
                        <th>Disciplina</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* "Duplicando" os dados da lista de professor com o map() para exibir os dados dos professores */}
                    {professor.map((professor) => (
                        <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.ni}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.email}</td>
                            <td>{professor.telefone}</td>
                            <td>{professor.dataNascimento}</td>
                            <td>{professor.dataContratacao}</td>
                            <td>{professor.disciplina}</td>
                            <td>
                                <i class="bi bi-pencil-square" style={{cursor:"pointer"}} onClick={() => { 
                                    localStorage.setItem("id", professor.id); //Incluindo o ID do professor na rota para a página de editar professor
                                    navigate("/editarProfessor");
                                }}>
                                </i>
                                <i class="bi bi-trash" style={{cursor:"pointer"}} onClick={() => {
                                    localStorage.setItem("id", professor.id); //Incluindo o ID do professor na rota para a página de deletar professor 
                                    setDeletarProfessor(true); // Aqui, é exibido o modal de exclusão se o setDeletarProfessor for true
                                }}>
                                </i>
                                {/* Depois de excluir um professor, a função ObterDadosProfessor é chamada para atualizar a tabela */}
                                <DeletarProfessorModal openModal={deletarProfessor} closeModal={() => 
                                    setDeletarProfessor(false)} 
                                    atualizarTabelaProfessores={ObterDadosProfessor}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}