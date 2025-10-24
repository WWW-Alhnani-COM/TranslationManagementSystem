export enum UserRole {
  SYSTEM_ADMIN = "SystemAdmin",
  DATA_ENTRY = "DataEntry",
  TRANSLATOR = "Translator",
  REVIEWER = "Reviewer",
  SUPERVISOR = "Supervisor",
}

export enum ProjectStatus {
  CREATED = "CREATED",
  FILE_UPLOADED = "FILE_UPLOADED",
  PARAGRAPHS_SPLIT = "PARAGRAPHS_SPLIT",
  IN_TRANSLATION = "IN_TRANSLATION",
  IN_REVIEW = "IN_REVIEW",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  COMPLETED = "COMPLETED",
}

export enum TranslationStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEEDS_REVISION = "NEEDS_REVISION",
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface Project {
  id: string
  title: string
  description?: string
  sourceLanguage: string
  targetLanguages: TargetLanguage[]
  status: ProjectStatus
  progress: ProjectProgress
  createdBy: User
  createdAt: string
  updatedAt: string
  dueDate?: string
  priority: number
}

export interface TargetLanguage {
  id: string
  languageCode: string
  languageName: string
  assignedTranslator?: User
  status: ProjectStatus
}

export interface ProjectProgress {
  totalParagraphs: number
  translatedParagraphs: number
  reviewedParagraphs: number
  approvedParagraphs: number
  percentageComplete: number
}

export interface Paragraph {
  id: string
  projectId: string
  orderIndex: number
  originalText: string
  status: ProjectStatus
  isLocked: boolean
  lockedBy?: User
  lockedAt?: string
  translations: Translation[]
}

export interface Translation {
  id: string
  paragraphId: string
  targetLanguage: string
  translatedText: string
  version: number
  status: TranslationStatus
  translator: User
  translatedAt: string
  submittedAt?: string
  isCurrent: boolean
}

export interface Review {
  id: string
  translationId: string
  reviewer: User
  reviewedText?: string
  comments?: string
  rating?: number
  status: ReviewStatus
  reviewedAt: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  relatedEntityId?: string
  isRead: boolean
  createdAt: string
  readAt?: string
}

export interface DashboardStats {
  activeProjects: number
  completedToday: number
  pendingTasks: number
  averageRating?: number
}
