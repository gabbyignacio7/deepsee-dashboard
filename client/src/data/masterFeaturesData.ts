// MASTER_DATA_FEATURES - Auto-extracted from Excel
// Total Features: 74
// Generated: 2025-12-05
// Source: 2025-11-07-DeepSee-prioritization-dashboard-v3__4_.xlsx

export type Bucket = 'Make' | "Don't Lose" | 'Innovation';
export type Quarter = 'NOW' | 'NEXT' | 'LATER';
export type PrdStatus = 'Complete' | 'In Progress' | 'Not Started';
export type ArchitectureLayer = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const ARCHITECTURE_LAYERS: Record<ArchitectureLayer, { name: string; description: string; icon: string; color: string }> = {
  1: { name: "Platform", description: "Communication, storage, and processing infrastructure for ARTEMIS", icon: "Link", color: "#1a365d" },
  2: { name: "Automation and Orchestration", description: "Visibility, auditability, and multi-agent coordination", icon: "Cog", color: "#2c5282" },
  3: { name: "Blueprint", description: "Industry-specific use cases with 80%+ out-of-the-box readiness", icon: "FileText", color: "#2b6cb0" },
  4: { name: "Agentic Engine", description: "AI-governed agents powering client enablement with governed execution (includes all 9 PRIMER agents)", icon: "Bot", color: "#3182ce" },
  5: { name: "DeepGraph", description: "Knowledge graph infrastructure for firm-specific intelligence", icon: "Network", color: "#4299e1" },
  6: { name: "Process Certainty", description: "Test-driven trust layer delivering replayable, firm-specific production models", icon: "CheckCircle", color: "#63b3ed" },
  7: { name: "Complex Services", description: "Dynamic UI built for real outcomes with complete workflows and 3rd party integrations", icon: "Monitor", color: "#90cdf4" }
};

export function getArchitectureLayer(feature: MasterFeature): ArchitectureLayer {
  const name = feature.name.toLowerCase();
  const category = feature.category.toLowerCase();
  const agentType = feature.agentType.toLowerCase();
  
  // Layer 1: Platform
  if (name.includes('service fabric') || 
      name.includes('connector') || 
      name.includes('integration gateway') ||
      name.includes('inference') ||
      name.includes('training speed') ||
      name.includes('terraform') ||
      (name.includes('infrastructure') && !name.includes('graph')) ||
      name.includes('sftp') ||
      (name.includes('api') && name.includes('integration')) ||
      name.includes('foreign language') ||
      category.includes('core infrastructure')) {
    return 1;
  }
  
  // Layer 2: Automation and Orchestration
  if (name.includes('reasoning') || 
      name.includes('orchestration') || 
      name.includes('mcp') ||
      (name.includes('planning') && !name.includes('sprint')) ||
      name.includes('activity tracing') ||
      name.includes('multi-agent')) {
    return 2;
  }
  
  // Layer 3: Blueprint
  if (name.includes('blueprint') || 
      (name.includes('configuration') && name.includes('agent')) ||
      (name.includes('template') && name.includes('agent')) ||
      name.includes('client agent interaction')) {
    return 3;
  }
  
  // Layer 4: Agentic Engine (includes all PRIMER agents)
  if ((name.includes('agent') && !name.includes('blueprint') && !name.includes('interaction')) ||
      name.includes('extraction') ||
      name.includes('mercury') ||
      name.includes('email automation') ||
      (name.includes('trade') && (name.includes('processing') || name.includes('reconciliation'))) ||
      name.includes('ssi') ||
      (name.includes('settlement') && !name.includes('ui')) ||
      (name.includes('matching engine') && !name.includes('ui')) ||
      name.includes('loan') ||
      name.includes('core reconciliation') ||
      name.includes('deeppilot') ||
      name.includes('one view') ||
      name.includes('llm-enhanced') ||
      name.includes('primer') ||
      agentType.includes('email agent') || 
      agentType.includes('trade agent') || 
      agentType.includes('ssi agent') || 
      agentType.includes('matching engine') ||
      category.includes('client onboarding') || 
      category.includes('client implementations')) {
    return 4;
  }
  
  // Layer 5: DeepGraph
  if (name.includes('graph') || 
      name.includes('deepgraph') || 
      name.includes('kag') ||
      (name.includes('knowledge') && name.includes('graph')) ||
      name.includes('information graph')) {
    return 5;
  }
  
  // Layer 6: Process Certainty
  if (name.includes('compliance') || 
      name.includes('audit') || 
      name.includes('hitl') ||
      name.includes('human-in-the-loop') ||
      name.includes('testing suite') ||
      name.includes('exception prediction') ||
      name.includes('retention prediction') ||
      name.includes('model review') ||
      name.includes('certainty') ||
      name.includes('validation') ||
      (name.includes('security') && name.includes('vulnerability'))) {
    return 6;
  }
  
  // Layer 7: Complex Services
  if (name.includes('ui') || 
      name.includes('ux') || 
      name.includes('dashboard') ||
      name.includes('copilot') ||
      name.includes('opsconsole') ||
      name.includes('3rd party') ||
      name.includes('third party') ||
      (name.includes('outlook') && name.includes('integration')) ||
      name.includes('agentic card') ||
      name.includes('double-click') ||
      agentType.includes('analytics')) {
    return 7;
  }
  
  // Default: Return 4 (Agentic Engine) as catch-all
  return 4;
}

// PRD Mapping Function - maps feature names to PRDs based on keywords and architecture layer
export function mapFeatureToPRD(featureName: string, architectureLayer?: ArchitectureLayer): string {
  const name = featureName.toLowerCase();
  
  const PRD_MAPPINGS: Record<string, string> = {
    'service fabric': 'Fabric PRD',
    'integration gateway': 'Integration Gateway PRD',
    'connector': 'Integration Gateway PRD',
    'inference': 'Performance Optimization PRD',
    'training speed': 'Performance Optimization PRD',
    'microsoft fabric': 'Microsoft Fabric Integration PRD',
    'reasoning': 'Reasoning PRD',
    'mcp': 'MCP Integration PRD',
    'orchestration': 'Orchestration PRD',
    'activity tracing': 'Observability PRD',
    'blueprint': 'AI Blueprint Template PRD',
    'client agent interaction': 'Client Configuration PRD',
    'mercury': 'Mercury Extraction PRD',
    'extraction': 'Mercury Extraction PRD',
    'email automation': 'Email Automation PRD',
    'trade': 'Trade Reconciliation PRD',
    'ssi': 'SSI PRD',
    'settlement': 'Security Settlements PRD',
    'matching engine': 'Matching Engine PRD',
    'loan': 'Loan Operations PRD',
    'core reconciliation': 'Core Reconciliation PRD',
    'deeppilot': 'DeepPilot PRD',
    'one view': 'One View PRD',
    'graph': 'Information Graph PRD',
    'deepgraph': 'DeepGraph PRD',
    'compliance': 'Compliance & Audit PRD',
    'audit': 'Compliance & Audit PRD',
    'hitl': 'HITL PRD',
    'testing': 'Testing Suite PRD',
    'exception': 'Exception Handling PRD',
    'retention': 'Retention Prediction PRD',
    'security vulnerability': 'Broadridge Security PRD',
    'ui design': 'UI/UX PRD',
    'ui implementation': 'UI/UX PRD',
    'dashboard': 'Dashboard PRD',
    'copilot': '3rd Party Integration PRD',
    'opsconsole': '3rd Party Integration PRD',
    'outlook': 'Outlook Integration PRD',
    'agentic card': '3rd Party Integration PRD'
  };
  
  // First try keyword-based mapping
  for (const [keyword, prd] of Object.entries(PRD_MAPPINGS)) {
    if (name.includes(keyword)) {
      return prd;
    }
  }
  
  // Fall back to layer-based default PRD if no keyword match
  if (architectureLayer) {
    const LAYER_DEFAULT_PRDS: Record<ArchitectureLayer, string> = {
      1: 'Fabric PRD',
      2: 'Orchestration PRD',
      3: 'AI Blueprint Template PRD',
      4: 'Agentic Engine PRD',
      5: 'DeepGraph PRD',
      6: 'Compliance & Audit PRD',
      7: 'UI/UX PRD'
    };
    return LAYER_DEFAULT_PRDS[architectureLayer];
  }
  
  return 'TBD';
}

// Helper to get PRD for a feature - uses stored prdName if available, otherwise auto-maps
export function getFeaturePRD(feature: MasterFeature): string {
  if (feature.prdName) {
    return feature.prdName;
  }
  const layer = feature.architectureLayer || getArchitectureLayer(feature);
  return mapFeatureToPRD(feature.name, layer);
}

export interface MasterFeature {
  id: string;
  name: string;
  bucket: Bucket;
  agentType: string;
  category: string;
  quarter: Quarter;
  replicability: number;
  primaryClient: string;
  additionalClients: string;
  effortSize: string;
  priorityTier: string;
  artemis: string;
  prdStatus: PrdStatus;
  epicInJira: string;
  arr_value?: number;
  arr_at_risk?: number;
  architectureLayer?: ArchitectureLayer;
  jiraTicketCount?: number;
  jiraTicketsDone?: number;
  prdName?: string;
  prdLink?: string;
}

export function getEstimatedTicketCounts(feature: MasterFeature): { total: number; done: number } {
  const baseCount = feature.epicInJira === 'Yes' ? 5 : 2;
  
  switch (feature.prdStatus) {
    case 'Complete':
      return { total: baseCount, done: baseCount };
    case 'In Progress':
      return { total: baseCount, done: Math.floor(baseCount * 0.4) };
    default:
      return { total: baseCount, done: 0 };
  }
}

export const masterFeaturesData: MasterFeature[] = [
  {
    id: "F-001",
    name: "Mercury Extraction",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-002",
    name: "Client Agent Interaction Enhancements",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "No"
  },
  {
    id: "F-003",
    name: "DeepSee Service Fabric Internal Enhancements",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Core Infrastructure",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "No"
  },
  {
    id: "F-004",
    name: "Retention Prediction UI",
    bucket: "Make",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 3,
    primaryClient: "BetaNXT",
    additionalClients: "Broadridge",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "In Progress",
    epicInJira: "No"
  },
  {
    id: "F-005",
    name: "Double-click to view dashboard messages",
    bucket: "Make",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "Broadridge",
    additionalClients: "Accenture, Broadridge",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "No"
  },
  {
    id: "F-007",
    name: "Matching Engine UI",
    bucket: "Make",
    agentType: "Matching Engine",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "Altaira",
    additionalClients: "Avaloq, CTC, BBVA",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "No"
  },
  {
    id: "F-008",
    name: "Information Graph Enhanced Infrastructure",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Core Infrastructure",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-009",
    name: "Enhanced Agent Outcome Reasoning and Planning",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-010",
    name: "Inference / Training speed improvements",
    bucket: "Don't Lose",
    agentType: "Platform (All Agents)",
    category: "Core Infrastructure",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-011",
    name: "Activity Tracing Across Agents",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-012",
    name: "Exception Prediction",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-013",
    name: "Simplified Agentic UI Implementation",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-014",
    name: "Information Graph UI Design",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-015",
    name: "MCP Integration with 3rd Party Agents",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "API Development",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-016",
    name: "Enhanced Integration with 3rd Party Applications - Outlook & Ops Console",
    bucket: "Don't Lose",
    agentType: "Email Automation",
    category: "API Development",
    quarter: "NOW",
    replicability: 4,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-017",
    name: "User configurable dashboards",
    bucket: "Don't Lose",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "Broadridge",
    additionalClients: "Accenture, JPM, Avaloq, CTC, BBVA",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-018",
    name: "Process Mapping and Optimization Opportunities",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-019",
    name: "Information Graph UI Implementation",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-020",
    name: "Technologist and Model Review UI implementation",
    bucket: "Don't Lose",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-021",
    name: "DeepSee Service Fabric External Enhancements",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Core Infrastructure",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-022",
    name: "Integrated foreign language support",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 3,
    primaryClient: "BBVA",
    additionalClients: "Avaloq",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Yes",
    prdStatus: "In Progress",
    epicInJira: "Yes"
  },
  {
    id: "F-023",
    name: "Process variation highlights",
    bucket: "Innovation",
    agentType: "Platform (Analytics)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-024",
    name: "Agentic Card UI Implementation for 3rd Party Applications -Microsoft CoPilot",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-025",
    name: "Enhanced Testing Suite UI Implementation",
    bucket: "Don't Lose",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "Yes"
  },
  {
    id: "F-026",
    name: "DTCC Agent Onboarding - Trade Processing Phase 1",
    bucket: "Make",
    agentType: "Trade Processing",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 3,
    primaryClient: "DTCC",
    additionalClients: "0",
    effortSize: "L-Large 8wks",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-027",
    name: "DTCC Agent Onboarding - Trade Processing Phase 2",
    bucket: "Make",
    agentType: "Trade Processing",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 3,
    primaryClient: "DTCC",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-028",
    name: "DTCC Agent Onboarding - Core Reconciliation",
    bucket: "Make",
    agentType: "Core Reconciliation",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 3,
    primaryClient: "DTCC",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-029",
    name: "Trade Matching Engine Enhancement",
    bucket: "Make",
    agentType: "Matching Engine",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 2,
    primaryClient: "Broadridge",
    additionalClients: "Accenture, BBVA, CTC, Altaira, Avaloq",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-030",
    name: "Email Automation Workflow",
    bucket: "Make",
    agentType: "Email Automation",
    category: "Client-Specific Work",
    quarter: "NOW",
    replicability: 3,
    primaryClient: "Broadridge",
    additionalClients: "Accenture, BBVA, CTC, Altaira, Avaloq",
    effortSize: "L-Large 8wks",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-031",
    name: "Broadridge Critical Bug Fix - Email Processing",
    bucket: "Don't Lose",
    agentType: "Trade Processing",
    category: "Bug Fixes",
    quarter: "NOW",
    replicability: 1,
    primaryClient: "Broadridge",
    additionalClients: "Accenture",
    effortSize: "S-Small 2wks",
    priorityTier: "Tier 0: Emergency",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes",
    arr_at_risk: 500000
  },
  {
    id: "F-032",
    name: "JP Morgan Monthly Reconciliation Enhancement",
    bucket: "Don't Lose",
    agentType: "Core Reconciliation",
    category: "Client-Specific Work",
    quarter: "LATER",
    replicability: 3,
    primaryClient: "JP Morgan",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-033",
    name: "DTCC Settlements Optimization",
    bucket: "Make",
    agentType: "Security Settlements",
    category: "Client-Specific Work",
    quarter: "LATER",
    replicability: 3,
    primaryClient: "DTCC",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-034",
    name: "Accenture Email Automation Deployment - HERA",
    bucket: "Don't Lose",
    agentType: "Email Automation",
    category: "Client-Specific Work",
    quarter: "NOW",
    replicability: 4,
    primaryClient: "Accenture",
    additionalClients: "Broadridge",
    effortSize: "L-Large 8wks",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-036",
    name: "HMDA / CRA Reporting - Colony Bank",
    bucket: "Make",
    agentType: "HMDA / CRA",
    category: "Client-Specific Work",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "Regional Banks",
    additionalClients: "Colony Bank",
    effortSize: "M-Medium 4wks",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-037",
    name: "Treasury Agent Deployment - Sunwest Bank",
    bucket: "Make",
    agentType: "Standing Settlement Instructions",
    category: "Client-Specific Work",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "Regional Banks",
    additionalClients: "Sunwest Bank",
    effortSize: "M-Medium 4wks",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-038",
    name: "Vantage Bank Custom Reconciliation (POC)",
    bucket: "Don't Lose",
    agentType: "Core Reconciliation",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 2,
    primaryClient: "Regional Banks",
    additionalClients: "Vantage Bank",
    effortSize: "XL-Extra Large 12wks+",
    priorityTier: "Tier 1: Fast Track",
    artemis: "No",
    prdStatus: "Complete",
    epicInJira: "Yes"
  },
  {
    id: "F-039",
    name: "Email Automation - Response Generation Enhancement",
    bucket: "Make",
    agentType: "Email Automation",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-040",
    name: "Trade Processing - 100% Accuracy Validation",
    bucket: "Make",
    agentType: "Trade Processing",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "0",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-041",
    name: "Security Settlements - Break Resolution Automation",
    bucket: "Make",
    agentType: "Security Settlements",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "Multiple",
    additionalClients: "Altaira, Broadridge, BBVA, CTC, Avaloq",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-042",
    name: "SSI - Real-time Data Validation",
    bucket: "Make",
    agentType: "Standing Settlement Instructions",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "Multiple",
    additionalClients: "DTCC, CIBC",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-043",
    name: "Matching Engine - External Break Detection",
    bucket: "Make",
    agentType: "Matching Engine",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 4,
    primaryClient: "Multiple",
    additionalClients: "Broadridge, BBVA, Avaloq, CTC",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-045",
    name: "Loan Operations - Application Automation",
    bucket: "Make",
    agentType: "Loan Operations",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 4,
    primaryClient: "Multiple",
    additionalClients: "Colony Bank, Sunwest, ICCU",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-046",
    name: "Core Reconciliation - Multi-System Support",
    bucket: "Make",
    agentType: "Core Reconciliation",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "Multiple",
    additionalClients: "Colony Bank, Sunwest, ICCU",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "No",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-048",
    name: "Ingest Email / Case (Outlook, GMAIL, ServiceNow, Salesforce, Dynamics)",
    bucket: "Make",
    agentType: "DeepRecon",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "Multiple",
    additionalClients: "Broadridge, Accenture, BBVA, Avaloq, CTC, Altaira",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-049",
    name: "Ingest Content (Attachment, SharePoint, SFTP, API Call)",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-050",
    name: "Success / Failure and Retry of Ingestion Message",
    bucket: "Don't Lose",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-051",
    name: "Summary Extraction for Initial BluePrint Messaging",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-052",
    name: "Email Parsing and Normalization",
    bucket: "Make",
    agentType: "DeepRecon",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-053",
    name: "Ingestion of and Execution of Blueprint",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-054",
    name: "Classification of Email Message",
    bucket: "Make",
    agentType: "DeepRecon",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-055",
    name: "Determination of Follow-on Process from Request",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-056",
    name: "Link to follow on Action (Agent/ API Call / Email Response)",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-057",
    name: "Plan to generate Outcome from data",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-058",
    name: "Call System for Additional Required Data (Form Message / Send / Receive) to generate Work Item",
    bucket: "Make",
    agentType: "DeepRecon",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-059",
    name: "Document Parser to identify multiple docs in a single file from Financial Services Content",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-060",
    name: "Deep Content Extraction - Implementation of F-001 in ARTEMIS",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-061",
    name: "Application of Business Logic from Process Map",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-062",
    name: "Reconciliation across all sources to find internal mismatches primarily system to content",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-064",
    name: "Capture HITL feedback for extraction",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-065",
    name: "Capture HITL feedback to correct outcome",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-066",
    name: "Incorporate HITL feedback to adjust outcome",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-067",
    name: "Incorporate HITL feedback to adjust business logic and update blueprint",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-068",
    name: "Highlight exceptions per checklist item (Missing Document, Missing Extracted term, Break, Flag for followup, Pending user feedback, pending other agent, Pending system)",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-069",
    name: "Summary of Agent's work including version of Agent, model, logic",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-070",
    name: "Generate and transmit system updates and payloads",
    bucket: "Make",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-071",
    name: "Track success of messages both outgoing and expected responses",
    bucket: "Don't Lose",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-072",
    name: "Incorporates incoming messages and routes them for email responses",
    bucket: "Make",
    agentType: "DeepRecon",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-074",
    name: "DeepGraph which captures all knowledge associated with these work items to feed insights and better response",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-075",
    name: "DeepGraph Suggestions",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-076",
    name: "DeepPilot - Dashboards",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "NEXT",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-077",
    name: "Ability to Create on demand Dashboards from DeepSee Information Graph",
    bucket: "Don't Lose",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-078",
    name: "Web Scraping Tool (Includes Login, Access Data, Structuring, and Use in Work item)",
    bucket: "Make",
    agentType: "DeepPilot",
    category: "Platform Improvements",
    quarter: "LATER",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-079",
    name: "Agent Library and BluePrint Selection (Includes Categories,Terms, Schema, Checklist Items)",
    bucket: "Innovation",
    agentType: "Platform (All Agents)",
    category: "Platform Improvements",
    quarter: "NOW",
    replicability: 5,
    primaryClient: "All",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  },
  {
    id: "F-080",
    name: "Watchtower News Feed v1",
    bucket: "Innovation",
    agentType: "WATCHTOWER",
    category: "Client-Specific Work",
    quarter: "NEXT",
    replicability: 1,
    primaryClient: "Altaira",
    additionalClients: "",
    effortSize: "",
    priorityTier: "Tier 4: Backlog",
    artemis: "Unknown",
    prdStatus: "Not Started",
    epicInJira: "No"
  }
];

// BUCKET CONFIGURATION - Colors and labels for each strategic bucket
export const BUCKET_CONFIG = {
  'Make': {
    label: 'Make Money',
    question: 'How do we make money?',
    description: 'Revenue-generating client activities, new contracts',
    color: '#28a745',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-500'
  },
  "Don't Lose": {
    label: "Don't Lose Money",
    question: 'How do we not lose money?',
    description: 'Speed improvements, retention, client risk mitigation',
    color: '#ffc107',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500'
  },
  'Innovation': {
    label: 'Innovation',
    question: 'How do we keep competitive advantage?',
    description: 'Information graph, blueprint, cross-platform capabilities',
    color: '#007bff',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500'
  }
};

// BUCKET SUMMARY
export const BUCKET_SUMMARY = {
  Make: 45,
  Innovation: 17,
  "Don't Lose": 12
};

// QUARTER SUMMARY
export const QUARTER_SUMMARY = {
  NOW: 40,
  NEXT: 22,
  LATER: 12
};

// AGENT TYPE SUMMARY
export const AGENT_TYPE_SUMMARY = {
  "Platform (All Agents)": 31,
  "Platform (Analytics)": 10,
  "DeepPilot": 6,
  "DeepRecon": 5,
  "Email Automation": 4,
  "Core Reconciliation": 4,
  "Trade Processing": 4,
  "Matching Engine": 3,
  "Security Settlements": 2,
  "Standing Settlement Instructions": 2,
  "HMDA / CRA": 1,
  "Loan Operations": 1,
  "WATCHTOWER": 1
};

// Dynamic bucket stats calculation
export function getBucketStats() {
  const stats = {
    'Make': { count: 0, complete: 0, inProgress: 0, notStarted: 0 },
    "Don't Lose": { count: 0, complete: 0, inProgress: 0, notStarted: 0 },
    'Innovation': { count: 0, complete: 0, inProgress: 0, notStarted: 0 }
  };
  
  masterFeaturesData.forEach(f => {
    stats[f.bucket].count++;
    if (f.prdStatus === 'Complete') stats[f.bucket].complete++;
    else if (f.prdStatus === 'In Progress') stats[f.bucket].inProgress++;
    else stats[f.bucket].notStarted++;
  });
  
  const total = masterFeaturesData.length;
  
  return {
    total,
    make: { ...stats['Make'], pct: Math.round((stats['Make'].count / total) * 100) },
    dontLose: { ...stats["Don't Lose"], pct: Math.round((stats["Don't Lose"].count / total) * 100) },
    innovation: { ...stats['Innovation'], pct: Math.round((stats['Innovation'].count / total) * 100) },
    raw: stats
  };
}

// Dynamic quarter stats calculation
export function getQuarterStats() {
  const stats = {
    'NOW': { count: 0, complete: 0, inProgress: 0, notStarted: 0 },
    'NEXT': { count: 0, complete: 0, inProgress: 0, notStarted: 0 },
    'LATER': { count: 0, complete: 0, inProgress: 0, notStarted: 0 }
  };
  
  masterFeaturesData.forEach(f => {
    stats[f.quarter].count++;
    if (f.prdStatus === 'Complete') stats[f.quarter].complete++;
    else if (f.prdStatus === 'In Progress') stats[f.quarter].inProgress++;
    else stats[f.quarter].notStarted++;
  });
  
  const total = masterFeaturesData.length;
  
  return {
    total,
    now: { ...stats['NOW'], pct: Math.round((stats['NOW'].count / total) * 100) },
    next: { ...stats['NEXT'], pct: Math.round((stats['NEXT'].count / total) * 100) },
    later: { ...stats['LATER'], pct: Math.round((stats['LATER'].count / total) * 100) },
    raw: stats
  };
}

// Get PRD status statistics
export function getPrdStatusStats() {
  const stats = { complete: 0, inProgress: 0, notStarted: 0 };
  
  masterFeaturesData.forEach(f => {
    if (f.prdStatus === 'Complete') stats.complete++;
    else if (f.prdStatus === 'In Progress') stats.inProgress++;
    else stats.notStarted++;
  });
  
  return stats;
}

// Get agent type statistics
export function getAgentTypeStats() {
  const stats: Record<string, number> = {};
  masterFeaturesData.forEach(f => {
    stats[f.agentType] = (stats[f.agentType] || 0) + 1;
  });
  return Object.entries(stats).sort((a, b) => b[1] - a[1]);
}

// Get category statistics
export function getCategoryStats() {
  const stats: Record<string, number> = {};
  masterFeaturesData.forEach(f => {
    stats[f.category] = (stats[f.category] || 0) + 1;
  });
  return Object.entries(stats).sort((a, b) => b[1] - a[1]);
}

// Get features by bucket
export function getFeaturesByBucket(bucket: Bucket) {
  return masterFeaturesData.filter(f => f.bucket === bucket);
}

// Get features by quarter
export function getFeaturesByQuarter(quarter: Quarter) {
  return masterFeaturesData.filter(f => f.quarter === quarter);
}

// Get Tier 0 features (emergency)
export function getTier0Features() {
  return masterFeaturesData.filter(f => f.priorityTier === 'Tier 0: Emergency');
}

// Get Tier 1 features (fast track)
export function getTier1Features() {
  return masterFeaturesData.filter(f => f.priorityTier === 'Tier 1: Fast Track');
}

// Get roadmap progress by quarter
export function getRoadmapProgress() {
  const quarters: Quarter[] = ['NOW', 'NEXT', 'LATER'];
  
  const result: Record<Quarter, {
    quarter: Quarter;
    total: number;
    complete: number;
    inProgress: number;
    notStarted: number;
    blocked: number;
    completePct: number;
    planned: number;
    delivered: number;
  }> = {} as any;
  
  quarters.forEach(quarter => {
    const features = masterFeaturesData.filter(f => f.quarter === quarter);
    const complete = features.filter(f => f.prdStatus === 'Complete').length;
    const inProgress = features.filter(f => f.prdStatus === 'In Progress').length;
    const notStarted = features.filter(f => f.prdStatus === 'Not Started').length;
    const total = features.length;
    
    result[quarter] = {
      quarter,
      total,
      complete,
      inProgress,
      notStarted,
      blocked: 0,
      completePct: total > 0 ? Math.round((complete / total) * 100) : 0,
      planned: total,
      delivered: complete
    };
  });
  
  return result;
}

// Get agent type distribution
export function getAgentDistribution() {
  const distribution: Record<string, { count: number; byBucket: Record<Bucket, number> }> = {};
  
  masterFeaturesData.forEach(f => {
    if (!distribution[f.agentType]) {
      distribution[f.agentType] = { count: 0, byBucket: { 'Make': 0, "Don't Lose": 0, 'Innovation': 0 } };
    }
    distribution[f.agentType].count++;
    distribution[f.agentType].byBucket[f.bucket]++;
  });
  
  return Object.entries(distribution)
    .map(([agent, data]) => ({
      agent,
      count: data.count,
      make: data.byBucket['Make'],
      dontLose: data.byBucket["Don't Lose"],
      innovation: data.byBucket['Innovation']
    }))
    .sort((a, b) => b.count - a.count);
}

// Get client distribution
export function getClientDistribution() {
  const clients: Record<string, { count: number; byBucket: Record<Bucket, number> }> = {};
  
  masterFeaturesData.forEach(f => {
    const client = f.primaryClient || 'Unspecified';
    if (!clients[client]) {
      clients[client] = { count: 0, byBucket: { 'Make': 0, "Don't Lose": 0, 'Innovation': 0 } };
    }
    clients[client].count++;
    clients[client].byBucket[f.bucket]++;
  });
  
  return Object.entries(clients)
    .map(([client, data]) => ({
      client,
      count: data.count,
      make: data.byBucket['Make'],
      dontLose: data.byBucket["Don't Lose"],
      innovation: data.byBucket['Innovation']
    }))
    .sort((a, b) => b.count - a.count);
}

// Get total ARR at risk from Don't Lose bucket
export function getTotalARRAtRisk() {
  return masterFeaturesData
    .filter(f => f.bucket === "Don't Lose")
    .reduce((sum, f) => sum + (f.arr_at_risk || 0), 0);
}

export default masterFeaturesData;
