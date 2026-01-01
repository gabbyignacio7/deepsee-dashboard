import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Feature } from "@shared/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// DeepSee Dashboard Utilities
export function getTierColor(tier: string): string {
  if (tier.includes('0')) return 'rgb(255, 0, 0)'; // Red - Emergency
  if (tier.includes('1')) return 'rgb(255, 165, 0)'; // Orange - Fast Track
  if (tier.includes('2')) return 'rgb(255, 255, 0)'; // Yellow - Standard
  if (tier.includes('3')) return 'rgb(173, 216, 230)'; // Light Blue - Custom
  return 'rgb(211, 211, 211)'; // Gray - Backlog
}

export function getTierBgColor(tier: string): string {
  if (tier.includes('0')) return 'bg-red-100 border-red-300';
  if (tier.includes('1')) return 'bg-orange-100 border-orange-300';
  if (tier.includes('2')) return 'bg-yellow-100 border-yellow-300';
  if (tier.includes('3')) return 'bg-blue-100 border-blue-300';
  return 'bg-gray-100 border-gray-300';
}

export function getTierTextColor(tier: string): string {
  if (tier.includes('0')) return 'text-red-700';
  if (tier.includes('1')) return 'text-orange-700';
  if (tier.includes('2')) return 'text-yellow-700';
  if (tier.includes('3')) return 'text-blue-700';
  return 'text-gray-700';
}

export function getStatusColor(status: string): string {
  if (status === 'Completed') return 'bg-green-100 text-green-700 border-green-300';
  if (status === 'In Progress') return 'bg-blue-100 text-blue-700 border-blue-300';
  if (status === 'Blocked') return 'bg-red-100 text-red-700 border-red-300';
  if (status === 'Cancelled') return 'bg-gray-100 text-gray-500 border-gray-300';
  return 'bg-gray-100 text-gray-600 border-gray-300';
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function calculatePriorityScore(feature: Feature): number {
  if (feature.Effort_Estimate_Weeks === 0) return 0;
  const confidenceFactor = feature.Confidence_Factor || 1;
  // Conversion_Probability is stored as 0-1 decimal (e.g., 1 = 100%, 0.5 = 50%)
  return (
    feature.ARR_Amount * 
    feature.Replicability_Score * 
    feature.Conversion_Probability
  ) / (feature.Effort_Estimate_Weeks * confidenceFactor * 100);
}

export function getPriorityTier(feature: Feature): string {
  if (feature.Revenue_at_Risk === 'YES') return 'Tier 0: Emergency';
  const score = feature.Priority_Score;
  if (score >= 100) return 'Tier 1: Fast Track';
  if (score >= 50) return 'Tier 2: Standard Delivery';
  if (score >= 10) return 'Tier 3: Custom Engagement';
  return 'Tier 4: Backlog';
}

export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
