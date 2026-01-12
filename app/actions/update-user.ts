'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { ConfigUser } from "../(abacatepay)/schema/donatioSchema"

export async function updateUser(data: ConfigUser) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      data: null,
      error: "NOT_AUTHENTICATED",
    }
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
        cpf: data.cpf,         
        email: data.email,
        cellphone: data.cellphone,
      },
    })

    revalidatePath("/")
    revalidatePath("/configuracoes")

    return {
      data: user,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      data: null,
      error: "UPDATE_FAILED",
    }
  }
}
