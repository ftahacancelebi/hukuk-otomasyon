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
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "../multi-step-form";

export function InsurancePolicyStep() {
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
        <h3 className="text-lg font-medium">
          Sigorta Poliçesi & Araç Bilgileri
        </h3>
        <p className="text-sm text-muted-foreground">
          Sigorta poliçesi ve araç bilgilerini girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="policeBaslangicTarihi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poliçe Başlangıç Tarihi</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Poliçe başlangıç tarihini seçin"
                  {...field}
                />
              </FormControl>
              <CustomFormMessage fieldName="policeBaslangicTarihi" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="policeBitisTarihi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poliçe Bitiş Tarihi</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Poliçe bitiş tarihini seçin"
                  {...field}
                />
              </FormControl>
              <CustomFormMessage fieldName="policeBitisTarihi" />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <FormField
            control={control}
            name="policeKontrol"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Poliçe Kontrolü Yapıldı</FormLabel>
                </div>
                <CustomFormMessage fieldName="policeKontrol" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="sigortaliPlaka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sigortalı Araç Plakası</FormLabel>
              <FormControl>
                <Input placeholder="34 ABC 123" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="sigortaliPlaka" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="karsiPlaka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Karşı Taraf Plakası</FormLabel>
              <FormControl>
                <Input placeholder="34 XYZ 456" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="karsiPlaka" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="aracBasiTeminat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Araç Başı Teminat (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="50000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || undefined)
                  }
                />
              </FormControl>
              <CustomFormMessage fieldName="aracBasiTeminat" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="kazaBasiTeminat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kaza Başı Teminat (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || undefined)
                  }
                />
              </FormControl>
              <CustomFormMessage fieldName="kazaBasiTeminat" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
