import OpenAI from "openai"
import { auth } from "@/lib/auth"
import { checkSummaryLimit } from "@/lib/checkSummaryLimit"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ error: "NOT_AUTHENTICATED" }),
      { status: 401 }
    )
  }

  // 🔥 VALIDA ANTES DE QUALQUER STREAM
  const { allowed } = await checkSummaryLimit(session.user.id)

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "FREE_LIMIT_REACHED" }),
      { status: 403 }
    )
  }

  const { text, size, style } = await req.json()

  const encoder = new TextEncoder()

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: `Atue como um especialista no assunto do texto fornecido.

Produza um resumo em português com alto nível de clareza, precisão e organização, respeitando rigorosamente o conteúdo original.

Parâmetros do resumo:
- Estilo: ${style}
- Tamanho: ${size}

Regras:
- Identifique e destaque os conceitos centrais
- Priorize informações essenciais
- Remova repetições e detalhes irrelevantes
- Não inclua opiniões ou dados não presentes no texto
- Estruture o conteúdo de forma lógica e objetiva

Texto a ser resumido:
${text}

        `,
      },
    ],
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content
        if (token) {
          controller.enqueue(encoder.encode(token))
        }
      }
      controller.close()
    },
  })

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  })
}
