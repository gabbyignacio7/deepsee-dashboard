// Client Tracker Data - Updated February 9, 2026
// Source: Monday.com PoV & Client Tracker Board
// Board URL: https://deepsee-squad.monday.com/boards/18396374043

export type ClientType = 'FMI' | 'Bank' | 'Cap Markets';
export type ClientStage =
  | 'Discovery'
  | 'PoV - Discovery'
  | 'PoV - Doc/Data Ingestion'
  | 'PoV - Testing'
  | 'PoV - Sign Off'
  | 'Implementation - Discovery'
  | 'Implementation - Doc/Data Ingestion'
  | 'Implementation - Testing'
  | 'Live'
  | 'Churned';

export type AgentUseCase =
  | 'DIY'
  | 'Email Process Auto'
  | 'SSI'
  | 'Loan Ops'
  | 'HMDA/CRA'
  | 'Trade Recon';

export interface LiveClient {
  name: string;
  type: ClientType;
  agentUseCase: AgentUseCase;
  arr: number;
  stage: ClientStage;
  goLiveDate?: string;
}

export interface ImplementationClient {
  name: string;
  type: ClientType;
  agentUseCase: AgentUseCase;
  stage: ClientStage;
  expectedArr?: number;
}

export interface ActivePoV {
  name: string;
  type: ClientType;
  agentUseCase: AgentUseCase;
  stage: ClientStage;
  expectedCloseDate?: string;
}

// Live Clients - 6 total
export const liveClients: LiveClient[] = [
  {
    name: "BetaNXT - UI",
    type: "FMI",
    agentUseCase: "DIY",
    arr: 90000,
    stage: "Live"
  },
  {
    name: "Altaira",
    type: "FMI",
    agentUseCase: "Email Process Auto",
    arr: 150000,
    stage: "Live"
  },
  {
    name: "Accenture",
    type: "FMI",
    agentUseCase: "Email Process Auto",
    arr: 225000,
    stage: "Live"
  },
  {
    name: "DTCC",
    type: "FMI",
    agentUseCase: "SSI",
    arr: 416200,
    stage: "Live"
  },
  {
    name: "Vantage Bank Texas",
    type: "Bank",
    agentUseCase: "Loan Ops",
    arr: 50000,
    stage: "Live"
  },
  {
    name: "Colony Bank",
    type: "Bank",
    agentUseCase: "HMDA/CRA",
    arr: 59000,
    stage: "Live"
  }
];

// In Implementation - 3 total
export const implementationClients: ImplementationClient[] = [
  {
    name: "BetaNxt",
    type: "FMI",
    agentUseCase: "Email Process Auto",
    stage: "Implementation - Discovery"
  },
  {
    name: "Wells Fargo",
    type: "FMI",
    agentUseCase: "SSI",
    stage: "Implementation - Doc/Data Ingestion"
  },
  {
    name: "BBVA",
    type: "Cap Markets",
    agentUseCase: "Email Process Auto",
    stage: "Implementation - Testing"
  }
];

// Active PoVs - 5 total
export const activePoVs: ActivePoV[] = [
  {
    name: "Raymond James",
    type: "Cap Markets",
    agentUseCase: "Trade Recon",
    stage: "PoV - Testing"
  },
  {
    name: "M1 Financial",
    type: "Bank",
    agentUseCase: "Loan Ops",
    stage: "PoV - Discovery"
  },
  {
    name: "Customers Bank",
    type: "Bank",
    agentUseCase: "Loan Ops",
    stage: "PoV - Discovery"
  },
  {
    name: "Chicago Trading Company",
    type: "Cap Markets",
    agentUseCase: "Email Process Auto",
    stage: "PoV - Sign Off"
  },
  {
    name: "Avaloq",
    type: "FMI",
    agentUseCase: "Email Process Auto",
    stage: "PoV - Testing"
  }
];

// Pipeline Summary
export const pipelineSummary = {
  liveClients: 6,
  inImplementation: 3,
  activePoVs: 5,
  churnedInactive: 0,
  totalLiveArr: 990200,
  dataRefreshDate: "2026-01-20",
  mondayBoardUrl: "https://deepsee-squad.monday.com/boards/18396374043"
};

// Helper Functions
export function getTotalLiveArr(): number {
  return liveClients.reduce((sum, client) => sum + client.arr, 0);
}

export function getClientsByType(type: ClientType): LiveClient[] {
  return liveClients.filter(client => client.type === type);
}

export function getClientsByStage(stage: ClientStage): (LiveClient | ImplementationClient | ActivePoV)[] {
  const all = [...liveClients, ...implementationClients, ...activePoVs];
  return all.filter(client => client.stage === stage);
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

// Get pipeline data for dashboard display
export function getPipelineChartData() {
  return [
    { name: "Live Clients", count: pipelineSummary.liveClients, color: "#10B981" },
    { name: "In Implementation", count: pipelineSummary.inImplementation, color: "#3B82F6" },
    { name: "Active PoVs", count: pipelineSummary.activePoVs, color: "#F59E0B" },
    { name: "Churned/Inactive", count: pipelineSummary.churnedInactive, color: "#6B7280" }
  ];
}

// Get ARR breakdown by client type
export function getArrByClientType() {
  const fmi = liveClients.filter(c => c.type === "FMI").reduce((sum, c) => sum + c.arr, 0);
  const bank = liveClients.filter(c => c.type === "Bank").reduce((sum, c) => sum + c.arr, 0);
  const capMarkets = liveClients.filter(c => c.type === "Cap Markets").reduce((sum, c) => sum + c.arr, 0);

  return [
    { type: "FMI", arr: fmi, percentage: Math.round((fmi / pipelineSummary.totalLiveArr) * 100) },
    { type: "Bank", arr: bank, percentage: Math.round((bank / pipelineSummary.totalLiveArr) * 100) },
    { type: "Cap Markets", arr: capMarkets, percentage: Math.round((capMarkets / pipelineSummary.totalLiveArr) * 100) }
  ];
}
