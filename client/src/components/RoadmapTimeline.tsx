import React, { useState, useMemo } from 'react';
import {
  ROADMAP_CONFIG,
  QUARTERS,
  MILESTONES,
  ROADMAP_FEATURES,
  calculateQuarterLoad,
  calculateQuarterCapacity,
  calculateQuarterUtilization,
  getMilestoneProgress,
  getFeaturesByQuarter,
  getRoadmapSummary,
  type RoadmapFeature,
  type Milestone,
  type Quarter,
} from '@/data/roadmapData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Mail,
  Brain,
  Network,
  Layers,
  Target,
  ExternalLink,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

// Icon mapping for milestones
const MILESTONE_ICONS: Record<string, React.ElementType> = {
  mail: Mail,
  brain: Brain,
  network: Network,
  layers: Layers,
  target: Target,
};

// Category colors
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Platform: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300' },
  Automation: { bg: 'bg-amber-100 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300' },
  Intelligence: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-300' },
  Integration: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-300' },
  Client: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300' },
};

interface RoadmapTimelineProps {
  className?: string;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ className = '' }) => {
  const [velocity, setVelocity] = useState(ROADMAP_CONFIG.averageVelocity);
  const [selectedFeature, setSelectedFeature] = useState<RoadmapFeature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate summary with current velocity
  const summary = useMemo(() => getRoadmapSummary(velocity), [velocity]);

  // Get features grouped by quarter
  const featuresByQuarter = useMemo(() => {
    return QUARTERS.reduce((acc, q) => {
      acc[q.id] = getFeaturesByQuarter(q.id);
      return acc;
    }, {} as Record<string, RoadmapFeature[]>);
  }, []);

  // Calculate utilization with current velocity
  const utilizationByQuarter = useMemo(() => {
    return QUARTERS.reduce((acc, q) => {
      acc[q.id] = calculateQuarterUtilization(q.id, velocity);
      return acc;
    }, {} as Record<string, number>);
  }, [velocity]);

  const handleFeatureClick = (feature: RoadmapFeature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Not Started': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600 dark:text-red-400';
    if (utilization > 90) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Summary Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Roadmap Timeline</h1>
          <p className="text-muted-foreground">
            Q1-Q3 2026 • Updated {new Date(ROADMAP_CONFIG.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        {/* Summary KPIs */}
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Features</p>
            <p className="text-xl font-bold">{summary.totalFeatures}</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Story Points</p>
            <p className="text-xl font-bold">{summary.totalStoryPoints}</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {summary.completedStoryPoints} pts
            </p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Milestones</p>
            <p className="text-xl font-bold">{summary.totalMilestones}</p>
          </div>
        </div>
      </div>

      {/* Velocity Slider for Scenario Modeling */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-medium">Velocity Scenario</span>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-12">60</span>
            <Slider
              value={[velocity]}
              onValueChange={([v]) => setVelocity(v)}
              min={60}
              max={120}
              step={5}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">120</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current:</span>
            <Badge variant="secondary" className="font-mono">
              {velocity} pts/sprint
            </Badge>
          </div>
        </div>
      </Card>

      {/* Milestones Row */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {MILESTONES.map((milestone) => {
              const Icon = MILESTONE_ICONS[milestone.icon] || Target;
              const progress = getMilestoneProgress(milestone.id);
              const targetQuarter = QUARTERS.find(q => q.id === milestone.targetQuarter);

              return (
                <Tooltip key={milestone.id}>
                  <TooltipTrigger asChild>
                    <div className="p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${targetQuarter?.color}20` }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: targetQuarter?.color }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{milestone.name}</p>
                          <p className="text-xs text-muted-foreground">{targetQuarter?.name}</p>
                        </div>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="font-medium">{milestone.name}</p>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Business Value: {milestone.businessValue}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Timeline - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {QUARTERS.map((quarter) => {
          const features = featuresByQuarter[quarter.id] || [];
          const load = calculateQuarterLoad(quarter.id);
          const capacity = calculateQuarterCapacity(quarter.id, velocity);
          const utilization = utilizationByQuarter[quarter.id];

          return (
            <Card key={quarter.id} className="overflow-hidden">
              {/* Quarter Header */}
              <div
                className="p-4 border-b"
                style={{ borderLeftWidth: 4, borderLeftColor: quarter.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: quarter.color }} />
                    <h3 className="font-semibold">{quarter.name}</h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getUtilizationColor(utilization)}
                  >
                    {utilization}% utilized
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{load} / {capacity} pts</span>
                  <span>{features.length} features</span>
                </div>
                <Progress
                  value={Math.min(utilization, 100)}
                  className="h-1.5 mt-2"
                />
                {utilization > 100 && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Over capacity by {load - capacity} points</span>
                  </div>
                )}
              </div>

              {/* Feature Cards */}
              <CardContent className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
                {features.map((feature) => {
                  const categoryStyle = CATEGORY_COLORS[feature.category] || CATEGORY_COLORS.Platform;
                  const quarterAlloc = feature.quarters.find(q => q.quarter === quarter.id);
                  const completionPct = feature.totalStoryPoints > 0
                    ? Math.round((feature.completedStoryPoints / feature.totalStoryPoints) * 100)
                    : 0;

                  return (
                    <div
                      key={feature.id}
                      className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${categoryStyle.bg}`}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{feature.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {feature.category}
                            </Badge>
                            {feature.jiraEpicKey && (
                              <span className="text-xs font-mono text-muted-foreground">
                                {feature.jiraEpicKey}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(feature.status)}`} />
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{quarterAlloc?.allocatedPoints || 0} pts</span>
                        <span>P{feature.priority}</span>
                      </div>

                      {completionPct > 0 && (
                        <div className="mt-2">
                          <Progress value={completionPct} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-0.5">{completionPct}% done</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {features.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No features scheduled
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quarter Utilization Summary */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Capacity Planning Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUARTERS.map((quarter) => {
            const load = calculateQuarterLoad(quarter.id);
            const capacity = calculateQuarterCapacity(quarter.id, velocity);
            const utilization = utilizationByQuarter[quarter.id];
            const isOverCapacity = utilization > 100;
            const isAtRisk = utilization > 90;

            return (
              <div
                key={quarter.id}
                className={`p-4 rounded-lg border ${
                  isOverCapacity ? 'border-red-300 bg-red-50 dark:bg-red-900/10' :
                  isAtRisk ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/10' :
                  'bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{quarter.name}</span>
                  {isOverCapacity ? (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  ) : isAtRisk ? (
                    <Clock className="w-4 h-4 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Load</span>
                    <span className="font-mono">{load} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-mono">{capacity} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className={`font-mono font-semibold ${getUtilizationColor(utilization)}`}>
                      {utilization}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Feature Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          {selectedFeature && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedFeature.color }}
                  />
                  {selectedFeature.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedFeature.category} • Priority {selectedFeature.priority}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Status & Progress */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={
                      selectedFeature.status === 'Complete' ? 'bg-green-100 text-green-700' :
                      selectedFeature.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }
                  >
                    {selectedFeature.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {selectedFeature.completedStoryPoints} / {selectedFeature.totalStoryPoints} pts completed
                  </span>
                </div>

                <Progress
                  value={selectedFeature.totalStoryPoints > 0
                    ? (selectedFeature.completedStoryPoints / selectedFeature.totalStoryPoints) * 100
                    : 0
                  }
                  className="h-2"
                />

                {/* Quarter Allocation */}
                <div>
                  <p className="text-sm font-medium mb-2">Quarter Allocation</p>
                  <div className="space-y-2">
                    {selectedFeature.quarters.map((q) => {
                      const quarter = QUARTERS.find(qtr => qtr.id === q.quarter);
                      return (
                        <div
                          key={q.quarter}
                          className="flex items-center justify-between p-2 rounded bg-muted/50"
                        >
                          <span className="text-sm" style={{ color: quarter?.color }}>
                            {quarter?.name}
                          </span>
                          <span className="text-sm font-mono">
                            {q.allocatedPoints} pts ({q.percentageOfFeature}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  {selectedFeature.jiraEpicUrl && (
                    <a
                      href={selectedFeature.jiraEpicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      JIRA Epic: {selectedFeature.jiraEpicKey}
                    </a>
                  )}
                  {selectedFeature.prdLink && (
                    <a
                      href={selectedFeature.prdLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      PRD Document
                    </a>
                  )}
                </div>

                {/* Story Points Breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold">{selectedFeature.totalStoryPoints}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-50 dark:bg-green-900/10">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="font-semibold text-green-600">{selectedFeature.completedStoryPoints}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-amber-50 dark:bg-amber-900/10">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-amber-600">{selectedFeature.remainingStoryPoints}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapTimeline;
