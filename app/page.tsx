"use client"

import { motion } from "framer-motion"
import { Sparkles, FileText, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signIn } from "next-auth/react"
export default function LandingPage() {
  async function login() {
    await signIn("google", {redirectTo: "/home"})
  }
  return (
      <main className="min-h-screen bg-[#0B0B0F] text-white overflow-x-hidden relative">

      {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm mb-6">
            <Sparkles className="size-4 text-purple-400" />
            Resumos inteligentes com IA
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Transforme textos longos em
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}resumos claros em segundos
            </span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400">
            Ideal para estudantes, profissionais e criadores.
            Economize tempo e foque no que realmente importa.
          </p>

          <div className="mt-10 flex justify-center gap-4">
          
              <Button onClick={login} size="lg" className="text-lg px-8">
                Começar grátis
              </Button>
     

            <Link href="/home">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                Ver dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <Feature
            icon={<FileText />}
            title="Resumos precisos"
            desc="Texto claro, organizado e direto ao ponto."
          />
          <Feature
            icon={<Zap />}
            title="Economia de tempo"
            desc="Minutos viram segundos com nossa IA."
          />
          <Feature
            icon={<ShieldCheck />}
            title="Seguro e privado"
            desc="Seus textos nunca são compartilhados."
          />
        </motion.div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-10">
            Como funciona
          </h2>

          <div className="space-y-6 text-zinc-400">
            <p>1️⃣ Cole seu texto</p>
            <p>2️⃣ Escolha tamanho e estilo</p>
            <p>3️⃣ Receba o resumo em tempo real</p>
          </div>
        </motion.div>
      </section>

      {/* PLANOS */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
        >
          <Plan
            title="FREE"
            price="R$ 0"
            features={[
              "3 resumos",
              "Streaming em tempo real",
              "Histórico limitado",
            ]}
          />

          <Plan
            highlight
            title="PRO"
            price="R$ 19/mês"
            features={[
              "Resumos ilimitados",
              "Histórico completo",
              "Prioridade na IA",
              "Mais velocidade",
            ]}
          />
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Comece agora gratuitamente
          </h2>
          <p className="text-zinc-400 mb-10">
            Não precisa de cartão de crédito.
          </p>

          <Link href="/login">
            <Button size="lg" className="text-lg px-10">
              Criar conta
            </Button>
          </Link>
        </motion.div>
      </section>

    </main>
  )
}

/* COMPONENTES AUXILIARES */

function Feature({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-400 mt-2">{desc}</p>
    </div>
  )
}

function Plan({ title, price, features, highlight }: any) {
  return (
    <div
      className={`rounded-2xl p-8 border ${
        highlight
          ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-400"
          : "bg-white/5 border-white/10"
      }`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-3xl font-bold mt-4">{price}</p>

      <ul className="mt-6 space-y-2 text-zinc-300">
        {features.map((f: string) => (
          <li key={f}>✔️ {f}</li>
        ))}
      </ul>

      {highlight && (
        <div className="mt-6 text-sm text-purple-300">
          Mais popular 🚀
        </div>
      )}
    </div>
  )
}
