// app/actions/abacate-pay.ts
"use server";

import { redirect } from "next/navigation";

const ABACATE_PAY_URL = "https://api.abacatepay.com/api/v1/billing/create";
const ABACATE_PAY_TOKEN = process.env.ABACATE_PAY_TOKEN!;

export async function createPixPayment(formData: FormData) {
  const amount = Number(formData.get("amount"));

  if (!amount || amount < 1) {
    throw new Error("Valor inválido");
  }

  const response = await fetch(ABACATE_PAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ABACATE_PAY_TOKEN}`,
    },
    body: JSON.stringify({
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [
        {
          name: "Doação",
          description: "Apoio ao meu trabalho",
          price: amount * 100, // centavos
          quantity: 1,
        },
      ],
      returnUrl: process.env.SITE_URL,
      completionUrl: `${process.env.SITE_URL}/confirmacao`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("AbacatePay error:", error);
    throw new Error(error);
  }

  const data = await response.json();

  // 🔐 redirect seguro server-side
  redirect(data.data.url);
}
