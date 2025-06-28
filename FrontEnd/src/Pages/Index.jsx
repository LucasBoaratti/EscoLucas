//Página que organiza o layout das outras páginas do site

import { Cabecalho } from "../Components/Cabecalho";
import { Outlet } from "react-router-dom";
import { Rodape } from "../Components/Rodape";

export function Index() {
	return (
		<div style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
			{/* Exibindo as informações do cabeçalho no topo da página */}
			<Cabecalho/>
			{/* Fixando o rodapé no fim das páginas com flex:"1" */}
			<div style={{flex:"1"}}> 
				{/* O Outlet renderiza conteúdo dinâmicos com base na rota atual */}
				<Outlet/>
			</div>
			{/* Exibindo o rodapé no final da página */}
			<Rodape/>
		</div>
	)
}