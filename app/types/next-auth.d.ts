import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      cpf?: string
      cellphone?: string
      plan?: "FREE" | "PRO"
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    cpf?: string
    cellphone?: string
    plan?: "FREE" | "PRO"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    cpf?: string
    cellphone?: string
    plan?: "FREE" | "PRO"
  }
}
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      cpf?: string
      cellphone?: string
      plan?: "FREE" | "PRO"
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    cpf?: string
    cellphone?: string
    plan?: "FREE" | "PRO"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    cpf?: string
    cellphone?: string
    plan?: "FREE" | "PRO"
  }
}
