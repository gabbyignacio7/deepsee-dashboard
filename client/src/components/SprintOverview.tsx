import React from 'react';
import { SPRINTS, formatSprintDate } from '@/data/sprintData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SprintOverviewProps {
  className?: string;
}

export const SprintOverview: React.FC<SprintOverviewProps> = ({ className = '' }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'done': return 'bg-green-500';
      case 'inProgress': return 'bg-blue-500';
      case 'codeReview': return 'bg-purple-500';
      case 'blocked': return 'bg-red-500';
      case 'toDo': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadgeVariant = (status: 'active' | 'planned' | 'future') => {
    switch (status) {
      case 'active': return 'default';
      case 'planned': return 'secondary';
      case 'future': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {SPRINTS.map(sprint => {
        const totalTickets = sprint.totalTickets || 1; // Avoid division by zero
        const completion = sprint.completion;

        return (
          <Card key={sprint.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{sprint.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(sprint.status)}>
                  {sprint.status === 'active' ? 'ACTIVE' :
                   sprint.status === 'planned' ? 'PLANNED' : 'FUTURE'}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {formatSprintDate(sprint.startDate)} - {formatSprintDate(sprint.endDate)}
                <span className="text-gray-400 ml-1">({sprint.daysRemaining} days remaining)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Completion</span>
                  <span>{sprint.completionRate.toFixed(0)}%</span>
                </div>
                <Progress value={sprint.completionRate} className="h-2" />
              </div>

              {/* Status Breakdown Bar */}
              <div className="flex gap-0.5 h-3 rounded overflow-hidden">
                <div
                  className={getStatusColor('done')}
                  style={{ width: `${(completion.done / totalTickets) * 100}%` }}
                  title={`Done: ${completion.done}`}
                />
                <div
                  className={getStatusColor('codeReview')}
                  style={{ width: `${(completion.codeReview / totalTickets) * 100}%` }}
                  title={`Code Review: ${completion.codeReview}`}
                />
                <div
                  className={getStatusColor('inProgress')}
                  style={{ width: `${(completion.inProgress / totalTickets) * 100}%` }}
                  title={`In Progress: ${completion.inProgress}`}
                />
                <div
                  className={getStatusColor('blocked')}
                  style={{ width: `${(completion.blocked / totalTickets) * 100}%` }}
                  title={`Blocked: ${completion.blocked}`}
                />
                <div
                  className={getStatusColor('toDo')}
                  style={{ width: `${(completion.toDo / totalTickets) * 100}%` }}
                  title={`To Do: ${completion.toDo}`}
                />
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-5 gap-1 text-xs">
                <div className="text-center">
                  <div className="w-3 h-3 rounded bg-green-500 mx-auto mb-1" />
                  <span className="text-gray-600">{completion.done}</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded bg-purple-500 mx-auto mb-1" />
                  <span className="text-gray-600">{completion.codeReview}</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded bg-blue-500 mx-auto mb-1" />
                  <span className="text-gray-600">{completion.inProgress}</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded bg-red-500 mx-auto mb-1" />
                  <span className="text-gray-600">{completion.blocked}</span>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 rounded bg-gray-300 mx-auto mb-1" />
                  <span className="text-gray-600">{completion.toDo}</span>
                </div>
              </div>

              {/* Total Tickets */}
              <div className="pt-2 border-t text-sm text-gray-600 flex justify-between">
                <span>Total: {sprint.totalTickets} tickets</span>
                <span className="text-gray-400">
                  {sprint.assessment === 'artemis-focused' ? 'ARTEMIS Focus' :
                   sprint.assessment === 'client-heavy' ? 'Client Heavy' : 'Balanced'}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SprintOverview;
