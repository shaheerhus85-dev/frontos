import {
  CalendarCheck2,
  Clock3,
  DollarSign,
  UserRoundCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { ReportKpi } from "@/data/reports";
import { cn } from "@/lib/utils";

const icons = {
  revenue: DollarSign,
  leads: UserRoundCheck,
  bookings: CalendarCheck2,
  savings: Clock3,
} as const;

const tones = {
  blue: "bg-[#edf4ff] text-[#2878ff]",
  violet: "bg-[#f0edff] text-[#7457ff]",
  cyan: "bg-[#e9faff] text-[#159cc8]",
  mint: "bg-[#ebfaf4] text-[#168861]",
} as const;

export function ReportsKpiCard({ metric }: Readonly<{ metric: ReportKpi }>) {
  const Icon = icons[metric.id];

  return (
    <Card
      data-testid={`reports-kpi-${metric.id}`}
      className="min-w-0 p-4 sm:p-5"
      aria-label={`${metric.label}: ${metric.value}, ${metric.supportingText}`}
    >
      <div className="flex min-h-9 items-start justify-between gap-2">
        <p className="min-w-0 text-[11px] leading-4 font-semibold text-[#687389] sm:text-sm">
          {metric.label}
        </p>
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-xl sm:size-9",
            tones[metric.tone],
          )}
          aria-hidden="true"
        >
          <Icon className="size-[17px] stroke-[1.8] sm:size-[19px]" />
        </span>
      </div>
      <p className="mt-2 font-display text-xl font-semibold tracking-[-0.035em] whitespace-nowrap text-[#11182a] sm:text-[1.75rem]">
        {metric.value}
      </p>
      <p className="mt-3 text-[10px] leading-4 font-medium text-[#7d879b] sm:mt-4 sm:text-xs">
        {metric.supportingText}
      </p>
    </Card>
  );
}
