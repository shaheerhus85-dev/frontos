import {
  CalendarDays,
  DollarSign,
  Phone,
  TrendingUp,
  UserRoundPlus,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { KpiMetric } from "@/data/overview";
import { cn } from "@/lib/utils";

const icons = {
  phone: Phone,
  calendar: CalendarDays,
  users: UserRoundPlus,
  revenue: DollarSign,
} as const;

const tones = {
  blue: "bg-[#edf4ff] text-[#2878ff]",
  cyan: "bg-[#e9faff] text-[#159cc8]",
  violet: "bg-[#f0edff] text-[#7457ff]",
  pink: "bg-[#faefff] text-[#b34fe8]",
} as const;

type KpiCardProps = Readonly<{
  className?: string;
  metric: KpiMetric;
}>;

export function KpiCard({ className, metric }: KpiCardProps) {
  const Icon = icons[metric.icon];

  return (
    <Card
      data-testid={`kpi-card-${metric.id}`}
      className={cn("h-full min-w-0 p-4 sm:p-5", className)}
      aria-label={`${metric.label}: ${metric.value}, up ${metric.change} versus last week`}
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
      <p className="mt-4 flex min-w-0 items-center gap-1 text-[11px] sm:text-xs">
        <span className="inline-flex shrink-0 items-center gap-0.5 font-semibold text-[#14845d]">
          <TrendingUp className="size-3.5 stroke-2" aria-hidden="true" />
          {metric.change}
        </span>
        <span className="truncate text-[#8a93a5]">vs last week</span>
      </p>
    </Card>
  );
}
