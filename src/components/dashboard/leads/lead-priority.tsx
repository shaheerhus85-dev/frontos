import { Circle } from "lucide-react";

import type { LeadPriority } from "@/data/leads";
import { cn } from "@/lib/utils";

const priorityStyles: Record<LeadPriority, string> = {
  High: "text-[#d94d61]",
  Medium: "text-[#d78b18]",
  Standard: "text-[#9aa3b4]",
};

export function LeadPriorityIndicator({
  priority,
  showLabel = true,
}: Readonly<{ priority: LeadPriority; showLabel?: boolean }>) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold",
        priorityStyles[priority],
      )}
      aria-label={`${priority} priority`}
    >
      <Circle className="size-2 fill-current" aria-hidden="true" />
      {showLabel ? priority : null}
    </span>
  );
}
