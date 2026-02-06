import React from 'react';
import { Clock } from 'lucide-react';

interface DataFreshnessProps {
  className?: string;
  compact?: boolean;
}

export const DataFreshness: React.FC<DataFreshnessProps> = ({ className = '', compact = false }) => {
  const formattedDate = "February 6, 2026, 2:22 PM MT";
  const dataSource = "JIRA Sprint Extraction + Monday.com CRM";

  if (compact) {
    return (
      <div className={`flex items-center gap-1 text-xs text-gray-500 ${className}`}>
        <Clock className="w-3 h-3" />
        <span>{formattedDate}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 ${className}`}>
      <Clock className="w-4 h-4 text-gray-400" />
      <span>Last Updated: {formattedDate}</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-400">Source: {dataSource}</span>
    </div>
  );
};

export default DataFreshness;
