// src/app/dashboard/reports/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, CheckCircle, Clock, FileText, Users } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const { user } = useAuth();

  // بيانات تقارير تجريبية
  const stats = {
    totalProjects: 24,
    completedProjects: 14,
    inTranslation: 6,
    inReview: 3,
    pendingApproval: 1,
    totalWordsTranslated: 128500,
    avgQualityScore: 4.7,
  };

  const translatorPerformance = [
    { name: "أحمد المترجم", projects: 8, words: 42000, quality: 4.8 },
    { name: "فاطمة المترجمة", projects: 5, words: 31000, quality: 4.6 },
    { name: "خالد المترجم", projects: 3, words: 18500, quality: 4.9 },
  ];

  const reviewerPerformance = [
    { name: "سارة المراجعة", reviewed: 12, avgTime: "2.1 يوم", accuracy: 98 },
    { name: "محمد المراجع", reviewed: 9, avgTime: "2.8 يوم", accuracy: 96 },
  ];

  const projectStatusData = [
    { label: "قيد الترجمة", value: stats.inTranslation, color: "bg-blue-500", percentage: (stats.inTranslation / stats.totalProjects) * 100 },
    { label: "قيد المراجعة", value: stats.inReview, color: "bg-yellow-500", percentage: (stats.inReview / stats.totalProjects) * 100 },
    { label: "بانتظار الاعتماد", value: stats.pendingApproval, color: "bg-purple-500", percentage: (stats.pendingApproval / stats.totalProjects) * 100 },
    { label: "مكتمل", value: stats.completedProjects, color: "bg-green-500", percentage: (stats.completedProjects / stats.totalProjects) * 100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">التقارير والإحصائيات</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء الفريق وتقدم المشاريع</p>
      </div>

      {/* إحصائيات عامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedProjects}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.completedProjects / stats.totalProjects) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الكلمات المترجمة</CardTitle>
            <BarChart2 className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWordsTranslated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">منذ بداية العام</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط جودة الترجمة</CardTitle>
            <Users className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgQualityScore}/5</div>
            <p className="text-xs text-muted-foreground">بناءً على تقييمات المراجعين</p>
          </CardContent>
        </Card>
      </div>

      {/* حالة المشاريع */}
      <Card>
        <CardHeader>
          <CardTitle>حالة المشاريع</CardTitle>
          <CardDescription>توزيع المشاريع حسب الحالة الحالية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectStatusData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span>{item.value} مشروع ({Math.round(item.percentage)}%)</span>
                </div>
                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
  <div 
    className={cn("h-full rounded-full", item.color)} 
    style={{ width: `${item.percentage}%` }}
  />
</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* أداء المترجمين */}
      <Card>
        <CardHeader>
          <CardTitle>أداء المترجمين</CardTitle>
          <CardDescription>المشاريع والكلمات وجودة الترجمة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {translatorPerformance.map((translator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="font-medium truncate">{translator.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {translator.projects} مشروع • {translator.words.toLocaleString()} كلمة
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{translator.quality}/5</p>
                  <p className="text-xs text-muted-foreground">جودة</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* أداء المراجعين */}
      <Card>
        <CardHeader>
          <CardTitle>أداء المراجعين</CardTitle>
          <CardDescription>عدد المراجعات ومتوسط الوقت والدقة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewerPerformance.map((reviewer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="font-medium truncate">{reviewer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {reviewer.reviewed} مراجعة • {reviewer.avgTime} لكل مراجعة
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{reviewer.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">دقة</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}