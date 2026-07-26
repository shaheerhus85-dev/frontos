import { Badge } from "@/components/ui/badge";
import type { FreshnessStatus, KnowledgeStatus } from "@/data/knowledge-base";

export function KnowledgeStatusBadge({
  status,
}: Readonly<{ status: KnowledgeStatus }>) {
  const variant =
    status === "Published"
      ? "success"
      : status === "Needs Review"
        ? "warning"
        : status === "Draft"
          ? "info"
          : "neutral";
  return <Badge variant={variant}>{status}</Badge>;
}

export function FreshnessBadge({
  freshness,
}: Readonly<{ freshness: FreshnessStatus }>) {
  const variant =
    freshness === "Current"
      ? "success"
      : freshness === "Review Soon"
        ? "warning"
        : "danger";
  return <Badge variant={variant}>{freshness}</Badge>;
}
