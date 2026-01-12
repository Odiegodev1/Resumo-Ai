"use client"
import {CalendarDays, Copy, Eye, Trash } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { DialogOpenHistorico } from "./DialogOpenHistorico";
import { useState } from "react";
import ButtonDelete from "./ButtonDelete";
interface ResumoRecente {
  id: string
  result: string
  createdAt: Date
  size: string
  style: string
  wordCount: number
}

interface CardRecentesProps {
  recentes: ResumoRecente[]
}
export function CardResumosHistoricos({ recentes }: CardRecentesProps  ) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleCopy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)

      // remove feedback depois de 2s
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Erro ao copiar", err)
    }
  }
    return (
         <div className="mt-10 space-y-5">
            {recentes.map((resumo) => (
                <Card key={resumo.id}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{resumo.size}</h1>
                        <div className="flex items-center gap-3">
                            <DialogOpenHistorico resumo={resumo} />
                            <Copy onClick={() => handleCopy(resumo.result, resumo.id)}/>
                            <ButtonDelete id={resumo.id} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="w-full max-w-200 line-clamp-3 text-zinc-400 tracking-widest">
                    <h1>{resumo.result}</h1>
                </CardContent>
                <CardFooter className="flex items-center gap-4 text-zinc-600">
                    <Badge variant="outline" className="text-sm text-zinc-600">{resumo.style}</Badge>
                    <h1 className="flex  items-center gap-2"><CalendarDays  className="size-5 mb-1"/> {new Date(resumo.createdAt).toLocaleDateString("pt-BR")}</h1>
                    <p>{resumo.wordCount} palavras     </p>
                </CardFooter>

            </Card>
            ))}

           </div>
    )
}