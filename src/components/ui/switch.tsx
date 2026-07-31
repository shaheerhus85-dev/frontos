"use client";

import { cn } from "@/lib/utils";

type SwitchProps = Omit<
  React.ComponentProps<"button">,
  "aria-checked" | "onChange" | "role"
> &
  Readonly<{
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }>;

export function Switch({
  checked,
  className,
  disabled = false,
  onCheckedChange,
  onClick,
  ...props
}: SwitchProps) {
  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onCheckedChange(!checked);
      }}
      className={cn(
        "group inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-shadow duration-150 outline-none focus-visible:ring-[3px] focus-visible:ring-primary/25 disabled:cursor-not-allowed",
        className,
      )}
    >
      <span
        data-slot="switch-track"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-150 ease-out",
          disabled
            ? "border-[#c8d0dc] bg-[#e8ebf1] opacity-80"
            : checked
              ? "border-primary bg-primary hover:bg-[#176bea]"
              : "border-[#b8c2d1] bg-[#cbd3df] hover:bg-[#bbc5d4]",
        )}
        aria-hidden="true"
      >
        <span
          data-slot="switch-thumb"
          className={cn(
            "absolute top-[calc(3px-1px)] left-[calc(3px-1px)] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgb(16_21_37/0.24)] transition-transform duration-150 ease-out",
            checked
              ? "translate-x-[calc(2.75rem-1.125rem-0.375rem)]"
              : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}
