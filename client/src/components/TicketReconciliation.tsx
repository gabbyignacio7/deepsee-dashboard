import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, ArrowRightLeft, UserX } from 'lucide-react';
import { orphanTicketsData, orphanSummary, type OrphanTicket } from '@/data/orphanTicketsData';

const TYPE_CONFIG: Record<OrphanTicket['orphanType'], { label: string; color: string; bgColor: string; borderColor: string; icon: React.ReactNode }> = {
  deleted: {
    label: 'Orphan',
    color: 'text-red-800',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  completed: {
    label: 'Completed',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  status_changed: {
    label: 'Status Changed',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
    icon: <ArrowRightLeft className="w-3 h-3" />,
  },
  reassigned: {
    label: 'Reassigned',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200',
    icon: <UserX className="w-3 h-3" />,
  },
};

interface TicketReconciliationProps {
  className?: string;
}

const TicketReconciliation: React.FC<TicketReconciliationProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalItems = useMemo(() => orphanTicketsData.length, []);
  const summary = orphanSummary;

  return (
    <Card className={`${className}`}>
      <CardHeader
        className="pb-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Ticket Reconciliation</span>
            {totalItems > 0 ? (
              <Badge variant="destructive" className="ml-2">
                {totalItems} items need review
              </Badge>
            ) : (
              <Badge variant="secondary" className="ml-2">
                All clear
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-gray-500">
              Last reconciliation: {summary.lastReconciliation}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Summary badges */}
          <div className="flex flex-wrap gap-2">
            {summary.deleted > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                <AlertTriangle className="w-3 h-3" />
                {summary.deleted} orphaned
              </div>
            )}
            {summary.completed > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                <CheckCircle className="w-3 h-3" />
                {summary.completed} completed
              </div>
            )}
            {summary.statusChanged > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                <ArrowRightLeft className="w-3 h-3" />
                {summary.statusChanged} status changed
              </div>
            )}
            {summary.reassigned > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <UserX className="w-3 h-3" />
                {summary.reassigned} reassigned
              </div>
            )}
            {totalItems === 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                <CheckCircle className="w-3 h-3" />
                No discrepancies found
              </div>
            )}
          </div>

          {/* Ticket table */}
          {totalItems > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Key</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Summary</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Type</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {orphanTicketsData.map((ticket) => {
                    const config = TYPE_CONFIG[ticket.orphanType];
                    return (
                      <tr key={ticket.key} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 font-mono text-xs font-medium">
                          <a
                            href={`https://deepsee.atlassian.net/browse/${ticket.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {ticket.key}
                          </a>
                        </td>
                        <td className="py-2 px-3 text-gray-700 max-w-xs truncate">
                          {ticket.summary}
                        </td>
                        <td className="py-2 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bgColor} ${config.color} border ${config.borderColor}`}>
                            {config.icon}
                            {config.label}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-gray-600 text-xs">
                          {ticket.recommendation}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer note */}
          <p className="text-xs text-gray-400 italic">
            Run <code className="bg-gray-100 px-1 py-0.5 rounded">python3 tools/reconcile.py</code> to refresh reconciliation data
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default TicketReconciliation;
