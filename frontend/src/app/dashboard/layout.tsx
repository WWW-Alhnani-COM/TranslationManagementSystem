// src/app/dashboard/layout.tsx
"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { UserRole } from "@/lib/types";

// تحديد المسارات المسموحة لكل دور
const ROLE_ROUTES: Record<UserRole, string[]> = {
  [UserRole.SYSTEM_ADMIN]: ["/dashboard", "/dashboard/projects", "/dashboard/users", "/dashboard/reports", "/dashboard/notifications", "/dashboard/settings"],
  [UserRole.DATA_ENTRY]: ["/dashboard", "/dashboard/projects", "/dashboard/reports", "/dashboard/notifications", "/dashboard/settings"],
  [UserRole.TRANSLATOR]: ["/dashboard", "/dashboard/translate", "/dashboard/reports", "/dashboard/notifications", "/dashboard/settings"],
  [UserRole.REVIEWER]: ["/dashboard", "/dashboard/review", "/dashboard/reports", "/dashboard/notifications", "/dashboard/settings"],
  [UserRole.SUPERVISOR]: ["/dashboard", "/dashboard/approval", "/dashboard/reports", "/dashboard/notifications", "/dashboard/settings"],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || !ROLE_ROUTES[user.role]?.some(route => pathname.startsWith(route)))) {
      redirect("/login");
    }
  }, [user, isLoading, pathname]);

  if (isLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">جارٍ التحميل...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar user={user} />
      <div className="flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}