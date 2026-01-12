import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Badge } from "./ui/badge";
interface ResumoRecente {
  id: string
  result: string
  createdAt: Date
  size: string
  style: string
  wordCount: number
}

interface DialogOpenHistoricoProps {
  resumo: ResumoRecente
}

export function DialogOpenHistorico({resumo}: DialogOpenHistoricoProps) {
    return(
  
         <Dialog >
            <DialogTrigger asChild>
                <Eye className="cursor-pointer hover:text-zinc-500" />
            </DialogTrigger>
            <DialogContent className="w-screen rounded-none">
                <DialogHeader>
                    <DialogTitle>{resumo.size}</DialogTitle>
                    <DialogDescription><Badge variant="outline">{resumo.style}</Badge></DialogDescription>
                </DialogHeader>
                
                    <h1 className="whitespace-pre-wrap text-zinc-400 leading-relaxed animate-in fade-in duration-300" >{resumo.result}</h1>
            
            </DialogContent>
            <DialogFooter>
                
            </DialogFooter>
        </Dialog>
      
    )
}