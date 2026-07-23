"use client";

import { CalendarDays, CalendarRange, List, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingServices, type BookingStatus } from "@/data/bookings";
import { cn } from "@/lib/utils";

export type BookingStatusFilter = "All" | BookingStatus;
export type BookingServiceFilter = "All" | (typeof bookingServices)[number];
export type BookingView = "list" | "schedule";

type BookingsToolbarProps = Readonly<{
  search: string;
  status: BookingStatusFilter;
  service: BookingServiceFilter;
  view: BookingView;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BookingStatusFilter) => void;
  onServiceChange: (value: BookingServiceFilter) => void;
  onViewChange: (view: BookingView) => void;
  onClear: () => void;
}>;

export function BookingsToolbar({
  search,
  status,
  service,
  view,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onServiceChange,
  onViewChange,
  onClear,
}: BookingsToolbarProps) {
  return (
    <div className="border-b border-border px-4 py-4 sm:px-5 lg:px-6">
      <div className="grid grid-cols-2 gap-3 min-[1200px]:grid-cols-12 min-[1400px]:grid-cols-[minmax(14rem,1fr)_9rem_11rem_11.5rem_13.5rem_auto]">
        <label className="relative col-span-2 block min-[1200px]:col-span-6 min-[1400px]:col-span-1">
          <span className="sr-only">Search by customer or service</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search customer or service"
            className="pl-9"
            type="search"
          />
        </label>

        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange(value as BookingStatusFilter)
          }
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter bookings by status"
          >
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={service}
          onValueChange={(value) =>
            onServiceChange(value as BookingServiceFilter)
          }
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter bookings by service"
          >
            <SelectValue placeholder="All services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All services</SelectItem>
            {bookingServices.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          className={cn(
            "col-span-2 justify-start px-3 font-medium disabled:opacity-100 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
            hasActiveFilters
              ? "min-[1200px]:col-span-5"
              : "min-[1200px]:col-span-6",
          )}
          disabled
          aria-label="Booking date range: May 12 through May 18"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          <span className="truncate text-[#48556d]">May 12 – May 18</span>
        </Button>

        <div
          className={cn(
            "col-span-2 grid h-10 grid-cols-2 rounded-xl border border-border-strong bg-[#f7f9fd] p-1 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
            hasActiveFilters
              ? "min-[1200px]:col-span-5"
              : "min-[1200px]:col-span-6",
          )}
          role="group"
          aria-label="Booking view"
        >
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              view === "list"
                ? "bg-surface text-[#1d63cd] shadow-[0_1px_4px_rgb(16_21_37/0.08)]"
                : "text-secondary hover:text-foreground",
            )}
            aria-pressed={view === "list"}
            onClick={() => onViewChange("list")}
          >
            <List className="size-4" aria-hidden="true" />
            List
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              view === "schedule"
                ? "bg-surface text-[#1d63cd] shadow-[0_1px_4px_rgb(16_21_37/0.08)]"
                : "text-secondary hover:text-foreground",
            )}
            aria-pressed={view === "schedule"}
            onClick={() => onViewChange("schedule")}
          >
            <CalendarRange className="size-4" aria-hidden="true" />
            Schedule
          </button>
        </div>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            className="col-span-2 px-2 min-[1200px]:col-span-2 min-[1400px]:col-span-1"
            onClick={onClear}
            aria-label="Clear booking filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "booking" : "bookings"} shown
      </p>
    </div>
  );
}
