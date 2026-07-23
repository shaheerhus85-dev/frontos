"use client";

import { useMemo, useState } from "react";

import { BookingDetailSheet } from "@/components/dashboard/bookings/booking-detail-sheet";
import { BookingsList } from "@/components/dashboard/bookings/bookings-list";
import {
  BookingsSchedule,
  getVisibleScheduleBookings,
  type ScheduleRange,
} from "@/components/dashboard/bookings/bookings-schedule";
import {
  BookingsToolbar,
  type BookingServiceFilter,
  type BookingStatusFilter,
  type BookingView,
} from "@/components/dashboard/bookings/bookings-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { BookingRecord } from "@/data/bookings";

type BookingsWorkspaceProps = Readonly<{
  bookings: readonly BookingRecord[];
}>;

export function BookingsWorkspace({ bookings }: BookingsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatusFilter>("All");
  const [service, setService] = useState<BookingServiceFilter>("All");
  const [view, setView] = useState<BookingView>("list");
  const [scheduleRange, setScheduleRange] = useState<ScheduleRange>("today");
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(
    null,
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        query.length === 0 ||
        booking.customer.toLowerCase().includes(query) ||
        booking.service.toLowerCase().includes(query);
      const matchesStatus = status === "All" || booking.status === status;
      const matchesService = service === "All" || booking.service === service;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [bookings, search, service, status]);

  const hasActiveFilters =
    search.trim().length > 0 || status !== "All" || service !== "All";

  const visibleBookings =
    view === "list"
      ? filteredBookings
      : getVisibleScheduleBookings(filteredBookings, scheduleRange);

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setService("All");
  }

  function openBooking(booking: BookingRecord) {
    setFeedback(null);
    setSelectedBooking(booking);
  }

  return (
    <>
      <Card
        className="min-w-0 overflow-hidden"
        data-testid="bookings-workspace"
      >
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Booking schedule</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Review appointments, availability, and scheduling status.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            May 12 – May 18
          </p>
        </CardHeader>

        <BookingsToolbar
          search={search}
          status={status}
          service={service}
          view={view}
          resultCount={visibleBookings.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onServiceChange={setService}
          onViewChange={setView}
          onClear={clearFilters}
        />

        {view === "list" ? (
          <BookingsList bookings={filteredBookings} onSelect={openBooking} />
        ) : (
          <BookingsSchedule
            bookings={visibleBookings}
            range={scheduleRange}
            onRangeChange={setScheduleRange}
            onSelect={openBooking}
          />
        )}
      </Card>

      <BookingDetailSheet
        booking={selectedBooking}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedBooking(null);
            setFeedback(null);
          }
        }}
        onAction={setFeedback}
      />
    </>
  );
}
