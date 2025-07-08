"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  FileText,
  Plus,
  Search,
  Settings,
  Users,
  Calendar,
  BarChart3,
  Bell,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "cases", name: "Davalar", icon: FileText },
  { id: "new-case", name: "Yeni Dava", icon: Plus },
  { id: "review", name: "Gözden Geçir", icon: Search },
  { id: "clients", name: "Müvekkiller", icon: Users },
  { id: "calendar", name: "Takvim", icon: Calendar },
  { id: "reports", name: "Raporlar", icon: BarChart3 },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-slate-50 border-r border-slate-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div
          className={`flex h-16 items-center border-b border-slate-200 ${
            isCollapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900 ms-2">
                Hukuk Kuşu
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full ${
                  isCollapsed ? "justify-center px-2" : "justify-start px-3"
                } ${
                  isActive
                    ? "bg-slate-700 text-white hover:bg-slate-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className={`${isCollapsed ? "" : "mr-3"} w-4 h-4`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Status Card */}
        {!isCollapsed && (
          <div className="p-4">
            <Card className="p-4 bg-slate-100 border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">24</div>
                <div className="text-sm text-slate-600">Aktif Dava</div>
                <div className="flex justify-center mt-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-300 text-slate-600"
                  >
                    +3 Bu Hafta
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Settings */}
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            className={`w-full ${
              isCollapsed ? "justify-center px-2" : "justify-start px-3"
            } text-slate-700 hover:bg-slate-100`}
          >
            <Settings className={`${isCollapsed ? "" : "mr-3"} w-4 h-4`} />
            {!isCollapsed && <span>Ayarlar</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
