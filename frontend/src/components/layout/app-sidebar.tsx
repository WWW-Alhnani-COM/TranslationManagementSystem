// src/components/layout/app-sidebar.tsx
"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Languages,
  FileCheck,
  CheckCircle,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Bell,
} from "lucide-react";
import { type User, UserRole } from "@/lib/types";
import { ROLE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  user: User;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: "لوحة التحكم",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "المشاريع",
    href: "/dashboard/projects",
    icon: <FolderOpen className="w-5 h-5" />,
  },
  {
    label: "الترجمة",
    href: "/dashboard/translate",
    icon: <Languages className="w-5 h-5" />,
    roles: [UserRole.TRANSLATOR],
  },
  {
    label: "المراجعة",
    href: "/dashboard/review",
    icon: <FileCheck className="w-5 h-5" />,
    roles: [UserRole.REVIEWER],
  },
  {
    label: "الاعتماد",
    href: "/dashboard/approval",
    icon: <CheckCircle className="w-5 h-5" />,
    roles: [UserRole.SUPERVISOR],
  },
  {
    label: "التقارير",
    href: "/dashboard/reports",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: "الإشعارات",
    href: "/dashboard/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    label: "المستخدمين",
    href: "/dashboard/users",
    icon: <Users className="w-5 h-5" />,
    roles: [UserRole.SYSTEM_ADMIN],
  },
  {
    label: "الإعدادات",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export function AppSidebar({ user }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const filteredNavItems = navItems.filter((item) => !item.roles || item.roles.includes(user.role));
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && <h1 className="text-lg font-semibold text-sidebar-foreground">نظام الترجمة</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                "text-sidebar-foreground hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent font-medium",
                isCollapsed && "justify-center",
              )}
            >
              {item.icon}
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
              {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer",
            isCollapsed && "justify-center",
          )}
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{ROLE_LABELS[user.role].ar}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}