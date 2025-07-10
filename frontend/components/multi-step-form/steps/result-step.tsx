"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  CheckCircle,
  AlertCircle,
  Download,
  FileText,
  File,
  RefreshCw,
  Edit,
  Eye,
  Save,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  generatePdfDocument,
  generateWordDocument,
  generateHtmlDocument,
  updateHtmlTemplate,
  API_BASE_URL,
} from "@/lib/utils";
import type { FormData } from "../multi-step-form";

// Dynamic import for CKEditor to avoid SSR issues
import dynamic from "next/dynamic";

const CKEditor = dynamic(
  () =>
    import("@ckeditor/ckeditor5-react").then((mod) => ({
      default: mod.CKEditor,
    })),
  {
    ssr: false,
  }
);

// Import ClassicEditor properly
let ClassicEditor: any;
if (typeof window !== "undefined") {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
}

interface ResultStepProps {
  isSuccess?: boolean;
  error?: string;
  submissionResult?: any;
}

export function ResultStep({
  isSuccess = false,
  error,
  submissionResult,
}: ResultStepProps) {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [editorData, setEditorData] = useState("");
  const [isLoadingHtml, setIsLoadingHtml] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDownloadPDF = async () => {
    if (!data.foyNo) return;

    try {
      const result = await generatePdfDocument(data.foyNo);
      if (result.path) {
        const downloadUrl = `${API_BASE_URL}${result.path}`;
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("PDF download error:", error);
      alert("PDF indirme hatası oluştu!");
    }
  };

  const handleDownloadWord = async () => {
    if (!data.foyNo) return;

    setIsGenerating(true);
    try {
      const result = await generateWordDocument(data.foyNo, "template.docx");

      if (result.path) {
        const downloadUrl = `${API_BASE_URL}${result.path}`;
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Word document generation error:", error);
      alert("Word belgesi oluşturulurken hata oluştu!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditOnline = async () => {
    if (!data.foyNo) return;

    setIsLoadingHtml(true);
    try {
      const result = await generateHtmlDocument(data.foyNo);
      if (result.result) {
        setHtmlContent(result.result);
        setEditorData(result.result);
        setShowEditor(true);
      }
    } catch (error) {
      console.error("HTML generation error:", error);
      alert("HTML belgesi yüklenirken hata oluştu!");
    } finally {
      setIsLoadingHtml(false);
    }
  };

  const handleSaveAndDownload = async () => {
    if (!data.foyNo) return;

    setIsSaving(true);
    try {
      const result = await updateHtmlTemplate(data.foyNo, editorData);
      if (result.pdfDownloadUrl) {
        const downloadUrl = `${API_BASE_URL}${result.pdfDownloadUrl}`;
        window.open(downloadUrl, "_blank");
        alert("Değişiklikler kaydedildi ve PDF indirildi!");
      }
    } catch (error) {
      console.error("Save and download error:", error);
      alert("Kaydetme işlemi sırasında hata oluştu!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditorData("");
    setHtmlContent("");
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card
        className={`border-2 ${
          isSuccess
            ? "border-green-300 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle size={24} className="text-green-600" />
            ) : (
              <AlertCircle size={24} className="text-red-600" />
            )}
            {isSuccess
              ? "Dosya Başarıyla Oluşturuldu!"
              : "Dosya Oluşturma Hatası"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <p className="text-green-700">
                Dosyanız başarıyla oluşturuldu (Foy No: {data.foyNo}). Şimdi
                belge üretimi yapabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="text-red-700">
              <p className="mb-2">Dosya oluşturulurken bir hata oluştu:</p>
              <p className="bg-red-100 p-2 rounded text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Actions */}
      {isSuccess && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Belge İşlemleri Seçenekleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">
                Belge İşlemleri Seçenekleri
              </h3>
              <p className="text-muted-foreground">
                Dosyanız için aşağıdaki seçeneklerden birini kullanabilirsiniz:
              </p>
            </div>

            {/* Three Main Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Word Download - Dark Slate */}
              <Card className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-slate-600 bg-slate-50 hover:bg-slate-100">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-800">
                      Word Belgesi
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Düzenlenebilir Word formatında indir
                    </p>
                    <Button
                      onClick={handleDownloadWord}
                      disabled={isGenerating}
                      className="w-full bg-slate-700 hover:bg-slate-800 text-white"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Hazırlanıyor...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Word İndir
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Option 2: PDF Download - Light Slate */}
              <Card className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-slate-300 bg-white hover:bg-slate-50">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                    <File className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-700">
                      PDF Belgesi
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">
                      Sabit formatta PDF olarak indir
                    </p>
                    <Button
                      onClick={handleDownloadPDF}
                      disabled={isGenerating}
                      className="w-full bg-slate-300 hover:bg-slate-400 text-slate-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF İndir
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Option 3: Edit Online - Dark Mode Style */}
              <Card className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-slate-700 bg-slate-800 hover:bg-slate-900">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
                    <Edit className="w-8 h-8 text-slate-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-white">
                      Online Düzenle
                    </h4>
                    <p className="text-sm text-slate-300 mb-4">
                      Tarayıcıda düzenle ve PDF olarak indir
                    </p>
                    <Button
                      onClick={handleEditOnline}
                      disabled={isLoadingHtml}
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white"
                    >
                      {isLoadingHtml ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Yükleniyor...
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Online Düzenle
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Online Editor Modal */}
      {showEditor && (
        <Card className="border-2 border-green-300">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-green-600" />
                Online Belge Düzenleyici - Foy No: {data.foyNo}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseEditor}
                className="hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="text-sm text-muted-foreground">
              <p>
                Aşağıdaki editörde belgenizi düzenleyebilirsiniz.
                Değişikliklerinizi tamamladıktan sonra "Kaydet ve PDF İndir"
                butonuna tıklayın.
              </p>
            </div>

            {/* CKEditor Component */}
            <div className="border rounded-lg overflow-hidden">
              {typeof window !== "undefined" && ClassicEditor && (
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setEditorData(data);
                  }}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "|",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "indent",
                      "outdent",
                      "|",
                      "link",
                      "blockQuote",
                      "insertTable",
                      "|",
                      "undo",
                      "redo",
                    ],
                    placeholder: "Belgenizi düzenlemeye başlayın...",
                  }}
                />
              )}
            </div>

            {/* Editor Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (htmlContent) {
                      setEditorData(htmlContent);
                    }
                  }}
                  className="hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sıfırla
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCloseEditor}
                  className="hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  İptal
                </Button>
                <Button
                  onClick={handleSaveAndDownload}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet ve PDF İndir
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
