// src/app/dashboard/review/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Save, CheckCircle, AlertCircle, FileText, MessageCircle } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [paragraphs, setParagraphs] = useState<any[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بيانات تجريبية
  useEffect(() => {
    const mockProjects = [
      {
        id: "2",
        title: "تطوير الويب الحديث",
        sourceLanguage: "en",
        targetLanguage: "ar",
        totalParagraphs: 20,
        reviewedParagraphs: 12,
        paragraphs: [
          {
            id: "p1",
            original: "Web development is the work involved in developing a website for the Internet or an intranet.",
            translated: "تطوير الويب هو العمل المتعلق بتطوير موقع ويب للإنترنت أو شبكة داخلية.",
          },
          {
            id: "p2",
            original: "Web development can range from developing a simple single static page of plain text to complex web applications.",
            translated: "يمكن أن يتراوح تطوير الويب من تطوير صفحة ثابتة بسيطة من نص عادي إلى تطبيقات ويب معقدة.",
          },
          {
            id: "p3",
            original: "A web developer may implement both client-side and server-side software.",
            translated: "قد يقوم مطور الويب بتنفيذ برامجيات جانب العميل وجانب الخادم معًا.",
          },
        ],
      },
    ];
    setProjects(mockProjects);
    setSelectedProject(mockProjects[0]);
    setParagraphs(mockProjects[0].paragraphs);
  }, []);

  const handleCommentChange = (paragraphId: string, text: string) => {
    setComments(prev => ({ ...prev, [paragraphId]: text }));
  };

  const handleRatingChange = (paragraphId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [paragraphId]: rating }));
  };

  const saveReview = async () => {
    if (!selectedProject) return;
    setIsSaving(true);
    // محاكاة الحفظ
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem(`review-comments-${selectedProject.id}`, JSON.stringify(comments));
    localStorage.setItem(`review-ratings-${selectedProject.id}`, JSON.stringify(ratings));
    setIsSaving(false);
    alert("تم حفظ المراجعة بنجاح!");
  };

  const submitReview = async (status: 'approved' | 'needs_revision') => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    // محاكاة الإرسال
    await new Promise(resolve => setTimeout(resolve, 800));
    const message = status === 'approved' 
      ? "تم اعتماد الترجمة بنجاح!" 
      : "تم طلب مراجعة إضافية!";
    alert(message);
    router.push("/dashboard/projects");
  };

  const currentParagraph = paragraphs[currentParagraphIndex];
  const progress = selectedProject 
    ? ((selectedProject.reviewedParagraphs + Object.keys(comments).length) / selectedProject.totalParagraphs) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">المراجعة</h1>
        <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/projects")}>
          <FileText className="w-4 h-4 ml-2" />
          العودة إلى المشاريع
        </Button>
      </div>

      {selectedProject && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {selectedProject.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.sourceLanguage} → {selectedProject.targetLanguage}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {Object.keys(comments).length} / {selectedProject.totalParagraphs} فقرة
                </p>
                <Progress value={progress} className="h-2 mt-1" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentParagraph ? (
              <div className="space-y-6">
                {/* النص الأصلي */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    النص الأصلي ({selectedProject.sourceLanguage})
                  </label>
                  <div className="bg-muted/30 p-4 rounded-lg min-h-[100px] border border-border">
                    <p className="text-foreground">{currentParagraph.original}</p>
                  </div>
                </div>

                {/* الترجمة */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    الترجمة ({selectedProject.targetLanguage})
                  </label>
                  <div className="bg-muted/30 p-4 rounded-lg min-h-[100px] border border-border">
                    <p className="text-foreground">{currentParagraph.translated}</p>
                  </div>
                </div>

                {/* التعليقات والتقييم */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      التعليقات
                    </label>
                    <Textarea
                      value={comments[currentParagraph.id] || ""}
                      onChange={(e) => handleCommentChange(currentParagraph.id, e.target.value)}
                      placeholder="أضف تعليقاتك على الترجمة..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      تقييم الجودة
                    </label>
                    <Select
                      value={ratings[currentParagraph.id]?.toString() || ""}
                      onValueChange={(value) => handleRatingChange(currentParagraph.id, parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تقييمًا" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 - ممتاز</SelectItem>
                        <SelectItem value="4">4 - جيد جدًّا</SelectItem>
                        <SelectItem value="3">3 - جيد</SelectItem>
                        <SelectItem value="2">2 - مقبول</SelectItem>
                        <SelectItem value="1">1 - ضعيف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex flex-wrap gap-3 justify-between pt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentParagraphIndex(Math.max(0, currentParagraphIndex - 1))}
                      disabled={currentParagraphIndex === 0}
                    >
                      الفقرة السابقة
                    </Button>
                    <Button
                      onClick={() => setCurrentParagraphIndex(Math.min(paragraphs.length - 1, currentParagraphIndex + 1))}
                      disabled={currentParagraphIndex === paragraphs.length - 1}
                    >
                      الفقرة التالية
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={saveReview} disabled={isSaving}>
                      <Save className="w-4 h-4 ml-2" />
                      {isSaving ? "جاري الحفظ..." : "حفظ المراجعة"}
                    </Button>
                    <Button variant="destructive" onClick={() => submitReview('needs_revision')} disabled={isSubmitting}>
                      <AlertCircle className="w-4 h-4 ml-2" />
                      {isSubmitting ? "جاري الإرسال..." : "طلب مراجعة"}
                    </Button>
                    <Button onClick={() => submitReview('approved')} disabled={isSubmitting}>
                      <CheckCircle className="w-4 h-4 ml-2" />
                      {isSubmitting ? "جاري الاعتماد..." : "اعتماد الترجمة"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد فقرات للمراجعة</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}