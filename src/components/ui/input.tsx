import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-border-strong bg-surface px-3 text-sm text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.03)] transition-[border-color,box-shadow] outline-none placeholder:text-muted hover:border-[#c7d0e2] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-surface-secondary disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
