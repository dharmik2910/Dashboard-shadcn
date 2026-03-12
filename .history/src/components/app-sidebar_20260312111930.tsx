"use client"

import * as React from "react"
import {
  ChartBarIcon,
  CommandIcon,
  DatabaseIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

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

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
}

const data: {
  user: { name: string; email: string }
  navMain: NavItem[]
  navSecondary: NavItem[]
  documents: any[]
} = {
  user: {
    name: "Dharmik",
    email: "dharmik29@gmail.com",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: ChartBarIcon,
    },
    {
      title: "Database",
      url: "/database",
      icon: DatabaseIcon,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2Icon,
    },
  ],

  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <a href="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Next.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

    </Sidebar>
  )
}







// "use client"

// import { NavDocuments } from "@/components/nav-documents"
// import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { ChartBarIcon, CommandIcon, DatabaseIcon, LayoutDashboardIcon, Settings2Icon, UsersIcon } from "lucide-react"
// import * as React from "react"

// const data = {
//   user: {
//     name: "Dharmik",
//     email: "dharmik29@gmail.com",
//     },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: (
//         <LayoutDashboardIcon
//         />
//       ),
//     },
//     {
//       title: "Users",
//       url: "/users",
//       icon: UsersIcon,
//     },
//     {
//       title: "Reports",
//       url: "/reports",
//       icon: ChartBarIcon,
//     },
//     {
//       title: "Database",
//       url: "/database",
//       icon: DatabaseIcon,
//     },
//   ],

//   navSecondary: [
//     {
//       title: "Settings",
//       url: "#",
//       icon: (
//         <Settings2Icon
//         />
//       ),
//     },
//   ],
//   documents: [
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:p-1.5!"
//             >
//               <a href="#">
//                 <CommandIcon className="size-5!" />
//                 <span className="text-base font-semibold">Next.</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
