'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

const ABACATE_PAY_URL = process.env.ABACATE_PAY_URL!
const ABACATE_PAY_TOKEN = process.env.ABACATE_PAY_TOKEN!

export async function createProPixPayment() {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "NOT_AUTHENTICATED" }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      plan: true,
      cellphone: true,
    },
  })

  if (!user) {
    return { error: "USER_NOT_FOUND" }
  }

  if (user.plan === "PRO") {
    return { error: "ALREADY_PRO" }
  }

  // ⚠️ AbacatePay exige dados mínimos do cliente
  const customer = {
    name: user.name ?? "122",
    email: user.email ?? "odiegodev10@gmail.com ",
    taxId: user.cpf ?? "14028415748",
    cellphone: user.cellphone ?? "22999650436",
    metadata: {
      userId: user.id, // 🔥 ESSENCIAL PARA O WEBHOOK
    },
  }

  const response = await fetch(`${ABACATE_PAY_URL}/billing/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ABACATE_PAY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [
        {
          externalId: "plan-pro",
          name: "Plano PRO",
          description: "Acesso vitalício ao plano PRO",
          price: 2990, // centavos (R$29,90)
          quantity: 1,
        },
      ],
      customer, // ✅ agora está válido
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmacao`,
      completionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmacao`,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("AbacatePay error:", errorText)
    return { error: "PAYMENT_FAILED" }
  }

  const billing = await response.json()

  await prisma.payment.create({
    data: {
      userId: user.id,
      provider: "ABACATEPAY",
      providerChargeId: billing.data.id,
      amount: billing.data.amount,
      status: "PENDING",
    },
  })

  return {
    url: billing.data.url,
  }
}
