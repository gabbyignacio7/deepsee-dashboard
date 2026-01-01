import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { Feature, JiraTicket, SalesOpportunity } from '@shared/schema';
import { filterFeaturesByClients, filterTicketsByFeatures } from '@/lib/client-utils';

interface DashboardContextType {
  // Raw data (unfiltered)
  allFeatures: Feature[];
  allJiraTickets: JiraTicket[];
  allSalesOpportunities: SalesOpportunity[];
  
  // Filtered data (based on selected clients and deprecation filter)
  features: Feature[];
  jiraTickets: JiraTicket[];
  salesOpportunities: SalesOpportunity[];
  
  // Client filter state
  selectedClients: string[];
  setSelectedClients: (clients: string[]) => void;
  
  // Deprecation filter state
  excludeDeprecated: boolean;
  setExcludeDeprecated: (exclude: boolean) => void;
  
  // Ticket counts for metrics
  totalTicketCount: number;
  activeTicketCount: number;
  deprecatedTicketCount: number;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Raw data state (unfiltered)
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [allJiraTickets, setAllJiraTickets] = useState<JiraTicket[]>([]);
  const [allSalesOpportunities, setAllSalesOpportunities] = useState<SalesOpportunity[]>([]);
  
  // Client filter state
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  
  // Deprecation filter state (default: true = exclude deprecated tickets)
  const [excludeDeprecated, setExcludeDeprecated] = useState(true);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        // Use base path for GitHub Pages deployment
        const basePath = import.meta.env.BASE_URL || '';
        const [featuresRes, jiraRes, salesRes] = await Promise.all([
          fetch(`${basePath}data/features.json`),
          fetch(`${basePath}data/jira.json`),
          fetch(`${basePath}data/sales.json`),
        ]);

        if (!featuresRes.ok || !jiraRes.ok || !salesRes.ok) {
          throw new Error('Failed to load data files');
        }

        const featuresData = await featuresRes.json();
        const jiraData = await jiraRes.json();
        const salesData = await salesRes.json();

        setAllFeatures(featuresData);
        setAllJiraTickets(jiraData);
        setAllSalesOpportunities(salesData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply client filtering to data
  const features = useMemo(() => {
    return filterFeaturesByClients(allFeatures, selectedClients);
  }, [allFeatures, selectedClients]);

  const jiraTickets = useMemo(() => {
    // First filter by client/features
    let tickets = filterTicketsByFeatures(allJiraTickets, features);
    
    // Then apply deprecation filter if enabled
    if (excludeDeprecated) {
      tickets = tickets.filter(ticket => {
        return ticket.Product_Proposed_To_Deprecate !== 'Y';
      });
    }
    
    return tickets;
  }, [allJiraTickets, features, excludeDeprecated]);
  
  // Calculate ticket counts for metrics
  const totalTicketCount = useMemo(() => allJiraTickets.length, [allJiraTickets]);
  
  const deprecatedTicketCount = useMemo(() => {
    return allJiraTickets.filter(ticket => {
      return ticket.Product_Proposed_To_Deprecate === 'Y';
    }).length;
  }, [allJiraTickets]);
  
  const activeTicketCount = useMemo(() => {
    return totalTicketCount - deprecatedTicketCount;
  }, [totalTicketCount, deprecatedTicketCount]);

  const salesOpportunities = useMemo(() => {
    // When no client filter is active, show all opportunities
    if (selectedClients.length === 0) {
      return allSalesOpportunities;
    }
    
    // Filter sales opportunities by the filtered features
    // An opportunity is included if ANY of its Mapped_Feature_IDs match a filtered feature
    // Note: Mapped_Feature_ID can be comma-separated (e.g., "F-102,F-208")
    const featureIds = new Set(features.map(f => f.Feature_ID));
    
    return allSalesOpportunities.filter(opp => {
      if (!opp.Mapped_Feature_ID || opp.Mapped_Feature_ID.trim() === '') {
        // Opportunities without feature mapping are excluded when filtering
        return false;
      }
      
      // Split comma-separated feature IDs and check if any match
      const mappedFeatureIds = opp.Mapped_Feature_ID
        .split(',')
        .map(id => id.trim())
        .filter(id => id !== '');
      
      return mappedFeatureIds.some(id => featureIds.has(id));
    });
  }, [allSalesOpportunities, features, selectedClients]);

  return (
    <DashboardContext.Provider
      value={{
        allFeatures,
        allJiraTickets,
        allSalesOpportunities,
        features,
        jiraTickets,
        salesOpportunities,
        selectedClients,
        setSelectedClients,
        excludeDeprecated,
        setExcludeDeprecated,
        totalTicketCount,
        activeTicketCount,
        deprecatedTicketCount,
        loading,
        error,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
