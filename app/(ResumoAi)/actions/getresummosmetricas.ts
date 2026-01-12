"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"


export async function getResummosMetricas({userId}: {userId: string}) {
   
   const stats = await prisma.summary.aggregate({
     where: { userId: userId},
     _sum: {
       wordCount: true,
       timeSavedSec: true,
     },
   })

   const totalSummaries = await prisma.summary.count({
  where: { userId },
})


   return {...stats, totalSummaries}
   
}



export async function getResumosRecentes({userId}: {userId: string}) {


  const recentes = await prisma.summary.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      id: true,
      result: true,
      createdAt: true,
      size: true,
      style: true,
      wordCount: true,
    },
  })

  return recentes
}

export async function getResumoshistoricos({userId}: {userId: string}) {


  const recentes = await prisma.summary.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      result: true,
      createdAt: true,
      size: true,
      style: true,
      wordCount: true,
    },
  })

  return recentes
}