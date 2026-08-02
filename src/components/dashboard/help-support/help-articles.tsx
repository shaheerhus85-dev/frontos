"use client";

import { ChevronRight, Clock3, Search, ThumbsUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type {
  HelpArticle,
  HelpCategory,
  HelpCategoryId,
} from "@/data/help-support";

export type ArticleCategoryFilter = "all" | HelpCategoryId;

export function HelpArticles({
  articles,
  categories,
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onClear,
  onSelect,
}: Readonly<{
  articles: readonly HelpArticle[];
  categories: readonly HelpCategory[];
  category: ArticleCategoryFilter;
  query: string;
  onCategoryChange: (category: ArticleCategoryFilter) => void;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  onSelect: (article: HelpArticle) => void;
}>) {
  const categoryMap = new Map(categories.map((item) => [item.id, item.title]));
  const hasFilters = Boolean(query.trim()) || category !== "all";

  return (
    <Card
      id="popular-help-articles"
      data-testid="help-article-browser"
      className="min-w-0 overflow-hidden"
    >
      <CardHeader className="border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle className="text-lg">Popular help articles</CardTitle>
          <p className="mt-1 text-sm text-secondary">
            Search and filter practical guides for common operating questions.
          </p>
        </div>
        <span className="text-xs font-semibold text-muted">
          {articles.length} {articles.length === 1 ? "result" : "results"}
        </span>
      </CardHeader>
      <div className="grid gap-3 border-b border-border bg-[#fafbfe] p-4 sm:grid-cols-[minmax(0,1fr)_15rem_auto] sm:px-6">
        <div className="relative min-w-0">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Filter help articles"
            placeholder="Filter articles"
            className="pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as ArticleCategoryFilter)
          }
          aria-label="Article category"
          className="h-10 min-w-0 rounded-xl border border-border-strong bg-surface px-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.03)] outline-none hover:border-[#c7d0e2] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <Button
          variant="secondary"
          onClick={onClear}
          disabled={!hasFilters}
          className="w-full sm:w-auto"
        >
          <X className="size-4" aria-hidden="true" />
          Clear
        </Button>
      </div>
      <CardContent className="p-0">
        {articles.length ? (
          <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-y-0">
            {articles.map((article, index) => (
              <button
                key={article.id}
                type="button"
                onClick={() => onSelect(article)}
                aria-label={`Open article ${article.title}`}
                className={`group flex min-w-0 items-center gap-3 p-4 text-left transition-[background-color,box-shadow] outline-none hover:bg-[#f6f8fc] focus-visible:z-10 focus-visible:bg-[#f6f8fc] focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-inset sm:p-5 lg:min-h-[10.5rem] ${
                  index % 2 === 0 ? "lg:border-r lg:border-border" : ""
                } ${index >= 2 ? "lg:border-t lg:border-border" : ""}`}
              >
                <span className="flex h-full min-w-0 flex-1 flex-col">
                  <span className="text-xs font-semibold text-[#66748c]">
                    {categoryMap.get(article.categoryId)}
                  </span>
                  <span className="mt-1 block font-display text-sm leading-5 font-semibold text-[#27334a] group-hover:text-primary sm:text-base">
                    {article.title}
                  </span>
                  <span className="mt-1 [display:-webkit-box] block overflow-hidden text-[13px] leading-5 text-secondary [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {article.summary}
                  </span>
                  <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {article.readingTime}
                    </span>
                    <span>{article.updatedAt}</span>
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp className="size-3.5" aria-hidden="true" />
                      {article.helpfulCount} helpful
                    </span>
                  </span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-[#9aa5b8] transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="font-semibold text-[#344057]">No articles found</p>
            <p className="mt-1 text-sm text-secondary">
              Adjust the search or category filter to see more guidance.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={onClear}
            >
              Clear filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
