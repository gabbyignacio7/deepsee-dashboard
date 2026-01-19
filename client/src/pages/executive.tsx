import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { useDashboard } from '@/components/dashboard-context';
import { formatCurrency, getTierBgColor, getTierTextColor, getStatusColor, exportToCSV } from '@/lib/utils';
import { getUniqueClients } from '@/lib/client-utils';
import KPICard from '@/components/KPICard';
import SortableColumnHeader from '@/components/SortableColumnHeader';
import ConfidenceBadge from '@/components/ConfidenceBadge';
import ClientFilter from '@/components/ClientFilter';
import MetricTooltip from '@/components/MetricTooltip';
import DataFreshness from '@/components/DataFreshness';
import SprintOverview from '@/components/SprintOverview';
import BlockedItemsAlert from '@/components/BlockedItemsAlert';
import SprintHealthScorecard from '@/components/SprintHealthScorecard';
import { useSortableTable, comparators } from '@/hooks/useSortableTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, DollarSign, BarChart2, Settings, Target, AlertTriangle, Rocket, Shield } from 'lucide-react';
import { masterFeaturesData, getBucketStats, BUCKET_CONFIG, type Bucket } from '@/data/masterFeaturesData';
import { Badge } from '@/components/ui/badge';

export default function ExecutiveDashboard() {
  const { features, salesOpportunities, allFeatures, selectedClients, setSelectedClients, loading, error } = useDashboard();
  const [, setLocation] = useLocation();
  const [filterQuarter, setFilterQuarter] = useState<string>('All');
  const [filterTier, setFilterTier] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterBucket, setFilterBucket] = useState<string>('All');
  
  // Get bucket statistics from master features data
  const bucketStats = useMemo(() => getBucketStats(), []);
  
  // Get unique clients for filter dropdown
  const availableClients = useMemo(() => getUniqueClients(allFeatures), [allFeatures]);

  const filteredFeatures = useMemo(() => {
    return features.filter(f => {
      if (filterQuarter !== 'All' && f.Quarter_Planned !== filterQuarter) return false;
      if (filterTier !== 'All' && !f.Priority_Tier.includes(filterTier)) return false;
      if (filterStatus !== 'All' && f.Current_Status !== filterStatus) return false;
      return true;
    });
  }, [features, filterQuarter, filterTier, filterStatus]);

  const kpis = useMemo(() => {
    const totalPipeline = salesOpportunities.reduce((sum, opp) => sum + opp.ARR_Value, 0);
    const totalWeighted = salesOpportunities.reduce((sum, opp) => sum + opp.Weighted_ARR, 0);
    const totalEffort = filteredFeatures.reduce((sum, f) => sum + f.Effort_Estimate_Weeks, 0);
    const tierCounts = {
      tier0: filteredFeatures.filter(f => f.Priority_Tier.includes('0')).length,
      tier1: filteredFeatures.filter(f => f.Priority_Tier.includes('1')).length,
      tier2: filteredFeatures.filter(f => f.Priority_Tier.includes('2')).length,
      tier3: filteredFeatures.filter(f => f.Priority_Tier.includes('3')).length,
      tier4: filteredFeatures.filter(f => f.Priority_Tier.includes('4')).length,
    };
    
    return { totalPipeline, totalWeighted, totalEffort, tierCounts };
  }, [salesOpportunities, filteredFeatures]);

  const tierDistribution = useMemo(() => {
    const tiers = ['Tier 0', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'];
    return tiers.map(tier => {
      const tierFeatures = filteredFeatures.filter(f => f.Priority_Tier.includes(tier.split(' ')[1]));
      return {
        name: tier,
        count: tierFeatures.length,
        arr: tierFeatures.reduce((sum, f) => sum + f.Weighted_ARR, 0),
      };
    });
  }, [filteredFeatures]);

  const topFeaturesBase = useMemo(() => {
    return [...filteredFeatures]
      .sort((a, b) => b.Priority_Score - a.Priority_Score);
  }, [filteredFeatures]);

  const { sortedData: sortedAllFeatures, sortConfig, handleSort } = useSortableTable(
    filteredFeatures,
    [
      { key: 'Feature_Name', comparator: comparators.string },
      { key: 'Priority_Score', comparator: comparators.number },
      { key: 'Priority_Tier', comparator: comparators.tier },
      { key: 'Weighted_ARR', comparator: comparators.number },
      { key: 'Effort_Estimate_Weeks', comparator: comparators.effort },
      { key: 'Confidence_Factor', comparator: comparators.number },
      { key: 'Primary_Client', comparator: comparators.string },
      { key: 'Current_Status', comparator: comparators.string },
    ]
  );

  const topFeatures = useMemo(() => {
    const dataToUse = sortConfig.key === null ? topFeaturesBase : sortedAllFeatures;
    return dataToUse.slice(0, 10);
  }, [sortedAllFeatures, topFeaturesBase, sortConfig.key]);

  const atRiskFeatures = useMemo(() => {
    return filteredFeatures.filter(f => f.Priority_Tier.includes('0'));
  }, [filteredFeatures]);

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

  const quarters = ['All', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
  const tiers = ['All', '0', '1', '2', '3', '4'];
  const statuses = ['All', 'Not Started', 'In Progress', 'Blocked', 'Completed'];

  const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#ADD8E6', '#D3D3D3'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-executive">Executive Summary Dashboard</h1>
          <p className="text-gray-600 mt-1">Unified priority scoring and portfolio overview</p>
        </div>
        <div className="flex items-center gap-4">
          <DataFreshness />
          <button
            onClick={() => exportToCSV(filteredFeatures, 'features-export.csv')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            data-testid="button-export-data"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Sprint Overview */}
      <SprintOverview />

      {/* Sprint Health and Blocked Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SprintHealthScorecard />
        <BlockedItemsAlert maxItems={5} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <ClientFilter
              availableClients={availableClients}
              selectedClients={selectedClients}
              onChange={setSelectedClients}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label>
            <select
              value={filterQuarter}
              onChange={(e) => setFilterQuarter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="select-filter-quarter"
            >
              {quarters.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority Tier</label>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="select-filter-tier"
            >
              {tiers.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tiers' : `Tier ${t}`}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="select-filter-status"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard 
          title={<MetricTooltip type="ARR">Total Pipeline ARR</MetricTooltip>} 
          value={formatCurrency(kpis.totalPipeline)} 
          icon={DollarSign} 
          color="blue" 
        />
        <KPICard 
          title={<MetricTooltip type="WEIGHTED_ARR">Weighted ARR</MetricTooltip>} 
          value={formatCurrency(kpis.totalWeighted)} 
          icon={BarChart2} 
          color="green" 
        />
        <KPICard 
          title={<MetricTooltip type="EFFORT">Engineering Capacity</MetricTooltip>} 
          value={`${kpis.totalEffort} weeks`} 
          icon={Settings} 
          color="purple" 
        />
        <KPICard title="Total Features" value={filteredFeatures.length} icon={Target} color="orange" />
        <KPICard title="Tier 0 (At Risk)" value={kpis.tierCounts.tier0} icon={AlertTriangle} color="red" />
      </div>

      {/* Strategic 3-Bucket Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Strategic Bucket Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              filterBucket === 'Make' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setFilterBucket(filterBucket === 'Make' ? 'All' : 'Make')}
            data-testid="bucket-make-money"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-700">Make Money</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{bucketStats.make.count}</p>
            <p className="text-sm text-gray-600">{bucketStats.make.pct}% of features</p>
          </div>
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              filterBucket === "Don't Lose" ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
            }`}
            onClick={() => setFilterBucket(filterBucket === "Don't Lose" ? 'All' : "Don't Lose")}
            data-testid="bucket-dont-lose"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-700">Don't Lose Money</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{bucketStats.dontLose.count}</p>
            <p className="text-sm text-gray-600">{bucketStats.dontLose.pct}% of features</p>
          </div>
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              filterBucket === 'Innovation' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setFilterBucket(filterBucket === 'Innovation' ? 'All' : 'Innovation')}
            data-testid="bucket-innovation"
          >
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-700">Innovation</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{bucketStats.innovation.count}</p>
            <p className="text-sm text-gray-600">{bucketStats.innovation.pct}% of features</p>
          </div>
        </div>
        {filterBucket !== 'All' && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Filtering by: {BUCKET_CONFIG[filterBucket as Bucket].label}
            </Badge>
            <button 
              onClick={() => setFilterBucket('All')}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {atRiskFeatures.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6" data-testid="section-at-risk">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Revenue at Risk - Immediate Attention Required
          </h2>
          <div className="space-y-3">
            {atRiskFeatures.map(feature => (
              <div
                key={feature.Feature_ID}
                onClick={() => setLocation(`/feature/${feature.Feature_ID}`)}
                className="bg-white p-4 rounded border border-red-200 hover:shadow-md cursor-pointer transition-all"
                data-testid={`feature-at-risk-${feature.Feature_ID}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{feature.Feature_Name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Client: {feature.Primary_Client} | ARR at Risk: {formatCurrency(feature.ARR_Amount)}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(feature.Current_Status)}`}>
                      {feature.Current_Status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Target: {feature.Target_Completion_Date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Priority Tier Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tierDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" name="Feature Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weighted ARR by Tier</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierDistribution}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={(entry) => entry.arr > 0 ? `${entry.name}: ${formatCurrency(entry.arr)}` : ''}
                outerRadius={100}
                fill="#8884d8"
                dataKey="arr"
              >
                {tierDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top 10 Features by Priority Score</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <SortableColumnHeader label="Feature" sortKey="Feature_Name" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader 
                  label={<MetricTooltip type="PRIORITY_SCORE">Priority Score</MetricTooltip>} 
                  sortKey="Priority_Score" 
                  sortConfig={sortConfig} 
                  onSort={handleSort} 
                />
                <SortableColumnHeader label="Tier" sortKey="Priority_Tier" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader 
                  label={<MetricTooltip type="WEIGHTED_ARR">Weighted ARR</MetricTooltip>} 
                  sortKey="Weighted_ARR" 
                  sortConfig={sortConfig} 
                  onSort={handleSort} 
                />
                <SortableColumnHeader 
                  label={<MetricTooltip type="EFFORT">Effort</MetricTooltip>} 
                  sortKey="Effort_Estimate_Weeks" 
                  sortConfig={sortConfig} 
                  onSort={handleSort} 
                />
                <SortableColumnHeader label="Confidence" sortKey="Confidence_Factor" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader label="Client" sortKey="Primary_Client" sortConfig={sortConfig} onSort={handleSort} />
                <SortableColumnHeader label="Status" sortKey="Current_Status" sortConfig={sortConfig} onSort={handleSort} />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topFeatures.map((feature, index) => (
                <tr
                  key={feature.Feature_ID}
                  onClick={() => setLocation(`/feature/${feature.Feature_ID}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  data-testid={`row-feature-${index}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{feature.Feature_Name}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{feature.Priority_Score.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getTierBgColor(feature.Priority_Tier)} ${getTierTextColor(feature.Priority_Tier)}`}>
                      {feature.Priority_Tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(feature.Weighted_ARR)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{feature.Effort_Estimate_Weeks}w</td>
                  <td className="px-4 py-3 text-sm">
                    <ConfidenceBadge 
                      confidenceFactor={feature.Confidence_Factor as 1 | 2 | 3} 
                      description={feature.Confidence_Description} 
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{feature.Primary_Client}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(feature.Current_Status)}`}>
                      {feature.Current_Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
