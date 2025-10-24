// src/app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bell, BarChart2, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// أنواع البيانات المؤقتة (ستُستبدل لاحقًا بـ API)
interface Project {
  id: string;
  title: string;
  sourceLanguage: string;
  targetLanguages: string[];
  progress: number;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  projectId: string;
  dueAt: string;
}

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export default function DashboardPage() {
  // بيانات مؤقتة — ستُستبدل بـ useQuery لاحقًا
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "فن البرمجة",
      sourceLanguage: "en",
      targetLanguages: ["ar"],
      progress: 65,
      updatedAt: "2025-10-20T10:30:00Z",
    },
    {
      id: "2",
      title: "تطوير الويب الحديث",
      sourceLanguage: "en",
      targetLanguages: ["ar"],
      progress: 30,
      updatedAt: "2025-10-19T14:20:00Z",
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: "t1",
      title: "ترجمة الفصل الثالث",
      projectId: "1",
      dueAt: "2025-10-25T00:00:00Z",
    },
    {
      id: "t2",
      title: "مراجعة الفقرات 10-20",
      projectId: "2",
      dueAt: "2025-10-23T00:00:00Z",
    },
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: "n1",
      title: "تم اعتماد ترجمتك",
      body: "تم اعتماد ترجمة مشروع 'فن البرمجة'",
      createdAt: "2025-10-21T09:15:00Z",
      read: false,
    },
    {
      id: "n2",
      title: "تعليق جديد",
      body: "أضاف المراجع تعليقًا على الفقرة 15",
      createdAt: "2025-10-20T16:45:00Z",
      read: true,
    },
  ]);

  const stats = {
    totalProjects: 12,
    activeProjects: 5,
    completedTasks: 48,
    pendingTasks: 7,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 p-6">
      {/* العمود الرئيسي */}
      <div className="space-y-5">
        {/* إحصائيات عامة */}
        <Card>
          <CardHeader>
            <CardTitle>نظرة عامة</CardTitle>
            <CardDescription>إحصائيات سريعة للمشاريع والمهام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="إجمالي المشاريع" value={stats.totalProjects} icon={<BarChart2 className="text-muted-foreground" />} />
              <StatCard label="المشاريع النشطة" value={stats.activeProjects} icon={<CheckCircle className="text-muted-foreground" />} />
              <StatCard label="المهام المكتملة" value={stats.completedTasks} icon={<CheckCircle className="text-muted-foreground" />} />
              <StatCard label="المهام المعلقة" value={stats.pendingTasks} icon={<Clock className="text-muted-foreground" />} />
            </div>
          </CardContent>
        </Card>

        {/* آخر المشاريع */}
        <Card>
          <CardHeader>
            <CardTitle>آخر المشاريع النشطة</CardTitle>
            <CardDescription>مشاريع تم التحديث مؤخراً</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">
                    #{p.id} • {p.sourceLanguage} → {p.targetLanguages.join(", ")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    تم التحديث: {formatDate(p.updatedAt)}
                  </div>
                </div>
                <div className="w-48 flex-shrink-0">
                  <Progress value={clamp(p.progress)} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right mt-1">{p.progress}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* المهام المعلقة */}
        <Card>
          <CardHeader>
            <CardTitle>مهامي (قيد الانتظار)</CardTitle>
            <CardDescription>المهام الموكلة إليك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">
                    تكليف للمشروع: {t.projectId} • الموعد: {formatDate(t.dueAt)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/projects/${t.projectId}`}>فتح</Link>
                  </Button>
                  <Button variant="default" size="sm">
                    تم
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* العمود الجانبي */}
      <div className="space-y-5">
        {/* مخطط التقدم */}
        <Card>
          <CardHeader>
            <CardTitle>نظرة عامة على التقدم</CardTitle>
            <CardDescription>رسم بياني مبسّط لتقدّم المشاريع</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniBarChart projects={projects} />
          </CardContent>
        </Card>

        {/* الإشعارات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              إشعارات النظام <Bell className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>آخر الإشعارات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-sm text-muted-foreground">{n.body}</div>
                  <div className="text-xs text-muted-foreground mt-1">{formatDate(n.createdAt)}</div>
                </div>
                {!n.read && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                    جديد
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// === المكونات المساعدة ===

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </div>
      <div className="text-primary">{icon}</div>
    </div>
  );
}

function MiniBarChart({ projects }: { projects: { id: string; title: string; progress: number }[] }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <div key={p.id}>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">{p.title}</div>
            <div className="text-xs text-muted-foreground">{p.progress}%</div>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-600"
              style={{ width: `${Math.max(0, Math.min(100, p.progress))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}