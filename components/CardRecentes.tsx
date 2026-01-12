import { FileText, Timer } from "lucide-react";
import { Card, CardContent } from "./ui/card";


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

export function CardRecentes({ recentes }: CardRecentesProps) {
  if (recentes.length === 0){
    return  
  }
    
    return(
          <div className="space-y-4">
                   <h1 className="text-xl font-semibold">Resumos Recentes</h1>
                <Card>

                   <CardContent className="space-y-3">
        {recentes.map((resumo) => (
          <div
            key={resumo.id}
            className="flex items-start gap-3 border rounded-lg p-3"
          >
            <FileText className="size-6  mt-1 text-muted-foreground" />

            <div className="flex flex-col w-full max-w-80">
                <h1>{resumo.size}</h1>
              <p className="text-sm line-clamp-2 text-zinc-500">
                {resumo.result}
            
              </p>

              <span className="text-xs text-muted-foreground">
                {new Date(resumo.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
                    
                </Card>

                          
               </div>
    )
}