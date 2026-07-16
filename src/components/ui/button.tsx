import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-150 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:stroke-[1.8] focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_6px_16px_rgb(40_120_255/0.18)] hover:bg-[#1f6fe9] active:bg-[#1a63d4]",
        secondary:
          "border border-border-strong bg-surface text-foreground shadow-[0_1px_2px_rgb(16_21_37/0.04)] hover:border-[#c7d0e2] hover:bg-surface-secondary",
        ghost:
          "text-secondary hover:bg-surface-secondary hover:text-foreground",
        icon: "size-10 bg-transparent p-0 text-secondary hover:bg-surface-secondary hover:text-foreground",
      },
      size: {
        sm: "h-9 px-3",
        default: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  asChild = false,
  className,
  size,
  type,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      type={asChild ? undefined : (type ?? "button")}
      className={cn(
        buttonVariants({
          variant,
          size: variant === "icon" ? null : size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { buttonVariants };
