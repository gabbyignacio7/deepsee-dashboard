#!/usr/bin/env python3
"""March 9, 2026 Dashboard Update Script (Monday - weekend catchup)
Sprint S5 Day 10/14: 87 tickets, 213 pts, 38 Done (89 pts)
+7 tickets, +11 pts. 6 Done over weekend. Stale back up 3->6.
Ivan added BACK-1326 (IP 5pts). Jeff +2 new CI tickets.
Brandon cleared 3 tickets to Done, added 2 new IPs.
Lane's 2 CRs now stale (5d, 4d).
Monday.com: 113 deals, $13.171M (-$484K), $3.384M weighted (-$123K).
BetaNxt: $340K->$125K but advanced to CC stage.
Health: YELLOW->RED (5 red, 1 yellow, 1 green, 1 red).
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
    content = read_file(path)
    if old not in content:
        print(f"  WARNING: not found in {os.path.basename(path)}: {old[:60]}...")
        return
    content = content.replace(old, new, 1)
    write_file(path, content)
    print(f"  Updated: {os.path.basename(path)}")

def update_file_all(path, old, new):
    content = read_file(path)
    if old not in content:
        print(f"  WARNING (all): not found in {os.path.basename(path)}: {old[:60]}...")
        return
    content = content.replace(old, new)
    write_file(path, content)
    print(f"  Updated (all): {os.path.basename(path)}")

# ============================================================
# STEP 1: Bulk timestamp replacement (Mar 6 -> Mar 9)
# ============================================================
print("\n=== STEP 1: Timestamps (Mar 6 -> Mar 9) ===")

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
    ("March 6, 2026", "March 9, 2026"),
    ("2026-03-06", "2026-03-09"),
    ("1:36 PM MT", "12:22 PM MT"),
    ("Day 7", "Day 10"),
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
write_file(ts_path, '''export const EXTRACTION_TIMESTAMP = "2026-03-09T12:22:00-07:00";
export const LAST_UPDATED = "March 9, 2026 at 12:22 PM MT";
export function formatDataTimestamp(): string {
  return "March 9, 2026, 12:22 PM MT";
}
''')
print("  Done")

# ============================================================
# STEP 3: sprintData.ts
# ============================================================
print("\n=== STEP 3: sprintData.ts ===")
sd = os.path.join(CLIENT_DATA, "sprintData.ts")

update_file(sd,
    "totalTickets: 80,\n  totalPoints: 202,\n  completedTickets: 32,\n  completedPoints: 78,",
    "totalTickets: 87,\n  totalPoints: 213,\n  completedTickets: 38,\n  completedPoints: 89,"
)
update_file(sd,
    "toDo: 19,\n    blocked: 0,\n    inProgress: 12,\n    codeReview: 9,\n    done: 32",
    "toDo: 18,\n    blocked: 0,\n    inProgress: 15,\n    codeReview: 7,\n    done: 38"
)
update_file(sd,
    "completionRate: 40.0,\n  pointsCompletionRate: 38.6,\n  health: 'yellow',\n  daysRemaining: 7,\n  daysElapsed: 7,",
    "completionRate: 43.7,\n  pointsCompletionRate: 41.8,\n  health: 'red',\n  daysRemaining: 4,\n  daysElapsed: 10,"
)
update_file(sd,
    "mix: { artemis: 8, client: 12, infrastructure: 3 },",
    "mix: { artemis: 8, client: 14, infrastructure: 3 },"
)

# ============================================================
# STEP 4: jiraMetrics.ts
# ============================================================
print("\n=== STEP 4: jiraMetrics.ts ===")
jm = os.path.join(CLIENT_DATA, "jiraMetrics.ts")

update_file(jm,
    'totalStoryPoints: 202,\n    avgVelocity: 134,\n    overCommitment: "At 202 pts (avg 134) -- 51% over velocity"',
    'totalStoryPoints: 213,\n    avgVelocity: 134,\n    overCommitment: "At 213 pts (avg 134) -- 59% over velocity"'
)
update_file(jm,
    "totalActiveTickets: 80,\n    totalInProgress: 12,\n    totalToDo: 19,\n    totalCodeReview: 9,\n    totalBlocked: 0,\n    totalDone: 32,\n    totalWithStoryPoints: 55",
    "totalActiveTickets: 87,\n    totalInProgress: 15,\n    totalToDo: 18,\n    totalCodeReview: 7,\n    totalBlocked: 0,\n    totalDone: 38,\n    totalWithStoryPoints: 60"
)
update_file(jm,
    "completed: 78,\n    inProgress: 31,\n    notStarted: 48,\n    completionRate: 38.6",
    "completed: 89,\n    inProgress: 38,\n    notStarted: 44,\n    completionRate: 41.8"
)

# Update highestLoad
update_file(jm,
    """    highestLoad: [
      { name: "Ivan Peev", tickets: 8 },
      { name: "Kannal Mutharasu", tickets: 6 },
      { name: "Lane Terry", tickets: 5 },
      { name: "Jeff Hegerhorst", tickets: 5 }
    ]""",
    """    highestLoad: [
      { name: "Ivan Peev", tickets: 9 },
      { name: "Jeff Hegerhorst", tickets: 7 },
      { name: "Brandon Baguley", tickets: 7 },
      { name: "Kannal Mutharasu", tickets: 6 }
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
      daysInStatus: 10,
      warningLevel: "critical",
      reason: "Stale in In Progress -- 10 days"
    },
    {
      id: "CI-946",
      title: "Investigate gpu node failure",
      assignee: "Chad Hegerhorst",
      status: "In Progress",
      daysInStatus: 9,
      warningLevel: "critical",
      reason: "Stale in In Progress -- 9 days"
    },
    {
      id: "CI-937",
      title: "Create Basic K8s Operator for Deployment POC",
      assignee: "Jeff Hegerhorst",
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
      daysInStatus: 10,
      warningLevel: "critical",
      reason: "Stale in Code Review -- 10 days, unassigned"
    },
    {
      id: "BACK-2011",
      title: "Automations Improvements",
      assignee: "Lane Terry",
      status: "Code Review",
      daysInStatus: 5,
      warningLevel: "warning",
      reason: "Stale in Code Review -- 5 days"
    },
    {
      id: "BACK-1980",
      title: "AWS SQS to Kafka Camel Adapter",
      assignee: "Lane Terry",
      status: "Code Review",
      daysInStatus: 4,
      warningLevel: "warning",
      reason: "Stale in Code Review -- 4 days"
    }
  ]"""
content = content.replace(old_lrt, new_lrt)
write_file(jm, content)
print("  Replaced longRunningTickets array")

# Update sprint comparison
update_file(jm,
    's5: { sprint: "2026-S5", committed: 202, completed: 78, rate: 38.6, status: "in_progress" }',
    's5: { sprint: "2026-S5", committed: 213, completed: 89, rate: 41.8, status: "in_progress" }'
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
  { metric: "Sprint Progress", s2Value: "43.7% (Day 10)", target: "71.4% expected", status: "red", detail: "43.7% complete vs 71.4% expected at Day 10. 27.7% behind pace with only 4 days remaining." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked. New: UI-794 (Colony HMDA) blocked, assigned to Karolina." },
  { metric: "Code Review Queue", s2Value: "7 items (3 stale CR + 3 stale IP)", target: "GREEN <5", status: "red", detail: "7 CR items. 3 stale CR (BACK-1993 10d, BACK-2011 5d, BACK-1980 4d) + 3 stale IP (UI-780 10d, CI-946 9d, CI-937 7d)." },
  { metric: "Unassigned Tickets", s2Value: "23 of 87", target: "GREEN <5, RED >15", status: "red", detail: "26.4% of sprint unassigned -- improved from 27.5% but still far above 5% target." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "9.2%", target: "60%", status: "red", detail: "ARTEMIS at 9.2% vs 60% target -- 8 tickets, continuing to decline as sprint scope grows." },
  { metric: "Engineer Capacity", s2Value: "~12.7 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 12.7 avg pts/engineer. Ivan 26pts, Jeff 20pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "6 items", target: "GREEN 0", status: "red", detail: "3 stale IP (UI-780 10d, CI-946 9d, CI-937 7d) + 3 stale CR (BACK-1993 10d, BACK-2011 5d, BACK-1980 4d). Back up from 3." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "red", detail: "S6 not yet planned -- only 4 days to sprint start. Critical: grooming must happen TODAY." }
];"""

content = content[:old_health_start] + new_health + content[old_health_end:]

# Update overall health back to RED
content = content.replace('export const overallHealth: OverallHealth = "YELLOW";', 'export const overallHealth: OverallHealth = "RED";')

# Replace healthRecommendations
old_rec_start = content.index("export const healthRecommendations = [")
old_rec_end = content.index("];", old_rec_start) + 2

new_rec = """export const healthRecommendations = [
  {
    issue: "SPRINT S5 DAY 10 -- 43.7% vs 71.4% PACE",
    recommendation: "S5 Day 10/14. 89/213 pts complete (41.8%). 124 pts remaining in 4 days = 31 pts/day needed. Very unlikely to complete.",
    priority: "critical"
  },
  {
    issue: "6 STALE ITEMS (3 IP + 3 CR) -- DOUBLED",
    recommendation: "Stale doubled from 3 to 6 over weekend. Lane's 2 CRs now stale. CI-937 Jeff now stale IP. BACK-1993 at 10 days unassigned.",
    priority: "critical"
  },
  {
    issue: "S6 PLANNING NOT STARTED -- 4 DAYS LEFT",
    recommendation: "Next sprint starts Mar 13, just 4 days away. Zero tickets planned. Grooming must happen immediately.",
    priority: "critical"
  },
  {
    issue: "23 UNASSIGNED TICKETS (26.4%)",
    recommendation: "23 of 87 tickets unassigned (26.4%). 5x above 5% target. With 4 days left, unassigned tickets are likely rollovers.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 9.2% vs 60% target",
    recommendation: "At 9.2% vs 60% target. Declining each refresh. S6 planning MUST prioritize ARTEMIS allocation.",
    priority: "critical"
  },
  {
    issue: "PIPELINE DOWN $484K -- BetaNxt restructured",
    recommendation: "Pipeline dropped $13.655M to $13.171M. BetaNxt reduced $340K to $125K but advanced to CC (80%). Colony expired -37d.",
    priority: "high"
  }
];"""

content = content[:old_rec_start] + new_rec + content[old_rec_end:]

# Update baselineComparison
content = content.replace(
    '{ metric: "Sprint", baseline: "S5 Day 5", current: "S5 Day 7", delta: "+1 day", trend: "progressing" }',
    '{ metric: "Sprint", baseline: "S5 Day 7", current: "S5 Day 10", delta: "+3 days", trend: "progressing" }'
)
content = content.replace(
    '{ metric: "Tickets", baseline: 72, current: 80, delta: "+8", trend: "scope added" }',
    '{ metric: "Tickets", baseline: 80, current: 87, delta: "+7", trend: "scope added" }'
)
content = content.replace(
    '{ metric: "Points", baseline: 190, current: 202, delta: "+12", trend: "scope added" }',
    '{ metric: "Points", baseline: 202, current: 213, delta: "+11", trend: "scope added" }'
)
content = content.replace(
    '{ metric: "Completion", baseline: "36.1%", current: "40.0%", delta: "+3.9%", trend: "improving" }',
    '{ metric: "Completion", baseline: "40.0%", current: "43.7%", delta: "+3.7%", trend: "improving" }'
)
content = content.replace(
    '{ metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" }',
    '{ metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" }'
)
content = content.replace(
    '{ metric: "ARTEMIS %", baseline: 11.1, current: 10.0, delta: "-1.1%", trend: "declining" }',
    '{ metric: "ARTEMIS %", baseline: 10.0, current: 9.2, delta: "-0.8%", trend: "declining" }'
)
content = content.replace(
    '{ metric: "Unassigned", baseline: 22, current: 22, delta: "0", trend: "stable" }',
    '{ metric: "Unassigned", baseline: 22, current: 23, delta: "+1", trend: "worsened" }'
)
content = content.replace(
    '{ metric: "Health", baseline: "RED", current: "YELLOW", delta: "Improved", trend: "improving" }',
    '{ metric: "Health", baseline: "YELLOW", current: "RED", delta: "Worsened", trend: "declining" }'
)

# Update sprintPlanningAlert
content = content.replace("completionRate: 40.0,", "completionRate: 43.7,")
content = content.replace("pointsCompletionRate: 38.6,", "pointsCompletionRate: 41.8,")
content = content.replace("daysRemaining: 7,", "daysRemaining: 4,")
content = content.replace("status: 'YELLOW'", "status: 'RED'")

# Fix the stale actionNeeded text from prior updates
old_action = content[content.index("actionNeeded: '"):content.index("'", content.index("actionNeeded: '") + len("actionNeeded: '")) + 1]
content = content.replace(old_action,
    "actionNeeded: 'S5 Day 10 -- 43.7% complete vs 71.4% expected. 23 unassigned (26.4%). 6 stale items (doubled). ARTEMIS 9.2% vs 60%. Colony expired (-37d). S6 NOT STARTED (4 days).'"
)

# Update workMix in health file
content = content.replace(
    "artemis: { tickets: 8, points: 18, percent: 10, target: '60%', status: 'below' as const },\n  client: { tickets: 12, points: 33, percent: 15, target: '30%', status: 'below' as const },\n  infrastructure: { tickets: 3, points: 7, percent: 4, target: '10%', status: 'below' as const }",
    "artemis: { tickets: 8, points: 18, percent: 9, target: '60%', status: 'below' as const },\n  client: { tickets: 14, points: 38, percent: 16, target: '30%', status: 'below' as const },\n  infrastructure: { tickets: 3, points: 7, percent: 3, target: '10%', status: 'below' as const }"
)

# Update velocityHistory S5 line
content = content.replace(
    '{ sprint: "2026-S5", committed: 202, completed: 78, rate: 38.6, status: "in_progress" }',
    '{ sprint: "2026-S5", committed: 213, completed: 89, rate: 41.8, status: "in_progress" }'
)

write_file(sh, content)
print("  Updated: sprintHealthData.ts (direct edit)")

# ============================================================
# STEP 6: workMixData.ts
# ============================================================
print("\n=== STEP 6: workMixData.ts ===")
wm = os.path.join(CLIENT_DATA, "workMixData.ts")

# ARTEMIS percentage 10->9
update_file(wm,
    's2Percentage: 10,\n    target: "50-60%",',
    's2Percentage: 9,\n    target: "50-60%",'
)

# Client work 12->14 tickets, 15->16%
update_file(wm,
    'category: "Client Work",\n    s2Tickets: 12,\n    s2Percentage: 15,',
    'category: "Client Work",\n    s2Tickets: 14,\n    s2Percentage: 16,'
)

# Colony Bank days -34 -> -37
update_file(wm,
    "(-34 days)",
    "(-37 days)"
)

# workMixSummary
update_file(wm,
    "totalTickets: 80,\n  totalPoints: 202,\n  artemisPercentage: 10,",
    "totalTickets: 87,\n  totalPoints: 213,\n  artemisPercentage: 9,"
)
update_file(wm,
    "clientPercentage: 15,\n  clientTarget: 30,\n  infrastructurePercentage: 4,",
    "clientPercentage: 16,\n  clientTarget: 30,\n  infrastructurePercentage: 3,"
)
update_file(wm,
    "artemis: -50, // 10 - 60 (SEVERELY UNDER)\n    client: -15 // 15 - 30 (UNDER)",
    "artemis: -51, // 9 - 60 (SEVERELY UNDER)\n    client: -14 // 16 - 30 (UNDER)"
)

# ============================================================
# STEP 7: engineerCapacityData.ts
# ============================================================
print("\n=== STEP 7: engineerCapacityData.ts ===")
ec = os.path.join(CLIENT_DATA, "engineerCapacityData.ts")

# Lane: 5t/17pts stays, but CRs now stale
update_file(ec,
    "s4Tickets: 5, s4Points: 17, status: 'green', statusNote: '1 IP, 2 CR, 2 Done, backlog debt +2'",
    "s4Tickets: 5, s4Points: 17, status: 'yellow', statusNote: '1 IP, 2 CR (stale 5d+4d), 2 Done, backlog debt +2'"
)

# Jeff: 5->7 tickets, 15->20 pts
update_file(ec,
    "s4Tickets: 5, s4Points: 15, status: 'green', statusNote: '1 IP, 4 Done, backlog debt -1'",
    "s4Tickets: 7, s4Points: 20, status: 'yellow', statusNote: '3 IP (CI-937 stale 7d), 4 Done, backlog debt -1'"
)

# Chad: CI-946 now 9d stale
update_file(ec,
    "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP (stale 7d), 1 Done, backlog debt +1'",
    "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP (stale 9d), 1 Done, backlog debt +1'"
)

# Ivan: 8->9 tickets, 21->26 pts
update_file(ec,
    "s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '4 CR (moved from stale IP), 4 Done, backlog debt -4'",
    "s4Tickets: 9, s4Points: 26, status: 'yellow', statusNote: '1 IP (BACK-1326 new), 4 CR, 4 Done, backlog debt -4'"
)

# Darius: 4t stays, 8->6 pts
update_file(ec,
    "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '1 IP, 1 ToDo, 2 Done, backlog debt +2'",
    "s4Tickets: 4, s4Points: 6, status: 'green', statusNote: '1 IP (BACK-2018), 3 Done, backlog debt +1'"
)

# Kannal: 6t, 14->15 pts, BACK-1999 Done
update_file(ec,
    "s4Tickets: 6, s4Points: 14, status: 'green', statusNote: '1 IP, 1 CR, 4 Done, backlog debt -1'",
    "s4Tickets: 6, s4Points: 15, status: 'green', statusNote: '1 IP, 5 Done, backlog debt -2'"
)

# Kalvin: stays 5t/8pts
# Aleksander: stays 5t/19pts
# Owen: UI-780 now 10d stale
update_file(ec,
    "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP (stale 7d), 4 Done, backlog debt -4'",
    "s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '1 IP (stale 10d), 4 Done, backlog debt -4'"
)

# Matthew: stays 3t/5pts
# Treven: stays 2t/10pts

# capacitySummary
update_file(ec,
    "totalS3Tickets: 80,\n  totalS3Points: 202,\n  s3Assigned: 58,\n  s3Unassigned: 22,\n  s3UnassignedPercent: 27.5,\n  totalAssignedPoints: 158,\n  unassignedPoints: 44,\n  avgPointsPerEngineer: 13.2,",
    "totalS3Tickets: 87,\n  totalS3Points: 213,\n  s3Assigned: 64,\n  s3Unassigned: 23,\n  s3UnassignedPercent: 26.4,\n  totalAssignedPoints: 169,\n  unassignedPoints: 44,\n  avgPointsPerEngineer: 12.7,"
)

update_file(ec,
    "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (5 tickets, 17 pts)', 'Jeff Hegerhorst (5 tickets, 15 pts)']",
    "heavyWorkloads: ['Ivan Peev (9 tickets, 26 pts)', 'Jeff Hegerhorst (7 tickets, 20 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (5 tickets, 17 pts)']"
)

# Code review queue - complete replacement
content = read_file(ec)
old_crq = content[content.index("export const codeReviewQueue = ["):content.index("];", content.index("export const codeReviewQueue = [")) + 2]
new_crq = """export const codeReviewQueue = [
  { ticket: 'BACK-1303', summary: 'ML Label or Challenge Workflow Template', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1302', summary: 'ML Label or Challenge Output Handler CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1301', summary: 'ML Label or Challenge Input CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1298', summary: 'ML Label or Challenge Workflow', assignee: 'Ivan Peev', points: 13, daysInReview: 4 },
  { ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 5 },
  { ticket: 'BACK-1980', summary: 'AWS SQS to Kafka Camel Adapter', assignee: 'Lane Terry', points: 5, daysInReview: 4 },
  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 10 }
];"""
content = content.replace(old_crq, new_crq)
write_file(ec, content)
print("  Updated: engineerCapacityData.ts (CR queue)")

# ============================================================
# STEP 8: mondaySalesPipelineData.ts
# ============================================================
print("\n=== STEP 8: mondaySalesPipelineData.ts ===")
mp = os.path.join(CLIENT_DATA, "mondaySalesPipelineData.ts")

update_file(mp, "totalPipeline: 13655000,", "totalPipeline: 13171000,")
update_file(mp, "weightedPipeline: 3506950,", "weightedPipeline: 3383500,")
update_file(mp, "activeDeals: 114,", "activeDeals: 113,")
update_file(mp, "activeAccounts: 114,", "activeAccounts: 113,")
update_file(mp, "totalAccounts: 114,", "totalAccounts: 113,")

# ============================================================
# STEP 9: blockedItemsData.ts
# ============================================================
print("\n=== STEP 9: blockedItemsData.ts ===")
bi = os.path.join(CLIENT_DATA, "blockedItemsData.ts")
update_file_all(bi, "daysBlocked: 21", "daysBlocked: 24")
update_file_all(bi, "Blocked 21 days", "Blocked 24 days")
update_file_all(bi, "daysSinceUpdate: 28", "daysSinceUpdate: 31")
update_file_all(bi, "daysSinceUpdate: 21", "daysSinceUpdate: 24")

# ============================================================
print(f"\n=== ALL DONE! March 9, 2026 update complete ===")
print(f"Sprint S5 Day 10/14: 87 tickets, 213 pts, 38 Done (89 pts)")
print(f"43.7% ticket completion, 41.8% points completion")
print(f"Stale: 6 (3 IP + 3 CR). Back up from 3. Health: YELLOW->RED.")
print(f"Monday.com: 113 deals, $13.171M (-$484K), $3.384M weighted.")
