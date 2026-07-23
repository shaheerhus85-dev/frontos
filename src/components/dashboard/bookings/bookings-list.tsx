"use client";

import { Bot, ChevronRight, Globe2, Phone, UserRound } from "lucide-react";

import { BookingStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { BookingRecord } from "@/data/bookings";

type BookingsListProps = Readonly<{
  bookings: readonly BookingRecord[];
  onSelect: (booking: BookingRecord) => void;
}>;

function Source({ source }: Readonly<{ source: BookingRecord["source"] }>) {
  const Icon =
    source === "AI Agent"
      ? Bot
      : source === "Website"
        ? Globe2
        : source === "Phone"
          ? Phone
          : UserRound;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-[#48556d]">
      <Icon className="size-4 text-muted" aria-hidden="true" />
      {source}
    </span>
  );
}

export function BookingsList({ bookings, onSelect }: BookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold text-foreground">
            No bookings found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try a different customer, service, or status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden overflow-hidden md:block"
        data-testid="bookings-table"
      >
        <table className="w-full table-auto border-collapse text-left">
          <caption className="sr-only">
            Bookings scheduled from May 12 through May 18
          </caption>
          <thead className="bg-[#fafbfe] text-[11px] font-semibold tracking-[0.04em] text-muted uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 lg:px-6">
                Customer
              </th>
              <th scope="col" className="hidden px-3 py-3 lg:table-cell">
                Service
              </th>
              <th scope="col" className="px-3 py-3">
                Date and time
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Duration
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Assigned agent
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Source
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
              <th scope="col" className="w-14 px-3 py-3 text-right">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                data-testid={`booking-row-${booking.id}`}
                className="group transition-colors focus-within:bg-[#f7f9fd] hover:bg-[#fafbfe]"
              >
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar fallback={booking.initials} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#182136]">
                        {booking.customer}
                      </p>
                      <p className="mt-0.5 hidden truncate text-xs text-muted xl:block">
                        {booking.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden max-w-44 px-3 py-4 text-sm font-medium text-[#344057] lg:table-cell">
                  <span className="block truncate">{booking.service}</span>
                </td>
                <td className="px-3 py-4">
                  <p className="text-sm font-semibold whitespace-nowrap text-[#344057]">
                    {booking.dateShort}
                  </p>
                  <p className="mt-0.5 text-xs whitespace-nowrap text-muted">
                    {booking.time}
                  </p>
                </td>
                <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-secondary xl:table-cell">
                  {booking.duration}
                </td>
                <td className="hidden max-w-40 px-3 py-4 text-sm font-medium text-[#48556d] xl:table-cell">
                  <span className="block truncate">{booking.agent}</span>
                </td>
                <td className="hidden px-3 py-4 xl:table-cell">
                  <Source source={booking.source} />
                </td>
                <td className="px-3 py-4">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-3 py-4 text-right">
                  <Button
                    variant="icon"
                    className="size-9"
                    onClick={() => onSelect(booking)}
                    aria-label={`View booking details for ${booking.customer}`}
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

      <ul className="divide-y divide-border md:hidden" aria-label="Bookings">
        {bookings.map((booking) => (
          <li key={booking.id} data-testid="mobile-booking-card">
            <button
              type="button"
              onClick={() => onSelect(booking)}
              className="w-full px-4 py-4 text-left transition-colors outline-none hover:bg-[#fafbfe] focus-visible:bg-[#f7f9fd] focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-5"
              aria-label={`View booking details for ${booking.customer}`}
              aria-haspopup="dialog"
            >
              <span className="flex items-start gap-3">
                <Avatar fallback={booking.initials} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#182136]">
                      {booking.customer}
                    </span>
                    <BookingStatusBadge status={booking.status} />
                  </span>
                  <span className="mt-1 block truncate text-xs font-medium text-[#526078]">
                    {booking.service}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3 text-xs text-secondary">
                    <span className="truncate">
                      {booking.dateShort} · {booking.time}
                    </span>
                    <span className="shrink-0">{booking.duration}</span>
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3 text-xs text-secondary">
                    <span className="truncate">{booking.agent}</span>
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
