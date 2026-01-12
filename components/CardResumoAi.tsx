"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"


import { generateSummary } from "@/app/(ResumoAi)/actions/createresumo"
import { Sparkle } from "lucide-react"
import { ResumoFormData, resumoSchema } from "@/app/(ResumoAi)/schema/schemaData"

export function CardResumoAi() {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const form = useForm<ResumoFormData>({
    resolver: zodResolver(resumoSchema),
    defaultValues: {
      text: "",
      size: "medio",
      type: "academico",
    },
  })

  async function onSubmit(data: ResumoFormData) {
    setLoading(true)
    setResult("")

    try {
      // 1️⃣ CHAMADA DO STREAM
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: data.text,
          size: data.size.toUpperCase(),
          style: data.type.toUpperCase(),
        }),
      })

      // 🔥 TRATAR ERRO ANTES DO STREAM
      if (!response.ok) {
        const err = await response.json()

        if (err.error === "FREE_LIMIT_REACHED") {
          alert("⚠️ Plano gratuito permite apenas 3 resumos. Faça upgrade para PRO 🚀")
          return
        }

        if (err.error === "NOT_AUTHENTICATED") {
          alert("Você precisa estar logado")
          return
        }

        alert("Erro ao gerar resumo")
        return
      }

      // 2️⃣ STREAM
      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()
      let fullText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullText += chunk
        setResult((prev) => prev + chunk)
      }

      // 3️⃣ SALVAR NO BANCO (SERVER ACTION)
      const saveResponse = await generateSummary(
        data.text,
        data.size.toUpperCase() as any,
        data.type.toUpperCase() as any,
        fullText
      )

      if (saveResponse?.error === "FREE_LIMIT_REACHED") {
        alert("⚠️ Plano gratuito permite apenas 3 resumos")
        setResult("")
        return
      }

      if (saveResponse?.error) {
        alert("Erro ao salvar resumo")
        return
      }
    } catch (err) {
      console.error(err)
      alert("Erro inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col gap-6">

          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col gap-4 w-full">

            {/* TEXTO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Seu Texto</CardTitle>
                <CardDescription className="text-lg">
                  cole o seu texto aqui !!!
                </CardDescription>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            className="h-[280px] resize-none"
                            placeholder="cole o seu texto aqui (trabalho, estudo, etc...)"
                          />
                          <InputGroupAddon
                            align="block-end"
                            className="flex justify-end items-end p-2"
                          >
                            <InputGroupText className="text-xs text-muted-foreground">
                              ({field.value.split(/\s+/).filter(Boolean).length}) Palavras
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* CONFIGURAÇÕES */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Configurações</CardTitle>
              </CardHeader>

              <CardContent className="space-y-10">

                {/* TAMANHO */}
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <div>
                      <p>Tamanho do resumo</p>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {[
                          { value: "curto", label: "Curto", desc: "+- 50 palavras" },
                          { value: "medio", label: "Médio", desc: "+- 150 palavras" },
                          { value: "detalhado", label: "Detalhado", desc: "+- 300 palavras" },
                        ].map((opt) => (
                          <Button
                            key={opt.value}
                            type="button"
                            variant={field.value === opt.value ? "buttonfx" : "outline"}
                            className="h-20 justify-start"
                            onClick={() => field.onChange(opt.value)}
                          >
                            <div className="flex flex-col items-start gap-1">
                              <h1 className="text-xl">{opt.label}</h1>
                              <p className="text-sm">{opt.desc}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                />

                {/* TIPO */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <div>
                      <p>Tipo de resumo</p>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {[
                          { value: "academico", label: "Acadêmico", desc: "Formal e técnico" },
                          { value: "simples", label: "Simples", desc: "Fácil de entender" },
                          { value: "topicos", label: "Tópicos", desc: "Lista organizada" },
                        ].map((opt) => (
                          <Button
                            key={opt.value}
                            type="button"
                            variant={field.value === opt.value ? "buttonfx" : "outline"}
                            className="h-20 justify-start"
                            onClick={() => field.onChange(opt.value)}
                          >
                            <div className="flex flex-col items-start gap-1">
                              <h1 className="text-xl">{opt.label}</h1>
                              <p className="text-sm">{opt.desc}</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-20 text-2xl bg-black/90 text-primary font-bold"
            >
              {loading ? "Gerando..." : "Gerar Resumo"}
            </Button>
          </div>

          {/* COLUNA DIREITA — RESULTADO */}
          <div className="w-full">
            <Card className="h-full">
              <CardHeader>
                {result ? (
                  <CardTitle className="text-2xl">Resumo Ai</CardTitle>
                ) : (
                  <CardTitle className="text-2xl"><div className="flex  text-zinc-600 items-center flex-col gap-2">
                    <h1><Sparkle className="text-center size-10" /></h1>
                    <h1>Nenhum resumo gerado</h1>
                    </div></CardTitle>
                )}
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
                  {result}
                  {loading && <span className="animate-pulse">▋</span>}
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </form>
    </Form>
  )
}
