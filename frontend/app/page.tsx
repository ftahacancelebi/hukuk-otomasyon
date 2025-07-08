"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Dashboard } from "@/components/pages/dashboard";
import { CasesList } from "@/components/pages/cases-list";
import { ReviewCases } from "@/components/pages/review-cases";
import { MultiStepForm } from "@/components/multi-step-form/multi-step-form";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "Dashboard";
      case "cases":
        return "Davalar";
      case "new-case":
        return "Yeni Dava";
      case "review":
        return "Gözden Geçir";
      case "clients":
        return "Müvekkiller";
      case "calendar":
        return "Takvim";
      case "reports":
        return "Raporlar";
      default:
        return "Hukuk Kuşu";
    }
  };

  const getPageSubtitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "Genel bakış ve özet bilgiler";
      case "cases":
        return "Tüm davalarınızı görüntüleyin ve yönetin";
      case "new-case":
        return "Yeni dava dosyası oluşturun";
      case "review":
        return "Davaları gözden geçirin ve onaylayın";
      case "clients":
        return "Müvekkil bilgilerini yönetin";
      case "calendar":
        return "Duruşma ve randevularınızı takip edin";
      case "reports":
        return "Detaylı raporlar ve analizler";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "cases":
        return <CasesList />;
      case "new-case":
        return (
          <div className="max-w-4xl mx-auto">
            <MultiStepForm />
          </div>
        );
      case "review":
        return <ReviewCases />;
      case "clients":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Müvekkiller
            </h3>
            <p className="text-gray-600">Bu bölüm henüz geliştiriliyor...</p>
          </div>
        );
      case "calendar":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Takvim</h3>
            <p className="text-gray-600">Bu bölüm henüz geliştiriliyor...</p>
          </div>
        );
      case "reports":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Raporlar</h3>
            <p className="text-gray-600">Bu bölüm henüz geliştiriliyor...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={getPageTitle()} subtitle={getPageSubtitle()} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
