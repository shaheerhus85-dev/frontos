import { Activity, Info, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupportActivityItem } from "@/data/help-support";
import { cn } from "@/lib/utils";

const dotClasses = {
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-primary",
} as const;

export function SupportActivity({
  items,
}: Readonly<{ items: readonly SupportActivityItem[] }>) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="size-5 text-primary" aria-hidden="true" />
          Recent support activity
        </CardTitle>
        <p className="text-sm text-secondary">
          Workspace guidance and recent support actions.
        </p>
      </CardHeader>
      <CardContent>
        <ol>
          {items.map((item, index) => (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {index < items.length - 1 ? (
                <span
                  className="absolute top-3 bottom-0 left-[5px] w-px bg-border"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={cn(
                  "relative mt-1.5 size-3 shrink-0 rounded-full border-2 border-surface",
                  dotClasses[item.tone],
                )}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#344057]">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[13px] leading-5 text-secondary">
                  {item.detail}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {item.time}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export function SupportGuidance() {
  return (
    <aside className="rounded-2xl border border-[#d9e4f5] bg-[#f7f9fd] p-5">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold text-[#27334a]">
        <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
        Escalation guidance
      </h2>
      <div className="mt-3 flex items-start gap-2.5 text-[13px] leading-5 text-[#526078]">
        <Info
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        <p>
          Support actions in this demo workspace are provided for product
          evaluation only. FrontOS does not provide emergency, legal, medical,
          payment, or compliance support. Escalate critical real-world
          operational issues through your organization&apos;s approved human
          process.
        </p>
      </div>
    </aside>
  );
}
