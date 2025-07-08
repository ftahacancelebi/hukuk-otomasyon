"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { usePathname } from "next/navigation";

const routeConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Genel bakış ve özet bilgiler",
  },
  "/cases": {
    title: "Davalar",
    subtitle: "Tüm davalarınızı görüntüleyin ve yönetin",
  },
  "/new-case": {
    title: "Yeni Dava",
    subtitle: "Yeni dava dosyası oluşturun",
  },
  "/review": {
    title: "Gözden Geçir",
    subtitle: "Davaları gözden geçirin ve onaylayın",
  },
  "/clients": {
    title: "Müvekkiller",
    subtitle: "Müvekkil bilgilerini yönetin",
  },
  "/calendar": {
    title: "Takvim",
    subtitle: "Duruşma ve randevularınızı takip edin",
  },
  "/reports": {
    title: "Raporlar",
    subtitle: "Detaylı raporlar ve analizler",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentRoute = routeConfig[pathname as keyof typeof routeConfig] || {
    title: "mubasir",
    subtitle: "",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={currentRoute.title} subtitle={currentRoute.subtitle} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
