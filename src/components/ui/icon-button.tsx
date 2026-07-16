"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "aria-label" | "children" | "variant"
> & {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
};

export function IconButton({
  children,
  label,
  tooltip,
  ...props
}: IconButtonProps) {
  const button = (
    <Button variant="icon" aria-label={label} {...props}>
      {children}
    </Button>
  );

  if (!tooltip) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
