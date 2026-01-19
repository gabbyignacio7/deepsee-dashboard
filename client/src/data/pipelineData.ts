// Pipeline Data - Updated January 18, 2026
// Source: Monday.com CRM

export const PIPELINE_EXTRACTION_DATE = "2026-01-18T18:59:00-07:00";

export interface PipelineMetrics {
  total: number;
  weighted: number;
  dealCount: number;
  avgDealSize: number;
  q1Closing: number;
  existingCustomerARR: number;
}

export const pipelineMetrics: PipelineMetrics = {
  total: 11250000,        // $11.25M
  weighted: 1659050,      // $1.66M
  dealCount: 89,
  avgDealSize: 126404,    // ~$126K
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
    total: 530000,         // +$530K
    totalPct: 4.9,
    weighted: 49050,       // +$50K
    weightedPct: 3.1,
    dealCount: 5
  }
};
