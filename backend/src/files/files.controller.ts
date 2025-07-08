import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, UpdateFileDto } from './dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('search') search?: string,
    @Query('sortBy') sortBy: string = 'foyNo',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.filesService.findAll(page, limit, search, sortBy, sortOrder);
  }

  @Get('statistics')
  async getStatistics() {
    return this.filesService.getStatistics();
  }

  @Get('search/esas/:esasNo')
  async findByEsasNo(@Param('esasNo') esasNo: string) {
    return this.filesService.findByEsasNo(esasNo);
  }

  @Get('search/hukuk/:hukukNo')
  async findByHukukNo(@Param('hukukNo') hukukNo: string) {
    return this.filesService.findByHukukNo(hukukNo);
  }

  @Get('search/plaka/:plaka')
  async findByPlaka(@Param('plaka') plaka: string) {
    return this.filesService.findByPlaka(plaka);
  }

  @Get(':foyNo')
  async findOne(@Param('foyNo', ParseIntPipe) foyNo: number) {
    return this.filesService.findOne(foyNo);
  }

  @Patch(':foyNo')
  async update(
    @Param('foyNo', ParseIntPipe) foyNo: number,
    @Body(ValidationPipe) updateFileDto: UpdateFileDto,
  ) {
    return this.filesService.update(foyNo, updateFileDto);
  }

  @Delete(':foyNo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('foyNo', ParseIntPipe) foyNo: number) {
    return this.filesService.remove(foyNo);
  }
}
