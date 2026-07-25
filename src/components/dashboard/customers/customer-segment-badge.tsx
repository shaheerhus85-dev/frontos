import { Badge } from "@/components/ui/badge";
import type { CustomerSegment } from "@/data/customers";

const segmentStyles: Record<
  CustomerSegment,
  {
    variant: "info" | "neutral" | "success" | "danger";
    className?: string;
  }
> = {
  New: { variant: "info" },
  Active: { variant: "success" },
  Returning: {
    variant: "neutral",
    className: "border-[#ddd4ff] bg-[#f2efff] text-[#6547d8]",
  },
  "At Risk": { variant: "danger" },
  Inactive: { variant: "neutral" },
};

export function CustomerSegmentBadge({
  segment,
}: Readonly<{ segment: CustomerSegment }>) {
  const styles = segmentStyles[segment];

  return (
    <Badge variant={styles.variant} className={styles.className}>
      {segment}
    </Badge>
  );
}
