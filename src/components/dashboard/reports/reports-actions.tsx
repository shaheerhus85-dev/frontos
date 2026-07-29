"use client";

import { CalendarPlus, CheckCircle2, Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Action = "export" | "schedule";

const messages: Record<Action, string> = {
  export: "Report export was prepared in this local preview.",
  schedule: "Weekly report scheduling was enabled in this local preview.",
};

export function ReportsActions() {
  const [feedback, setFeedback] = useState<string | null>(null);
  return (
    <div className="flex min-w-0 flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setFeedback(messages.export)}
        >
          <Download className="size-4" aria-hidden="true" />
          Export report
        </Button>
        <Button size="sm" onClick={() => setFeedback(messages.schedule)}>
          <CalendarPlus className="size-4" aria-hidden="true" />
          Schedule report
        </Button>
      </div>
      <p
        data-testid="reports-action-feedback"
        className="min-h-5 max-w-md text-left text-xs font-medium text-[#526078] sm:text-right"
        role="status"
        aria-live="polite"
      >
        {feedback ? (
          <span className="inline-flex items-start gap-1.5">
            <CheckCircle2
              className="mt-0.5 size-3.5 shrink-0 text-success"
              aria-hidden="true"
            />
            {feedback}
          </span>
        ) : null}
      </p>
    </div>
  );
}
