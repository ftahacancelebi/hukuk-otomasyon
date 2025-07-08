"use client";

import { useFormContext } from "react-hook-form";
import { CreditCard } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormData } from "../multi-step-form";

export function PaymentInformationStep() {
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
          <CreditCard size={24} weight="duotone" className="text-primary" />
          Ödeme Bilgileri
        </h3>
        <p className="text-sm text-muted-foreground">
          Ödeme tutarları ve detaylarını girin.
        </p>
      </div>

      <div className="space-y-8">
        {/* Asıl Ödeme Bilgileri */}
        <div>
          <h4 className="text-md font-medium mb-4">Asıl Ödeme</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={control}
              name="asilOdemeTuru"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ödeme Türü</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ödeme türünü seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nakit">Nakit</SelectItem>
                      <SelectItem value="havale">Havale</SelectItem>
                      <SelectItem value="cek">Çek</SelectItem>
                      <SelectItem value="kredi-karti">Kredi Kartı</SelectItem>
                    </SelectContent>
                  </Select>
                  <CustomFormMessage fieldName="asilOdemeTuru" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="asilOdemeTarihi"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      label="Ödeme Tarihi"
                      placeholder="Ödeme tarihini seçin"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <CustomFormMessage fieldName="asilOdemeTarihi" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="asilOdemeTutari"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ödeme Tutarı (₺)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Örn: 5000"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || undefined)
                      }
                    />
                  </FormControl>
                  <CustomFormMessage fieldName="asilOdemeTutari" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Doğrudan Ödeme Bilgileri */}
        <div>
          <h4 className="text-md font-medium mb-4">Doğrudan Ödeme</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="dogrudanOdemeTarihi"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      label="Doğrudan Ödeme Tarihi"
                      placeholder="Doğrudan ödeme tarihini seçin"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <CustomFormMessage fieldName="dogrudanOdemeTarihi" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dogrudanOdemeTutari"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doğrudan Ödeme Tutarı (₺)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Örn: 2500"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || undefined)
                      }
                    />
                  </FormControl>
                  <CustomFormMessage fieldName="dogrudanOdemeTutari" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
