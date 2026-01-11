import { useState } from 'react';
import {
  mondaySalesPipelineData,
  q1_2026_deals,
  formatCurrency,
  getPipelineHealthScore,
  type Deal,
  type RiskLevel
} from '@/data/mondaySalesPipelineData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, TrendingUp, Users, DollarSign, AlertTriangle, Wrench, Building2 } from 'lucide-react';

const SalesPipelineSection = () => {
  const data = mondaySalesPipelineData;
  const healthScore = getPipelineHealthScore();

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'green': return { icon: '🟢', variant: 'default' as const, className: 'bg-green-100 text-green-800 hover:bg-green-100' };
      case 'yellow': return { icon: '🟡', variant: 'default' as const, className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' };
      case 'red': return { icon: '🔴', variant: 'destructive' as const, className: 'bg-red-100 text-red-800 hover:bg-red-100' };
    }
  };

  const getHealthBadge = () => {
    switch (healthScore) {
      case 'healthy': return { icon: '✅', label: 'Healthy', className: 'bg-green-100 text-green-800' };
      case 'attention': return { icon: '⚠️', label: 'Attention', className: 'bg-yellow-100 text-yellow-800' };
      case 'critical': return { icon: '🚨', label: 'Critical', className: 'bg-red-100 text-red-800' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'P0': return 'bg-red-100 text-red-800 border-red-300';
      case 'P1': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'P2': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const health = getHealthBadge();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Sales Pipeline (Monday.com)
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Updated {new Date(data.overview.asOf).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={health.className}>
            {health.icon} {health.label}
          </Badge>
          <a
            href="https://deepsee.monday.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            View CRM <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{formatCurrency(data.overview.totalPipeline)}</div>
            <div className="text-xs text-blue-600 mt-1">Total Pipeline</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{formatCurrency(data.overview.weightedPipeline)}</div>
            <div className="text-xs text-green-600 mt-1">Weighted</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{data.overview.activeDeals}</div>
            <div className="text-xs text-purple-600 mt-1">Active Deals</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">{formatCurrency(data.overview.closingQ1_2026)}</div>
            <div className="text-xs text-orange-600 mt-1">Q1 2026</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-700">{formatCurrency(data.overview.existingCustomerArr)}</div>
            <div className="text-xs text-teal-600 mt-1">Existing ARR</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="q1" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" /> Q1 Closing
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" /> Engineering
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" /> Customers
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stage Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pipeline Stages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.stageDistribution.map(stage => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <div className="w-40 text-xs text-gray-600 truncate" title={stage.stage}>
                    {stage.stage.split('/')[0]}
                  </div>
                  <div className="flex-1 relative">
                    <Progress
                      value={(stage.totalArr / data.overview.totalPipeline) * 100}
                      className="h-5"
                    />
                    <span className="absolute right-2 top-0.5 text-xs text-gray-700">
                      {stage.count} deals
                    </span>
                  </div>
                  <div className="w-20 text-right text-sm font-mono">
                    {formatCurrency(stage.totalArr)}
                  </div>
                  <div className="w-12 text-right text-xs text-gray-500">
                    {stage.probability}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Deals Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top 10 Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">#</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">ARR</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="text-center">Prob</TableHead>
                    <TableHead className="text-center">Close</TableHead>
                    <TableHead className="text-center">Eng</TableHead>
                    <TableHead className="text-center">Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.topDeals.map((deal, idx) => {
                    const risk = getRiskBadge(deal.riskLevel);
                    return (
                      <TableRow key={`${deal.client}-${idx}`}>
                        <TableCell className="text-gray-500">{idx + 1}</TableCell>
                        <TableCell className="font-medium">
                          {deal.client}
                          {deal.dealName && <span className="text-gray-400 text-xs ml-1">- {deal.dealName}</span>}
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(deal.arr)}</TableCell>
                        <TableCell className="text-xs text-gray-600 max-w-32 truncate">{deal.stage.split('/')[0]}</TableCell>
                        <TableCell className="text-center">{deal.probability}%</TableCell>
                        <TableCell className="text-center text-xs">
                          {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          {deal.engineeringRequired ? <Wrench className="h-4 w-4 text-orange-500 mx-auto" /> : '—'}
                        </TableCell>
                        <TableCell className="text-center">{risk.icon}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Segment Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">By Segment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.bySegment.map(seg => (
                  <div key={seg.segment} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{seg.segment}</span>
                    <div className="text-right">
                      <span className="font-mono text-sm">{formatCurrency(seg.arr)}</span>
                      <span className="text-xs text-gray-500 ml-2">({seg.count} deals)</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">By Agent Family</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.byAgentFamily.map(fam => (
                  <div key={fam.family} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{fam.family}</span>
                    <span className="font-mono text-sm">{formatCurrency(fam.arr)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* At-Risk Alert */}
          {data.atRiskDeals.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> At-Risk Deals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.atRiskDeals.map((deal, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-red-700">
                      <strong>{deal.client}</strong> - {deal.issue}
                    </span>
                    <span className="font-mono text-red-600">{formatCurrency(deal.arr)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Q1 Closing Tab */}
        <TabsContent value="q1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Q1 2026 Closing Deals</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {formatCurrency(data.overview.closingQ1_2026)} ({q1_2026_deals.length} deals)
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">ARR</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="text-center">Prob</TableHead>
                    <TableHead className="text-center">Close Date</TableHead>
                    <TableHead className="text-center">Eng</TableHead>
                    <TableHead className="text-center">Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {q1_2026_deals.map((deal, idx) => {
                    const risk = getRiskBadge(deal.riskLevel);
                    return (
                      <TableRow key={`${deal.client}-${idx}`}>
                        <TableCell className="font-medium">
                          {deal.client}
                          {deal.dealName && <span className="text-gray-400 text-xs ml-1">- {deal.dealName}</span>}
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(deal.arr)}</TableCell>
                        <TableCell className="text-xs text-gray-600">{deal.stage.split(' ')[0]}</TableCell>
                        <TableCell className="text-center">{deal.probability}%</TableCell>
                        <TableCell className="text-center text-xs">
                          {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          {deal.engineeringRequired ? <Wrench className="h-4 w-4 text-orange-500 mx-auto" /> : '—'}
                        </TableCell>
                        <TableCell className="text-center">{risk.icon}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engineering Needs Tab */}
        <TabsContent value="engineering">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-500" /> Engineering Needs
                </CardTitle>
                <Badge className="bg-orange-100 text-orange-800">
                  {data.engineeringNeeds.length} deals ({formatCurrency(data.engineeringNeeds.reduce((sum, n) => sum + n.dealArr, 0))})
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.engineeringNeeds.map((need, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${getPriorityBadge(need.priority)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{need.client}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityBadge(need.priority)}>
                        {need.priority}
                      </Badge>
                      <span className="font-mono text-sm">{formatCurrency(need.dealArr)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{need.need}</p>
                  {need.jiraEpic && (
                    <a
                      href={`https://deepsee.atlassian.net/browse/${need.jiraEpic}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      {need.jiraEpic} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-teal-500" /> Existing Customers
                </CardTitle>
                <Badge className="bg-teal-100 text-teal-800">
                  {formatCurrency(data.overview.existingCustomerArr)} ARR
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">ARR</TableHead>
                    <TableHead className="text-right">3-Year TCV</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.existingCustomers.map((customer, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{customer.client}</TableCell>
                      <TableCell className="text-right font-mono">{formatCurrency(customer.arr)}</TableCell>
                      <TableCell className="text-right font-mono text-gray-600">{formatCurrency(customer.tcv3yr)}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-800">
                          {customer.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPipelineSection;
