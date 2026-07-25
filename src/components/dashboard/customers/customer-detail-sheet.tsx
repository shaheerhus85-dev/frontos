"use client";

import {
  BadgeDollarSign,
  BookOpenCheck,
  Building2,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ClipboardPlus,
  Clock3,
  Mail,
  MessageSquarePlus,
  Phone,
  Sparkles,
  StickyNote,
  Target,
  UserRound,
} from "lucide-react";

import { CustomerHealthBadge } from "@/components/dashboard/customers/customer-health-badge";
import { CustomerSegmentBadge } from "@/components/dashboard/customers/customer-segment-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CustomerRecord } from "@/data/customers";

type CustomerDetailSheetProps = Readonly<{
  customer: CustomerRecord | null;
  feedback: string | null;
  onOpenChange: (open: boolean) => void;
  onAction: (message: string) => void;
}>;

function DetailItem({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: typeof Building2;
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

function formatValue(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CustomerDetailSheet({
  customer,
  feedback,
  onOpenChange,
  onAction,
}: CustomerDetailSheetProps) {
  return (
    <Sheet open={Boolean(customer)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close customer details"
        className="w-[calc(100vw-0.5rem)] max-w-none sm:w-[min(42rem,calc(100vw-2rem))]"
        data-testid="customer-detail-sheet"
      >
        {customer ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar fallback={customer.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <SheetTitle className="truncate">
                      {customer.name}
                    </SheetTitle>
                    <CustomerSegmentBadge segment={customer.segment} />
                  </div>
                  <SheetDescription className="mt-0.5 truncate">
                    {customer.company}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <section aria-labelledby="customer-contact-heading">
                <h3
                  id="customer-contact-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Contact details
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={`mailto:${customer.email}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Mail
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{customer.email}</span>
                  </a>
                  <a
                    href={`tel:${customer.phone}`}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm font-medium text-[#44516a] no-underline transition-colors hover:bg-surface-secondary"
                  >
                    <Phone
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span className="truncate">{customer.phone}</span>
                  </a>
                </div>
              </section>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <DetailItem
                  icon={Building2}
                  label="Company"
                  value={customer.company}
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Customer since"
                  value={customer.customerSince}
                />
                <DetailItem
                  icon={BookOpenCheck}
                  label="Primary service"
                  value={customer.primaryService}
                />
                <DetailItem
                  icon={UserRound}
                  label="Account owner"
                  value={customer.agent}
                />
                <DetailItem
                  icon={CalendarCheck2}
                  label="Booking history"
                  value={`${customer.completedBookings} of ${customer.totalBookings} completed`}
                />
                <DetailItem
                  icon={BadgeDollarSign}
                  label="Lifetime value"
                  value={formatValue(customer.lifetimeValue)}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
                  <p className="text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                    Segment
                  </p>
                  <div className="mt-2">
                    <CustomerSegmentBadge segment={customer.segment} />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[#fafbfe] p-3">
                  <p className="text-[11px] font-semibold tracking-[0.03em] text-muted uppercase">
                    Health status
                  </p>
                  <div className="mt-2">
                    <CustomerHealthBadge health={customer.health} />
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={Clock3}
                  label="Last interaction"
                  value={customer.lastInteraction}
                />
                <DetailItem
                  icon={CalendarClock}
                  label="Next scheduled booking"
                  value={customer.nextBooking}
                />
              </div>

              <section
                className="mt-5 rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4"
                aria-labelledby="customer-summary-heading"
              >
                <h3
                  id="customer-summary-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#253654]"
                >
                  <Sparkles
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  AI-prepared customer summary
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52627d]">
                  {customer.summary}
                </p>
              </section>

              <section className="mt-5" aria-labelledby="preferences-heading">
                <h3
                  id="preferences-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-foreground"
                >
                  <MessageSquarePlus
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  Preferences and communication notes
                </h3>
                <ul className="mt-2 space-y-2">
                  {customer.preferences.map((preference) => (
                    <li
                      key={preference}
                      className="rounded-xl border border-border bg-[#fafbfe] px-3 py-2.5 text-sm leading-5 text-[#526078]"
                    >
                      {preference}
                    </li>
                  ))}
                </ul>
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
                  Relationship signals
                </h3>
                <ul className="mt-2 space-y-2">
                  {customer.relationshipSignals.map((signal) => (
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

              <section className="mt-5" aria-labelledby="risks-heading">
                <h3
                  id="risks-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-foreground"
                >
                  <CircleAlert
                    className="size-4 text-warning"
                    aria-hidden="true"
                  />
                  Risks or concerns
                </h3>
                <ul className="mt-2 space-y-2">
                  {customer.risks.map((risk) => (
                    <li
                      key={risk}
                      className="rounded-xl border border-[#f0dfbd] bg-[#fffaf0] px-3 py-2.5 text-sm leading-5 text-[#786548]"
                    >
                      {risk}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                className="mt-5 rounded-2xl border border-[#e3dcfb] bg-[#f8f6ff] p-4"
                aria-labelledby="customer-next-action-heading"
              >
                <h3
                  id="customer-next-action-heading"
                  className="flex items-center gap-2 font-display text-sm font-semibold text-[#4d4176]"
                >
                  <Target className="size-4 text-violet" aria-hidden="true" />
                  Recommended next action
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#665d83]">
                  {customer.recommendation}
                </p>
              </section>

              <section
                className="mt-5"
                aria-labelledby="customer-timeline-heading"
              >
                <h3
                  id="customer-timeline-heading"
                  className="font-display text-sm font-semibold text-foreground"
                >
                  Recent activity
                </h3>
                <ol className="mt-3 space-y-0">
                  {customer.timeline.map((activity, index) => (
                    <li
                      key={activity.id}
                      className="relative flex gap-3 pb-5 last:pb-0"
                    >
                      {index < customer.timeline.length - 1 ? (
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
                className="px-1 text-[11px] whitespace-nowrap"
                onClick={() =>
                  onAction(
                    "Bookings preview opened locally; no booking system is connected.",
                  )
                }
              >
                <CalendarCheck2 className="size-4" aria-hidden="true" />
                View bookings
              </Button>
              <Button
                variant="secondary"
                className="px-1 text-[11px] whitespace-nowrap"
                onClick={() =>
                  onAction(
                    "Follow-up drafted locally; no message has been sent.",
                  )
                }
              >
                <ClipboardPlus className="size-4" aria-hidden="true" />
                Create follow-up
              </Button>
              <Button
                variant="secondary"
                className="px-1 text-[11px] whitespace-nowrap"
                onClick={() =>
                  onAction(
                    "Internal note prepared locally; no record has been saved.",
                  )
                }
              >
                <StickyNote className="size-4" aria-hidden="true" />
                Add internal note
              </Button>
              <Button
                variant="secondary"
                className="border-[#efdfbe] px-1 text-[11px] whitespace-nowrap text-[#8b681f] hover:border-[#e8d29f] hover:bg-[#fff9ed]"
                onClick={() =>
                  onAction(
                    "Review flag preview prepared; the customer record remains unchanged.",
                  )
                }
              >
                <CircleAlert className="size-4" aria-hidden="true" />
                Mark for review
              </Button>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
