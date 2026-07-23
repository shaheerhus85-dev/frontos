"use client";

import {
  BellRing,
  Bot,
  CalendarDays,
  CalendarSync,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Sparkles,
  UserRound,
  XCircle,
} from "lucide-react";

import { BookingStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { BookingRecord } from "@/data/bookings";

type BookingDetailSheetProps = Readonly<{
  booking: BookingRecord | null;
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

export function BookingDetailSheet({
  booking,
  feedback,
  onOpenChange,
  onAction,
}: BookingDetailSheetProps) {
  return (
    <Sheet open={Boolean(booking)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close booking details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(38rem,calc(100vw-2rem))]"
        data-testid="booking-detail-sheet"
      >
        {booking ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex items-center gap-3">
                <Avatar fallback={booking.initials} />
                <div className="min-w-0">
                  <SheetTitle className="truncate">
                    {booking.customer}
                  </SheetTitle>
                  <SheetDescription className="mt-0.5">
                    {booking.service}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="contact-heading">
                <h3
                  id="contact-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Customer details
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={`mailto:${booking.email}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Mail
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{booking.email}</span>
                  </a>
                  <a
                    href={`tel:${booking.phone}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Phone
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{booking.phone}</span>
                  </a>
                </div>
              </section>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <DetailItem
                  icon={CalendarDays}
                  label="Date and time"
                  value={`${booking.date} · ${booking.time}`}
                />
                <DetailItem
                  icon={Clock3}
                  label="Duration"
                  value={booking.duration}
                />
                <DetailItem
                  icon={UserRound}
                  label="Assigned agent"
                  value={booking.agent}
                />
                <DetailItem
                  icon={booking.source === "AI Agent" ? Bot : CalendarSync}
                  label="Source"
                  value={booking.source}
                />
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-[#fafbfe] p-3">
                <p className="text-xs font-semibold text-muted">
                  Booking status
                </p>
                <BookingStatusBadge status={booking.status} />
              </div>

              <section
                className="mt-6"
                aria-labelledby="customer-notes-heading"
              >
                <h3
                  id="customer-notes-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Customer notes
                </h3>
                <p className="mt-2 rounded-xl border border-border bg-[#fafbfe] p-3.5 text-sm leading-6 text-[#526078]">
                  {booking.notes}
                </p>
              </section>

              <section
                className="mt-5 rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4"
                aria-labelledby="appointment-summary-heading"
              >
                <h3
                  id="appointment-summary-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]"
                >
                  <Sparkles
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  AI-prepared appointment summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52627d]">
                  {booking.summary}
                </p>
              </section>

              <section
                className="mt-5 rounded-2xl border border-[#e3dcfb] bg-[#f8f6ff] p-4"
                aria-labelledby="reminder-heading"
              >
                <h3
                  id="reminder-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#4d4176]"
                >
                  <BellRing className="size-4 text-violet" aria-hidden="true" />
                  Reminder status
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#665d83]">
                  {booking.reminder}
                </p>
              </section>

              <section
                className="mt-5 rounded-2xl border border-[#d6eadf] bg-[#f3fbf7] p-4"
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
                  Follow-up recommendation
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4d6c61]">
                  {booking.recommendation}
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

            <footer className="grid shrink-0 grid-cols-2 gap-2 border-t border-border bg-surface px-4 py-4 sm:grid-cols-3 sm:px-6">
              <Button
                variant="secondary"
                className="col-span-2 sm:col-span-1"
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
                onClick={() =>
                  onAction(
                    "Reschedule options prepared locally; the booking was not changed.",
                  )
                }
              >
                <CalendarSync className="size-4" aria-hidden="true" />
                Reschedule
              </Button>
              <Button
                variant="secondary"
                className="border-[#f0c8cf] text-[#bd3c50] hover:border-[#e9b4bd] hover:bg-[#fff3f5]"
                aria-label="Cancel booking"
                onClick={() =>
                  onAction(
                    "Cancellation preview prepared locally; the booking remains unchanged.",
                  )
                }
              >
                <XCircle className="size-4" aria-hidden="true" />
                <span className="sm:hidden">Cancel</span>
                <span className="hidden sm:inline">Cancel booking</span>
              </Button>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
