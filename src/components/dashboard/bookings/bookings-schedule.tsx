"use client";

import { Clock3, UserRound } from "lucide-react";

import { BookingStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";
import type { BookingRecord, BookingStatus } from "@/data/bookings";
import { cn } from "@/lib/utils";

export type ScheduleRange = "today" | "week";

type BookingsScheduleProps = Readonly<{
  bookings: readonly BookingRecord[];
  range: ScheduleRange;
  onRangeChange: (range: ScheduleRange) => void;
  onSelect: (booking: BookingRecord) => void;
}>;

const todaySlots = [
  { hour: 9, label: "9:00 AM" },
  { hour: 10.5, label: "10:30 AM" },
  { hour: 11.5, label: "11:30 AM" },
  { hour: 13, label: "1:00 PM" },
  { hour: 14.5, label: "2:30 PM" },
  { hour: 16, label: "4:00 PM" },
] as const;

const weekDays = [
  { dateIso: "2026-05-12", day: "Tue", date: "12" },
  { dateIso: "2026-05-13", day: "Wed", date: "13" },
  { dateIso: "2026-05-14", day: "Thu", date: "14" },
  { dateIso: "2026-05-15", day: "Fri", date: "15" },
  { dateIso: "2026-05-16", day: "Sat", date: "16" },
  { dateIso: "2026-05-17", day: "Sun", date: "17" },
  { dateIso: "2026-05-18", day: "Mon", date: "18" },
] as const;

const todayDateIso = "2026-05-18";
const weekDateIsos: ReadonlySet<string> = new Set(
  weekDays.map((day) => day.dateIso),
);

export function getVisibleScheduleBookings(
  bookings: readonly BookingRecord[],
  range: ScheduleRange,
) {
  return bookings.filter((booking) =>
    range === "today"
      ? booking.dateIso === todayDateIso
      : weekDateIsos.has(booking.dateIso),
  );
}

const appointmentTones: Record<BookingStatus, string> = {
  Confirmed: "border-l-[#2878ff] bg-[#f3f7ff]",
  Pending: "border-l-[#f2a93b] bg-[#fffaf0]",
  Completed: "border-l-[#20b982] bg-[#f2fbf7]",
  Cancelled: "border-l-[#e85268] bg-[#fff5f6]",
};

function AppointmentBlock({
  booking,
  compact = false,
  onSelect,
}: Readonly<{
  booking: BookingRecord;
  compact?: boolean;
  onSelect: (booking: BookingRecord) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(booking)}
      className={cn(
        "w-full min-w-0 rounded-xl border border-l-[3px] border-border p-3 text-left shadow-[0_3px_10px_rgb(16_21_37/0.04)] transition-[border-color,box-shadow,transform] outline-none hover:-translate-y-px hover:shadow-[0_6px_16px_rgb(16_21_37/0.08)] focus-visible:ring-3 focus-visible:ring-primary/20",
        appointmentTones[booking.status],
        compact && "p-2.5",
      )}
      aria-label={`View booking details for ${booking.customer} at ${booking.time}`}
      aria-haspopup="dialog"
      data-testid={`schedule-booking-${booking.id}`}
    >
      <span className="flex min-w-0 items-start justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-[#1c2940]">
            {booking.customer}
          </span>
          <span className="mt-0.5 block truncate text-xs font-medium text-[#59677f]">
            {booking.service}
          </span>
        </span>
        {!compact ? <BookingStatusBadge status={booking.status} /> : null}
      </span>
      <span
        className={cn(
          "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#6d788d]",
          compact && "mt-1.5",
        )}
      >
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {booking.duration}
        </span>
        <span className="inline-flex min-w-0 items-center gap-1">
          <UserRound className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{booking.agent}</span>
        </span>
      </span>
      {compact ? (
        <span className="mt-2 block">
          <BookingStatusBadge status={booking.status} />
        </span>
      ) : null}
    </button>
  );
}

function TodaySchedule({
  bookings,
  onSelect,
}: Readonly<{
  bookings: readonly BookingRecord[];
  onSelect: (booking: BookingRecord) => void;
}>) {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6" data-testid="today-schedule">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#253148]">Monday, May 18</p>
          <p className="mt-0.5 text-xs text-muted">
            {bookings.length} scheduled appointments
          </p>
        </div>
        <span className="rounded-full bg-[#edf4ff] px-2.5 py-1 text-xs font-semibold text-[#1e63cf]">
          Today
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        {todaySlots.map((slot) => {
          const slotBookings = bookings.filter(
            (booking) => booking.startHour === slot.hour,
          );

          return (
            <div
              key={slot.hour}
              className="grid min-h-[5.5rem] grid-cols-1 border-b border-border last:border-b-0 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
            >
              <div className="border-b border-border bg-[#fafbfe] px-3 py-2 text-left text-[11px] font-semibold text-[#7e889a] sm:border-r sm:border-b-0 sm:py-3 sm:text-right">
                {slot.label}
              </div>
              <div className="min-w-0 bg-surface p-2.5 sm:p-3">
                {slotBookings.length > 0 ? (
                  <div className="grid gap-2 lg:grid-cols-2">
                    {slotBookings.map((booking) => (
                      <AppointmentBlock
                        key={booking.id}
                        booking={booking}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid h-full min-h-14 place-items-center rounded-xl border border-dashed border-[#dce2ed] bg-[#fbfcfe]">
                    <span className="text-xs font-medium text-[#a0a8b7]">
                      Available
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekSchedule({
  bookings,
  onSelect,
}: Readonly<{
  bookings: readonly BookingRecord[];
  onSelect: (booking: BookingRecord) => void;
}>) {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6" data-testid="week-schedule">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {weekDays.map((day) => {
          const dayBookings = bookings.filter(
            (booking) => booking.dateIso === day.dateIso,
          );

          return (
            <section
              key={day.dateIso}
              className="min-w-0 overflow-hidden rounded-2xl border border-border bg-[#fafbfe]"
              aria-label={`${day.day}, May ${day.date}`}
            >
              <header
                className={cn(
                  "flex items-center justify-between border-b border-border px-3 py-2.5 xl:block xl:text-center",
                  day.dateIso === "2026-05-18" && "bg-[#edf4ff]",
                )}
              >
                <p className="text-[11px] font-bold tracking-[0.05em] text-[#748097] uppercase">
                  {day.day}
                </p>
                <p className="font-display text-base font-semibold text-[#202d44] xl:mt-0.5">
                  {day.date}
                </p>
              </header>
              <div className="space-y-2 p-2.5">
                {dayBookings.length > 0 ? (
                  dayBookings
                    .toSorted((a, b) => a.startHour - b.startHour)
                    .map((booking) => (
                      <div key={booking.id}>
                        <p className="mb-1.5 text-[11px] font-semibold text-[#778297]">
                          {booking.time}
                        </p>
                        <AppointmentBlock
                          booking={booking}
                          compact
                          onSelect={onSelect}
                        />
                      </div>
                    ))
                ) : (
                  <div className="grid min-h-24 place-items-center rounded-xl border border-dashed border-[#dce2ed] bg-surface px-2 text-center">
                    <p className="text-xs font-medium text-[#a0a8b7]">
                      Open schedule
                    </p>
                  </div>
                )}
                <div className="rounded-lg border border-dashed border-[#e0e5ee] bg-surface px-2 py-2 text-center text-[10px] font-medium text-[#a0a8b7]">
                  Open time available
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function BookingsSchedule({
  bookings,
  range,
  onRangeChange,
  onSelect,
}: BookingsScheduleProps) {
  return (
    <div data-testid="bookings-schedule">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5 lg:px-6">
        <div
          className="inline-grid grid-cols-2 rounded-xl bg-surface-secondary p-1"
          role="tablist"
          aria-label="Schedule range"
        >
          <button
            type="button"
            role="tab"
            aria-selected={range === "today"}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              range === "today"
                ? "bg-surface text-[#1d63cd] shadow-[0_1px_4px_rgb(16_21_37/0.08)]"
                : "text-secondary hover:text-foreground",
            )}
            onClick={() => onRangeChange("today")}
          >
            Today
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={range === "week"}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              range === "week"
                ? "bg-surface text-[#1d63cd] shadow-[0_1px_4px_rgb(16_21_37/0.08)]"
                : "text-secondary hover:text-foreground",
            )}
            onClick={() => onRangeChange("week")}
          >
            Week
          </button>
        </div>
        <p className="hidden text-xs font-medium text-muted sm:block">
          May 12 – May 18
        </p>
      </div>

      {range === "today" ? (
        <TodaySchedule bookings={bookings} onSelect={onSelect} />
      ) : (
        <WeekSchedule bookings={bookings} onSelect={onSelect} />
      )}
    </div>
  );
}
