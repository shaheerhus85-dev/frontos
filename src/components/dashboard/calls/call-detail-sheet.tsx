"use client";

import {
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

import { CallStatusBadge } from "@/components/dashboard/calls/call-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CallRecord } from "@/data/calls";

type CallDetailSheetProps = Readonly<{
  call: CallRecord | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onAction: (message: string) => void;
}>;

function DetailItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof CalendarDays;
  label: string;
  value: string;
}>) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#fafbfe] p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-5 font-semibold break-words text-[#27334a]">
        {value}
      </p>
    </div>
  );
}

export function CallDetailSheet({
  call,
  feedback,
  onOpenChange,
  onAction,
}: CallDetailSheetProps) {
  return (
    <Sheet open={Boolean(call)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close call details"
        className="w-[calc(100vw-1rem)] max-w-none sm:w-[min(34rem,calc(100vw-2rem))]"
        data-testid="call-detail-sheet"
      >
        {call ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex items-center gap-3">
                <Avatar fallback={call.initials} />
                <div className="min-w-0">
                  <SheetTitle className="truncate">{call.caller}</SheetTitle>
                  <SheetDescription className="mt-0.5 flex items-center gap-1.5">
                    <Phone className="size-3.5" aria-hidden="true" />
                    {call.phone}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <div className="grid grid-cols-2 gap-3">
                <DetailItem
                  icon={CalendarDays}
                  label="Date and time"
                  value={`${call.date} · ${call.time}`}
                />
                <DetailItem
                  icon={Clock3}
                  label="Duration"
                  value={call.duration}
                />
                <DetailItem
                  icon={call.handler === "AI Agent" ? Bot : UserRound}
                  label="Handler"
                  value={call.handler}
                />
                <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
                  <p className="text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                    Status
                  </p>
                  <div className="mt-1.5">
                    <CallStatusBadge status={call.status} />
                  </div>
                </div>
              </div>

              <section
                className="mt-5 rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4"
                aria-labelledby="ai-summary-heading"
              >
                <h3
                  id="ai-summary-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]"
                >
                  <Sparkles
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  AI summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52627d]">
                  {call.summary}
                </p>
              </section>

              <section
                className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                aria-label="Call classification"
              >
                <div>
                  <p className="text-xs font-semibold text-muted">Intent</p>
                  <p className="mt-1 text-sm font-semibold text-[#27334a]">
                    {call.intent}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted">Outcome</p>
                  <p className="mt-1 text-sm font-semibold text-[#27334a]">
                    {call.outcome}
                  </p>
                </div>
              </section>

              <section className="mt-6" aria-labelledby="transcript-heading">
                <h3
                  id="transcript-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Transcript
                </h3>
                <div className="mt-3 space-y-3">
                  {call.transcript.map((entry, index) => (
                    <div
                      key={`${entry.speaker}-${index}`}
                      className={
                        entry.speaker === "AI Agent"
                          ? "mr-5 rounded-2xl rounded-tl-md bg-[#edf4ff] p-3.5"
                          : "ml-5 rounded-2xl rounded-tr-md bg-surface-secondary p-3.5"
                      }
                    >
                      <p className="text-[11px] font-bold tracking-[0.03em] text-[#65728a] uppercase">
                        {entry.speaker}
                      </p>
                      <p className="mt-1.5 text-sm leading-5 text-[#37445c]">
                        {entry.message}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                className="mt-6 rounded-2xl border border-[#d6eadf] bg-[#f3fbf7] p-4"
                aria-labelledby="follow-up-heading"
              >
                <h3
                  id="follow-up-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#275b49]"
                >
                  <CheckCircle2
                    className="size-4 text-success"
                    aria-hidden="true"
                  />
                  Recommended follow-up
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4d6c61]">
                  {call.recommendation}
                </p>
              </section>

              {feedback ? (
                <p
                  className="mt-4 rounded-xl border border-[#cfe0ff] bg-[#edf4ff] px-3 py-2.5 text-sm font-medium text-[#315b9e]"
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : null}
            </div>

            <footer className="grid shrink-0 grid-cols-1 gap-2 border-t border-border bg-surface px-4 py-4 sm:grid-cols-2 sm:px-6">
              <Button
                variant="secondary"
                onClick={() =>
                  onAction(
                    "Customer preview is ready locally; no customer system is connected in this phase.",
                  )
                }
              >
                <UserRound className="size-4" aria-hidden="true" />
                View customer
              </Button>
              <Button
                onClick={() =>
                  onAction("Follow-up draft created locally for this call.")
                }
              >
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Create follow-up
              </Button>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
