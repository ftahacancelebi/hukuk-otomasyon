"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  FileText,
  Eye,
  Pencil,
  Trash2,
  Search,
  Calendar,
  DollarSign,
  User,
  Car,
  FilePlus,
  Download,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCall, API_ENDPOINTS, API_BASE_URL } from "@/lib/utils";

export function CasesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const cases = [
    {
      id: "2024/001",
      title: "İş Kazası Tazminat Davası",
      client: "Mehmet Demir",
      type: "İş Hukuku",
      status: "active",
      priority: "high",
      court: "Ankara 3. İş Mahkemesi",
      startDate: "2024-01-15",
      nextHearing: "2024-02-20",
      lawyer: "Av. Ahmet Yılmaz",
    },
    {
      id: "2024/002",
      title: "Boşanma Davası",
      client: "Ayşe Kaya",
      type: "Aile Hukuku",
      status: "pending",
      priority: "medium",
      court: "Ankara 2. Aile Mahkemesi",
      startDate: "2024-01-14",
      nextHearing: "2024-02-15",
      lawyer: "Av. Zeynep Arslan",
    },
    {
      id: "2024/003",
      title: "Miras Davası",
      client: "Ali Özkan",
      type: "Medeni Hukuk",
      status: "completed",
      priority: "low",
      court: "İstanbul 5. Medeni Mahkeme",
      startDate: "2023-12-01",
      nextHearing: "-",
      lawyer: "Av. Mehmet Kaya",
    },
    {
      id: "2024/004",
      title: "Kira Uyuşmazlığı",
      client: "Fatma Şahin",
      type: "Borçlar Hukuku",
      status: "active",
      priority: "medium",
      court: "Ankara 4. Asliye Hukuk",
      startDate: "2024-01-10",
      nextHearing: "2024-02-25",
      lawyer: "Av. Ahmet Yılmaz",
    },
    {
      id: "2024/005",
      title: "Ticari Dava",
      client: "ABC Şirketi",
      type: "Ticaret Hukuku",
      status: "review",
      priority: "high",
      court: "İstanbul 3. Ticaret Mahkemesi",
      startDate: "2024-01-08",
      nextHearing: "2024-03-01",
      lawyer: "Av. Zeynep Arslan",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Aktif</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Beklemede</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>
        );
      case "review":
        return (
          <Badge className="bg-purple-100 text-purple-800">İncelemede</Badge>
        );
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

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || case_.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Tüm Davalar</h2>
          <p className="text-gray-600">Toplam {filteredCases.length} dava</p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Yeni Dosya Ekle
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtreler ve Arama</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Dava başlığı, müvekkil adı veya dava numarası ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="review">İncelemede</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dava Bilgileri</TableHead>
                <TableHead>Müvekkil</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Mahkeme</TableHead>
                <TableHead>Sonraki Duruşma</TableHead>
                <TableHead>Avukat</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{case_.title}</div>
                      <div className="text-sm text-gray-500">
                        {case_.id} • {case_.type}
                      </div>
                      <div className="text-xs text-gray-400">
                        Başlangıç: {case_.startDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{case_.client}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(case_.status)}</TableCell>
                  <TableCell>{getPriorityBadge(case_.priority)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{case_.court}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{case_.nextHearing}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{case_.lawyer}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                Arama kriterlerinize uygun dava bulunamadı.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
