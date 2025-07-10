import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Res,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { DocumentService } from './documents.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('assets')
  async getAssets() {
    return 'Get Assets';
  }

  @Post('generate/word/:foyNo')
  async generateDocument(
    @Param('foyNo', ParseIntPipe) foyNo: number,
    @Body() options?: { templateName?: string },
  ) {
    try {
      const templateName = options?.templateName || 'template.docx';
      const result = await this.documentService.generateWordDocument(
        foyNo,
        templateName,
      );

      const response: any = {
        message: 'Document generated successfully',
        path: result.docxPath,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(
        `Document generation failed: ${error.message}`,
      );
    }
  }
  /*
  @Get('download/word/:foyNo')
  async downloadWordDocument(@Param('foyNo', ParseIntPipe) foyNo: number) {
    return this.documentService.downloadWordDocument(foyNo);
  }
    */
  /*
  @Post('generate/pdf/:foyNo')
  async generatePdfDocument(@Param('foyNo', ParseIntPipe) foyNo: number) {
    try {
      const result = await this.documentService.generatePdfDocument(foyNo);

      const response: any = {
        message: 'PDF generated successfully',
        path: result.pdfPath,
      };

      return response;
      } catch (error) {
      throw new BadRequestException(
        `PDF generation failed: ${error.message}`,
      );
    }
  }

  @Get('download/pdf/:foyNo')
  async downloadPdfDocument(@Param('foyNo', ParseIntPipe) foyNo: number) {
    return this.documentService.downloadPdfDocument(foyNo);
  }
    */

  @Get('generate/html/:foyNo')
  async generateHtmlDocument(@Param('foyNo', ParseIntPipe) foyNo: number) {
    try {
      const result = await this.documentService.processHtmlTemplate(
        'template.html',
        foyNo,
      );

      const response: any = {
        message: 'HTML generated successfully',
        result: result,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(`HTML generation failed: ${error.message}`);
    }
  }

  @Get('generate/pdf/:foyNo')
  async generatePdfDocument(@Param('foyNo', ParseIntPipe) foyNo: number) {
    try {
      const result = await this.documentService.generatePdfDocument(foyNo);

      const response: any = {
        message: 'PDF generated successfully',
        path: result.pdfPath,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(`PDF generation failed: ${error.message}`);
    }
  }

  @Post('update/html/:foyNo')
  async updateHtmlTemplate(
    @Param('foyNo', ParseIntPipe) foyNo: number,
    @Body() body: { htmlContent: string },
  ) {
    try {
      const result = await this.documentService.updateHtmlAndGeneratePdf(
        foyNo,
        body.htmlContent,
      );

      const response: any = {
        message: 'HTML updated and PDF generated successfully',
        htmlContent: body.htmlContent,
        pdfDownloadUrl: result.pdfPath,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(
        `HTML update and PDF generation failed: ${error.message}`,
      );
    }
  }
}
