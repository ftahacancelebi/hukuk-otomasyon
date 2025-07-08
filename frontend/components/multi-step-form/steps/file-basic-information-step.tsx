"use client";

import { useFormContext } from "react-hook-form";
import { FolderOpen } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormData } from "../multi-step-form";

export function FileBasicInformationStep() {
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
          <FolderOpen size={24} weight="duotone" className="text-primary" />
          Dosya Temel Bilgileri
        </h3>
        <p className="text-sm text-muted-foreground">
          Dosyanın temel bilgilerini girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="foyNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosya Numarası (Foy No) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Dosya numarasını girin"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || undefined)
                  }
                />
              </FormControl>

              <CustomFormMessage fieldName="foyNo" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="esasNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Esas Numarası</FormLabel>
              <FormControl>
                <Input placeholder="Esas numarasını girin" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="esasNo" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hukukNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hukuk Numarası</FormLabel>
              <FormControl>
                <Input placeholder="Hukuk numarasını girin" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="hukukNo" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="taslakAdi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taslak Adı</FormLabel>
              <FormControl>
                <Input placeholder="Taslak adını girin" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="taslakAdi" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
