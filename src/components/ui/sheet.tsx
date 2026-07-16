"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[#101525]/35 transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

type SheetContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  closeLabel?: string;
  side?: "left" | "right";
};

export function SheetContent({
  children,
  className,
  closeLabel = "Close navigation",
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-y-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col bg-surface shadow-raised transition-transform duration-200 outline-none",
          side === "left"
            ? "left-0 border-r border-border data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0"
            : "right-0 border-l border-border data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-xl text-secondary transition-colors hover:bg-surface-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none"
          aria-label={closeLabel}
        >
          <X className="size-5 stroke-[1.8]" aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1.5 border-b border-border px-5 py-5",
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-display text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-secondary", className)}
      {...props}
    />
  );
}

export { Sheet, SheetClose, SheetTrigger };
