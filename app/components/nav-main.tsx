

import { CogIcon, Rocket } from "lucide-react"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { Link } from "react-router"

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Trade Execution</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={"/place-trade"}>
              <Rocket />
              <span>Place Trade</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link to={"/manage-trade"}>
              <CogIcon />
              <span>Manage Trade</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
