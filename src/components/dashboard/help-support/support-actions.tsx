"use client";

import {
  ArrowRight,
  BookOpenText,
  Bot,
  Headphones,
  Wrench,
} from "lucide-react";

import type { SupportAction, SupportActionId } from "@/data/help-support";

const actionIcons = {
  documentation: BookOpenText,
  integrations: Wrench,
  "ai-setup": Bot,
  contact: Headphones,
} satisfies Record<SupportActionId, typeof BookOpenText>;

export function SupportActions({
  actions,
  onAction,
}: Readonly<{
  actions: readonly SupportAction[];
  onAction: (id: SupportActionId) => void;
}>) {
  return (
    <section aria-labelledby="quick-support-actions-heading">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2
            id="quick-support-actions-heading"
            className="font-display text-lg font-semibold tracking-tight text-[#182136]"
          >
            Quick support actions
          </h2>
          <p className="mt-1 text-sm text-secondary">
            Start with the most common operational support paths.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = actionIcons[action.id];
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action.id)}
              aria-label={action.title}
              className="group flex h-full min-h-[11.5rem] min-w-0 flex-col items-start rounded-2xl border border-border bg-surface p-5 text-left shadow-subtle transition-[border-color,box-shadow] duration-150 outline-none hover:border-[#bfd0ea] hover:shadow-[0_7px_18px_rgb(31_65_115/0.08)] focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-primary/20"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[#edf4ff] text-primary transition-colors group-hover:bg-[#e3eeff]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-sm font-semibold text-[#27334a]">
                {action.title}
              </span>
              <span className="mt-1 text-[13px] leading-5 text-[#5a687f]">
                {action.description}
              </span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-primary">
                {action.actionLabel}
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
