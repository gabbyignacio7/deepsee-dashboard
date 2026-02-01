// Dashboard data freshness timestamp
// Updated: January 28, 2026 at 12:00 PM MT
export const dataTimestamp = {
  extracted: "January 28, 2026 at 12:00 PM MT",
  isoTimestamp: "2026-01-28T12:00:00-07:00",
  sources: {
    jira: "DeepSee JIRA (deepsee.atlassian.net)",
    monday: "DeepSee Monday.com CRM"
  }
};

export const EXTRACTION_TIMESTAMP = "2026-01-28T12:00:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";
export const LAST_UPDATED = "January 28, 2026 at 12:00 PM MT";

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
