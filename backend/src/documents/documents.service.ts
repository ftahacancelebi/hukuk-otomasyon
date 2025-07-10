import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class DocumentService {
  constructor(private readonly filesService: FilesService) {}

  async generateWordDocument(
    foyNo: number,
    templateName: string,
  ): Promise<{
    pdfPath: string;
    docxPath: string;
  }> {
    const fileData = await this.filesService.findOne(foyNo);
    if (!fileData) {
      throw new NotFoundException(`File with foyNo ${foyNo} not found`);
    }

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      templateName,
    );
    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(`Template ${templateName} not found.`);
    }

    const templateData = await this.getTemplateData(fileData);
    console.log('templateData', templateData);

    let docxPath: string;

    const docxResult = await this.processDocxTemplate(
      templatePath,
      templateData,
      foyNo,
    );
    docxPath = docxResult.docxPath;

    const outputDir = path.join(process.cwd(), 'generated');
    await fs.ensureDir(outputDir);

    const pdfPath = path.join(outputDir, `rapor_${foyNo}_${Date.now()}.pdf`);

    return {
      pdfPath: pdfPath,
      docxPath: docxPath,
    };
  }

  async processHtmlTemplate(
    templateName: string,
    foyNo: number,
  ): Promise<string> {
    const fileData = await this.filesService.findOne(foyNo);
    if (!fileData) {
      throw new NotFoundException(`File with foyNo ${foyNo} not found`);
    }

    const templatePath = path.join(
      process.cwd(),
      'src',
      'templates',
      templateName,
    );
    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(`Template ${templateName} not found.`);
    }

    const templateData = await this.getTemplateData(fileData);
    let htmlContent = await fs.readFile(templatePath, 'utf-8');

    let replacedCount = 0;

    for (const [key, value] of Object.entries(templateData)) {
      if (value !== undefined && value !== null) {
        const pattern = `##${this.escapeRegex(key)}##`;
        const regex = new RegExp(pattern, 'g');
        const beforeReplace = htmlContent;
        htmlContent = htmlContent.replace(regex, String(value));

        if (beforeReplace !== htmlContent) {
          replacedCount++;
          console.log(
            `Replaced ##${key}## with: ${String(value).substring(0, 50)}${String(value).length > 50 ? '...' : ''}`,
          );
        }
      }
    }

    const remainingVariables = htmlContent.match(/##[^#]+##/g) || [];
    if (remainingVariables.length > 0) {
      console.log(
        `Found ${remainingVariables.length} unresolved variables:`,
        remainingVariables,
      );
      htmlContent = htmlContent.replace(/##[^#]+##/g, '...');
    }

    console.log(
      `HTML processing complete: ${replacedCount} variables replaced`,
    );

    return htmlContent;
  }

  async generatePdfDocument(foyNo: number): Promise<{ pdfPath: string }> {
    const htmlContent = await this.processHtmlTemplate('template.html', foyNo);
    const outputDir = path.join(process.cwd(), 'generated');
    await fs.ensureDir(outputDir);
    const pdfPath = path.join(outputDir, `rapor_${foyNo}_${Date.now()}.pdf`);
    await this.convertHtmlToPdf(htmlContent, pdfPath);
    return { pdfPath: pdfPath };
  }

  async updateHtmlAndGeneratePdf(
    foyNo: number,
    htmlContent: string,
  ): Promise<{ pdfPath: string }> {
    // Verify that the file exists
    const fileData = await this.filesService.findOne(foyNo);
    if (!fileData) {
      throw new NotFoundException(`File with foyNo ${foyNo} not found`);
    }

    const outputDir = path.join(process.cwd(), 'generated');
    await fs.ensureDir(outputDir);
    const pdfPath = path.join(outputDir, `rapor_${foyNo}_${Date.now()}.pdf`);

    // Generate PDF from the updated HTML content
    await this.convertHtmlToPdf(htmlContent, pdfPath);

    return { pdfPath: pdfPath };
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private async processDocxTemplate(
    templatePath: string,
    templateData: any,
    foyNo: number,
  ): Promise<{ docxPath: string }> {
    const templateContent = await fs.readFile(templatePath, 'binary');
    const zip = new PizZip(templateContent);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(templateData);

    try {
      doc.render();
    } catch (error) {
      console.error('Template rendering error:', error);
      throw new Error(`Template rendering failed: ${error.message}`);
    }

    const outputDir = path.join(process.cwd(), 'generated');
    await fs.ensureDir(outputDir);

    const docxBuffer = doc.getZip().generate({ type: 'nodebuffer' });
    const docxPath = path.join(
      outputDir,
      `document_${foyNo}_${Date.now()}.docx`,
    );
    await fs.writeFile(docxPath, docxBuffer);

    return { docxPath: docxPath };
  }

  private async convertHtmlToPdf(
    html: string,
    outputPath: string,
  ): Promise<string> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    try {
      const page = await browser.newPage();

      await page.setViewport({ width: 1200, height: 800 });

      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      console.log('Generating PDF...');
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '2cm',
        },
        preferCSSPageSize: true,
      });

      console.log('PDF generated successfully');
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
      await browser.close();
    }

    return outputPath;
  }

  private async getTemplateData(data: File): Promise<any> {
    const formatDate = (date: Date) =>
      date ? new Date(date).toLocaleDateString('tr-TR') : '...';
    const formatCurrency = (amount: number) =>
      amount
        ? amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
        : '0,00 TL';

    const asilOdemeTutari = Number(data.asilOdemeTutari) || 0;
    const kazaBasiTeminat = Number(data.kazaBasiTeminat) || 0;
    const bakiye = kazaBasiTeminat - asilOdemeTutari;

    const templateData = {
      // Standard variables for DOCX templates
      hukukNo: data.hukukNo || '...',
      bugunTarih: new Date().toLocaleDateString('tr-TR'),
      dosyaEsasNo: data.esasNo || '...',
      asilAdi: data.basvuran || '...',
      vekilAdi: data.vekil || '...',
      kazaTarihi: formatDate(data.kazaTarihi),
      karsiAracPlaka: data.karsiPlaka || '...',
      sigortaliPlaka: data.sigortaliPlaka || '...',
      aracHasariTalep: formatCurrency(data.tahminiAracHasari),
      degerKaybiTalep: formatCurrency(data.tahminiDegerKaybi),
      ekspertizTalep: formatCurrency(data.tahminiEkspertizUcreti),
      policeBaslangic: formatDate(data.policeBaslangicTarihi),
      policeBitis: formatDate(data.policeBitisTarihi),
      gecenGunPolice: data.gun?.toString() || '...',
      aracBasiTeminat: formatCurrency(data.aracBasiTeminat),
      kazaBasiTeminat: formatCurrency(data.kazaBasiTeminat),
      aracHasarOdemeTarih: formatDate(data.asilOdemeTarihi),
      aracHasarOdemeTutar: formatCurrency(data.asilOdemeTutari),
      degerKaybiOdemeTutar: formatCurrency(data.asilOdemeTutari),
      bakiyeLimit: formatCurrency(bakiye),
      bagliHukukDosya: data.bagliHukuk || '...',
    };

    return templateData;
  }
}
