import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Bot, Mail, RefreshCw, Banknote, Briefcase, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Info, Layers, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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
  AGENT_FAMILIES,
  BLUEPRINT_COVERAGE,
  getBlueprintStatus,
  getFamilyBlueprintCounts,
  type AgentFamily
} from "@/data/artemisData";

const FAMILY_ICONS: Record<string, JSX.Element> = {
  'Comms': <Mail className="w-5 h-5" />,
  'Reconciliation': <RefreshCw className="w-5 h-5" />,
  'Settlements': <Banknote className="w-5 h-5" />,
  'Operations': <Briefcase className="w-5 h-5" />
};

const FAMILY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Comms': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Reconciliation': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Settlements': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Operations': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
};

function StatusIcon({ status }: { status: 'active' | 'partial' | 'gap' }) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'partial':
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case 'gap':
      return <XCircle className="w-4 h-4 text-red-400" />;
  }
}

function StatusBadge({ status }: { status: 'active' | 'partial' | 'gap' }) {
  const styles: Record<typeof status, string> = {
    active: 'bg-green-100 text-green-800 border-green-300',
    partial: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    gap: 'bg-red-100 text-red-400 border-red-200'
  };

  const labels: Record<typeof status, string> = {
    active: 'Active',
    partial: 'Partial',
    gap: 'Gap'
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}

// Family Card Component
function FamilyCard({
  familyName,
  family,
  isExpanded,
  onToggle
}: {
  familyName: string;
  family: AgentFamily;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colors = FAMILY_COLORS[familyName];
  const icon = FAMILY_ICONS[familyName];
  const counts = getFamilyBlueprintCounts(familyName);
  const total = family.blueprints.length;
  const coveragePercent = Math.round(((counts.active + counts.partial * 0.5) / total) * 100);

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${colors.border} ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onToggle}
      data-testid={`family-card-${familyName.toLowerCase()}`}
    >
      <CardHeader className={`${colors.bg} rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={colors.text}>{icon}</span>
            <span className={`font-bold ${colors.text}`}>{familyName}</span>
          </div>
          <Badge className={`${colors.text} ${colors.bg} border ${colors.border}`}>
            {total} blueprints
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {/* Coverage Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-semibold">{coveragePercent}%</span>
          </div>
          <Progress value={coveragePercent} className="h-2" />

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-green-50">
              <div className="font-bold text-green-700">{counts.active}</div>
              <div className="text-green-600">Active</div>
            </div>
            <div className="p-2 rounded bg-yellow-50">
              <div className="font-bold text-yellow-700">{counts.partial}</div>
              <div className="text-yellow-600">Partial</div>
            </div>
            <div className="p-2 rounded bg-red-50">
              <div className="font-bold text-red-400">{counts.gap}</div>
              <div className="text-red-400">Gap</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground pt-2">
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {isExpanded ? 'Hide blueprints' : 'Show blueprints'}
          </div>
        </div>

        {/* Blueprint List (Expanded) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-2 animate-in fade-in-50 duration-200">
            {family.blueprints.map((blueprint) => {
              const status = getBlueprintStatus(blueprint);
              return (
                <div
                  key={blueprint}
                  className="flex items-center justify-between p-2 rounded bg-gray-50 text-sm"
                  data-testid={`blueprint-${blueprint.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center gap-2">
                    <StatusIcon status={status} />
                    <span className="text-gray-700">{blueprint}</span>
                  </div>
                  <StatusBadge status={status} />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Coverage Matrix Component
function BlueprintCoverageMatrix() {
  const allBlueprints = useMemo(() => {
    const result: Array<{ family: string; blueprint: string; status: 'active' | 'partial' | 'gap' }> = [];

    Object.entries(AGENT_FAMILIES).forEach(([familyName, family]) => {
      family.blueprints.forEach((blueprint) => {
        result.push({
          family: familyName,
          blueprint,
          status: getBlueprintStatus(blueprint)
        });
      });
    });

    return result;
  }, []);

  const statusCounts = useMemo(() => {
    return allBlueprints.reduce((acc, bp) => {
      acc[bp.status]++;
      return acc;
    }, { active: 0, partial: 0, gap: 0 });
  }, [allBlueprints]);

  return (
    <Card data-testid="coverage-matrix">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Blueprint Coverage Matrix
          </span>
          <div className="flex gap-2 text-xs">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" /> {statusCounts.active} Active
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800">
              <AlertTriangle className="w-3 h-3 mr-1" /> {statusCounts.partial} Partial
            </Badge>
            <Badge className="bg-red-100 text-red-400">
              <XCircle className="w-3 h-3 mr-1" /> {statusCounts.gap} Gap
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Family</TableHead>
              <TableHead>Blueprint</TableHead>
              <TableHead className="w-[120px]">JIRA Coverage</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allBlueprints.map((bp, idx) => {
              const familyColors = FAMILY_COLORS[bp.family];
              return (
                <TableRow key={idx} data-testid={`matrix-row-${idx}`}>
                  <TableCell>
                    <Badge variant="outline" className={`${familyColors.bg} ${familyColors.text} ${familyColors.border}`}>
                      {bp.family}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{bp.blueprint}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <StatusIcon status={bp.status} />
                      <span className="text-sm text-muted-foreground">
                        {bp.status === 'active' ? 'Has tickets' :
                         bp.status === 'partial' ? 'Needs validation' :
                         'No tickets'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={bp.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function AgentFamilies() {
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);

  const totalBlueprints = useMemo(() => {
    return Object.values(AGENT_FAMILIES).reduce((sum, family) => sum + family.blueprints.length, 0);
  }, []);

  const overallCounts = useMemo(() => {
    return Object.keys(AGENT_FAMILIES).reduce((acc, familyName) => {
      const counts = getFamilyBlueprintCounts(familyName);
      acc.active += counts.active;
      acc.partial += counts.partial;
      acc.gap += counts.gap;
      return acc;
    }, { active: 0, partial: 0, gap: 0 });
  }, []);

  const overallCoverage = Math.round(((overallCounts.active + overallCounts.partial * 0.5) / totalBlueprints) * 100);

  const handleFamilyToggle = (familyName: string) => {
    setExpandedFamily(expandedFamily === familyName ? null : familyName);
  };

  return (
    <div className="space-y-6" data-testid="agent-families-page">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bot className="w-8 h-8 text-blue-600" />
            Agent Families
          </h1>
          <p className="text-muted-foreground">
            4 Agent Families with {totalBlueprints} Blueprint configurations | ARTEMIS Agent Templates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DataFreshness />
          <div className="flex gap-2">
            <Link href="/artemis">
              <Button variant="outline" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Architecture
              </Button>
            </Link>
            <Link href="/initiative">
              <Button variant="outline" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Initiative
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="card-total-blueprints">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Blueprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{totalBlueprints}</div>
            <p className="text-xs text-muted-foreground mt-1">Across 4 agent families</p>
          </CardContent>
        </Card>

        <Card data-testid="card-overall-coverage">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{overallCoverage}%</div>
            <Progress value={overallCoverage} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card data-testid="card-active-blueprints">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Blueprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-4xl font-bold text-green-600">{overallCounts.active}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">With JIRA tickets</p>
          </CardContent>
        </Card>

        <Card data-testid="card-gap-blueprints">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coverage Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-400" />
              <span className="text-4xl font-bold text-red-400">{overallCounts.gap}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need JIRA tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Family Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Agent Families
          <span className="text-sm font-normal text-muted-foreground ml-2">
            Click to expand blueprints
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(AGENT_FAMILIES).map(([familyName, family]) => (
            <FamilyCard
              key={familyName}
              familyName={familyName}
              family={family}
              isExpanded={expandedFamily === familyName}
              onToggle={() => handleFamilyToggle(familyName)}
            />
          ))}
        </div>
      </div>

      {/* Coverage Matrix Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          data-testid="toggle-matrix-button"
        >
          {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showMatrix ? 'Hide' : 'Show'} Full Coverage Matrix
        </button>
      </div>

      {/* Coverage Matrix */}
      {showMatrix && (
        <div className="animate-in fade-in-50 duration-200">
          <BlueprintCoverageMatrix />
        </div>
      )}

      {/* Legend */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span><strong>Active:</strong> Has JIRA tickets in active development</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span><strong>Partial:</strong> Needs validation or additional tickets</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span><strong>Gap:</strong> No JIRA tickets mapped yet</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
