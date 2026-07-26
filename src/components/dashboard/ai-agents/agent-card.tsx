import {
  ArrowUpRight,
  Clock3,
  Gauge,
  ListChecks,
  Route,
  WandSparkles,
} from "lucide-react";

import { AgentStatusBadge } from "@/components/dashboard/ai-agents/agent-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { AIAgent } from "@/data/ai-agents";

function Metric({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof Gauge;
  label: string;
  value: string;
}>) {
  return (
    <div className="min-w-0 rounded-xl bg-[#f6f8fc] p-3">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.03em] text-muted uppercase">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </p>
      <p className="mt-1.5 font-display text-base font-semibold text-[#263249]">
        {value}
      </p>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  tone = "blue",
}: Readonly<{
  label: string;
  value: number;
  tone?: "blue" | "violet";
}>) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="font-medium text-[#687389]">{label}</span>
        <span className="font-semibold text-[#344057]">{value}%</span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5eaf3]"
        role="progressbar"
        aria-label={`${label} for agent`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className={
            tone === "violet"
              ? "h-full rounded-full bg-violet"
              : "h-full rounded-full bg-primary"
          }
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function AgentCard({
  agent,
  onSelect,
}: Readonly<{ agent: AIAgent; onSelect: (agent: AIAgent) => void }>) {
  return (
    <article
      className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_16px_rgb(16_21_37/0.04)] sm:p-5"
      data-testid={`agent-card-${agent.id}`}
    >
      <div className="flex min-h-[5.75rem] min-w-0 items-start gap-3">
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
          <h3 className="min-h-10 font-display text-base leading-5 font-semibold text-[#182136]">
            {agent.name}
          </h3>
          <p className="mt-0.5 truncate text-xs font-medium text-[#778197]">
            {agent.role}
          </p>
          <div className="mt-2">
            <AgentStatusBadge status={agent.status} />
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-10 text-sm leading-5 text-[#5c687e]">
        {agent.responsibility}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Metric icon={Gauge} label="Success" value={`${agent.successRate}%`} />
        <Metric
          icon={ListChecks}
          label="Tasks"
          value={agent.tasksHandled.toLocaleString("en-US")}
        />
        <Metric icon={Clock3} label="Response" value={agent.responseTime} />
        <Metric
          icon={Route}
          label="Escalation"
          value={`${agent.escalationRate}%`}
        />
      </div>

      <div className="mt-4 space-y-3">
        <ProgressMetric
          label="Automation level"
          value={agent.automationLevel}
        />
        <ProgressMetric
          label="Success rate"
          value={agent.successRate}
          tone="violet"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="flex min-w-0 items-center gap-1.5 text-[11px] text-muted">
          <WandSparkles className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Last active {agent.lastActive}</span>
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs text-primary"
          onClick={() => onSelect(agent)}
          aria-label={`View details for ${agent.name}`}
        >
          View details
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
