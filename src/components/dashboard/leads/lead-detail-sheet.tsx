"use client";

import {
  ArrowRightLeft,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarPlus2,
  CheckCircle2,
  CircleAlert,
  Clock3,
  DollarSign,
  Mail,
  Phone,
  Sparkles,
  Target,
  UserRound,
  XCircle,
} from "lucide-react";

import { LeadStageBadge } from "@/components/dashboard/leads/lead-stage-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { LeadRecord } from "@/data/leads";

type LeadDetailSheetProps = Readonly<{
  lead: LeadRecord | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onAction: (message: string) => void;
}>;

function DetailItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof BriefcaseBusiness;
  label: string;
  value: React.ReactNode;
}>) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-1.5 text-sm leading-5 font-semibold break-words text-[#27334a]">
        {value}
      </div>
    </div>
  );
}

export function LeadDetailSheet({
  lead,
  feedback,
  onOpenChange,
  onAction,
}: LeadDetailSheetProps) {
  return (
    <Sheet open={Boolean(lead)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close lead details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(42rem,calc(100vw-2rem))]"
        data-testid="lead-detail-sheet"
      >
        {lead ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar fallback={lead.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <SheetTitle className="truncate">{lead.name}</SheetTitle>
                    <LeadStageBadge stage={lead.stage} />
                  </div>
                  <SheetDescription className="mt-0.5 truncate">
                    {lead.company ?? lead.serviceInterest}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="lead-contact-heading">
                <h3
                  id="lead-contact-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Contact details
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Mail
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{lead.email}</span>
                  </a>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Phone
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{lead.phone}</span>
                  </a>
                </div>
              </section>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {lead.company ? (
                  <DetailItem
                    icon={Building2}
                    label="Company"
                    value={lead.company}
                  />
                ) : null}
                <DetailItem
                  icon={BriefcaseBusiness}
                  label="Service interest"
                  value={lead.serviceInterest}
                />
                <DetailItem
                  icon={lead.source === "AI Call" ? Bot : Target}
                  label="Source"
                  value={lead.source}
                />
                <DetailItem
                  icon={Sparkles}
                  label="Lead score"
                  value={`${lead.score} / 100`}
                />
                <DetailItem
                  icon={UserRound}
                  label="Assigned agent"
                  value={lead.agent}
                />
                <DetailItem
                  icon={DollarSign}
                  label="Opportunity value"
                  value={`$${lead.estimatedValue.toLocaleString("en-US")}`}
                />
              </div>

              <div className="mt-3 rounded-xl border border-border bg-[#fafbfe] p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  Last interaction
                </p>
                <p className="mt-1.5 text-sm leading-5 font-semibold text-[#27334a]">
                  {lead.lastInteraction}
                </p>
              </div>

              <section
                className="mt-5 rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4"
                aria-labelledby="lead-summary-heading"
              >
                <h3
                  id="lead-summary-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]"
                >
                  <Sparkles
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  AI-prepared lead summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52627d]">
                  {lead.summary}
                </p>
              </section>

              <section className="mt-5" aria-labelledby="signals-heading">
                <h3
                  id="signals-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-foreground"
                >
                  <CheckCircle2
                    className="size-4 text-success"
                    aria-hidden="true"
                  />
                  Qualification signals
                </h3>
                <ul className="mt-2 space-y-2">
                  {lead.qualificationSignals.map((signal) => (
                    <li
                      key={signal}
                      className="flex gap-2 rounded-xl border border-[#d6eadf] bg-[#f3fbf7] px-3 py-2.5 text-sm leading-5 text-[#4d6c61]"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-success"
                        aria-hidden="true"
                      />
                      {signal}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-5" aria-labelledby="concerns-heading">
                <h3
                  id="concerns-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-foreground"
                >
                  <CircleAlert
                    className="size-4 text-warning"
                    aria-hidden="true"
                  />
                  Concerns or objections
                </h3>
                <ul className="mt-2 space-y-2">
                  {lead.concerns.map((concern) => (
                    <li
                      key={concern}
                      className="rounded-xl border border-[#f0dfbd] bg-[#fffaf0] px-3 py-2.5 text-sm leading-5 text-[#786548]"
                    >
                      {concern}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                className="mt-5 rounded-2xl border border-[#e3dcfb] bg-[#f8f6ff] p-4"
                aria-labelledby="next-action-heading"
              >
                <h3
                  id="next-action-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#4d4176]"
                >
                  <Target className="size-4 text-violet" aria-hidden="true" />
                  Recommended next action
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#665d83]">
                  {lead.recommendation}
                </p>
              </section>

              <section className="mt-5" aria-labelledby="timeline-heading">
                <h3
                  id="timeline-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Interaction timeline
                </h3>
                <ol className="mt-3 space-y-0">
                  {lead.timeline.map((interaction, index) => (
                    <li
                      key={interaction.id}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >
                      {index < lead.timeline.length - 1 ? (
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
                          {interaction.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-5 text-secondary">
                          {interaction.detail}
                        </span>
                        <span className="mt-1 block text-xs font-medium text-muted">
                          {interaction.time}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              {feedback ? (
                <p
                  className="mt-5 rounded-xl border border-[#cfe0ff] bg-[#edf4ff] px-3 py-2.5 text-sm font-medium text-[#315b9e]"
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
            </div>

            <footer className="grid shrink-0 grid-cols-2 gap-2 border-t border-border bg-surface px-4 py-4 sm:grid-cols-4 sm:px-6">
              <Button
                variant="secondary"
                className="px-2"
                onClick={() =>
                  onAction(
                    "Customer preview opened locally; no customer system is connected.",
                  )
                }
              >
                <UserRound className="size-4" aria-hidden="true" />
                View customer
              </Button>
              <Button
                variant="secondary"
                className="px-2"
                onClick={() =>
                  onAction(
                    "Follow-up drafted locally; no message has been sent.",
                  )
                }
              >
                <CalendarPlus2 className="size-4" aria-hidden="true" />
                Create follow-up
              </Button>
              <Button
                variant="secondary"
                className="px-2"
                onClick={() =>
                  onAction(
                    "Booking conversion preview prepared; the lead remains unchanged.",
                  )
                }
              >
                <ArrowRightLeft className="size-4" aria-hidden="true" />
                Convert to booking
              </Button>
              <Button
                variant="secondary"
                className="border-[#f0c8cf] px-2 text-[#bd3c50] hover:border-[#e9b4bd] hover:bg-[#fff3f5]"
                onClick={() =>
                  onAction(
                    "Lost-stage preview prepared; the lead remains unchanged.",
                  )
                }
              >
                <XCircle className="size-4" aria-hidden="true" />
                Mark as lost
              </Button>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
