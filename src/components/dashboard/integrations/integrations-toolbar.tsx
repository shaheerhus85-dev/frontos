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
  integrationCategories,
  integrationHealthStatuses,
  integrationStatuses,
  type IntegrationCategory,
  type IntegrationHealth,
  type IntegrationStatus,
} from "@/data/integrations";

export type IntegrationStatusFilter = "All" | IntegrationStatus;
export type IntegrationCategoryFilter = "All" | IntegrationCategory;
export type IntegrationHealthFilter = "All" | IntegrationHealth;
export type IntegrationSort = "recent" | "health" | "automations" | "name";

type Props = Readonly<{
  search: string;
  status: IntegrationStatusFilter;
  category: IntegrationCategoryFilter;
  health: IntegrationHealthFilter;
  sort: IntegrationSort;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: IntegrationStatusFilter) => void;
  onCategoryChange: (value: IntegrationCategoryFilter) => void;
  onHealthChange: (value: IntegrationHealthFilter) => void;
  onSortChange: (value: IntegrationSort) => void;
  onClear: () => void;
}>;

export function IntegrationsToolbar(props: Props) {
  return (
    <div
      className="border-b border-border px-4 py-4 sm:px-5 lg:px-6"
      data-testid="integrations-toolbar"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(14rem,1fr)_10.5rem_10rem_9.5rem_11rem_auto]">
        <label className="relative block sm:col-span-2 xl:col-span-1">
          <span className="sr-only">
            Search integrations by name, purpose, or category
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="Search integrations"
            className="pl-9"
          />
        </label>
        <FilterSelect
          label="Filter integrations by status"
          value={props.status}
          values={integrationStatuses}
          allLabel="All statuses"
          onChange={(value) =>
            props.onStatusChange(value as IntegrationStatusFilter)
          }
        />
        <FilterSelect
          label="Filter integrations by category"
          value={props.category}
          values={integrationCategories}
          allLabel="All categories"
          onChange={(value) =>
            props.onCategoryChange(value as IntegrationCategoryFilter)
          }
        />
        <FilterSelect
          label="Filter integrations by health"
          value={props.health}
          values={integrationHealthStatuses}
          allLabel="All health"
          onChange={(value) =>
            props.onHealthChange(value as IntegrationHealthFilter)
          }
        />
        <Select
          value={props.sort}
          onValueChange={(value) =>
            props.onSortChange(value as IntegrationSort)
          }
        >
          <SelectTrigger aria-label="Sort integrations">
            <SelectValue placeholder="Recent activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent activity</SelectItem>
            <SelectItem value="health">Integration health</SelectItem>
            <SelectItem value="automations">Automation count</SelectItem>
            <SelectItem value="name">Integration name</SelectItem>
          </SelectContent>
        </Select>
        {props.hasActiveFilters ? (
          <Button
            variant="ghost"
            className="sm:col-span-2 xl:col-span-1 xl:px-2"
            onClick={props.onClear}
            aria-label="Clear integration filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>
      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {props.resultCount}{" "}
        {props.resultCount === 1 ? "integration" : "integrations"} shown
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  values,
  allLabel,
  onChange,
}: Readonly<{
  label: string;
  value: string;
  values: readonly string[];
  allLabel: string;
  onChange: (value: string) => void;
}>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder={allLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">{allLabel}</SelectItem>
        {values.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
