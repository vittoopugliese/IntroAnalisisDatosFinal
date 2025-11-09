"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, } from "@/components/ui/sidebar"

interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}

export function NavMain({ items, }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="flex flex-col justify-between h-full">
      <div>
      <SidebarGroupLabel>
        <p className="text-sm font-bold">Materia Análisis de Datos</p>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
          
          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible" >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={isActive} asChild={!item.items} className="p-5 mt-2 transition-all duration-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground hover:shadow-sm focus:shadow-sm hover:scale-102 active:scale-98">
                    {item.items ? (
                      <div>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-100 group-data-[state=open]/collapsible:rotate-90" />
                      </div>
                    ) : (
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isSubActive} >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
      </div>
      <SidebarGroupLabel>
        <div>
          <p className="text-xs text-muted-foreground">2025 - UTN</p>
          <p className="text-sm text-muted-foreground">Realizado por Vittorio Pugliese</p>
        </div>
      </SidebarGroupLabel>
    </SidebarGroup>
  )
}

