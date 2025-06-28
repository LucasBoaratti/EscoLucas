import css from "./DeletarProfessorModal.module.css";
import axios from "axios";

export function DeletarProfessorModal({ openModal, closeModal, atualizarTabelaProfessores }) {
    if (!openModal) { //Verificando se o modal está visível ou oculto
        return null;
    }

    async function DeletarProfessorDELETE() {
        const token = localStorage.getItem("access_token"); //Buscando o token armazenado no login do usuário

        const id = localStorage.getItem("id"); //Pegando o ID do usuário logado, salvo no login

        try {
            axios.delete(`http://127.0.0.1:8000/escolucas/professor/${id}/`, { //Realizando uma requisição DELETE na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                } 
            })

            alert("Professor deletado com sucesso!");

            closeModal(); //Fechando o modal

            atualizarTabelaProfessores(); //Atualizando a tabela de professores para garantir que a tabela seja atualizada sem recarregar a página
        }
        catch(error) {
            console.error("Erro ao deletar professor: ", error);
        }
    }

    return (
        <div className={css.mainModal}>
            <div className={css.containerModal}>
                <h1>Tem certeza que deseja deletar esse professor?</h1>
                <div className={css.botoes}>
                    {/* Chamando a função DeletarProfessorDELETE para deletar o professor */}
                    <button type="submit" onClick={DeletarProfessorDELETE}>Sim</button>
                    <button type="button" onClick={closeModal}>Não</button>
                </div>
            </div>
        </div>
    )
}