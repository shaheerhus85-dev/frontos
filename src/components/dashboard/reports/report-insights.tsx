import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { businessInsights } from "@/data/reports";
import { cn } from "@/lib/utils";

const presentation = {
  green: {
    icon: TrendingUp,
    iconClass: "bg-[#ebfaf4] text-[#168861]",
    labelClass: "text-[#168861]",
  },
  blue: {
    icon: Lightbulb,
    iconClass: "bg-[#edf4ff] text-[#2878ff]",
    labelClass: "text-[#1f67d7]",
  },
  amber: {
    icon: AlertTriangle,
    iconClass: "bg-[#fff7e8] text-[#b87818]",
    labelClass: "text-[#a66b12]",
  },
} as const;

export function ReportInsights() {
  return (
    <Card
      data-testid="report-insights"
      className="col-span-12 min-w-0 xl:col-span-5"
    >
      <CardHeader>
        <CardTitle>Key insights</CardTitle>
        <p className="text-sm text-secondary">
          Focused signals from the current reporting period.
        </p>
      </CardHeader>
      <ul className="divide-y divide-border px-5 pb-3 sm:px-6">
        {businessInsights.map((insight) => {
          const {
            icon: Icon,
            iconClass,
            labelClass,
          } = presentation[insight.tone];
          return (
            <li key={insight.id} className="flex gap-3 py-4">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl",
                  iconClass,
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[11px] font-semibold tracking-[0.03em] uppercase",
                    labelClass,
                  )}
                >
                  {insight.type}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#59657b]">
                  {insight.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
