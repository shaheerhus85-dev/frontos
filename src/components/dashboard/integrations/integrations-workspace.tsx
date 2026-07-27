"use client";

import { useMemo, useState } from "react";

import { IntegrationDetailSheet } from "@/components/dashboard/integrations/integration-detail-sheet";
import { IntegrationDirectory } from "@/components/dashboard/integrations/integration-directory";
import {
  IntegrationsToolbar,
  type IntegrationCategoryFilter,
  type IntegrationHealthFilter,
  type IntegrationSort,
  type IntegrationStatusFilter,
} from "@/components/dashboard/integrations/integrations-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { IntegrationHealth, IntegrationRecord } from "@/data/integrations";

const healthRank: Record<IntegrationHealth, number> = {
  Healthy: 4,
  Degraded: 3,
  Attention: 2,
  Offline: 1,
};

export function IntegrationsWorkspace({
  initialIntegrations,
}: Readonly<{ initialIntegrations: readonly IntegrationRecord[] }>) {
  const [records, setRecords] = useState<IntegrationRecord[]>([
    ...initialIntegrations,
  ]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<IntegrationStatusFilter>("All");
  const [category, setCategory] = useState<IntegrationCategoryFilter>("All");
  const [health, setHealth] = useState<IntegrationHealthFilter>("All");
  const [sort, setSort] = useState<IntegrationSort>("recent");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const visibleRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records
      .filter(
        (record) =>
          (!query ||
            [record.name, record.category, record.purpose].some((value) =>
              value.toLowerCase().includes(query),
            )) &&
          (status === "All" || record.status === status) &&
          (category === "All" || record.category === category) &&
          (health === "All" || record.health === health),
      )
      .sort((first, second) => {
        if (sort === "health")
          return healthRank[second.health] - healthRank[first.health];
        if (sort === "automations")
          return second.automationCount - first.automationCount;
        if (sort === "name") return first.name.localeCompare(second.name);
        return first.lastSyncOrder - second.lastSyncOrder;
      });
  }, [category, health, records, search, sort, status]);

  const selected = records.find((record) => record.id === selectedId) ?? null;
  const hasActiveFilters =
    Boolean(search.trim()) ||
    status !== "All" ||
    category !== "All" ||
    health !== "All";

  function updateRecord(
    integration: IntegrationRecord,
    patch: Partial<IntegrationRecord>,
    message: string,
  ) {
    setRecords((current) =>
      current.map((record) =>
        record.id === integration.id ? { ...record, ...patch } : record,
      ),
    );
    setFeedback(message);
  }

  return (
    <>
      <Card
        className="min-w-0 overflow-hidden"
        data-testid="integrations-workspace"
      >
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Integration directory</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Review connections, automation coverage, and sync health.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            {records.length} integration profiles
          </p>
        </CardHeader>
        <IntegrationsToolbar
          search={search}
          status={status}
          category={category}
          health={health}
          sort={sort}
          resultCount={visibleRecords.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCategoryChange={setCategory}
          onHealthChange={setHealth}
          onSortChange={setSort}
          onClear={() => {
            setSearch("");
            setStatus("All");
            setCategory("All");
            setHealth("All");
          }}
        />
        <IntegrationDirectory
          integrations={visibleRecords}
          onSelect={(integration) => {
            setSelectedId(integration.id);
            setFeedback(null);
          }}
        />
      </Card>

      <IntegrationDetailSheet
        integration={selected}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
            setFeedback(null);
          }
        }}
        onTest={(integration) =>
          setFeedback(
            integration.status === "Needs Reconnect"
              ? `${integration.name} connection test confirmed that reconnection is required in this local preview; no external request was made.`
              : `${integration.name} connection test passed in this local preview; no external request was made.`,
          )
        }
        onTogglePause={(integration) => {
          if (
            integration.status !== "Connected" &&
            integration.status !== "Paused"
          ) {
            return;
          }
          const nextStatus =
            integration.status === "Paused" ? "Connected" : "Paused";
          updateRecord(
            integration,
            { status: nextStatus },
            `${integration.name} sync is now ${nextStatus.toLowerCase()} in this local preview.`,
          );
        }}
        onReview={(integration) =>
          setFeedback(
            `${integration.name} workflows were marked for local review; no persistent record was changed.`,
          )
        }
        onMarkForReview={(integration) =>
          setFeedback(
            `${integration.name} was marked for review in this local preview; no persistent record was changed.`,
          )
        }
        onConfigure={(integration) =>
          setFeedback(
            `${integration.name} setup checklist opened in this local preview; no external connection was created.`,
          )
        }
        onReconnect={(integration) =>
          updateRecord(
            integration,
            {
              status: "Connected",
              health: "Healthy",
              lastSync: "Just now",
              lastSyncOrder: 0,
            },
            `${integration.name} was reconnected in this local preview; no external connection was created.`,
          )
        }
      />
    </>
  );
}
