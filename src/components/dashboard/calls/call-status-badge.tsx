import { Badge } from "@/components/ui/badge";
import type { CallStatus } from "@/data/calls";

const statusVariants = {
  Completed: "success",
  Escalated: "warning",
  Missed: "danger",
} as const;

export function CallStatusBadge({ status }: Readonly<{ status: CallStatus }>) {
  return <Badge variant={statusVariants[status]}>{status}</Badge>;
}
