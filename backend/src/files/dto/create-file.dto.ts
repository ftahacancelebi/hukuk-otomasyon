import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFileDto {
  @IsNotEmpty()
  @IsNumber()
  foyNo: number;

  @IsOptional()
  @IsString()
  esasNo?: string;

  @IsOptional()
  @IsString()
  hukukNo?: string;

  @IsOptional()
  @IsString()
  basvuran?: string;

  @IsOptional()
  @IsString()
  vekil?: string;

  @IsOptional()
  @IsString()
  bagliHukuk?: string;

  @IsOptional()
  @IsString()
  bagliHasar?: string;

  @IsOptional()
  @IsDateString()
  policeBaslangicTarihi?: string;

  @IsOptional()
  @IsDateString()
  policeBitisTarihi?: string;

  @IsOptional()
  @IsDateString()
  kazaTarihi?: string;

  @IsOptional()
  @IsNumber()
  gun?: number;

  @IsOptional()
  @IsBoolean()
  policeKontrol?: boolean;

  @IsOptional()
  @IsString()
  sigortaliPlaka?: string;

  @IsOptional()
  @IsString()
  karsiPlaka?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  aracBasiTeminat?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  kazaBasiTeminat?: number;

  @IsOptional()
  @IsString()
  asilOdemeTuru?: string;

  @IsOptional()
  @IsDateString()
  asilOdemeTarihi?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  asilOdemeTutari?: number;

  @IsOptional()
  @IsDateString()
  dogrudanOdemeTarihi?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dogrudanOdemeTutari?: number;

  @IsOptional()
  @IsString()
  taslakAdi?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tahminiAracHasari?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tahminiDegerKaybi?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tahminiEkspertizUcreti?: number;
}
