import { z } from "zod";
import css from "./EditarAmbiente.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schemaPUT = z.object({
    salaReservada: z.number()
        .positive(),
    dataInicio: z.string()
        .min(1, "Insira uma data válida, por favor.")
        .refine((data) => { //Fazendo as validações de datas para garantir que a data de início seja antes da data de término
            const dataReservaInicio = new Date();
            const dataReserva = new Date(data);
            return dataReserva > dataReservaInicio;
        }, {
            message: "A data de início deve ser depois da data atual.",
        }),
    dataTermino: z.string()
        .min(1, "Insira uma data válida, por favor."), 
    periodo: z.enum(["Manhã", "Tarde", "Noite"]), //Validando o campo de escolha para garantir que o usuário escolha pelo menos uma opção
    professorRepresentante: z.number()
        .positive(),
    disciplinaAssociada: z.number()
        .positive(),
}).refine((data) => { //Fazendo as validações de datas para garantir que a data de término seja depois da data de início
    const dataInicio = new Date(data.dataInicio);
    const dataTermino = new Date(data.dataTermino);
    return dataTermino > dataInicio;
}, {
    message: "A data de término deve ser depois da data de início da reserva.",
    path: ["dataTermino"],
})

export function EditarAmbiente() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaPUT)
    })

    const id = localStorage.getItem("id");

    const navigate = useNavigate();

    async function EditarAmbientePUT(data) {
        const token = localStorage.getItem("access_token"); //Pegando o token do usuário salvo no login
 
        if(!token) { //Caso o token não seja encontrado...
            console.log("Token não encontrado."); 
        }

        try {
            const formatarDados = {
            ...data,
            }

            await axios.put(`http://127.0.0.1:8000/escolucas/ambiente/${id}/`, formatarDados, { //Realizando uma requisição PUT para a API
                headers: {
                    "Authorization": `Bearer ${token}`, //Incluindo o token no cabeçalho
                    "Content-Type": "application/json",
                }
            })

            alert("Ambiente atualizado com sucesso!");

            navigate("/ambienteCRUD");
        }
        catch(error) {
            console.error("Erro ao atualizar ambiente: ", error);
        }
    }

    return (
        <main className={css.container}>
            <div className={css.formulario}>
                <h1>Editar ambiente</h1>
                {/* Aqui, o formulário usa o handleSubmit para validar os dados antes de enviá-los */}
                <form className={css.dadosFormulario} onSubmit={handleSubmit(EditarAmbientePUT)}>
                    <label htmlFor="salaReservada">Sala reservada:</label> <br />
                        {/* Em cada campo, é ligado ao estado via register */}
                        {/* valueAsNumber verifica se o campo digitado pelo usuário é um número */}
                        <input type="number" name="salaReservada" id="salaReservada" {...register("salaReservada", { valueAsNumber: true })}/> <br />
                        {errors.salaReservada && <p>{errors.salaReservada.message}</p>}
                    
                        <label htmlFor="dataInicio">Data de início:</label> <br />
                        <input type="date" name="dataInicio" id="dataInicio" {...register("dataInicio")}/> <br />
                        {errors.dataInicio && <p>{errors.dataInicio.message}</p>}
                    
                        <label htmlFor="dataTermino">Data de término:</label> <br />
                        <input type="date" name="dataTermino" id="dataTermino" {...register("dataTermino")}/> <br />
                        {errors.dataInicio && <p>{errors.dateTermino.message}</p>}
                    
                        <label htmlFor="periodo">Período:</label>
                        <select className={css.escolhas} {...register("periodo")}>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select> <br />
                        {errors.periodo && <p>{errors.periodo.message}</p>}
                    
                        <label htmlFor="professorRepresentante">Professor representante (ID):</label> <br />
                        {/* valueAsNumber verifica se o campo digitado pelo usuário é um número */}
                        <input type="number" name="professorRepresentante" id="professorRepresentante" {...register("professorRepresentante", { valueAsNumber: true })}/> <br />
                        {errors.professorRepresentante && <p>{errors.professorRepresentante.message}</p>}
                    
                        <label htmlFor="disciplinaAssociada">Disciplina associada (ID):</label> <br />
                        {/* valueAsNumber verifica se o campo digitado pelo usuário é um número */}
                        <input type="number" name="disciplinaAssociada" id="disciplinaAssociada" {...register("disciplinaAssociada", { valueAsNumber: true })}/> <br />
                        {errors.disciplinaAssociada && <p>{errors.disciplinaAssociada.message}</p>}
                    
                        <div className={css.botoes}>
                            <button type="button" onClick={() => navigate("/ambienteCRUD")}>Voltar</button>
                            <button type="submit">Editar</button>
                        </div>
                </form>
            </div>
        </main>
    )
}