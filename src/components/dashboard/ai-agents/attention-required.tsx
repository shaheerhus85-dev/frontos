import { ArrowRight, CircleAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { attentionItems } from "@/data/ai-agents";
import { cn } from "@/lib/utils";

const severityVariant = {
  High: "danger",
  Medium: "warning",
  Low: "info",
} as const;

export function AttentionRequired({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <Card
      className={cn("h-full min-w-0", className)}
      data-testid="attention-required"
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-[#fff7e8] text-[#bd7a18]">
            <CircleAlert className="size-4" aria-hidden="true" />
          </span>
          <div>
            <CardTitle>Attention Required</CardTitle>
            <p className="mt-1 text-xs text-muted">
              Operational issues requiring review
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {attentionItems.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-border bg-[#fafbfe] p-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-sm font-semibold text-[#303d54]">
                {item.agentName}
              </h4>
              <Badge
                variant={severityVariant[item.severity]}
                className="px-2 py-1 text-[10px]"
              >
                {item.severity}
              </Badge>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#667187]">
              {item.issue}
            </p>
            <p className="mt-2 flex gap-1.5 text-xs leading-5 font-medium text-[#4d6384]">
              <ArrowRight
                className="mt-0.5 size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              {item.recommendation}
            </p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
