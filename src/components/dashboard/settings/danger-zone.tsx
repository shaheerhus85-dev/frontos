"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, PlugZap, RotateCcw, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  dangerZoneActions,
  type DangerActionId,
  type DangerZoneAction,
} from "@/data/settings";

const icons = {
  "reset-workspace": RotateCcw,
  "disconnect-integrations": PlugZap,
} as const;

export function DangerZone({
  integrationsConnected,
  onConfirm,
}: Readonly<{
  integrationsConnected: boolean;
  onConfirm: (action: DangerActionId) => void;
}>) {
  const [selectedAction, setSelectedAction] = useState<DangerZoneAction | null>(
    null,
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  function confirmAction() {
    if (!selectedAction) return;
    onConfirm(selectedAction.id);
    setFeedback(
      selectedAction.id === "reset-workspace"
        ? "The demo workspace was reset locally; no persistent data was changed."
        : "All demo integrations were marked disconnected in this local preview; no external connection was changed.",
    );
    setSelectedAction(null);
  }

  return (
    <section
      className="mt-7 rounded-xl border border-[#efd6d9] bg-[#fffafa]"
      aria-labelledby="danger-zone-heading"
      data-testid="danger-zone"
    >
      <div className="border-b border-[#efdfe1] px-4 py-3.5 sm:px-5">
        <h4
          id="danger-zone-heading"
          className="flex items-center gap-2 font-display text-base font-semibold text-[#9c3545]"
        >
          <AlertTriangle className="size-4" aria-hidden="true" />
          Danger zone
        </h4>
        <p className="mt-1 text-[13px] leading-5 text-[#795e63]">
          These actions only demonstrate confirmation flows in local state.
        </p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-[#efdfe1] md:grid-cols-2 md:divide-x md:divide-y-0">
        {dangerZoneActions.map((action) => {
          const Icon = icons[action.id];
          const disconnected =
            action.id === "disconnect-integrations" && !integrationsConnected;
          return (
            <div key={action.id} className="flex min-w-0 flex-col p-4 sm:p-5">
              <div className="flex min-w-0 gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#fff0f2] text-[#c34558]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#61363e]">
                    {action.label}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-[#795e63]">
                    {action.description}
                  </p>
                  {disconnected ? (
                    <span className="mt-2 inline-flex rounded-full bg-[#f5e9eb] px-2 py-0.5 text-xs font-semibold text-[#9c3545]">
                      Demo integrations disconnected
                    </span>
                  ) : null}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 h-auto min-h-10 w-full border-[#e8c7cc] py-2 text-center whitespace-normal text-[#a33c4c] hover:border-[#deaeb6] hover:bg-[#fff1f3] sm:w-fit"
                disabled={disconnected}
                onClick={() => setSelectedAction(action)}
              >
                {action.label}
              </Button>
            </div>
          );
        })}
      </div>
      <p
        data-testid="danger-feedback"
        className="min-h-5 border-t border-[#efdfe1] px-4 py-2 text-xs font-medium text-[#8f4652] sm:px-5"
        role="status"
        aria-live="polite"
      >
        {feedback}
      </p>

      <DialogPrimitive.Root
        open={Boolean(selectedAction)}
        onOpenChange={(open) => {
          if (!open) setSelectedAction(null);
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#101525]/35 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            data-testid="danger-confirmation-dialog"
            className="fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-5 shadow-raised outline-none sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff0f2] text-[#c34558]">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 pr-7">
                <DialogPrimitive.Title className="font-display text-lg font-semibold tracking-tight text-[#2d1d21]">
                  {selectedAction?.confirmationTitle}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2 text-sm leading-6 text-secondary">
                  {selectedAction?.confirmationDescription}
                </DialogPrimitive.Description>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <DialogPrimitive.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogPrimitive.Close>
              <Button
                className="bg-[#c34558] shadow-[0_6px_16px_rgb(195_69_88/0.16)] hover:bg-[#ad3547]"
                onClick={confirmAction}
              >
                {selectedAction?.confirmLabel}
              </Button>
            </div>
            <DialogPrimitive.Close
              className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-muted outline-none hover:bg-surface-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/20"
              aria-label="Close confirmation dialog"
            >
              <X className="size-4" aria-hidden="true" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
