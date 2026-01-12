import { CardResumosHistoricos } from "@/components/CardResumosHistoricos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, CalendarDays, Copy, Eye, Filter, Trash } from "lucide-react";
import { getResumoshistoricos } from "../actions/getresummosmetricas";
import { auth } from "@/lib/auth";

export default async function Historico() {
    const session = await auth()
    const userId = session?.user?.id
    const recentes = await getResumoshistoricos({userId: userId!})
    return (
        <div className="w-full max-w-[1000] items-strat mx-auto flex flex-col justify-center gap-4">
           <div>
            <h1 className="text-4xl font-bold">Histórico</h1>
            <p className="text-zinc-500">Todos os seus resumos gerados anteriormente</p>
           </div>

           <div className="w-full flex gap-2 mt-10">
            <Input className="w-full h-14" placeholder="Buscar resuos...."/>
            <Button className="h-14"><Filter /> Filtros</Button>
           </div>

          <CardResumosHistoricos recentes={recentes} />
        </div>
    );
}