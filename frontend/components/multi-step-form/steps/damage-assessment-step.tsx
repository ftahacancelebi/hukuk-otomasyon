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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormData } from "../multi-step-form";

export function DamageAssessmentStep() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  // Custom component to filter out "Required" messages
  const CustomFormMessage = ({ fieldName }: { fieldName: keyof FormData }) => {
    const error = errors[fieldName];
    if (!error || error.message === "Required") return null;
    return <FormMessage />;
  };

  // Watch değerler için toplam hesaplama
  const tahminiAracHasari = watch("tahminiAracHasari") || 0;
  const tahminiDegerKaybi = watch("tahminiDegerKaybi") || 0;
  const tahminiEkspertizUcreti = watch("tahminiEkspertizUcreti") || 0;

  const toplamTahminiTutar =
    tahminiAracHasari + tahminiDegerKaybi + tahminiEkspertizUcreti;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hasar Değerlendirmesi</h3>
        <p className="text-sm text-muted-foreground">
          Tahmini hasar tutarları ve değerlendirme maliyetlerini girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="tahminiAracHasari"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahmini Araç Hasarı (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15000"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || undefined)
                  }
                />
              </FormControl>
              <CustomFormMessage fieldName="tahminiAracHasari" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="tahminiDegerKaybi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahmini Değer Kaybı (₺)</FormLabel>
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
              <CustomFormMessage fieldName="tahminiDegerKaybi" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="tahminiEkspertizUcreti"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahmini Ekspertiz Ücreti (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="800"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || undefined)
                  }
                />
              </FormControl>
              <CustomFormMessage fieldName="tahminiEkspertizUcreti" />
            </FormItem>
          )}
        />

        <div className="flex items-end">
          <Card className="w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Toplam Tahmini Tutar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {toplamTahminiTutar.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Tüm hasar kalemlerinin toplamı
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
