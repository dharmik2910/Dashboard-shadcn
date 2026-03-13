import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DatabasePage() {
  return (
    <SidebarProvider
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Database  </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
