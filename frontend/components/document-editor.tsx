"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  generateHtmlDocument,
  generateWordDocument,
  updateHtmlTemplate as apiUpdateHtmlTemplate,
  API_BASE_URL,
} from "@/lib/utils";

interface DocumentGenerationResult {
  message: string;
  htmlContent: string;
  templateType: "html" | "docx";
  pdfDownloadUrl: string;
  docxDownloadUrl?: string;
}

interface DocumentEditorProps {
  foyNo: number;
  initialTemplate?: "template.html" | "template.docx";
}

export default function DocumentEditor({
  foyNo,
  initialTemplate = "template.html",
}: DocumentEditorProps) {
  const [templateType, setTemplateType] = useState<
    "template.html" | "template.docx"
  >(initialTemplate);
  const [result, setResult] = useState<DocumentGenerationResult | null>(null);
  const [editedHtml, setEditedHtml] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDocumentForCase = async (templateName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let data: DocumentGenerationResult;

      if (templateName === "template.html") {
        const htmlResult = await generateHtmlDocument(foyNo);
        data = {
          message: htmlResult.message,
          htmlContent: htmlResult.result,
          templateType: "html",
          pdfDownloadUrl: `/documents/generate/pdf/${foyNo}`,
        };
      } else {
        const wordResult = await generateWordDocument(foyNo, templateName);
        data = {
          message: wordResult.message,
          htmlContent: "",
          templateType: "docx",
          pdfDownloadUrl: "",
          docxDownloadUrl: wordResult.path,
        };
      }
      setResult(data);
      setEditedHtml(data.htmlContent);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const updateHtmlDocument = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiUpdateHtmlTemplate(foyNo, editedHtml);
      setResult((prevResult) => ({
        ...prevResult!,
        htmlContent: data.htmlContent,
        pdfDownloadUrl: data.pdfDownloadUrl,
      }));
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (
    newTemplate: "template.html" | "template.docx"
  ) => {
    setTemplateType(newTemplate);
    generateDocumentForCase(newTemplate);
  };

  useEffect(() => {
    generateDocumentForCase(templateType);
  }, [foyNo]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Generator - Case #{foyNo}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={templateType === "template.html" ? "default" : "outline"}
              onClick={() => handleTemplateChange("template.html")}
              disabled={isLoading}
            >
              HTML Template
              <Badge variant="secondary" className="ml-2">
                Editable
              </Badge>
            </Button>
            <Button
              variant={templateType === "template.docx" ? "default" : "outline"}
              onClick={() => handleTemplateChange("template.docx")}
              disabled={isLoading}
            >
              DOCX Template
              <Badge variant="secondary" className="ml-2">
                Advanced
              </Badge>
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Preview and Editor */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Editor (only for HTML templates) */}
          {result.templateType === "html" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    HTML Editor
                  </span>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditedHtml(result.htmlContent);
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={updateHtmlDocument}
                          disabled={isLoading}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save & Update PDF
                        </Button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={editedHtml}
                  onChange={(e) => setEditedHtml(e.target.value)}
                  disabled={!isEditing}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="HTML content will appear here..."
                />
              </CardContent>
            </Card>
          )}

          {/* Preview */}
          <Card
            className={result.templateType === "docx" ? "lg:col-span-2" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Document Preview
                <Badge
                  variant={
                    result.templateType === "html" ? "default" : "secondary"
                  }
                >
                  {result.templateType.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-md p-4 max-h-[500px] overflow-y-auto bg-white"
                dangerouslySetInnerHTML={{ __html: result.htmlContent }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Download Actions */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild>
                <a
                  href={`${API_BASE_URL}${result.pdfDownloadUrl}`}
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>

              {result.docxDownloadUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={`${API_BASE_URL}${result.docxDownloadUrl}`}
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download DOCX
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => generateDocumentForCase(templateType)}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div>
            <strong>HTML Template:</strong> Best for frontend editing, direct
            HTML manipulation, real-time preview
          </div>
          <div>
            <strong>DOCX Template:</strong> Best for complex layouts,
            conditional content, image embedding
          </div>
          <div>
            <strong>API Endpoints:</strong>
          </div>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <code>POST /documents/generate/:foyNo</code> - Generate from
              template
            </li>
            <li>
              <code>POST /documents/update-html/:foyNo</code> - Update HTML and
              regenerate PDF
            </li>
            <li>
              <code>GET /documents/template-guide</code> - Get template usage
              guide
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
