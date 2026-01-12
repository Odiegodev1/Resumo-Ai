"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SummarySize, SummaryStyle, Plan } from "@/lib/generated/prisma"
import { revalidatePath } from "next/cache"

interface GenerateSummaryResult {
  data: any | null
  error: string | null
}

export async function generateSummary(
  text: string,
  size: SummarySize,
  style: SummaryStyle,
  result: string
): Promise<GenerateSummaryResult> {
  const session = await auth()

  if (!session?.user?.id) {
    return { data: null, error: "NOT_AUTHENTICATED" }
  }

  const userId = session.user.id

  // 🔎 Buscar plano
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  if (!user) {
    return { data: null, error: "USER_NOT_FOUND" }
  }

  // 🆓 Limite FREE
  if (user.plan === Plan.FREE) {
    const totalSummaries = await prisma.summary.count({
      where: { userId },
    })

    if (totalSummaries >= 3) {
      return { data: null, error: "FREE_LIMIT_REACHED" }
    }
  }

  // 📊 Métricas
  const wordCount = text.split(/\s+/).length
  const summaryCount = result.split(/\s+/).length
  const timeSavedSec = Math.max(
    Math.round(((wordCount - summaryCount) / 200) * 60),
    0
  )

  // 💾 Salvar
  const resumo = await prisma.summary.create({
    data: {
      userId,
      original: text,
      result,
      size,
      style,
      wordCount,
      summaryCount,
      timeSavedSec,
    },
  })

  // 🔄 Atualizar páginas
  revalidatePath("/")
  revalidatePath("/home")

  return {
    data: resumo,
    error: null,
  }
}
