"use client";

import { useMemo, useState } from "react";

import { CallDetailSheet } from "@/components/dashboard/calls/call-detail-sheet";
import {
  CallFilters,
  type HandlerFilter,
  type StatusFilter,
} from "@/components/dashboard/calls/call-filters";
import { CallHistory } from "@/components/dashboard/calls/call-history";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { CallRecord } from "@/data/calls";

type CallsWorkspaceProps = Readonly<{
  calls: readonly CallRecord[];
}>;

export function CallsWorkspace({ calls }: CallsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [handler, setHandler] = useState<HandlerFilter>("All");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredCalls = useMemo(() => {
    const query = search.trim().toLowerCase();

    return calls.filter((call) => {
      const matchesSearch =
        query.length === 0 ||
        call.caller.toLowerCase().includes(query) ||
        call.phone.toLowerCase().includes(query);
      const matchesStatus = status === "All" || call.status === status;
      const matchesHandler = handler === "All" || call.handler === handler;

      return matchesSearch && matchesStatus && matchesHandler;
    });
  }, [calls, handler, search, status]);

  const hasActiveFilters =
    search.trim().length > 0 || status !== "All" || handler !== "All";

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setHandler("All");
  }

  function openCall(call: CallRecord) {
    setFeedback(null);
    setSelectedCall(call);
  }

  return (
    <>
      <Card className="min-w-0 overflow-hidden" data-testid="calls-workspace">
        <CardHeader className="flex-row items-end justify-between gap-4 pb-5">
          <div>
            <CardTitle>Call history</CardTitle>
            <p className="mt-1 text-sm text-secondary">
              Review recent conversations and the actions taken.
            </p>
          </div>
          <p className="hidden shrink-0 text-xs font-semibold text-muted sm:block">
            May 12 – May 18
          </p>
        </CardHeader>
        <CallFilters
          search={search}
          status={status}
          handler={handler}
          resultCount={filteredCalls.length}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onHandlerChange={setHandler}
          onClear={clearFilters}
        />
        <CallHistory calls={filteredCalls} onSelect={openCall} />
      </Card>

      <CallDetailSheet
        call={selectedCall}
        feedback={feedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCall(null);
            setFeedback(null);
          }
        }}
        onAction={setFeedback}
      />
    </>
  );
}
