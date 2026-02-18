// Dashboard data freshness timestamp
// Updated: February 18, 2026 at 5:00 PM MT

export const dataTimestamp = {
  extracted: "February 18, 2026 at 5:00 PM MT",
  isoTimestamp: "2026-02-18T17:00:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-02-18T17:00:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "February 18, 2026 at 5:00 PM MT";

// Hardcoded to prevent formatting issues
export function formatDataTimestamp(): string {
  return "February 18, 2026, 5:00 PM MT";
}
