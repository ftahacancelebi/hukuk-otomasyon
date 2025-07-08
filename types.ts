export interface CevapDilekcesi {
  // 🔐 Kimlik Bilgileri (Zorunlu)
  foyNo: string;
  esasNo: string;
  hukukNo: string;
  taslakAdi: string;

  // 🧑‍⚖️ Kişi Bilgileri
  basvuran: string;
  vekil: string;

  // 🗓️ Tarihler
  policeBaslangic: string; // ISO date (yyyy-mm-dd)
  policeBitis: string; // ISO date
  kazaTarihi: string; // ISO date

  // 🚗 Araç Bilgileri
  sigortaliPlaka: string;
  karsiPlaka: string;

  // 💰 Teminatlar
  aracBasiTeminat: number;
  kazaBasiTeminat: number;

  // 💸 Talep Tutarları (Nullable)
  aracHasarTalep?: number | null;
  degerKaybiTalep?: number | null;
  ekspertizTalep?: number | null;

  // 💳 Ödeme Bilgileri (Nullable)
  aracHasarOdemeTipi?: string | null;
  aracHasarOdemeTarih?: string | null; // ISO date
  aracHasarOdemeTutar?: number | null;

  degerKaybiOdemeTarih?: string | null; // ISO date
  degerKaybiOdemeTutar?: number | null;

  bakiyeTeminatLimiti?: number | null;

  // 🧷 Bağlı Dosyalar (Nullable)
  bagliHukuk?: string | null;
  bagliHasar?: string | null;
}
