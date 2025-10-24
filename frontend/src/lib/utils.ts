// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateISO(date?: string | number | Date) {
  const d = date ? new Date(date) : new Date()
  return d.toLocaleString()
}

export function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n))
}