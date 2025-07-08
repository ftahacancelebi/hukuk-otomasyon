"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <h3 className="text-lg font-medium">Ödeme Bilgileri</h3>
        <p className="text-sm text-muted-foreground">
          Asıl ve doğrudan ödeme bilgilerini girin.
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
                      <SelectTrigger>
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
                  <FormLabel>Ödeme Tarihi</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Ödeme tarihini seçin"
                      {...field}
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
                      placeholder="5000"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="dogrudanOdemeTarihi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doğrudan Ödeme Tarihi</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Doğrudan ödeme tarihini seçin"
                      {...field}
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
                      placeholder="2500"
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
