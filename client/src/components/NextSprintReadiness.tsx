import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle2, XCircle, Users, BarChart3, Calendar } from 'lucide-react';
import { NEXT_SPRINT, NEXT_SPRINT_READINESS } from '@/data/sprintData';

interface NextSprintReadinessProps {
  className?: string;
}

export const NextSprintReadiness: React.FC<NextSprintReadinessProps> = ({ className = '' }) => {
  const readiness = NEXT_SPRINT_READINESS;
  const sprint = NEXT_SPRINT;

  const assignedPercent = Math.round((readiness.assigned / readiness.totalTickets) * 100);
  const estimatedPercent = Math.round((readiness.withStoryPoints / readiness.totalTickets) * 100);

  const getReadinessColor = (status: string) => {
    switch (status) {
      case 'READY': return 'bg-green-500';
      case 'NEEDS_WORK': return 'bg-yellow-500';
      case 'NOT_READY': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getReadinessTextColor = (status: string) => {
    switch (status) {
      case 'READY': return 'text-green-700';
      case 'NEEDS_WORK': return 'text-yellow-700';
      case 'NOT_READY': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const getReadinessBgColor = (status: string) => {
    switch (status) {
      case 'READY': return 'bg-green-50 border-green-200';
      case 'NEEDS_WORK': return 'bg-yellow-50 border-yellow-200';
      case 'NOT_READY': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className={`${className} ${getReadinessBgColor(readiness.readinessStatus)} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Next Sprint: {sprint.id}</CardTitle>
          </div>
          <Badge className={`${getReadinessColor(readiness.readinessStatus)} text-white`}>
            {readiness.readinessStatus === 'NOT_READY' ? '🔴 NOT READY' :
             readiness.readinessStatus === 'NEEDS_WORK' ? '⚠️ NEEDS WORK' : '✅ READY'}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">
          {sprint.startDate} - {sprint.endDate}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-gray-900">{readiness.totalTickets}</div>
            <div className="text-xs text-gray-500 uppercase">Total Tickets</div>
            {readiness.totalTickets < 40 && (
              <div className="text-xs text-yellow-600 mt-1">⚠️ Below 40 minimum</div>
            )}
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className={`text-2xl font-bold ${assignedPercent < 50 ? 'text-red-600' : 'text-green-600'}`}>
              {readiness.assigned} ({assignedPercent}%)
            </div>
            <div className="text-xs text-gray-500 uppercase">Assigned</div>
            {assignedPercent < 50 && (
              <div className="text-xs text-red-600 mt-1">🔴 Critical</div>
            )}
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className={`text-2xl font-bold ${estimatedPercent < 50 ? 'text-red-600' : estimatedPercent < 75 ? 'text-yellow-600' : 'text-green-600'}`}>
              {readiness.withStoryPoints} ({estimatedPercent}%)
            </div>
            <div className="text-xs text-gray-500 uppercase">Estimated</div>
            {estimatedPercent < 50 && (
              <div className="text-xs text-red-600 mt-1">🔴 Needs Work</div>
            )}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> Assignment Progress
              </span>
              <span className={assignedPercent < 50 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                {readiness.assigned}/{readiness.totalTickets} ({assignedPercent}%)
              </span>
            </div>
            <Progress value={assignedPercent} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" /> Estimation Progress
              </span>
              <span className={estimatedPercent < 50 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                {readiness.withStoryPoints}/{readiness.totalTickets} ({estimatedPercent}%)
              </span>
            </div>
            <Progress value={estimatedPercent} className="h-2" />
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="pt-2 border-t">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">By Project</h4>
          <div className="flex flex-wrap gap-2">
            {readiness.projectBreakdown.map(({ project, count }) => (
              <Badge key={project} variant="outline" className="text-xs">
                {project}: {count}
              </Badge>
            ))}
          </div>
        </div>

        {/* Assigned Engineers */}
        {readiness.assignedEngineers.length > 0 && (
          <div className="pt-2 border-t">
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Assigned Engineers (only {readiness.assignedEngineers.length})</h4>
            <div className="flex flex-wrap gap-2">
              {readiness.assignedEngineers.map(({ name, tickets }) => (
                <Badge key={name} variant="secondary" className="text-xs">
                  {name}: {tickets}
                </Badge>
              ))}
              <Badge variant="destructive" className="text-xs">
                Unassigned: {readiness.unassigned}
              </Badge>
            </div>
          </div>
        )}

        {/* Blockers */}
        <div className="pt-2 border-t">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Blockers Before Planning</h4>
          <ul className="space-y-1">
            {readiness.blockers.map((blocker, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="mt-0.5">{index + 1}.</span>
                <span>{blocker}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Readiness Checklist */}
        <div className="pt-2 border-t">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Readiness Checklist</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              {readiness.totalTickets >= 40 ?
                <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                <XCircle className="w-4 h-4 text-yellow-500" />}
              <span>Ticket Count ({readiness.totalTickets}/40 minimum)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Sprint Dates Set</span>
            </div>
            <div className="flex items-center gap-2">
              {assignedPercent >= 80 ?
                <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                <XCircle className="w-4 h-4 text-red-500" />}
              <span>Tickets Assigned ({assignedPercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              {estimatedPercent >= 80 ?
                <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                <XCircle className="w-4 h-4 text-red-500" />}
              <span>Story Points ({estimatedPercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span>Sprint Goal Set - CHECK</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSprintReadiness;
