import { Crown, ShoppingCart, Sparkle } from "lucide-react"
import { ComponentProps } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"



import { email } from "zod"
import { NavItems } from "./NavItems"


type AppSidebarProps = ComponentProps<typeof Sidebar>


export async function AppSidebar({...pros}: AppSidebarProps){

    return(
         <Sidebar collapsible="icon" {...pros}>
            
            <SidebarHeader className="py-4">
                  <div className="sm:hidden group-data-[state=expanded]:block">

                     <div className="w-full flex items-center max-w-[250px] mx-auto pt-3 gap-4 ">
                        <div className="size-10 rounded-md  flex items-center justify-center bg-zinc-800"><Sparkle  strokeWidth={2}  className="size-6 text-white" /></div>
                        <h1 className="text-xl font-bold">Resumo Ai</h1>
                   </div>

                 
                  </div>
                    <div className="w-full  items-center max-w-[150px] mx-auto pt-3 gap-4 hidden group-data-[state=collapsed]:block ">
                        <div className="size-8 rounded-md  flex items-center justify-center bg-zinc-800"><Sparkle  strokeWidth={2}  className="size-6 text-white" /></div>
                        
                   </div>
            </SidebarHeader>
            <SidebarContent>
               <NavItems />
            </SidebarContent>
            <SidebarFooter className="">
              //////
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}