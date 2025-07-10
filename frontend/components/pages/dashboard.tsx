"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Toplam Dava",
      value: "127",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
    },
    {
      title: "Aktif Müvekkil",
      value: "89",
      change: "+8%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Bu Ay Duruşma",
      value: "23",
      change: "+5%",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Başarı Oranı",
      value: "94%",
      change: "+2%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ];

  const recentCases = [
    {
      id: "2024/001",
      title: "İş Kazası Tazminat Davası",
      client: "Mehmet Demir",
      status: "active",
      priority: "high",
      date: "2024-01-15",
    },
    {
      id: "2024/002",
      title: "Boşanma Davası",
      client: "Ayşe Kaya",
      status: "pending",
      priority: "medium",
      date: "2024-01-14",
    },
    {
      id: "2024/003",
      title: "Miras Davası",
      client: "Ali Özkan",
      status: "completed",
      priority: "low",
      date: "2024-01-13",
    },
  ];

  const upcomingDeadlines = [
    {
      title: "Dilekçe Sunumu",
      case: "2024/001",
      date: "2024-01-20",
      days: 3,
    },
    {
      title: "Duruşma",
      case: "2024/005",
      date: "2024-01-25",
      days: 8,
    },
    {
      title: "Belge Toplama",
      case: "2024/003",
      date: "2024-01-30",
      days: 13,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-slate-200 text-slate-800">Aktif</Badge>;
      case "pending":
        return <Badge className="bg-slate-300 text-slate-700">Beklemede</Badge>;
      case "completed":
        return (
          <Badge className="bg-slate-700 text-slate-100">Tamamlandı</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-slate-800 text-slate-100">Yüksek</Badge>;
      case "medium":
        return <Badge className="bg-slate-500 text-slate-100">Orta</Badge>;
      case "low":
        return <Badge className="bg-slate-300 text-slate-800">Düşük</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-700">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-700">{stat.change}</span> geçen
                  aydan
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-700">Son Davalar</CardTitle>
                <CardDescription className="text-slate-600">
                  En son eklenen ve güncellenen davalar
                </CardDescription>
              </div>
              <Button size="sm" className="bg-slate-700 hover:bg-slate-800">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Dosya
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div
                  key={case_.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-700">
                        {case_.title}
                      </span>
                      {getStatusBadge(case_.status)}
                      {getPriorityBadge(case_.priority)}
                    </div>
                    <div className="text-sm text-slate-600">
                      Dava No: {case_.id} • Müvekkil: {case_.client}
                    </div>
                    <div className="text-xs text-slate-500">{case_.date}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    Görüntüle
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-700">
              <Clock className="w-4 h-4" />
              <span>Yaklaşan Görevler</span>
            </CardTitle>
            <CardDescription className="text-slate-600">
              Önemli tarihler ve görevler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {deadline.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-300 text-slate-600"
                    >
                      {deadline.days} gün
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    Dava: {deadline.case} • {deadline.date}
                  </div>
                  <Progress
                    value={((15 - deadline.days) / 15) * 100}
                    className="h-1"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-700">Hızlı İşlemler</CardTitle>
          <CardDescription className="text-slate-600">
            Sık kullanılan işlemlere hızlı erişim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-24 flex flex-col space-y-2 bg-slate-700 hover:bg-slate-800">
              <Plus className="w-6 h-6" />
              <span>Yeni Dosya</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col space-y-2 border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Users className="w-6 h-6" />
              <span>Müvekkil Ekle</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col space-y-2 border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Calendar className="w-6 h-6" />
              <span>Randevu</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col space-y-2 border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <FileText className="w-6 h-6" />
              <span>Rapor Oluştur</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
