import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  ...props
}: SelectPrimitive.SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "h-11 w-full rounded-2xl border border-input bg-background px-3 text-left text-sm outline-none focus:ring-2 focus:ring-primary/25",
        className
      )}
      {...props}
    />
  );
}

export function SelectContent({
  className,
  ...props
}: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "z-50 overflow-hidden rounded-2xl border border-border bg-background shadow-lg",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  ...props
}: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "cursor-pointer select-none rounded-xl px-3 py-2 text-sm outline-none focus:bg-secondary/60",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText />
    </SelectPrimitive.Item>
  );
}
