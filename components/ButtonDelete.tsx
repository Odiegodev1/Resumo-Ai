import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteResumo } from "@/app/(ResumoAi)/actions/deleteresumo";

export default function ButtonDelete({id}: { id: string }) {
    async function handleDelete() {
        await deleteResumo(id)
        console.log("deletado")
    }
    return (
        <Button onClick={handleDelete}>
            <Trash />
        </Button>
    )
}