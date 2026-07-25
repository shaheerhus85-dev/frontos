import {
  CheckCircle2,
  CircleAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import type { CustomerHealth } from "@/data/customers";
import { cn } from "@/lib/utils";

const healthStyles: Record<
  CustomerHealth,
  { icon: typeof CheckCircle2; className: string }
> = {
  Healthy: {
    icon: CheckCircle2,
    className: "border-[#cce9dc] bg-[#effaf5] text-[#247455]",
  },
  Stable: {
    icon: ShieldCheck,
    className: "border-[#d4e1f6] bg-[#f2f6fd] text-[#42648f]",
  },
  "Needs Attention": {
    icon: CircleAlert,
    className: "border-[#efdfbe] bg-[#fff9ed] text-[#8b681f]",
  },
  "At Risk": {
    icon: TriangleAlert,
    className: "border-[#efccd2] bg-[#fff2f4] text-[#ad4052]",
  },
};

export function CustomerHealthBadge({
  health,
}: Readonly<{ health: CustomerHealth }>) {
  const styles = healthStyles[health];
  const Icon = styles.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold whitespace-nowrap",
        styles.className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {health}
    </span>
  );
}
