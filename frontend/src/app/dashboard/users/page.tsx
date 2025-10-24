// src/app/dashboard/users/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ← التغيير هنا

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter(); // ← التغيير هنا

  // بيانات تجريبية للمستخدمين
  const mockUsers = [
    { id: "1", username: "admin", fullName: "مدير النظام", role: "SystemAdmin", email: "admin@example.com" },
    { id: "2", username: "translator1", fullName: "أحمد المترجم", role: "Translator", email: "t1@example.com" },
    { id: "3", username: "reviewer1", fullName: "سارة المراجعة", role: "Reviewer", email: "r1@example.com" },
    { id: "4", username: "dataentry1", fullName: "علي مدخل البيانات", role: "DataEntry", email: "d1@example.com" },
  ];

  // حماية الصفحة: فقط مدير النظام يمكنه الدخول
  useEffect(() => {
    if (user?.role !== "SystemAdmin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <Button>
          <UserPlus className="w-4 h-4 ml-2" />
          إضافة مستخدم جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المستخدم</TableHead>
                <TableHead>الاسم الكامل</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell>{u.fullName}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-muted rounded text-sm">
                      {u.role === "SystemAdmin" ? "مدير النظام" : 
                       u.role === "Translator" ? "مترجم" :
                       u.role === "Reviewer" ? "مراجع" : "مدخل بيانات"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2 space-x-reverse">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}