import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/data/bookings";

const statusVariants = {
  Confirmed: "info",
  Pending: "warning",
  Completed: "success",
  Cancelled: "danger",
} as const;

export function BookingStatusBadge({
  status,
}: Readonly<{ status: BookingStatus }>) {
  return <Badge variant={statusVariants[status]}>{status}</Badge>;
}
