import { Activity } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { operationalMetrics } from "@/data/reports";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-primary",
  violet: "bg-violet",
  cyan: "bg-cyan",
  mint: "bg-success",
  amber: "bg-warning",
} as const;

export function OperationalEfficiency() {
  return (
    <Card
      data-testid="operational-efficiency"
      className="col-span-12 min-w-0 xl:col-span-7"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-4 text-primary" aria-hidden="true" />
          Operational efficiency
        </CardTitle>
        <p className="text-sm text-secondary">
          Automation quality and service operations at a glance.
        </p>
      </CardHeader>
      <div className="grid grid-cols-1 divide-y divide-border p-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:p-6">
        <div className="space-y-1 sm:pr-6">
          {operationalMetrics.slice(0, 3).map((metric) => (
            <MetricRow key={metric.id} metric={metric} />
          ))}
        </div>
        <div className="space-y-1 sm:pl-6">
          {operationalMetrics.slice(3).map((metric) => (
            <MetricRow key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function MetricRow({
  metric,
}: Readonly<{ metric: (typeof operationalMetrics)[number] }>) {
  return (
    <div className="py-3.5 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#344057]">{metric.label}</p>
          <p className="mt-0.5 text-[11px] text-muted">{metric.detail}</p>
        </div>
        <p className="shrink-0 font-display text-lg font-semibold tracking-tight text-[#11182a]">
          {metric.value}
        </p>
      </div>
      {metric.progress !== undefined ? (
        <div
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#edf0f6]"
          role="progressbar"
          aria-label={metric.label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={metric.progress}
        >
          <div
            className={cn("h-full rounded-full", tones[metric.tone])}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
