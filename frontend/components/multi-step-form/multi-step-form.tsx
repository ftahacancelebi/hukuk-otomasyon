"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiCall, API_ENDPOINTS } from "@/lib/utils";

import { FileBasicInformationStep } from "./steps/file-basic-information-step";
import { PartyInformationStep } from "./steps/party-information-step";
import { InsurancePolicyStep } from "./steps/insurance-policy-step";
import { AccidentInformationStep } from "./steps/accident-information-step";
import { PaymentInformationStep } from "./steps/payment-information-step";
import { DamageAssessmentStep } from "./steps/damage-assessment-step";
import { ReviewStep } from "./steps/review-step";
import { ResultStep } from "./steps/result-step";

// Define the complete form schema based on the backend File entity
const formSchema = z.object({
  // File Basic Information
  foyNo: z
    .number()
    .int()
    .positive("Dosya numarası pozitif bir tam sayı olmalıdır"),
  esasNo: z.string().optional(),
  hukukNo: z.string().optional(),
  taslakAdi: z.string().optional(),

  // Party Information
  basvuran: z.string().optional(),
  vekil: z.string().optional(),
  bagliHukuk: z.string().optional(),
  bagliHasar: z.string().optional(),

  // Insurance Policy & Vehicle Information
  policeBaslangicTarihi: z.string().optional(),
  policeBitisTarihi: z.string().optional(),
  policeKontrol: z.boolean().optional(),
  sigortaliPlaka: z.string().optional(),
  karsiPlaka: z.string().optional(),
  aracBasiTeminat: z.number().optional(),
  kazaBasiTeminat: z.number().optional(),

  // Accident Information
  kazaTarihi: z.string().optional(),
  gun: z.number().int().optional(),

  // Payment Information
  asilOdemeTuru: z.string().optional(),
  asilOdemeTarihi: z.string().optional(),
  asilOdemeTutari: z.number().optional(),
  dogrudanOdemeTarihi: z.string().optional(),
  dogrudanOdemeTutari: z.number().optional(),

  // Damage Assessment
  tahminiAracHasari: z.number().optional(),
  tahminiDegerKaybi: z.number().optional(),
  tahminiEkspertizUcreti: z.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: "fileBasic",
    title: "Dosya Bilgileri",
    description: "Temel dosya tanımlayıcılarını girin",
    component: FileBasicInformationStep,
  },
  {
    id: "party",
    title: "Taraf Bilgileri",
    description: "Başvuran ve vekil bilgilerini girin",
    component: PartyInformationStep,
  },
  {
    id: "insurance",
    title: "Sigorta & Araç",
    description: "Poliçe ve araç bilgilerini girin",
    component: InsurancePolicyStep,
  },
  {
    id: "accident",
    title: "Kaza Bilgileri",
    description: "Olay bilgilerini girin",
    component: AccidentInformationStep,
  },
  {
    id: "payment",
    title: "Ödeme Bilgileri",
    description: "Ödeme detaylarını girin",
    component: PaymentInformationStep,
  },
  {
    id: "damage",
    title: "Hasar Değerlendirmesi",
    description: "Tahmini maliyetleri ve hasarları girin",
    component: DamageAssessmentStep,
  },
  {
    id: "review",
    title: "İnceleme",
    description: "Dosyanızı inceleyin ve gönderin",
    component: ReviewStep,
  },
  {
    id: "result",
    title: "Sonuç",
    description: "İşlem sonucu ve belge yönetimi",
    component: ResultStep,
  },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isSuccess: boolean;
    error?: string;
    data?: any;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foyNo: undefined,
      esasNo: "",
      hukukNo: "",
      taslakAdi: "",
      basvuran: "",
      vekil: "",
      bagliHukuk: "",
      bagliHasar: "",
      policeBaslangicTarihi: "",
      policeBitisTarihi: "",
      policeKontrol: false,
      sigortaliPlaka: "",
      karsiPlaka: "",
      aracBasiTeminat: undefined,
      kazaBasiTeminat: undefined,
      kazaTarihi: "",
      gun: undefined,
      asilOdemeTuru: "",
      asilOdemeTarihi: "",
      asilOdemeTutari: undefined,
      dogrudanOdemeTarihi: "",
      dogrudanOdemeTutari: undefined,
      tahminiAracHasari: undefined,
      tahminiDegerKaybi: undefined,
      tahminiEkspertizUcreti: undefined,
    },
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log(
        `Navigating to step ${currentStep + 2} - No HTTP request made`
      );
    }
  };

  const prevStep = () => {
    // Only navigate backwards - NO HTTP request
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      console.log(`Navigating to step ${currentStep} - No HTTP request made`);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Extra safety check: Only submit if we're on the review step (second to last)
    if (currentStep !== steps.length - 2) {
      console.log("Form submission blocked - not on review step");
      return;
    }

    console.log("🚀 Making HTTP request to create file...");
    setIsSubmitting(true);
    try {
      // Prepare data for backend - convert string numbers to numbers and filter empty strings
      const formattedData = {
        foyNo: Number(data.foyNo),
        esasNo: data.esasNo || undefined,
        hukukNo: data.hukukNo || undefined,
        taslakAdi: data.taslakAdi || undefined,
        basvuran: data.basvuran || undefined,
        vekil: data.vekil || undefined,
        bagliHukuk: data.bagliHukuk || undefined,
        bagliHasar: data.bagliHasar || undefined,
        policeBaslangicTarihi: data.policeBaslangicTarihi || undefined,
        policeBitisTarihi: data.policeBitisTarihi || undefined,
        policeKontrol: data.policeKontrol,
        sigortaliPlaka: data.sigortaliPlaka || undefined,
        karsiPlaka: data.karsiPlaka || undefined,
        aracBasiTeminat: data.aracBasiTeminat
          ? Number(data.aracBasiTeminat)
          : undefined,
        kazaBasiTeminat: data.kazaBasiTeminat
          ? Number(data.kazaBasiTeminat)
          : undefined,
        kazaTarihi: data.kazaTarihi || undefined,
        gun: data.gun ? Number(data.gun) : undefined,
        asilOdemeTuru: data.asilOdemeTuru || undefined,
        asilOdemeTarihi: data.asilOdemeTarihi || undefined,
        asilOdemeTutari: data.asilOdemeTutari
          ? Number(data.asilOdemeTutari)
          : undefined,
        dogrudanOdemeTarihi: data.dogrudanOdemeTarihi || undefined,
        dogrudanOdemeTutari: data.dogrudanOdemeTutari
          ? Number(data.dogrudanOdemeTutari)
          : undefined,
        tahminiAracHasari: data.tahminiAracHasari
          ? Number(data.tahminiAracHasari)
          : undefined,
        tahminiDegerKaybi: data.tahminiDegerKaybi
          ? Number(data.tahminiDegerKaybi)
          : undefined,
        tahminiEkspertizUcreti: data.tahminiEkspertizUcreti
          ? Number(data.tahminiEkspertizUcreti)
          : undefined,
      };

      // Remove undefined values to clean up the payload
      Object.keys(formattedData).forEach((key) => {
        if (formattedData[key as keyof typeof formattedData] === undefined) {
          delete formattedData[key as keyof typeof formattedData];
        }
      });

      console.log("Form gönderildi:", formattedData);

      // Make API call to backend using helper function
      const result = await apiCall(API_ENDPOINTS.FILES_CREATE, {
        method: "POST",
        body: JSON.stringify(formattedData),
      });

      console.log("File created successfully:", result);

      // Set success result and navigate to result step
      setSubmissionResult({
        isSuccess: true,
        data: result,
      });
      setCurrentStep(steps.length - 1); // Navigate to result step
    } catch (error) {
      console.error("Gönderim hatası:", error);

      // Set error result and navigate to result step
      setSubmissionResult({
        isSuccess: false,
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
      });
      setCurrentStep(steps.length - 1); // Navigate to result step
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ["foyNo"];
      case 1:
        return [];
      case 2:
        return [];
      case 3:
        return [];
      case 4:
        return [];
      case 5:
        return [];
      case 6:
        return [];
      case 7:
        return [];
      default:
        return [];
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="w-full p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div>
              <CardTitle>Yeni Dosya Oluştur</CardTitle>
              <CardDescription>
                Adım {currentStep + 1} / {steps.length}:{" "}
                {steps[currentStep].description}
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              %{Math.round(progress)} Tamamlandı
            </div>
          </div>
          <Progress value={progress} className="mb-6" />

          {/* Step indicators */}
          <div className="flex justify-between mb-6 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-0 ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-1 text-center max-w-20">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === steps.length - 1 && submissionResult ? (
                <CurrentStepComponent
                  isSuccess={submissionResult.isSuccess}
                  error={submissionResult.error}
                  submissionResult={submissionResult.data}
                />
              ) : (
                <CurrentStepComponent />
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    prevStep();
                  }}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Önceki
                </Button>

                {currentStep === steps.length - 2 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800"
                    onClick={() => {
                      console.log(
                        "📤 Submit button clicked - Will make HTTP request"
                      );
                    }}
                  >
                    {isSubmitting ? "Oluşturuluyor..." : " Dosya Oluştur"}
                  </Button>
                ) : currentStep === steps.length - 1 ? (
                  // On result step, don't show navigation buttons
                  <div />
                ) : (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      nextStep();
                    }}
                    className="flex items-center gap-2"
                  >
                    Sonraki
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
