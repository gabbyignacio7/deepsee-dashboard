"""Bulk update dashboard data files with March 3, 2026 extraction data.

Sprint 2026-S5 Day 4 of 14 (Feb 27 - Mar 13)
JIRA: 67 tickets (66 active), 154 pts (151 active), 9 Done (23 pts)
Monday.com: 113 deals, $13.672M raw, $3.467M weighted
Stale: 3 IP (BACK-1301/1302/1303), 3 CR (BACK-1299/1300/1311) -- all Ivan Peev
"""
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, 'client', 'src', 'data')
COMP = os.path.join(BASE, 'client', 'src', 'components')
PAGES = os.path.join(BASE, 'client', 'src', 'pages')

def update_file(filename, replacements):
    path = os.path.join(DATA, filename)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        if old in c:
            c = c.replace(old, new, 1)
        else:
            print(f'  WARNING: not found in {filename}: {old[:70]}...')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated: {filename}')

def update_file_all(filename, replacements):
    path = os.path.join(DATA, filename)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        if old in c:
            c = c.replace(old, new)
        else:
            print(f'  WARNING (all): not found in {filename}: {old[:70]}...')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated (all): {filename}')


# ============================================================
# STEP 1: Bulk timestamp replacement (Mar 2 -> Mar 3)
# ============================================================
print('=== STEP 1: Timestamps (Mar 2 -> Mar 3) ===')
for dirpath in [DATA, COMP, PAGES]:
    for root, dirs, files in os.walk(dirpath):
        for fname in files:
            if fname.endswith(('.ts', '.tsx')):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                if 'changeLog' not in fname:
                    content = content.replace('March 2, 2026', 'March 3, 2026')
                    content = content.replace('2026-03-02', '2026-03-03')
                    content = content.replace('9:24 AM MT', '10:12 AM MT')
                    content = content.replace('T09:24:00', 'T10:12:00')
                if content != original:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'  {os.path.relpath(fpath, BASE)}')


# ============================================================
# STEP 2: Update timestamp.ts
# ============================================================
print('\n=== STEP 2: timestamp.ts ===')
ts_path = os.path.join(DATA, 'timestamp.ts')
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('''export const EXTRACTION_TIMESTAMP = "2026-03-03T10:12:00-07:00";
export const LAST_UPDATED = "March 3, 2026 at 10:12 AM MT";
export function formatDataTimestamp(): string {
  return "March 3, 2026, 10:12 AM MT";
}
''')
print('  Done')


# ============================================================
# STEP 3: sprintData.ts -- S5 Day 3 -> Day 4
# ============================================================
print('\n=== STEP 3: sprintData.ts ===')
update_file_all('sprintData.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
])
update_file('sprintData.ts', [
    ('totalTickets: 66,', 'totalTickets: 67,'),
    ('totalPoints: 135,', 'totalPoints: 154,'),
    ('completedTickets: 6,', 'completedTickets: 9,'),
    ('completedPoints: 17,', 'completedPoints: 23,'),
    ('toDo: 31,', 'toDo: 26,'),
    ('inProgress: 15,', 'inProgress: 16,'),
    ('codeReview: 7,', 'codeReview: 10,'),
    ('done: 6', 'done: 9'),
    ('completionRate: 9.2,', 'completionRate: 13.6,'),
    ('pointsCompletionRate: 12.9,', 'pointsCompletionRate: 15.2,'),
    ('daysRemaining: 11,', 'daysRemaining: 10,'),
    ('daysElapsed: 3,', 'daysElapsed: 4,'),
    ('mix: { artemis: 6, client: 6, infrastructure: 1 },', 'mix: { artemis: 7, client: 7, infrastructure: 1 },'),
])


# ============================================================
# STEP 4: jiraMetrics.ts
# ============================================================
print('\n=== STEP 4: jiraMetrics.ts ===')
update_file_all('jiraMetrics.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
])
update_file('jiraMetrics.ts', [
    ('daysRemaining: 11,', 'daysRemaining: 10,'),
    ('totalStoryPoints: 135,', 'totalStoryPoints: 154,'),
    ('"At 135 pts (avg 134) -- on par with velocity"',
     '"At 154 pts (avg 134) -- 15% over velocity"'),
    ('totalActiveTickets: 66,', 'totalActiveTickets: 67,'),
    ('totalInProgress: 15,', 'totalInProgress: 16,'),
    ('totalToDo: 31,', 'totalToDo: 26,'),
    ('totalCodeReview: 7,', 'totalCodeReview: 10,'),
    ('totalDone: 6,', 'totalDone: 9,'),
    ('totalWithStoryPoints: 55', 'totalWithStoryPoints: 56'),
    ('completed: 17,', 'completed: 23,'),
    ('inProgress: 32,', 'inProgress: 47,'),
    ('notStarted: 48,', 'notStarted: 43,'),
    ('completionRate: 12.9', 'completionRate: 15.2'),
    ('{ name: "Owen Riley", tickets: 4 }', '{ name: "Owen Riley", tickets: 5 }'),
    ('{ name: "Ivan Peev", tickets: 8 }', '{ name: "Ivan Peev", tickets: 8 }'),
    ('{ name: "Kannal Mutharasu", tickets: 3 }', '{ name: "Kannal Mutharasu", tickets: 6 }'),
    ('{ name: "Treven Trujillo", tickets: 1 }', '{ name: "Aleksander Winski", tickets: 5 }'),
    # Sprint comparison
    ('s5: { sprint: "2026-S5", committed: 135, completed: 17, rate: 12.9, status: "in_progress" }',
     's5: { sprint: "2026-S5", committed: 154, completed: 23, rate: 15.2, status: "in_progress" }'),
    # Long running tickets -- add stale IP items
    ('daysInStatus: 5,\n      warningLevel: "warning",\n      reason: "Stale in Code Review -- carryover from S4"\n    }\n  ]',
     'daysInStatus: 6,\n      warningLevel: "warning",\n      reason: "Stale in Code Review -- carryover from S4"\n    },\n    {\n      id: "BACK-1301",\n      title: "Single Model Workflow Orchestrator",\n      assignee: "Ivan Peev",\n      status: "In Progress",\n      daysInStatus: 5,\n      warningLevel: "warning",\n      reason: "Stale in In Progress"\n    },\n    {\n      id: "BACK-1302",\n      title: "Single Model Result Aggregator",\n      assignee: "Ivan Peev",\n      status: "In Progress",\n      daysInStatus: 5,\n      warningLevel: "warning",\n      reason: "Stale in In Progress"\n    },\n    {\n      id: "BACK-1303",\n      title: "Single Model Error Handler",\n      assignee: "Ivan Peev",\n      status: "In Progress",\n      daysInStatus: 5,\n      warningLevel: "warning",\n      reason: "Stale in In Progress"\n    }\n  ]'),
])
# Also update all CR daysInStatus from 5 to 6
update_file_all('jiraMetrics.ts', [
    ('daysInStatus: 5,', 'daysInStatus: 6,'),
])


# ============================================================
# STEP 5: sprintHealthData.ts
# ============================================================
print('\n=== STEP 5: sprintHealthData.ts ===')
update_file_all('sprintHealthData.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
    ('Sprint 2026-S5 Day 3', 'Sprint 2026-S5 Day 4'),
    ('S5 Day 3', 'S5 Day 4'),
])
update_file('sprintHealthData.ts', [
    # Sprint Progress
    ('"12.9% (Day 4)"', '"15.2% (Day 4)"'),
    ('"21.4% expected"', '"28.6% expected"'),
    ('"12.9% complete vs 21.4% expected at Day 4. New sprint S5 started Feb 27."',
     '"15.2% complete vs 28.6% expected at Day 4. Sprint S5 picking up momentum."'),
    # CR
    ('"7 items (3 stale)"', '"10 items (3 stale CR + 3 stale IP)"'),
    ('"7 items in CR, 3 stale (BACK-1299/1300/1311 Ivan Peev). Carryover from S4."',
     '"10 items in CR. 3 stale CR + 3 stale IP (BACK-1299/1300/1301/1302/1303/1311 all Ivan Peev)."'),
    # Unassigned -- need to calculate: 67 - assigned. Let me estimate from engineer data.
    # Assigned: 1+2+2+8+2+6+4+5+5+2+1+0+0+0+1 = 39, unassigned = 67-39 = 28
    ('"30 of 66"', '"28 of 67"'),
    ('"45.5% of sprint unassigned -- new sprint, many tickets need assignment"',
     '"41.8% of sprint unassigned -- slightly improved from 45.5% but still critical"'),
    # ARTEMIS
    ('"9.1%"', '"10.4%"'),
    ('"ARTEMIS at 9.1% vs 60% target -- severely under-allocated. Must improve in S5."',
     '"ARTEMIS at 10.4% vs 60% target -- severely under-allocated."'),
    # Engineer Capacity: avg = 154/15 = 10.3
    ('"~8.8 avg"', '"~10.3 avg"'),
    ('"2 engineers missing (Loris, Karolina). 8.8 avg pts/engineer. Ivan 21pts highest."',
     '"2 engineers missing (Loris, Karolina). 10.3 avg pts/engineer. Aleksander 24pts, Ivan 21pts highest."'),
    # Stale items
    ('"3 items"', '"6 items"'),
    ('"3 stale CR: BACK-1299, BACK-1300, BACK-1311 (all Ivan Peev). Carryover from S4."',
     '"3 stale CR + 3 stale IP (all Ivan Peev). BACK-1299/1300/1311 CR, BACK-1301/1302/1303 IP."'),
    # Recommendations
    ('30 UNASSIGNED TICKETS (45.5%)', '28 UNASSIGNED TICKETS (41.8%)'),
    ('New sprint S5 has 30 of 66 tickets unassigned (45.5%). Sprint planning session needed urgently.',
     '28 of 67 tickets unassigned (41.8%). Slightly improved but still critical. Sprint planning ongoing.'),
    ('SPRINT S5 DAY 4 -- 12.9% vs 21.4%', 'SPRINT S5 DAY 4 -- 15.2% vs 28.6%'),
    ('S5 Day 4/14. 17/135 pts complete (12.9%). Slightly behind pace. 30 tickets still unassigned.',
     'S5 Day 4/14. 23/154 pts complete (15.2%). Behind pace (28.6% expected). 28 tickets unassigned.'),
    ('ARTEMIS WORK MIX -- 9.1% vs 60% target', 'ARTEMIS WORK MIX -- 10.4% vs 60% target'),
    ('At 9.1% vs 60% target. Severely under-allocated. Carryover issue from S4 -- must address immediately.',
     'At 10.4% vs 60% target. Slightly improved from 9.1% but still severely under-allocated.'),
    ('-30 days', '-31 days'),
    ('3 STALE CR ITEMS', '6 STALE ITEMS (3 CR + 3 IP)'),
    ('BACK-1299, BACK-1300, BACK-1311 stale in CR (all Ivan Peev). Carryover from S4 -- need review.',
     'Ivan Peev has 6 stale items: 3 CR (BACK-1299/1300/1311) + 3 IP (BACK-1301/1302/1303). Needs review.'),
    # Baseline
    ('baseline: "S4 Day 14", current: "S5 Day 4"', 'baseline: "S5 Day 3", current: "S5 Day 4"'),
    ('delta: "New Sprint", trend: "new sprint"', 'delta: "+1 day", trend: "progressing"'),
    ('baseline: 103, current: 66', 'baseline: 66, current: 67'),
    ('delta: "-37", trend: "new sprint scope"', 'delta: "+1", trend: "scope added"'),
    ('baseline: 252, current: 135', 'baseline: 135, current: 154'),
    ('delta: "-117", trend: "new sprint scope"', 'delta: "+19", trend: "scope added"'),
    ('baseline: "49.6%", current: "12.9%", delta: "N/A", trend: "new sprint"',
     'baseline: "12.9%", current: "15.2%", delta: "+2.3%", trend: "improving"'),
    ('baseline: 9.7, current: 9.1, delta: "-0.6%", trend: "worsened"',
     'baseline: 9.1, current: 10.4, delta: "+1.3%", trend: "improved"'),
    ('baseline: 18, current: 30, delta: "+12", trend: "new sprint"',
     'baseline: 30, current: 28, delta: "-2", trend: "improved"'),
    # Sprint planning alert
    ('completionRate: 9.2,', 'completionRate: 13.6,'),
    ('pointsCompletionRate: 12.9,', 'pointsCompletionRate: 15.2,'),
    ('daysRemaining: 11,', 'daysRemaining: 10,'),
    ("actionNeeded: 'S5 Day 3 -- 12.9% complete vs 21.4% expected. 30 unassigned (45.5%). 3 stale CR. ARTEMIS at 9.1% vs 60% target. Colony expired (-30d). BetaNxt close date expired.'",
     "actionNeeded: 'S5 Day 4 -- 15.2% complete vs 28.6% expected. 28 unassigned (41.8%). 6 stale items. ARTEMIS at 10.4% vs 60% target. Colony expired (-31d). BetaNxt expired.'"),
    # Work mix
    ('artemis: { tickets: 6, points: 13, percent: 9', 'artemis: { tickets: 7, points: 15, percent: 10'),
    ('client: { tickets: 6, points: 12, percent: 9', 'client: { tickets: 7, points: 14, percent: 10'),
    # Velocity
    ('{ sprint: "2026-S5", committed: 135, completed: 17, rate: 12.9, status: "in_progress" }',
     '{ sprint: "2026-S5", committed: 154, completed: 23, rate: 15.2, status: "in_progress" }'),
])


# ============================================================
# STEP 6: workMixData.ts
# ============================================================
print('\n=== STEP 6: workMixData.ts ===')
update_file_all('workMixData.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
    ('-30 days', '-31 days'),
])
update_file('workMixData.ts', [
    ('s2Tickets: 6,\n    s2Percentage: 9,\n    target: "50-60%"', 's2Tickets: 7,\n    s2Percentage: 10,\n    target: "50-60%"'),
    ('s2Tickets: 6,\n    s2Percentage: 9,\n    target: "30-35%"', 's2Tickets: 7,\n    s2Percentage: 10,\n    target: "30-35%"'),
    ('totalTickets: 66,', 'totalTickets: 67,'),
    ('totalPoints: 135,', 'totalPoints: 154,'),
    ('artemisPercentage: 9,', 'artemisPercentage: 10,'),
    ('clientPercentage: 9,', 'clientPercentage: 10,'),
    ('artemis: -51, // 9 - 60 (SEVERELY UNDER)', 'artemis: -50, // 10 - 60 (SEVERELY UNDER)'),
    ('client: -21 // 9 - 30 (UNDER)', 'client: -20 // 10 - 30 (UNDER)'),
])


# ============================================================
# STEP 7: engineerCapacityData.ts
# ============================================================
print('\n=== STEP 7: engineerCapacityData.ts ===')
update_file_all('engineerCapacityData.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
    ('Sprint S5 Day 3', 'Sprint S5 Day 4'),
])
update_file('engineerCapacityData.ts', [
    # Jeff Hegerhorst: 2t, 10pts, debt=2
    ("s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 IP, backlog debt +2'",
     "s4Tickets: 2, s4Points: 10, status: 'yellow', statusNote: '2 IP, backlog debt +2'"),
    # Kannal Mutharasu: 6t, 9pts, debt=2
    ("s4Tickets: 3, s4Points: 4, status: 'yellow', statusNote: '1 IP, 1 CR, 1 Done, backlog debt +2'",
     "s4Tickets: 6, s4Points: 9, status: 'yellow', statusNote: '2 IP, 2 CR, 2 Done, backlog debt +2'"),
    # Kalvin Willison: 4t, 5pts, debt=0
    ("s4Tickets: 3, s4Points: 5, status: 'yellow', statusNote: '2 IP, 1 ToDo, backlog debt +1'",
     "s4Tickets: 4, s4Points: 5, status: 'green', statusNote: '2 IP, 1 CR, 1 Done, backlog debt 0'"),
    # Aleksander Winski: 5t, 24pts, debt=4
    ("s4Tickets: 3, s4Points: 8, status: 'red', statusNote: '1 IP, 2 WFA, backlog debt +4'",
     "s4Tickets: 5, s4Points: 24, status: 'red', statusNote: '2 IP, 1 CR, 2 WFA, backlog debt +4'"),
    # Owen Riley: 5t, 10pts, debt=-3
    ("s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '2 IP, 1 Done, 1 ToDo, backlog debt -2'",
     "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '2 IP, 1 CR, 2 Done, backlog debt -3'"),
    # Capacity summary
    ('totalS3Tickets: 66,', 'totalS3Tickets: 67,'),
    ('totalS3Points: 135,', 'totalS3Points: 154,'),
    ('s3Assigned: 36,', 's3Assigned: 39,'),
    ('s3Unassigned: 30,', 's3Unassigned: 28,'),
    ('s3UnassignedPercent: 45.5,', 's3UnassignedPercent: 41.8,'),
    ('totalAssignedPoints: 76,', 'totalAssignedPoints: 103,'),
    ('unassignedPoints: 59,', 'unassignedPoints: 51,'),
    ('avgPointsPerEngineer: 8.8,', 'avgPointsPerEngineer: 10.3,'),
    ("aboveThreshold: ['Ivan Peev (21 pts)'] as string[],",
     "aboveThreshold: ['Aleksander Winski (24 pts)', 'Ivan Peev (21 pts)'] as string[],"),
    ("heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Owen Riley (4 tickets, 8 pts)', 'Aleksander Winski (3 tickets, 8 pts)']",
     "heavyWorkloads: ['Aleksander Winski (5 tickets, 24 pts)', 'Ivan Peev (8 tickets, 21 pts)', 'Owen Riley (5 tickets, 10 pts)', 'Kannal Mutharasu (6 tickets, 9 pts)']"),
])


# ============================================================
# STEP 8: mondaySalesPipelineData.ts
# ============================================================
print('\n=== STEP 8: mondaySalesPipelineData.ts ===')
update_file_all('mondaySalesPipelineData.ts', [
    ('MARCH 2, 2026', 'MARCH 3, 2026'),
    ('-30 days', '-31 days'),
])
update_file('mondaySalesPipelineData.ts', [
    ('30 unassigned (45.5%)', '28 unassigned (41.8%)'),
    ('9.2% complete', '13.6% complete'),
    ('9.1%', '10.4%'),
])


# ============================================================
# STEP 9: blockedItemsData.ts
# ============================================================
print('\n=== STEP 9: blockedItemsData.ts ===')
update_file_all('blockedItemsData.ts', [
    ('Day 3 of 14', 'Day 4 of 14'),
    ('daysBlocked: 17,', 'daysBlocked: 18,'),
    ('"Blocked 17 days -- internal dependency"', '"Blocked 18 days -- internal dependency"'),
    ('daysSinceUpdate: 17', 'daysSinceUpdate: 18'),
    ('daysInReview: 17', 'daysInReview: 18'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 24', 'daysSinceUpdate: 25'),
])


print('\n=== ALL DONE! March 3, 2026 update complete ===')
print('Sprint S5 Day 4/14: 67 tickets, 154 pts, 9 Done (23 pts)')
print('15.2% points completion | 6 stale (3 CR + 3 IP) all Ivan Peev')
print('Monday.com: 113 deals, $13.672M, $3.467M weighted')
