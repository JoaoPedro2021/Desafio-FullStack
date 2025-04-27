import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldError, FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface DataObject {
  value: string;
  label: string;
}

interface SelectProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> {
  field: ControllerRenderProps<TFieldValues, TName>;
  form: UseFormReturn<TFieldValues>;
  data: DataObject[];
  label: string;
  selectText: string;
  error: false | FieldError | undefined;
}

const Select = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  form,
  data,
  label,
  selectText,
  error,
}: SelectProps<TFieldValues, TName>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormItem className="flex flex-col">
      <FormLabel className={cn(error ? 'text-destructive text-sm md:text-base font-bold' : "text-black text-sm md:text-base font-bold")}>
        {label}
      </FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              className={cn(
                "w-full justify-between text-black",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? data.find((item) => item.value.toString() === field.value.toString())?.label
                : selectText}
              <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="max-w-[300px] min-w-[220px] p-0 max-h-[200px] overflow-auto">
          <Command>
            <CommandList>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    className="cursor-pointer hover:bg-[#807c7a5d]"
                    value={item.label}
                    key={item.value}
                    onSelect={() => {
                      form.setValue(field.name, item.value as PathValue<TFieldValues, TName>);
                      setOpen(false);
                      form.clearErrors(field.name);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.value === field.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <FormMessage className="text-sm md:text-base font-bold">{error.message}</FormMessage>
      )}
    </FormItem>
  );
};

export { Select };
