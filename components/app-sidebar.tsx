"use client"

import { NavMain } from "@/components/nav-main"
import { Calculator, Info, Home } from "lucide-react"
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar"

const data = {
  navMain: [
    { title: "Inicio", url: "/", icon: Home, isActive: true, },
    { title: "Calculadora", url: "/calculator", icon: Calculator, },
    { title: "Acerca de", url: "/about", icon: Info, },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}