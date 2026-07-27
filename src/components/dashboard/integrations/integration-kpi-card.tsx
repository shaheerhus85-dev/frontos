import { Activity, CheckCheck, PlugZap, Workflow } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { IntegrationKpi } from "@/data/integrations";
import { cn } from "@/lib/utils";

const icons = {
  connected: PlugZap,
  automations: Workflow,
  syncs: CheckCheck,
  health: Activity,
} as const;

const tones = {
  blue: "bg-[#edf4ff] text-[#2878ff]",
  violet: "bg-[#f0edff] text-[#7457ff]",
  cyan: "bg-[#e9faff] text-[#159cc8]",
  mint: "bg-[#ebfaf4] text-[#168861]",
} as const;

export function IntegrationKpiCard({
  metric,
  className,
}: Readonly<{ metric: IntegrationKpi; className?: string }>) {
  const Icon = icons[metric.id];
  return (
    <Card
      data-testid={`integration-kpi-${metric.id}`}
      className={cn("h-full min-w-0 p-4 sm:p-5", className)}
      aria-label={`${metric.label}: ${metric.value}, ${metric.supportingText}`}
    >
      <div className="flex min-h-10 items-start justify-between gap-2">
        <p className="min-w-0 text-xs leading-4 font-semibold text-[#687389] sm:text-sm">
          {metric.label}
        </p>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl",
            tones[metric.tone],
          )}
          aria-hidden="true"
        >
          <Icon className="size-[19px] stroke-[1.8]" />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] whitespace-nowrap text-[#11182a] sm:text-[1.75rem]">
        {metric.value}
      </p>
      <p className="mt-4 truncate text-[11px] font-medium text-[#7d879b] sm:text-xs">
        {metric.supportingText}
      </p>
    </Card>
  );
}
