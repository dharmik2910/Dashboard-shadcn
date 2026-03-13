import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function ReportsPage() {
  return (
    <SidebarProvider
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
            </div>

            <div className="flex min-h-[400px] flex-1 items-center justify-center rounded-xl border border-dashed bg-muted/50">

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
