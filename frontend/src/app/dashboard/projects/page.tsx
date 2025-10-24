// src/app/dashboard/projects/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, FileText, Languages, Users } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

type ProjectStep = 'info' | 'languages' | 'files' | 'team' | 'review';
type TargetLanguage = string;

export default function CreateProjectPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<ProjectStep>('info');
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    sourceLanguage: 'en',
    targetLanguages: [] as TargetLanguage[],
    files: [] as File[],
    assignedTranslator: '',
    assignedReviewer: '',
  });

  const SUPPORTED_LANGUAGES = [
    { code: "ar", name: "العربية" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
  ];

  // مستخدمون تجريبيون
  const MOCK_TEAM = [
    { id: "2", username: "translator1", fullName: "أحمد المترجم", role: "Translator" },
    { id: "3", username: "reviewer1", fullName: "سارة المراجعة", role: "Reviewer" },
  ];

  const steps: { id: ProjectStep; label: string }[] = [
    { id: 'info', label: 'معلومات المشروع' },
    { id: 'languages', label: 'اللغات' },
    { id: 'files', label: 'رفع الملفات' },
    { id: 'team', label: 'تعيين الفريق' },
    { id: 'review', label: 'معاينة' },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleAddTargetLanguage = (lang: string) => {
    if (!projectData.targetLanguages.includes(lang)) {
      setProjectData({
        ...projectData,
        targetLanguages: [...projectData.targetLanguages, lang],
      });
    }
  };

  const handleRemoveTargetLanguage = (lang: string) => {
    setProjectData({
      ...projectData,
      targetLanguages: projectData.targetLanguages.filter(l => l !== lang),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectData({
        ...projectData,
        files: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = () => {
    console.log("Project created:", projectData);
    alert("تم إنشاء المشروع بنجاح!");
    router.push("/dashboard/projects");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'info':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المشروع *</Label>
              <Input
                id="name"
                value={projectData.name}
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                placeholder="أدخل اسم المشروع"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                placeholder="وصف مختصر للمشروع"
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 'languages':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>اللغة المصدر *</Label>
              <Select
                value={projectData.sourceLanguage}
                onValueChange={(value) => setProjectData({ ...projectData, sourceLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللغة المصدر" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>اللغات الهدف *</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {projectData.targetLanguages.map(lang => (
                  <Badge key={lang} variant="secondary" className="px-3 py-1">
                    {SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang}
                    <button
                      type="button"
                      onClick={() => handleRemoveTargetLanguage(lang)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={handleAddTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="أضف لغة هدف" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES
                    .filter(lang => lang.code !== projectData.sourceLanguage && !projectData.targetLanguages.includes(lang.code))
                    .map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'files':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <p className="mb-2">اسحب الملفات هنا أو انقر لاختيارها</p>
              <p className="text-sm text-muted-foreground">يدعم: DOCX, PDF, TXT (حتى 10MB)</p>
              <Input
                type="file"
                multiple
                accept=".docx,.pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="mt-2 cursor-pointer text-primary">
                اختيار ملفات
              </Label>
            </div>
            {projectData.files.length > 0 && (
              <div className="space-y-2">
                <Label>الملفات المحددة:</Label>
                <div className="space-y-2">
                  {projectData.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>المترجم *</Label>
              <Select
                value={projectData.assignedTranslator}
                onValueChange={(value) => setProjectData({ ...projectData, assignedTranslator: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مترجمًا" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TEAM.filter(u => u.role === "Translator").map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>المراجع *</Label>
              <Select
                value={projectData.assignedReviewer}
                onValueChange={(value) => setProjectData({ ...projectData, assignedReviewer: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مراجعًا" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TEAM.filter(u => u.role === "Reviewer").map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">معلومات المشروع</h3>
                <p><strong>الاسم:</strong> {projectData.name}</p>
                <p><strong>الوصف:</strong> {projectData.description || "لا يوجد"}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">اللغات</h3>
                <p><strong>المصدر:</strong> {SUPPORTED_LANGUAGES.find(l => l.code === projectData.sourceLanguage)?.name}</p>
                <p><strong>الهدف:</strong> {projectData.targetLanguages.map(l => SUPPORTED_LANGUAGES.find(lang => lang.code === l)?.name).join(', ')}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">الملفات</h3>
              {projectData.files.length > 0 ? (
                <ul className="list-disc pl-5">
                  {projectData.files.map((file, i) => (
                    <li key={i}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">لم يتم رفع أي ملفات</p>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">الفريق</h3>
              <p><strong>المترجم:</strong> {MOCK_TEAM.find(u => u.id === projectData.assignedTranslator)?.fullName || "غير معين"}</p>
              <p><strong>المراجع:</strong> {MOCK_TEAM.find(u => u.id === projectData.assignedReviewer)?.fullName || "غير معين"}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إنشاء مشروع جديد</h1>
        <p className="text-muted-foreground">أنشئ مشروع ترجمة يدويًا باتباع الخطوات التالية</p>
      </div>

      {/* شريط التقدم */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                currentStep === step.id
                  ? 'bg-primary text-primary-foreground'
                  : steps.findIndex(s => s.id === currentStep) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2 text-center max-w-[100px]">{step.label}</span>
          </div>
        ))}
      </div>

      {/* بطاقة النموذج */}
      <Card>
        <CardHeader>
          <CardTitle>{steps.find(s => s.id === currentStep)?.label}</CardTitle>
          <CardDescription>
            {currentStep === 'info' && 'أدخل معلومات أساسية عن المشروع'}
            {currentStep === 'languages' && 'حدد اللغات التي سيتم الترجمة بينها'}
            {currentStep === 'files' && 'ارفع الملفات التي تحتوي على النص الأصلي'}
            {currentStep === 'team' && 'عيّن المترجم والمراجع لهذا المشروع'}
            {currentStep === 'review' && 'راجع المعلومات قبل الإنشاء النهائي'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 'info'}
          >
            السابق
          </Button>
          {currentStep === 'review' ? (
            <Button onClick={handleSubmit}>
              إنشاء المشروع
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!projectData.name}>
              التالي
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}