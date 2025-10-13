import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMinutes } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fonction utilitaire pour simuler des délais réseau
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//get start of today
export function getStartOfToday(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}


export function getTotalDuration(endTime: Date, startTime: Date): number {
  return differenceInMinutes(endTime, startTime);
}
export const getRandomColor = () => {
  const colors = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#FF9800', // Orange
    '#9C27B0', // Purple
    '#F44336', // Red
    '#009688', // Teal
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#E91E63', // Pink
    '#00BCD4', // Cyan
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};




export function generateRandomSuffix(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Parser le slug pour extraire le nom original (sans le suffixe)
export function parseSlugToDisplay(slug: string): string {
  // Retirer le suffixe aléatoire et les tirets
  return slug
    .replace(/--rsuffix-[a-z0-9]+$/, '') // Supprimer le suffixe
    .replace(/-/g, ' ') // Remplacer les tirets par des espaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitaliser chaque mot
}

// Extraire le suffixe aléatoire du slug
export function extractRandomSuffix(slug: string): string | null {
  const match = slug.match(/--rsuffix-([a-z0-9]+)$/);
  return match ? match[1] : null;
}