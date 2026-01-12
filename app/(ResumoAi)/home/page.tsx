import { CardRecentes } from "@/components/CardRecentes";
import { CardResumoAi } from "@/components/CardResumoAi";
import Resumo from "@/components/CardResuo";
import { CardsHeader } from "@/components/CardsHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { File, FileText, Lightbulb, Timer } from "lucide-react";
import { getResummosMetricas, getResumosRecentes } from "../actions/getresummosmetricas";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export  default async function Home() {
   const session = await auth()
   const userId = session?.user?.id
   const status = await getResummosMetricas({userId: userId!})
   const recentes = await getResumosRecentes({userId: userId!})
  console.log(recentes)
   const datastatus = {
      wordCount: status._sum.wordCount ?? 0,
      timeSavedSec: status._sum.timeSavedSec ?? 0,
      totalresumo: status.totalSummaries ,
   }
   console.log(datastatus)
    return (
       <section className="flex  mx-auto items-start   flex-col w-full max-w-[1700px]">

          <h1 className="text-3xl flex items-center gap-4  font-bold">Seja bem vindo,  <Avatar><AvatarImage src={session?.user?.image!} /></Avatar></h1>
          <div className="flex w-full mt-8">
             <CardsHeader totalresumo={datastatus.totalresumo} totalTimeSaved={datastatus.timeSavedSec} totalwords={datastatus.wordCount}  />
          </div>
         <div className="w-full  flex gap-6">
             <div className="flex flex-1 flex-col     gap-4 ">
             <CardResumoAi />
        
             
          </div>

          <div className="w-full max-w-[550px]  mt-4">

            <div className="flex flex-col space-y-4">
             <CardRecentes recentes={recentes}   />

               <div>
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2 text-lg text-white"><Lightbulb /> <h1> Ideias do dia</h1></div>
                     </CardHeader>
                     <CardContent>
                        <CardDescription>
                           Use o modo "Tópicos" para criar resumos em bullet points, perfeitos para revisão rápida antes de provas!
                        </CardDescription>
                     </CardContent>
                  </Card>
               </div>
            </div>

          </div>

        
         
         </div>
          
          
       </section>
    )
}