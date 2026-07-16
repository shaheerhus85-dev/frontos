"use client";

import { CalendarDays, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CallHandler, CallStatus } from "@/data/calls";

export type StatusFilter = "All" | CallStatus;
export type HandlerFilter = "All" | CallHandler;

type CallFiltersProps = Readonly<{
  search: string;
  status: StatusFilter;
  handler: HandlerFilter;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onHandlerChange: (value: HandlerFilter) => void;
  onClear: () => void;
}>;

export function CallFilters({
  search,
  status,
  handler,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onHandlerChange,
  onClear,
}: CallFiltersProps) {
  return (
    <div className="border-b border-border px-4 py-4 sm:px-5 lg:px-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(14rem,1fr)_11rem_11rem_auto_auto]">
        <label className="relative col-span-2 block lg:col-span-1">
          <span className="sr-only">Search calls by caller or phone</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search caller or phone"
            className="pl-9"
            type="search"
          />
        </label>

        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger aria-label="Filter calls by status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Escalated">Escalated</SelectItem>
            <SelectItem value="Missed">Missed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={handler}
          onValueChange={(value) => onHandlerChange(value as HandlerFilter)}
        >
          <SelectTrigger aria-label="Filter calls by handler">
            <SelectValue placeholder="All handlers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All handlers</SelectItem>
            <SelectItem value="AI Agent">AI Agent</SelectItem>
            <SelectItem value="Human Agent">Human Agent</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          className="col-span-1 justify-start px-3 font-medium disabled:opacity-100 lg:min-w-40"
          disabled
          aria-label="Call date range: May 12 through May 18"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          <span className="truncate text-[#48556d]">May 12 – May 18</span>
        </Button>

        <Button
          variant="ghost"
          className="col-span-1 px-2"
          onClick={onClear}
          disabled={!hasActiveFilters}
          aria-label="Clear call filters"
        >
          <X className="size-4" aria-hidden="true" />
          Clear
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "call" : "calls"} shown
      </p>
    </div>
  );
}
