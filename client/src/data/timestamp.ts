// Dashboard data freshness timestamp
// Updated: February 13, 2026 at 4:00 PM MT

export const dataTimestamp = {
  extracted: "February 13, 2026 at 4:00 PM MT",
  isoTimestamp: "2026-02-13T16:00:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-02-13T16:00:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "February 13, 2026 at 4:00 PM MT";

// Hardcoded to prevent formatting issues
export function formatDataTimestamp(): string {
  return "February 13, 2026, 4:00 PM MT";
}
