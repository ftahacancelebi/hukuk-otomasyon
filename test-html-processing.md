# Testing HTML Template Processing with ##variable## Syntax

## Overview

The enhanced document service now processes HTML templates with `##variable##` syntax and generates PDFs using Puppeteer.

## ✅ Features Implemented

### 1. **HTML Variable Processing**

- ✅ Replaces `##variable##` with actual data from database
- ✅ Supports all standard template variables
- ✅ Includes HTML-specific aliases
- ✅ Handles missing/undefined variables with "..." placeholder
- ✅ Detailed logging for debugging

### 2. **Enhanced PDF Generation**

- ✅ Uses Puppeteer with optimized settings
- ✅ A4 format with proper margins
- ✅ Background printing enabled
- ✅ Timeout and error handling
- ✅ Detailed logging for troubleshooting

### 3. **Test Endpoint**

- ✅ `/documents/test-html-processing/:foyNo` for testing
- ✅ Provides default test HTML with various variables
- ✅ Returns processed HTML and PDF download link
- ✅ Shows variable replacement statistics

## 🧪 Testing Commands

### 1. Test with Default HTML Template

```bash
curl -X POST http://localhost:5001/documents/test-html-processing/1453 \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 2. Test with Custom HTML

```bash
curl -X POST http://localhost:5001/documents/test-html-processing/1453 \
  -H "Content-Type: application/json" \
  -d '{
    "htmlContent": "<html><body><h1>Case ##hukukNo##</h1><p>Principal: ##asilAdi##</p><p>Date: ##bugunTarih##</p></body></html>"
  }'
```

### 3. Generate Document from HTML Template

```bash
curl -X POST http://localhost:5001/documents/generate/1453 \
  -H "Content-Type: application/json" \
  -d '{"templateName": "template.html"}'
```

### 4. Update HTML and Regenerate PDF

```bash
curl -X POST http://localhost:5001/documents/update-html/1453 \
  -H "Content-Type: application/json" \
  -d '{
    "htmlContent": "<html><body><h1>Updated Document</h1><p>Case: ##hukukNo##</p></body></html>"
  }'
```

## 📝 Expected Output

### Console Logs (Backend)

```
🔄 Processing HTML template variables...
📝 Found 15 variables to replace: ["##hukukNo##", "##bugunTarih##", ...]
✅ Replaced ##hukukNo## with: HUK-2024-001
✅ Replaced ##bugunTarih## with: 15.01.2024
...
⚠️  Found 2 unresolved variables: ["##undefined_variable##", "##missing_var##"]
✅ HTML processing complete: 13 variables replaced

🔄 Starting PDF generation with Puppeteer...
📄 HTML content length: 2543 characters
💾 Output path: /path/to/generated/updated_rapor_1453_1234567890.pdf
📝 Setting HTML content...
🖨️  Generating PDF...
✅ PDF generated successfully
```

### API Response

```json
{
  "message": "HTML processing test completed",
  "originalHtml": "<html><head><title>Test Document...",
  "processedHtml": "<html><head><title>Test Document - HUK-2024-001...",
  "fullProcessedHtml": "<!-- Complete processed HTML -->",
  "pdfDownloadUrl": "/documents/download/updated_rapor_1453_1234567890.pdf",
  "variableInfo": {
    "totalLength": 2543,
    "containsUndefined": false
  }
}
```

## 🎯 Variable Processing Examples

### Input HTML

```html
<html>
  <body>
    <h1>Legal Case ##hukukNo##</h1>
    <p>Principal: ##asilAdi##</p>
    <p>Attorney: ##vekilAdi##</p>
    <p>Date: ##bugunTarih##</p>
    <p>Accident: ##kazaTarihi##</p>
    <p>Vehicle: ##sigortaliPlaka##</p>
    <p>Claim: ##aracHasariTalep##</p>
    <p>Payment: ##aracHasarOdemeTutar##</p>

    <!-- HTML-specific aliases -->
    <p>Esas: ##esasd1##</p>
    <p>Başvuran: ##başvuran##</p>
    <p>Avukat: ##avukat ismi##</p>

    <!-- Missing variable -->
    <p>Undefined: ##missing_var##</p>
  </body>
</html>
```

### Processed Output

```html
<html>
  <body>
    <h1>Legal Case HUK-2024-001</h1>
    <p>Principal: John Doe</p>
    <p>Attorney: Attorney Name</p>
    <p>Date: 15.01.2024</p>
    <p>Accident: 10.01.2024</p>
    <p>Vehicle: 06 XYZ 456</p>
    <p>Claim: ₺12.355,00</p>
    <p>Payment: ₺1.600,00</p>

    <!-- HTML-specific aliases -->
    <p>Esas: ESS-001</p>
    <p>Başvuran: John Doe</p>
    <p>Avukat: Attorney Name</p>

    <!-- Missing variable replaced with placeholder -->
    <p>Undefined: ...</p>
  </body>
</html>
```

## 🔧 Available Variables

All these variables can be used with `##variable##` syntax:

| Variable                  | Example Value   | Description           |
| ------------------------- | --------------- | --------------------- |
| `##hukukNo##`             | "HUK-2024-001"  | Legal case number     |
| `##bugunTarih##`          | "15.01.2024"    | Today's date          |
| `##dosyaEsasNo##`         | "ESS-001"       | File basis number     |
| `##asilAdi##`             | "John Doe"      | Principal name        |
| `##vekilAdi##`            | "Attorney Name" | Attorney name         |
| `##kazaTarihi##`          | "10.01.2024"    | Accident date         |
| `##sigortaliPlaka##`      | "06 XYZ 456"    | Insured vehicle plate |
| `##karsiAracPlaka##`      | "34 ABC 123"    | Other vehicle plate   |
| `##aracHasariTalep##`     | "₺12.355,00"    | Vehicle damage claim  |
| `##aracHasarOdemeTutar##` | "₺1.600,00"     | Payment amount        |
| `##bakiyeLimit##`         | "₺8.400,00"     | Remaining coverage    |

### HTML-Specific Aliases

| Alias               | Maps To         | Example         |
| ------------------- | --------------- | --------------- |
| `##esasd1##`        | dosyaEsasNo     | "ESS-001"       |
| `##başvuran##`      | asilAdi         | "John Doe"      |
| `##avukat ismi##`   | vekilAdi        | "Attorney Name" |
| `##hukuk firması##` | bagliHukukDosya | "REL-001"       |

## 🚀 Frontend Integration

```typescript
import { testHtmlProcessing } from "@/lib/utils";

// Test HTML processing
const result = await testHtmlProcessing(1453);
console.log("Processed HTML:", result.fullProcessedHtml);

// Test with custom HTML
const customResult = await testHtmlProcessing(
  1453,
  `
  <html>
    <body>
      <h1>Case ##hukukNo##</h1>
      <p>Principal: ##asilAdi##</p>
    </body>
  </html>
`
);
```

## ✅ Verification Steps

1. **Start Backend**: `cd backend && npm run start:dev`
2. **Test Variable Processing**: Run curl command above
3. **Check Console Logs**: Verify variables are being replaced
4. **Download PDF**: Use the provided download URL
5. **Verify PDF Content**: Check that variables are properly replaced

## 🎯 Benefits

- ✅ **Real-time Processing**: Variables replaced immediately
- ✅ **Comprehensive Logging**: Detailed processing information
- ✅ **Error Handling**: Graceful handling of missing variables
- ✅ **PDF Generation**: High-quality PDF output with Puppeteer
- ✅ **Frontend Ready**: Easy integration with React components
- ✅ **Test Endpoint**: Built-in testing functionality

The HTML template processing with `##variable##` syntax is now fully functional and ready for production use!
