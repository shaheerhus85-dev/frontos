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
  freshnessStatuses,
  knowledgeCategories,
  knowledgeStatuses,
  type FreshnessStatus,
  type KnowledgeCategory,
  type KnowledgeStatus,
} from "@/data/knowledge-base";

export type CategoryFilter = "All" | KnowledgeCategory;
export type StatusFilter = "All" | KnowledgeStatus;
export type FreshnessFilter = "All" | FreshnessStatus;
export type KnowledgeSort =
  "recent" | "usage" | "confidence" | "priority" | "title";

type Props = Readonly<{
  search: string;
  category: CategoryFilter;
  status: StatusFilter;
  freshness: FreshnessFilter;
  sort: KnowledgeSort;
  resultCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
  onFreshnessChange: (value: FreshnessFilter) => void;
  onSortChange: (value: KnowledgeSort) => void;
  onClear: () => void;
}>;

export function KnowledgeToolbar(props: Props) {
  return (
    <div
      className="border-b border-border px-4 py-4 sm:px-5 lg:px-6"
      data-testid="knowledge-toolbar"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(15rem,1fr)_9.75rem_10.5rem_10.5rem_11rem_auto]">
        <label className="relative block sm:col-span-2 xl:col-span-1">
          <span className="sr-only">
            Search by article title, summary, tags, or owner
          </span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="Search knowledge"
            className="pl-9"
          />
        </label>
        <FilterSelect
          label="Filter articles by category"
          value={props.category}
          values={knowledgeCategories}
          allLabel="All categories"
          onChange={(v) => props.onCategoryChange(v as CategoryFilter)}
        />
        <FilterSelect
          label="Filter articles by status"
          value={props.status}
          values={knowledgeStatuses}
          allLabel="All statuses"
          onChange={(v) => props.onStatusChange(v as StatusFilter)}
        />
        <FilterSelect
          label="Filter articles by freshness"
          value={props.freshness}
          values={freshnessStatuses}
          allLabel="All freshness"
          onChange={(v) => props.onFreshnessChange(v as FreshnessFilter)}
        />
        <Select
          value={props.sort}
          onValueChange={(value) => props.onSortChange(value as KnowledgeSort)}
        >
          <SelectTrigger aria-label="Sort articles">
            <SelectValue placeholder="Recently updated" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently updated</SelectItem>
            <SelectItem value="usage">Most used</SelectItem>
            <SelectItem value="confidence">Highest confidence</SelectItem>
            <SelectItem value="priority">Review priority</SelectItem>
            <SelectItem value="title">Article title</SelectItem>
          </SelectContent>
        </Select>
        {props.hasActiveFilters ? (
          <Button
            variant="ghost"
            className="sm:col-span-2 xl:col-span-1 xl:px-2"
            onClick={props.onClear}
            aria-label="Clear knowledge filters"
          >
            <X className="size-4" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>
      <p className="mt-3 text-xs text-muted" role="status" aria-live="polite">
        {props.resultCount} {props.resultCount === 1 ? "article" : "articles"}{" "}
        shown
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
