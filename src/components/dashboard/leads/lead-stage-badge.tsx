import { Badge } from "@/components/ui/badge";
import type { LeadStage } from "@/data/leads";
import { cn } from "@/lib/utils";

const stageStyles: Record<
  LeadStage,
  { variant: "info" | "neutral" | "success" | "danger"; className?: string }
> = {
  New: { variant: "info" },
  Contacted: { variant: "neutral" },
  Qualified: {
    variant: "neutral",
    className: "border-[#ddd4ff] bg-[#f2efff] text-[#6547d8]",
  },
  Booked: { variant: "success" },
  Lost: { variant: "danger" },
};

export function LeadStageBadge({ stage }: Readonly<{ stage: LeadStage }>) {
  const styles = stageStyles[stage];

  return (
    <Badge variant={styles.variant} className={cn(styles.className)}>
      {stage}
    </Badge>
  );
}
