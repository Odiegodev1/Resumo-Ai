import { prisma } from "@/lib/prisma"
import { Plan } from "@/lib/generated/prisma"

export async function checkSummaryLimit(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  if (!user) {
    return { allowed: false }
  }

  if (user.plan === Plan.FREE) {
    const total = await prisma.summary.count({
      where: { userId },
    })

    if (total >= 3) {
      return { allowed: false }
    }
  }

  return { allowed: true }
}
