#!/usr/bin/env python3
"""
Orphan Ticket Detection & Reconciliation Script
Compares live JIRA data against what the dashboard currently shows.
Ryan's key requirement: detect tickets that have been deleted, completed, reassigned, or had status changes.
"""

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
CLIENT_DATA_DIR = REPO_ROOT / "client" / "src" / "data"
ENV_PATH = SCRIPT_DIR / ".env"
OUTPUT_DIR = SCRIPT_DIR / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

def load_env():
    env = {}
    if ENV_PATH.exists():
        for line in ENV_PATH.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env

ENV = load_env()
BASE_URL = ENV.get("JIRA_BASE_URL", "https://deepsee.atlassian.net")
EMAIL = ENV.get("JIRA_EMAIL", "")
API_TOKEN = ENV.get("JIRA_API_TOKEN", "")
AUTH = (EMAIL, API_TOKEN)
HEADERS = {"Accept": "application/json"}

# JIRA ticket key pattern (e.g., BACK-1234, UI-567, SC-89)
TICKET_PATTERN = re.compile(r'\b([A-Z]{2,10}-\d{1,5})\b')

# ---------------------------------------------------------------------------
# Step 1: Parse Dashboard Data Files for Ticket Keys
# ---------------------------------------------------------------------------

def extract_tickets_from_file(filepath):
    """Extract all JIRA ticket keys from a TypeScript data file."""
    if not filepath.exists():
        return set()
    content = filepath.read_text(encoding="utf-8", errors="ignore")
    return set(TICKET_PATTERN.findall(content))


def collect_dashboard_tickets():
    """Scan all relevant dashboard data files for ticket references."""
    files_to_scan = [
        "sprintData.ts",
        "engineerAllocationData.ts",
        "blockedItemsData.ts",
        "artemisData.ts",
        "agenticPlatformData.ts",
        "engineerCapacityData.ts",
        "workMixData.ts",
        "sprintHealthData.ts",
        "jiraMetrics.ts",
        "sprintAllocationData.ts",
        "artemisFoundationData.ts",
        "sprint1Data.ts",
        "sprint2Data.ts",
        "sprint3Data.ts",
    ]

    all_tickets = {}
    for fname in files_to_scan:
        fpath = CLIENT_DATA_DIR / fname
        tickets = extract_tickets_from_file(fpath)
        if tickets:
            print(f"  {fname}: {len(tickets)} ticket keys")
            for t in tickets:
                if t not in all_tickets:
                    all_tickets[t] = []
                all_tickets[t].append(fname)

    return all_tickets


def extract_dashboard_status_info():
    """Try to extract status and assignee info from dashboard data files for comparison."""
    info = {}
    # Try to parse engineerAllocationData for status + assignee
    alloc_path = CLIENT_DATA_DIR / "engineerAllocationData.ts"
    if alloc_path.exists():
        content = alloc_path.read_text(encoding="utf-8", errors="ignore")
        # Look for patterns like: id: "BACK-1234" ... status: "In Progress" ... and engineer names
        # This is a best-effort parse of TypeScript objects
        blocks = re.split(r'\{', content)
        for block in blocks:
            keys = TICKET_PATTERN.findall(block)
            if not keys:
                continue
            key = keys[0]
            status_match = re.search(r'status:\s*["\']([^"\']+)["\']', block)
            status = status_match.group(1) if status_match else ""
            # Look for assignee in surrounding context
            if key not in info:
                info[key] = {"status": status, "assignee": "", "source": "engineerAllocationData.ts"}

    # Try blockedItemsData
    blocked_path = CLIENT_DATA_DIR / "blockedItemsData.ts"
    if blocked_path.exists():
        content = blocked_path.read_text(encoding="utf-8", errors="ignore")
        blocks = re.split(r'\{', content)
        for block in blocks:
            keys = TICKET_PATTERN.findall(block)
            if not keys:
                continue
            key = keys[0]
            assignee_match = re.search(r'assignee:\s*["\']([^"\']+)["\']', block)
            if key not in info:
                info[key] = {"status": "Blocked", "assignee": "", "source": "blockedItemsData.ts"}
            if assignee_match:
                info[key]["assignee"] = assignee_match.group(1)

    return info

# ---------------------------------------------------------------------------
# Step 2: Query JIRA for Each Ticket
# ---------------------------------------------------------------------------

def jira_search_batch(ticket_keys):
    """Query JIRA for a batch of ticket keys (max ~50 per query)."""
    results = {}
    # Batch in groups of 50
    keys_list = list(ticket_keys)
    for i in range(0, len(keys_list), 50):
        batch = keys_list[i:i+50]
        jql = f"key in ({','.join(batch)}) ORDER BY key ASC"
        url = f"{BASE_URL}/rest/api/3/search/jql"
        params = {
            "jql": jql,
            "maxResults": 50,
            "fields": "summary,status,assignee,project,updated",
        }
        try:
            resp = requests.get(url, auth=AUTH, headers=HEADERS, params=params)
            resp.raise_for_status()
            data = resp.json()
            for issue in data.get("issues", []):
                key = issue["key"]
                f = issue.get("fields", {})
                assignee = f.get("assignee")
                results[key] = {
                    "key": key,
                    "summary": f.get("summary", ""),
                    "status": (f.get("status") or {}).get("name", "Unknown"),
                    "assignee": assignee.get("displayName", "Unassigned") if assignee else "Unassigned",
                    "project": (f.get("project") or {}).get("key", ""),
                    "updated": f.get("updated", ""),
                    "exists": True,
                }
        except Exception as e:
            print(f"  [WARN] Batch query failed: {e}")
            # Mark all in batch as unknown
            for key in batch:
                if key not in results:
                    results[key] = {"key": key, "exists": False, "error": str(e)}

    return results

# ---------------------------------------------------------------------------
# Step 3: Classify Each Ticket
# ---------------------------------------------------------------------------

def classify_tickets(dashboard_tickets, jira_data, dashboard_info):
    """Classify each dashboard ticket against live JIRA data."""
    active = []
    completed = []
    orphans = []
    status_changed = []
    reassigned = []

    for key, sources in dashboard_tickets.items():
        jira = jira_data.get(key)
        dash = dashboard_info.get(key, {})

        if jira is None or not jira.get("exists", False):
            orphans.append({
                "key": key,
                "sources": sources,
                "lastKnownStatus": dash.get("status", "Unknown"),
                "lastKnownAssignee": dash.get("assignee", "Unknown"),
                "orphanType": "deleted",
                "recommendation": "Remove from dashboard",
            })
            continue

        jira_status = jira.get("status", "Unknown")
        jira_assignee = jira.get("assignee", "Unassigned")
        dash_status = dash.get("status", "")
        dash_assignee = dash.get("assignee", "")

        if jira_status in ("Done", "Canceled", "Cancelled"):
            completed.append({
                "key": key,
                "summary": jira.get("summary", ""),
                "jiraStatus": jira_status,
                "dashboardStatus": dash_status,
                "assignee": jira_assignee,
                "sources": sources,
                "orphanType": "completed",
                "recommendation": f"Update to {jira_status}" if dash_status and dash_status != jira_status else "Mark as completed",
            })
        elif dash_status and dash_status != jira_status:
            status_changed.append({
                "key": key,
                "summary": jira.get("summary", ""),
                "dashboardStatus": dash_status,
                "jiraStatus": jira_status,
                "assignee": jira_assignee,
                "sources": sources,
                "orphanType": "status_changed",
                "recommendation": f"Update status: {dash_status} -> {jira_status}",
            })
        elif dash_assignee and dash_assignee != jira_assignee and dash_assignee != "Unknown":
            reassigned.append({
                "key": key,
                "summary": jira.get("summary", ""),
                "dashboardAssignee": dash_assignee,
                "jiraAssignee": jira_assignee,
                "status": jira_status,
                "sources": sources,
                "orphanType": "reassigned",
                "recommendation": f"Update assignee: {dash_assignee} -> {jira_assignee}",
            })
        else:
            active.append({
                "key": key,
                "summary": jira.get("summary", ""),
                "status": jira_status,
                "assignee": jira_assignee,
            })

    return {
        "active": active,
        "completed": completed,
        "orphans": orphans,
        "statusChanged": status_changed,
        "reassigned": reassigned,
    }

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_reconciliation():
    """Run orphan detection and reconciliation."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    print("=" * 60)
    print(f"TICKET RECONCILIATION -- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # Step 1: Collect all ticket keys from dashboard
    print("\n[1/4] Scanning dashboard data files for ticket keys...")
    dashboard_tickets = collect_dashboard_tickets()
    total_keys = len(dashboard_tickets)
    print(f"  -> {total_keys} unique ticket keys found across dashboard")

    if total_keys == 0:
        print("[WARN] No ticket keys found in dashboard data files. Nothing to reconcile.")
        return

    # Also extract status/assignee info for comparison
    dashboard_info = extract_dashboard_status_info()
    print(f"  -> {len(dashboard_info)} tickets with status/assignee info")

    # Step 2: Query JIRA
    print(f"\n[2/4] Querying JIRA for {total_keys} tickets...")
    jira_data = jira_search_batch(dashboard_tickets.keys())
    found = sum(1 for v in jira_data.values() if v.get("exists", False))
    not_found = total_keys - found
    print(f"  -> Found in JIRA: {found} | Not found: {not_found}")

    # Step 3: Safety check (Ryan's concern)
    orphan_pct = (not_found / total_keys * 100) if total_keys > 0 else 0
    if orphan_pct > 50:
        print(f"\n{'!'*60}")
        print(f"SAFETY ABORT: {orphan_pct:.1f}% of dashboard tickets ({not_found}/{total_keys}) are orphans!")
        print("This likely indicates an API error, not mass deletion.")
        print("Review manually before proceeding.")
        print(f"{'!'*60}")
        # Still write the report but with safety warning
        safety_abort = True
    else:
        safety_abort = False

    # Step 4: Classify
    print(f"\n[3/4] Classifying tickets...")
    results = classify_tickets(dashboard_tickets, jira_data, dashboard_info)
    print(f"  Active (no changes): {len(results['active'])}")
    print(f"  Completed (Done/Canceled in JIRA): {len(results['completed'])}")
    print(f"  Orphans (deleted from JIRA): {len(results['orphans'])}")
    print(f"  Status changed: {len(results['statusChanged'])}")
    print(f"  Reassigned: {len(results['reassigned'])}")

    # Step 5: Write output
    print(f"\n[4/4] Writing reports...")
    output = {
        "reconciliationTimestamp": datetime.now(timezone.utc).isoformat(),
        "safetyAbort": safety_abort,
        "summary": {
            "totalDashboardTickets": total_keys,
            "active": len(results["active"]),
            "completed": len(results["completed"]),
            "orphans": len(results["orphans"]),
            "statusChanged": len(results["statusChanged"]),
            "reassigned": len(results["reassigned"]),
        },
        "results": results,
    }

    json_path = OUTPUT_DIR / f"reconciliation_{timestamp}.json"
    json_path.write_text(json.dumps(output, indent=2, default=str))
    latest_json = OUTPUT_DIR / "reconciliation_latest.json"
    latest_json.write_text(json.dumps(output, indent=2, default=str))
    print(f"  [JSON] {json_path}")

    txt_path = OUTPUT_DIR / f"reconciliation_{timestamp}.txt"
    txt_lines = generate_text_report(output)
    txt_path.write_text("\n".join(txt_lines))
    latest_txt = OUTPUT_DIR / "reconciliation_latest.txt"
    latest_txt.write_text("\n".join(txt_lines))
    print(f"  [TXT]  {txt_path}")

    return output


def generate_text_report(data):
    """Generate human-readable reconciliation report."""
    lines = []
    lines.append("=" * 70)
    lines.append(f"TICKET RECONCILIATION REPORT -- {data['reconciliationTimestamp']}")
    lines.append("=" * 70)

    if data.get("safetyAbort"):
        lines.append("")
        lines.append("!!! SAFETY WARNING !!!")
        lines.append("More than 50% of dashboard tickets flagged as orphans.")
        lines.append("This likely indicates an API error, not mass deletion.")
        lines.append("Review manually before making any dashboard changes.")
        lines.append("")

    s = data["summary"]
    lines.append(f"\nSUMMARY:")
    lines.append(f"  Total dashboard tickets scanned: {s['totalDashboardTickets']}")
    lines.append(f"  ACTIVE (no changes needed): {s['active']}")
    lines.append(f"  COMPLETED (Done/Canceled in JIRA): {s['completed']}")
    lines.append(f"  ORPHAN (deleted from JIRA): {s['orphans']}")
    lines.append(f"  STATUS CHANGED (dashboard shows different status): {s['statusChanged']}")
    lines.append(f"  REASSIGNED (dashboard shows different assignee): {s['reassigned']}")

    r = data["results"]

    if r["orphans"]:
        lines.append(f"\nORPHAN TICKETS ({len(r['orphans'])}):")
        for t in sorted(r["orphans"], key=lambda x: x["key"]):
            lines.append(f"  {t['key']}: last status={t['lastKnownStatus']} -- RECOMMEND: {t['recommendation']}")
            lines.append(f"    Found in: {', '.join(t['sources'])}")

    if r["completed"]:
        lines.append(f"\nCOMPLETED TICKETS ({len(r['completed'])}):")
        for t in sorted(r["completed"], key=lambda x: x["key"]):
            lines.append(f"  {t['key']}: {t['summary'][:60]}")
            lines.append(f"    JIRA={t['jiraStatus']}, Dashboard={t['dashboardStatus'] or 'N/A'} -- RECOMMEND: {t['recommendation']}")

    if r["statusChanged"]:
        lines.append(f"\nSTATUS CHANGES ({len(r['statusChanged'])}):")
        for t in sorted(r["statusChanged"], key=lambda x: x["key"]):
            lines.append(f"  {t['key']}: {t['summary'][:60]}")
            lines.append(f"    Dashboard={t['dashboardStatus']} -> JIRA={t['jiraStatus']} -- RECOMMEND: {t['recommendation']}")

    if r["reassigned"]:
        lines.append(f"\nREASSIGNED ({len(r['reassigned'])}):")
        for t in sorted(r["reassigned"], key=lambda x: x["key"]):
            lines.append(f"  {t['key']}: {t['summary'][:60]}")
            lines.append(f"    Dashboard={t['dashboardAssignee']} -> JIRA={t['jiraAssignee']} -- RECOMMEND: {t['recommendation']}")

    lines.append("\n" + "=" * 70)
    lines.append("END OF RECONCILIATION REPORT")
    return lines


if __name__ == "__main__":
    run_reconciliation()
