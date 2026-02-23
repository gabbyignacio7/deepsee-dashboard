#!/usr/bin/env python3
"""
JIRA API Extraction Script for DeepSee Dashboard
Extracts sprint data, engineer capacity, blocked items, work mix, and health metrics.
"""

import json
import os
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
ENV_PATH = SCRIPT_DIR / ".env"
OUTPUT_DIR = SCRIPT_DIR / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

def load_env():
    """Load .env file into a dict."""
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

ROSTER = [
    "Lane Terry", "Jeff Hegerhorst", "Chad Hegerhorst", "Ivan Peev",
    "Darius Ouderkirk", "Kannal Mutharasu", "Kalvin Willison",
    "Aleksander Winski", "Owen Riley", "Matthew Snow", "Treven Trujillo",
    "Konnor Willison", "Loris D'Acunto", "Karolina Toman",
]
NON_ROSTER = ["Brandon Baguley"]
ALL_ENGINEERS = ROSTER + NON_ROSTER

# Story point custom field – discovered dynamically in discover_story_point_field()
STORY_POINT_FIELD = "customfield_10016"

# Client keywords for work mix categorisation
CLIENT_KEYWORDS = [
    "colony", "broadridge", "dtcc", "ctc", "bbva", "sunwest", "accenture", "jp morgan",
]
ARTEMIS_KEYWORDS = [
    "artemis", "platform", "agentic", "blueprint", "deepiq", "deepgraph", "mercury hitl",
]
INFRA_KEYWORDS = [
    "ci/cd", "pipeline", "deploy", "ssl", "security", "devops", "azdo",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def jira_get(path, params=None):
    """GET request against JIRA REST API with auth."""
    url = f"{BASE_URL}{path}"
    resp = requests.get(url, auth=AUTH, headers=HEADERS, params=params)
    resp.raise_for_status()
    return resp.json()


def jira_search(jql, fields=None, max_results=100):
    """Run a JQL search with auto-pagination using the new /search/jql endpoint.

    Atlassian removed GET /rest/api/3/search (returns 410 Gone) as of mid-2025.
    The replacement is GET /rest/api/3/search/jql which uses token-based pagination
    via ``nextPageToken`` instead of ``startAt``.
    """
    if fields is None:
        fields = "summary,status,assignee,priority,issuetype,project,labels,created,updated,resolutiondate,parent," + STORY_POINT_FIELD
    all_issues = []
    next_page_token = None
    while True:
        params = {
            "jql": jql,
            "maxResults": max_results,
            "fields": fields,
        }
        if next_page_token is not None:
            params["nextPageToken"] = next_page_token
        data = jira_get("/rest/api/3/search/jql", params=params)
        issues = data.get("issues", [])
        all_issues.extend(issues)
        # The new endpoint signals the last page via the absence of nextPageToken
        # or by setting isLast to True.
        next_page_token = data.get("nextPageToken")
        if not next_page_token or data.get("isLast", False):
            break
    return all_issues


def extract_issue(issue):
    """Normalise a JIRA issue into a flat dict."""
    f = issue.get("fields", {})
    assignee = f.get("assignee")
    parent = f.get("parent")
    return {
        "key": issue["key"],
        "summary": f.get("summary", ""),
        "status": (f.get("status") or {}).get("name", "Unknown"),
        "assignee": assignee.get("displayName", "Unassigned") if assignee else "Unassigned",
        "priority": (f.get("priority") or {}).get("name", "None"),
        "project": (f.get("project") or {}).get("key", ""),
        "storyPoints": f.get(STORY_POINT_FIELD) or 0,
        "labels": f.get("labels", []),
        "parent": parent.get("key", "") if parent else "",
        "created": f.get("created", ""),
        "updated": f.get("updated", ""),
        "resolutiondate": f.get("resolutiondate", ""),
        "issuetype": (f.get("issuetype") or {}).get("name", ""),
    }


def days_since(iso_string):
    """Return number of days since an ISO timestamp."""
    if not iso_string:
        return 999
    try:
        dt = datetime.fromisoformat(iso_string.replace("Z", "+00:00"))
        return (datetime.now(timezone.utc) - dt).days
    except Exception:
        return 999

# ---------------------------------------------------------------------------
# Phase 7: Story Point Field Discovery
# ---------------------------------------------------------------------------

def discover_story_point_field():
    """Try to find the correct custom field for story points."""
    global STORY_POINT_FIELD
    candidates = ["customfield_10016", "customfield_10028", "customfield_10014"]
    print("[DISCOVERY] Attempting story point field discovery via BACK-1938...")
    try:
        data = jira_get("/rest/api/3/issue/BACK-1938")
        fields = data.get("fields", {})
        # Print all non-null custom fields for debugging
        for key, val in sorted(fields.items()):
            if "custom" in key and val is not None:
                print(f"  {key}: {val}")
        # Check candidates
        for cand in candidates:
            val = fields.get(cand)
            if isinstance(val, (int, float)) and val > 0:
                print(f"[DISCOVERY] Using {cand} = {val} as story point field")
                STORY_POINT_FIELD = cand
                return cand
        # Fallback: look for any numeric custom field with value ~5
        for key, val in fields.items():
            if "custom" in key and isinstance(val, (int, float)) and val == 5:
                print(f"[DISCOVERY] Found likely match {key} = {val}")
                STORY_POINT_FIELD = key
                return key
        print("[DISCOVERY] Could not confirm story point field, defaulting to customfield_10016")
    except Exception as e:
        print(f"[DISCOVERY] Warning: could not fetch BACK-1938: {e}")
    return STORY_POINT_FIELD

# ---------------------------------------------------------------------------
# Phase 1: Sprint & Issue Extraction
# ---------------------------------------------------------------------------

def find_active_sprint():
    """Discover the active sprint across all boards."""
    boards = jira_get("/rest/agile/1.0/board", params={"maxResults": 50})
    for board in boards.get("values", []):
        bid = board["id"]
        try:
            sprints = jira_get(f"/rest/agile/1.0/board/{bid}/sprint", params={"state": "active"})
            for s in sprints.get("values", []):
                print(f"[SPRINT] Active sprint: {s['name']} (id={s['id']}) on board {board['name']}")
                return s, board
        except Exception:
            continue
    return None, None


def find_closed_sprints(board_id, max_results=5):
    """Return recently closed sprints for velocity comparison."""
    try:
        data = jira_get(f"/rest/agile/1.0/board/{board_id}/sprint",
                        params={"state": "closed", "maxResults": max_results})
        return data.get("values", [])
    except Exception:
        return []


def get_sprint_issues(sprint_id):
    """All issues in a given sprint."""
    issues = jira_search(f"sprint = {sprint_id} ORDER BY status ASC")
    return [extract_issue(i) for i in issues]


def status_breakdown(tickets):
    """Group tickets by status, count and sum story points."""
    groups = {}
    for t in tickets:
        s = t["status"]
        if s not in groups:
            groups[s] = {"count": 0, "points": 0}
        groups[s]["count"] += 1
        groups[s]["points"] += t["storyPoints"]
    return groups


def project_breakdown(tickets):
    """Group tickets by project key."""
    groups = {}
    for t in tickets:
        p = t["project"]
        if p not in groups:
            groups[p] = {"count": 0, "points": 0}
        groups[p]["count"] += 1
        groups[p]["points"] += t["storyPoints"]
    return groups

# ---------------------------------------------------------------------------
# Engineer Capacity (Brandon's Two-View Methodology)
# ---------------------------------------------------------------------------

def engineer_capacity(sprint_id):
    """For each engineer, get sprint view + full workload."""
    results = []
    for name in ALL_ENGINEERS:
        # Sprint view
        sprint_issues = jira_search(
            f'sprint = {sprint_id} AND assignee = "{name}" ORDER BY status ASC'
        )
        sprint_tickets = [extract_issue(i) for i in sprint_issues]

        # Full workload (all open)
        full_issues = jira_search(
            f'assignee = "{name}" AND status not in (Done, Cancelled, Canceled) ORDER BY priority ASC'
        )
        full_tickets = [extract_issue(i) for i in full_issues]

        backlog_debt = len(full_tickets) - len(sprint_tickets)

        results.append({
            "name": name,
            "isRoster": name in ROSTER,
            "sprintTickets": sprint_tickets,
            "sprintTicketCount": len(sprint_tickets),
            "sprintPoints": sum(t["storyPoints"] for t in sprint_tickets),
            "fullWorkloadCount": len(full_tickets),
            "fullWorkloadPoints": sum(t["storyPoints"] for t in full_tickets),
            "backlogDebt": backlog_debt,
            "completedInSprint": len([t for t in sprint_tickets if t["status"] == "Done"]),
        })
    return results

# ---------------------------------------------------------------------------
# Blocked Items
# ---------------------------------------------------------------------------

def get_blocked_items(sprint_id):
    """Blocked items: sprint-scoped, long-blocked, stale in-progress, stale code review."""
    sprint_blocked = [extract_issue(i) for i in jira_search(
        "status = Blocked AND sprint in openSprints()"
    )]
    long_blocked = [extract_issue(i) for i in jira_search(
        "status = Blocked ORDER BY updated ASC"
    )]

    # Stale in-progress & code review: from sprint issues
    sprint_issues = jira_search(f"sprint = {sprint_id} ORDER BY updated ASC")
    stale_ip = []
    stale_cr = []
    for i in sprint_issues:
        t = extract_issue(i)
        age = days_since(t["updated"])
        if t["status"] == "In Progress" and age > 5:
            t["daysSinceUpdate"] = age
            stale_ip.append(t)
        elif t["status"] == "Code Review" and age > 3:
            t["daysSinceUpdate"] = age
            stale_cr.append(t)

    return {
        "sprintBlocked": sprint_blocked,
        "longBlocked": long_blocked,
        "staleInProgress": stale_ip,
        "staleCodeReview": stale_cr,
    }

# ---------------------------------------------------------------------------
# Work Mix Analysis
# ---------------------------------------------------------------------------

def categorise_ticket(ticket):
    """Categorise a ticket into ARTEMIS/Platform, Client Work, Infrastructure, Other."""
    labels_lower = [l.lower() for l in ticket.get("labels", [])]
    summary_lower = ticket.get("summary", "").lower()

    # Check labels first
    for l in labels_lower:
        if l.startswith("milestone:"):
            return "ARTEMIS/Platform"
        if l.startswith("client:"):
            return "Client Work"

    # Keyword matching
    for kw in ARTEMIS_KEYWORDS:
        if kw in summary_lower:
            return "ARTEMIS/Platform"
    for kw in CLIENT_KEYWORDS:
        if kw in summary_lower:
            return "Client Work"
    for kw in INFRA_KEYWORDS:
        if kw in summary_lower:
            return "Infrastructure"

    return "Other"


def work_mix_analysis(tickets):
    """Compute work mix breakdown and compare to targets."""
    categories = {"ARTEMIS/Platform": [], "Client Work": [], "Infrastructure": [], "Other": []}
    for t in tickets:
        cat = categorise_ticket(t)
        categories[cat].append(t)

    total = len(tickets) or 1
    targets = {"ARTEMIS/Platform": 60, "Client Work": 30, "Infrastructure": 10, "Other": 0}
    result = {}
    for cat, items in categories.items():
        pct = round(len(items) / total * 100, 1)
        result[cat] = {
            "count": len(items),
            "points": sum(t["storyPoints"] for t in items),
            "percentage": pct,
            "target": targets.get(cat, 0),
            "delta": round(pct - targets.get(cat, 0), 1),
        }
    return result

# ---------------------------------------------------------------------------
# Sprint Health Scorecard
# ---------------------------------------------------------------------------

def compute_sprint_health(sprint_info, tickets, blocked_data, work_mix):
    """Auto-rate each area GREEN(3)/YELLOW(2)/RED(1)."""
    total = len(tickets) or 1
    done_count = len([t for t in tickets if t["status"] == "Done"])
    completion_pct = round(done_count / total * 100, 1)

    # Estimate expected progress based on sprint day
    start = sprint_info.get("startDate", "")
    end = sprint_info.get("endDate", "")
    expected_pct = 50  # default midpoint
    if start and end:
        try:
            s = datetime.fromisoformat(start.replace("Z", "+00:00"))
            e = datetime.fromisoformat(end.replace("Z", "+00:00"))
            now = datetime.now(timezone.utc)
            total_days = max((e - s).days, 1)
            elapsed = max((now - s).days, 0)
            expected_pct = round(elapsed / total_days * 100, 1)
        except Exception:
            pass

    def rate(good, warn):
        """Return 3/2/1 based on thresholds."""
        return 3 if good else (2 if warn else 1)

    sprint_blocked_count = len(blocked_data.get("sprintBlocked", []))
    stale_cr_count = len(blocked_data.get("staleCodeReview", []))
    stale_ip_count = len(blocked_data.get("staleInProgress", []))
    unassigned = len([t for t in tickets if t["assignee"] == "Unassigned"])
    unassigned_pct = round(unassigned / total * 100, 1)
    artemis_pct = work_mix.get("ARTEMIS/Platform", {}).get("percentage", 0)

    metrics = [
        {
            "metric": "Sprint Progress",
            "value": f"{completion_pct}%",
            "target": f"{expected_pct}% expected",
            "score": rate(completion_pct >= expected_pct - 5, completion_pct >= expected_pct - 15),
            "status": "green" if completion_pct >= expected_pct - 5 else ("yellow" if completion_pct >= expected_pct - 15 else "red"),
        },
        {
            "metric": "Blocked Items",
            "value": str(sprint_blocked_count),
            "target": "0",
            "score": rate(sprint_blocked_count == 0, sprint_blocked_count <= 2),
            "status": "green" if sprint_blocked_count == 0 else ("yellow" if sprint_blocked_count <= 2 else "red"),
        },
        {
            "metric": "Code Review Queue",
            "value": str(stale_cr_count),
            "target": "0 stale",
            "score": rate(stale_cr_count == 0, stale_cr_count <= 2),
            "status": "green" if stale_cr_count == 0 else ("yellow" if stale_cr_count <= 2 else "red"),
        },
        {
            "metric": "Unassigned Tickets",
            "value": f"{unassigned_pct}%",
            "target": "<5%",
            "score": rate(unassigned_pct < 5, unassigned_pct < 15),
            "status": "green" if unassigned_pct < 5 else ("yellow" if unassigned_pct < 15 else "red"),
        },
        {
            "metric": "Work Mix",
            "value": f"ARTEMIS {artemis_pct}%",
            "target": "60% ARTEMIS",
            "score": rate(artemis_pct >= 55, artemis_pct >= 40),
            "status": "green" if artemis_pct >= 55 else ("yellow" if artemis_pct >= 40 else "red"),
        },
        {
            "metric": "Stale Items",
            "value": str(stale_ip_count + stale_cr_count),
            "target": "0",
            "score": rate(stale_ip_count + stale_cr_count == 0, stale_ip_count + stale_cr_count <= 3),
            "status": "green" if stale_ip_count + stale_cr_count == 0 else ("yellow" if stale_ip_count + stale_cr_count <= 3 else "red"),
        },
    ]

    avg_score = round(sum(m["score"] for m in metrics) / len(metrics), 2)
    overall = "GREEN" if avg_score >= 2.5 else ("YELLOW" if avg_score >= 1.8 else "RED")

    return {
        "metrics": metrics,
        "averageScore": avg_score,
        "overall": overall,
        "completionPct": completion_pct,
        "expectedPct": expected_pct,
    }

# ---------------------------------------------------------------------------
# Previous Sprint Velocity
# ---------------------------------------------------------------------------

def previous_sprint_data(closed_sprints):
    """Extract velocity data from the most recently closed sprint."""
    if not closed_sprints:
        return None
    prev = closed_sprints[-1]
    sid = prev["id"]
    issues = jira_search(f"sprint = {sid} ORDER BY status ASC")
    tickets = [extract_issue(i) for i in issues]
    done = [t for t in tickets if t["status"] in ("Done",)]
    total_pts = sum(t["storyPoints"] for t in tickets)
    done_pts = sum(t["storyPoints"] for t in done)
    return {
        "sprintName": prev.get("name", ""),
        "sprintId": sid,
        "totalTickets": len(tickets),
        "totalPoints": total_pts,
        "completedTickets": len(done),
        "completedPoints": done_pts,
        "completionPct": round(len(done) / max(len(tickets), 1) * 100, 1),
        "pointCompletionPct": round(done_pts / max(total_pts, 1) * 100, 1),
    }

# ---------------------------------------------------------------------------
# Next Sprint Readiness
# ---------------------------------------------------------------------------

def next_sprint_readiness(board_id):
    """Check if there's a future sprint with tickets already assigned."""
    try:
        data = jira_get(f"/rest/agile/1.0/board/{board_id}/sprint", params={"state": "future"})
        sprints = data.get("values", [])
        if not sprints:
            return None
        ns = sprints[0]
        issues = jira_search(f"sprint = {ns['id']} ORDER BY status ASC")
        tickets = [extract_issue(i) for i in issues]
        assigned = [t for t in tickets if t["assignee"] != "Unassigned"]
        return {
            "sprintName": ns.get("name", ""),
            "sprintId": ns["id"],
            "totalTickets": len(tickets),
            "assignedTickets": len(assigned),
            "totalPoints": sum(t["storyPoints"] for t in tickets),
        }
    except Exception:
        return None

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_extraction():
    """Run full JIRA extraction pipeline."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    print("=" * 60)
    print(f"JIRA EXTRACTION -- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # Step 0: Discover story point field
    discover_story_point_field()

    # Step 1: Find active sprint
    sprint_info, board = find_active_sprint()
    if not sprint_info:
        print("[ERROR] No active sprint found across any board!")
        sys.exit(1)

    sprint_id = sprint_info["id"]
    board_id = board["id"]
    print(f"\n[1/10] Sprint: {sprint_info['name']} | Board: {board['name']}")

    # Step 2: Sprint issues
    print("[2/10] Fetching sprint issues...")
    tickets = get_sprint_issues(sprint_id)
    print(f"  -> {len(tickets)} tickets")

    # Step 3: Status breakdown
    print("[3/10] Status breakdown...")
    statuses = status_breakdown(tickets)
    for s, d in sorted(statuses.items()):
        print(f"  {s}: {d['count']} tickets, {d['points']} pts")

    # Step 4: Project breakdown
    print("[4/10] Project breakdown...")
    projects = project_breakdown(tickets)

    # Step 5: Engineer capacity
    print("[5/10] Engineer capacity (this takes a moment)...")
    capacity = engineer_capacity(sprint_id)
    for eng in capacity:
        print(f"  {eng['name']}: {eng['sprintTicketCount']} sprint / {eng['fullWorkloadCount']} total / debt={eng['backlogDebt']}")

    # Step 6: Blocked items
    print("[6/10] Blocked items...")
    blocked = get_blocked_items(sprint_id)
    print(f"  Sprint blocked: {len(blocked['sprintBlocked'])}")
    print(f"  Long blocked: {len(blocked['longBlocked'])}")
    print(f"  Stale In Progress: {len(blocked['staleInProgress'])}")
    print(f"  Stale Code Review: {len(blocked['staleCodeReview'])}")

    # Step 7: Work mix
    print("[7/10] Work mix analysis...")
    work_mix = work_mix_analysis(tickets)
    for cat, d in work_mix.items():
        print(f"  {cat}: {d['count']} tickets ({d['percentage']}%), target={d['target']}%")

    # Step 8: Sprint health
    print("[8/10] Sprint health scorecard...")
    health = compute_sprint_health(sprint_info, tickets, blocked, work_mix)
    print(f"  Overall: {health['overall']} (avg score: {health['averageScore']})")

    # Step 9: Previous sprint velocity
    print("[9/10] Previous sprint velocity...")
    closed = find_closed_sprints(board_id)
    prev_sprint = previous_sprint_data(closed)
    if prev_sprint:
        print(f"  {prev_sprint['sprintName']}: {prev_sprint['completedTickets']}/{prev_sprint['totalTickets']} tickets, {prev_sprint['completedPoints']}/{prev_sprint['totalPoints']} pts")

    # Step 10: Next sprint readiness
    print("[10/10] Next sprint readiness...")
    next_sprint = next_sprint_readiness(board_id)
    if next_sprint:
        print(f"  {next_sprint['sprintName']}: {next_sprint['totalTickets']} tickets, {next_sprint['assignedTickets']} assigned")

    # ---------------------------------------------------------------------------
    # Assemble output
    # ---------------------------------------------------------------------------
    output = {
        "extractionTimestamp": datetime.now(timezone.utc).isoformat(),
        "storyPointField": STORY_POINT_FIELD,
        "activeSprint": {
            "name": sprint_info.get("name", ""),
            "id": sprint_id,
            "startDate": sprint_info.get("startDate", ""),
            "endDate": sprint_info.get("endDate", ""),
            "goal": sprint_info.get("goal", ""),
            "boardName": board.get("name", ""),
        },
        "sprintTickets": tickets,
        "statusBreakdown": statuses,
        "projectBreakdown": projects,
        "engineerCapacity": capacity,
        "blockedItems": blocked,
        "workMix": work_mix,
        "sprintHealth": health,
        "previousSprint": prev_sprint,
        "nextSprintReadiness": next_sprint,
    }

    # Save JSON
    json_path = OUTPUT_DIR / f"jira_extraction_{timestamp}.json"
    json_path.write_text(json.dumps(output, indent=2, default=str))
    # Also save as "latest" for easy reference
    latest_json = OUTPUT_DIR / "jira_extraction_latest.json"
    latest_json.write_text(json.dumps(output, indent=2, default=str))
    print(f"\n[JSON] {json_path}")

    # Save human-readable TXT
    txt_path = OUTPUT_DIR / f"jira_extraction_{timestamp}.txt"
    txt_lines = generate_text_report(output)
    txt_path.write_text("\n".join(txt_lines))
    latest_txt = OUTPUT_DIR / "jira_extraction_latest.txt"
    latest_txt.write_text("\n".join(txt_lines))
    print(f"[TXT]  {txt_path}")

    return output


def generate_text_report(data):
    """Generate human-readable text report from extraction data."""
    lines = []
    lines.append("=" * 70)
    lines.append(f"JIRA EXTRACTION REPORT -- {data['extractionTimestamp']}")
    lines.append(f"Story Point Field: {data['storyPointField']}")
    lines.append("=" * 70)

    sp = data["activeSprint"]
    lines.append(f"\nACTIVE SPRINT: {sp['name']}")
    lines.append(f"  ID: {sp['id']} | Board: {sp['boardName']}")
    lines.append(f"  Start: {sp['startDate']} | End: {sp['endDate']}")
    lines.append(f"  Goal: {sp.get('goal', 'N/A')}")
    lines.append(f"  Total tickets: {len(data['sprintTickets'])}")

    lines.append(f"\nSTATUS BREAKDOWN:")
    for s, d in sorted(data["statusBreakdown"].items()):
        lines.append(f"  {s}: {d['count']} tickets, {d['points']} pts")

    lines.append(f"\nPROJECT BREAKDOWN:")
    for p, d in sorted(data["projectBreakdown"].items()):
        lines.append(f"  {p}: {d['count']} tickets, {d['points']} pts")

    lines.append(f"\nENGINEER CAPACITY:")
    for eng in data["engineerCapacity"]:
        tag = "" if eng["isRoster"] else " [NON-ROSTER]"
        lines.append(f"  {eng['name']}{tag}: Sprint={eng['sprintTicketCount']}({eng['sprintPoints']}pts) | Full={eng['fullWorkloadCount']}({eng['fullWorkloadPoints']}pts) | Debt={eng['backlogDebt']}")

    lines.append(f"\nENGINEER ALLOCATION (Sprint Tickets):")
    for eng in data["engineerCapacity"]:
        if not eng["sprintTickets"]:
            continue
        lines.append(f"\n  {eng['name']}:")
        for t in eng["sprintTickets"]:
            pts = f"{t['storyPoints']}pts" if t["storyPoints"] else "--"
            lines.append(f"    {t['key']}: {t['summary']} [{t['status']}] {pts} P={t['priority']} labels={','.join(t['labels'])}")

    bl = data["blockedItems"]
    lines.append(f"\nBLOCKED ITEMS:")
    lines.append(f"  Sprint blocked: {len(bl['sprintBlocked'])}")
    for t in bl["sprintBlocked"]:
        lines.append(f"    {t['key']}: {t['summary']} (assignee={t['assignee']})")
    lines.append(f"  Long blocked (all): {len(bl['longBlocked'])}")
    for t in bl["longBlocked"]:
        lines.append(f"    {t['key']}: {t['summary']} (assignee={t['assignee']}, updated={t['updated']})")
    lines.append(f"  Stale In Progress (>5 days): {len(bl['staleInProgress'])}")
    for t in bl["staleInProgress"]:
        lines.append(f"    {t['key']}: {t['summary']} ({t.get('daysSinceUpdate', '?')} days)")
    lines.append(f"  Stale Code Review (>3 days): {len(bl['staleCodeReview'])}")
    for t in bl["staleCodeReview"]:
        lines.append(f"    {t['key']}: {t['summary']} ({t.get('daysSinceUpdate', '?')} days)")

    lines.append(f"\nWORK MIX:")
    for cat, d in data["workMix"].items():
        lines.append(f"  {cat}: {d['count']} tickets ({d['percentage']}%) target={d['target']}% delta={d['delta']:+.1f}%")

    h = data["sprintHealth"]
    lines.append(f"\nSPRINT HEALTH: {h['overall']} (avg={h['averageScore']})")
    for m in h["metrics"]:
        lines.append(f"  {m['metric']}: {m['value']} (target={m['target']}) -> {m['status'].upper()}")

    if data.get("previousSprint"):
        ps = data["previousSprint"]
        lines.append(f"\nPREVIOUS SPRINT: {ps['sprintName']}")
        lines.append(f"  Tickets: {ps['completedTickets']}/{ps['totalTickets']} ({ps['completionPct']}%)")
        lines.append(f"  Points: {ps['completedPoints']}/{ps['totalPoints']} ({ps['pointCompletionPct']}%)")

    if data.get("nextSprintReadiness"):
        ns = data["nextSprintReadiness"]
        lines.append(f"\nNEXT SPRINT: {ns['sprintName']}")
        lines.append(f"  Tickets: {ns['totalTickets']} | Assigned: {ns['assignedTickets']} | Points: {ns['totalPoints']}")

    lines.append("\n" + "=" * 70)
    lines.append("END OF REPORT")
    return lines


if __name__ == "__main__":
    run_extraction()
