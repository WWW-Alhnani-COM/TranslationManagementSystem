import {  ProjectStatus, TranslationStatus, ReviewStatus } from "./types"

import { UserRole } from "./types";

export const ROLE_LABELS: Record<UserRole, { en: string; ar: string }> = {
  [UserRole.SYSTEM_ADMIN]: { en: "System Admin", ar: "مدير النظام" },
  [UserRole.DATA_ENTRY]: { en: "Data Entry", ar: "مدخل البيانات" },
  [UserRole.TRANSLATOR]: { en: "Translator", ar: "مترجم" },
  [UserRole.REVIEWER]: { en: "Reviewer", ar: "مراجع" },
  [UserRole.SUPERVISOR]: { en: "Supervisor", ar: "مشرف" },
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, { en: string; ar: string; color: string }> = {
  [ProjectStatus.CREATED]: { en: "Created", ar: "تم الإنشاء", color: "gray" },
  [ProjectStatus.FILE_UPLOADED]: { en: "File Uploaded", ar: "تم رفع الملف", color: "blue" },
  [ProjectStatus.PARAGRAPHS_SPLIT]: { en: "Paragraphs Split", ar: "تم تقسيم الفقرات", color: "cyan" },
  [ProjectStatus.IN_TRANSLATION]: { en: "In Translation", ar: "قيد الترجمة", color: "yellow" },
  [ProjectStatus.IN_REVIEW]: { en: "In Review", ar: "قيد المراجعة", color: "orange" },
  [ProjectStatus.PENDING_APPROVAL]: { en: "Pending Approval", ar: "بانتظار الاعتماد", color: "purple" },
  [ProjectStatus.COMPLETED]: { en: "Completed", ar: "مكتمل", color: "green" },
}

export const TRANSLATION_STATUS_LABELS: Record<TranslationStatus, { en: string; ar: string; color: string }> = {
  [TranslationStatus.DRAFT]: { en: "Draft", ar: "مسودة", color: "gray" },
  [TranslationStatus.SUBMITTED]: { en: "Submitted", ar: "تم الإرسال", color: "blue" },
  [TranslationStatus.UNDER_REVIEW]: { en: "Under Review", ar: "قيد المراجعة", color: "yellow" },
  [TranslationStatus.APPROVED]: { en: "Approved", ar: "معتمد", color: "green" },
  [TranslationStatus.REJECTED]: { en: "Rejected", ar: "مرفوض", color: "red" },
}

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, { en: string; ar: string; color: string }> = {
  [ReviewStatus.PENDING]: { en: "Pending", ar: "قيد الانتظار", color: "gray" },
  [ReviewStatus.APPROVED]: { en: "Approved", ar: "معتمد", color: "green" },
  [ReviewStatus.REJECTED]: { en: "Rejected", ar: "مرفوض", color: "red" },
  [ReviewStatus.NEEDS_REVISION]: { en: "Needs Revision", ar: "يحتاج مراجعة", color: "orange" },
}

export const SUPPORTED_LANGUAGES = [
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
]

export const FILE_TYPES = {
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  PDF: "application/pdf",
  TXT: "text/plain",
}


export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
