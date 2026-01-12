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
  })

  if (user?.plan === "PRO") {
    return { error: "ALREADY_PRO" }
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
          price: 2990,
          quantity: 1,
        },
      ],

      // 🔥 ISSO É O QUE ESTAVA FALTANDO
      customer: {
        metadata: {
          userId: session.user.id,
        },
      },

      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmacao`,
      completionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmacao`,
    }),
  })

  if (!response.ok) {
    return { error: "PAYMENT_FAILED" }
  }

  const billing = await response.json()

  // 🔒 salva como PENDING
  await prisma.payment.create({
    data: {
      userId: session.user.id,
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
