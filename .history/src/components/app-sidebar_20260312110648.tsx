"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  LayoutDashboardIcon,
  UsersIcon,
  ChartBarIcon,
  DatabaseIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  CommandIcon,
} from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter()

  const data = {
    user: {
      name: "Dharmik",
      email: "dharmik29@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Dashboard",
        icon: <LayoutDashboardIcon />,
        action: () => router.push("/dashboard"),
      },
      {
        title: "Users",
        icon: <UsersIcon />,
        action: () => router.push("/users"),
      },
      {
        title: "Reports",
        icon: <ChartBarIcon />,
        action: () => router.push("/reports"),
      },
      {
        title: "Database",
        icon: <DatabaseIcon />,
        action: () => router.push("/database"),
      },
      {
        title: "Documents",
        icon: <FileTextIcon />,
        action: () => router.push("/documents"),
      },
    ],

    navSecondary: [
      {
        title: "Settings",
        icon: <Settings2Icon />,
        action: () => router.push("/settings"),
      },
      {
        title: "Help",
        icon: <CircleHelpIcon />,
        action: () => router.push("/help"),
      },
    ],

    documents: [],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Next Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>

        <NavMain items={data.navMain} />

        <NavDocuments items={data.documents} />

        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
        />

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

    </Sidebar>
  )
}