import {
  CalendarCheck2,
  Cog,
  DollarSign,
  FolderOpenDot,
  HistoryIcon,
  HomeIcon,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

type NavItem = {
  label: string
  path: string
  icon: React.ElementType
}

export function NavItems() {
  const navItems: NavItem[] = [
    {
      label: "Home",
      path: "/home",
      icon: HomeIcon,
    },
    {
      label: "Historico",
      path: "/historico",
      icon: HistoryIcon,
    },
    {
      label: "Planos",
      path: "/planos",
      icon: DollarSign,
    },
    {
      label: "Configurações",
      path: "/configuracoes",
      icon: Cog,
    },
  ]

  const topItems = navItems.slice(0, 2)   // primeiros 2
  const bottomItems = navItems.slice(2)   // últimos 2

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => (
      <SidebarMenuItem key={item.label}>
        <SidebarMenuButton asChild tooltip={item.label}>
          <Link href={item.path}>
            <item.icon className="size-6 group-data-[collapsible=icon]:text-zinc-700 hover:text-zinc-800 transition-all" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* 🔼 Itens de cima */}
        {renderNavItems(topItems)}

        <Separator className="my-2" />

        {/* 🔽 Itens de baixo */}
        {renderNavItems(bottomItems)}
      </SidebarMenu>
    </SidebarGroup>
  )
}
