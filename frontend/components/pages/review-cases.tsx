"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Download,
  Send,
} from "lucide-react";

interface CaseForReview {
  id: string;
  title: string;
  client: string;
  type: string;
  priority: string;
  status: "pending_review" | "under_review" | "approved" | "rejected";
  submittedBy: string;
  submittedDate: string;
  description: string;
  documents: string[];
  reviewNotes?: string;
  reviewer?: string;
  reviewDate?: string;
}

export function ReviewCases() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDecision, setReviewDecision] = useState<
    "approve" | "reject" | ""
  >("");

  const casesForReview: CaseForReview[] = [
    {
      id: "2024/006",
      title: "Haksız Fesih Davası",
      client: "Selma Öztürk",
      type: "İş Hukuku",
      priority: "high",
      status: "pending_review",
      submittedBy: "Av. Zeynep Arslan",
      submittedDate: "2024-01-16",
      description:
        "Müvekkil işten haksız yere feshedildiğini iddia ediyor. İşveren herhangi bir gerekçe sunmadan iş sözleşmesini feshetmiş. İş güvencesi hükümlerinden yararlanabilecek durumda olan müvekkil için dava açılması gerekiyor.",
      documents: [
        "İş Sözleşmesi",
        "Fesih Bildirimi",
        "SGK Hizmet Dökümü",
        "Maaş Bordroları",
      ],
    },
    {
      id: "2024/007",
      title: "Nafaka Artırım Davası",
      client: "Aylin Kaya",
      type: "Aile Hukuku",
      priority: "medium",
      status: "under_review",
      submittedBy: "Av. Mehmet Kaya",
      submittedDate: "2024-01-15",
      description:
        "Müvekkil eski eşinden aldığı nafakanın mevcut ekonomik koşullara göre yetersiz olduğunu belirtmekte. Çocuğun eğitim giderleri ve genel yaşam maliyetlerindeki artış nedeniyle nafaka artırımı talep edilmekte.",
      documents: [
        "Nafaka Kararı",
        "Gelir Belgeleri",
        "Eğitim Giderleri",
        "Kira Sözleşmesi",
      ],
      reviewNotes: "Belgelerin tamamlanması gerekiyor.",
      reviewer: "Av. Ahmet Yılmaz",
    },
    {
      id: "2024/008",
      title: "Ticari Alacak Davası",
      client: "XYZ Ltd. Şti.",
      type: "Ticaret Hukuku",
      priority: "medium",
      status: "approved",
      submittedBy: "Av. Zeynep Arslan",
      submittedDate: "2024-01-14",
      description:
        "Müşteri firma ile yapılan hizmet sözleşmesi gereği sunulan hizmetlerin bedeli ödenmemiş. Resmî ihbarname gönderilmesine rağmen ödeme yapılmadı.",
      documents: ["Hizmet Sözleşmesi", "Faturalar", "İhbarname", "Yazışmalar"],
      reviewNotes: "Dava dosyası eksiksiz. Onaylandı.",
      reviewer: "Av. Ahmet Yılmaz",
      reviewDate: "2024-01-15",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "under_review":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            İnceleme Bekliyor
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-orange-100 text-orange-800">İnceleniyor</Badge>
        );
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Onaylandı</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Reddedildi</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Yüksek</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Orta</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Düşük</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleReview = (caseId: string, decision: "approve" | "reject") => {
    // Here you would typically make an API call to update the case status
    console.log(`Case ${caseId} ${decision}ed with notes:`, reviewNotes);
    setReviewNotes("");
    setReviewDecision("");
    setSelectedCase(null);
  };

  const selectedCaseData = casesForReview.find((c) => c.id === selectedCase);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dava Gözden Geçirme</h2>
        <p className="text-gray-600">
          İnceleme bekleyen ve gözden geçirilen davalar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                İnceleme Bekleyen Davalar
              </CardTitle>
              <CardDescription>
                Onay bekleyen{" "}
                {
                  casesForReview.filter((c) => c.status === "pending_review")
                    .length
                }{" "}
                dava
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {casesForReview.map((case_) => (
                <div
                  key={case_.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCase === case_.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCase(case_.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(case_.status)}
                        <span className="font-medium">{case_.title}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-3 h-3" />
                        <span>{case_.client}</span>
                        <span>•</span>
                        <span>{case_.type}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStatusBadge(case_.status)}
                        {getPriorityBadge(case_.priority)}
                      </div>

                      <div className="text-xs text-gray-500">
                        Gönderen: {case_.submittedBy} • {case_.submittedDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Case Details */}
        <div>
          {selectedCaseData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedCaseData.title}</CardTitle>
                    <CardDescription>
                      Dava No: {selectedCaseData.id}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedCaseData.status)}
                    {getPriorityBadge(selectedCaseData.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Case Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Müvekkil:</span>
                    <div className="font-medium">{selectedCaseData.client}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Dava Türü:</span>
                    <div className="font-medium">{selectedCaseData.type}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Gönderen:</span>
                    <div className="font-medium">
                      {selectedCaseData.submittedBy}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Tarih:</span>
                    <div className="font-medium">
                      {selectedCaseData.submittedDate}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Dava Açıklaması</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedCaseData.description}
                  </p>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-medium mb-2">Belgeler</h4>
                  <div className="space-y-2">
                    {selectedCaseData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Review Notes */}
                {selectedCaseData.reviewNotes && (
                  <div>
                    <h4 className="font-medium mb-2">İnceleme Notları</h4>
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="text-sm">{selectedCaseData.reviewNotes}</p>
                      {selectedCaseData.reviewer && (
                        <div className="text-xs text-gray-500 mt-2">
                          {selectedCaseData.reviewer} -{" "}
                          {selectedCaseData.reviewDate}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Review Actions */}
                {selectedCaseData.status === "pending_review" && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">İnceleme Sonucu</h4>

                      <Textarea
                        placeholder="İnceleme notlarınızı buraya yazın..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="min-h-[100px]"
                      />

                      <div className="flex space-x-2">
                        <Button
                          onClick={() =>
                            handleReview(selectedCaseData.id, "approve")
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Onayla
                        </Button>
                        <Button
                          onClick={() =>
                            handleReview(selectedCaseData.id, "reject")
                          }
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reddet
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>İncelemek için bir dava seçin</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
