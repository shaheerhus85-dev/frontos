"use client";

import { Bell, CalendarDays, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { FrontOSLogo } from "@/components/shared/frontos-logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_ROUTES } from "@/config/constants";

const routeHeaders = {
  [APP_ROUTES.overview]: {
    title: "Overview",
    description: "Good morning, Alex. Here’s what’s happening today.",
  },
  [APP_ROUTES.calls]: {
    title: "Calls",
    description: "Review AI-handled conversations, outcomes, and escalations.",
  },
  [APP_ROUTES.bookings]: {
    title: "Bookings",
    description: "Manage appointments, availability, and scheduling outcomes.",
  },
  [APP_ROUTES.leads]: {
    title: "Leads",
    description:
      "Track prospects, qualification progress, and conversion opportunities.",
  },
  [APP_ROUTES.customers]: {
    title: "Customers",
    description:
      "Understand customer relationships, activity, and service history.",
  },
  [APP_ROUTES.aiAgents]: {
    title: "AI Agents",
    description:
      "Monitor agent performance, responsibilities, and operational health.",
  },
  [APP_ROUTES.knowledgeBase]: {
    title: "Knowledge Base",
    description:
      "Manage the information your AI agents use to answer and act accurately.",
  },
  [APP_ROUTES.integrations]: {
    title: "Integrations",
    description:
      "Monitor connected tools, automation activity, and operational health.",
  },
  [APP_ROUTES.reports]: {
    title: "Reports",
    description:
      "Understand performance, growth, automation, and operational outcomes.",
  },
  [APP_ROUTES.settings]: {
    title: "Settings",
    description:
      "Configure your workspace, AI behavior, notifications, and operational preferences.",
  },
} as const;

export function DashboardHeader() {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const pathname = usePathname();
  const header = routeHeaders[pathname as keyof typeof routeHeaders] ?? {
    title: "FrontOS",
    description: "Manage your business operations from one workspace.",
  };

  return (
    <header
      data-testid="dashboard-header"
      className="z-20 h-[72px] shrink-0 border-b border-border bg-surface"
    >
      <div className="flex h-full min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Sheet
          open={mobileNavigationOpen}
          onOpenChange={setMobileNavigationOpen}
        >
          <SheetTrigger asChild>
            <IconButton
              label="Open navigation"
              className="-ml-1 md:hidden"
              data-testid="mobile-navigation-trigger"
            >
              <Menu className="size-5" aria-hidden="true" />
            </IconButton>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(19rem,calc(100vw-2rem))]">
            <SheetHeader className="h-[72px] justify-center py-0">
              <FrontOSLogo />
              <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate between FrontOS dashboard workspaces.
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1">
              <DashboardSidebar
                mode="mobile"
                showBrand={false}
                onNavigate={() => setMobileNavigationOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
            {header.title}
          </h1>
          <p className="mt-0.5 hidden truncate text-xs text-secondary sm:block lg:text-[13px]">
            {header.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="secondary"
            className="hidden min-w-40 justify-start font-medium disabled:opacity-100 lg:inline-flex"
            disabled
            aria-label="Selected date range: May 12 through May 18"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            <span className="text-[#48556d]">May 12 – May 18</span>
          </Button>
          <IconButton label="Search" tooltip="Search">
            <Search className="size-5" aria-hidden="true" />
          </IconButton>
          <span className="relative">
            <IconButton label="Notifications" tooltip="Notifications">
              <Bell className="size-5" aria-hidden="true" />
            </IconButton>
            <span
              className="pointer-events-none absolute top-2 right-2 size-1.5 rounded-full bg-primary ring-2 ring-surface"
              aria-hidden="true"
            />
          </span>
          <div
            data-testid="user-avatar"
            className="ml-1 grid size-10 place-items-center"
            aria-label="User account"
          >
            <Avatar fallback="FO" status="online" />
          </div>
        </div>
      </div>
    </header>
  );
}
