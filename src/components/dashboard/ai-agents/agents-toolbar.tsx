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
  agentFunctions,
  agentStatuses,
  type AgentFunction,
  type AgentStatus,
} from "@/data/ai-agents";

export type AgentStatusFilter = "All" | AgentStatus;
export type AgentFunctionFilter = "All" | AgentFunction;
export type AgentSort = "performance" | "tasks" | "response" | "name";

type AgentsToolbarProps = Readonly<{
  search: string;
  status: AgentStatusFilter;
  agentFunction: AgentFunctionFilter;
  sort: AgentSort;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AgentStatusFilter) => void;
  onFunctionChange: (value: AgentFunctionFilter) => void;
  onSortChange: (value: AgentSort) => void;
  onClear: () => void;
}>;

export function AgentsToolbar({
  search,
  status,
  agentFunction,
  sort,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onFunctionChange,
  onSortChange,
  onClear,
}: AgentsToolbarProps) {
  return (
    <div
      className="border-b border-border px-4 py-4 sm:px-5 lg:px-6"
      data-testid="agents-toolbar"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(15rem,1fr)_10.5rem_12rem_11.5rem_auto]">
        <label className="relative block sm:col-span-2 xl:col-span-1">
          <span className="sr-only">
            Search by agent name, role, or responsibility
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search agents"
            className="pl-9"
          />
        </label>

        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as AgentStatusFilter)}
        >
          <SelectTrigger aria-label="Filter agents by status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All statuses</SelectItem>
            {agentStatuses.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={agentFunction}
          onValueChange={(value) =>
            onFunctionChange(value as AgentFunctionFilter)
          }
        >
          <SelectTrigger aria-label="Filter agents by function">
            <SelectValue placeholder="All functions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All functions</SelectItem>
            {agentFunctions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as AgentSort)}
        >
          <SelectTrigger aria-label="Sort agents">
            <SelectValue placeholder="Sort agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="tasks">Most Tasks</SelectItem>
            <SelectItem value="response">Response Time</SelectItem>
            <SelectItem value="name">Agent Name</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            className="sm:col-span-2 xl:col-span-1 xl:px-2"
            onClick={onClear}
            aria-label="Clear agent filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "agent" : "agents"} shown
      </p>
    </div>
  );
}
