import React from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { artemisFoundation, artemisReadiness } from '@/data/artemisFoundationData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ArtemisFoundationTrackerProps {
  className?: string;
  maxItems?: number;
}

export const ArtemisFoundationTracker: React.FC<ArtemisFoundationTrackerProps> = ({
  className = '',
  maxItems
}) => {
  const displayItems = maxItems ? artemisFoundation.slice(0, maxItems) : artemisFoundation;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'DONE': return 'bg-green-100 text-green-800';
      case 'IN PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'TO DO': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPillarColor = (pillar: string): string => {
    const colors: Record<string, string> = {
      'Platform': '#3B82F6',
      'Automation & Orchestration': '#8B5CF6',
      'Process Certainty': '#10B981',
      'DeepGraph': '#F59E0B',
      'Agentic Engine': '#EF4444',
      'Integrations': '#6366F1'
    };
    return colors[pillar] || '#6B7280';
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">ARTEMIS Foundation Status</CardTitle>
          <Badge
            className={`${artemisReadiness.readinessPct === 0 ? 'bg-red-100 text-red-800' :
                        artemisReadiness.readinessPct < 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}
          >
            {artemisReadiness.readinessPct}% Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{artemisReadiness.totalEpics}</div>
            <div className="text-xs text-gray-500">Total Epics</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{artemisReadiness.started}</div>
            <div className="text-xs text-gray-500">Started</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{artemisReadiness.completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {artemisReadiness.totalEpics - artemisReadiness.started - artemisReadiness.completed}
            </div>
            <div className="text-xs text-gray-500">Unassigned</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Overall Progress</span>
            <span>{artemisReadiness.readinessPct}%</span>
          </div>
          <Progress value={artemisReadiness.readinessPct} className="h-2" />
        </div>

        {/* Alert Banner */}
        {artemisReadiness.readinessPct === 0 && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-red-800">No Foundation Epics Started</div>
              <div className="text-red-600">
                Critical: All {artemisReadiness.totalEpics} ARTEMIS foundation epics are unassigned.
                Recommend immediate prioritization.
              </div>
            </div>
          </div>
        )}

        {/* Epic List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2 font-medium">Epic</th>
                <th className="pb-2 font-medium">Pillar</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map(epic => (
                <tr key={epic.key} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2">
                    <a
                      href={epic.jiraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-xs"
                    >
                      {epic.key}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="text-xs text-gray-500 truncate max-w-xs" title={epic.summary}>
                      {epic.summary}
                    </div>
                  </td>
                  <td className="py-2">
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        backgroundColor: getPillarColor(epic.pillar) + '20',
                        borderColor: getPillarColor(epic.pillar),
                        color: getPillarColor(epic.pillar)
                      }}
                    >
                      {epic.pillar}
                    </Badge>
                  </td>
                  <td className="py-2">
                    <Badge className={`text-xs ${getStatusColor(epic.status)}`}>
                      {epic.status}
                    </Badge>
                  </td>
                  <td className="py-2 text-gray-500 text-xs">
                    {epic.assignee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {maxItems && artemisFoundation.length > maxItems && (
          <div className="text-center text-sm text-gray-500">
            + {artemisFoundation.length - maxItems} more epics
          </div>
        )}

        {/* Pillar Coverage */}
        <div className="pt-3 border-t">
          <div className="text-xs font-medium text-gray-600 mb-2">Pillar Coverage</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(artemisReadiness.pillarCoverage)
              .filter(([_, coverage]) => coverage.total > 0)
              .map(([pillar, coverage]) => (
                <Badge
                  key={pillar}
                  variant="outline"
                  className="text-xs"
                  style={{
                    backgroundColor: getPillarColor(pillar) + '10',
                    borderColor: getPillarColor(pillar)
                  }}
                >
                  {pillar}: {coverage.started}/{coverage.total}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtemisFoundationTracker;
