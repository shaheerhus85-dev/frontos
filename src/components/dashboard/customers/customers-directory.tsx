"use client";

import { Building2, ChevronRight, Clock3 } from "lucide-react";

import { CustomerHealthBadge } from "@/components/dashboard/customers/customer-health-badge";
import { CustomerSegmentBadge } from "@/components/dashboard/customers/customer-segment-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CustomerRecord } from "@/data/customers";

type CustomersDirectoryProps = Readonly<{
  customers: readonly CustomerRecord[];
  onSelect: (customer: CustomerRecord) => void;
}>;

function formatValue(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function CustomersDirectory({
  customers,
  onSelect,
}: CustomersDirectoryProps) {
  if (customers.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold text-foreground">
            No customers found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try a different name, segment, service, or assigned agent.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden overflow-hidden md:block"
        data-testid="customers-table"
      >
        <table className="w-full table-auto border-collapse text-left">
          <caption className="sr-only">
            Customer directory, relationship health, and service history
          </caption>
          <thead className="bg-[#fafbfe] text-[10px] font-semibold tracking-[0.04em] text-muted uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 lg:px-5">
                Customer
              </th>
              <th
                scope="col"
                className="hidden px-2.5 py-3 min-[1400px]:table-cell"
              >
                Contact
              </th>
              <th
                scope="col"
                className="hidden px-2.5 py-3 min-[1400px]:table-cell"
              >
                Company
              </th>
              <th
                scope="col"
                className="hidden px-2.5 py-3 min-[1200px]:table-cell"
              >
                Primary service
              </th>
              <th scope="col" className="px-2.5 py-3">
                Total bookings
              </th>
              <th scope="col" className="px-2.5 py-3">
                Lifetime value
              </th>
              <th
                scope="col"
                className="hidden px-2.5 py-3 min-[1400px]:table-cell"
              >
                Last activity
              </th>
              <th
                scope="col"
                className="hidden px-2.5 py-3 min-[1200px]:table-cell"
              >
                Health
              </th>
              <th scope="col" className="px-2.5 py-3">
                Segment
              </th>
              <th scope="col" className="w-12 px-2.5 py-3 text-right">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                data-testid={`customer-row-${customer.id}`}
                className="group transition-colors focus-within:bg-[#f7f9fd] hover:bg-[#fafbfe]"
              >
                <td className="px-4 py-4 lg:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar fallback={customer.initials} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#182136]">
                        {customer.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted min-[1200px]:hidden">
                        {customer.primaryService}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden max-w-40 px-2.5 py-4 min-[1400px]:table-cell">
                  <p className="truncate text-xs font-medium text-[#3c4961]">
                    {customer.email}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted">
                    {customer.phone}
                  </p>
                </td>
                <td className="hidden max-w-32 px-2.5 py-4 min-[1400px]:table-cell">
                  <span className="block truncate text-xs font-medium text-[#48556d]">
                    {customer.company}
                  </span>
                </td>
                <td className="hidden max-w-36 px-2.5 py-4 min-[1200px]:table-cell">
                  <span className="block truncate text-xs font-medium text-[#344057]">
                    {customer.primaryService}
                  </span>
                </td>
                <td className="px-2.5 py-4 text-sm font-semibold whitespace-nowrap text-[#344057]">
                  {customer.totalBookings}
                </td>
                <td className="px-2.5 py-4 text-sm font-semibold whitespace-nowrap text-[#27334a]">
                  {formatValue(customer.lifetimeValue)}
                </td>
                <td className="hidden px-2.5 py-4 text-xs whitespace-nowrap text-secondary min-[1400px]:table-cell">
                  {customer.lastActivity}
                </td>
                <td className="hidden px-2.5 py-4 min-[1200px]:table-cell">
                  <CustomerHealthBadge health={customer.health} />
                </td>
                <td className="px-2.5 py-4">
                  <CustomerSegmentBadge segment={customer.segment} />
                </td>
                <td className="px-2.5 py-4 text-right">
                  <Button
                    variant="icon"
                    className="size-9"
                    onClick={() => onSelect(customer)}
                    aria-label={`View customer details for ${customer.name}`}
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

      <ul
        className="divide-y divide-border md:hidden"
        aria-label="Customer directory"
      >
        {customers.map((customer) => (
          <li key={customer.id} data-testid="mobile-customer-card">
            <button
              type="button"
              onClick={() => onSelect(customer)}
              className="w-full px-4 py-4 text-left transition-colors outline-none hover:bg-[#fafbfe] focus-visible:bg-[#f7f9fd] focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-5"
              aria-label={`View customer details for ${customer.name}`}
              aria-haspopup="dialog"
            >
              <span className="flex items-start gap-3">
                <Avatar fallback={customer.initials} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-[#182136]">
                        {customer.name}
                      </span>
                      <span className="mt-1 flex min-w-0 items-center gap-1 text-xs text-muted">
                        <Building2
                          className="size-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{customer.company}</span>
                      </span>
                    </span>
                    <CustomerSegmentBadge segment={customer.segment} />
                  </span>

                  <span className="mt-3 block truncate text-xs font-medium text-[#526078]">
                    {customer.primaryService}
                  </span>

                  <span className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-secondary">
                      {customer.totalBookings} bookings ·{" "}
                      <strong className="font-semibold text-[#344057]">
                        {formatValue(customer.lifetimeValue)}
                      </strong>
                    </span>
                    <CustomerHealthBadge health={customer.health} />
                  </span>

                  <span className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
                    <span className="inline-flex min-w-0 items-center gap-1.5">
                      <Clock3
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{customer.lastActivity}</span>
                    </span>
                    <ChevronRight
                      className="size-4 shrink-0"
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
