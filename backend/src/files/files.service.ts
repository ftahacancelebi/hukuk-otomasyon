import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto, UpdateFileDto } from './dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    try {
      // Convert date strings to Date objects
      const fileData: Partial<File> = {
        ...createFileDto,
        policeBaslangicTarihi: createFileDto.policeBaslangicTarihi
          ? new Date(createFileDto.policeBaslangicTarihi)
          : undefined,
        policeBitisTarihi: createFileDto.policeBitisTarihi
          ? new Date(createFileDto.policeBitisTarihi)
          : undefined,
        kazaTarihi: createFileDto.kazaTarihi
          ? new Date(createFileDto.kazaTarihi)
          : undefined,
        asilOdemeTarihi: createFileDto.asilOdemeTarihi
          ? new Date(createFileDto.asilOdemeTarihi)
          : undefined,
        dogrudanOdemeTarihi: createFileDto.dogrudanOdemeTarihi
          ? new Date(createFileDto.dogrudanOdemeTarihi)
          : undefined,
      };

      const file = this.fileRepository.create(fileData);
      return await this.fileRepository.save(file);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        throw new BadRequestException(
          `File with foyNo ${createFileDto.foyNo} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    sortBy: string = 'foyNo',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{
    data: File[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const options: FindManyOptions<File> = {
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: sortOrder,
      },
    };

    if (search) {
      options.where = [
        { esasNo: Like(`%${search}%`) },
        { hukukNo: Like(`%${search}%`) },
        { basvuran: Like(`%${search}%`) },
        { vekil: Like(`%${search}%`) },
        { sigortaliPlaka: Like(`%${search}%`) },
        { karsiPlaka: Like(`%${search}%`) },
      ];
    }

    const [data, total] = await this.fileRepository.findAndCount(options);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(foyNo: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: { foyNo },
    });

    if (!file) {
      throw new NotFoundException(`File with foyNo ${foyNo} not found`);
    }

    return file;
  }

  async update(foyNo: number, updateFileDto: UpdateFileDto): Promise<File> {
    const existingFile = await this.findOne(foyNo);

    // Convert date strings to Date objects
    const updateData = {
      ...updateFileDto,
      policeBaslangicTarihi: updateFileDto.policeBaslangicTarihi
        ? new Date(updateFileDto.policeBaslangicTarihi)
        : existingFile.policeBaslangicTarihi,
      policeBitisTarihi: updateFileDto.policeBitisTarihi
        ? new Date(updateFileDto.policeBitisTarihi)
        : existingFile.policeBitisTarihi,
      kazaTarihi: updateFileDto.kazaTarihi
        ? new Date(updateFileDto.kazaTarihi)
        : existingFile.kazaTarihi,
      asilOdemeTarihi: updateFileDto.asilOdemeTarihi
        ? new Date(updateFileDto.asilOdemeTarihi)
        : existingFile.asilOdemeTarihi,
      dogrudanOdemeTarihi: updateFileDto.dogrudanOdemeTarihi
        ? new Date(updateFileDto.dogrudanOdemeTarihi)
        : existingFile.dogrudanOdemeTarihi,
    };

    await this.fileRepository.update(foyNo, updateData);
    return this.findOne(foyNo);
  }

  async remove(foyNo: number): Promise<void> {
    const file = await this.findOne(foyNo);
    await this.fileRepository.remove(file);
  }

  async findByEsasNo(esasNo: string): Promise<File[]> {
    return this.fileRepository.find({
      where: { esasNo: Like(`%${esasNo}%`) },
    });
  }

  async findByHukukNo(hukukNo: string): Promise<File[]> {
    return this.fileRepository.find({
      where: { hukukNo: Like(`%${hukukNo}%`) },
    });
  }

  async findByPlaka(plaka: string): Promise<File[]> {
    return this.fileRepository.find({
      where: [
        { sigortaliPlaka: Like(`%${plaka}%`) },
        { karsiPlaka: Like(`%${plaka}%`) },
      ],
    });
  }

  async getStatistics(): Promise<{
    total: number;
    withVekil: number;
    withoutVekil: number;
    averageAsilOdeme: number;
    averageDogrudan: number;
  }> {
    const [total, withVekil, withoutVekil] = await Promise.all([
      this.fileRepository.count(),
      this.fileRepository.count({ where: { vekil: Like('%') } }),
      this.fileRepository
        .createQueryBuilder('file')
        .where('file.vekil IS NULL')
        .getCount(),
    ]);

    const avgAsilResult = await this.fileRepository
      .createQueryBuilder('file')
      .select('AVG(file.asilOdemeTutari)', 'avg')
      .getRawOne();

    const avgDogruResult = await this.fileRepository
      .createQueryBuilder('file')
      .select('AVG(file.dogrudanOdemeTutari)', 'avg')
      .getRawOne();

    return {
      total,
      withVekil,
      withoutVekil,
      averageAsilOdeme: parseFloat(avgAsilResult?.avg || '0'),
      averageDogrudan: parseFloat(avgDogruResult?.avg || '0'),
    };
  }
}
