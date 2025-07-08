"use client";

import { useFormContext } from "react-hook-form";
import { Warning } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import type { FormData } from "../multi-step-form";

export function AccidentInformationStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  // Custom component to filter out "Required" messages
  const CustomFormMessage = ({ fieldName }: { fieldName: keyof FormData }) => {
    const error = errors[fieldName];
    if (!error || error.message === "Required") return null;
    return <FormMessage />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Warning size={24} weight="duotone" className="text-primary" />
          Kaza Bilgileri
        </h3>
        <p className="text-sm text-muted-foreground">
          Kaza ile ilgili detayları girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="kazaTarihi"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  label="Kaza Tarihi"
                  placeholder="Kaza tarihini seçin"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <CustomFormMessage fieldName="kazaTarihi" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gun"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gün Sayısı</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Gün sayısını girin"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || undefined)
                  }
                />
              </FormControl>
              <CustomFormMessage fieldName="gun" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
