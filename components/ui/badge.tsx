import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        gold:    "border border-gold-DEFAULT/40 bg-gold-DEFAULT/10 text-gold-dark",
        blue:    "border border-primary-200 bg-primary-50 text-primary-DEFAULT",
        success: "border border-success-DEFAULT/30 bg-success-light text-success-DEFAULT",
        danger:  "border border-danger-DEFAULT/30 bg-danger-light text-danger-DEFAULT",
        warn:    "border border-warn-DEFAULT/30 bg-warn-light text-warn-DEFAULT",
        muted:   "border border-border bg-muted text-muted-foreground",
        outline: "border border-current bg-transparent",
      },
    },
    defaultVariants: { variant: "gold" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
