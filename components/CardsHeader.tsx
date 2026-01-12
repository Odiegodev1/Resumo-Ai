import { FileChartColumn, FileType, Timer } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface dashboaarProps {
    totalwords: number
    totalTimeSaved: number
    totalresumo: number
}
export function CardsHeader({totalTimeSaved,totalwords,totalresumo}:dashboaarProps  ) {
    return (
       <div className="grid grid-cols-3 gap-5 w-full items-center">
        <Card className="p-4 w-full h-25 justify-center border border-emerald-500 shadow-xl  shadow-emerald-400/20" >
            <CardContent className="flex items-center gap-5">
                <div className="size-15 bg-emerald-500/20 border border-emerald-400 rounded-md items-center flex justify-center">
                    <FileChartColumn className="size-10 text-emerald-500" />
                </div>
                  <div className="flex flex-col items-start">
                    <CardDescription className="text-lg">Resumo  criados</CardDescription>
                    <CardTitle className="text-4xl">{totalresumo }   </CardTitle>
                  </div>
            </CardContent>
        </Card>

           <Card className="p-4 w-full h-25 justify-center border border-emerald-500 shadow-xl  shadow-emerald-400/20" >
            <CardContent className="flex items-center gap-5">
                <div className="size-15 bg-blue-500/20 border border-blue-400 rounded-md items-center flex justify-center">
                    <Timer className="size-10 text-blue-500" />
                </div>
                  <div className="flex flex-col items-start">
                    <CardDescription className="text-lg">Tempo economizado</CardDescription>
                    <CardTitle className="text-4xl">{totalTimeSaved} min</CardTitle>
                  </div>
            </CardContent>
        </Card>

           <Card className="p-4 w-full h-25 justify-center border border-emerald-500 shadow-xl  shadow-emerald-400/20" >
            <CardContent className="flex items-center gap-5">
                <div className="size-15 bg-orange-500/20 border border-orange-400 rounded-md items-center flex justify-center">
                    <FileType className="size-10 text-orange-500" />
                </div>
                  <div className="flex flex-col items-start">
                    <CardDescription className="text-lg">Palavras processadas</CardDescription>
                    <CardTitle className="text-4xl">{totalwords.toLocaleString('pt-BR')}</CardTitle>
                  </div>
            </CardContent>
        </Card>


       </div>
    );
}