import css from "./Menu.module.css";
import Professor from "../assets/Images/Professor.png";
import Gestor from "../assets/Images/Gestor.png";
import { useNavigate } from "react-router-dom";
import Fernanda from "../assets/Images/Fernanda.png";
import Marcia from "../assets/Images/Márcia.png";

export function Menu() {
    const navigate = useNavigate();

    return (
        <div className={css.container}>
            <h1>Conheça a escoLucas!</h1>
            <div className={css.endpoints}>
                <div className={css.professores} onClick={() => navigate("/professor")}>
                    <img src={Professor} alt="Imagem de um professor." />
                    <p>Professores</p>
                </div>
                <div className={css.gestores} onClick={() => navigate("/gestor")}>
                    <img src={Gestor} alt="Imagem de um gestor." />
                    <p>Gestores</p>
                </div>
            </div>
            <div className={css.missao}>
                <h2 className={css.tituloMissao}>Nossa missão</h2>
                <p className={css.paragrafoMissao}>Aqui na EscoLucas, acreditamos que a educação transforma vidas e constrói o futuro. Nossa missão é proporcionar um ambiente de aprendizado escolar, inovador e inclusivo, onde cada aluno possa desenvolver seu potencial ao máximo.</p>

                <div className={css.depoimentos}>
                    <h2>Depoimentos</h2>
                    <div className={css.fernanda}>
                        <img src={Fernanda} alt="Foto genérica da Fernanda com o seu nome logo abaixo." />
                        <p>"Estudar aqui me deu conhecimento para alcançar meus sonhos. - Ex-Aluna, Fernanda.</p>
                    </div>
                    <div className={css.marcia}>
                        <p>"A escola me ensinou muito mais do que matérias, me ensinou valores para a vida. - Márcia, professora.</p>
                        <img src={Marcia} alt="Foto genérica da Márcia com o seu nome logo abaixo." />
                    </div>
                </div>
            </div>
        </div>
    )
}