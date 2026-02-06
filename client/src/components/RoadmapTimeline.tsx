import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  ROADMAP_CONFIG,
  QUARTERS,
  MILESTONES,
  ROADMAP_FEATURES,
  calculateQuarterLoad,
  calculateQuarterCapacity,
  calculateQuarterUtilization,
  getMilestoneProgress,
  getMilestoneDetails,
  getFeaturesByQuarter,
  getRoadmapSummary,
  type RoadmapFeature,
  type Milestone,
  type MilestoneDetails,
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
  ChevronDown,
  Clock,
  Zap,
  Shield,
  FileText,
  Info,
} from 'lucide-react';

// Icon mapping for milestones
const MILESTONE_ICONS: Record<string, React.ElementType> = {
  mail: Mail,
  brain: Brain,
  network: Network,
  layers: Layers,
  target: Target,
  shield: Shield,
};

// Category colors - Extended for new categories
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Platform: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300' },
  Automation: { bg: 'bg-amber-100 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300' },
  Intelligence: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-300' },
  Integration: { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-300' },
  Client: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300' },
  Capability: { bg: 'bg-cyan-100 dark:bg-cyan-900/20', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-300' },
  Dashboard: { bg: 'bg-indigo-100 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-300' },
  UX: { bg: 'bg-pink-100 dark:bg-pink-900/20', text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-300' },
};

// PRD status colors
const PRD_STATUS_COLORS = {
  active: 'text-blue-600',
  pending: 'text-orange-500',
  none: 'text-gray-400',
};

interface RoadmapTimelineProps {
  className?: string;
}

// Helper to truncate description
const truncateDescription = (desc: string, maxLength: number = 60): string => {
  if (!desc || desc.length <= maxLength) return desc || '';
  return desc.substring(0, maxLength) + '...';
};

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ className = '' }) => {
  const [velocity, setVelocity] = useState(ROADMAP_CONFIG.averageVelocity);
  const [selectedFeature, setSelectedFeature] = useState<RoadmapFeature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);

  const expandedMilestoneDetails = useMemo(() => {
    if (!expandedMilestoneId) return null;
    return getMilestoneDetails(expandedMilestoneId);
  }, [expandedMilestoneId]);

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
      case 'Planned': return 'bg-orange-400';
      default: return 'bg-gray-300';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600 dark:text-red-400';
    if (utilization > 90) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getPrdStatusLabel = (status?: string) => {
    switch (status) {
      case 'active': return null; // No label for active PRDs
      case 'pending': return '(PRD pending)';
      case 'none': return '(No PRD)';
      default: return null;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Summary Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Roadmap Timeline</h1>
          <p className="text-muted-foreground">
            Q1-Q4 2026 • Updated February 6, 2026, 2:22 PM MT
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {MILESTONES.map((milestone) => {
              const Icon = MILESTONE_ICONS[milestone.icon] || Target;
              const progress = getMilestoneProgress(milestone.id);
              const targetQuarter = QUARTERS.find(q => q.id === milestone.targetQuarter);
              const isExpanded = expandedMilestoneId === milestone.id;

              return (
                <Tooltip key={milestone.id} open={isExpanded ? false : undefined}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "p-3 rounded-lg border hover:shadow-md transition-all cursor-pointer",
                        isExpanded && "ring-2 ring-primary shadow-md"
                      )}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-controls={`milestone-detail-${milestone.id}`}
                      onClick={() => setExpandedMilestoneId(isExpanded ? null : milestone.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedMilestoneId(isExpanded ? null : milestone.id);
                        }
                      }}
                    >
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
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{progress}% complete</p>
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </div>
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

          {/* Expandable Milestone Detail Panel */}
          {expandedMilestoneId && expandedMilestoneDetails && (
            <div
              id={`milestone-detail-${expandedMilestoneId}`}
              role="region"
              aria-label={`Details for ${expandedMilestoneDetails.milestoneName}`}
              className="mt-4 p-4 rounded-lg border bg-muted/30 animate-in fade-in-0 slide-in-from-top-2 duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-sm">{expandedMilestoneDetails.milestoneName}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{expandedMilestoneDetails.description}</p>
                </div>
                <button
                  onClick={() => setExpandedMilestoneId(null)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded"
                  aria-label="Close detail panel"
                >
                  <ChevronDown className="w-4 h-4 rotate-180" />
                </button>
              </div>

              <hr className="mb-3 border-border" />

              {/* Linked Features */}
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Linked Features ({expandedMilestoneDetails.summary.totalFeatures})
                </p>
                <div className="space-y-2">
                  {expandedMilestoneDetails.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between p-2 rounded bg-background border text-sm hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        const fullFeature = ROADMAP_FEATURES.find(f => f.id === feature.id);
                        if (fullFeature) handleFeatureClick(fullFeature);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={cn(
                          "w-2 h-2 rounded-full flex-shrink-0",
                          feature.status === 'Complete' ? 'bg-green-500' :
                          feature.status === 'In Progress' ? 'bg-blue-500' :
                          feature.status === 'Planned' ? 'bg-orange-400' :
                          'bg-gray-300'
                        )} />
                        <span className="truncate font-medium">{feature.name}</span>
                        <Badge variant="outline" className="text-xs flex-shrink-0 hidden sm:inline-flex">
                          {feature.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                          {feature.completedStoryPoints}/{feature.totalStoryPoints} pts
                        </span>
                        {feature.jiraEpicKey ? (
                          <a
                            href={feature.jiraEpicUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            {feature.jiraEpicKey}
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">&mdash;</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Missing dependencies warning */}
                  {expandedMilestoneDetails.missingDependencyIds.length > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {expandedMilestoneDetails.missingDependencyIds.length} linked feature(s) not yet defined: {expandedMilestoneDetails.missingDependencyIds.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <hr className="mb-3 border-border" />

              {/* Story Points Summary */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Story Points Breakdown
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-2 rounded bg-muted/50">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold">{expandedMilestoneDetails.summary.totalStoryPoints}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-green-50 dark:bg-green-950/30">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="font-semibold text-green-600">{expandedMilestoneDetails.summary.completedStoryPoints}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-amber-50 dark:bg-amber-950/30">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="font-semibold text-amber-600">{expandedMilestoneDetails.summary.remainingStoryPoints}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-blue-50 dark:bg-blue-950/30">
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="font-semibold text-blue-600">{expandedMilestoneDetails.summary.overallCompletionPercentage}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Quarterly Timeline - 4 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {QUARTERS.map((quarter) => {
          const features = featuresByQuarter[quarter.id] || [];
          const load = calculateQuarterLoad(quarter.id);
          const capacity = calculateQuarterCapacity(quarter.id, velocity);
          const utilization = utilizationByQuarter[quarter.id];
          const isPlannedQuarter = quarter.isPlanned;

          return (
            <Card
              key={quarter.id}
              className={`overflow-hidden ${isPlannedQuarter ? 'border-dashed border-2 border-orange-300' : ''}`}
            >
              {/* Quarter Header */}
              <div
                className={`p-4 border-b ${isPlannedQuarter ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}
                style={{ borderLeftWidth: 4, borderLeftColor: quarter.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: quarter.color }} />
                    <div>
                      <h3 className="font-semibold">{quarter.name}</h3>
                      {quarter.version && (
                        <p className="text-xs text-muted-foreground">{quarter.version}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isPlannedQuarter && (
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-400">
                        Planned
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className={getUtilizationColor(utilization)}
                    >
                      {utilization}% utilized
                    </Badge>
                  </div>
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
                  const isPlannedFeature = feature.isPlanned || feature.status === 'Planned';

                  return (
                    <Tooltip key={feature.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${categoryStyle.bg} ${isPlannedFeature ? 'border-dashed border-orange-300' : ''}`}
                          onClick={() => handleFeatureClick(feature)}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{feature.name}</p>
                              {/* Description preview */}
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {truncateDescription(feature.description)}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <Badge variant="outline" className="text-xs">
                                  {feature.category}
                                </Badge>
                                {feature.jiraEpicKey && (
                                  <span className="text-xs font-mono text-muted-foreground">
                                    {feature.jiraEpicKey}
                                  </span>
                                )}
                                {feature.prdStatus && getPrdStatusLabel(feature.prdStatus) && (
                                  <span className={`text-xs ${PRD_STATUS_COLORS[feature.prdStatus]}`}>
                                    {getPrdStatusLabel(feature.prdStatus)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${getStatusColor(feature.status)}`} />
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
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
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-sm">
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        {feature.prdLink && (
                          <p className="text-xs mt-2 text-blue-500">Click to view details and PRD link</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {QUARTERS.map((quarter) => {
            const load = calculateQuarterLoad(quarter.id);
            const capacity = calculateQuarterCapacity(quarter.id, velocity);
            const utilization = utilizationByQuarter[quarter.id];
            const isOverCapacity = utilization > 100;
            const isAtRisk = utilization > 90;
            const isPlanned = quarter.isPlanned;

            return (
              <div
                key={quarter.id}
                className={`p-4 rounded-lg border ${
                  isPlanned ? 'border-dashed border-orange-300 bg-orange-50/50 dark:bg-orange-900/5' :
                  isOverCapacity ? 'border-red-300 bg-red-50 dark:bg-red-900/10' :
                  isAtRisk ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/10' :
                  'bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium">{quarter.name}</span>
                    {quarter.version && (
                      <p className="text-xs text-muted-foreground">{quarter.version}</p>
                    )}
                  </div>
                  {isPlanned ? (
                    <Clock className="w-4 h-4 text-orange-500" />
                  ) : isOverCapacity ? (
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
                {/* Description */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{selectedFeature.description}</p>
                  </div>
                </div>

                {/* Status & Progress */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={
                      selectedFeature.status === 'Complete' ? 'bg-green-100 text-green-700' :
                      selectedFeature.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      selectedFeature.status === 'Planned' ? 'bg-orange-100 text-orange-700' :
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
                            {quarter?.name} {quarter?.version && `(${quarter.version})`}
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
                      className={`flex items-center gap-1 text-sm hover:underline ${
                        selectedFeature.prdStatus === 'pending' ? 'text-orange-500' : 'text-blue-600'
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      PRD Document
                      {selectedFeature.prdStatus === 'pending' && (
                        <span className="text-xs">(PRD pending)</span>
                      )}
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
