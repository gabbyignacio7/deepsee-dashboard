/**
 * Client parsing and filtering utilities
 * Handles extracting client information from feature data
 */

import type { Feature, JiraTicket, SalesOpportunity } from '@/../../shared/schema';

// Manual mapping for features with ambiguous "Multiple" or "Internal" primary clients
// This should be updated as actual client information becomes available
const CLIENT_MAPPING: Record<string, string[]> = {
  // Add specific feature mappings here when client information is clarified
  // 'F-001': ['Broadridge', 'DTCC'],
  // 'F-002': ['Internal'],
};

// Special synthetic client categories
export const SYNTHETIC_CLIENTS = {
  MULTIPLE: '__multiple',
  INTERNAL: '__internal',
  UNSPECIFIED: '__unspecified',
} as const;

/**
 * Parse client list from a feature's Primary_Client and Additional_Clients fields
 * Handles various formats:
 * - Single client: "Broadridge" → ["Broadridge"]
 * - Multiple clients: "Multiple" → ["__multiple"] (or mapped clients if in CLIENT_MAPPING)
 * - Internal: "Internal" → ["__internal"]
 * - Empty/TBD: "" → ["__unspecified"]
 */
export function parseClients(feature: Feature): string[] {
  const featureId = feature.Feature_ID;
  
  // Check manual mapping first
  if (CLIENT_MAPPING[featureId]) {
    return CLIENT_MAPPING[featureId];
  }

  const primaryClient = feature.Primary_Client?.trim();
  const additionalClients = feature.Additional_Clients?.trim();

  const clients: string[] = [];

  // Handle primary client
  if (!primaryClient || primaryClient === '' || primaryClient.toLowerCase() === 'tbd') {
    clients.push(SYNTHETIC_CLIENTS.UNSPECIFIED);
  } else if (primaryClient.toLowerCase() === 'multiple') {
    clients.push(SYNTHETIC_CLIENTS.MULTIPLE);
  } else if (primaryClient.toLowerCase() === 'internal') {
    clients.push(SYNTHETIC_CLIENTS.INTERNAL);
  } else {
    clients.push(primaryClient);
  }

  // Parse additional clients (comma-separated)
  if (additionalClients && additionalClients !== '') {
    const additional = additionalClients
      .split(',')
      .map(c => c.trim())
      .filter(c => c !== '');
    clients.push(...additional);
  }

  return Array.from(new Set(clients)); // Remove duplicates
}

/**
 * Get all unique clients from features list
 * Returns sorted list with real clients first, then synthetic categories
 */
export function getUniqueClients(features: Feature[]): string[] {
  const clientSet = new Set<string>();

  features.forEach(feature => {
    const clients = parseClients(feature);
    clients.forEach(client => clientSet.add(client));
  });

  const clients = Array.from(clientSet);

  // Separate real clients from synthetic ones
  const realClients = clients.filter(c => !c.startsWith('__')).sort();
  const syntheticClients = clients.filter(c => c.startsWith('__')).sort();

  return [...realClients, ...syntheticClients];
}

/**
 * Get display name for client (converts synthetic categories to readable names)
 */
export function getClientDisplayName(client: string): string {
  switch (client) {
    case SYNTHETIC_CLIENTS.MULTIPLE:
      return 'Multiple Clients';
    case SYNTHETIC_CLIENTS.INTERNAL:
      return 'Internal Projects';
    case SYNTHETIC_CLIENTS.UNSPECIFIED:
      return 'Unspecified';
    default:
      return client;
  }
}

/**
 * Check if a feature matches the selected client filters
 * If selectedClients is empty, return true (show all)
 */
export function featureMatchesClientFilter(
  feature: Feature,
  selectedClients: string[]
): boolean {
  if (selectedClients.length === 0) {
    return true; // No filter applied
  }

  const featureClients = parseClients(feature);
  return selectedClients.some(selected => featureClients.includes(selected));
}

/**
 * Filter features by selected clients
 */
export function filterFeaturesByClients(
  features: Feature[],
  selectedClients: string[]
): Feature[] {
  if (selectedClients.length === 0) {
    return features;
  }

  return features.filter(f => featureMatchesClientFilter(f, selectedClients));
}

/**
 * Filter JIRA tickets by features (for client filtering)
 * Note: Unmapped tickets (without Mapped_Feature_ID) are always included
 * to ensure engineering capacity view shows the full backlog
 */
export function filterTicketsByFeatures(
  tickets: JiraTicket[],
  features: Feature[]
): JiraTicket[] {
  const featureIds = new Set(features.map(f => f.Feature_ID));
  return tickets.filter(ticket => {
    // Match by Mapped_Feature_ID in ticket if available
    const ticketFeatureId = ticket.Mapped_Feature_ID?.trim().toLowerCase();
    
    // Treat these values as "unmapped": null, undefined, empty, "0", "null", "n/a"
    const isUnmapped = !ticketFeatureId || 
                       ticketFeatureId === '' || 
                       ticketFeatureId === '0' || 
                       ticketFeatureId === 'null' || 
                       ticketFeatureId === 'n/a';
    
    // Include ticket if unmapped OR if mapped to a filtered feature
    return isUnmapped || featureIds.has(ticket.Mapped_Feature_ID);
  });
}

/**
 * Calculate client-specific metrics
 */
export interface ClientMetrics {
  clientName: string;
  totalARR: number;
  weightedARR: number;
  featureCount: number;
  completedFeatures: number;
  inProgressFeatures: number;
  notStartedFeatures: number;
  completionPercentage: number;
  totalEffort: number;
  nextMilestoneDate: string | null;
  nextMilestoneFeature: string | null;
}

export function calculateClientMetrics(
  clientName: string,
  features: Feature[],
  salesOpportunities: SalesOpportunity[]
): ClientMetrics {
  // Filter features for this client
  const clientFeatures = features.filter(f => 
    parseClients(f).includes(clientName)
  );

  // Calculate feature metrics
  const completedFeatures = clientFeatures.filter(f => 
    f.Current_Status?.toLowerCase() === 'completed' || 
    f.Current_Status?.toLowerCase() === 'done'
  ).length;
  
  const inProgressFeatures = clientFeatures.filter(f => 
    f.Current_Status?.toLowerCase() === 'in progress'
  ).length;
  
  const notStartedFeatures = clientFeatures.filter(f => 
    f.Current_Status?.toLowerCase() === 'not started' ||
    f.Current_Status?.toLowerCase() === 'planning'
  ).length;

  const completionPercentage = clientFeatures.length > 0
    ? (completedFeatures / clientFeatures.length) * 100
    : 0;

  // Calculate financial metrics
  const totalARR = clientFeatures.reduce((sum, f) => sum + (f.ARR_Amount || 0), 0);
  const weightedARR = clientFeatures.reduce((sum, f) => sum + (f.Weighted_ARR || 0), 0);
  const totalEffort = clientFeatures.reduce((sum, f) => sum + (f.Effort_Estimate_Weeks || 0), 0);

  // Find next milestone
  const upcomingFeatures = clientFeatures
    .filter(f => f.Target_Completion_Date && new Date(f.Target_Completion_Date) > new Date())
    .sort((a, b) => {
      const dateA = new Date(a.Target_Completion_Date || 0);
      const dateB = new Date(b.Target_Completion_Date || 0);
      return dateA.getTime() - dateB.getTime();
    });

  const nextMilestone = upcomingFeatures[0];

  return {
    clientName: getClientDisplayName(clientName),
    totalARR,
    weightedARR,
    featureCount: clientFeatures.length,
    completedFeatures,
    inProgressFeatures,
    notStartedFeatures,
    completionPercentage,
    totalEffort,
    nextMilestoneDate: nextMilestone?.Target_Completion_Date || null,
    nextMilestoneFeature: nextMilestone?.Feature_Name || null,
  };
}

/**
 * Get clients sorted by total ARR (for client overview grid)
 */
export function getClientsByRevenue(
  features: Feature[],
  salesOpportunities: SalesOpportunity[]
): ClientMetrics[] {
  const clients = getUniqueClients(features);
  
  const metrics = clients.map(client => 
    calculateClientMetrics(client, features, salesOpportunities)
  );

  return metrics.sort((a, b) => b.totalARR - a.totalARR);
}
