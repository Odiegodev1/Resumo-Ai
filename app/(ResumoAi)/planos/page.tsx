"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createProPixPayment } from "@/app/(abacatepay)/actions/abacate-pay"

export default function UpgradePage() {
  async function handleUpgrade() {
    const res = await createProPixPayment()

    if (res?.error === "ALREADY_PRO") {
      alert("Você já é PRO 🚀")
      return
    }

    if (res?.error) {
      alert("Erro ao iniciar pagamento")
      return
    }

    if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Plano PRO vitalício
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Leve seus resumos para outro nível
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Desbloqueie resumos ilimitados, mais velocidade e produtividade.
            Pagamento único via PIX. Sem mensalidade.
          </p>
        </motion.div>

        {/* CARD PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <Card className="relative w-full max-w-xl border border-white/10 bg-zinc-900/80 backdrop-blur p-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-1 text-sm font-semibold">
              Mais popular
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Zap className="text-purple-400" />
                  Plano PRO
                </h2>
                <p className="text-zinc-400 mt-1">
                  Acesso vitalício
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold">R$ 29,90</span>
                <span className="text-zinc-400 mb-1">pagamento único</span>
              </div>

              <ul className="space-y-3 text-zinc-300">
                {[
                  "Resumos ilimitados",
                  "Sem limite diário",
                  "Prioridade no processamento",
                  "Histórico completo",
                  "Acesso vitalício",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="text-green-400 h-5 w-5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleUpgrade}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Virar PRO agora 🚀
              </Button>

              <p className="text-center text-xs text-zinc-500">
                Pagamento seguro via PIX • Ativação automática
              </p>
            </div>
          </Card>
        </motion.div>

        {/* COMPARAÇÃO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid md:grid-cols-2 gap-8"
        >
          <Card className="p-6 bg-zinc-900/60 border-white/10">
            <h3 className="text-xl font-semibold mb-4">FREE</h3>
            <ul className="space-y-2 text-zinc-400">
              <li>❌ Apenas 3 resumos</li>
              <li>❌ Limite diário</li>
              <li>❌ Histórico limitado</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <h3 className="text-xl font-semibold mb-4">PRO</h3>
            <ul className="space-y-2 text-white">
              <li>✅ Resumos ilimitados</li>
              <li>✅ Sem limites</li>
              <li>✅ Histórico completo</li>
              <li>✅ Acesso vitalício</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
