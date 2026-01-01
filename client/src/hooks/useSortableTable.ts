import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export type ComparatorFn = (a: any, b: any) => number;

export interface ColumnConfig {
  key: string;
  comparator?: ComparatorFn;
}

// Built-in comparators for common data types
export const comparators = {
  // String comparison (case-insensitive)
  string: (a: any, b: any): number => {
    const aStr = String(a ?? '').toLowerCase();
    const bStr = String(b ?? '').toLowerCase();
    return aStr.localeCompare(bStr);
  },

  // Numeric comparison
  number: (a: any, b: any): number => {
    const aNum = Number(a) || 0;
    const bNum = Number(b) || 0;
    return aNum - bNum;
  },

  // Currency comparison (strips $, commas)
  currency: (a: any, b: any): number => {
    const aNum = typeof a === 'number' ? a : parseFloat(String(a).replace(/[$,]/g, '')) || 0;
    const bNum = typeof b === 'number' ? b : parseFloat(String(b).replace(/[$,]/g, '')) || 0;
    return aNum - bNum;
  },

  // Date comparison (ISO strings)
  date: (a: any, b: any): number => {
    if (!a) return 1;
    if (!b) return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  },

  // Priority Tier comparison (extracts tier number from "Tier N: Description")
  tier: (a: any, b: any): number => {
    const getTierNum = (tier: string): number => {
      const match = String(tier).match(/Tier (\d+)/);
      return match ? parseInt(match[1]) : 999;
    };
    return getTierNum(a) - getTierNum(b);
  },

  // Effort weeks comparison (strips "w" or "weeks" suffix)
  effort: (a: any, b: any): number => {
    const getEffort = (val: any): number => {
      if (typeof val === 'number') return val;
      return parseFloat(String(val).replace(/[^\d.]/g, '')) || 0;
    };
    return getEffort(a) - getEffort(b);
  },
};

export function useSortableTable<T extends Record<string, any>>(
  data: T[],
  columns: ColumnConfig[] = []
) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  // Build comparator map from column configs
  const comparatorMap = useMemo(() => {
    const map: Record<string, ComparatorFn> = {};
    columns.forEach(col => {
      if (col.comparator) {
        map[col.key] = col.comparator;
      }
    });
    return map;
  }, [columns]);

  // Handle sort request - toggles through asc → desc → null
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  // Sort the data
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    const comparator = comparatorMap[sortConfig.key] || comparators.string;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      // Handle null/undefined
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const result = comparator(aVal, bVal);
      return sortConfig.direction === 'asc' ? result : -result;
    });
  }, [data, sortConfig, comparatorMap]);

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
}
