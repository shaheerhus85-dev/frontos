import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function DashboardShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider>
      <div
        data-testid="dashboard-shell"
        className="flex h-dvh w-full overflow-hidden bg-background"
      >
        <aside
          data-testid="desktop-sidebar"
          className="hidden h-dvh w-[72px] shrink-0 border-r border-border bg-surface transition-[width] duration-200 md:block lg:w-60"
          aria-label="Dashboard sidebar"
        >
          <DashboardSidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main
            data-testid="dashboard-content"
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-background p-5 sm:p-6 lg:p-8"
          >
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
