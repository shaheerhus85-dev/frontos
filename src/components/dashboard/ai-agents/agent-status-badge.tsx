import { CircleAlert, CirclePause, CirclePlay } from "lucide-react";

import type { AgentStatus } from "@/data/ai-agents";
import { cn } from "@/lib/utils";

const statusStyles = {
  Active: {
    icon: CirclePlay,
    className: "border-[#cce9dc] bg-[#effaf5] text-[#247455]",
  },
  Paused: {
    icon: CirclePause,
    className: "border-[#d8ddea] bg-[#f4f6fa] text-[#667187]",
  },
  "Needs Attention": {
    icon: CircleAlert,
    className: "border-[#efdfbe] bg-[#fff9ed] text-[#8b681f]",
  },
} as const;

export function AgentStatusBadge({
  status,
}: Readonly<{ status: AgentStatus }>) {
  const styles = statusStyles[status];
  const Icon = styles.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold whitespace-nowrap",
        styles.className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}
