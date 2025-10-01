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