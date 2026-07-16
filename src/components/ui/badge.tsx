import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        neutral: "border-border bg-surface-secondary text-secondary",
        info: "border-[#cfe0ff] bg-[#edf4ff] text-[#1e63cf]",
        success: "border-[#bfeada] bg-[#ebfaf4] text-[#14845d]",
        warning: "border-[#f5dfb8] bg-[#fff8e9] text-[#a96c10]",
        danger: "border-[#f3c8cf] bg-[#fff0f2] text-[#c53c51]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
