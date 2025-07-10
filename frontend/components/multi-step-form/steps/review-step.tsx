"use client";

import { useFormContext } from "react-hook-form";
import {
  CheckCircle,
  FolderOpen,
  Users,
  Car,
  Warning,
  Calculator,
  CreditCard,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { FormData } from "../multi-step-form";

export function ReviewStep() {
  const {
    getValues,
    formState: { errors },
  } = useFormContext<FormData>();
  const data = getValues();

  // Custom component to filter out "Required" messages (for consistency)
  const CustomFormMessage = ({ fieldName }: { fieldName: keyof FormData }) => {
    const error = errors[fieldName];
    if (!error || error.message === "Required") return null;
    return <div className="text-sm text-red-500">{error.message}</div>;
  };

  // Hesaplamalar
  const toplamOdeme =
    (data.asilOdemeTutari || 0) + (data.dogrudanOdemeTutari || 0);
  const toplamTahminiHasar =
    (data.tahminiAracHasari || 0) +
    (data.tahminiDegerKaybi || 0) +
    (data.tahminiEkspertizUcreti || 0);
  const bakiye = toplamOdeme - toplamTahminiHasar;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Belirtilmedi";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <CheckCircle size={24} weight="duotone" className="text-primary" />
          Dosya Özeti
        </h3>
        <p className="text-sm text-muted-foreground">
          Girmiş olduğunuz bilgileri kontrol edin ve onaylayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dosya Temel Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-center  font-extrabold gap-2">
              <FolderOpen size={20} weight="duotone" className="text-primary" />
              Dosya Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Foy No:</span>
              <span>{data.foyNo || "Belirtilmedi"}</span>
            </div>
            {data.esasNo && (
              <div className="flex justify-between">
                <span className="font-medium">Esas No:</span>
                <span>{data.esasNo}</span>
              </div>
            )}
            {data.hukukNo && (
              <div className="flex justify-between">
                <span className="font-medium">Hukuk No:</span>
                <span>{data.hukukNo}</span>
              </div>
            )}
            {data.taslakAdi && (
              <div className="flex justify-between">
                <span className="font-medium">Taslak Adı:</span>
                <span>{data.taslakAdi}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Taraf Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-center font-extrabold gap-2">
              <Users size={20} weight="duotone" className="text-primary" />
              Taraf Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.basvuran && (
              <div className="flex justify-between">
                <span className="font-medium">Başvuran:</span>
                <span>{data.basvuran}</span>
              </div>
            )}
            {data.vekil && (
              <div className="flex justify-between">
                <span className="font-medium">Vekil:</span>
                <span>{data.vekil}</span>
              </div>
            )}
            {data.bagliHukuk && (
              <div className="flex justify-between">
                <span className="font-medium">Bağlı Hukuk:</span>
                <span>{data.bagliHukuk}</span>
              </div>
            )}
            {data.bagliHasar && (
              <div className="flex justify-between">
                <span className="font-medium">Bağlı Hasar:</span>
                <span>{data.bagliHasar}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sigorta & Araç Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-center font-extrabold gap-2">
              <Car size={20} weight="duotone" className="text-primary" />
              Sigorta & Araç
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.policeBaslangicTarihi && (
              <div className="flex justify-between">
                <span className="font-medium">Poliçe Başlangıç:</span>
                <span>{formatDate(data.policeBaslangicTarihi)}</span>
              </div>
            )}
            {data.policeBitisTarihi && (
              <div className="flex justify-between">
                <span className="font-medium">Poliçe Bitiş:</span>
                <span>{formatDate(data.policeBitisTarihi)}</span>
              </div>
            )}
            {data.policeKontrol !== undefined && (
              <div className="flex justify-between">
                <span className="font-medium">Poliçe Kontrolü:</span>
                <Badge variant={data.policeKontrol ? "default" : "secondary"}>
                  {data.policeKontrol ? "Yapıldı" : "Yapılmadı"}
                </Badge>
              </div>
            )}
            {data.sigortaliPlaka && (
              <div className="flex justify-between">
                <span className="font-medium">Sigortalı Plaka:</span>
                <span>{data.sigortaliPlaka}</span>
              </div>
            )}
            {data.karsiPlaka && (
              <div className="flex justify-between">
                <span className="font-medium">Karşı Plaka:</span>
                <span>{data.karsiPlaka}</span>
              </div>
            )}
            {data.aracBasiTeminat && (
              <div className="flex justify-between">
                <span className="font-medium">Araç Başı Teminat:</span>
                <span>{formatCurrency(data.aracBasiTeminat)}</span>
              </div>
            )}
            {data.kazaBasiTeminat && (
              <div className="flex justify-between">
                <span className="font-medium">Kaza Başı Teminat:</span>
                <span>{formatCurrency(data.kazaBasiTeminat)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Kaza Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-center font-extrabold gap-2">
              <Warning size={20} weight="duotone" className="text-primary" />
              Kaza Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.kazaTarihi && (
              <div className="flex justify-between">
                <span className="font-medium">Kaza Tarihi:</span>
                <span>{formatDate(data.kazaTarihi)}</span>
              </div>
            )}
            {data.gun && (
              <div className="flex justify-between">
                <span className="font-medium">Gün Sayısı:</span>
                <span>{data.gun} gün</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Finansal Özet */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center justify-center text-center font-extrabold gap-2">
            <Calculator size={20} weight="duotone" className="text-primary" />
            Finansal Özet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ödemeler */}
            <div className="p-4 rounded-lg border-2 border-green-300 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 shadow-md">
              <h4 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                <CreditCard
                  size={18}
                  weight="duotone"
                  className="text-green-700"
                />
                Ödemeler
              </h4>
              <div className="space-y-2">
                {data.asilOdemeTutari && (
                  <div className="flex justify-between text-sm">
                    <span>Asıl Ödeme:</span>
                    <span className="font-medium text-green-800">
                      {formatCurrency(data.asilOdemeTutari)}
                    </span>
                  </div>
                )}
                {data.dogrudanOdemeTutari && (
                  <div className="flex justify-between text-sm">
                    <span>Doğrudan Ödeme:</span>
                    <span className="font-medium text-green-800">
                      {formatCurrency(data.dogrudanOdemeTutari)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold ">
                  <span>Toplam Ödeme:</span>
                  <span className="font-extrabold text-md text-green-800">
                    {formatCurrency(toplamOdeme)}
                  </span>
                </div>
              </div>
            </div>

            {/* Hasar Değerlendirmesi */}
            <div className="p-4 rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 shadow-md">
              <h4 className="font-semibold mb-3 text-orange-800 flex items-center gap-2">
                <Calculator
                  size={18}
                  weight="duotone"
                  className="text-orange-700"
                />
                Tahmini Hasarlar
              </h4>
              <div className="space-y-2">
                {data.tahminiAracHasari && (
                  <div className="flex justify-between text-sm">
                    <span>Araç Hasarı:</span>
                    <span className="font-medium text-orange-800">
                      {formatCurrency(data.tahminiAracHasari)}
                    </span>
                  </div>
                )}
                {data.tahminiDegerKaybi && (
                  <div className="flex justify-between text-sm">
                    <span>Değer Kaybı:</span>
                    <span className="font-medium text-orange-800">
                      {formatCurrency(data.tahminiDegerKaybi)}
                    </span>
                  </div>
                )}
                {data.tahminiEkspertizUcreti && (
                  <div className="flex justify-between text-sm">
                    <span>Ekspertiz Ücreti:</span>
                    <span className="font-medium text-orange-800">
                      {formatCurrency(data.tahminiEkspertizUcreti)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Toplam Hasar:</span>
                  <span className="font-extrabold text-md text-orange-800">
                    {formatCurrency(toplamTahminiHasar)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Total Summary Card */}
      <Card className="w-full border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center text-primary flex items-center justify-center gap-2 font-extrabold">
            <Calculator size={20} weight="duotone" className="text-primary" />
            Genel Finansal Durum
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Toplam Ödeme
              </div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(toplamOdeme)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Net Sonuç
              </div>
              <div
                className={`text-3xl font-bold ${
                  bakiye >= 0 ? "text-slate-600" : "text-red-600"
                }`}
              >
                {formatCurrency(Math.abs(bakiye))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Toplam Hasar
              </div>
              <div className="text-xl font-bold text-orange-600">
                {formatCurrency(toplamTahminiHasar)}
              </div>
            </div>
          </div>
          <Badge
            variant={bakiye >= 0 ? "default" : "destructive"}
            className="text-base px-6 py-2"
          >
            {bakiye > 0 ? "Fazla Ödeme Durumu" : "Eksik Ödeme Durumu"}
          </Badge>
          <div className="mt-4 flex justify-center">
            <div
              className={`h-1 w-32 rounded-full bg-gradient-to-r ${
                bakiye >= 0
                  ? "from-blue-300 via-blue-500 to-blue-300"
                  : "from-red-300 via-red-500 to-red-300"
              }`}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
