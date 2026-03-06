#!/usr/bin/env python3
"""March 6, 2026 Dashboard Update Script
Sprint S5 Day 7/14: 80 tickets, 202 pts, 32 Done (78 pts)
+8 tickets (CI infra batch), +12 pts. 6 Done overnight.
Ivan's 4 stale IP items moved to CR. Stale: 6→3.
Monday.com: 114 deals, $13.655M, $3.507M weighted.
Health: RED→YELLOW (2 red, 5 yellow, 1 green).
"""

import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIENT_DATA = os.path.join(BASE, "client", "src", "data")
CLIENT_COMP = os.path.join(BASE, "client", "src", "components")
CLIENT_PAGES = os.path.join(BASE, "client", "src", "pages")

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def update_file(path, old, new):
    """Replace first occurrence of old with new."""
    content = read_file(path)
    if old not in content:
        print(f"  WARNING: not found in {os.path.basename(path)}: {old[:60]}...")
        return
    content = content.replace(old, new, 1)
    write_file(path, content)
    print(f"  Updated: {os.path.basename(path)}")

def update_file_all(path, old, new):
    """Replace all occurrences of old with new."""
    content = read_file(path)
    if old not in content:
        print(f"  WARNING (all): not found in {os.path.basename(path)}: {old[:60]}...")
        return
    content = content.replace(old, new)
    write_file(path, content)
    print(f"  Updated (all): {os.path.basename(path)}")

# ============================================================
# STEP 1: Bulk timestamp replacement (Mar 5 → Mar 6)
# ============================================================
print("\n=== STEP 1: Timestamps (Mar 5 -> Mar 6) ===")

ts_files_data = [
    os.path.join(CLIENT_DATA, f) for f in os.listdir(CLIENT_DATA) if f.endswith(".ts")
]
ts_files_comp = [
    os.path.join(CLIENT_COMP, "DataFreshness.tsx"),
    os.path.join(CLIENT_COMP, "MercuryExtractionSection.tsx"),
    os.path.join(CLIENT_COMP, "RoadmapTimeline.tsx"),
    os.path.join(CLIENT_COMP, "SprintAnalysis.tsx"),
    os.path.join(CLIENT_COMP, "engineer-allocation", "EngineerAllocation.tsx"),
    os.path.join(CLIENT_PAGES, "board.tsx"),
]
all_ts_files = ts_files_data + ts_files_comp

replacements = [
    ("March 5, 2026", "March 6, 2026"),
    ("2026-03-05", "2026-03-06"),
    ("10:49 AM MT", "1:36 PM MT"),
    ("10:49 PM MT", "1:36 PM MT"),
    ("Day 6", "Day 7"),
]

for fpath in all_ts_files:
    if not os.path.exists(fpath):
        continue
    content = read_file(fpath)
    changed = False
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            changed = True
    if changed:
        write_file(fpath, content)
        print(f"  {os.path.relpath(fpath, BASE)}")

# ============================================================
# STEP 2: timestamp.ts
# ============================================================
print("\n=== STEP 2: timestamp.ts ===")
ts_path = os.path.join(CLIENT_DATA, "timestamp.ts")
write_file(ts_path, '''export const EXTRACTION_TIMESTAMP = "2026-03-06T13:36:00-07:00";
export const LAST_UPDATED = "March 6, 2026 at 1:36 PM MT";
export function formatDataTimestamp(): string {
  return "March 6, 2026, 1:36 PM MT";
}
''')
print("  Done")

# ============================================================
# STEP 3: sprintData.ts
# ============================================================
print("\n=== STEP 3: sprintData.ts ===")
sd = os.path.join(CLIENT_DATA, "sprintData.ts")

update_file(sd,
    "totalTickets: 72,\n  totalPoints: 190,\n  completedTickets: 26,\n  completedPoints: 66,",
    "totalTickets: 80,\n  totalPoints: 202,\n  completedTickets: 32,\n  completedPoints: 78,"
)
update_file(sd,
    "toDo: 19,\n    blocked: 0,\n    inProgress: 12,\n    codeReview: 7,\n    done: 26",
    "toDo: 19,\n    blocked: 0,\n    inProgress: 12,\n    codeReview: 9,\n    done: 32"
)
update_file(sd,
    "completionRate: 36.1,\n  pointsCompletionRate: 34.7,\n  health: 'red',\n  daysRemaining: 8,\n  daysElapsed: 6,",
    "completionRate: 40.0,\n  pointsCompletionRate: 38.6,\n  health: 'yellow',\n  daysRemaining: 7,\n  daysElapsed: 7,"
)
update_file(sd,
    "mix: { artemis: 8, client: 9, infrastructure: 1 },",
    "mix: { artemis: 8, client: 12, infrastructure: 3 },"
)

# ============================================================
# STEP 4: jiraMetrics.ts
# ============================================================
print("\n=== STEP 4: jiraMetrics.ts ===")
jm = os.path.join(CLIENT_DATA, "jiraMetrics.ts")

update_file(jm, "daysRemaining: 8,", "daysRemaining: 7,")
update_file(jm,
    'totalStoryPoints: 190,\n    avgVelocity: 134,\n    overCommitment: "At 190 pts (avg 134) -- 42% over velocity"',
    'totalStoryPoints: 202,\n    avgVelocity: 134,\n    overCommitment: "At 202 pts (avg 134) -- 51% over velocity"'
)
update_file(jm,
    "totalActiveTickets: 72,\n    totalInProgress: 12,\n    totalToDo: 19,\n    totalCodeReview: 7,\n    totalBlocked: 0,\n    totalDone: 26,\n    totalWithStoryPoints: 47",
    "totalActiveTickets: 80,\n    totalInProgress: 12,\n    totalToDo: 19,\n    totalCodeReview: 9,\n    totalBlocked: 0,\n    totalDone: 32,\n    totalWithStoryPoints: 55"
)
update_file(jm,
    "completed: 66,\n    inProgress: 38,\n    notStarted: 49,\n    completionRate: 34.7",
    "completed: 78,\n    inProgress: 31,\n    notStarted: 48,\n    completionRate: 38.6"
)

# Update highestLoad
update_file(jm,
    """    highestLoad: [
      { name: "Owen Riley", tickets: 5 },
      { name: "Aleksander Winski", tickets: 5 },
      { name: "Ivan Peev", tickets: 8 },
      { name: "Kannal Mutharasu", tickets: 6 }
    ]""",
    """    highestLoad: [
      { name: "Ivan Peev", tickets: 8 },
      { name: "Kannal Mutharasu", tickets: 6 },
      { name: "Lane Terry", tickets: 5 },
      { name: "Jeff Hegerhorst", tickets: 5 }
    ]"""
)

# Replace longRunningTickets
content = read_file(jm)
old_lrt = content[content.index("longRunningTickets: ["):content.index("  ]\n};", content.index("longRunningTickets: [")) + 5]
new_lrt = """longRunningTickets: [
    {
      id: "UI-780",
      title: "Handle 401 (Unauthorized) errors better",
      assignee: "Owen Riley",
      status: "In Progress",
      daysInStatus: 7,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 7 days"
    },
    {
      id: "CI-946",
      title: "Investigate gpu node failure",
      assignee: "Chad Hegerhorst",
      status: "In Progress",
      daysInStatus: 7,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 7 days"
    },
    {
      id: "BACK-1993",
      title: "Documents Stuck in Mercury Causing Bottleneck",
      assignee: "Unassigned",
      status: "Code Review",
      daysInStatus: 7,
      warningLevel: "warning",
      reason: "Stale in Code Review -- 7 days, unassigned"
    }
  ]"""
content = content.replace(old_lrt, new_lrt)
write_file(jm, content)
print("  Replaced longRunningTickets array")

# Update sprint comparison
update_file(jm,
    's5: { sprint: "2026-S5", committed: 190, completed: 66, rate: 34.7, status: "in_progress" }',
    's5: { sprint: "2026-S5", committed: 202, completed: 78, rate: 38.6, status: "in_progress" }'
)

# ============================================================
# STEP 5: sprintHealthData.ts (direct Python edit)
# ============================================================
print("\n=== STEP 5: sprintHealthData.ts ===")
sh = os.path.join(CLIENT_DATA, "sprintHealthData.ts")
content = read_file(sh)

# Replace entire sprintHealth array
old_health_start = content.index("export const sprintHealth: HealthMetric[] = [")
old_health_end = content.index("];", old_health_start) + 2

new_health = """export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "40.0% (Day 7)", target: "50.0% expected", status: "yellow", detail: "40.0% complete vs 50.0% expected at Day 7. 6 tickets Done overnight. Closing gap." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "9 items (1 stale CR + 2 stale IP)", target: "GREEN <5", status: "yellow", detail: "9 items in CR. 1 stale CR (BACK-1993 7d) + 2 stale IP (UI-780 7d, CI-946 7d). Ivan's 4 items moved IP->CR." },
  { metric: "Unassigned Tickets", s2Value: "22 of 80", target: "GREEN <5, RED >15", status: "red", detail: "27.5% of sprint unassigned -- improved from 30.6%. Denominator grew (72->80)." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "10.0%", target: "60%", status: "red", detail: "ARTEMIS at 10.0% vs 60% target -- 8 tickets, still severely under-allocated." },
  { metric: "Engineer Capacity", s2Value: "~13.2 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 13.2 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "3 items", target: "GREEN 0", status: "yellow", detail: "1 stale CR (BACK-1993 7d) + 2 stale IP (UI-780 7d, CI-946 7d). Down from 6 -- Ivan moved 4 items to CR." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned (7 days to sprint start). Grooming must begin immediately." }
];"""

content = content[:old_health_start] + new_health + content[old_health_end:]

# Update overall health
content = content.replace('export const overallHealth: OverallHealth = "RED";', 'export const overallHealth: OverallHealth = "YELLOW";')

# Replace healthRecommendations
old_rec_start = content.index("export const healthRecommendations = [")
old_rec_end = content.index("];", old_rec_start) + 2

new_rec = """export const healthRecommendations = [
  {
    issue: "22 UNASSIGNED TICKETS (27.5%)",
    recommendation: "22 of 80 tickets unassigned (27.5%). Trending down from 30.6%. Denominator grew with 8 new CI tickets.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 7 -- 40.0% vs 50.0%",
    recommendation: "S5 Day 7/14. 78/202 pts complete (38.6%). Strong velocity continues -- 6 Done overnight. 10% behind pace.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 10.0% vs 60% target",
    recommendation: "At 10.0% vs 60% target. Dropped slightly as new CI tickets diluted mix. Must address in S6 planning.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-34 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-34 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "3 STALE ITEMS (1 CR + 2 IP)",
    recommendation: "3 stale items (down from 6). 2 IP (UI-780 7d, CI-946 7d) + 1 CR (BACK-1993 7d unassigned). Ivan cleared 4 stale IPs.",
    priority: "high"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 402 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];"""

content = content[:old_rec_start] + new_rec + content[old_rec_end:]

# Update baselineComparison
content = content.replace(
    '{ metric: "Sprint", baseline: "S5 Day 5", current: "S5 Day 6", delta: "+1 day", trend: "progressing" }',
    '{ metric: "Sprint", baseline: "S5 Day 6", current: "S5 Day 7", delta: "+1 day", trend: "progressing" }'
)
content = content.replace(
    '{ metric: "Tickets", baseline: 70, current: 72, delta: "+2", trend: "scope added" }',
    '{ metric: "Tickets", baseline: 72, current: 80, delta: "+8", trend: "scope added" }'
)
content = content.replace(
    '{ metric: "Points", baseline: 186, current: 190, delta: "+4", trend: "scope added" }',
    '{ metric: "Points", baseline: 190, current: 202, delta: "+12", trend: "scope added" }'
)
content = content.replace(
    '{ metric: "Completion", baseline: "27.1%", current: "36.1%", delta: "+9.0%", trend: "improving" }',
    '{ metric: "Completion", baseline: "36.1%", current: "40.0%", delta: "+3.9%", trend: "improving" }'
)
content = content.replace(
    '{ metric: "ARTEMIS %", baseline: 11.4, current: 11.1, delta: "-0.3%", trend: "flat" }',
    '{ metric: "ARTEMIS %", baseline: 11.1, current: 10.0, delta: "-1.1%", trend: "declining" }'
)
content = content.replace(
    '{ metric: "Unassigned", baseline: 23, current: 22, delta: "-1", trend: "improved" }',
    '{ metric: "Unassigned", baseline: 22, current: 22, delta: "0", trend: "stable" }'
)
content = content.replace(
    '{ metric: "Health", baseline: "RED", current: "RED", delta: "No change", trend: "stagnant" }',
    '{ metric: "Health", baseline: "RED", current: "YELLOW", delta: "Improved", trend: "improving" }'
)

# Update sprintPlanningAlert
content = content.replace("completionRate: 36.1,", "completionRate: 40.0,")
content = content.replace("pointsCompletionRate: 34.7,", "pointsCompletionRate: 38.6,")
content = content.replace("daysRemaining: 8,", "daysRemaining: 7,")
content = content.replace("status: 'RED'", "status: 'YELLOW'")

content = content.replace(
    "actionNeeded: 'S5 Day 6 -- 36.1% complete vs 42.9% expected. 22 unassigned (30.6%). 6 stale items. ARTEMIS at 11.1% vs 60% target. Colony expired (-33d). BetaNxt expired.'",
    "actionNeeded: 'S5 Day 7 -- 40.0% complete vs 50.0% expected. 22 unassigned (27.5%). 3 stale items. ARTEMIS at 10.0% vs 60% target. Colony expired (-34d). BetaNxt expired.'"
)

# Update workMix in health file
content = content.replace(
    "artemis: { tickets: 8, points: 18, percent: 11, target: '60%', status: 'below' as const },\n  client: { tickets: 9, points: 18, percent: 13, target: '30%', status: 'below' as const },\n  infrastructure: { tickets: 1, points: 2, percent: 2, target: '10%', status: 'below' as const }",
    "artemis: { tickets: 8, points: 18, percent: 10, target: '60%', status: 'below' as const },\n  client: { tickets: 12, points: 33, percent: 15, target: '30%', status: 'below' as const },\n  infrastructure: { tickets: 3, points: 7, percent: 4, target: '10%', status: 'below' as const }"
)

# Update velocityHistory S5 line
content = content.replace(
    '{ sprint: "2026-S5", committed: 190, completed: 66, rate: 34.7, status: "in_progress" }',
    '{ sprint: "2026-S5", committed: 202, completed: 78, rate: 38.6, status: "in_progress" }'
)

write_file(sh, content)
print("  Updated: sprintHealthData.ts (direct edit)")

# ============================================================
# STEP 6: workMixData.ts
# ============================================================
print("\n=== STEP 6: workMixData.ts ===")
wm = os.path.join(CLIENT_DATA, "workMixData.ts")

# Client work tickets
update_file(wm,
    'category: "Client Work",\n    s2Tickets: 9,\n    s2Percentage: 13,',
    'category: "Client Work",\n    s2Tickets: 12,\n    s2Percentage: 15,'
)

# Infrastructure tickets
update_file(wm,
    'category: "Infrastructure",\n    s2Tickets: 1,\n    s2Percentage: 2,',
    'category: "Infrastructure",\n    s2Tickets: 3,\n    s2Percentage: 4,'
)

# ARTEMIS percentage (11 -> 10)
update_file(wm,
    's2Percentage: 11,\n    target: "50-60%",',
    's2Percentage: 10,\n    target: "50-60%",'
)

# Colony Bank days
update_file(wm,
    "(-33 days)",
    "(-34 days)"
)

# workMixSummary
update_file(wm,
    "totalTickets: 72,\n  totalPoints: 190,\n  artemisPercentage: 11,",
    "totalTickets: 80,\n  totalPoints: 202,\n  artemisPercentage: 10,"
)
update_file(wm,
    "clientPercentage: 13,\n  clientTarget: 30,\n  infrastructurePercentage: 2,",
    "clientPercentage: 15,\n  clientTarget: 30,\n  infrastructurePercentage: 4,"
)
update_file(wm,
    "artemis: -49, // 11 - 60 (SEVERELY UNDER)\n    client: -17 // 13 - 30 (UNDER)",
    "artemis: -50, // 10 - 60 (SEVERELY UNDER)\n    client: -15 // 15 - 30 (UNDER)"
)

# ============================================================
# STEP 7: engineerCapacityData.ts
# ============================================================
print("\n=== STEP 7: engineerCapacityData.ts ===")
ec = os.path.join(CLIENT_DATA, "engineerCapacityData.ts")

# Lane Terry: 4t/14pts → 5t/17pts, 1 IP, 2 CR, 2 Done
update_file(ec,
    "s4Tickets: 4, s4Points: 14, status: 'green', statusNote: '2 CR, 2 Done, backlog debt +2'",
    "s4Tickets: 5, s4Points: 17, status: 'green', statusNote: '1 IP, 2 CR, 2 Done, backlog debt +2'"
)

# Jeff: 3t/12pts → 5t/15pts, 1 IP, 4 Done
update_file(ec,
    "s4Tickets: 3, s4Points: 12, status: 'yellow', statusNote: '1 IP, 1 CR, 1 Done, backlog debt +2'",
    "s4Tickets: 5, s4Points: 15, status: 'green', statusNote: '1 IP, 4 Done, backlog debt -1'"
)

# Chad: 2t/5pts → 2t/5pts, 1 IP, 1 Done (same tickets but note changes)
update_file(ec,
    "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 CR, backlog debt +2'",
    "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP (stale 7d), 1 Done, backlog debt +1'"
)

# Ivan: still 8t/21pts but now 4 CR, 4 Done
update_file(ec,
    "s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '4 IP (3 stale 9d), 4 Done, backlog debt -4'",
    "s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '4 CR (moved from stale IP), 4 Done, backlog debt -4'"
)

# Darius: 2t/5pts → 4t/8pts, 1 IP, 1 ToDo, 2 Done
update_file(ec,
    "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 CR, 1 Done, backlog debt +3'",
    "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '1 IP, 1 ToDo, 2 Done, backlog debt +2'"
)

# Kannal: 6t/13pts → 6t/14pts, 1 IP, 1 CR, 4 Done
update_file(ec,
    "s4Tickets: 6, s4Points: 13, status: 'green', statusNote: '1 IP, 1 ToDo, 1 CR, 3 Done, backlog debt 0'",
    "s4Tickets: 6, s4Points: 14, status: 'green', statusNote: '1 IP, 1 CR, 4 Done, backlog debt -1'"
)

# Kalvin: 4t/8pts → 5t/8pts, 1 IP, 2 Done, 1 Canceled, 1 WFA
update_file(ec,
    "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '2 Done, 1 WFA, backlog debt -2'",
    "s4Tickets: 5, s4Points: 8, status: 'green', statusNote: '1 IP, 2 Done, 1 Canceled, 1 WFA, backlog debt -2'"
)

# Owen: stays 5t/10pts, 1 IP (stale 7d), 4 Done
update_file(ec,
    "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP (stale 6d), 4 Done, backlog debt -4'",
    "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP (stale 7d), 4 Done, backlog debt -4'"
)

# Matthew: stays 3t/5pts, 1 IP, 2 Done
update_file(ec,
    "s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 2 Done, backlog debt +3'",
    "s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 2 Done, backlog debt +3'"
)

# Treven: stays 2t/10pts, 1 IP, 1 Done

# Brandon: 3→5 tickets, 5→8 pts
update_file(ec,
    "statusNote: 'Chief Architect -- BACK-1862 Colony Bank 8pts IP in full workload'",
    "statusNote: 'Chief Architect -- no sprint tickets, advisory role'"
)

# capacitySummary
update_file(ec,
    "totalS3Tickets: 72,\n  totalS3Points: 190,\n  s3Assigned: 50,\n  s3Unassigned: 22,\n  s3UnassignedPercent: 30.6,\n  totalAssignedPoints: 127,\n  unassignedPoints: 63,\n  avgPointsPerEngineer: 12.7,",
    "totalS3Tickets: 80,\n  totalS3Points: 202,\n  s3Assigned: 58,\n  s3Unassigned: 22,\n  s3UnassignedPercent: 27.5,\n  totalAssignedPoints: 158,\n  unassignedPoints: 44,\n  avgPointsPerEngineer: 13.2,"
)

update_file(ec,
    "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Kannal Mutharasu (6 tickets, 13 pts)']",
    "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (5 tickets, 17 pts)', 'Jeff Hegerhorst (5 tickets, 15 pts)']"
)

# Code review queue - complete replacement
content = read_file(ec)
old_crq = content[content.index("export const codeReviewQueue = ["):content.index("];", content.index("export const codeReviewQueue = [")) + 2]
new_crq = """export const codeReviewQueue = [
  { ticket: 'BACK-1303', summary: 'ML Label or Challenge Workflow Template', assignee: 'Ivan Peev', points: 0, daysInReview: 1 },
  { ticket: 'BACK-1302', summary: 'ML Label or Challenge Output Handler CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 1 },
  { ticket: 'BACK-1301', summary: 'ML Label or Challenge Input CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 1 },
  { ticket: 'BACK-1298', summary: 'ML Label or Challenge Workflow', assignee: 'Ivan Peev', points: 13, daysInReview: 1 },
  { ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 3 },
  { ticket: 'BACK-1980', summary: 'AWS SQS to Kafka Camel Adapter', assignee: 'Lane Terry', points: 5, daysInReview: 2 },
  { ticket: 'BACK-1999', summary: 'Normalized Value persists if updated', assignee: 'Kannal Mutharasu', points: 2, daysInReview: 1 },
  { ticket: 'BACK-2008', summary: '[Sunwest] Troubleshoot token errors', assignee: 'Brandon Baguley', points: 1, daysInReview: 3 },
  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 7 }
];"""
content = content.replace(old_crq, new_crq)
write_file(ec, content)
print("  Updated: engineerCapacityData.ts (CR queue)")

# ============================================================
# STEP 8: mondaySalesPipelineData.ts
# ============================================================
print("\n=== STEP 8: mondaySalesPipelineData.ts ===")
mp = os.path.join(CLIENT_DATA, "mondaySalesPipelineData.ts")

update_file_all(mp, "113 deals", "114 deals")
update_file(mp, "totalAccounts: 113", "totalAccounts: 114")
update_file(mp, "weightedPipeline: 3467000", "weightedPipeline: 3507000")
update_file(mp, "$3.467M weighted", "$3.507M weighted")
update_file(mp, "$3,467,000", "$3,507,000")

# ============================================================
# STEP 9: blockedItemsData.ts
# ============================================================
print("\n=== STEP 9: blockedItemsData.ts ===")
bi = os.path.join(CLIENT_DATA, "blockedItemsData.ts")
update_file_all(bi, "daysBlocked: 20", "daysBlocked: 21")
update_file_all(bi, "Blocked 20 days", "Blocked 21 days")
update_file_all(bi, "daysSinceUpdate: 27", "daysSinceUpdate: 28")
update_file_all(bi, "daysSinceUpdate: 20", "daysSinceUpdate: 21")

# ============================================================
print(f"\n=== ALL DONE! March 6, 2026 update complete ===")
print(f"Sprint S5 Day 7/14: 80 tickets, 202 pts, 32 Done (78 pts)")
print(f"40.0% ticket completion, 38.6% points completion")
print(f"Stale: 3 (2 IP + 1 CR). Down from 6! Ivan moved 4 items IP→CR.")
print(f"Health: RED→YELLOW. Monday.com: 114 deals, $13.655M, $3.507M weighted.")
