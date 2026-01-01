import { Card } from '@/components/ui/card';
import { Users, CheckSquare, TrendingUp, Target } from 'lucide-react';
import type { SummaryStats } from '@/types/engineer-allocation';

interface SummaryCardsProps {
  stats: SummaryStats;
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground" data-testid="label-total-engineers">
              Total Engineers
            </p>
            <p className="text-3xl font-bold" data-testid="value-total-engineers">
              {stats.totalEngineers}
            </p>
            <p className="text-xs text-muted-foreground">
              With active assignments
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <CheckSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground" data-testid="label-active-tickets">
              Active Tickets
            </p>
            <p className="text-3xl font-bold" data-testid="value-active-tickets">
              {stats.totalActiveTickets}
            </p>
            <p className="text-xs text-muted-foreground">
              Not done status
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground" data-testid="label-avg-story-points">
              Avg Story Points
            </p>
            <p className="text-3xl font-bold" data-testid="value-avg-story-points">
              {stats.avgStoryPointsPerEngineer.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">
              Per engineer
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm text-muted-foreground" data-testid="label-total-story-points">
              Total Story Points
            </p>
            <p className="text-3xl font-bold" data-testid="value-total-story-points">
              {stats.totalStoryPoints}
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.estimatedTickets} estimated, {stats.notEstimatedTickets} not
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
