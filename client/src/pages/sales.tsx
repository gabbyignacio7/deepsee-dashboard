import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { useDashboard } from '@/components/dashboard-context';
import { formatCurrency } from '@/lib/utils';
import { getUniqueClients } from '@/lib/client-utils';
import ClientFilter from '@/components/ClientFilter';
import SortableColumnHeader from '@/components/SortableColumnHeader';
import MetricTooltip from '@/components/MetricTooltip';
import { useSortableTable, comparators } from '@/hooks/useSortableTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesDashboard() {
  const { features, salesOpportunities, loading, error, allFeatures, selectedClients, setSelectedClients } = useDashboard();
  const [, setLocation] = useLocation();

  const availableClients = useMemo(() => getUniqueClients(allFeatures), [allFeatures]);

  const funnelData = useMemo(() => {
    const stages = ['Introduction', 'Qualification', 'Proposal', 'POC', 'Contract Negotiation', 'Closed Won'];
    return stages.map(stage => {
      const stageOpps = salesOpportunities.filter(o => o.Stage === stage);
      return {
        name: stage,
        value: stageOpps.reduce((sum, o) => sum + o.Weighted_ARR, 0),
        count: stageOpps.length
      };
    });
  }, [salesOpportunities]);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-sales">Sales Pipeline Dashboard</h1>
        <p className="text-gray-600 mt-1">Revenue forecast and deal-feature mapping</p>
      </div>

      <ClientFilter
        availableClients={availableClients}
        selectedClients={selectedClients}
        onChange={setSelectedClients}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <MetricTooltip type="WEIGHTED_ARR">Sales Funnel (Weighted ARR)</MetricTooltip>
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" name="Weighted ARR" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Opportunities by Stage</h2>
          <div className="space-y-4">
            {funnelData.map((stage, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded" data-testid={`stage-${idx}`}>
                <span className="font-medium text-gray-900">{stage.name}</span>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{formatCurrency(stage.value)}</div>
                  <div className="text-sm text-gray-500">{stage.count} opportunities</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
