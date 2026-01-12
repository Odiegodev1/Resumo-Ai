import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const payload = await req.json()

  console.log("🔥 WEBHOOK RECEBIDO:", payload)

  const chargeId = payload?.data?.id
  const status = payload?.data?.status

  if (!chargeId || !status) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (status === "PAID") {
    const payment = await prisma.payment.update({
      where: { providerChargeId: chargeId },
      data: { status: "PAID" },
    })

    await prisma.user.update({
      where: { id: payment.userId },
      data: { plan: "PRO" },
    })
  }

  return NextResponse.json({ ok: true })
}
