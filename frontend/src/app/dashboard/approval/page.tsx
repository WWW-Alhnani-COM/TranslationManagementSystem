// src/app/dashboard/approval/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, FileText, MessageCircle } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApprovalPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [paragraphs, setParagraphs] = useState<any[]>([]);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [rejectionComment, setRejectionComment] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // بيانات تجريبية
  useEffect(() => {
    const mockProjects = [
      {
        id: "3",
        title: "الذكاء الاصطناعي للمبتدئين",
        sourceLanguage: "en",
        targetLanguage: "ar",
        totalParagraphs: 30,
        approvedParagraphs: 0,
        paragraphs: [
          {
            id: "p1",
            original: "Artificial Intelligence (AI) is the simulation of human intelligence in machines.",
            translated: "الذكاء الاصطناعي (AI) هو محاكاة الذكاء البشري في الآلات.",
          },
          {
            id: "p2",
            original: "AI systems can perform tasks that typically require human intelligence.",
            translated: "يمكن لأنظمة الذكاء الاصطناعي أداء مهام تتطلب عادةً ذكاءً بشريًا.",
          },
          {
            id: "p3",
            original: "Machine learning is a subset of AI that focuses on algorithms that improve automatically through experience.",
            translated: "يعد التعلم الآلي فئة فرعية من الذكاء الاصطناعي تركز على الخوارزميات التي تتحسن تلقائيًا من خلال الخبرة.",
          },
        ],
      },
    ];
    setProjects(mockProjects);
    setSelectedProject(mockProjects[0]);
    setParagraphs(mockProjects[0].paragraphs);
  }, []);

  const approveProject = async () => {
    if (!selectedProject) return;
    setIsApproving(true);
    // محاكاة الاعتماد
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("تم اعتماد المشروع بنجاح!");
    router.push("/dashboard/projects");
  };

  const rejectProject = async () => {
    if (!selectedProject || !rejectionComment.trim()) {
      alert("يرجى إضافة سبب للرفض");
      return;
    }
    setIsRejecting(true);
    // محاكاة الرفض
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("تم رفض المشروع وإرسال الملاحظات للمراجع!");
    router.push("/dashboard/projects");
  };

  const currentParagraph = paragraphs[currentParagraphIndex];
  const progress = selectedProject 
    ? (selectedProject.approvedParagraphs / selectedProject.totalParagraphs) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الاعتماد</h1>
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
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {selectedProject.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.sourceLanguage} → {selectedProject.targetLanguage}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {selectedProject.approvedParagraphs} / {selectedProject.totalParagraphs} فقرة معتمدة
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

                {/* الترجمة النهائية */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    الترجمة النهائية ({selectedProject.targetLanguage})
                  </label>
                  <div className="bg-muted/30 p-4 rounded-lg min-h-[100px] border border-border">
                    <p className="text-foreground">{currentParagraph.translated}</p>
                  </div>
                </div>

                {/* ملاحظات الرفض */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    ملاحظات الرفض (في حالة الرفض)
                  </label>
                  <Textarea
                    value={rejectionComment}
                    onChange={(e) => setRejectionComment(e.target.value)}
                    placeholder="أضف ملاحظاتك في حالة رفض المشروع..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* أزرار الاعتماد/الرفض */}
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
                    <Button variant="destructive" onClick={rejectProject} disabled={isRejecting}>
                      <XCircle className="w-4 h-4 ml-2" />
                      {isRejecting ? "جاري الرفض..." : "رفض الاعتماد"}
                    </Button>
                    <Button onClick={approveProject} disabled={isApproving}>
                      <CheckCircle className="w-4 h-4 ml-2" />
                      {isApproving ? "جاري الاعتماد..." : "اعتماد المشروع"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد فقرات للاعتماد</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}