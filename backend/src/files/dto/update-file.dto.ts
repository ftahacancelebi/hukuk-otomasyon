import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(
  OmitType(CreateFileDto, ['foyNo'] as const),
) {}
