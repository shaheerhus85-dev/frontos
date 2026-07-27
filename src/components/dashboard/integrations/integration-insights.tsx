import { Activity, AlertTriangle, Workflow } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  integrationAttention,
  integrationHealthOverview,
  workflowDistribution,
} from "@/data/integrations";

export function IntegrationInsights() {
  return (
    <section
      className="col-span-12 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3 xl:gap-6"
      aria-label="Integration insights"
      data-testid="integration-insights"
    >
      <Card data-testid="integration-health-overview">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-4 text-primary" aria-hidden="true" />
            Integration health
          </CardTitle>
          <p className="text-sm text-secondary">
            Current connection quality across the directory.
          </p>
        </CardHeader>
        <div className="space-y-4 p-5 sm:p-6">
          {integrationHealthOverview.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#526078]">{item.label}</span>
                <span className="font-semibold text-[#344057]">
                  {item.count}
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8edf5]"
                role="progressbar"
                aria-label={`${item.label} integrations`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.value}
              >
                <div
                  className={`h-full rounded-full ${item.tone}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card data-testid="workflow-distribution">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="size-4 text-violet" aria-hidden="true" />
            Automation usage
          </CardTitle>
          <p className="text-sm text-secondary">
            Active workflows grouped by operating purpose.
          </p>
        </CardHeader>
        <div className="space-y-4 p-5 sm:p-6">
          {workflowDistribution.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#526078]">{item.label}</span>
                <span className="font-semibold text-[#344057]">
                  {item.count} workflows
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8edf5]"
                role="progressbar"
                aria-label={`${item.label} workflow share`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.value}
              >
                <div
                  className="h-full rounded-full bg-violet"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        className="lg:col-span-2 xl:col-span-1"
        data-testid="integration-attention"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-warning" aria-hidden="true" />
            Attention required
          </CardTitle>
          <p className="text-sm text-secondary">
            Connections that benefit from a focused review.
          </p>
        </CardHeader>
        <ul className="divide-y divide-border px-5 pb-3 sm:px-6">
          {integrationAttention.map((item) => (
            <li key={item.name} className="flex items-center gap-3 py-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fff7e8] text-warning">
                <AlertTriangle className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-[#27334a]">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-xs text-secondary">
                  {item.issue}
                </span>
              </span>
              <span className="text-[11px] font-semibold text-[#9b671a]">
                {item.severity}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
