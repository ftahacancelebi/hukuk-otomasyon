# Docxtemplater Implementation Guide

## Overview

The document generation system has been upgraded to use **docxtemplater** instead of mammoth + puppeteer. This provides better template control, image support, and more professional document generation.

## Key Features

- ✅ **Template Variables**: Use `{variableName}` syntax in Word documents
- ✅ **Image Support**: Embed images directly in templates
- ✅ **Conditional Content**: Show/hide content based on data
- ✅ **Loops**: Repeat content for arrays
- ✅ **Multiple Output Formats**: Generate both DOCX and PDF
- ✅ **Asset Management**: Upload and manage images

## Quick Start

### 1. Template Creation

1. Create a Word document (.docx)
2. Use `{variableName}` placeholders where you want data inserted
3. Save the template in `backend/src/templates/`

Example template content:

```
Legal Case: {hukukNo}
Date: {bugunTarih}
Principal: {asilAdi}
Attorney: {vekilAdi}

{companyLogo}

Accident Details:
- Date: {kazaTarihi}
- Vehicle: {sigortaliPlaka}
- Claim Amount: {aracHasariTalep}
```

### 2. Available Variables

All the same variables from the previous system are available:

| Variable            | Description          | Example      |
| ------------------- | -------------------- | ------------ |
| `{hukukNo}`         | Legal case number    | HUK-TEST-001 |
| `{bugunTarih}`      | Today's date         | 09.07.2025   |
| `{asilAdi}`         | Principal name       | Test User    |
| `{vekilAdi}`        | Attorney name        | Test Lawyer  |
| `{kazaTarihi}`      | Accident date        | 15.06.2024   |
| `{aracHasariTalep}` | Vehicle damage claim | ₺15.000,00   |
| `{degerKaybiTalep}` | Value loss claim     | ₺8.000,00    |

### 3. Image Support

#### Predefined Images

Place these images in `backend/src/assets/`:

- `company-logo.png` → Use `{companyLogo}` in template
- `signature.png` → Use `{signature}` in template
- `header.png` → Use `{headerImage}` in template

#### Upload Images via API

```bash
curl -X POST http://localhost:3001/documents/assets/upload \
  -F "file=@/path/to/your-image.png"
```

### 4. API Endpoints

#### Generate Document

```bash
POST /documents/generate/:foyNo
Content-Type: application/json

{
  "templateName": "template.docx"  // optional
}
```

Response:

```json
{
  "message": "Document generated successfully",
  "htmlContent": "...",
  "pdfDownloadUrl": "/documents/download/rapor_456_1752065518721.pdf",
  "docxDownloadUrl": "/documents/download/document_456_1752065518721.docx"
}
```

#### Get Available Assets

```bash
GET /documents/assets
```

#### Upload Asset

```bash
POST /documents/assets/upload
Content-Type: multipart/form-data

file: [binary data]
```

#### Template Guide

```bash
GET /documents/template-guide
```

## Advanced Features

### Conditional Content

Show content only when certain conditions are met:

```
{#hasInsurance}
Insurance Details:
- Policy: {policeBaslangic} - {policeBitis}
- Coverage: {kazaBasiTeminat}
{/hasInsurance}

{^hasInsurance}
No insurance information available.
{/hasInsurance}
```

### Loops

Repeat content for arrays (future enhancement):

```
{#damages}
- {type}: {amount}
{/damages}
```

## Migration from Old System

### Changes Made

1. **Dependencies**: Added docxtemplater, pizzip, fs-extra
2. **Template Syntax**: Changed from `##variable##` to `{variable}`
3. **Image Support**: Added base64 image embedding
4. **Output**: Now generates both DOCX and PDF
5. **Asset Management**: Added upload and management endpoints

### Template Migration

1. Open your existing template
2. Replace `##variableName##` with `{variableName}`
3. Add image placeholders where needed: `{companyLogo}`
4. Save and test

### Code Changes

- Service returns `{ html, pdfPath, docxPath }` instead of `{ html, pdfPath }`
- Controller handles both PDF and DOCX downloads
- Added asset management endpoints

## Testing

### Test Document Generation

```bash
curl -X POST http://localhost:3001/documents/generate/456 \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Test Asset Upload

```bash
curl -X POST http://localhost:3001/documents/assets/upload \
  -F "file=@logo.png"
```

### Test Asset List

```bash
curl http://localhost:3001/documents/assets
```

## Troubleshooting

### Common Issues

1. **Template not found**
   - Ensure template is in `backend/src/templates/`
   - Check filename matches exactly

2. **Images not showing**
   - Verify image is in `backend/src/assets/`
   - Check filename matches expected names
   - Ensure image is under 5MB

3. **Variables not replaced**
   - Use `{variable}` syntax, not `##variable##`
   - Check variable name spelling
   - Verify data exists in database

4. **PDF generation fails**
   - Check if HTML conversion worked
   - Verify puppeteer can access fonts
   - Check memory/disk space

### Debug Mode

Add logging to see template data:

```typescript
console.log('Template data:', templateData);
```

## Performance Considerations

- Image files are converted to base64, so keep them small
- DOCX generation is faster than PDF
- Template complexity affects processing time
- Consider caching for frequently used templates

## Security Notes

- Image uploads are limited to 5MB
- Only image file types allowed
- Filenames are sanitized
- Templates should be stored securely

## Future Enhancements

- [ ] Loop support for dynamic lists
- [ ] More conditional operators
- [ ] Chart/graph embedding
- [ ] Template versioning
- [ ] Bulk document generation
- [ ] Custom styling options
