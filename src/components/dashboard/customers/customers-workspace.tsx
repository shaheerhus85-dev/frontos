"use client";

import { useMemo, useState } from "react";

import { CustomerDetailSheet } from "@/components/dashboard/customers/customer-detail-sheet";
import { CustomersDirectory } from "@/components/dashboard/customers/customers-directory";
import {
  CustomersToolbar,
  type CustomerAgentFilter,
  type CustomerSegmentFilter,
  type CustomerServiceFilter,
  type CustomerSort,
} from "@/components/dashboard/customers/customers-toolbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerRecord } from "@/data/customers";

type CustomersWorkspaceProps = Readonly<{
  customers: readonly CustomerRecord[];
}>;

export function CustomersWorkspace({ customers }: CustomersWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<CustomerSegmentFilter>("All");
  const [service, setService] = useState<CustomerServiceFilter>("All");
  const [agent, setAgent] = useState<CustomerAgentFilter>("All");
  const [sort, setSort] = useState<CustomerSort>("recent");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const visibleCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = customers.filter((customer) => {
      const matchesSearch =
        query.length === 0 ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query);
      const matchesSegment = segment === "All" || customer.segment === segment;
      const matchesService =
        service === "All" || customer.primaryService === service;
      const matchesAgent = agent === "All" || customer.agent === agent;

      return matchesSearch && matchesSegment && matchesService && matchesAgent;
    });

    return [...filtered].sort((first, second) => {
      if (sort === "value") {
        return second.lifetimeValue - first.lifetimeValue;
      }

      if (sort === "bookings") {
        return second.totalBookings - first.totalBookings;
      }

      if (sort === "name") {
        return first.name.localeCompare(second.name);
      }

      return first.activityOrder - second.activityOrder;
    });
  }, [agent, customers, search, segment, service, sort]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    segment !== "All" ||
    service !== "All" ||
    agent !== "All";

  function clearFilters() {
    setSearch("");
    setSegment("All");
    setService("All");
    setAgent("All");
  }

  function openCustomer(customer: CustomerRecord) {
    setFeedback(null);
    setSelectedCustomer(customer);
  }

  return (
    <>
      <Card
        className="min-w-0 overflow-hidden"
        data-testid="customers-workspace"
      >
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Customer directory</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Review relationship health, service activity, and customer value.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            {customers.length} customer profiles
          </p>
        </CardHeader>

        <CustomersToolbar
          search={search}
          segment={segment}
          service={service}
          agent={agent}
          sort={sort}
          resultCount={visibleCustomers.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onSegmentChange={setSegment}
          onServiceChange={setService}
          onAgentChange={setAgent}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        <CustomersDirectory
          customers={visibleCustomers}
          onSelect={openCustomer}
        />
      </Card>

      <CustomerDetailSheet
        customer={selectedCustomer}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCustomer(null);
            setFeedback(null);
          }
        }}
        onAction={setFeedback}
      />
    </>
  );
}
