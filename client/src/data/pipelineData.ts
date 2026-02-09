// Pipeline Data - Updated February 9, 2026
// Source: Monday.com CRM

export const PIPELINE_EXTRACTION_DATE = "2026-02-09T10:14:00-07:00";

export interface PipelineMetrics {
  total: number;
  weighted: number;
  dealCount: number;
  avgDealSize: number;
  q1Closing: number;
  existingCustomerARR: number;
}

export const pipelineMetrics: PipelineMetrics = {
  total: 13949000,        // $13.95M - Updated Feb 9
  weighted: 1837050,      // $1.84M - Updated Feb 9
  dealCount: 98,          // 98 active deals
  avgDealSize: 206000,    // ~$206K
  q1Closing: 2541300,     // $2.54M weighted
  existingCustomerARR: 990000  // $990K
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
