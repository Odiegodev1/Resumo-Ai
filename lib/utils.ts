import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function countWords(text: string) {
  return text.trim().split(/\s+/).length
}


export  function readingTimeSeconds(words: number) {
  return Math.round((words / 200) * 60)
}

