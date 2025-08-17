import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "flex min-h-20 w-full rounded-lg px-3 py-2 text-base md:text-sm outline-none transition-all duration-200",

        // Surface & border
        "bg-background/80 border border-input gradient-border",

        // Text & placeholder
        "text-foreground placeholder:text-muted-foreground",

        // Hover & focus
        "hover:border-accent/70 hover:bg-background/90",
        "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:shadow-[0_0_15px_rgba(132,109,227,0.4)]",

        // Disabled & invalid
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/40",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
