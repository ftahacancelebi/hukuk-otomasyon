"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
  required?: boolean;
}

function formatDate(date: Date | undefined): string {
  if (!date) {
    return "";
  }

  return format(date, "dd MMMM yyyy", { locale: tr });
}

function parseDate(dateString: string): Date | undefined {
  if (!dateString) return undefined;

  // Try to parse the date string
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function isValidDate(date: Date | undefined): boolean {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePicker({
  id,
  label,
  placeholder = "Tarih seçin",
  value = "",
  onChange,
  className,
  error,
  required = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(parseDate(value));
  const [month, setMonth] = React.useState<Date | undefined>(
    parseDate(value) || new Date()
  );
  const [inputValue, setInputValue] = React.useState(
    date ? formatDate(date) : value
  );

  // Update internal state when external value changes
  React.useEffect(() => {
    const parsedDate = parseDate(value);
    setDate(parsedDate);
    setInputValue(parsedDate ? formatDate(parsedDate) : value);
    if (parsedDate) {
      setMonth(parsedDate);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);

    // Try to parse the input as a date
    const parsedDate = parseDate(inputVal);
    if (isValidDate(parsedDate)) {
      setDate(parsedDate);
      setMonth(parsedDate);
      // Convert to ISO string for form compatibility
      onChange?.(parsedDate!.toISOString().split("T")[0]);
    } else {
      // Still call onChange with the raw input for validation
      onChange?.(inputVal);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setInputValue(formattedDate);
      // Convert to ISO string for form compatibility
      onChange?.(selectedDate.toISOString().split("T")[0]);
    } else {
      setInputValue("");
      onChange?.("");
    }
    setOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={id} className="">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className={cn(
            "bg-background pr-10 placeholder:text-gray-400",
            error && "border-red-500 focus:border-red-500"
          )}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-slate-100"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Tarih seç</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
              locale={tr}
              fromYear={1900}
              toYear={2030}
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-red-500 px-1">{error}</p>}
    </div>
  );
}
