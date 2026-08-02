"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Link2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getHelpCategory, type HelpArticle } from "@/data/help-support";

export function ArticleDetailSheet({
  article,
  articles,
  feedback,
  onFeedback,
  onOpenChange,
  onSelectRelated,
}: Readonly<{
  article: HelpArticle | null;
  articles: readonly HelpArticle[];
  feedback: string | null;
  onFeedback: (feedback: string | null) => void;
  onOpenChange: (open: boolean) => void;
  onSelectRelated: (article: HelpArticle) => void;
}>) {
  const category = article ? getHelpCategory(article.categoryId) : null;
  const relatedArticles = article
    ? article.relatedArticleIds
        .map((id) => articles.find((item) => item.id === id))
        .filter((item): item is HelpArticle => Boolean(item))
    : [];

  function copyArticleLink(selectedArticle: HelpArticle) {
    const link = `${window.location.origin}/help-support?article=${selectedArticle.id}`;
    void navigator.clipboard?.writeText(link).catch(() => undefined);
    onFeedback("Article link copied.");
  }

  return (
    <Sheet open={Boolean(article)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        closeLabel="Close help article"
        className="w-full max-w-none sm:w-[min(44rem,calc(100vw-2rem))]"
        data-testid="help-article-sheet"
      >
        {article ? (
          <>
            <SheetHeader className="pr-16">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold">
                <span className="rounded-full bg-[#edf4ff] px-2.5 py-1 text-primary">
                  {category?.title}
                </span>
                <span className="inline-flex items-center gap-1 text-muted">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  Updated {article.updatedAt}
                </span>
                <span className="inline-flex items-center gap-1 text-muted">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {article.readingTime}
                </span>
              </div>
              <SheetTitle className="mt-1 leading-6">
                {article.title}
              </SheetTitle>
              <SheetDescription>{article.summary}</SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-6 sm:px-6">
              <div className="rounded-2xl border border-[#d9e4fb] bg-[#f5f8ff] p-4 text-sm leading-6 text-[#52627d]">
                Use this FrontOS workspace guidance to review configuration,
                operating context, and recommended next steps.
              </div>

              <section className="mt-6" aria-labelledby="article-steps-heading">
                <h3
                  id="article-steps-heading"
                  className="font-display text-base font-semibold text-[#27334a]"
                >
                  Step-by-step guidance
                </h3>
                <ol className="mt-3 space-y-3">
                  {article.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex gap-3 rounded-2xl border border-border bg-[#fafbfe] p-4"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[#344057]">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-secondary">
                          {step.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section
                className="mt-6"
                aria-labelledby="related-articles-heading"
              >
                <h3
                  id="related-articles-heading"
                  className="flex items-center gap-2 font-display text-base font-semibold text-[#27334a]"
                >
                  <Link2 className="size-4 text-violet" aria-hidden="true" />
                  Related articles
                </h3>
                <div className="mt-3 grid gap-2">
                  {relatedArticles.map((related) => (
                    <button
                      key={related.id}
                      type="button"
                      onClick={() => {
                        onFeedback(null);
                        onSelectRelated(related);
                      }}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 text-left text-sm font-semibold text-[#40506a] transition-colors outline-none hover:border-[#c9d7ee] hover:bg-[#f7f9fd] hover:text-primary focus-visible:ring-3 focus-visible:ring-primary/20"
                    >
                      {related.title}
                      <Link2 className="size-4 shrink-0" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <footer className="shrink-0 border-t border-border bg-surface px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
              <p className="mb-2 text-xs font-semibold text-[#687389]">
                Was this article helpful?
              </p>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onFeedback("Thanks — this article was marked helpful.")
                  }
                >
                  <ThumbsUp className="size-4" aria-hidden="true" />
                  Helpful
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onFeedback("Thanks — improvement feedback was recorded.")
                  }
                >
                  <ThumbsDown className="size-4" aria-hidden="true" />
                  Not helpful
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="col-span-2"
                  onClick={() => copyArticleLink(article)}
                >
                  <Copy className="size-4" aria-hidden="true" />
                  Copy article link
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="col-span-2 sm:ml-auto"
                  >
                    Close
                  </Button>
                </SheetClose>
              </div>
              <p
                className="mt-3 min-h-5 text-xs font-medium text-[#39745f]"
                role="status"
                aria-live="polite"
                data-testid="article-feedback"
              >
                {feedback ? (
                  <span className="inline-flex items-start gap-1.5">
                    <CheckCircle2
                      className="mt-0.5 size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {feedback}
                  </span>
                ) : null}
              </p>
            </footer>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
