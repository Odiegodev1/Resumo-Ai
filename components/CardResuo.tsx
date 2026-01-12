import { Sparkle } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function Resumo(){
    return(
        <Card className="mt-4 flex-1 ">
            <CardContent  className="h-60" >
                <div className="flex items-center w-full justify-center gap-2">
                    <h1 className="flex items-center gap-2 text-2xl text-primary/80 ">Seu Resumo vai aqui <Sparkle strokeWidth={2}  className="size-6 text-white" /></h1>
                </div>
            </CardContent>

        </Card>
    )
}