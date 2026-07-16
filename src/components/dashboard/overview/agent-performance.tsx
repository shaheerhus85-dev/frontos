import { Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { performanceMetrics } from "@/data/overview";
import { cn } from "@/lib/utils";

export function AgentPerformance({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <Card
      data-testid="ai-agent-performance"
      className={cn("h-full min-w-0", className)}
    >
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle>AI Agent Performance</CardTitle>
        <Badge variant="success">Excellent</Badge>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="min-w-0 rounded-xl bg-[#f5f7fb] p-3.5"
            >
              <p className="truncate text-xs font-medium text-[#687389]">
                {metric.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-[#151d30]">
                {metric.value}
              </p>
              {metric.progress ? (
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#dfe5ef]"
                  role="progressbar"
                  aria-label={metric.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={metric.progress}
                >
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              ) : (
                <div
                  className="mt-3 h-1.5 rounded-full bg-[#dfe5ef]"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between py-3">
        <p className="flex items-center gap-1.5 text-xs text-[#7a8498]">
          <Clock3 className="size-3.5 stroke-[1.8]" aria-hidden="true" />
          Updated today at 10:30 AM
        </p>
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="text-primary disabled:opacity-100"
        >
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
