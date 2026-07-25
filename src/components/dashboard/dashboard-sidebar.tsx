"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpenText,
  Bot,
  CalendarDays,
  Check,
  ChevronsUpDown,
  CircleHelp,
  LayoutDashboard,
  PhoneCall,
  PlugZap,
  Settings,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FrontOSLogo } from "@/components/shared/frontos-logo";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_ROUTES } from "@/config/constants";
import { cn } from "@/lib/utils";

type SidebarItem = Readonly<{
  label: string;
  icon: LucideIcon;
  href?: string;
}>;

const primaryNavigation: SidebarItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: APP_ROUTES.overview },
  { label: "Calls", icon: PhoneCall, href: APP_ROUTES.calls },
  { label: "Bookings", icon: CalendarDays, href: APP_ROUTES.bookings },
  { label: "Leads", icon: UserRoundSearch, href: APP_ROUTES.leads },
  { label: "Customers", icon: UsersRound, href: APP_ROUTES.customers },
  { label: "AI Agents", icon: Bot },
  { label: "Knowledge Base", icon: BookOpenText },
  { label: "Integrations", icon: PlugZap },
  { label: "Reports", icon: BarChart3 },
];

const utilityNavigation: SidebarItem[] = [
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: CircleHelp },
];

type DashboardSidebarProps = Readonly<{
  mode?: "desktop" | "mobile";
  onNavigate?: () => void;
  showBrand?: boolean;
}>;

function NavigationItem({
  item,
  mode,
  onNavigate,
  pathname,
}: Readonly<{
  item: SidebarItem;
  mode: "desktop" | "mobile";
  onNavigate?: () => void;
  pathname: string;
}>) {
  const active = Boolean(item.href && pathname === item.href);
  const Icon = item.icon;
  const className = cn(
    "group flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none transition-[background-color,color] duration-150 focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none",
    mode === "desktop" && "md:justify-center md:px-0 lg:justify-start lg:px-3",
    active
      ? "bg-[#edf4ff] font-semibold text-[#1f67d7]"
      : "text-[#536078] hover:bg-[#f4f6fb] hover:text-[#18233a]",
    !item.href && "cursor-not-allowed",
  );
  const content = (
    <>
      <Icon className="size-[18px] shrink-0 stroke-[1.8]" aria-hidden="true" />
      <span className={cn(mode === "desktop" && "md:sr-only lg:not-sr-only")}>
        {item.label}
      </span>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={className}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled
      aria-label={`${item.label} — coming soon`}
    >
      {content}
    </button>
  );
}

function WorkspaceSwitcher({ mode }: Readonly<{ mode: "desktop" | "mobile" }>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-[62px] w-full items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2.5 text-left shadow-[0_2px_8px_rgb(16_21_37/0.04)] transition-[border-color,background-color,box-shadow] outline-none hover:border-border-strong hover:bg-[#fbfcff] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15",
            mode === "desktop" &&
              "md:mx-auto md:size-10 md:min-h-0 md:justify-center md:p-1 lg:mx-0 lg:size-auto lg:min-h-[62px] lg:w-full lg:justify-start lg:px-3 lg:py-2.5",
          )}
          aria-label="Switch workspace. Current workspace: Acme Clinic"
        >
          <Avatar fallback="AC" size="sm" />
          <span
            className={cn(
              "min-w-0 flex-1",
              mode === "desktop" && "md:hidden lg:block",
            )}
          >
            <span className="block truncate text-sm font-semibold text-[#182136]">
              Acme Clinic
            </span>
            <span className="mt-0.5 block truncate text-[11px] font-medium text-[#7a8498]">
              Business Workspace
            </span>
          </span>
          <ChevronsUpDown
            className={cn(
              "size-4 shrink-0 stroke-[1.8] text-[#8791a4]",
              mode === "desktop" && "md:hidden lg:block",
            )}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-52"
      >
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuItem className="gap-3">
          <Avatar fallback="AC" size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold">Acme Clinic</span>
            <span className="block truncate text-xs text-muted">
              Business Workspace
            </span>
          </span>
          <Check className="size-4 text-primary" aria-hidden="true" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardSidebar({
  mode = "desktop",
  onNavigate,
  showBrand = true,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      {showBrand ? (
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center border-b border-border px-5",
            mode === "desktop" &&
              "md:justify-center md:px-0 lg:justify-start lg:px-5",
          )}
        >
          <span
            className={cn(mode === "desktop" && "md:hidden lg:inline-flex")}
          >
            <FrontOSLogo />
          </span>
          {mode === "desktop" ? (
            <span className="hidden md:inline-flex lg:hidden">
              <FrontOSLogo compact />
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn("shrink-0 px-3 py-4", mode === "desktop" && "lg:px-4")}
      >
        <WorkspaceSwitcher mode={mode} />
      </div>

      <nav
        className={cn(
          "min-h-0 flex-1 space-y-1 overflow-y-auto px-3 pb-4",
          mode === "desktop" && "lg:px-4",
        )}
        aria-label="Primary navigation"
      >
        {primaryNavigation.map((item) => (
          <NavigationItem
            key={item.label}
            item={item}
            mode={mode}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <nav
        className={cn(
          "shrink-0 space-y-1 border-t border-border px-3 py-4",
          mode === "desktop" && "lg:px-4",
        )}
        aria-label="Support navigation"
      >
        {utilityNavigation.map((item) => (
          <NavigationItem
            key={item.label}
            item={item}
            mode={mode}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}
