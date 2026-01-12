import { z } from "zod"

export const resumoSchema = z.object({
  text: z.string().min(1, {
    message: "O texto é obrigatório",
  }),

  size: z.enum(["curto", "medio", "detalhado"]),

  type: z.enum(["academico", "simples", "topicos"]),
})

export type ResumoFormData = z.infer<typeof resumoSchema>
