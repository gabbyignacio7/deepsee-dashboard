import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Target, ChevronRight, ChevronDown, ExternalLink, GitBranch, Layers, CheckCircle, Clock, AlertCircle, Circle, FolderTree, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ARTEMIS_INITIATIVE,
  ARTEMIS_MILESTONES,
  ARTEMIS_FOUNDATION_EPICS,
  ARTEMIS_TICKET_DATA,
  ARTEMIS_LAYERS,
  type ArtemisEpic
} from "@/data/artemisData";

const JIRA_BASE_URL = 'https://deepsee.atlassian.net/browse/';

function getStatusConfig(status: string): { color: string; bg: string; icon: JSX.Element } {
  switch (status.toUpperCase()) {
    case 'DONE':
      return { color: 'text-green-700', bg: 'bg-green-100', icon: <CheckCircle className="w-4 h-4" /> };
    case 'IN PROGRESS':
      return { color: 'text-blue-700', bg: 'bg-blue-100', icon: <Clock className="w-4 h-4" /> };
    case 'PLANNING':
      return { color: 'text-yellow-700', bg: 'bg-yellow-100', icon: <AlertCircle className="w-4 h-4" /> };
    case 'BACKLOG':
      return { color: 'text-purple-700', bg: 'bg-purple-100', icon: <Circle className="w-4 h-4" /> };
    case 'TO DO':
      return { color: 'text-gray-700', bg: 'bg-gray-100', icon: <Circle className="w-4 h-4" /> };
    default:
      return { color: 'text-gray-600', bg: 'bg-gray-100', icon: <Circle className="w-4 h-4" /> };
  }
}

function getLayerColor(layerName: string | undefined): string {
  if (!layerName) return '#607D8B';
  const layer = ARTEMIS_LAYERS.find(l => l.name === layerName);
  return layer?.color || '#607D8B';
}

// Epic Tree Node Component
function EpicTreeNode({
  epic,
  level = 0,
  isExpanded,
  onToggle,
  children
}: {
  epic: ArtemisEpic;
  level?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: ArtemisEpic[];
}) {
  const statusConfig = getStatusConfig(epic.status);
  const layerColor = getLayerColor(epic.layer);
  const hasChildren = children && children.length > 0;
  const paddingLeft = level * 24;

  return (
    <div className="border-b last:border-b-0" data-testid={`epic-node-${epic.key}`}>
      <div
        className="flex items-center gap-2 py-3 px-4 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: `${paddingLeft + 16}px` }}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren || onToggle ? (
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            data-testid={`toggle-${epic.key}`}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-6" /> // Spacer
        )}

        {/* Tree line indicator */}
        {level > 0 && (
          <GitBranch className="w-4 h-4 text-gray-400" />
        )}

        {/* Epic Key */}
        <a
          href={`${JIRA_BASE_URL}${epic.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {epic.key}
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Epic Summary */}
        <span className="flex-1 text-sm text-gray-700 truncate">{epic.summary}</span>

        {/* Layer Badge */}
        {epic.layer && (
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              backgroundColor: layerColor + '20',
              borderColor: layerColor,
              color: layerColor
            }}
          >
            {epic.layer}
          </Badge>
        )}

        {/* Status Badge */}
        <Badge className={`${statusConfig.bg} ${statusConfig.color} text-xs flex items-center gap-1`}>
          {statusConfig.icon}
          {epic.status}
        </Badge>

        {/* Children Count */}
        {epic.children && (
          <Badge variant="secondary" className="text-xs">
            {epic.children} children
          </Badge>
        )}
      </div>

      {/* Expanded Children */}
      {isExpanded && hasChildren && (
        <div className="bg-gray-50/50 animate-in fade-in-50 duration-200">
          {children.map((child) => (
            <EpicTreeNode
              key={child.key}
              epic={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Milestone Card Component
function MilestoneCard({ milestone }: { milestone: ArtemisEpic }) {
  const statusConfig = getStatusConfig(milestone.status);
  const layerColor = getLayerColor(milestone.layer);

  // Simulated progress (would come from real data)
  const progress = milestone.status === 'PLANNING' ? 10 : milestone.status === 'IN PROGRESS' ? 50 : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`milestone-card-${milestone.key}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <a
            href={`${JIRA_BASE_URL}${milestone.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            {milestone.key}
            <ExternalLink className="w-3 h-3" />
          </a>
          <Badge className={`${statusConfig.bg} ${statusConfig.color} text-xs flex items-center gap-1`}>
            {statusConfig.icon}
            {milestone.status}
          </Badge>
        </div>
        <CardTitle className="text-base">{milestone.summary}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Layer Tag */}
        {milestone.layer && (
          <Badge
            variant="outline"
            style={{
              backgroundColor: layerColor + '20',
              borderColor: layerColor,
              color: layerColor
            }}
          >
            <Layers className="w-3 h-3 mr-1" />
            {milestone.layer}
          </Badge>
        )}

        {/* Children Count */}
        {milestone.children && (
          <div className="text-sm text-muted-foreground">
            {milestone.children} child tickets
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ArtemisInitiative() {
  const [expandedInitiative, setExpandedInitiative] = useState(true);
  const [expandedEpics, setExpandedEpics] = useState<Record<string, boolean>>({});

  // Get child tickets for PR-1563 (Agent Orchestration Platform)
  const orchestrationChildren = useMemo(() => {
    const orchestrationTickets = ARTEMIS_TICKET_DATA['Automation & Orchestration']?.tickets || [];
    const agenticTickets = ARTEMIS_TICKET_DATA['Agentic Engine']?.tickets || [];

    // Filter to only include the ones that are children of PR-1563
    return [
      ...orchestrationTickets.filter(t => t.key !== 'PR-1563'),
      ...agenticTickets
    ].map(t => ({
      key: t.key,
      summary: t.summary,
      status: t.status,
      layer: ARTEMIS_LAYERS.find(l => l.id === t.layer)?.name
    }));
  }, []);

  const toggleEpic = (key: string) => {
    setExpandedEpics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate overall statistics
  const stats = useMemo(() => {
    const allEpics = [...ARTEMIS_MILESTONES, ...ARTEMIS_FOUNDATION_EPICS];
    const planning = allEpics.filter(e => e.status === 'PLANNING').length;
    const todo = allEpics.filter(e => e.status === 'TO DO').length;
    const totalChildren = allEpics.reduce((sum, e) => sum + (e.children || 0), 0);

    return { planning, todo, totalChildren, totalMilestones: allEpics.length };
  }, []);

  return (
    <div className="space-y-6" data-testid="artemis-initiative-page">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-600" />
            ARTEMIS Initiative
          </h1>
          <p className="text-muted-foreground">
            Epic hierarchy and milestone tracking for DeepSee Agentic Platform
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/artemis">
            <Button variant="outline" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Architecture
            </Button>
          </Link>
          <Link href="/agents">
            <Button variant="outline" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Agent Families
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-milestones">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600">{stats.totalMilestones}</div>
            <p className="text-xs text-muted-foreground mt-1">Total epics tracked</p>
          </CardContent>
        </Card>

        <Card data-testid="card-planning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-600">{stats.planning}</div>
            <p className="text-xs text-muted-foreground mt-1">Milestones being planned</p>
          </CardContent>
        </Card>

        <Card data-testid="card-todo">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-600">{stats.todo}</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting to start</p>
          </CardContent>
        </Card>

        <Card data-testid="card-children">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Child Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{stats.totalChildren}</div>
            <p className="text-xs text-muted-foreground mt-1">Work items under epics</p>
          </CardContent>
        </Card>
      </div>

      {/* Initiative Tree View */}
      <Card data-testid="card-initiative-tree">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-purple-600" />
            Initiative Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-lg overflow-hidden">
            {/* Main Initiative */}
            <EpicTreeNode
              epic={ARTEMIS_INITIATIVE}
              isExpanded={expandedInitiative}
              onToggle={() => setExpandedInitiative(!expandedInitiative)}
            />

            {/* Milestones (when initiative is expanded) */}
            {expandedInitiative && (
              <div className="bg-gray-50/30">
                {ARTEMIS_MILESTONES.map((milestone) => (
                  <EpicTreeNode
                    key={milestone.key}
                    epic={milestone}
                    level={1}
                    isExpanded={expandedEpics[milestone.key]}
                    onToggle={() => toggleEpic(milestone.key)}
                    children={milestone.key === 'PR-1563' ? orchestrationChildren as ArtemisEpic[] : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Foundation Epics */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-4">Foundation Epics</h3>
            <div className="border rounded-lg overflow-hidden">
              {ARTEMIS_FOUNDATION_EPICS.map((epic) => (
                <EpicTreeNode
                  key={epic.key}
                  epic={epic}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Progress Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Milestone Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTEMIS_MILESTONES.map((milestone) => (
            <MilestoneCard key={milestone.key} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Foundation Epics Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Foundation Epics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTEMIS_FOUNDATION_EPICS.map((epic) => (
            <MilestoneCard key={epic.key} milestone={epic} />
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="py-4">
          <p className="text-sm text-purple-800">
            <strong>Note:</strong> This view shows the ARTEMIS initiative hierarchy from JIRA.
            Click any ticket key to view it in JIRA. Progress percentages are estimated based on status.
            The tree view shows parent-child relationships between epics and their work items.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
