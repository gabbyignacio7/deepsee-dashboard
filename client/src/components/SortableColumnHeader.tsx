import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { SortConfig } from '@/hooks/useSortableTable';

interface SortableColumnHeaderProps {
  label: React.ReactNode;
  sortKey: string;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  className?: string;
}

export default function SortableColumnHeader({
  label,
  sortKey,
  sortConfig,
  onSort,
  className = '',
}: SortableColumnHeaderProps) {
  const isActive = sortConfig.key === sortKey;
  const direction = isActive ? sortConfig.direction : null;

  const labelText = typeof label === 'string' ? label : sortKey;

  const getAriaSort = (): 'ascending' | 'descending' | 'none' => {
    if (!isActive || !direction) return 'none';
    return direction === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <th
      onClick={() => onSort(sortKey)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSort(sortKey);
        }
      }}
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none ${className}`}
      aria-label={`Sort by ${labelText}`}
      aria-sort={getAriaSort()}
      tabIndex={0}
      data-testid={`sortable-header-${sortKey}`}
    >
      <div className="flex items-center space-x-1">
        <span className={isActive ? 'font-bold text-gray-900' : ''}>{label}</span>
        <span className={`text-gray-400 ${isActive ? 'text-gray-600' : ''}`}>
          {!isActive && <ChevronsUpDown className="w-3 h-3" />}
          {direction === 'asc' && <ChevronUp className="w-3 h-3" />}
          {direction === 'desc' && <ChevronDown className="w-3 h-3" />}
        </span>
      </div>
    </th>
  );
}
