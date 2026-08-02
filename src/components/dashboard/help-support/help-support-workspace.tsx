"use client";

import { CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";

import { ArticleDetailSheet } from "@/components/dashboard/help-support/article-detail-sheet";
import {
  HelpArticles,
  type ArticleCategoryFilter,
} from "@/components/dashboard/help-support/help-articles";
import { HelpCategories } from "@/components/dashboard/help-support/help-categories";
import { SupportActions } from "@/components/dashboard/help-support/support-actions";
import {
  SupportActivity,
  SupportGuidance,
} from "@/components/dashboard/help-support/support-activity";
import { SupportRequestPanel } from "@/components/dashboard/help-support/support-request-panel";
import { SupportSearch } from "@/components/dashboard/help-support/support-search";
import { WorkspaceHealth } from "@/components/dashboard/help-support/workspace-health";
import {
  helpArticles,
  helpCategories,
  recentSupportActivity,
  suggestedSearches,
  supportActions,
  workspaceHealthMetrics,
  type HelpArticle,
  type HelpCategory,
  type SuggestedSearch,
  type SupportActionId,
  type SupportActivityItem,
} from "@/data/help-support";

function matchesSearch(values: readonly string[], query: string) {
  const normalized = query.trim().toLowerCase();
  return (
    !normalized ||
    values.some((value) => value.toLowerCase().includes(normalized))
  );
}

function scrollToArticles() {
  window.setTimeout(() => {
    document
      .getElementById("popular-help-articles")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);
}

export function HelpSupportWorkspace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategoryFilter>("all");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null,
  );
  const [articleFeedback, setArticleFeedback] = useState<string | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [workspaceFeedback, setWorkspaceFeedback] = useState<string | null>(
    null,
  );
  const [activity, setActivity] = useState<SupportActivityItem[]>([
    ...recentSupportActivity,
  ]);

  const filteredArticles = useMemo(
    () =>
      helpArticles.filter(
        (article) =>
          (category === "all" || article.categoryId === category) &&
          matchesSearch(
            [article.title, article.summary, ...article.tags],
            query,
          ),
      ),
    [category, query],
  );

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return helpCategories;
    return helpCategories.filter((item) =>
      matchesSearch(
        [
          item.title,
          item.description,
          ...item.featuredArticles,
          ...helpArticles
            .filter((article) => article.categoryId === item.id)
            .flatMap((article) => [
              article.title,
              article.summary,
              ...article.tags,
            ]),
        ],
        query,
      ),
    );
  }, [query]);

  const selectedArticle =
    helpArticles.find((article) => article.id === selectedArticleId) ?? null;

  function changeSearch(nextQuery: string) {
    setQuery(nextQuery);
    setCategory("all");
    setWorkspaceFeedback(null);
  }

  function selectSuggestion(suggestion: SuggestedSearch) {
    setQuery(suggestion.query);
    setCategory("all");
    setWorkspaceFeedback(`Showing guidance for “${suggestion.label}”.`);
    scrollToArticles();
  }

  function selectCategory(selectedCategory: HelpCategory) {
    setQuery("");
    setCategory(selectedCategory.id);
    setWorkspaceFeedback(`Showing ${selectedCategory.title} articles.`);
    scrollToArticles();
  }

  function selectArticle(article: HelpArticle) {
    setSelectedArticleId(article.id);
    setArticleFeedback(null);
  }

  function handleSupportAction(id: SupportActionId) {
    if (id === "contact") {
      setSupportOpen(true);
      setWorkspaceFeedback(null);
      return;
    }

    if (id === "integrations") {
      setQuery("integration");
      setCategory("all");
      setWorkspaceFeedback(
        "Integration troubleshooting guidance is ready below.",
      );
    } else if (id === "ai-setup") {
      setQuery("");
      setCategory("ai-agents");
      setWorkspaceFeedback("AI agent setup guidance is filtered below.");
    } else {
      setQuery("");
      setCategory("all");
      setWorkspaceFeedback("The complete article browser is ready below.");
    }
    scrollToArticles();
  }

  function handleSupportSubmitted(reference: string) {
    setWorkspaceFeedback(
      `Support request ${reference} was created in this local preview.`,
    );
    setActivity((current) => [
      {
        id: `request-${reference}`,
        title: `Support request ${reference} prepared`,
        detail: "Request details were added to recent support activity",
        time: "Just now",
        tone: "info",
      },
      ...current.filter((item) => item.id !== `request-${reference}`),
    ]);
  }

  return (
    <>
      <div className="space-y-5 lg:space-y-6">
        <SupportSearch
          query={query}
          resultCount={filteredArticles.length}
          suggestions={suggestedSearches}
          onQueryChange={changeSearch}
          onSuggestionSelect={selectSuggestion}
        />

        <SupportActions
          actions={supportActions}
          onAction={handleSupportAction}
        />

        <p
          data-testid="support-workspace-feedback"
          className="min-h-5 text-xs font-medium text-[#39745f]"
          role="status"
          aria-live="polite"
        >
          {workspaceFeedback ? (
            <span className="inline-flex items-start gap-1.5">
              <CheckCircle2
                className="mt-0.5 size-3.5 shrink-0"
                aria-hidden="true"
              />
              {workspaceFeedback}
            </span>
          ) : null}
        </p>

        <WorkspaceHealth metrics={workspaceHealthMetrics} />

        <HelpCategories
          categories={filteredCategories}
          onSelect={selectCategory}
        />

        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.75fr)] xl:gap-6">
          <HelpArticles
            articles={filteredArticles}
            categories={helpCategories}
            category={category}
            query={query}
            onCategoryChange={(nextCategory) => {
              setCategory(nextCategory);
              setWorkspaceFeedback(null);
            }}
            onQueryChange={changeSearch}
            onClear={() => {
              setQuery("");
              setCategory("all");
              setWorkspaceFeedback(null);
            }}
            onSelect={selectArticle}
          />
          <div className="min-w-0 space-y-5 xl:sticky xl:top-5 xl:self-start">
            <SupportActivity items={activity} />
            <SupportGuidance />
          </div>
        </div>
      </div>

      <ArticleDetailSheet
        article={selectedArticle}
        articles={helpArticles}
        feedback={articleFeedback}
        onFeedback={setArticleFeedback}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedArticleId(null);
            setArticleFeedback(null);
          }
        }}
        onSelectRelated={selectArticle}
      />

      <SupportRequestPanel
        open={supportOpen}
        onOpenChange={setSupportOpen}
        onSubmitted={handleSupportSubmitted}
      />
    </>
  );
}
