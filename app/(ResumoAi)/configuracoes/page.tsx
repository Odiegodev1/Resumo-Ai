import { FormmUser } from "@/components/FormmUser";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";

export default async function Configuracoes() {
    const session = await auth()
    const userData =  {
        name: session?.user?.name  || "" ,
        email: session?.user?.email || "" ,
        cpf : session?.user?.cpf || "" ,
        cellphone: session?.user?.cellphone || "" ,
        image: session?.user?.image || "",
        userId: session?.user?.id || ""
    }
    console.log(userData)
    return (
        <section className="flex flex-col flex-1 max-w-2xl mx-auto items-center space-y-5  w-full p-20">
            <div>
                <Avatar className="size-40 flex">
                    <AvatarImage src={userData.image} />
                </Avatar>
            </div>

            <div className="w-full space-y-4">
              <FormmUser userData={userData} />

                
            </div>

        </section>
    )
}