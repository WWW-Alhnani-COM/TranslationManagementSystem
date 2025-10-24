// src/app/dashboard/translate/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Save, Send, Languages, FileText } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TranslatePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [paragraphs, setParagraphs] = useState<any[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بيانات تجريبية
  useEffect(() => {
    const mockProjects = [
      {
        id: "1",
        title: "فن البرمجة",
        sourceLanguage: "en",
        targetLanguage: "ar",
        totalParagraphs: 24,
        translatedParagraphs: 15,
        paragraphs: [
          { id: "p1", original: "Programming is the process of creating a set of instructions that tell a computer how to perform a task.", translated: "" },
          { id: "p2", original: "A programmer writes code in a programming language such as Python, Java, or C++.", translated: "" },
          { id: "p3", original: "The code is then compiled or interpreted by the computer to execute the instructions.", translated: "" },
        ],
      },
    ];
    setProjects(mockProjects);
    setSelectedProject(mockProjects[0]);
    setParagraphs(mockProjects[0].paragraphs);
  }, []);

  // تحميل الترجمات المحفوظة مسبقًا
  useEffect(() => {
    if (selectedProject) {
      const saved = localStorage.getItem(`translations-${selectedProject.id}`);
      if (saved) {
        setTranslations(JSON.parse(saved));
      }
    }
  }, [selectedProject]);

  const handleTranslationChange = (paragraphId: string, text: string) => {
    setTranslations(prev => ({ ...prev, [paragraphId]: text }));
  };

  const saveDraft = async () => {
    if (!selectedProject) return;
    setIsSaving(true);
    // محاكاة الحفظ
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem(`translations-${selectedProject.id}`, JSON.stringify(translations));
    setIsSaving(false);
    alert("تم حفظ المسودة بنجاح!");
  };

  const submitTranslation = async () => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    // محاكاة الإرسال
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("تم إرسال الترجمة للمراجعة!");
    router.push("/dashboard/projects");
  };

  const currentParagraph = paragraphs[currentParagraphIndex];
  const progress = selectedProject 
    ? ((selectedProject.translatedParagraphs + Object.keys(translations).length) / selectedProject.totalParagraphs) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الترجمة</h1>
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
                  <Languages className="w-5 h-5" />
                  {selectedProject.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.sourceLanguage} → {selectedProject.targetLanguage}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {Object.keys(translations).length} / {selectedProject.totalParagraphs} فقرة
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

                {/* مربع الترجمة */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    الترجمة ({selectedProject.targetLanguage})
                  </label>
                  <Textarea
                    value={translations[currentParagraph.id] || ""}
                    onChange={(e) => handleTranslationChange(currentParagraph.id, e.target.value)}
                    placeholder="اكتب الترجمة هنا..."
                    className="min-h-[120px]"
                  />
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
                    <Button variant="secondary" onClick={saveDraft} disabled={isSaving}>
                      <Save className="w-4 h-4 ml-2" />
                      {isSaving ? "جاري الحفظ..." : "حفظ المسودة"}
                    </Button>
                    <Button onClick={submitTranslation} disabled={isSubmitting}>
                      <Send className="w-4 h-4 ml-2" />
                      {isSubmitting ? "جاري الإرسال..." : "إرسال للترجمة"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد فقرات للترجمة</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}