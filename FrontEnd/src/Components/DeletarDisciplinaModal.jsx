import css from "./DeletarDisciplinaModal.module.css";
import axios from "axios";

export function DeletarDisciplinaModal({ openModal, closeModal, atualizarTabelaDisciplina }) {
    if (!openModal) { //Verificando se o modal está visível ou oculto
        return null;
    }

    async function DeletarDisciplinaDELETE() {
        const token = localStorage.getItem("access_token"); //Buscando o token armazenado no login do usuário

        const id = localStorage.getItem("id"); //Pegando o ID do usuário logado, salvo no login

        try {
            await axios.delete(`http://127.0.0.1:8000/escolucas/disciplina/${id}/`, { //Realizando uma requisição DELETE na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                }
            })

            alert("Disciplina deletada com sucesso!");

            closeModal(); //Fechando o modal

            atualizarTabelaDisciplina(); //Atualizando a tabela de professores para garantir que a tabela seja atualizada sem recarregar a página
        }
        catch(error) {
            console.error("Erro ao deletar disciplina: ", error);
        }
    }

    return (
        <div className={css.containerModal}>
            <div className={css.modal}>
                <h1>Tem certeza que deseja deletar essa disciplina?</h1>
                <div className={css.botoes}>
                    {/* Chamando a função DeletarDisciplinaDELETE para deletar a disciplina */}
                    <button type="submit" onClick={DeletarDisciplinaDELETE}>Sim</button>
                    <button type="button" onClick={closeModal}>Não</button>
                </div>
            </div>
        </div>
    )
}