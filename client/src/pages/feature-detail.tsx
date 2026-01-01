import { useMemo } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { useDashboard } from '@/components/dashboard-context';
import { formatCurrency, getTierBgColor, getTierTextColor, getStatusColor } from '@/lib/utils';
import ConfidenceBadge from '@/components/ConfidenceBadge';
import SortableColumnHeader from '@/components/SortableColumnHeader';
import { useSortableTable, comparators } from '@/hooks/useSortableTable';

export default function FeatureDetail() {
  const [, params] = useRoute('/feature/:id');
  const [, setLocation] = useLocation();
  const { features, jiraTickets, salesOpportunities, loading, error } = useDashboard();
  
  const featureId = params?.id || '';

  const feature = useMemo(() => 
    features.find(f => f.Feature_ID === featureId),
    [features, featureId]
  );

  const relatedTickets = useMemo(() => 
    jiraTickets.filter(t => t.Mapped_Feature_ID === featureId),
    [jiraTickets, featureId]
  );

  const { sortedData: sortedTickets, sortConfig: ticketSortConfig, handleSort: handleTicketSort } = useSortableTable(
    relatedTickets,
    [
      { key: 'Ticket_ID', comparator: comparators.string },
      { key: 'Ticket_Summary', comparator: comparators.string },
      { key: 'Status', comparator: comparators.string },
      { key: 'Story_Points', comparator: comparators.number },
    ]
  );

  const relatedOpportunities = useMemo(() => 
    salesOpportunities.filter(o => o.Mapped_Feature_ID && o.Mapped_Feature_ID.includes(featureId)),
    [salesOpportunities, featureId]
  );

  const { sortedData: sortedOpportunities, sortConfig: oppSortConfig, handleSort: handleOppSort } = useSortableTable(
    relatedOpportunities,
    [
      { key: 'Opportunity_Name', comparator: comparators.string },
      { key: 'Account_Name', comparator: comparators.string },
      { key: 'Stage', comparator: comparators.string },
      { key: 'ARR_Value', comparator: comparators.number },
      { key: 'Probability', comparator: comparators.number },
    ]
  );

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

  if (!feature) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Feature not found</p>
        <button 
          onClick={() => setLocation('/executive')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          data-testid="button-go-back"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setLocation('/executive')} 
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="heading-feature-name">{feature.Feature_Name}</h1>
            <p className="text-gray-600" data-testid="text-feature-id">{feature.Feature_ID}</p>
          </div>
          <div className="text-right">
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getTierBgColor(feature.Priority_Tier)} ${getTierTextColor(feature.Priority_Tier)}`}>
              {feature.Priority_Tier}
            </span>
            <div className="mt-2">
              <span className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(feature.Current_Status)}`}>
                {feature.Current_Status}
              </span>
            </div>
          </div>
        </div>
        <div className="text-4xl font-bold text-blue-600" data-testid="text-priority-score">
          Priority Score: {feature.Priority_Score.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">ARR Amount:</span>
              <span className="font-semibold">{formatCurrency(feature.ARR_Amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weighted ARR:</span>
              <span className="font-semibold text-blue-600">{formatCurrency(feature.Weighted_ARR)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue Type:</span>
              <span className="font-medium">{feature.Revenue_Type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Contract Status:</span>
              <span className="font-medium">{feature.Contract_Status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Probability:</span>
              <span className="font-semibold">{feature.Conversion_Probability <= 1 ? Math.round(feature.Conversion_Probability * 100) : feature.Conversion_Probability}%</span>
            </div>
            {feature.Deal_Close_Date && (
              <div className="flex justify-between">
                <span className="text-gray-600">Deal Close Date:</span>
                <span className="font-medium">{feature.Deal_Close_Date}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Effort & Replicability</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Replicability Score:</span>
              <span className="font-semibold">{feature.Replicability_Score} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effort Estimate:</span>
              <span className="font-semibold">{feature.Effort_Estimate_Weeks} weeks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">T-Shirt Size:</span>
              <span className="font-medium">{feature.Effort_T_Shirt_Size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confidence Factor:</span>
              <ConfidenceBadge 
                confidenceFactor={feature.Confidence_Factor as 1 | 2 | 3} 
                description={feature.Confidence_Description} 
              />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completion:</span>
              <span className="font-semibold">{feature.Completion_Percent}%</span>
            </div>
            <div className="mt-2">
              <div className="bg-gray-200 h-3 rounded-full">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${feature.Completion_Percent}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Client & Agent Information</h2>
          <div className="space-y-3">
            <div>
              <div className="text-gray-600 text-sm">Primary Client</div>
              <div className="font-semibold text-lg">{feature.Primary_Client}</div>
            </div>
            {feature.Additional_Clients && (
              <div>
                <div className="text-gray-600 text-sm">Additional Clients</div>
                <div className="font-medium">{feature.Additional_Clients}</div>
              </div>
            )}
            <div>
              <div className="text-gray-600 text-sm">Agent Type</div>
              <div className="font-medium">{feature.Agent_Type}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Category</div>
              <div className="font-medium">{feature.Category}</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm">Quarter Planned</div>
              <div className="font-medium">{feature.Quarter_Planned}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Assignment & Ownership</h2>
          <div className="space-y-3">
            {feature.Assigned_To && (
              <div>
                <div className="text-gray-600 text-sm">Assigned To</div>
                <div className="font-medium">{feature.Assigned_To}</div>
              </div>
            )}
            {feature.Team_Required && (
              <div>
                <div className="text-gray-600 text-sm">Team Required</div>
                <div className="font-medium">{feature.Team_Required}</div>
              </div>
            )}
            {feature.Dependencies && (
              <div>
                <div className="text-gray-600 text-sm">Dependencies</div>
                <div className="font-medium">{feature.Dependencies}</div>
              </div>
            )}
            {feature.Engineering_Complexity && (
              <div>
                <div className="text-gray-600 text-sm">Engineering Complexity</div>
                <div className="font-medium">{feature.Engineering_Complexity}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedTickets.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Linked JIRA Tickets ({relatedTickets.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableColumnHeader label="Ticket ID" sortKey="Ticket_ID" sortConfig={ticketSortConfig} onSort={handleTicketSort} />
                  <SortableColumnHeader label="Summary" sortKey="Ticket_Summary" sortConfig={ticketSortConfig} onSort={handleTicketSort} />
                  <SortableColumnHeader label="Status" sortKey="Status" sortConfig={ticketSortConfig} onSort={handleTicketSort} />
                  <SortableColumnHeader label="Story Points" sortKey="Story_Points" sortConfig={ticketSortConfig} onSort={handleTicketSort} />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTickets.map(ticket => (
                  <tr key={ticket.Ticket_ID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{ticket.Ticket_ID}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{ticket.Ticket_Summary}</td>
                    <td className="px-4 py-3 text-sm">{ticket.Status}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ticket.Story_Points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {relatedOpportunities.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Linked Sales Opportunities ({relatedOpportunities.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableColumnHeader label="Opportunity" sortKey="Opportunity_Name" sortConfig={oppSortConfig} onSort={handleOppSort} />
                  <SortableColumnHeader label="Client" sortKey="Account_Name" sortConfig={oppSortConfig} onSort={handleOppSort} />
                  <SortableColumnHeader label="Stage" sortKey="Stage" sortConfig={oppSortConfig} onSort={handleOppSort} />
                  <SortableColumnHeader label="ARR Value" sortKey="ARR_Value" sortConfig={oppSortConfig} onSort={handleOppSort} />
                  <SortableColumnHeader label="Probability" sortKey="Probability" sortConfig={oppSortConfig} onSort={handleOppSort} />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOpportunities.map(opp => (
                  <tr key={opp.Opportunity_ID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{opp.Opportunity_Name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{opp.Account_Name}</td>
                    <td className="px-4 py-3 text-sm">{opp.Stage}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">{formatCurrency(opp.ARR_Value)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{opp.Probability <= 1 ? Math.round(opp.Probability * 100) : opp.Probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(feature.Engineering_Notes || feature.Management_Notes || feature.Sales_Notes) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notes & Comments</h2>
          {feature.Engineering_Notes && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Engineering Notes:</h3>
              <p className="text-gray-600">{feature.Engineering_Notes}</p>
            </div>
          )}
          {feature.Management_Notes && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Management Notes:</h3>
              <p className="text-gray-600">{feature.Management_Notes}</p>
            </div>
          )}
          {feature.Sales_Notes && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Sales Notes:</h3>
              <p className="text-gray-600">{feature.Sales_Notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
