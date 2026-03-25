import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline";
type Size = "default" | "sm";

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    default:
      "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    outline:
      "border border-border bg-background text-foreground hover:bg-secondary/60",
  };
  const sizes: Record<Size, string> = {
    default: "h-12 px-4",
    sm: "h-9 px-3",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
