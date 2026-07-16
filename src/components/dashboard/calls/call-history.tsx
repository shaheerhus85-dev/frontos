"use client";

import { Bot, ChevronRight, UserRound } from "lucide-react";

import { CallStatusBadge } from "@/components/dashboard/calls/call-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CallRecord } from "@/data/calls";

type CallHistoryProps = Readonly<{
  calls: readonly CallRecord[];
  onSelect: (call: CallRecord) => void;
}>;

function Handler({ handler }: Readonly<{ handler: CallRecord["handler"] }>) {
  const Icon = handler === "AI Agent" ? Bot : UserRound;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-[#48556d]">
      <Icon className="size-4 text-muted" aria-hidden="true" />
      {handler}
    </span>
  );
}

export function CallHistory({ calls, onSelect }: CallHistoryProps) {
  if (calls.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center px-6 py-12 text-center">
        <div>
          <p className="font-display text-base font-semibold text-foreground">
            No calls found
          </p>
          <p className="mt-1 text-sm text-secondary">
            Try a different caller, phone number, status, or handler.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden overflow-hidden md:block"
        data-testid="call-history-table"
      >
        <table className="w-full table-auto border-collapse text-left">
          <caption className="sr-only">
            Call history for May 12 through May 18
          </caption>
          <thead className="bg-[#fafbfe] text-[11px] font-semibold tracking-[0.04em] text-muted uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 lg:px-6">
                Caller
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Phone
              </th>
              <th scope="col" className="px-3 py-3">
                Date / time
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Duration
              </th>
              <th scope="col" className="px-3 py-3">
                Handler
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Intent
              </th>
              <th scope="col" className="hidden px-3 py-3 xl:table-cell">
                Outcome
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
              <th scope="col" className="w-14 px-3 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {calls.map((call) => (
              <tr
                key={call.id}
                data-testid={`call-row-${call.id}`}
                className="group transition-colors hover:bg-[#fafbfe]"
              >
                <td className="px-5 py-4 lg:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar fallback={call.initials} size="sm" />
                    <span className="min-w-0 truncate text-sm font-semibold text-[#182136]">
                      {call.caller}
                    </span>
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-secondary xl:table-cell">
                  {call.phone}
                </td>
                <td className="px-3 py-4">
                  <span className="block text-sm whitespace-nowrap text-[#48556d]">
                    {call.date.replace(", 2026", "")}
                  </span>
                  <span className="mt-0.5 block text-xs whitespace-nowrap text-muted">
                    {call.time}
                  </span>
                </td>
                <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-secondary xl:table-cell">
                  {call.duration}
                </td>
                <td className="px-3 py-4">
                  <Handler handler={call.handler} />
                </td>
                <td className="hidden max-w-40 px-3 py-4 text-sm text-secondary xl:table-cell">
                  <span className="block truncate">{call.intent}</span>
                </td>
                <td className="hidden max-w-44 px-3 py-4 text-sm text-secondary xl:table-cell">
                  <span className="block truncate">{call.outcome}</span>
                </td>
                <td className="px-3 py-4">
                  <CallStatusBadge status={call.status} />
                </td>
                <td className="px-3 py-4 text-right">
                  <Button
                    variant="icon"
                    className="size-9"
                    onClick={() => onSelect(call)}
                    aria-label={`View call details for ${call.caller}`}
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
        aria-label="Call history"
      >
        {calls.map((call) => (
          <li key={call.id} data-testid="mobile-call-card">
            <button
              type="button"
              onClick={() => onSelect(call)}
              className="w-full px-4 py-4 text-left transition-colors outline-none hover:bg-[#fafbfe] focus-visible:bg-[#f7f9fd] focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-5"
              aria-label={`View call details for ${call.caller}`}
              aria-haspopup="dialog"
            >
              <span className="flex items-start gap-3">
                <Avatar fallback={call.initials} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#182136]">
                      {call.caller}
                    </span>
                    <CallStatusBadge status={call.status} />
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {call.phone}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3 text-xs text-secondary">
                    <span className="truncate">
                      {call.date.replace(", 2026", "")} · {call.time}
                    </span>
                    <span className="shrink-0">{call.duration}</span>
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3">
                    <Handler handler={call.handler} />
                    <ChevronRight
                      className="size-4 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 block truncate text-xs text-secondary">
                    {call.outcome}
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
