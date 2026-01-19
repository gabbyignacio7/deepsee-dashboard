import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { blockedItems, blockedSummary } from '@/data/blockedItemsData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlockedItemsAlertProps {
  className?: string;
  maxItems?: number;
  compact?: boolean;
}

export const BlockedItemsAlert: React.FC<BlockedItemsAlertProps> = ({
  className = '',
  maxItems = 5,
  compact = false
}) => {
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'P0': return 'bg-red-100 text-red-800 border-red-300';
      case 'P1': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'P2': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const sortedItems = [...blockedItems].sort((a, b) => {
    // Sort by priority first (P0 > P1 > P2), then by days blocked
    const priorityOrder = { 'P0': 0, 'P1': 1, 'P2': 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.daysBlocked - a.daysBlocked;
  });

  if (compact) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium">{blockedSummary.total} Blocked Items</span>
          <Badge variant="destructive" className="text-xs">{blockedSummary.p0Count} P0</Badge>
          <Badge className="bg-orange-500 text-xs">{blockedSummary.p1Count} P1</Badge>
        </div>
      </div>
    );
  }

  return (
    <Card className={`border-red-200 bg-red-50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            {blockedSummary.total} Blocked Items - Escalation Required
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Priority Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-100 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-800">{blockedSummary.p0Count}</div>
            <div className="text-xs text-red-600">P0 Critical</div>
          </div>
          <div className="bg-orange-100 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-800">{blockedSummary.p1Count}</div>
            <div className="text-xs text-orange-600">P1 High</div>
          </div>
          <div className="bg-yellow-100 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-800">{blockedSummary.p2Count}</div>
            <div className="text-xs text-yellow-600">P2 Medium</div>
          </div>
        </div>

        {/* Blocked Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b border-red-200">
                <th className="pb-2 font-medium">Ticket</th>
                <th className="pb-2 font-medium">Summary</th>
                <th className="pb-2 font-medium">Assignee</th>
                <th className="pb-2 font-medium text-right">Days Blocked</th>
                <th className="pb-2 font-medium text-center">Priority</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.slice(0, maxItems).map(item => (
                <tr key={item.key} className="border-b border-red-100 hover:bg-red-100/50">
                  <td className="py-2">
                    <a
                      href={item.jiraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-xs"
                    >
                      {item.key}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-2 text-gray-700 max-w-xs truncate" title={item.summary}>
                    {item.summary}
                  </td>
                  <td className="py-2 text-gray-600 text-xs">
                    {item.assignee}
                  </td>
                  <td className="py-2 text-right">
                    <span className={`font-semibold ${item.daysBlocked > 100 ? 'text-red-600' : item.daysBlocked > 30 ? 'text-orange-600' : 'text-yellow-600'}`}>
                      {item.daysBlocked}d
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <Badge className={`text-xs border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedItems.length > maxItems && (
          <div className="text-center text-sm text-gray-500">
            + {sortedItems.length - maxItems} more blocked items
          </div>
        )}

        {/* Summary Stats */}
        <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-red-200">
          <span>Avg. Days Blocked: {blockedSummary.avgDaysBlocked}</span>
          <span>Oldest: {blockedSummary.oldestBlocked}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockedItemsAlert;
