import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryColumn({ name: 'foy_no', type: 'int' })
  foyNo: number;

  @Column({ name: 'esas_no', type: 'varchar', length: 100, nullable: true })
  esasNo: string;

  @Column({ name: 'hukuk_no', type: 'varchar', length: 100, nullable: true })
  hukukNo: string;

  @Column({ name: 'basvuran', type: 'varchar', length: 255, nullable: true })
  basvuran: string;

  @Column({ name: 'vekil', type: 'varchar', length: 255, nullable: true })
  vekil: string;

  @Column({ name: 'bagli_hukuk', type: 'varchar', length: 100, nullable: true })
  bagliHukuk: string;

  @Column({ name: 'bagli_hasar', type: 'varchar', length: 100, nullable: true })
  bagliHasar: string;

  @Column({ name: 'police_baslangic_tarihi', type: 'date', nullable: true })
  policeBaslangicTarihi: Date;

  @Column({ name: 'police_bitis_tarihi', type: 'date', nullable: true })
  policeBitisTarihi: Date;

  @Column({ name: 'kaza_tarihi', type: 'date', nullable: true })
  kazaTarihi: Date;

  @Column({ name: 'gun', type: 'int', nullable: true })
  gun: number;

  @Column({ name: 'police_kontrol', type: 'boolean', nullable: true })
  policeKontrol: boolean;

  @Column({
    name: 'sigortali_plaka',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  sigortaliPlaka: string;

  @Column({ name: 'karsi_plaka', type: 'varchar', length: 50, nullable: true })
  karsiPlaka: string;

  @Column({
    name: 'arac_basi_teminat',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  aracBasiTeminat: number;

  @Column({
    name: 'kaza_basi_teminat',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  kazaBasiTeminat: number;

  @Column({
    name: 'asil_odeme_turu',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  asilOdemeTuru: string;

  @Column({ name: 'asil_odeme_tarihi', type: 'date', nullable: true })
  asilOdemeTarihi: Date;

  @Column({
    name: 'asil_odeme_tutari',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  asilOdemeTutari: number;

  @Column({ name: 'dogrudan_odeme_tarihi', type: 'date', nullable: true })
  dogrudanOdemeTarihi: Date;

  @Column({
    name: 'dogrudan_odeme_tutari',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  dogrudanOdemeTutari: number;

  @Column({ name: 'taslak_adi', type: 'varchar', length: 255, nullable: true })
  taslakAdi: string;

  @Column({
    name: 'tahmini_arac_hasari',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  tahminiAracHasari: number;

  @Column({
    name: 'tahmini_deger_kaybi',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  tahminiDegerKaybi: number;

  @Column({
    name: 'tahmini_ekspertiz_ucreti',
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: true,
  })
  tahminiEkspertizUcreti: number;
}
