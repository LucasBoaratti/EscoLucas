//Importando todas as páginas do projeto

import { Routes, Route } from "react-router-dom"; //Routes: Define um grupo de rotas | Route: Define uma rota de uma página específica
import { Index } from "../Pages/Index";
import { Conteudo } from "../Components/Conteudo";
import { Login } from "../Pages/Login";
import { Gestor_Endpoints } from "../Pages/Gestor_Endpoints";
import { Professor_Endpoints } from "../Pages/Professor_Endpoints";
import { ProfessorCRUD } from "../Pages/ProfessorCRUD";
import { CriarProfessor } from "../Pages/CriarProfessor";
import { EditarProfessor } from "../Pages/EditarProfessor";
import { DisciplinaCRUD } from "../Pages/DisciplinaCRUD";
import { CriarDisciplina } from "../Pages/CriarDisciplina";
import { EditarDisciplina } from "../Pages/EditarDisciplina";
import { AmbienteCRUD } from "../Pages/AmbienteCRUD";
import { CriarAmbiente } from "../Pages/CriarAmbiente";
import { EditarAmbiente } from "../Pages/EditarAmbiente";
import { VerificarSala } from "../Pages/VerificarSala";
import { VerificarDisciplina } from "../Pages/VerificarDisciplina";
import { PermissaoGestor } from "../Components/PermissaoGestor";
import { PermissaoProfessor } from "../Components/PermissaoProfessor";

export function Rotas() {
    return (
        <Routes>
            {/* Essa é a rota principal que exibe o login na hora que o usuário abre o site  */}
            <Route path="/" element={<Login/>}/> 

            {/* A rota Index representa sub rotas do site */}
            <Route path="/inicial" element={<Index/>}> 
                {/* Aqui, a página home (Conteudo) é renderizada junto com a rota Index */}
                <Route index element={<Conteudo/>}/>
            </Route>

            <Route path="/professor" element={<Index/>}>
                <Route index element={<PermissaoProfessor>
                    <Professor_Endpoints/>
                </PermissaoProfessor>}/>
            </Route>

            <Route path="/gestor" element={<Index/>}>
                {/* A rota Gestor_Endpoints é renderizada dentro da rota Permissão para que apenas gestores acessem a página de gestores */}
                <Route index element={<PermissaoGestor>
                    <Gestor_Endpoints/>
                </PermissaoGestor>}/>
            </Route>
            
            {/* O CRUD de professores, ambientes e disciplinas também são protegidos para que apenas os gestores possam ver, criar, atualizar e deletar os dados */}
            <Route path="/professorCRUD" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <ProfessorCRUD/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/criarProfessor" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <CriarProfessor/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/editarProfessor" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <EditarProfessor/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/disciplinaCRUD" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <DisciplinaCRUD/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/criarDisciplina" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <CriarDisciplina/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/editarDisciplina" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <EditarDisciplina/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/ambienteCRUD" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <AmbienteCRUD/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/criarAmbiente" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <CriarAmbiente/>
                </PermissaoGestor>}/>
            </Route>

            <Route path="/editarAmbiente" element={<Index/>}>
                <Route index element={<PermissaoGestor>
                    <EditarAmbiente/>
                </PermissaoGestor>}/>
            </Route>
            
            {/* As rotas de busca, todos podem acessá-las */}
            <Route path="/buscarSala" element={<Index/>}>
                <Route index element={<VerificarSala/>}/>
            </Route>

            <Route path="/buscarDisciplina" element={<Index/>}>
                <Route index element={<VerificarDisciplina/>}/>
            </Route>
        </Routes>
    )
}