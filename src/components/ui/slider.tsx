import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showTooltip?: boolean;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      defaultValue = [min],
      value,
      showTooltip = false,
      ...props
    },
    ref
  ) => {
    // Normalize thumbs
    const thumbs = value ?? defaultValue;

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        {/* Track */}
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden rounded-full bg-gray-700/60",
            "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              "absolute bg-indigo-sky transition-all",
              "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>

        {/* Thumbs */}
        {thumbs.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={`Slider Thumb ${i + 1}`}
            className={cn(
              "relative block size-5 rounded-full border-2 border-white",
              "bg-gradient-to-r from-[#846de3] to-[#b5a7f4]",
              "shadow-md transition-transform duration-200",
              "hover:scale-110 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#846de3]/40",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {showTooltip && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-md">
                {(Array.isArray(value) ? value?.[i] : value) ??
                  (Array.isArray(defaultValue)
                    ? defaultValue?.[i]
                    : defaultValue)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
