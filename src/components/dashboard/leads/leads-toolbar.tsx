"use client";

import { Columns3, List, Search, X } from "lucide-react";

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
  leadAgents,
  leadSources,
  leadStages,
  type LeadAgent,
  type LeadSource,
  type LeadStage,
} from "@/data/leads";
import { cn } from "@/lib/utils";

export type LeadStageFilter = "All" | LeadStage;
export type LeadSourceFilter = "All" | LeadSource;
export type LeadAgentFilter = "All" | LeadAgent;
export type LeadsView = "pipeline" | "list";

type LeadsToolbarProps = Readonly<{
  search: string;
  stage: LeadStageFilter;
  source: LeadSourceFilter;
  agent: LeadAgentFilter;
  view: LeadsView;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStageChange: (value: LeadStageFilter) => void;
  onSourceChange: (value: LeadSourceFilter) => void;
  onAgentChange: (value: LeadAgentFilter) => void;
  onViewChange: (view: LeadsView) => void;
  onClear: () => void;
}>;

export function LeadsToolbar({
  search,
  stage,
  source,
  agent,
  view,
  resultCount,
  hasActiveFilters,
  onSearchChange,
  onStageChange,
  onSourceChange,
  onAgentChange,
  onViewChange,
  onClear,
}: LeadsToolbarProps) {
  const secondRowSpan = hasActiveFilters
    ? "min-[1200px]:col-span-5"
    : "min-[1200px]:col-span-6";

  return (
    <div className="border-b border-border px-4 py-4 sm:px-5 lg:px-6">
      <div className="grid grid-cols-2 gap-3 min-[1200px]:grid-cols-12 min-[1400px]:grid-cols-[minmax(14rem,1fr)_8.5rem_9rem_10.5rem_13.5rem_auto]">
        <label className="relative col-span-2 block min-[1200px]:col-span-6 min-[1400px]:col-span-1">
          <span className="sr-only">
            Search by lead name, company, email, or phone
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search leads or contact details"
            className="pl-9"
            type="search"
          />
        </label>

        <Select
          value={stage}
          onValueChange={(value) => onStageChange(value as LeadStageFilter)}
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter leads by stage"
          >
            <SelectValue placeholder="All stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All stages</SelectItem>
            {leadStages.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={source}
          onValueChange={(value) => onSourceChange(value as LeadSourceFilter)}
        >
          <SelectTrigger
            className="min-[1200px]:col-span-3 min-[1400px]:col-span-1"
            aria-label="Filter leads by source"
          >
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All sources</SelectItem>
            {leadSources.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={agent}
          onValueChange={(value) => onAgentChange(value as LeadAgentFilter)}
        >
          <SelectTrigger
            className={cn(
              "col-span-2 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
              secondRowSpan,
            )}
            aria-label="Filter leads by assigned agent"
          >
            <SelectValue placeholder="All agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All agents</SelectItem>
            {leadAgents.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div
          className={cn(
            "col-span-2 grid h-10 grid-cols-2 rounded-xl border border-border-strong bg-[#f7f9fd] p-1 min-[1400px]:col-span-1 sm:max-[1199px]:col-span-1",
            secondRowSpan,
          )}
          role="group"
          aria-label="Leads view"
        >
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              view === "pipeline"
                ? "bg-surface text-[#1d63cd] shadow-[0_1px_4px_rgb(16_21_37/0.08)]"
                : "text-secondary hover:text-foreground",
            )}
            aria-pressed={view === "pipeline"}
            onClick={() => onViewChange("pipeline")}
          >
            <Columns3 className="size-4" aria-hidden="true" />
            Pipeline
          </button>
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
        </div>

        {hasActiveFilters ? (
          <Button
            variant="ghost"
            className="col-span-2 px-2 min-[1200px]:col-span-2 min-[1400px]:col-span-1"
            onClick={onClear}
            aria-label="Clear lead filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "lead" : "leads"} shown
      </p>
    </div>
  );
}
