import css from "./Conteudo.module.css";
import { Menu } from "./Menu";

export function Conteudo() {
    return (
        <main className={css.container}>
            {/* Renderizando o componente Menu como conteúdo principal */}
            <Menu/> 
        </main>
    )
}