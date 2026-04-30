import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* existing helper */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* NEW: image path helper for GitHub Pages + dev + staging */
export function getPhotoPath(file: string) {
  return `${import.meta.env.BASE_URL}photos/${file}`;
}