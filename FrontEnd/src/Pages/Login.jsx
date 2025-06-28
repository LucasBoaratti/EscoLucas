import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import css from "./Login.module.css";

const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe seu nome, por favor.')
        .max(25, 'Informe até 25 caracteres, por favor.'),
    password: z.string()
        .min(8, 'Informe no mínimo 8 dígitos para a senha, por favor.'),
});

export function Login() {
    const navigate = useNavigate();

    const {
        register, //Registra para mim e valide ->
        handleSubmit, //no momento em que eu fizer o envio do formulário ->
        formState: { errors } //e guarde os erros em "errors" ->
    } = useForm ({ //usando das bibliotecas do hookform ->
        resolver: zodResolver(schemaLogin) //fazendo a resolução com o schema acima
    });

    async function ObterDados(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/escolucas/login/', { //Realizando uma requisição POST na API
                username: data.username, //Incluindo o nome do usuário na requisição
                password: data.password //Incluindo a senha do usuário na requisição
            }); 

            const { access, refresh, usuario } = response.data;

            //Salvando o token, refresh_token, id, nome e senha do usuário 
            localStorage.setItem('access_token', access); 
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user_id', usuario.id);
            localStorage.setItem('username', usuario.username);
            localStorage.setItem('função', usuario.funcao);

            alert("Login realizado com sucesso!");

            navigate('/inicial');
        }

        catch(error) {
            console.error("Erro no login.", error);

            window.alert("Dados inválidos. Tente novamente.");
        }
    }

    return (
        <main className={css.loginForm}>
            <div className={css.centralizarForm}>
                {/* Aqui, o formulário usa o handleSubmit para validar os dados antes de enviá-los */}
                <form onSubmit={handleSubmit(ObterDados)}>
                    <h2 className={css.titulo}>Seja bem-vindo(a) à escoLucas! faça seu login agora :D</h2>

                    <label>Nome:</label>
                    {/* Em cada campo, é ligado ao estado via register */}
                    <input 
                        {...register('username')}
                        placeholder="Digite seu nome"
                    />
                    {/* Se houver algum erro, será lançado uma mensagem de dado invalidado */}
                    {errors.username && <p className={css.erros}>{errors.username.message}</p>}

                    <label>Senha:</label>
                    <input
                        {...register('password')}
                        placeholder="Digite sua senha"
                        type="password"
                    />
                    {errors.password && <p className={css.erros}>{errors.password.message}</p>}
                    <div className={css.divBotao}>
                        <button type="submit" className={css.botao}>Entrar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}