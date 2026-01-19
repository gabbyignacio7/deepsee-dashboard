import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { useDashboard } from '@/components/dashboard-context';
import { formatCurrency } from '@/lib/utils';
import { getUniqueClients } from '@/lib/client-utils';
import ClientFilter from '@/components/ClientFilter';
import SortableColumnHeader from '@/components/SortableColumnHeader';
import MetricTooltip from '@/components/MetricTooltip';
import DataFreshness from '@/components/DataFreshness';
import { useSortableTable, comparators } from '@/hooks/useSortableTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users, DollarSign } from 'lucide-react';
import { pipelineMetrics, pipelineComparison } from '@/data/pipelineData';
import { stageFunnel, overallConversionRate, avgSalesCycle } from '@/data/stageFunnelData';
import { topDeals, topDealsSummary } from '@/data/topDealsData';
import { engineeringDeals, engineeringSummary } from '@/data/engineeringAlignmentData';
import { segments } from '@/data/segmentData';

export default function SalesDashboard() {
  const { features, salesOpportunities, loading, error, allFeatures, selectedClients, setSelectedClients } = useDashboard();
  const [, setLocation] = useLocation();

  const availableClients = useMemo(() => getUniqueClients(allFeatures), [allFeatures]);

  const featureDealMappingBase = useMemo(() => {
    return features.map(f => {
      const relatedDeals = salesOpportunities.filter(o =>
        o.Mapped_Feature_ID && o.Mapped_Feature_ID.includes(f.Feature_ID)
      );
      const totalValue = relatedDeals.reduce((sum, d) => sum + d.ARR_Value, 0);
      return { ...f, relatedDeals, totalValue };
    }).filter(f => f.relatedDeals.length > 0);
  }, [features, salesOpportunities]);

  const { sortedData: sortedFeatureDealMapping, sortConfig, handleSort } = useSortableTable(
    featureDealMappingBase,
    [
      { key: 'Feature_Name', comparator: comparators.string },
      { key: 'Priority_Tier', comparator: comparators.tier },
      { key: 'totalValue', comparator: comparators.number },
      { key: 'Current_Status', comparator: comparators.string },
    ]
  );

  const featureDealMapping = useMemo(() => {
    return sortedFeatureDealMapping.slice(0, 20);
  }, [sortedFeatureDealMapping]);

  // Format stage funnel data for chart
  const funnelChartData = useMemo(() => {
    return stageFunnel.map(stage => ({
      name: stage.name.length > 18 ? stage.name.substring(0, 16) + '...' : stage.name,
      fullName: stage.name,
      raw: stage.dealARR,
      weighted: stage.weightedValue,
      probability: stage.probability,
      color: stage.color
    }));
  }, []);

  // Format segment data for pie chart
  const segmentChartData = useMemo(() => {
    return segments.map(seg => ({
      name: seg.name,
      value: seg.totalARR,
      color: seg.color
    }));
  }, []);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'P0': return 'bg-red-100 text-red-800 border-red-300';
      case 'P1': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'BLOCKED': return 'text-red-600 font-semibold';
      case 'In Progress': return 'text-blue-600';
      case 'TO DO': return 'text-gray-600';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-sales">Sales Pipeline Dashboard</h1>
          <p className="text-gray-600 mt-1">Revenue forecast and deal-feature mapping</p>
        </div>
        <DataFreshness />
      </div>

      {/* Pipeline Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <DollarSign className="w-4 h-4" />
            Total Pipeline
          </div>
          <div className="text-2xl font-bold text-gray-800">{formatCurrency(pipelineMetrics.total)}</div>
          <div className="text-xs text-green-600">+{formatCurrency(pipelineComparison.change.total)} (+{pipelineComparison.change.totalPct}%)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <TrendingUp className="w-4 h-4" />
            <MetricTooltip type="WEIGHTED_ARR">Weighted Pipeline</MetricTooltip>
          </div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(pipelineMetrics.weighted)}</div>
          <div className="text-xs text-green-600">+{formatCurrency(pipelineComparison.change.weighted)} (+{pipelineComparison.change.weightedPct}%)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            Active Deals
          </div>
          <div className="text-2xl font-bold text-gray-800">{pipelineMetrics.dealCount}</div>
          <div className="text-xs text-green-600">+{pipelineComparison.change.dealCount} from Jan 11</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Q1 2026 Closing</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(pipelineMetrics.q1Closing)}</div>
          <div className="text-xs text-gray-400">Weighted value</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Existing Customer ARR</div>
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(pipelineMetrics.existingCustomerARR)}</div>
          <div className="text-xs text-gray-400">6 customers</div>
        </div>
      </div>

      <ClientFilter
        availableClients={availableClients}
        selectedClients={selectedClients}
        onChange={setSelectedClients}
      />

      {/* Stage Funnel + Segment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pipeline by Stage</h2>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Conversion: <strong>{overallConversionRate}%</strong></span>
              <span>Avg Cycle: <strong>{avgSalesCycle} days</strong></span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number, name: string) => [formatCurrency(value), name === 'raw' ? 'Total ARR' : 'Weighted']}
              />
              <Legend />
              <Bar dataKey="raw" name="Total ARR" fill="#93C5FD" />
              <Bar dataKey="weighted" name="Weighted" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pipeline by Segment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentChartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {segmentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Deals Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Top Deals by ARR</h2>
          <div className="flex gap-3 text-sm">
            <span className="text-gray-500">At Risk: <strong className="text-red-600">{topDealsSummary.atRiskCount} deals ({formatCurrency(topDealsSummary.atRiskARR)})</strong></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2 w-8">#</th>
                <th className="pb-2">Company</th>
                <th className="pb-2">Stage</th>
                <th className="pb-2 text-right">ARR</th>
                <th className="pb-2 text-center">Prob</th>
                <th className="pb-2 text-right">Weighted</th>
                <th className="pb-2 text-center">Days</th>
                <th className="pb-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {topDeals.map(deal => (
                <tr key={deal.company} className={`border-b border-gray-100 ${deal.atRisk ? 'bg-red-50' : ''}`}>
                  <td className="py-2 text-gray-400">{deal.rank}</td>
                  <td className="py-2 font-medium">{deal.company}</td>
                  <td className="py-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{deal.stage}</span>
                  </td>
                  <td className="py-2 text-right font-semibold">{formatCurrency(deal.arr)}</td>
                  <td className="py-2 text-center">{deal.probability}%</td>
                  <td className="py-2 text-right text-gray-600">{formatCurrency(deal.weighted)}</td>
                  <td className={`py-2 text-center ${deal.daysInStage > 300 ? 'text-red-600 font-semibold' : ''}`}>
                    {deal.daysInStage}
                  </td>
                  <td className="py-2">
                    {deal.atRisk && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">At Risk</span>
                    )}
                    {deal.q1Close && !deal.atRisk && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Q1 Close</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineering Alignment Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Engineering Alignment - Deals Needing Support
          </h2>
          <div className="flex gap-3 text-xs">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded">P0: {engineeringSummary.p0Count} ({formatCurrency(engineeringSummary.p0ARR)})</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">P1: {engineeringSummary.p1Count} ({formatCurrency(engineeringSummary.p1ARR)})</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">P2: {engineeringSummary.p2Count} ({formatCurrency(engineeringSummary.p2ARR)})</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2">Company</th>
                <th className="pb-2 text-right">ARR</th>
                <th className="pb-2">Engineering Need</th>
                <th className="pb-2">JIRA</th>
                <th className="pb-2 text-center">Priority</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {engineeringDeals.map(deal => (
                <tr key={deal.company} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 font-medium">{deal.company}</td>
                  <td className="py-2 text-right">{formatCurrency(deal.arr)}</td>
                  <td className="py-2 text-gray-600 text-xs">{deal.needDescription}</td>
                  <td className="py-2">
                    {deal.jiraUrl ? (
                      <a href={deal.jiraUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {deal.jiraTicket}
                      </a>
                    ) : (
                      <span className="text-gray-400">{deal.jiraTicket}</span>
                    )}
                  </td>
                  <td className="py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(deal.priority)}`}>
                      {deal.priority}
                    </span>
                  </td>
                  <td className={`py-2 text-xs ${getStatusColor(deal.status)}`}>{deal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
          Total ARR with Engineering Dependencies: <strong>{formatCurrency(engineeringSummary.totalARR)}</strong>
        </div>
      </div>

      {/* Feature-to-Deal Mapping */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Feature-to-Deal Mapping</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableColumnHeader label="Feature" sortKey="Feature_Name" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader label="Priority Tier" sortKey="Priority_Tier" sortConfig={sortConfig} onSort={handleSort} />
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required For Deals</th>
                <SortableColumnHeader label="Total Deal Value" sortKey="totalValue" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader label="Status" sortKey="Current_Status" sortConfig={sortConfig} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featureDealMapping.map((item) => (
                <tr
                  key={item.Feature_ID}
                  onClick={() => setLocation(`/feature/${item.Feature_ID}`)}
                  className="hover:bg-gray-50 cursor-pointer"
                  data-testid={`row-feature-${item.Feature_ID}`}
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Feature_Name}</td>
                  <td className="px-4 py-3 text-sm">{item.Priority_Tier}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {item.relatedDeals.map(d => d.Opportunity_Name).join(', ')}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{formatCurrency(item.totalValue)}</td>
                  <td className="px-4 py-3 text-sm">{item.Current_Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
