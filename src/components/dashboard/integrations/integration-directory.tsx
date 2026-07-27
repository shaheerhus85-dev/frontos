"use client";

import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Cloud,
  CreditCard,
  Headphones,
  MessageSquareText,
  RefreshCw,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";

import {
  IntegrationHealthBadge,
  IntegrationStatusBadge,
} from "@/components/dashboard/integrations/integration-badges";
import type {
  IntegrationCategory,
  IntegrationRecord,
} from "@/data/integrations";

const categoryIcons = {
  Communication: MessageSquareText,
  CRM: UsersRound,
  Calendar: CalendarDays,
  Payments: CreditCard,
  Automation: Workflow,
  Storage: Cloud,
  Analytics: BarChart3,
  Support: Headphones,
} satisfies Record<IntegrationCategory, typeof Zap>;

const categoryTones = {
  Communication: "bg-[#edf4ff] text-[#2878ff]",
  CRM: "bg-[#f0edff] text-[#7457ff]",
  Calendar: "bg-[#e9faff] text-[#159cc8]",
  Payments: "bg-[#fff7e8] text-[#b87817]",
  Automation: "bg-[#f8edff] text-[#a447d2]",
  Storage: "bg-[#eef7ff] text-[#2d7aa9]",
  Analytics: "bg-[#ebfaf4] text-[#168861]",
  Support: "bg-[#fff0f2] text-[#c53c51]",
} satisfies Record<IntegrationCategory, string>;

export function IntegrationDirectory({
  integrations,
  onSelect,
}: Readonly<{
  integrations: readonly IntegrationRecord[];
  onSelect: (integration: IntegrationRecord) => void;
}>) {
  if (!integrations.length) {
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold">
            No integrations found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try another name, category, status, or health filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul
      className="grid grid-cols-1 gap-3 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-4 xl:p-6"
      aria-label="Integration directory"
      data-testid="integration-directory"
    >
      {integrations.map((integration) => {
        const Icon = categoryIcons[integration.category];
        return (
          <li key={integration.id} className="min-w-0">
            <button
              type="button"
              onClick={() => onSelect(integration)}
              className="group flex h-full min-h-72 w-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-4 text-left shadow-[0_4px_16px_rgb(16_21_37/0.035)] transition-[border-color,box-shadow,transform] outline-none hover:-translate-y-0.5 hover:border-[#ccd6e8] hover:shadow-[0_10px_24px_rgb(16_21_37/0.07)] focus-visible:ring-3 focus-visible:ring-primary/20 sm:p-5"
              aria-label={`View integration details for ${integration.name}`}
              aria-haspopup="dialog"
              data-testid={`integration-card-${integration.id}`}
            >
              <span className="flex w-full min-w-0 items-start gap-3">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-2xl ${categoryTones[integration.category]}`}
                  aria-hidden="true"
                >
                  <Icon className="size-5 stroke-[1.8]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate font-display text-base font-semibold text-[#182136]">
                        {integration.name}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-muted">
                        {integration.category}
                      </span>
                    </span>
                    <ChevronRight
                      className="mt-1 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </span>

              <span className="mt-4 flex min-h-6 flex-wrap gap-2">
                <IntegrationStatusBadge status={integration.status} />
                <IntegrationHealthBadge health={integration.health} />
              </span>

              <span className="mt-4 block min-h-10 text-sm leading-5 text-[#5c687e]">
                {integration.purpose}
              </span>

              <span className="mt-4 grid w-full grid-cols-2 gap-2">
                <span className="rounded-xl bg-[#f6f8fc] p-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.03em] text-muted uppercase">
                    <RefreshCw className="size-3.5" aria-hidden="true" />
                    Last sync
                  </span>
                  <span className="mt-1.5 block truncate text-sm font-semibold text-[#344057]">
                    {integration.lastSync}
                  </span>
                </span>
                <span className="rounded-xl bg-[#f6f8fc] p-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.03em] text-muted uppercase">
                    <Zap className="size-3.5" aria-hidden="true" />
                    Automations
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-[#344057]">
                    {integration.automationCount}
                  </span>
                </span>
              </span>

              <span className="mt-auto flex w-full items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted">
                <span>
                  {integration.successfulSyncs.toLocaleString("en-US")}{" "}
                  successful syncs
                </span>
                <span className="font-semibold text-primary">View details</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
