import { Navigate } from "react-router-dom";

export function PermissaoProfessor({ children }) { //children representa o conteúdo da rota protegida
    const funcao = localStorage.getItem("função"); //Buscando a função do usuário salvada no login

    if(funcao !== "Professor") { //Verificando se o usuário logado não é professor
        alert("Apenas os professores podem acessar essa página, desculpe-me.");

        return <Navigate to="/inicial"/>; //Voltando para a página inicial
    }

    return children; //Se o usuário for gestor, renderiza o conteúdo protegido
}