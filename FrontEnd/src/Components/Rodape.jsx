import estilos from "./Rodape.module.css";

export function Rodape() {
    return (
        <footer>
            <div className={estilos.rodape}>
                <div className={estilos.direitosAutorais}>
                    <h1>© 2025 EscoLucas, Todos os direitos reservados.</h1>
                    <div className={estilos.icones}>
                        <i class="bi bi-instagram"></i>
                        <i class="bi bi-facebook"></i>
                        <i class="bi bi-geo-fill"></i>
                        <i class="bi bi-twitter"></i>
                    </div>
                </div>
                <div className={estilos.contatos}>
                    <p>Entre em contato</p>
                    <p>EscoLucas@gmail.com</p>
                    <p>(19) 99999-1111</p>
                </div>
                <div className={estilos.link}>
                    <p>Links úteis</p>
                    <p>Fale conosco</p>
                    <p>Sobre nós</p>
                </div>
                <div className={estilos.configuracoes}>
                    <p>Configurações</p>
                    <div className={estilos.iconesAcessibilidade}>
                        <i class="bi bi-translate"></i>
                        <i class="bi bi-person-arms-up"></i>
                    </div> 
                </div>
            </div>
        </footer>
    )
}