"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-visible rounded-full bg-surface-secondary align-middle ring-1 ring-border",
  {
    variants: {
      size: {
        sm: "size-8",
        default: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const statusStyles = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-error",
  offline: "bg-muted",
} as const;

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback: string;
    status?: keyof typeof statusStyles;
  };

export function Avatar({
  alt = "",
  className,
  fallback,
  size,
  src,
  status,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        src={src}
        alt={alt}
        className="size-full rounded-full object-cover"
      />
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        delayMs={100}
        className="grid size-full place-items-center rounded-full bg-[#e9effb] text-xs font-bold text-[#405170]"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
      {status ? (
        <span
          className={cn(
            "absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-surface",
            statusStyles[status],
          )}
          role="status"
          aria-label={`${status} status`}
        />
      ) : null}
    </AvatarPrimitive.Root>
  );
}
