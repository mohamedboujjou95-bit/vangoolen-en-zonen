import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border px-4 py-2",
          "bg-white text-sm text-foreground",
          "placeholder:text-secondary-400",
          "border-input transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-gold-DEFAULT/50 focus:border-gold-DEFAULT",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-danger-DEFAULT focus:ring-danger-DEFAULT/40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-md border px-4 py-3",
          "bg-white text-sm text-foreground",
          "placeholder:text-secondary-400",
          "border-input transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-gold-DEFAULT/50 focus:border-gold-DEFAULT",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y",
          error && "border-danger-DEFAULT focus:ring-danger-DEFAULT/40",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-primary-700"
      >
        {label}
        {required && <span className="text-danger-DEFAULT ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-danger-DEFAULT flex items-center gap-1 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

export { Input, Textarea, FormField };
