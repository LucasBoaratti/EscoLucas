import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import css from "./EditarProfessor.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schemaPUT = z.object({ //Realizando as regras de validação dos campos do formulário PUT
    ni: z.string()
        .min(1, "Digite seu número de identificação, por favor.")
        .max(7, "O número de identificação não pode ser mais do que 7."),
    nome: z.string()
        .min(1, "Digite seu nome, por favor.")
        .max(100, "Limite de caracteres ultrapassado."),
    email: z.string()
        .email("Digite um e-mail que possua '@' e '.com'"),
    telefone: z.string()
        .min(1, "Digite seu telefone, por favor.")
        .max(20, "O número de telefone não pode ultrapassar 20 caracteres!"),
    dataNascimento: z.string() 
        .min(1, "Escolha uma data válida, por favor.")
        .refine((data) => { //Fazendo as validações de datas para garantir que a data de nascimento seja antes da data atual
            const dataAtual = new Date();
            const dataDeNascimento = new Date(data); 
            return dataDeNascimento < dataAtual;
        }, {
            message: "A data de nascimento deve ser antes da data atual!", //Caso haja algum erro na data...
        }),
    dataContratacao: z.string()
        .min(1, "Escolha uma data válida, por favor."),
    disciplina: z.string()
        .min(1, "Digite a discipina que você leciona.")
        .max(30, "O número de caracteres não pode ultrapassar 30 caracteres."),
}).refine((data) => { //Fazendo as validações de datas para garantir que a data de contratação seja depois da data de nascimento
        const nascimento = new Date(data.dataNascimento);
        const contratacao = new Date(data.dataContratacao);
        return contratacao >= nascimento;
}, {
    message: "A data de contratação não pode ser anterior à data de nascimento.",
    path: ["dataContratacao"],
})

export function EditarProfessor() {
    const {
        register, //Ligação dos inputs com o estado do componente
        handleSubmit, //Captura a submissão do formulário e valida os dados
        formState: { errors }, //Armazenando mensagens de erro com o errors
    } = useForm({
        resolver: zodResolver(schemaPUT) //Integrando o Zod para aplicar as regras de validação
    })

    const id = localStorage.getItem("id"); //Pegando o ID do usuário logado, salvo no login

    const navigate = useNavigate();
    
    async function EditarProfessorPUT(data) { 
        const token = localStorage.getItem("access_token"); //Pegando o token do usuário salvo no login

        if (!token) { //Verificando se o usuário não possui um token
            console.log("Token não encontrado.");
            return;
        }

        try {
            const dados = {
                ...data,
                ni: parseInt(data.ni), //Convertendo o número de identificação para inteiro
            }
            await axios.put(`http://127.0.0.1:8000/escolucas/professor/${id}/`, dados, { //Realizando uma requisição PUT para a API  
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                    "Content-type": "application/json",
                },
            });

            alert("Professor editado com sucesso!"); 

            navigate("/professorCRUD");
        }
        catch(error) {
            console.error("Erro ao atualizar os dados: ", error);
        }
    }

    return (
        <div className={css.formularioUpdate}>
            <div className={css.containerFormulario}>
                {/* Aqui, o formulário usa o handleSubmit para validar os dados antes de enviá-los */}
                <form className={css.formularioPUT} onSubmit={handleSubmit(EditarProfessorPUT)}>
                    <h1 className={css.tituloFormulario}>Editar professor</h1>
                    {/* Em cada campo, é ligado ao estado via register */}
                    <label htmlFor="ni">NI:</label> <br />
                    <input type="number" name="ni" id="numeroIdentificacao" {...register("ni")}/> <br />
                    {/* Se houver algum erro, será lançado uma mensagem de dado invalidado */}
                    {errors.ni && <p>{errors.ni.message}</p>}

                    <label htmlFor="nome">Nome:</label> <br />
                    <input type="text" name="nome" id="nome" {...register("nome")}/> <br />
                    {errors.nome && <p>{errors.nome.message}</p>}

                    <label htmlFor="email">E-Mail:</label> <br />
                    <input type="email" name="email" id="email" {...register("email")}/> <br />
                    {errors.email && <p>{errors.email.message}</p>}

                    <label htmlFor="telefone">Telefone:</label> <br />
                    <input type="text" name="telefone" id="telefone" {...register("telefone")}/> <br />
                    {errors.telefone && <p>{errors.telefone.message}</p>}

                    <label htmlFor="dataNascimento">Data de nascimento:</label> <br />
                    <input type="date" name="dataNascimento" id="dataNascimento" {...register("dataNascimento")}/> <br />
                    {errors.dataNascimento && <p>{errors.dataNascimento.message}</p>}

                    <label htmlFor="dataContratacao">Data de contratação:</label> <br />
                    <input type="date" name="dataContratacao" id="dataContratacao" {...register("dataContratacao")}/> <br />
                    {errors.dataContratacao && <p>{errors.dataContratacao.message}</p>}

                    <label htmlFor="disciplina">Disciplina:</label> <br />
                    <input type="text" name="disciplina" id="disciplina" {...register("disciplina")}/> <br />
                    {errors.disciplina && <p>{errors.disciplina.message}</p>}

                    <div className={css.botoesFormulario}>
                        <button type="button" onClick={() => navigate("/professorCRUD")}>Voltar</button>
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}