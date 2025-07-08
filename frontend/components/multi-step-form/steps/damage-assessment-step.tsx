"use client";

import { useFormContext } from "react-hook-form";
import { Calculator } from "@phosphor-icons/react";
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
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Calculator size={24} weight="duotone" className="text-primary" />
          Hasar Değerlendirmesi
        </h3>
        <p className="text-sm text-muted-foreground">
          Tahmini hasar tutarları ve değerlendirme maliyetlerini girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="tahminiAracHasari"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahmini Araç Hasarı (₺)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Örn: 15000"
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
                  placeholder="Örn: 5000"
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
                  placeholder="Örn: 800"
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
      </div>

      {/* Enhanced Total Card spanning full width */}
      <Card className="w-full border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-center text-primary">
            Toplam Tahmini Tutar
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {toplamTahminiTutar.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Tüm hasar kalemlerinin toplamı
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
