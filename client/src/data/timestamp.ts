// Dashboard data freshness timestamp
// Updated: February 1, 2026 at 7:30 PM MT
export const dataTimestamp = {
  extracted: "February 1, 2026 at 7:30 PM MT",
  isoTimestamp: "2026-02-01T19:30:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-02-01T19:30:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "February 1, 2026 at 7:30 PM MT";

// Format timestamp for display - always show MT timezone
export function formatDataTimestamp(isoString: string = EXTRACTION_TIMESTAMP): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Denver'
  }) + ' MT';
}
