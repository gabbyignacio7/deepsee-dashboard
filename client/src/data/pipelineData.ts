// Pipeline Data - Updated February 3, 2026
// Source: Monday.com CRM

export const PIPELINE_EXTRACTION_DATE = "2026-02-03T15:00:00-07:00";

export interface PipelineMetrics {
  total: number;
  weighted: number;
  dealCount: number;
  avgDealSize: number;
  q1Closing: number;
  existingCustomerARR: number;
}

export const pipelineMetrics: PipelineMetrics = {
  total: 11180000,        // $11.18M - Updated Feb 3
  weighted: 1700000,      // $1.7M - Updated Feb 3
  dealCount: 55,          // 55+ accounts
  avgDealSize: 203272,    // ~$203K
  q1Closing: 1183850,     // $1.18M weighted
  existingCustomerARR: 990200  // $990K
};

export const pipelineComparison = {
  baseline: {
    date: "2026-01-11",
    total: 10720000,
    weighted: 1610000,
    dealCount: 84
  },
  change: {
    total: 460000,         // +$460K
    totalPct: 4.3,
    weighted: 90000,       // +$90K
    weightedPct: 5.6,
    dealCount: -29         // Net reduction (consolidated accounts)
  }
};
