# Document Service Enhancement

## Overview

The document service has been enhanced to support both **DOCX** and **HTML** templates, providing flexible document generation with frontend editing capabilities.

## 🚀 Key Features

### 1. Dual Template Support

- **DOCX Templates**: Advanced features using Docxtemplater (conditional content, loops, image embedding)
- **HTML Templates**: Direct HTML editing with frontend integration

### 2. Frontend Editing

- Real-time HTML editing in the frontend
- Live preview functionality
- Save and regenerate PDF from edited content

### 3. Enhanced API Endpoints

- Generate documents from either template type
- Update HTML templates and regenerate PDFs
- Comprehensive template guide

## 📁 File Structure

```
backend/
├── src/
│   ├── documents/
│   │   ├── documents.controller.ts    # Enhanced with HTML update endpoint
│   │   ├── documents.service.ts       # Dual template processing
│   │   └── documents.module.ts
│   └── templates/
│       ├── template.docx              # DOCX template (Docxtemplater format)
│       └── template.html              # HTML template (##variable## format)
frontend/
└── components/
    └── document-editor.tsx            # React component for editing
```

## 🔧 API Endpoints

### Generate Document

```http
POST /documents/generate/:foyNo
Content-Type: application/json

{
  "templateName": "template.html" | "template.docx"
}
```

**Response:**

```json
{
  "message": "Document generated successfully",
  "htmlContent": "<html>...</html>",
  "templateType": "html" | "docx",
  "pdfDownloadUrl": "/documents/download/rapor_1453_1234567890.pdf",
  "docxDownloadUrl": "/documents/download/document_1453_1234567890.docx" // Only for DOCX templates
}
```

### Update HTML Template

```http
POST /documents/update-html/:foyNo
Content-Type: application/json

{
  "htmlContent": "<html>...edited content...</html>"
}
```

**Response:**

```json
{
  "message": "HTML template updated successfully",
  "htmlContent": "<html>...updated content...</html>",
  "pdfDownloadUrl": "/documents/download/updated_rapor_1453_1234567890.pdf"
}
```

### Template Guide

```http
GET /documents/template-guide
```

## 📝 Template Formats

### DOCX Template (template.docx)

- **Variable Syntax**: `{variableName}`
- **Features**: Conditional content, loops, image embedding
- **Example**: `{hukukNo}`, `{bugunTarih}`, `{asilAdi}`

### HTML Template (template.html)

- **Variable Syntax**: `##variableName##`
- **Features**: Direct HTML editing, frontend integration
- **Example**: `##hukukNo##`, `##bugunTarih##`, `##asilAdi##`

## 🎯 Available Variables

| Variable              | Description           | Example Value   |
| --------------------- | --------------------- | --------------- |
| `hukukNo`             | Legal case number     | "HUK-2024-001"  |
| `bugunTarih`          | Today's date          | "15.01.2024"    |
| `dosyaEsasNo`         | File basis number     | "ESS-001"       |
| `asilAdi`             | Principal name        | "John Doe"      |
| `vekilAdi`            | Attorney name         | "Attorney Name" |
| `kazaTarihi`          | Accident date         | "10.01.2024"    |
| `karsiAracPlaka`      | Other vehicle plate   | "34 ABC 123"    |
| `sigortaliPlaka`      | Insured vehicle plate | "06 XYZ 456"    |
| `aracHasariTalep`     | Vehicle damage claim  | "₺12.355,00"    |
| `degerKaybiTalep`     | Value loss claim      | "₺800,00"       |
| `ekspertizTalep`      | Expert fee claim      | "₺500,00"       |
| `policeBaslangic`     | Policy start date     | "01.01.2024"    |
| `policeBitis`         | Policy end date       | "31.12.2024"    |
| `aracBasiTeminat`     | Per vehicle coverage  | "₺50.000,00"    |
| `kazaBasiTeminat`     | Per accident coverage | "₺10.000,00"    |
| `aracHasarOdemeTarih` | Payment date          | "15.01.2024"    |
| `aracHasarOdemeTutar` | Payment amount        | "₺1.600,00"     |
| `bakiyeLimit`         | Remaining coverage    | "₺8.400,00"     |
| `bagliHukukDosya`     | Related legal file    | "REL-001"       |

## 💻 Frontend Integration

### Basic Usage

```tsx
import DocumentEditor from "@/components/document-editor";

function MyComponent() {
  return <DocumentEditor foyNo={1453} initialTemplate="template.html" />;
}
```

### Features

- **Template Selection**: Toggle between HTML and DOCX templates
- **Live Editing**: Edit HTML content directly in the browser
- **Real-time Preview**: See changes immediately
- **Save & Update**: Generate new PDFs from edited content
- **Download Options**: Download both PDF and DOCX (when available)

## 🛠 Technical Implementation

### Service Architecture

```typescript
class DocumentService {
  // Main generation method - routes to appropriate processor
  generateDocument(foyNo: number, templateName: string);

  // HTML template processing with ##variable## syntax
  private processHtmlTemplate(templatePath: string, templateData: any);

  // DOCX template processing with {variable} syntax
  private processDocxTemplate(
    templatePath: string,
    templateData: any,
    foyNo: number
  );

  // Frontend editing support
  updateHtmlTemplate(foyNo: number, updatedHtml: string);
}
```

### Template Processing Flow

1. **Template Detection**: Automatically detect template type by file extension
2. **Data Mapping**: Convert file data to template variables
3. **Variable Replacement**: Apply appropriate templating engine
4. **PDF Generation**: Convert final HTML to PDF using Puppeteer
5. **Return Results**: Provide HTML, PDF, and optional DOCX

## 🎨 Frontend Component Features

### DocumentEditor Component

- **Responsive Design**: Works on desktop and mobile
- **Template Switching**: Easy toggle between template types
- **Rich Editing**: HTML editor with syntax highlighting
- **Error Handling**: Comprehensive error messages
- **Loading States**: Visual feedback during operations
- **Download Management**: Direct download links for generated files

### UI Components Used

- Shadcn/UI components for consistent design
- Lucide React icons for visual elements
- Tailwind CSS for styling
- TypeScript for type safety

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Test the API

```bash
# Generate HTML template document
curl -X POST http://localhost:3000/documents/generate/1453 \
  -H "Content-Type: application/json" \
  -d '{"templateName": "template.html"}'

# Generate DOCX template document
curl -X POST http://localhost:3000/documents/generate/1453 \
  -H "Content-Type: application/json" \
  -d '{"templateName": "template.docx"}'
```

## 📋 Best Practices

### When to Use HTML Templates

- ✅ Need frontend editing capabilities
- ✅ Simple variable replacement
- ✅ Real-time content updates
- ✅ Direct HTML manipulation

### When to Use DOCX Templates

- ✅ Complex document layouts
- ✅ Conditional content (if/else logic)
- ✅ Iterative content (loops)
- ✅ Image embedding requirements
- ✅ Advanced formatting needs

## 🔄 Workflow Integration

### Typical Frontend Workflow

1. User selects case (foyNo)
2. Choose template type (HTML for editing, DOCX for advanced features)
3. Generate initial document
4. Edit HTML content if using HTML template
5. Save changes and regenerate PDF
6. Download final documents

### Backend Processing

1. Receive generation request with template type
2. Load case data from database
3. Apply appropriate template processor
4. Generate HTML content
5. Convert to PDF
6. Return results to frontend

## 🎯 Benefits

### For Developers

- **Flexibility**: Support for multiple template formats
- **Maintainability**: Clean separation of concerns
- **Extensibility**: Easy to add new template types
- **Type Safety**: Full TypeScript support

### For Users

- **Ease of Use**: Intuitive frontend interface
- **Real-time Editing**: Immediate visual feedback
- **Multiple Formats**: PDF and DOCX output options
- **Professional Output**: High-quality document generation

This enhancement provides a complete solution for document generation with both powerful backend processing and user-friendly frontend editing capabilities.
