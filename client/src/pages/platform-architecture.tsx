import { useState, useMemo } from "react";
import { Layers, CheckCircle2, Zap, Circle, ChevronRight, BarChart2, ExternalLink, Link, Cog, FileText, Bot, Network, Monitor, Info, BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DataFreshness from "@/components/DataFreshness";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  masterFeaturesData,
  ARCHITECTURE_LAYERS,
  getArchitectureLayer,
  getEstimatedTicketCounts,
  getFeaturePRD,
  type ArchitectureLayer,
  type MasterFeature
} from "@/data/masterFeaturesData";
import MercuryExtractionSection from "@/components/MercuryExtractionSection";

const LAYER_ICONS: Record<ArchitectureLayer, JSX.Element> = {
  1: <Link className="w-4 h-4" />,
  2: <Cog className="w-4 h-4" />,
  3: <FileText className="w-4 h-4" />,
  4: <Bot className="w-4 h-4" />,
  5: <Network className="w-4 h-4" />,
  6: <CheckCircle2 className="w-4 h-4" />,
  7: <Monitor className="w-4 h-4" />
};

// All PRD Links - Confluence URLs (Updated January 13, 2026)
const PRD_LINKS = {
  artemis: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824044546/Project+ARTEMIS+PRD',
  platform: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948/Platform+PRD',
  automation: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823913475/Automation+and+Orchestration+PRD',
  mercury: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289/Mercury+Extraction',
  parser: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865/Document+Classifier+and+Parser+PRD+Automating+Document+Processing+for+Colony+Bank+and+Broadridge',
  blueprint: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710/Blue+Print+PRD',
  email: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815852545/Email+Automation+Workflow+for+Enhanced+Triage+and+Management+in+Shared+Inboxes',
  agentReasoning: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2816147457/Enhanced+Outcome+Reasoning+and+Planning+for+Agentic+Platform+Agents',
  agenticEngine: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824372269/DeepSee+Agentic+Engine+Standardizing+Skill+Agents+for+Enhanced+Platform+Efficiency+and+Client+Support',
  epaResolution: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553/DeepSee+AI+s+EPA+Automated+Resolution+Enhancing+Email+Workflow+Automation+for+Capital+Markets',
  fabric: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815721483/DeepSee+Fabric+Unified+Data+Pipeline+for+Agentic+Workflow+Orchestration+on+Microsoft+Fabric',
  prdIndex: 'https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2813558785/Product+Requirements+Documents+PRDs',
};

const ARTEMIS_CONFIG = {
  header: {
    name: "Project ARTEMIS",
    description: "Next-generation AI platform for capital markets automation",
    prdLink: PRD_LINKS.artemis
  },
  pillars: {
    1: {
      name: "Platform",
      description: "Communication, storage, and processing infrastructure for ARTEMIS",
      prdLink: PRD_LINKS.platform
    },
    2: {
      name: "Automation and Orchestration",
      description: "Visibility, auditability, and multi-agent coordination",
      prdLink: PRD_LINKS.automation
    },
    3: {
      name: "Mercury Extraction",
      description: "Document extraction service for loan packages and financial documents",
      prdLink: PRD_LINKS.mercury
    },
    4: {
      name: "Document Parser",
      description: "Multi-format intelligent document parsing and classification",
      prdLink: PRD_LINKS.parser
    },
    5: {
      name: "BluePrint",
      description: "Agent configuration framework for outcome templates",
      prdLink: PRD_LINKS.blueprint
    },
    6: {
      name: "Email Automation",
      description: "Intelligent email processing and response automation",
      prdLink: PRD_LINKS.email
    },
    7: {
      name: "Enhanced Agent Reasoning",
      description: "Advanced reasoning capabilities for agent decision-making",
      prdLink: PRD_LINKS.agentReasoning
    }
  } as Record<number, { name: string; description: string; prdLink: string }>
};

// Additional PRDs not mapped to layers but accessible
const ADDITIONAL_PRDS = [
  { name: "Agentic Engine", prdLink: PRD_LINKS.agenticEngine, description: "Core agent execution engine" },
  { name: "EPA Automated Resolution", prdLink: PRD_LINKS.epaResolution, description: "Exception processing automation" },
  { name: "DeepSee Fabric", prdLink: PRD_LINKS.fabric, description: "Microsoft Fabric integration for analytics" },
];

interface LayerStats {
  layer: ArchitectureLayer;
  name: string;
  description: string;
  features: MasterFeature[];
  featureCount: number;
  ticketsTotal: number;
  ticketsDone: number;
  progress: number;
  status: 'production' | 'near-threshold' | 'development';
  nowCount: number;
  nextCount: number;
  laterCount: number;
}

function getLayerStatus(progress: number): 'production' | 'near-threshold' | 'development' {
  if (progress >= 70) return 'production';
  if (progress >= 50) return 'near-threshold';
  return 'development';
}

function getStatusIcon(status: 'production' | 'near-threshold' | 'development') {
  switch (status) {
    case 'production':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'near-threshold':
      return <Zap className="w-4 h-4 text-yellow-500" />;
    default:
      return <Circle className="w-4 h-4 text-gray-400" />;
  }
}

function getStatusLabel(status: 'production' | 'near-threshold' | 'development') {
  switch (status) {
    case 'production':
      return 'Production Ready';
    case 'near-threshold':
      return 'Near Threshold';
    default:
      return 'In Development';
  }
}

function getProgressColor(progress: number): string {
  if (progress >= 70) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-gray-400';
}

export default function PlatformArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer | null>(null);

  const layerStats = useMemo<LayerStats[]>(() => {
    const layers: ArchitectureLayer[] = [1, 2, 3, 4, 5, 6, 7];
    
    return layers.map(layer => {
      const layerInfo = ARCHITECTURE_LAYERS[layer];
      const features = masterFeaturesData.filter(f => 
        (f.architectureLayer || getArchitectureLayer(f)) === layer
      );
      
      const nowCount = features.filter(f => f.quarter === 'NOW').length;
      const nextCount = features.filter(f => f.quarter === 'NEXT').length;
      const laterCount = features.filter(f => f.quarter === 'LATER').length;
      
      let ticketsTotal = 0;
      let ticketsDone = 0;
      
      features.forEach(f => {
        const counts = f.jiraTicketCount !== undefined && f.jiraTicketsDone !== undefined
          ? { total: f.jiraTicketCount, done: f.jiraTicketsDone }
          : getEstimatedTicketCounts(f);
        ticketsTotal += counts.total;
        ticketsDone += counts.done;
      });
      
      const progress = ticketsTotal > 0 ? Math.round((ticketsDone / ticketsTotal) * 100) : 0;
      
      return {
        layer,
        name: layerInfo.name,
        description: layerInfo.description,
        features,
        featureCount: features.length,
        ticketsTotal,
        ticketsDone,
        progress,
        status: getLayerStatus(progress),
        nowCount,
        nextCount,
        laterCount
      };
    });
  }, []);

  const overallProgress = useMemo(() => {
    const total = layerStats.reduce((sum, l) => sum + l.progress, 0);
    return Math.round(total / layerStats.length);
  }, [layerStats]);

  const pillarsAtThreshold = useMemo(() => {
    return layerStats.filter(l => l.status === 'production').length;
  }, [layerStats]);

  const selectedLayerFeatures = useMemo(() => {
    if (!selectedLayer) return [];
    const stats = layerStats.find(l => l.layer === selectedLayer);
    return stats?.features || [];
  }, [selectedLayer, layerStats]);

  return (
    <TooltipProvider>
    <div className="container mx-auto p-6 space-y-6 max-w-[1600px]">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={ARTEMIS_CONFIG.header.prdLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                data-testid="link-artemis-header"
              >
                <span className="font-bold text-lg tracking-wide">PROJECT ARTEMIS</span>
                <Info className="w-4 h-4 opacity-80" />
              </a>
            </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <p className="font-medium">{ARTEMIS_CONFIG.header.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{ARTEMIS_CONFIG.header.description}</p>
            <p className="text-xs text-blue-400 mt-1">Click to view PRD</p>
          </TooltipContent>
        </Tooltip>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3" data-testid="text-architecture-title">
            <Layers className="w-8 h-8 text-blue-600" />
            Platform Architecture
          </h1>
          <p className="text-muted-foreground">
            Agent Outcome Configuration • 7 Layers Progress View • {masterFeaturesData.length} Total Features
          </p>
        </div>
        </div>
        <DataFreshness />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card data-testid="card-overall-progress">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Platform Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600" data-testid="text-overall-progress">
                {overallProgress}%
              </div>
              <div className="flex-1">
                <Progress value={overallProgress} className="h-3" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average across 7 architecture layers
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-layers-threshold">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Layers at Threshold (70%+)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-green-600" data-testid="text-layers-threshold">
                {pillarsAtThreshold}/7
              </div>
              <div className="text-sm text-muted-foreground">
                {pillarsAtThreshold === 7 ? 'All layers production ready!' : 
                 pillarsAtThreshold > 0 ? `${7 - pillarsAtThreshold} layers remaining` : 
                 'Working toward production readiness'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {layerStats.map((layer) => (
          <Card 
            key={layer.layer}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedLayer === layer.layer ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedLayer(selectedLayer === layer.layer ? null : layer.layer)}
            data-testid={`card-layer-${layer.layer}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">{LAYER_ICONS[layer.layer]}</span>
                  <Badge variant="outline" className="text-xs">
                    [{layer.layer}]
                  </Badge>
                </div>
                {getStatusIcon(layer.status)}
              </div>
              <CardTitle className="text-sm font-semibold mt-2">
                {ARTEMIS_CONFIG.pillars[layer.layer] ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={ARTEMIS_CONFIG.pillars[layer.layer].prdLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`link-pillar-prd-${layer.layer}`}
                      >
                        {layer.name}
                        <Info className="w-3 h-3 text-gray-400" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <p className="font-medium">{layer.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ARTEMIS_CONFIG.pillars[layer.layer].description}</p>
                      <p className="text-xs text-blue-400 mt-1">Click to view PRD</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  layer.name
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{layer.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${getProgressColor(layer.progress)}`}
                    style={{ width: `${layer.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs">
                {getStatusIcon(layer.status)}
                <span className={`
                  ${layer.status === 'production' ? 'text-green-600' : ''}
                  ${layer.status === 'near-threshold' ? 'text-yellow-600' : ''}
                  ${layer.status === 'development' ? 'text-gray-500' : ''}
                `}>
                  {getStatusLabel(layer.status)}
                </span>
              </div>

              <div className="text-xs text-muted-foreground">
                Features: {layer.featureCount} | Tickets: {layer.ticketsDone}/{layer.ticketsTotal}
              </div>

              <div className="flex items-center gap-2 text-xs flex-wrap">
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  Now: {layer.nowCount}
                </Badge>
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  Next: {layer.nextCount}
                </Badge>
                <Badge variant="secondary">
                  Later: {layer.laterCount}
                </Badge>
              </div>

              {selectedLayer === layer.layer && (
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                  <ChevronRight className="w-3 h-3" />
                  View Details Below
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLayer && (
        <Card data-testid="card-layer-details">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              [{selectedLayer}] {ARCHITECTURE_LAYERS[selectedLayer].name} - Feature Details
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {ARCHITECTURE_LAYERS[selectedLayer].description}
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature ID</TableHead>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>PRD Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>JIRA Tickets</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedLayerFeatures.map((feature) => {
                  const ticketCounts = feature.jiraTicketCount !== undefined && feature.jiraTicketsDone !== undefined
                    ? { total: feature.jiraTicketCount, done: feature.jiraTicketsDone }
                    : getEstimatedTicketCounts(feature);
                  const featureProgress = ticketCounts.total > 0 
                    ? Math.round((ticketCounts.done / ticketCounts.total) * 100) 
                    : 0;
                  
                  return (
                    <TableRow key={feature.id} data-testid={`row-feature-${feature.id}`}>
                      <TableCell className="font-mono text-sm">{feature.id}</TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate" title={feature.name}>
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate" title={getFeaturePRD(feature)}>
                        {getFeaturePRD(feature)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`
                            ${feature.prdStatus === 'Complete' ? 'border-green-500 text-green-600' : ''}
                            ${feature.prdStatus === 'In Progress' ? 'border-yellow-500 text-yellow-600' : ''}
                            ${feature.prdStatus === 'Not Started' ? 'border-gray-400 text-gray-500' : ''}
                          `}
                        >
                          {feature.prdStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={feature.quarter === 'NOW' ? 'default' : 'secondary'}
                          className={`
                            ${feature.quarter === 'NOW' ? 'bg-green-500' : ''}
                            ${feature.quarter === 'NEXT' ? 'bg-yellow-500' : ''}
                            ${feature.quarter === 'LATER' ? 'bg-gray-400' : ''}
                          `}
                        >
                          {feature.quarter === 'NOW' ? 'Q4 2025' : feature.quarter === 'NEXT' ? 'Q1 2026' : 'Q2+ 2026'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {ticketCounts.done}/{ticketCounts.total}
                        </span>
                        {feature.epicInJira === 'Yes' && (
                          <ExternalLink className="w-3 h-3 ml-1 inline text-blue-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColor(featureProgress)}`}
                              style={{ width: `${featureProgress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{featureProgress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {selectedLayerFeatures.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No features mapped to this architecture layer
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <MercuryExtractionSection />

      {/* PRD Links Section */}
      <Card data-testid="card-prd-links">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Product Requirements Documents (PRDs)
            </CardTitle>
            <a
              href={PRD_LINKS.prdIndex}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:underline flex items-center gap-1"
            >
              View All PRDs in Confluence
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Quick access to all ARTEMIS PRDs - click any link to view full documentation
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Core ARTEMIS PRD */}
            <a
              href={PRD_LINKS.artemis}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Project ARTEMIS</p>
                <p className="text-xs text-muted-foreground">Master PRD</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>

            {/* Layer PRDs */}
            {Object.entries(ARTEMIS_CONFIG.pillars).map(([layer, config]) => (
              <a
                key={layer}
                href={config.prdLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {LAYER_ICONS[parseInt(layer) as ArchitectureLayer]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{config.name}</p>
                  <p className="text-xs text-muted-foreground truncate" title={config.description}>
                    {config.description.length > 40 ? config.description.slice(0, 40) + '...' : config.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}

            {/* Additional PRDs */}
            {ADDITIONAL_PRDS.map((prd) => (
              <a
                key={prd.name}
                href={prd.prdLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{prd.name}</p>
                  <p className="text-xs text-muted-foreground">{prd.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Progress is calculated based on ticket completion ratios (Done/Total).
            Ticket counts are estimated from PRD status and Epic linkage when direct JIRA data is unavailable.
            Features are auto-mapped to architecture layers based on their name and category patterns.
            Click any layer card to view detailed feature breakdown. 70%+ progress indicates Production Ready status.
          </p>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
}
