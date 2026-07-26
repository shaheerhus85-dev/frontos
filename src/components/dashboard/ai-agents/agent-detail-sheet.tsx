"use client";

import {
  Bot,
  CheckCircle2,
  CircleAlert,
  CirclePause,
  CirclePlay,
  Clock3,
  Gauge,
  ListChecks,
  MessageSquareText,
  PencilLine,
  Route,
  Settings2,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";

import { AgentStatusBadge } from "@/components/dashboard/ai-agents/agent-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { AIAgent } from "@/data/ai-agents";

function DetailItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof Bot;
  label: string;
  value: React.ReactNode;
}>) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 text-sm leading-5 font-semibold break-words text-[#27334a]">
        {value}
      </div>
    </div>
  );
}

function ListSection({
  heading,
  icon: Icon,
  items,
  tone,
}: Readonly<{
  heading: string;
  icon: typeof CheckCircle2;
  items: readonly string[];
  tone: "success" | "warning";
}>) {
  const styles =
    tone === "success"
      ? {
          icon: "text-success",
          item: "border-[#d6eadf] bg-[#f3fbf7] text-[#4d6c61]",
          dot: "bg-success",
        }
      : {
          icon: "text-warning",
          item: "border-[#f0dfbd] bg-[#fffaf0] text-[#786548]",
          dot: "bg-warning",
        };

  return (
    <section className="mt-5">
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <Icon className={`size-4 ${styles.icon}`} aria-hidden="true" />
        {heading}
      </h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex gap-2 rounded-xl border px-3 py-2.5 text-sm leading-5 ${styles.item}`}
          >
            <span
              className={`mt-2 size-1.5 shrink-0 rounded-full ${styles.dot}`}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

type AgentDetailSheetProps = Readonly<{
  agent: AIAgent | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onToggleStatus: (agent: AIAgent) => void;
  onAction: (message: string) => void;
}>;

export function AgentDetailSheet({
  agent,
  feedback,
  onOpenChange,
  onToggleStatus,
  onAction,
}: AgentDetailSheetProps) {
  return (
    <Sheet open={Boolean(agent)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close agent details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(43rem,calc(100vw-2rem))]"
        data-testid="agent-detail-sheet"
      >
        {agent ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar
                  fallback={agent.initials}
                  status={
                    agent.status === "Active"
                      ? "online"
                      : agent.status === "Needs Attention"
                        ? "away"
                        : "offline"
                  }
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <SheetTitle className="truncate">{agent.name}</SheetTitle>
                    <AgentStatusBadge status={agent.status} />
                  </div>
                  <SheetDescription className="mt-0.5 truncate">
                    {agent.role}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="agent-responsibility-heading">
                <h3
                  id="agent-responsibility-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Primary responsibility
                </h3>
                <p className="mt-2 rounded-xl border border-border bg-[#fafbfe] p-3 text-sm leading-6 text-[#526078]">
                  {agent.responsibility}
                </p>
              </section>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <DetailItem
                  icon={ListChecks}
                  label="Tasks completed"
                  value={agent.tasksHandled.toLocaleString("en-US")}
                />
                <DetailItem
                  icon={Gauge}
                  label="Success rate"
                  value={`${agent.successRate}%`}
                />
                <DetailItem
                  icon={WandSparkles}
                  label="Automation rate"
                  value={`${agent.automationLevel}%`}
                />
                <DetailItem
                  icon={Clock3}
                  label="Response time"
                  value={agent.responseTime}
                />
                <DetailItem
                  icon={Route}
                  label="Escalation rate"
                  value={`${agent.escalationRate}%`}
                />
                <DetailItem
                  icon={Bot}
                  label="Last active"
                  value={agent.lastActive}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
                  <p className="text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                    Channels handled
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agent.channels.map((channel) => (
                      <span
                        key={channel}
                        className="rounded-full border border-[#d7e2f6] bg-[#f1f6ff] px-2 py-1 text-[11px] font-semibold text-[#41658e]"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
                  <p className="text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                    Assigned workflows
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agent.workflows.map((workflow) => (
                      <span
                        key={workflow}
                        className="rounded-full border border-[#e3dcfb] bg-[#f8f6ff] px-2 py-1 text-[11px] font-semibold text-[#625485]"
                      >
                        {workflow}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <section
                className="mt-5 rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4"
                aria-labelledby="agent-summary-heading"
              >
                <h3
                  id="agent-summary-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]"
                >
                  <Sparkles
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  AI-prepared performance summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52627d]">
                  {agent.summary}
                </p>
              </section>

              <ListSection
                heading="Strengths"
                icon={CheckCircle2}
                items={agent.strengths}
                tone="success"
              />
              <ListSection
                heading="Issues or risks"
                icon={CircleAlert}
                items={agent.issues}
                tone="warning"
              />

              <section className="mt-5 rounded-2xl border border-[#e3dcfb] bg-[#f8f6ff] p-4">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-[#4d4176]">
                  <Target className="size-4 text-violet" aria-hidden="true" />
                  Recommended optimization
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#665d83]">
                  {agent.optimization}
                </p>
              </section>

              <section
                className="mt-5"
                aria-labelledby="agent-activity-heading"
              >
                <h3
                  id="agent-activity-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Recent activity
                </h3>
                <ol className="mt-3">
                  {agent.timeline.map((activity, index) => (
                    <li
                      key={activity.id}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >
                      {index < agent.timeline.length - 1 ? (
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
                        <span className="mt-1 block text-xs font-medium text-muted">
                          {activity.time}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section
                className="mt-5"
                aria-labelledby="agent-configuration-heading"
              >
                <h3
                  id="agent-configuration-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-foreground"
                >
                  <Settings2
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  Current configuration summary
                </h3>
                <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries({
                    Model: agent.configuration.model,
                    Language: agent.configuration.language,
                    "Handoff rule": agent.configuration.handoffRule,
                    "Knowledge scope": agent.configuration.knowledgeScope,
                  }).map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border bg-[#fafbfe] p-3"
                    >
                      <dt className="text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm leading-5 font-medium text-[#46536a]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <footer className="sticky bottom-0 shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6">
              {feedback ? (
                <p
                  className="mb-3 rounded-xl border border-[#cfe0ff] bg-[#edf4ff] px-3 py-2.5 text-sm leading-5 font-medium text-[#315b9e]"
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="primary"
                  className="h-auto min-h-11 px-3 py-2 text-xs leading-4 whitespace-normal"
                  onClick={() => onToggleStatus(agent)}
                >
                  {agent.status === "Paused" ? (
                    <CirclePlay className="size-4" aria-hidden="true" />
                  ) : (
                    <CirclePause className="size-4" aria-hidden="true" />
                  )}
                  {agent.status === "Paused" ? "Resume agent" : "Pause agent"}
                </Button>
                <Button
                  variant="secondary"
                  className="h-auto min-h-11 px-3 py-2 text-xs leading-4 whitespace-normal"
                  onClick={() =>
                    onAction(
                      "Conversation review opened locally; no external conversation system is connected.",
                    )
                  }
                >
                  <MessageSquareText className="size-4" aria-hidden="true" />
                  Review conversations
                </Button>
                <Button
                  variant="secondary"
                  className="h-auto min-h-11 px-3 py-2 text-xs leading-4 whitespace-normal"
                  onClick={() =>
                    onAction(
                      "Responsibility adjustments are in local preview only; no configuration was saved.",
                    )
                  }
                >
                  <PencilLine className="size-4" aria-hidden="true" />
                  Adjust responsibilities
                </Button>
                <Button
                  variant="secondary"
                  className="h-auto min-h-11 border-[#efdfbe] px-3 py-2 text-xs leading-4 whitespace-normal text-[#8b681f] hover:border-[#e8d29f] hover:bg-[#fff9ed]"
                  onClick={() =>
                    onAction(
                      "Review flag applied locally; no persistent agent record was updated.",
                    )
                  }
                >
                  <CircleAlert className="size-4" aria-hidden="true" />
                  Mark for review
                </Button>
              </div>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
