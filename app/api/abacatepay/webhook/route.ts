import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    if (payload.event !== "billing.paid") {
      return NextResponse.json({ ok: true })
    }

    const billing = payload.data

    const userId = billing?.customer?.metadata?.userId

    if (!userId) {
      return NextResponse.json(
        { error: "userId não encontrado" },
        { status: 400 }
      )
    }

    // 🔥 ATUALIZA PLANO
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "PRO",
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    )
  }
}
