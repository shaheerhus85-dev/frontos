import { ArrowDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { funnelStages } from "@/data/reports";

export function ConversionFunnel() {
  return (
    <Card
      data-testid="conversion-funnel"
      className="col-span-12 min-w-0 xl:col-span-5"
    >
      <CardHeader>
        <CardTitle>Conversion funnel</CardTitle>
        <p className="text-sm text-secondary">
          Progress from first inquiry to repeat business.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {funnelStages.map((stage, index) => (
          <div key={stage.id} data-testid={`funnel-stage-${stage.id}`}>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#344057]">
                  {stage.label}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {index === 0
                    ? "Funnel entry"
                    : `${stage.previousStageRate}% from previous stage`}
                </p>
              </div>
              <p className="font-display text-lg font-semibold tracking-tight text-[#11182a]">
                {stage.count.toLocaleString("en-US")}
              </p>
            </div>
            <div
              className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#edf0f6]"
              role="progressbar"
              aria-label={`${stage.label}: ${stage.previousStageRate}% from previous stage`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={stage.previousStageRate}
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${stage.previousStageRate}%`,
                  opacity: 1 - index * 0.1,
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-3 rounded-xl border border-[#dbe7fb] bg-[#f5f8ff] p-3.5 text-xs leading-5 text-[#465673]">
          <ArrowDown
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            <span className="font-semibold text-[#244f91]">
              Largest opportunity:
            </span>{" "}
            Improve the transition between inbound inquiry and qualification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
