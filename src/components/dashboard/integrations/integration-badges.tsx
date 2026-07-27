import { Badge } from "@/components/ui/badge";
import type { IntegrationHealth, IntegrationStatus } from "@/data/integrations";

export function IntegrationStatusBadge({
  status,
}: Readonly<{ status: IntegrationStatus }>) {
  const variant =
    status === "Connected"
      ? "success"
      : status === "Needs Reconnect"
        ? "danger"
        : status === "Paused"
          ? "warning"
          : "neutral";
  return <Badge variant={variant}>{status}</Badge>;
}

export function IntegrationHealthBadge({
  health,
}: Readonly<{ health: IntegrationHealth }>) {
  const variant =
    health === "Healthy"
      ? "success"
      : health === "Degraded"
        ? "warning"
        : health === "Attention"
          ? "danger"
          : "neutral";
  return <Badge variant={variant}>{health}</Badge>;
}
