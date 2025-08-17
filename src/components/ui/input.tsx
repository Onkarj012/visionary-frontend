import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "flex h-10 w-full min-w-0 rounded-lg border bg-background/80 px-3 py-2 text-base md:text-sm shadow-sm outline-none transition-colors duration-200",

        // Text & placeholder
        "text-foreground placeholder:text-muted-foreground file:text-foreground file:bg-transparent file:border-0 file:text-sm file:font-medium",

        // Border & background
        "border-input dark:bg-input/20",

        // Hover & focus (no transform)
        "hover:border-accent/60 hover:bg-background/90",
        "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:shadow-[0_0_10px_var(--accent)]",

        // Disabled & invalid
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",

        className
      )}
      {...props}
    />
  );
}
export { Input };
