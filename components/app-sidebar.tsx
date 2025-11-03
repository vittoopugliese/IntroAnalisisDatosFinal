"use client"

import { NavMain } from "@/components/nav-main"
import { Calculator, Scale, History, Info, LayoutDashboard, Home, Sliders, } from "lucide-react"
import { Sidebar, SidebarContent, SidebarRail, } from "@/components/ui/sidebar"

const data = {
  navMain: [
    { title: "Inicio", url: "/", icon: Home, isActive: true, },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, },
    { title: "Calculadora", url: "/calculator", icon: Calculator, },
    { title: "Simulación", url: "/simulation", icon: Sliders, },
    { title: "Comparación", url: "/comparison", icon: Scale, },
    { title: "Historial", url: "/history", icon: History, },
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