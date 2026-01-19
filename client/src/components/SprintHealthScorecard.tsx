import React from 'react';
import { sprintHealth, overallHealth, getHealthSummary } from '@/data/sprintHealthData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface SprintHealthScorecardProps {
  className?: string;
  compact?: boolean;
}

export const SprintHealthScorecard: React.FC<SprintHealthScorecardProps> = ({
  className = '',
  compact = false
}) => {
  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'green': return '\u{1F7E2}'; // Green circle
      case 'yellow': return '\u{1F7E1}'; // Yellow circle
      case 'red': return '\u{1F534}'; // Red circle
      default: return '\u26AA'; // White circle
    }
  };

  const getOverallHealthColor = (health: string): string => {
    switch (health) {
      case 'GREEN': return 'bg-green-100 text-green-800';
      case 'YELLOW': return 'bg-yellow-100 text-yellow-800';
      case 'RED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const summary = getHealthSummary();

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-3 bg-white border rounded-lg ${className}`}>
        <Activity className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Sprint Health:</span>
        <Badge className={getOverallHealthColor(overallHealth)}>
          {overallHealth}
        </Badge>
        <div className="flex gap-1 text-xs">
          <span className="text-red-600">{summary.red} critical</span>
          <span className="text-gray-300">|</span>
          <span className="text-yellow-600">{summary.yellow} warning</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5" />
            Sprint Health Scorecard
          </CardTitle>
          <Badge className={`text-sm font-bold ${getOverallHealthColor(overallHealth)}`}>
            Overall: {overallHealth}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {sprintHealth.map(metric => (
          <div
            key={metric.metric}
            className={`flex items-center justify-between py-2 px-3 rounded-lg ${
              metric.status === 'red' ? 'bg-red-50' :
              metric.status === 'yellow' ? 'bg-yellow-50' :
              'bg-green-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{getStatusIcon(metric.status)}</span>
              <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-bold ${
                metric.status === 'red' ? 'text-red-600' :
                metric.status === 'yellow' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {metric.s2Value}
              </span>
              <span className="text-xs text-gray-500 min-w-[60px] text-right">
                Target: {metric.target}
              </span>
            </div>
          </div>
        ))}

        {/* Summary Footer */}
        <div className="flex justify-between items-center pt-3 mt-2 border-t text-xs text-gray-500">
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {summary.red} Critical
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              {summary.yellow} Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {summary.green} Good
            </span>
          </div>
          <span>Sprint 2026-S2</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintHealthScorecard;
