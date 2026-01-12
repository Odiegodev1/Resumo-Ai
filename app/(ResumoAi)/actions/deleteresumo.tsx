"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ca } from "zod/v4/locales"

export async function deleteResumo(id: string) {

    if(!id){
        return{
            data: null,
            error: "Resumo nao encontrado"
        }
    }   
  
    try{
         const resumodelete = await prisma.summary.delete({where: {id}})
    console.log(resumodelete)
        revalidatePath("/home")        // Home
      revalidatePath("/historico")
    return{
        data: resumodelete,
        error: null
    }

    }catch(error){
        return{
            data: null,
            error: "Não foi possivel deletar o resumo"
        }
    }

  
}