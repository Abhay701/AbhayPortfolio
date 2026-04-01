import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDay(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}
