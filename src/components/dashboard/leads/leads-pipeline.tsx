"use client";

import {
  Bot,
  Clock3,
  Globe2,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";

import { LeadPriorityIndicator } from "@/components/dashboard/leads/lead-priority";
import type { LeadRecord, LeadSource, LeadStage } from "@/data/leads";
import { leadStages } from "@/data/leads";
import { cn } from "@/lib/utils";

type LeadsPipelineProps = Readonly<{
  leads: readonly LeadRecord[];
  onSelect: (lead: LeadRecord) => void;
}>;

const stageStyles: Record<
  LeadStage,
  { dot: string; topBorder: string; count: string }
> = {
  New: {
    dot: "bg-[#2878ff]",
    topBorder: "border-t-[#7eacff]",
    count: "bg-[#edf4ff] text-[#1e63cf]",
  },
  Contacted: {
    dot: "bg-[#35b4db]",
    topBorder: "border-t-[#8ed9ee]",
    count: "bg-[#eaf9fd] text-[#187f9d]",
  },
  Qualified: {
    dot: "bg-[#7457ff]",
    topBorder: "border-t-[#aa98ff]",
    count: "bg-[#f0edff] text-[#6547d8]",
  },
  Booked: {
    dot: "bg-[#20b982]",
    topBorder: "border-t-[#76d9b6]",
    count: "bg-[#ebfaf4] text-[#14845d]",
  },
  Lost: {
    dot: "bg-[#929aad]",
    topBorder: "border-t-[#c8ced9]",
    count: "bg-[#f0f2f6] text-[#687389]",
  },
};

function Source({
  source,
  className,
}: Readonly<{ source: LeadSource; className?: string }>) {
  const Icon =
    source === "AI Call"
      ? Bot
      : source === "Website"
        ? Globe2
        : source === "Referral"
          ? UsersRound
          : source === "WhatsApp"
            ? MessageCircle
            : UserRound;

  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1 text-[11px] font-medium text-[#687389]",
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0 text-[#8d97a9]" aria-hidden="true" />
      <span className="truncate">{source}</span>
    </span>
  );
}

function LeadCard({
  lead,
  onSelect,
}: Readonly<{
  lead: LeadRecord;
  onSelect: (lead: LeadRecord) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(lead)}
      className="w-full min-w-0 rounded-xl border border-border bg-surface p-3 text-left shadow-[0_3px_10px_rgb(16_21_37/0.04)] transition-[border-color,box-shadow,transform] outline-none hover:-translate-y-px hover:border-[#d2d9e7] hover:shadow-[0_7px_18px_rgb(16_21_37/0.08)] focus-visible:ring-3 focus-visible:ring-primary/20"
      aria-label={`View lead details for ${lead.name}`}
      aria-haspopup="dialog"
      data-testid={`pipeline-lead-${lead.id}`}
    >
      <span className="flex min-w-0 items-start justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-[#1c2940]">
            {lead.name}
          </span>
          <span className="mt-0.5 block truncate text-xs font-medium text-[#637089]">
            {lead.serviceInterest}
          </span>
        </span>
        <LeadPriorityIndicator priority={lead.priority} showLabel={false} />
      </span>

      <span className="mt-3 flex items-center justify-between gap-2">
        <Source source={lead.source} />
        <span
          className="shrink-0 rounded-full border border-[#d8e3f7] bg-[#f4f7fd] px-2 py-1 text-[10px] font-bold text-[#315b9e]"
          aria-label={`Lead score ${lead.score}`}
        >
          {lead.score}
        </span>
      </span>

      <span className="mt-3 flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-[#526078]">
        <UserRound
          className="size-3.5 shrink-0 text-muted"
          aria-hidden="true"
        />
        <span className="truncate">{lead.agent}</span>
      </span>
      <span className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[10px] text-[#8a93a5]">
        <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{lead.lastActivity}</span>
      </span>
    </button>
  );
}

export function LeadsPipeline({ leads, onSelect }: LeadsPipelineProps) {
  return (
    <div
      className="overflow-x-auto px-4 py-4 sm:px-5 lg:px-6"
      data-testid="leads-pipeline"
    >
      <div className="flex min-w-0 snap-x snap-mandatory gap-3 xl:grid xl:grid-cols-5 xl:overflow-visible">
        {leadStages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage);
          const opportunityValue = stageLeads.reduce(
            (total, lead) => total + lead.estimatedValue,
            0,
          );
          const styles = stageStyles[stage];
          const stageSlug = stage.toLowerCase();

          return (
            <section
              key={stage}
              className={cn(
                "w-[min(18rem,calc(100vw-5rem))] shrink-0 snap-start overflow-hidden rounded-2xl border border-t-2 border-border bg-[#f8f9fc] xl:w-auto",
                styles.topBorder,
              )}
              aria-label={`${stage} leads`}
              data-testid={`pipeline-stage-${stageSlug}`}
            >
              <header className="border-b border-border px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn("size-2 rounded-full", styles.dot)}
                      aria-hidden="true"
                    />
                    <h3 className="truncate font-display text-sm font-semibold text-[#263248]">
                      {stage}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-[10px] font-bold",
                      styles.count,
                    )}
                    aria-label={`${stageLeads.length} ${stage.toLowerCase()} leads`}
                  >
                    {stageLeads.length}
                  </span>
                </div>
                <p className="mt-2 text-[10px] font-semibold tracking-[0.03em] text-[#8b94a5] uppercase">
                  ${(opportunityValue / 1000).toFixed(1)}k opportunity
                </p>
              </header>

              <div
                className="space-y-2.5 p-2.5"
                data-testid={`pipeline-stage-cards-${stageSlug}`}
              >
                {stageLeads.length > 0 ? (
                  stageLeads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} onSelect={onSelect} />
                  ))
                ) : (
                  <div className="grid min-h-28 place-items-center rounded-xl border border-dashed border-[#dce2ed] bg-surface px-3 text-center">
                    <p className="text-xs font-medium text-[#9aa3b4]">
                      No matching leads
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
