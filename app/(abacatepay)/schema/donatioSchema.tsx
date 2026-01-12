import {z} from 'zod'


export const configUser = z.object({
    name: z.string().min(1,{
        message: "O nome é obrigatório",}),
    email: z.string().min(1,{
        message: "O email é obrigatório",}),
    cpf: z.string().min(9,{
        message: "O CPF/CNPJ é obrigatório",
    }),
    cellphone: z.string().min(10,{
        message: "O telefone é obrigatório",
    }),

    
    
})

export type ConfigUser = z.infer<typeof configUser>