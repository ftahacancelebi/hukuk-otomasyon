"use client";

import { useFormContext } from "react-hook-form";
import { Users } from "@phosphor-icons/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormData } from "../multi-step-form";

export function PartyInformationStep() {
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
          <Users size={24} weight="duotone" className="text-primary" />
          Taraf Bilgileri
        </h3>
        <p className="text-sm text-muted-foreground">
          Dava taraflarının bilgilerini girin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="basvuran"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başvuran</FormLabel>
              <FormControl>
                <Input placeholder="Başvuranın adını girin" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="basvuran" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="vekil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avukat/Vekil</FormLabel>
              <FormControl>
                <Input placeholder="Avukat adını girin" {...field} />
              </FormControl>
              <CustomFormMessage fieldName="vekil" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bagliHukuk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bağlı Hukuk Davası</FormLabel>
              <FormControl>
                <Input
                  placeholder="İlgili hukuk davası referansını girin"
                  {...field}
                />
              </FormControl>
              <CustomFormMessage fieldName="bagliHukuk" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bagliHasar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bağlı Hasar Davası</FormLabel>
              <FormControl>
                <Input
                  placeholder="İlgili hasar davası referansını girin"
                  {...field}
                />
              </FormControl>
              <CustomFormMessage fieldName="bagliHasar" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
