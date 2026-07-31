"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function SettingsToggle({
  checked,
  compact = false,
  description,
  disabled = false,
  label,
  onCheckedChange,
  status,
}: Readonly<{
  checked: boolean;
  compact?: boolean;
  description?: string;
  disabled?: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  status?: string;
}>) {
  const control = (
    <Switch
      aria-label={label}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    />
  );

  if (compact) return control;

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#344057]">{label}</p>
        {description ? (
          <p className="mt-0.5 text-[13px] leading-5 text-secondary">
            {description}
          </p>
        ) : null}
        {status ? (
          <span className="mt-1.5 inline-flex rounded-full bg-[#f1f4fa] px-2 py-0.5 text-xs font-semibold text-[#687389]">
            {status}
          </span>
        ) : null}
      </div>
      {control}
    </div>
  );
}

export function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-border-strong bg-surface px-3 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.03)] transition-[border-color,box-shadow] outline-none hover:border-[#c7d0e2] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:border-[#d6dce7] disabled:bg-[#f1f3f7] disabled:text-[#687389] disabled:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function FieldLabel({
  children,
  htmlFor,
}: Readonly<{ children: React.ReactNode; htmlFor: string }>) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-semibold text-[#526078]"
    >
      {children}
    </label>
  );
}
