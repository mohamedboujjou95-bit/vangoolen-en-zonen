"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-2.5",
    "font-body font-semibold text-sm tracking-wide",
    "rounded transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        // Solid royal blue — primary CTA
        primary: [
          "bg-primary-DEFAULT text-cream border border-primary-DEFAULT",
          "hover:bg-primary-700 hover:border-primary-700",
          "focus-visible:ring-primary-DEFAULT",
          "shadow-blue hover:shadow-blue-lg",
          "active:scale-[0.98]",
        ].join(" "),

        // Solid gold — secondary CTA (high visibility)
        gold: [
          "bg-gold-DEFAULT text-primary-800 border border-gold-DEFAULT",
          "hover:bg-gold-dark hover:border-gold-dark hover:text-white",
          "focus-visible:ring-gold-DEFAULT",
          "shadow-gold hover:shadow-gold-lg",
          "active:scale-[0.98]",
          "font-bold",
        ].join(" "),

        // Outlined primary
        outline: [
          "bg-transparent text-primary-DEFAULT border border-primary-200",
          "hover:bg-primary-50 hover:border-primary-DEFAULT",
          "focus-visible:ring-primary-DEFAULT",
          "active:scale-[0.98]",
        ].join(" "),

        // Outlined gold — for use on dark backgrounds
        "outline-gold": [
          "bg-transparent text-gold-DEFAULT border border-gold-DEFAULT",
          "hover:bg-gold-DEFAULT hover:text-primary-800",
          "focus-visible:ring-gold-DEFAULT",
          "active:scale-[0.98]",
        ].join(" "),

        // Ghost
        ghost: [
          "bg-transparent text-secondary-700 border border-transparent",
          "hover:bg-cream-200 hover:text-primary-DEFAULT",
          "focus-visible:ring-primary-DEFAULT",
          "active:scale-[0.98]",
        ].join(" "),

        // Destructive / danger
        danger: [
          "bg-danger-DEFAULT text-white border border-danger-DEFAULT",
          "hover:bg-red-800",
          "focus-visible:ring-danger-DEFAULT",
          "shadow-emergency",
          "active:scale-[0.98]",
        ].join(" "),

        // Emergency phone — special pulsing button
        emergency: [
          "bg-danger-DEFAULT text-white border-2 border-danger-DEFAULT",
          "hover:bg-red-800",
          "focus-visible:ring-danger-DEFAULT",
          "shadow-emergency animate-pulse-gold",
          "active:scale-[0.97]",
          "font-bold tracking-wider",
        ].join(" "),
      },

      size: {
        sm:   "h-8  px-3.5 text-xs",
        md:   "h-10 px-5   text-sm",
        lg:   "h-12 px-7   text-base",
        xl:   "h-14 px-9   text-base",
        icon: "h-10 w-10  p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?:  boolean;
  loading?:  boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
