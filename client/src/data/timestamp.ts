// Dashboard data freshness timestamp
// Updated: February 25, 2026 at 8:28 AM MT

export const dataTimestamp = {
  extracted: "February 25, 2026 at 8:28 AM MT",
  isoTimestamp: "2026-02-25T08:28:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-02-25T08:28:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "February 25, 2026 at 8:28 AM MT";

// Hardcoded to prevent formatting issues
export function formatDataTimestamp(): string {
  return "February 25, 2026, 8:28 AM MT";
}
