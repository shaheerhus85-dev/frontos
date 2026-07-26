import { ListChecks } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AIAgent } from "@/data/ai-agents";
import { cn } from "@/lib/utils";

const barColors = [
  "bg-primary",
  "bg-violet",
  "bg-[#24a9d4]",
  "bg-[#9a64df]",
  "bg-[#20a878]",
  "bg-[#71809a]",
] as const;

export function WorkloadDistribution({
  agents,
  className,
}: Readonly<{ agents: readonly AIAgent[]; className?: string }>) {
  const total = agents.reduce((sum, agent) => sum + agent.tasksHandled, 0);

  return (
    <Card
      className={cn("min-w-0", className)}
      data-testid="workload-distribution"
    >
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-[#f0edff] text-violet">
            <ListChecks className="size-4" aria-hidden="true" />
          </span>
          <div>
            <CardTitle>Workload Distribution</CardTitle>
            <p className="mt-1 text-xs text-muted">
              Share of {total.toLocaleString("en-US")} completed tasks
            </p>
          </div>
        </div>
        <p className="text-xs font-semibold text-[#536078]">
          Team total · 100%
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 pt-4 md:grid-cols-2">
        {agents.map((agent, index) => {
          const percentage = (agent.tasksHandled / total) * 100;

          return (
            <div key={agent.id}>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate font-semibold text-[#455168]">
                  {agent.name}
                </span>
                <span className="shrink-0 font-medium text-muted">
                  {agent.tasksHandled} · {percentage.toFixed(1)}%
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8ecf4]"
                role="progressbar"
                aria-label={`${agent.name} workload share`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Number(percentage.toFixed(1))}
              >
                <div
                  className={`h-full rounded-full ${barColors[index]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
