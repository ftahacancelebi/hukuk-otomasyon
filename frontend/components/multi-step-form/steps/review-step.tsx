"use client";

import { useFormContext } from "react-hook-form";
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
        <h3 className="text-lg font-medium">Dosya Özeti</h3>
        <p className="text-sm text-muted-foreground">
          Girmiş olduğunuz bilgileri kontrol edin ve onaylayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dosya Temel Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle>Dosya Bilgileri</CardTitle>
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
            <CardTitle>Taraf Bilgileri</CardTitle>
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
            <CardTitle>Sigorta & Araç</CardTitle>
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
            <CardTitle>Kaza Bilgileri</CardTitle>
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
      <Card>
        <CardHeader>
          <CardTitle>Finansal Özet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ödemeler */}
            <div>
              <h4 className="font-medium mb-3">Ödemeler</h4>
              <div className="space-y-2">
                {data.asilOdemeTutari && (
                  <div className="flex justify-between text-sm">
                    <span>Asıl Ödeme:</span>
                    <span>{formatCurrency(data.asilOdemeTutari)}</span>
                  </div>
                )}
                {data.dogrudanOdemeTutari && (
                  <div className="flex justify-between text-sm">
                    <span>Doğrudan Ödeme:</span>
                    <span>{formatCurrency(data.dogrudanOdemeTutari)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Toplam Ödeme:</span>
                  <span>{formatCurrency(toplamOdeme)}</span>
                </div>
              </div>
            </div>

            {/* Hasar Değerlendirmesi */}
            <div>
              <h4 className="font-medium mb-3">Tahmini Hasarlar</h4>
              <div className="space-y-2">
                {data.tahminiAracHasari && (
                  <div className="flex justify-between text-sm">
                    <span>Araç Hasarı:</span>
                    <span>{formatCurrency(data.tahminiAracHasari)}</span>
                  </div>
                )}
                {data.tahminiDegerKaybi && (
                  <div className="flex justify-between text-sm">
                    <span>Değer Kaybı:</span>
                    <span>{formatCurrency(data.tahminiDegerKaybi)}</span>
                  </div>
                )}
                {data.tahminiEkspertizUcreti && (
                  <div className="flex justify-between text-sm">
                    <span>Ekspertiz Ücreti:</span>
                    <span>{formatCurrency(data.tahminiEkspertizUcreti)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Toplam Hasar:</span>
                  <span>{formatCurrency(toplamTahminiHasar)}</span>
                </div>
              </div>
            </div>

            {/* Bakiye */}
            <div>
              <h4 className="font-medium mb-3">Durum</h4>
              <div className="space-y-2">
                <div className="flex justify-between font-medium text-lg">
                  <span>Net Bakiye:</span>
                  <span
                    className={bakiye >= 0 ? "text-green-600" : "text-red-600"}
                  >
                    {formatCurrency(Math.abs(bakiye))}
                  </span>
                </div>
                <Badge
                  variant={bakiye >= 0 ? "default" : "destructive"}
                  className="w-full justify-center"
                >
                  {bakiye >= 0 ? "Fazla Ödeme" : "Eksik Ödeme"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
