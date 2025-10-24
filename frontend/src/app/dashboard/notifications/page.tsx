// src/app/dashboard/notifications/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Eye, FileText, MessageCircle, UserCheck } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useState } from "react";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "تم اعتماد ترجمتك",
      message: "تم اعتماد ترجمة مشروع 'فن البرمجة' بنجاح",
      type: "approval",
      read: false,
      createdAt: "2025-10-21T09:15:00Z",
    },
    {
      id: "2",
      title: "تعليق جديد",
      message: "أضاف المراجع سارة تعليقًا على الفقرة 15 في مشروع 'تطوير الويب الحديث'",
      type: "comment",
      read: false,
      createdAt: "2025-10-20T16:45:00Z",
    },
    {
      id: "3",
      title: "تم تحديث المشروع",
      message: "تم إضافة فقرات جديدة إلى مشروع 'الذكاء الاصطناعي للمبتدئين'",
      type: "project_update",
      read: true,
      createdAt: "2025-10-19T11:30:00Z",
    },
    {
      id: "4",
      title: "تم تعيينك كمترجم",
      message: "تم تعيينك كمترجم لمشروع 'أساسيات قواعد البيانات'",
      type: "assignment",
      read: true,
      createdAt: "2025-10-18T14:20:00Z",
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ساعة مضت`;
    }
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <UserCheck className="w-4 h-4 text-green-500" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "project_update":
        return <FileText className="w-4 h-4 text-purple-500" />;
      case "assignment":
        return <UserCheck className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الإشعارات</h1>
          <p className="text-muted-foreground">عرض جميع الإشعارات والتنبيهات</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          <Eye className="w-4 h-4 ml-2" />
          تعليم الكل كمقروء
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الإشعارات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">لا توجد إشعارات</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? "border-border bg-background hover:bg-muted/30"
                    : "border-primary bg-primary/5 hover:bg-primary/10"
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-foreground">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                          جديد
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {notification.read ? (
                    <Check className="w-5 h-5 text-muted-foreground mt-0.5" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}