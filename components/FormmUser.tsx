'use client'

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { configUser, ConfigUser } from "@/app/(abacatepay)/schema/donatioSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/auth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateUser } from "@/app/actions/update-user";

interface FormmUserProps {
    userData: {
          name: string;
    email: string;
    cpf: string;
    cellphone: string;
    userId: string
   
    }
}


export   function FormmUser(
    { userData}: FormmUserProps ,
    

    
) {
    
    const  form = useForm<ConfigUser>({
        resolver: zodResolver(configUser),
        defaultValues: {
            name: userData.name || ""   ,
            email: userData.email || "" ,
            cpf: userData.cpf || "" ,
            cellphone: userData.cellphone || "" ,
           
        }
    });

    async function onSubmit(data: ConfigUser) {
        console.log(data)
        const res =await updateUser(data)
        if(res.error){
            return  alert(res.error)
        }
        alert('Atualizado com sucesso')
        return
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Nome</FormLabel>
      <FormControl>
        <Input placeholder="Diego s." {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="DhI5y@example.com" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="cpf"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Cpf</FormLabel>
      <FormControl>
        <Input placeholder="000.000.000-00" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="cellphone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Telefone</FormLabel>
      <FormControl>
        <Input placeholder="(00) 00000-0000" {...field} />
      </FormControl>
     
      <FormMessage />
    </FormItem>
  )}
/>

<Button type="submit">Salvar</Button>

            </form>

        </Form>
    )
}