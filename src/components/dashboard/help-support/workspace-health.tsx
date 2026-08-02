import {
  Bot,
  BookOpenCheck,
  CheckCircle2,
  HeartPulse,
  PlugZap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HealthTone, WorkspaceHealthMetric } from "@/data/help-support";
import { cn } from "@/lib/utils";

const healthIcons = {
  platform: CheckCircle2,
  connections: PlugZap,
  "integration-health": HeartPulse,
  agents: Bot,
  knowledge: BookOpenCheck,
} as const;

const toneClasses: Record<HealthTone, string> = {
  success: "bg-[#eaf9f3] text-[#168861]",
  warning: "bg-[#fff5df] text-[#a46b13]",
  info: "bg-[#edf4ff] text-[#1f67d7]",
};

export function WorkspaceHealth({
  metrics,
}: Readonly<{ metrics: readonly WorkspaceHealthMetric[] }>) {
  return (
    <Card data-testid="workspace-health" className="min-w-0 overflow-hidden">
      <CardHeader className="border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-lg">Acme Clinic health</CardTitle>
            <span className="rounded-full border border-[#dce3ef] bg-[#f5f7fb] px-2.5 py-1 text-[11px] font-semibold text-[#667289]">
              Demo workspace
            </span>
          </div>
          <p className="mt-1 text-sm text-secondary">
            Current operational context across FrontOS.
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eaf9f3] px-2.5 py-1 text-xs font-semibold text-[#168861] sm:mt-0">
          <span
            className="size-1.5 rounded-full bg-success"
            aria-hidden="true"
          />
          Overall healthy
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-5">
        {metrics.map((metric, index) => {
          const Icon = healthIcons[metric.id as keyof typeof healthIcons];
          return (
            <div
              key={metric.id}
              className={cn(
                "flex min-w-0 flex-col items-start gap-3 rounded-xl border border-border bg-[#fafbfe] p-4 sm:col-span-1 md:col-span-2 xl:col-span-1",
                index >= 3 && "md:col-span-3 xl:col-span-1",
                index === metrics.length - 1 &&
                  "sm:col-span-2 md:col-span-3 xl:col-span-1",
              )}
            >
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl",
                  toneClasses[metric.tone],
                )}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-[#647087]">
                  {metric.label}
                </span>
                <span className="mt-1 block font-display text-xl font-semibold tracking-[-0.025em] text-[#182136]">
                  {metric.value}
                </span>
                <span className="mt-1 block text-xs leading-4 text-muted">
                  {metric.detail}
                </span>
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
