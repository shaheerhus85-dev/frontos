"use client";

import {
  Bot,
  ChevronRight,
  Globe2,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";

import { LeadPriorityIndicator } from "@/components/dashboard/leads/lead-priority";
import { LeadStageBadge } from "@/components/dashboard/leads/lead-stage-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { LeadRecord, LeadSource } from "@/data/leads";

type LeadsListProps = Readonly<{
  leads: readonly LeadRecord[];
  onSelect: (lead: LeadRecord) => void;
}>;

function Source({ source }: Readonly<{ source: LeadSource }>) {
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
    <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-[#48556d]">
      <Icon className="size-4 text-muted" aria-hidden="true" />
      {source}
    </span>
  );
}

function LeadScore({ score }: Readonly<{ score: number }>) {
  return (
    <span
      className="inline-flex min-w-9 justify-center rounded-full border border-[#d8e3f7] bg-[#f4f7fd] px-2 py-1 text-xs font-bold text-[#315b9e]"
      aria-label={`Lead score ${score}`}
    >
      {score}
    </span>
  );
}

export function LeadsList({ leads, onSelect }: LeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold text-foreground">
            No leads found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try a different name, stage, source, or assigned agent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden overflow-hidden md:block"
        data-testid="leads-table"
      >
        <table className="w-full table-auto border-collapse text-left">
          <caption className="sr-only">
            Lead pipeline opportunities and qualification status
          </caption>
          <thead className="bg-[#fafbfe] text-[11px] font-semibold tracking-[0.04em] text-muted uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 lg:px-6">
                Lead
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 min-[1400px]:table-cell"
              >
                Contact
              </th>
              <th scope="col" className="hidden px-3 py-3 lg:table-cell">
                Service interest
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 min-[1400px]:table-cell"
              >
                Source
              </th>
              <th scope="col" className="px-3 py-3">
                Lead score
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 min-[1400px]:table-cell"
              >
                Assigned agent
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3 min-[1400px]:table-cell"
              >
                Last activity
              </th>
              <th scope="col" className="px-3 py-3">
                Stage
              </th>
              <th scope="col" className="w-14 px-3 py-3 text-right">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                data-testid={`lead-row-${lead.id}`}
                className="group transition-colors focus-within:bg-[#f7f9fd] hover:bg-[#fafbfe]"
              >
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar fallback={lead.initials} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#182136]">
                        {lead.name}
                      </p>
                      <div className="mt-1">
                        <LeadPriorityIndicator priority={lead.priority} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden max-w-44 px-3 py-4 min-[1400px]:table-cell">
                  <p className="truncate text-sm font-medium text-[#3c4961]">
                    {lead.email}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {lead.phone}
                  </p>
                </td>
                <td className="hidden max-w-44 px-3 py-4 text-sm font-medium text-[#344057] lg:table-cell">
                  <span className="block truncate">{lead.serviceInterest}</span>
                </td>
                <td className="hidden px-3 py-4 min-[1400px]:table-cell">
                  <Source source={lead.source} />
                </td>
                <td className="px-3 py-4">
                  <LeadScore score={lead.score} />
                </td>
                <td className="hidden max-w-36 px-3 py-4 text-sm font-medium text-[#48556d] min-[1400px]:table-cell">
                  <span className="block truncate">{lead.agent}</span>
                </td>
                <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-secondary min-[1400px]:table-cell">
                  {lead.lastActivity}
                </td>
                <td className="px-3 py-4">
                  <LeadStageBadge stage={lead.stage} />
                </td>
                <td className="px-3 py-4 text-right">
                  <Button
                    variant="icon"
                    className="size-9"
                    onClick={() => onSelect(lead)}
                    aria-label={`View lead details for ${lead.name}`}
                    aria-haspopup="dialog"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border md:hidden" aria-label="Leads">
        {leads.map((lead) => (
          <li key={lead.id} data-testid="mobile-lead-card">
            <button
              type="button"
              onClick={() => onSelect(lead)}
              className="w-full px-4 py-4 text-left transition-colors outline-none hover:bg-[#fafbfe] focus-visible:bg-[#f7f9fd] focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-5"
              aria-label={`View lead details for ${lead.name}`}
              aria-haspopup="dialog"
            >
              <span className="flex items-start gap-3">
                <Avatar fallback={lead.initials} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[#182136]">
                        {lead.name}
                      </span>
                      <span className="mt-1 block truncate text-xs font-medium text-[#526078]">
                        {lead.serviceInterest}
                      </span>
                    </span>
                    <LeadStageBadge stage={lead.stage} />
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <Source source={lead.source} />
                    <LeadScore score={lead.score} />
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3 text-xs text-secondary">
                    <span className="truncate">{lead.agent}</span>
                    <ChevronRight
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
