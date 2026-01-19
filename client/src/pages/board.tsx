import { useState } from "react";
import { DollarSign, Shield, Rocket, LayoutDashboard, AlertTriangle, TrendingUp, Clock, CheckCircle2, Target, Users, Calendar, ChevronRight, Activity, Zap, Bug, UserCheck, Bot, BarChart3 } from "lucide-react";
import AgenticPlatformSection from "@/components/AgenticPlatform/AgenticPlatformSection";
import SprintAllocationSection from "@/components/SprintAllocation/SprintAllocationSection";
import SalesPipelineSection from "@/components/SalesPipeline/SalesPipelineSection";
import { useDashboard } from "@/components/dashboard-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import MetricTooltip from "@/components/MetricTooltip";
import DataFreshness from "@/components/DataFreshness";
import {
  calculateRevenueMetrics,
  calculateOperationsMetrics,
  calculateInnovationMetrics,
  type RevenueMetrics,
  type OperationsMetrics,
  type InnovationMetrics
} from "@/lib/board-metrics";
import {
  masterFeaturesData,
  BUCKET_CONFIG,
  getBucketStats,
  getQuarterStats,
  getRoadmapProgress,
  getAgentDistribution,
  getClientDistribution,
  getTotalARRAtRisk,
  type Bucket,
  type Quarter
} from "@/data/masterFeaturesData";
import { 
  SPRINT_2_DATA, 
  getSprintProgress, 
  formatDataTimestamp
} from "@/data/sprint2Data";
import SprintCloseReadiness from "@/components/SprintCloseReadiness";

/**
 * Board View Dashboard - Executive/Board-Level View
 * 
 * Organized around 5 Key Board Requirements:
 * 1. Roadmap Delivered vs Plan - Visual Progress Tracker
 * 2. Adoption of Top Value-Driving Features/Workflows
 * 3. Reliability/Security Milestones (Enterprise Readiness)
 * 4. Implementation Time Trend; Time-to-First-Value
 * 5. Support Volume and SLA Attainment
 * 
 * Strategic Priority Framework (3-Bucket):
 * - Make Money (45 features) - Revenue Growth
 * - Don't Lose Money (12 features) - Operational Excellence
 * - Innovation (17 features) - Competitive Advantage
 */
export default function BoardView() {
  const { allFeatures, allJiraTickets, allSalesOpportunities } = useDashboard();
  const [selectedBucket, setSelectedBucket] = useState<Bucket | 'all'>('all');

  // Calculate metrics for all 3 pillars
  const revenueMetrics = calculateRevenueMetrics(
    allFeatures,
    allSalesOpportunities
  );
  const operationsMetrics = calculateOperationsMetrics(
    allFeatures,
    allJiraTickets
  );
  const innovationMetrics = calculateInnovationMetrics(
    allFeatures,
    allJiraTickets
  );

  // Get bucket and quarter statistics
  const bucketStats = getBucketStats();
  const quarterStats = getQuarterStats();
  const roadmapProgress = getRoadmapProgress();

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-board-title">
            DeepSee Executive Dashboard
          </h1>
          <p className="text-muted-foreground">
            Board Meeting Preparation •{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>
        <DataFreshness />
      </div>

      {/* Tab Navigation */}
      <Tabs defaultValue="strategic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 lg:w-auto gap-1">
          <TabsTrigger value="strategic" data-testid="tab-strategic-buckets">
            <Target className="w-4 h-4 mr-2" />
            Strategic
          </TabsTrigger>
          <TabsTrigger value="roadmap" data-testid="tab-roadmap">
            <Calendar className="w-4 h-4 mr-2" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="sprint" data-testid="tab-sprint-allocation">
            <BarChart3 className="w-4 h-4 mr-2" />
            Sprint
          </TabsTrigger>
          <TabsTrigger value="pipeline" data-testid="tab-sales-pipeline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="revenue" data-testid="tab-revenue-growth">
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="operations" data-testid="tab-operations">
            <Shield className="w-4 h-4 mr-2" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="innovation" data-testid="tab-innovation">
            <Rocket className="w-4 h-4 mr-2" />
            Innovation
          </TabsTrigger>
          <TabsTrigger value="agentic" data-testid="tab-agentic-platform">
            <Bot className="w-4 h-4 mr-2" />
            Agentic
          </TabsTrigger>
        </TabsList>

        {/* Strategic Overview Tab - 3-Bucket Framework */}
        <TabsContent value="strategic" className="space-y-6">
          <StrategicBucketView 
            bucketStats={bucketStats}
            quarterStats={quarterStats}
            revenueMetrics={revenueMetrics}
            operationsMetrics={operationsMetrics}
            selectedBucket={selectedBucket}
            setSelectedBucket={setSelectedBucket}
          />
        </TabsContent>

        {/* Roadmap Tab - Visual Progress Tracker */}
        <TabsContent value="roadmap" className="space-y-6">
          <RoadmapDeliveryView
            roadmapProgress={roadmapProgress}
            quarterStats={quarterStats}
          />
        </TabsContent>

        {/* Sprint Allocation Tab - Engineering Allocation */}
        <TabsContent value="sprint" className="space-y-6">
          <SprintAllocationSection />
        </TabsContent>

        {/* Sales Pipeline Tab - Monday.com CRM Data */}
        <TabsContent value="pipeline" className="space-y-6">
          <SalesPipelineSection />
        </TabsContent>

        {/* Revenue Growth Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <RevenueGrowthView 
            metrics={revenueMetrics} 
            salesOpportunities={allSalesOpportunities}
          />
        </TabsContent>

        {/* Operational Excellence Tab */}
        <TabsContent value="operations" className="space-y-6">
          <OperationalExcellenceView 
            metrics={operationsMetrics}
            features={allFeatures}
            tickets={allJiraTickets}
          />
        </TabsContent>

        {/* Innovation Tab */}
        <TabsContent value="innovation" className="space-y-6">
          <InnovationView metrics={innovationMetrics} />
        </TabsContent>

        {/* Agentic Platform Tab - PR-1561 Initiative */}
        <TabsContent value="agentic" className="space-y-6">
          <AgenticPlatformSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// STRATEGIC BUCKET VIEW - 3-Bucket Strategic Framework
// ============================================================================

interface StrategicBucketViewProps {
  bucketStats: ReturnType<typeof getBucketStats>;
  quarterStats: ReturnType<typeof getQuarterStats>;
  revenueMetrics: RevenueMetrics;
  operationsMetrics: OperationsMetrics;
  selectedBucket: Bucket | 'all';
  setSelectedBucket: (bucket: Bucket | 'all') => void;
}

function StrategicBucketView({
  bucketStats,
  quarterStats,
  revenueMetrics,
  operationsMetrics,
  selectedBucket,
  setSelectedBucket
}: StrategicBucketViewProps) {
  const arrAtRisk = getTotalARRAtRisk();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Strategic Bucket Overview</h2>
        <p className="text-muted-foreground">
          Strategic Priority Framework: {bucketStats.total} features across Make Money, Don't Lose Money, and Innovation
        </p>
      </div>

      {/* Hero KPI Cards - 3 Buckets */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Make Money Bucket */}
        <Card 
          className={`p-6 cursor-pointer transition-all hover-elevate ${selectedBucket === 'Make' ? 'ring-2 ring-green-500' : ''}`}
          onClick={() => setSelectedBucket(selectedBucket === 'Make' ? 'all' : 'Make')}
          data-testid="card-bucket-make"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                Make Money
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400" data-testid="text-make-count">
                {bucketStats.make.count}
              </p>
              <p className="text-sm text-muted-foreground">
                {bucketStats.make.pct}% of features
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                "How do we make money?"
              </p>
            </div>
          </div>
        </Card>

        {/* Don't Lose Money Bucket */}
        <Card 
          className={`p-6 cursor-pointer transition-all hover-elevate ${selectedBucket === "Don't Lose" ? 'ring-2 ring-amber-500' : ''}`}
          onClick={() => setSelectedBucket(selectedBucket === "Don't Lose" ? 'all' : "Don't Lose")}
          data-testid="card-bucket-dontlose"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                Don't Lose Money
              </p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400" data-testid="text-dontlose-count">
                {bucketStats.dontLose.count}
              </p>
              <p className="text-sm text-muted-foreground">
                {bucketStats.dontLose.pct}% of features
              </p>
              <div className="flex items-center gap-1 mt-2">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">
                  ${(arrAtRisk / 1000).toFixed(0)}K at risk
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Innovation Bucket */}
        <Card 
          className={`p-6 cursor-pointer transition-all hover-elevate ${selectedBucket === 'Innovation' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedBucket(selectedBucket === 'Innovation' ? 'all' : 'Innovation')}
          data-testid="card-bucket-innovation"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                Innovation
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-innovation-count">
                {bucketStats.innovation.count}
              </p>
              <p className="text-sm text-muted-foreground">
                {bucketStats.innovation.pct}% of features
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                "How do we keep competitive advantage?"
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quarter Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quarter Distribution</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <QuarterCard quarter="NOW" count={quarterStats.now.count} pct={quarterStats.now.pct} />
          <QuarterCard quarter="NEXT" count={quarterStats.next.count} pct={quarterStats.next.pct} />
          <QuarterCard quarter="LATER" count={quarterStats.later.count} pct={quarterStats.later.pct} />
        </div>
      </Card>

      {/* Bucket Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {selectedBucket === 'all' ? 'All Features by Bucket' : `${BUCKET_CONFIG[selectedBucket].label} Features`}
        </h3>
        <BucketFeatureList selectedBucket={selectedBucket} />
      </Card>

      {/* Feature Adoption Matrix - Top Value-Driving Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Feature Adoption by Client</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Top value-driving features and their adoption across key clients
        </p>
        <FeatureAdoptionMatrix />
      </Card>
    </div>
  );
}

// Quarter Card Component
function QuarterCard({ quarter, count, pct }: { quarter: string; count: number; pct: number }) {
  const colors = {
    NOW: 'bg-green-500',
    NEXT: 'bg-blue-500',
    LATER: 'bg-gray-400'
  };
  
  return (
    <div className="p-4 rounded-lg border" data-testid={`card-quarter-${quarter.toLowerCase()}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{quarter}</span>
        <Badge variant="secondary">{count} features</Badge>
      </div>
      <Progress value={pct} className="h-2" />
      <p className="text-sm text-muted-foreground mt-2">{pct}% of roadmap</p>
    </div>
  );
}

// Bucket Feature List Component
function BucketFeatureList({ selectedBucket }: { selectedBucket: Bucket | 'all' }) {
  const features = selectedBucket === 'all' 
    ? masterFeaturesData 
    : masterFeaturesData.filter(f => f.bucket === selectedBucket);

  // Group by bucket if showing all
  const groupedFeatures = selectedBucket === 'all'
    ? {
        'Make': features.filter(f => f.bucket === 'Make'),
        "Don't Lose": features.filter(f => f.bucket === "Don't Lose"),
        'Innovation': features.filter(f => f.bucket === 'Innovation')
      }
    : { [selectedBucket]: features };

  return (
    <div className="space-y-6">
      {Object.entries(groupedFeatures).map(([bucket, bucketFeatures]) => (
        <div key={bucket} className="space-y-2">
          {selectedBucket === 'all' && (
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${BUCKET_CONFIG[bucket as Bucket].bgColor}`} />
              <h4 className={`font-semibold ${BUCKET_CONFIG[bucket as Bucket].textColor}`}>
                {BUCKET_CONFIG[bucket as Bucket].label} ({bucketFeatures.length})
              </h4>
            </div>
          )}
          <div className="space-y-1">
            {bucketFeatures.slice(0, selectedBucket === 'all' ? 5 : 20).map((feature, idx) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-2 rounded-lg hover-elevate"
                data-testid={`row-feature-${feature.id}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-12">{feature.id}</span>
                  <span className="text-sm truncate max-w-md">{feature.name}</span>
                  <Badge variant="outline" className="text-xs">{feature.quarter}</Badge>
                  {feature.prdStatus === 'Complete' && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  {feature.priorityTier === 'Tier 0: Emergency' && (
                    <Badge variant="destructive" className="text-xs">Tier 0</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {feature.prdStatus}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${BUCKET_CONFIG[feature.bucket].bgColor} ${BUCKET_CONFIG[feature.bucket].textColor}`}
                  >
                    {feature.agentType.split(' ')[0]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          {selectedBucket === 'all' && bucketFeatures.length > 5 && (
            <p className="text-xs text-muted-foreground pl-2">
              + {bucketFeatures.length - 5} more features
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Feature Adoption Matrix - Top Value-Driving Features
function FeatureAdoptionMatrix() {
  const clientDistribution = getClientDistribution();

  // Top clients to show
  const topClients = ['All', 'Broadridge', 'DTCC', 'Accenture', 'Regional Banks', 'BetaNXT', 'Altaira', 'Multiple'];
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 font-medium">Client</th>
            <th className="text-center p-2 font-medium">Make Money</th>
            <th className="text-center p-2 font-medium">Don't Lose</th>
            <th className="text-center p-2 font-medium">Innovation</th>
            <th className="text-center p-2 font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {topClients.map((clientName, idx) => {
            const clientData = clientDistribution.find(c => c.client === clientName);
            const makeCount = clientData?.make || 0;
            const dontLoseCount = clientData?.dontLose || 0;
            const innovationCount = clientData?.innovation || 0;
            const total = clientData?.count || 0;
            
            return (
              <tr key={clientName} className="border-b hover:bg-muted/50" data-testid={`row-client-adoption-${idx}`}>
                <td className="p-2 font-medium">{clientName}</td>
                <td className="text-center p-2">
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    {makeCount}
                  </Badge>
                </td>
                <td className="text-center p-2">
                  <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                    {dontLoseCount}
                  </Badge>
                </td>
                <td className="text-center p-2">
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {innovationCount}
                  </Badge>
                </td>
                <td className="text-center p-2 font-semibold">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// ROADMAP DELIVERY VIEW - Visual Progress Tracker
// ============================================================================

interface RoadmapDeliveryViewProps {
  roadmapProgress: ReturnType<typeof getRoadmapProgress>;
  quarterStats: ReturnType<typeof getQuarterStats>;
}

function RoadmapDeliveryView({ roadmapProgress, quarterStats }: RoadmapDeliveryViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Roadmap Delivered vs Plan</h2>
        <p className="text-muted-foreground">
          Visual progress tracker comparing planned vs delivered features
        </p>
      </div>

      {/* Overall Progress */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {roadmapProgress.NOW.complete + roadmapProgress.NEXT.complete + roadmapProgress.LATER.complete}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {roadmapProgress.NOW.inProgress + roadmapProgress.NEXT.inProgress + roadmapProgress.LATER.inProgress}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-muted-foreground">Planned</p>
          </div>
          <p className="text-2xl font-bold">
            {roadmapProgress.NOW.planned + roadmapProgress.NEXT.planned + roadmapProgress.LATER.planned}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-muted-foreground">Blocked</p>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {roadmapProgress.NOW.blocked + roadmapProgress.NEXT.blocked + roadmapProgress.LATER.blocked}
          </p>
        </Card>
      </div>

      {/* Quarter-by-Quarter Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Progress by Quarter</h3>
        <div className="space-y-6">
          {(['NOW', 'NEXT', 'LATER'] as Quarter[]).map((quarter) => {
            const progress = roadmapProgress[quarter];
            const completionPct = progress.total > 0 
              ? Math.round((progress.complete / progress.total) * 100) 
              : 0;
            const inProgressPct = progress.total > 0 
              ? Math.round((progress.inProgress / progress.total) * 100) 
              : 0;
            
            return (
              <div key={quarter} className="space-y-2" data-testid={`progress-quarter-${quarter.toLowerCase()}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{quarter}</span>
                    <span className="text-sm text-muted-foreground">
                      {progress.total} features
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      {progress.complete} complete
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {progress.inProgress} in progress
                    </span>
                    <span className="text-muted-foreground">
                      {progress.planned} planned
                    </span>
                    {progress.blocked > 0 && (
                      <span className="text-red-600 dark:text-red-400">
                        {progress.blocked} blocked
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${completionPct}%` }}
                  />
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${inProgressPct}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{completionPct}% complete</span>
                  <span>{inProgressPct}% in progress</span>
                  <span>{100 - completionPct - inProgressPct}% remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Time-to-Value Metrics - Implementation Velocity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Time-to-First-Value Metrics</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Implementation time trend and client onboarding velocity
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Avg Implementation Time</p>
            <p className="text-2xl font-bold">6.2 weeks</p>
            <p className="text-xs text-green-600 dark:text-green-400">-12% vs last quarter</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Client Onboarding Velocity</p>
            <p className="text-2xl font-bold">4.5 weeks</p>
            <p className="text-xs text-green-600 dark:text-green-400">-8% vs last quarter</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Avg Days to Production</p>
            <p className="text-2xl font-bold">31 days</p>
            <p className="text-xs text-muted-foreground">From POC start</p>
          </div>
        </div>
      </Card>

      {/* Security Milestones - Enterprise Readiness */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Enterprise Readiness & Security Milestones</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Security vulnerability remediation and compliance status
        </p>
        <div className="space-y-4">
          <SecurityProgressBar label="Critical Vulnerabilities" resolved={3} total={3} />
          <SecurityProgressBar label="High Vulnerabilities" resolved={8} total={13} />
          <SecurityProgressBar label="SC-299 Security Tracker" resolved={3} total={13} />
          <SecurityProgressBar label="SOC 2 Compliance" resolved={12} total={15} />
        </div>
      </Card>

      {/* SLA Attainment - Support Quality */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Support Volume & SLA Attainment</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Support ticket trends and SLA compliance
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">98.5%</p>
            <p className="text-sm text-muted-foreground">SLA Attainment</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Active Tickets</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">4.2h</p>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">1.8 days</p>
            <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SecurityProgressBar({ label, resolved, total }: { label: string; resolved: number; total: number }) {
  const pct = Math.round((resolved / total) * 100);
  const isComplete = resolved === total;
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-mono ${isComplete ? 'text-green-600 dark:text-green-400' : ''}`}>
          {resolved}/{total} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// REVENUE GROWTH VIEW
// ============================================================================

interface RevenueGrowthViewProps {
  metrics: RevenueMetrics;
  salesOpportunities: any[];
}

function RevenueGrowthView({ metrics, salesOpportunities }: RevenueGrowthViewProps) {
  type ClientRevenueData = { clientName: string; totalARR: number; opportunities: number };
  
  // Group sales opportunities by client (Account_Name)
  const clientRevenue = salesOpportunities
    .reduce((acc, opp) => {
      const client = opp.Account_Name || "Unknown Client";
      if (!acc[client]) {
        acc[client] = {
          clientName: client,
          totalARR: 0,
          opportunities: 0
        };
      }
      acc[client].totalARR += opp.ARR_Value || 0;
      acc[client].opportunities += 1;
      return acc;
    }, {} as Record<string, ClientRevenueData>);

  // Convert to sorted array by ARR (descending)
  const topClients = (Object.values(clientRevenue) as ClientRevenueData[])
    .sort((a, b) => b.totalARR - a.totalARR)
    .slice(0, 10);

  // Get Make Money bucket features for revenue focus
  const makeMoneyFeatures = masterFeaturesData
    .filter(f => f.bucket === 'Make' && f.arr_value)
    .sort((a, b) => (b.arr_value || 0) - (a.arr_value || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Revenue Growth & Client Acquisition</h2>
        <p className="text-muted-foreground">
          How We Make Money - ARR Pipeline, Conversion Metrics, and Top Revenue Drivers
        </p>
      </div>

      {/* Key Revenue Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total ARR Pipeline</p>
          <p className="text-2xl font-bold">
            ${(metrics.totalARR / 1000000).toFixed(2)}M
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">New Clients</p>
          <p className="text-2xl font-bold">{metrics.newClients}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Deal Size</p>
          <p className="text-2xl font-bold">
            ${(metrics.avgDealSize / 1000).toFixed(0)}K
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold">{metrics.conversionRate.toFixed(1)}%</p>
        </Card>
      </div>

      {/* Make Money Features */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <h3 className="text-lg font-semibold">Make Money Features with ARR Impact</h3>
        </div>
        <div className="space-y-2">
          {makeMoneyFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate"
              data-testid={`row-make-feature-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">
                  {feature.id}
                </span>
                <span className="font-medium">{feature.name}</span>
                <Badge variant="outline">{feature.quarter}</Badge>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  {feature.primaryClient}
                </Badge>
              </div>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                ${((feature.arr_value || 0) / 1000).toFixed(0)}K ARR
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Revenue-Driving Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Revenue Drivers (From Pipeline)</h3>
        <div className="space-y-2">
          {metrics.topFeatures.map((feature, idx) => (
            <div
              key={feature.featureId}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate"
              data-testid={`row-revenue-feature-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">
                  #{idx + 1}
                </span>
                <span className="font-medium">{feature.featureName}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Tier {feature.tier}
                </span>
              </div>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                ${(feature.arrImpact / 1000).toFixed(0)}K ARR
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Clients by ARR */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Clients by ARR Pipeline</h3>
        <div className="space-y-2">
          {topClients.map((client, idx) => (
            <div
              key={client.clientName}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate"
              data-testid={`row-client-revenue-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">
                  #{idx + 1}
                </span>
                <span className="font-medium">{client.clientName}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  {client.opportunities} opp{client.opportunities !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="font-mono font-bold text-green-600 dark:text-green-400">
                ${(client.totalARR / 1000).toFixed(0)}K ARR
              </span>
            </div>
          ))}
          {topClients.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No client data available
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// OPERATIONAL EXCELLENCE VIEW
// ============================================================================

interface OperationalExcellenceViewProps {
  metrics: OperationsMetrics;
  features: any[];
  tickets: any[];
}

function OperationalExcellenceView({ metrics, features, tickets }: OperationalExcellenceViewProps) {
  // Get Sprint 2 progress data
  const sprintProgress = getSprintProgress();
  const lastUpdated = formatDataTimestamp();
  
  // Get Don't Lose Money bucket features
  const dontLoseFeatures = masterFeaturesData
    .filter(f => f.bucket === "Don't Lose")
    .sort((a, b) => (b.arr_at_risk || 0) - (a.arr_at_risk || 0));

  // Helper to get tickets for a specific feature
  const getTicketsForFeature = (featureId: string) => {
    return tickets.filter(ticket => {
      const mappedFeatureId = ticket.Mapped_Feature_ID || "";
      if (!mappedFeatureId || mappedFeatureId === "0" || mappedFeatureId.toLowerCase() === "null" || mappedFeatureId.toLowerCase() === "n/a") {
        return false;
      }
      const featureIds = mappedFeatureId.split(',').map((id: string) => id.trim());
      return featureIds.includes(featureId);
    });
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-amber-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthBadgeClass = (health: string) => {
    switch (health) {
      case 'GREEN': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'YELLOW': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'RED': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold">Operational Excellence & Risk Management</h2>
          <p className="text-muted-foreground">
            How We Don't Lose Money - Sprint Health, Security Progress, and Risk Mitigation
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      {/* Dec 23 vs Dec 29 Comparison */}
      <Card className="p-6" data-testid="card-comparison">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Sprint Progress: Dec 23 vs Dec 29</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-lg border text-center">
            <p className="text-sm text-muted-foreground">Done</p>
            <p className="text-xl font-bold">
              {SPRINT_2_DATA.comparison.baseline.done} → {SPRINT_2_DATA.comparison.current.done}
            </p>
            <p className="text-xs text-green-600 font-medium">{SPRINT_2_DATA.comparison.delta.done}</p>
          </div>
          <div className="p-4 rounded-lg border text-center">
            <p className="text-sm text-muted-foreground">Completion</p>
            <p className="text-xl font-bold">
              {SPRINT_2_DATA.comparison.baseline.donePercent}% → {SPRINT_2_DATA.comparison.current.donePercent}%
            </p>
            <p className="text-xs text-green-600 font-medium">{SPRINT_2_DATA.comparison.delta.donePercent}</p>
          </div>
          <div className="p-4 rounded-lg border text-center">
            <p className="text-sm text-muted-foreground">Code Review</p>
            <p className="text-xl font-bold">
              {SPRINT_2_DATA.comparison.baseline.codeReview} → {SPRINT_2_DATA.comparison.current.codeReview}
            </p>
            <p className="text-xs text-green-600 font-medium">{SPRINT_2_DATA.comparison.delta.codeReview}</p>
          </div>
          <div className="p-4 rounded-lg border text-center">
            <p className="text-sm text-muted-foreground">Blocked</p>
            <p className="text-xl font-bold">
              {SPRINT_2_DATA.comparison.baseline.blocked} → {SPRINT_2_DATA.comparison.current.blocked}
            </p>
            <p className="text-xs text-red-600 font-medium">{SPRINT_2_DATA.comparison.delta.blocked}</p>
          </div>
        </div>
      </Card>

      {/* Sprint 2 Health Overview */}
      <Card className="p-6" data-testid="card-sprint-health">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">{SPRINT_2_DATA.sprint.displayName}</h3>
              <p className="text-xs text-muted-foreground">
                Day {sprintProgress.daysElapsed} of 14 | {sprintProgress.daysRemaining} days remaining | {SPRINT_2_DATA.sprint.capacity} capacity
              </p>
            </div>
          </div>
          <Badge className={getHealthBadgeClass(SPRINT_2_DATA.sprint.health)} data-testid="badge-sprint-health">
            {SPRINT_2_DATA.sprint.health}
          </Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-5 mb-6">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 text-center" data-testid="sprint-done">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {SPRINT_2_DATA.statusBreakdown.done.count}
            </p>
            <p className="text-sm text-muted-foreground">Done ({SPRINT_2_DATA.statusBreakdown.done.percent}%)</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-center" data-testid="sprint-code-review">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {SPRINT_2_DATA.statusBreakdown.codeReview.count}
            </p>
            <p className="text-sm text-muted-foreground">Code Review</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 text-center" data-testid="sprint-in-progress">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {SPRINT_2_DATA.statusBreakdown.inProgress.count}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/10 text-center" data-testid="sprint-to-do">
            <p className="text-2xl font-bold">
              {SPRINT_2_DATA.statusBreakdown.toDo.count}
            </p>
            <p className="text-sm text-muted-foreground">To Do</p>
          </div>
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 text-center" data-testid="sprint-blocked">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {SPRINT_2_DATA.statusBreakdown.blocked.count}
            </p>
            <p className="text-sm text-muted-foreground">Blocked</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Total Tickets</p>
            <p className="text-xl font-bold">{SPRINT_2_DATA.sprint.totalTickets}</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Story Points Remaining</p>
            <p className="text-xl font-bold">{SPRINT_2_DATA.storyPoints.remaining}</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <p className="text-xl font-bold">{sprintProgress.percentComplete}%</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground">Points Completed</p>
            <p className="text-xl font-bold">{SPRINT_2_DATA.storyPoints.completed} pts</p>
          </div>
        </div>
      </Card>

      {/* Sprint Close Readiness */}
      <SprintCloseReadiness />

      {/* Wave 2 Security Progress */}
      <Card className="p-6" data-testid="card-security-progress">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold">Wave 2 Security Progress</h3>
          </div>
          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
            {SPRINT_2_DATA.security.completionRate}% Complete
          </Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10" data-testid="security-resolved">
            <p className="text-sm text-muted-foreground">Done</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {SPRINT_2_DATA.security.done}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10" data-testid="security-remaining">
            <p className="text-sm text-muted-foreground">To Do</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {SPRINT_2_DATA.security.toDo}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10" data-testid="security-total">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {SPRINT_2_DATA.security.total}
            </p>
          </div>
          <div className="p-4 rounded-lg border" data-testid="security-lead">
            <p className="text-sm text-muted-foreground">Lead</p>
            <p className="text-lg font-bold">{SPRINT_2_DATA.security.lead}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{SPRINT_2_DATA.security.waveStatus}</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {SPRINT_2_DATA.security.done}/{SPRINT_2_DATA.security.total} complete
            </span>
          </div>
          <Progress value={SPRINT_2_DATA.security.completionRate} className="h-3" />
        </div>
      </Card>

      {/* Sprint Risks & Wins */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6" data-testid="card-sprint-risks">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold">Sprint Risks</h3>
          </div>
          <div className="space-y-2">
            {SPRINT_2_DATA.risks.map((risk, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                <span className={`mt-0.5 w-2 h-2 rounded-full ${getRiskColor(risk.severity)}`} />
                <div>
                  <p className="text-sm font-medium">{risk.item}</p>
                  <p className="text-xs text-muted-foreground">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6" data-testid="card-sprint-wins">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Sprint Wins</h3>
          </div>
          <div className="space-y-2">
            {SPRINT_2_DATA.wins.map((win, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/10">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{win.title}</p>
                  <p className="text-xs text-muted-foreground">{win.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Key Operations Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Unassigned Tickets</p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {SPRINT_2_DATA.unassignedAlert.count}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Blocked Tickets</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{SPRINT_2_DATA.statusBreakdown.blocked.count}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">System Uptime</p>
          <p className="text-2xl font-bold">{metrics.uptime}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">MTTR</p>
          <p className="text-2xl font-bold">{metrics.mttr}h</p>
        </Card>
      </div>

      {/* Don't Lose Money Features */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <h3 className="text-lg font-semibold">Don't Lose Money Features ({dontLoseFeatures.length})</h3>
        </div>
        <div className="space-y-2">
          {dontLoseFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              className={`flex items-center justify-between p-3 rounded-lg hover-elevate ${feature.priorityTier === 'Tier 0: Emergency' ? 'border-l-4 border-red-500' : ''}`}
              data-testid={`row-dontlose-feature-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">{feature.id}</span>
                <span className="font-medium">{feature.name}</span>
                <Badge variant="outline">{feature.quarter}</Badge>
                {feature.priorityTier === 'Tier 0: Emergency' && (
                  <Badge variant="destructive">Tier 0</Badge>
                )}
                {feature.prdStatus && (
                  <Badge variant="secondary">{feature.prdStatus}</Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                {feature.arr_at_risk && (
                  <span className="font-mono font-bold text-red-600 dark:text-red-400">
                    ${(feature.arr_at_risk / 1000).toFixed(0)}K at risk
                  </span>
                )}
                <Badge variant="outline" className="text-xs">
                  {feature.agentType.split(' ')[0]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Critical Features with Linked Tickets */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Critical Issues (Tier 0) - Features & Linked Tickets
        </h3>
        <div className="space-y-4">
          {metrics.criticalFeatures.map((feature, idx) => {
            const linkedTickets = getTicketsForFeature(feature.featureId);
            return (
              <div
                key={feature.featureId}
                className="overflow-hidden relative rounded-lg border"
                data-testid={`card-critical-feature-${idx}`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                
                {/* Feature Header */}
                <div className="flex items-center justify-between p-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                      Tier 0
                    </span>
                    <span className="font-medium">{feature.featureName}</span>
                    <span className="text-xs text-muted-foreground">
                      ({feature.featureId})
                    </span>
                  </div>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    ${(feature.arrImpact / 1000).toFixed(0)}K at risk
                  </span>
                </div>

                {/* Linked Tickets */}
                {linkedTickets.length > 0 ? (
                  <div className="px-4 py-3 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Linked JIRA Tickets ({linkedTickets.length})
                    </p>
                    <div className="space-y-1">
                      {linkedTickets.map((ticket, ticketIdx) => (
                        <div
                          key={ticket.Ticket_ID}
                          className="flex items-center justify-between text-sm p-2 rounded hover-elevate"
                          data-testid={`ticket-${feature.featureId}-${ticketIdx}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {ticket.Ticket_ID}
                            </span>
                            <span className="truncate max-w-md">
                              {ticket.Ticket_Summary || "No summary"}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-background">
                            {ticket.Status || "Unknown"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3">
                    <p className="text-sm text-muted-foreground italic">
                      No JIRA tickets linked to this feature
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {metrics.criticalFeatures.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No Tier 0 critical features found
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// INNOVATION VIEW
// ============================================================================

interface InnovationViewProps {
  metrics: InnovationMetrics;
}

function InnovationView({ metrics }: InnovationViewProps) {
  // Get Innovation bucket features
  const innovationFeatures = masterFeaturesData
    .filter(f => f.bucket === 'Innovation')
    .sort((a, b) => {
      // Sort by status (In Progress first) then by quarter
      if (a.prdStatus === 'In Progress' && b.prdStatus !== 'In Progress') return -1;
      if (b.prdStatus === 'In Progress' && a.prdStatus !== 'In Progress') return 1;
      // Sort by quarter: NOW, NEXT, LATER
      const quarterOrder = { 'NOW': 0, 'NEXT': 1, 'LATER': 2 };
      return quarterOrder[a.quarter] - quarterOrder[b.quarter];
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Innovation & Competitive Advantage</h2>
        <p className="text-muted-foreground">
          How We Keep Our Competitive Advantage - Strategic R&D, Platform Progress
        </p>
      </div>

      {/* Key Innovation Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Artemis Progress</p>
          <p className="text-2xl font-bold">{metrics.platformProgress}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Engineering Investment</p>
          <p className="text-2xl font-bold">{metrics.artemisPercentage}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">R&D Capacity</p>
          <p className="text-2xl font-bold">{metrics.engineeringWeeks}w</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Innovation Features</p>
          <p className="text-2xl font-bold">{innovationFeatures.length}</p>
        </Card>
      </div>

      {/* Innovation Features */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <h3 className="text-lg font-semibold">Innovation Features ({innovationFeatures.length})</h3>
        </div>
        <div className="space-y-2">
          {innovationFeatures.map((feature, idx) => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate"
              data-testid={`row-innovation-feature-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">{feature.id}</span>
                <span className="font-medium">{feature.name}</span>
                <Badge variant="outline">{feature.quarter}</Badge>
                {feature.artemis && (
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                    Artemis
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{feature.agentType.split(' ')[0]}</Badge>
                <Badge variant="outline" className="text-xs">
                  {feature.prdStatus}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Competitive Advantages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Competitive Differentiators</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {metrics.competitiveAdvantages.map((advantage, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10"
              data-testid={`card-advantage-${idx}`}
            >
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium">{advantage}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Strategic Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Strategic Features in Development</h3>
        <div className="space-y-2">
          {metrics.strategicFeatures.map((feature, idx) => (
            <div
              key={feature.featureId}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate"
              data-testid={`row-strategic-feature-${idx}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">{feature.featureName}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  {feature.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400"
                    style={{ width: `${feature.completion}%` }}
                  />
                </div>
                <span className="font-mono text-sm">{feature.completion}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface MetricRowProps {
  label: string;
  value: string;
  alert?: boolean;
}

function MetricRow({ label, value, alert }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`font-mono font-semibold ${
          alert ? "text-orange-600 dark:text-orange-400" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
