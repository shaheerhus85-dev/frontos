"use client";

import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Flag,
  Gauge,
  PauseCircle,
  PlugZap,
  RefreshCw,
  RotateCcw,
  Settings2,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import {
  IntegrationHealthBadge,
  IntegrationStatusBadge,
} from "@/components/dashboard/integrations/integration-badges";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { IntegrationRecord } from "@/data/integrations";

function Detail({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof PlugZap;
  label: string;
  value: React.ReactNode;
}>) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 text-sm font-semibold break-words text-[#27334a]">
        {value}
      </div>
    </div>
  );
}

function ChipList({
  heading,
  values,
  tone = "blue",
}: Readonly<{
  heading: string;
  values: readonly string[];
  tone?: "blue" | "violet";
}>) {
  return (
    <section>
      <h3 className="font-display text-sm font-semibold">{heading}</h3>
      <div className="mt-2 flex flex-wrap gap-2 rounded-2xl border border-border bg-[#fafbfe] p-4">
        {values.length ? (
          values.map((value) => (
            <span
              key={value}
              className={
                tone === "blue"
                  ? "rounded-full border border-[#d7e2f6] bg-[#f1f6ff] px-2.5 py-1 text-xs font-semibold text-[#41658e]"
                  : "rounded-full border border-[#e3dcfb] bg-[#f8f6ff] px-2.5 py-1 text-xs font-semibold text-[#625485]"
              }
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-muted">No active workflows</span>
        )}
      </div>
    </section>
  );
}

function HealthList({
  heading,
  items,
  tone,
}: Readonly<{
  heading: string;
  items: readonly string[];
  tone: "success" | "warning";
}>) {
  const Icon = tone === "success" ? CheckCircle2 : CircleAlert;
  return (
    <section>
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
        <Icon
          className={
            tone === "success" ? "size-4 text-success" : "size-4 text-warning"
          }
          aria-hidden="true"
        />
        {heading}
      </h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={
              tone === "success"
                ? "flex gap-2 rounded-xl border border-[#d6eadf] bg-[#f3fbf7] px-3 py-2.5 text-sm leading-5 text-[#4d6c61]"
                : "flex gap-2 rounded-xl border border-[#f0dfbd] bg-[#fffaf0] px-3 py-2.5 text-sm leading-5 text-[#786548]"
            }
          >
            <span
              className={
                tone === "success"
                  ? "mt-2 size-1.5 shrink-0 rounded-full bg-success"
                  : "mt-2 size-1.5 shrink-0 rounded-full bg-warning"
              }
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

type Props = Readonly<{
  integration: IntegrationRecord | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onTest: (integration: IntegrationRecord) => void;
  onTogglePause: (integration: IntegrationRecord) => void;
  onReconnect: (integration: IntegrationRecord) => void;
  onReview: (integration: IntegrationRecord) => void;
  onMarkForReview: (integration: IntegrationRecord) => void;
  onConfigure: (integration: IntegrationRecord) => void;
}>;

type ActionProps = Pick<
  Props,
  | "onTest"
  | "onTogglePause"
  | "onReconnect"
  | "onReview"
  | "onMarkForReview"
  | "onConfigure"
> &
  Readonly<{ integration: IntegrationRecord }>;

const actionClassName =
  "w-full gap-1.5 px-2 text-xs whitespace-nowrap sm:w-auto sm:gap-2 sm:px-3";

function IntegrationActions({
  integration,
  onTest,
  onTogglePause,
  onReconnect,
  onReview,
  onMarkForReview,
  onConfigure,
}: ActionProps) {
  const needsReconnect = integration.status === "Needs Reconnect";
  const isUnavailable =
    integration.status === "Not Connected" || integration.health === "Offline";

  if (isUnavailable) {
    return (
      <>
        <Button
          size="sm"
          className={actionClassName}
          onClick={() => onConfigure(integration)}
        >
          <Settings2 className="size-4" aria-hidden="true" />
          Configure setup
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className={actionClassName}
          onClick={() => onReview(integration)}
        >
          <Workflow className="size-4" aria-hidden="true" />
          Review workflows
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${actionClassName} col-span-2 text-primary sm:col-span-1`}
          onClick={() => onMarkForReview(integration)}
        >
          <Flag className="size-4" aria-hidden="true" />
          Mark for review
        </Button>
      </>
    );
  }

  return (
    <>
      {needsReconnect ? (
        <Button
          size="sm"
          className={actionClassName}
          onClick={() => onReconnect(integration)}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reconnect
        </Button>
      ) : null}
      <Button
        variant="secondary"
        size="sm"
        className={actionClassName}
        onClick={() => onTest(integration)}
      >
        <Activity className="size-4" aria-hidden="true" />
        Test connection
      </Button>
      {!needsReconnect ? (
        <Button
          variant="secondary"
          size="sm"
          className={actionClassName}
          onClick={() => onTogglePause(integration)}
        >
          <PauseCircle className="size-4" aria-hidden="true" />
          {integration.status === "Paused" ? "Resume sync" : "Pause sync"}
        </Button>
      ) : null}
      <Button
        variant="secondary"
        size="sm"
        className={actionClassName}
        onClick={() => onReview(integration)}
      >
        <Workflow className="size-4" aria-hidden="true" />
        Review workflows
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`${actionClassName} text-primary`}
        onClick={() => onMarkForReview(integration)}
      >
        <Flag className="size-4" aria-hidden="true" />
        Mark for review
      </Button>
    </>
  );
}

export function IntegrationDetailSheet({
  integration,
  feedback,
  onOpenChange,
  onTest,
  onTogglePause,
  onReconnect,
  onReview,
  onMarkForReview,
  onConfigure,
}: Props) {
  return (
    <Sheet open={Boolean(integration)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close integration details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(44rem,calc(100vw-2rem))]"
        data-testid="integration-detail-sheet"
      >
        {integration ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-primary">
                  {integration.category}
                </span>
                <IntegrationStatusBadge status={integration.status} />
                <IntegrationHealthBadge health={integration.health} />
              </div>
              <SheetTitle className="mt-1">{integration.name}</SheetTitle>
              <SheetDescription>
                Connection overview, workflow activity, and operational health.
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="connection-overview-heading">
                <h3
                  id="connection-overview-heading"
                  className="font-display text-sm font-semibold"
                >
                  Connection overview
                </h3>
                <p className="mt-2 rounded-2xl border border-border bg-[#fafbfe] p-4 text-sm leading-6 text-[#526078]">
                  {integration.purpose}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Detail
                    icon={Clock3}
                    label="Last successful sync"
                    value={integration.lastSync}
                  />
                  <Detail
                    icon={RefreshCw}
                    label="Successful syncs"
                    value={integration.successfulSyncs.toLocaleString("en-US")}
                  />
                  <Detail
                    icon={Zap}
                    label="Automations"
                    value={integration.automationCount}
                  />
                  <Detail
                    icon={Gauge}
                    label="Uptime"
                    value={`${integration.uptime}%`}
                  />
                </div>
              </section>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <ChipList
                  heading="Data handled"
                  values={integration.dataHandled}
                />
                <ChipList
                  heading="Active workflows"
                  values={integration.activeWorkflows}
                  tone="violet"
                />
              </div>

              <section
                className="mt-5 space-y-4"
                aria-labelledby="operational-health-heading"
              >
                <h3
                  id="operational-health-heading"
                  className="font-display text-sm font-semibold"
                >
                  Operational health
                </h3>
                <HealthList
                  heading="Operational strengths"
                  items={integration.strengths}
                  tone="success"
                />
                <HealthList
                  heading="Risks or attention items"
                  items={integration.risks}
                  tone="warning"
                />
                <div className="rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4">
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]">
                    <Sparkles
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    Recommended next action
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#52627d]">
                    {integration.recommendedAction}
                  </p>
                </div>
              </section>

              <section
                className="mt-5"
                aria-labelledby="integration-activity-heading"
              >
                <h3
                  id="integration-activity-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold"
                >
                  <Activity
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  Recent activity
                </h3>
                <ol className="mt-3">
                  {integration.recentActivity.map((activity, index) => (
                    <li
                      key={activity.id}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >
                      {index < integration.recentActivity.length - 1 ? (
                        <span
                          className="absolute top-3 bottom-0 left-[5px] w-px bg-border"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className="relative mt-1.5 size-3 shrink-0 rounded-full border-2 border-surface bg-primary"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[#344057]">
                          {activity.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-5 text-secondary">
                          {activity.detail}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {activity.time}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <footer className="shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6">
              {feedback ? (
                <p
                  className="mb-3 rounded-xl border border-[#cfe0ff] bg-[#edf4ff] px-3 py-2.5 text-sm leading-5 font-medium text-[#315b9e]"
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <IntegrationActions
                  integration={integration}
                  onTest={onTest}
                  onTogglePause={onTogglePause}
                  onReconnect={onReconnect}
                  onReview={onReview}
                  onMarkForReview={onMarkForReview}
                  onConfigure={onConfigure}
                />
              </div>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
