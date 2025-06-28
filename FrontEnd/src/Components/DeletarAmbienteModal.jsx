import axios from "axios";
import css from "./DeletarAmbienteModal.module.css";

export function DeletarAmbienteModal({ openModal, closeModal, atualizarTabelaAmbiente }) {
    if(!openModal) { //Verificando se o modal está visível ou oculto
        return null;
    }

    async function DeletarAmbienteDELETE() {
        const id = localStorage.getItem("id"); //Pegando o ID do usuário logado, salvo no login

        const token = localStorage.getItem("access_token"); //Buscando o token armazenado no login do usuário

        try {
            await axios.delete(`http://127.0.0.1:8000/escolucas/ambiente/${id}/`, { //Realizando uma requisição DELETE na API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                }
            })

            alert("Ambiente deletado com sucesso!");

            closeModal(); //Fechando o modal

            atualizarTabelaAmbiente(); //Atualizando a tabela de professores para garantir que a tabela seja atualizada sem recarregar a página
        }
        catch(error) {
            console.error("Erro ao deletar ambiente: ", error);
        }
    }

    return (
        <div className={css.container}>
            <div className={css.modal}>
                <h1>Tem certeza que deseja deletar esse ambiente?</h1>
                <div className={css.botoes}>
                    {/* Chamando a função DeletarAmbienteDELETE para deletar o ambiente */}
                    <button type="submit" onClick={DeletarAmbienteDELETE}>Sim</button>
                    <button type="button" onClick={closeModal}>Não</button>
                </div>
            </div>
        </div>
    )
}