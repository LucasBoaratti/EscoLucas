import css from "./Cabecalho.module.css";
import Logo from "../assets/Images/Logo da EscoLucas.png";
import { useNavigate } from "react-router-dom";

export function Cabecalho() {
    const navigate = useNavigate();

    return (
        <header className={css.cabecalho}>
            <div className={css.logo}>
                <img src={Logo} alt="Logo do site" />
            </div>
            <div className={css.barraNavegacao}>
                <nav className={css.navegacao}>
                    <ul>
                        <li onClick={() => navigate("/inicial")} className={css.login}>Home</li>
                        <li onClick={() => navigate("/")} className={css.login}>Login</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}