import { useState, useMemo } from "react";
import { Link } from "wouter";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Layers, ExternalLink, ChevronDown, ChevronUp, Info, Bot, Network, Cog, Shield, Database, Server, Plug, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  ARTEMIS_LAYERS,
  ARTEMIS_TICKET_DATA,
  getTotalTicketCount,
  getTicketsByLayer,
  type ArtemisLayer,
  type ArtemisTicket
} from "@/data/artemisData";

const LAYER_ICONS: Record<string, JSX.Element> = {
  'complex-services': <Bot className="w-4 h-4" />,
  'blueprint': <Layers className="w-4 h-4" />,
  'automation-orchestration': <Network className="w-4 h-4" />,
  'agentic-engine': <Cog className="w-4 h-4" />,
  'process-certainty': <Shield className="w-4 h-4" />,
  'deepgraph': <Database className="w-4 h-4" />,
  'platform': <Server className="w-4 h-4" />,
  'integrations': <Plug className="w-4 h-4" />
};

const JIRA_BASE_URL = 'https://deepsee.atlassian.net/browse/';

function getStatusBadgeClass(status: string): string {
  switch (status.toUpperCase()) {
    case 'DONE':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'IN PROGRESS':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'CODE REVIEW':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'PLANNING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'TO DO':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    case 'BLOCKED':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300';
  }
}

// Architecture Diagram Component
function ArchitectureDiagram({
  layers,
  selectedLayer,
  onLayerClick
}: {
  layers: ArtemisLayer[];
  selectedLayer: string | null;
  onLayerClick: (name: string) => void;
}) {
  const getLayerData = (name: string) => layers.find(l => l.name === name) || { count: 0, color: '#ccc', description: '' };

  const DiagramBox = ({
    layerName,
    fullWidth = false,
    className = ''
  }: {
    layerName: string;
    fullWidth?: boolean;
    className?: string;
  }) => {
    const layer = getLayerData(layerName);
    const isSelected = selectedLayer === layerName;

    return (
      <TooltipProvider>
        <UITooltip>
          <TooltipTrigger asChild>
            <div
              className={`
                diagram-box cursor-pointer transition-all duration-200
                ${fullWidth ? 'flex-1' : 'min-w-[140px]'}
                ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105' : ''}
                ${className}
              `}
              style={{
                backgroundColor: layer.color + '30',
                borderColor: layer.color,
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onClick={() => onLayerClick(layerName)}
              data-testid={`diagram-box-${layerName.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="block font-semibold text-sm text-white">{layerName}</span>
              <span
                className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: layer.color }}
              >
                {layer.count}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="font-medium">{layerName}</p>
            <p className="text-xs text-muted-foreground mt-1">{layer.description}</p>
            <p className="text-xs mt-1">{layer.count} tickets</p>
          </TooltipContent>
        </UITooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="architecture-diagram bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-6 text-white" data-testid="architecture-diagram">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white/90">ARTEMIS Architecture Stack</h3>
        <p className="text-xs text-white/60">Click any layer to view tickets</p>
      </div>

      {/* Complex Services - Top Layer */}
      <div className="flex justify-center mb-3">
        <DiagramBox layerName="Complex Services" fullWidth className="rounded-lg p-4 text-center max-w-[500px]" />
      </div>

      {/* Capability Row */}
      <div className="flex justify-center gap-4 py-2 border-t border-b border-white/20 my-3">
        {['Extract', 'Validate', 'Reconcile', 'Orchestrate'].map(cap => (
          <span key={cap} className="text-xs uppercase tracking-wider text-white/50">{cap}</span>
        ))}
      </div>

      {/* Middle Layer - 3 boxes */}
      <div className="flex justify-center gap-3 mb-3">
        <DiagramBox layerName="Blueprint" className="rounded-lg p-3 text-center flex-1 max-w-[160px]" />
        <DiagramBox layerName="Automation & Orchestration" className="rounded-lg p-3 text-center flex-1 max-w-[200px]" />
        <DiagramBox layerName="DeepGraph" className="rounded-lg p-3 text-center flex-1 max-w-[160px]" />
      </div>

      {/* Core Layer - 2 boxes */}
      <div className="flex justify-center gap-3 mb-3">
        <DiagramBox layerName="Agentic Engine" className="rounded-lg p-3 text-center flex-1 max-w-[200px]" />
        <DiagramBox layerName="Process Certainty" className="rounded-lg p-3 text-center flex-1 max-w-[200px]" />
      </div>

      {/* Platform Layer */}
      <div className="flex justify-center mb-3">
        <DiagramBox layerName="Platform" fullWidth className="rounded-lg p-3 text-center max-w-[500px]" />
      </div>

      {/* Integrations Layer */}
      <div className="flex justify-center">
        <DiagramBox layerName="Integrations" fullWidth className="rounded-lg p-3 text-center max-w-[500px]" />
      </div>
    </div>
  );
}

// Layer Card Component
function LayerCard({
  layer,
  isSelected,
  onClick
}: {
  layer: ArtemisLayer;
  isSelected: boolean;
  onClick: () => void;
}) {
  const icon = LAYER_ICONS[layer.id] || <Layers className="w-4 h-4" />;

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 shadow-lg' : ''
      }`}
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: layer.color,
        ...(isSelected ? { ringColor: layer.color } : {})
      }}
      onClick={onClick}
      data-testid={`layer-card-${layer.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ color: layer.color }}>{icon}</span>
            <span className="font-semibold text-sm text-slate-700">{layer.name}</span>
          </div>
          <Badge
            className="text-white font-bold"
            style={{ backgroundColor: layer.color }}
          >
            {layer.count}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{layer.description}</p>
        {isSelected && (
          <div className="flex items-center gap-1 text-xs mt-2" style={{ color: layer.color }}>
            <ChevronDown className="w-3 h-3" />
            View Details Below
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Ticket List Component
function TicketList({ tickets, layerName, layerColor }: { tickets: ArtemisTicket[]; layerName: string; layerColor: string }) {
  if (tickets.length === 0) {
    return (
      <Card className="mt-4" data-testid="ticket-list-empty">
        <CardContent className="py-8 text-center">
          <Info className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No tickets categorized under {layerName} yet</p>
          <p className="text-xs text-muted-foreground mt-1">Blueprint layer is reserved for agent configuration templates</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4" data-testid="ticket-list">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layerColor }} />
          {layerName} Tickets ({tickets.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Ticket ID</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.key} data-testid={`ticket-row-${ticket.key}`}>
                <TableCell className="font-mono text-sm font-medium">{ticket.key}</TableCell>
                <TableCell>{ticket.summary}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeClass(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <a
                    href={`${JIRA_BASE_URL}${ticket.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function ArtemisArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const totalTickets = getTotalTicketCount();

  const chartData = useMemo(() => {
    return ARTEMIS_LAYERS
      .filter(layer => layer.count > 0)
      .map(layer => ({
        name: layer.name,
        value: layer.count,
        color: layer.color,
        id: layer.id
      }));
  }, []);

  const selectedLayerData = useMemo(() => {
    if (!selectedLayer) return null;
    const layer = ARTEMIS_LAYERS.find(l => l.name === selectedLayer);
    if (!layer) return null;

    // Find the category name that matches this layer
    const categoryNames = Object.keys(ARTEMIS_TICKET_DATA);
    const matchingCategory = categoryNames.find(cat =>
      cat.toLowerCase() === layer.name.toLowerCase() ||
      cat.replace(/\s+/g, '-').toLowerCase() === layer.id
    );

    const tickets = matchingCategory ? getTicketsByLayer(matchingCategory) : [];
    return { layer, tickets };
  }, [selectedLayer]);

  const handleLayerClick = (layerName: string) => {
    setSelectedLayer(selectedLayer === layerName ? null : layerName);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value} tickets</p>
          <p className="text-xs text-blue-600 mt-1">Click to view details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6" data-testid="artemis-architecture-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Layers className="w-8 h-8 text-purple-600" />
              ARTEMIS Architecture
            </h1>
            <p className="text-muted-foreground">
              {totalTickets} tickets categorized across 8 architecture layers | Business Category Mapping
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DataFreshness />
            <div className="flex gap-2">
              <Link href="/initiative">
                <Button variant="outline" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  View Initiative
                </Button>
              </Link>
              <Link href="/agents">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Agent Families
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card data-testid="card-total-tickets">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600">{totalTickets}</div>
              <p className="text-xs text-muted-foreground mt-1">Categorized by Business Category</p>
            </CardContent>
          </Card>

          <Card data-testid="card-active-layers">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">
                {ARTEMIS_LAYERS.filter(l => l.count > 0).length}/8
              </div>
              <p className="text-xs text-muted-foreground mt-1">Layers with assigned tickets</p>
            </CardContent>
          </Card>

          <Card data-testid="card-top-layer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Most Active Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-600">Complex Services</div>
              <p className="text-xs text-muted-foreground mt-1">6 tickets (23% of total)</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Architecture Diagram */}
          <ArchitectureDiagram
            layers={ARTEMIS_LAYERS}
            selectedLayer={selectedLayer}
            onLayerClick={handleLayerClick}
          />

          {/* Distribution Chart */}
          <Card data-testid="card-distribution-chart">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Layer Distribution
                <Badge variant="outline">{totalTickets} total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={50}
                      paddingAngle={2}
                      onClick={(data) => handleLayerClick(data.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={selectedLayer === entry.name ? '#000' : 'transparent'}
                          strokeWidth={selectedLayer === entry.name ? 2 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-xs">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Layer Cards Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Architecture Layers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ARTEMIS_LAYERS.map((layer) => (
              <LayerCard
                key={layer.id}
                layer={layer}
                isSelected={selectedLayer === layer.name}
                onClick={() => handleLayerClick(layer.name)}
              />
            ))}
          </div>
        </div>

        {/* Selected Layer Tickets */}
        {selectedLayerData && (
          <div className="animate-in fade-in-50 duration-200">
            <TicketList
              tickets={selectedLayerData.tickets}
              layerName={selectedLayerData.layer.name}
              layerColor={selectedLayerData.layer.color}
            />
          </div>
        )}

        {/* Info Banner */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="py-4">
            <p className="text-sm text-purple-800">
              <strong>Note:</strong> Architecture mapping is based on JIRA "Business Category" field values.
              Click any layer in the diagram, chart, or cards to view associated tickets.
              The Blueprint layer contains no direct tickets as it represents configurable agent templates.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
