// Dashboard data freshness timestamp
// Updated: February 9, 2026 at 10:14 AM MT

export const dataTimestamp = {
  extracted: "February 9, 2026 at 10:14 AM MT",
  isoTimestamp: "2026-02-09T10:14:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-02-09T10:14:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "February 9, 2026 at 10:14 AM MT";

// Hardcoded to prevent formatting issues
export function formatDataTimestamp(): string {
  return "February 9, 2026, 10:14 AM MT";
}
