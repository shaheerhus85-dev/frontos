"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  customerAgents,
  customerSegments,
  customerServices,
  type CustomerAgent,
  type CustomerSegment,
  type CustomerService,
} from "@/data/customers";
import { cn } from "@/lib/utils";

export type CustomerSegmentFilter = "All" | CustomerSegment;
export type CustomerServiceFilter = "All" | CustomerService;
export type CustomerAgentFilter = "All" | CustomerAgent;
export type CustomerSort = "recent" | "value" | "bookings" | "name";

type CustomersToolbarProps = Readonly<{
  search: string;
  segment: CustomerSegmentFilter;
  service: CustomerServiceFilter;
  agent: CustomerAgentFilter;
  sort: CustomerSort;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onSegmentChange: (value: CustomerSegmentFilter) => void;
  onServiceChange: (value: CustomerServiceFilter) => void;
  onAgentChange: (value: CustomerAgentFilter) => void;
  onSortChange: (value: CustomerSort) => void;
  onClear: () => void;
}>;

export function CustomersToolbar({
  search,
  segment,
  service,
  agent,
  sort,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onSegmentChange,
  onServiceChange,
  onAgentChange,
  onSortChange,
  onClear,
}: CustomersToolbarProps) {
  const secondRowSpan = hasActiveFilters
    ? "min-[1200px]:col-span-4"
    : "min-[1200px]:col-span-6";

  return (
    <div className="border-b border-border px-4 py-4 sm:px-5 lg:px-6">
      <div className="grid grid-cols-2 gap-3 min-[1200px]:grid-cols-12 min-[1400px]:grid-cols-[minmax(13rem,1fr)_9.5rem_10.5rem_10rem_11rem_auto]">
        <label className="relative col-span-2 block min-[1200px]:col-span-6 min-[1400px]:col-span-1">
          <span className="sr-only">
            Search customers by name, email, phone, or company
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search customers"
            className="pl-9"
            type="search"
          />
        </label>

        <Select
          value={segment}
          onValueChange={(value) =>
            onSegmentChange(value as CustomerSegmentFilter)
          }
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter customers by segment"
          >
            <SelectValue placeholder="All segments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All segments</SelectItem>
            {customerSegments.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={service}
          onValueChange={(value) =>
            onServiceChange(value as CustomerServiceFilter)
          }
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter customers by service"
          >
            <SelectValue placeholder="All services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All services</SelectItem>
            {customerServices.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={agent}
          onValueChange={(value) => onAgentChange(value as CustomerAgentFilter)}
        >
          <SelectTrigger
            className={cn(
              "col-span-2 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
              secondRowSpan,
            )}
            aria-label="Filter customers by assigned agent"
          >
            <SelectValue placeholder="All agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All agents</SelectItem>
            {customerAgents.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as CustomerSort)}
        >
          <SelectTrigger
            className={cn(
              "col-span-2 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
              secondRowSpan,
            )}
            aria-label="Sort customers"
          >
            <SelectValue placeholder="Sort customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent activity</SelectItem>
            <SelectItem value="value">Highest value</SelectItem>
            <SelectItem value="bookings">Most bookings</SelectItem>
            <SelectItem value="name">Customer name</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            className="col-span-2 px-2 min-[1200px]:col-span-4 min-[1400px]:col-span-1"
            onClick={onClear}
            aria-label="Clear customer filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "customer" : "customers"} shown
      </p>
    </div>
  );
}
