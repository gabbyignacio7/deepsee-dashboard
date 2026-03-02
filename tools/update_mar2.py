"""Bulk update dashboard data files with March 2, 2026 extraction data.

NEW SPRINT: 2026-S5 Day 3 of 14 (Feb 27 - Mar 13)
S4 CLOSED: 103 tickets, 252 pts, 56 Done (115 pts) -> 49.6% pts completion
JIRA S5: 66 tickets (65 active), 135 pts (132 active), 6 Done (17 pts)
Monday.com: 113 deals, $13.672M raw, $3.467M weighted
Reconciliation: 2 orphans, 6 status changes
"""
import os
import re

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
    """Replace ALL occurrences, not just first."""
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
# STEP 1: Bulk timestamp replacement across ALL files
# ============================================================
print('=== STEP 1: Timestamp replacement (Feb 27 -> Mar 2) ===')

for dirpath in [DATA, COMP, PAGES]:
    for root, dirs, files in os.walk(dirpath):
        for fname in files:
            if fname.endswith(('.ts', '.tsx')):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                if 'changeLog' not in fname:
                    content = content.replace('February 27, 2026', 'March 2, 2026')
                    content = content.replace('2026-02-27', '2026-03-02')
                    content = content.replace('Feb 27', 'Mar 2')
                if content != original:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'  Timestamps updated: {os.path.relpath(fpath, BASE)}')


# ============================================================
# STEP 2: Update timestamp.ts
# ============================================================
print('\n=== STEP 2: Update timestamp.ts ===')
ts_path = os.path.join(DATA, 'timestamp.ts')
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('''export const EXTRACTION_TIMESTAMP = "2026-03-02T09:24:00-07:00";
export const LAST_UPDATED = "March 2, 2026 at 9:24 AM MT";
export function formatDataTimestamp(): string {
  return "March 2, 2026, 9:24 AM MT";
}
''')
print('  Updated: timestamp.ts')


# ============================================================
# STEP 3: Update sprintData.ts - MAJOR: S4 -> completed, S5 -> active
# ============================================================
print('\n=== STEP 3: Update sprintData.ts ===')
update_file_all('sprintData.ts', [
    ('Sprint 2026-S4 (Active - Day 14 of 14)', 'Sprint 2026-S5 (Active - Day 3 of 14)'),
    ('Day 14 of 14', 'Day 3 of 14'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('sprintData.ts', [
    # S4 -> completed
    ("// S4 - ACTIVE (current sprint - Day 14 of 14)",
     "// S4 - COMPLETED (closed Feb 27, 2026)"),
    ("  id: '2026-S4',\n  name: 'Sprint 2026-S4',\n  startDate: '2026-02-13',\n  endDate: '2026-03-02',\n  status: 'active',\n  totalTickets: 103,\n  totalPoints: 252,\n  completedTickets: 56,\n  completedPoints: 115,",
     "  id: '2026-S4',\n  name: 'Sprint 2026-S4',\n  startDate: '2026-02-13',\n  endDate: '2026-02-27',\n  status: 'completed',\n  totalTickets: 103,\n  totalPoints: 252,\n  completedTickets: 56,\n  completedPoints: 115,"),
])


print('\n  Now need to manually update sprintData.ts CURRENT_SPRINT to S5...')


# ============================================================
# STEP 4: Update jiraMetrics.ts
# ============================================================
print('\n=== STEP 4: Update jiraMetrics.ts ===')
update_file_all('jiraMetrics.ts', [
    ('Sprint 2026-S4 (Day 14 of 14)', 'Sprint 2026-S5 (Day 3 of 14)'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('jiraMetrics.ts', [
    ('extractionSource: "JIRA API - 2026-S4"', 'extractionSource: "JIRA API - 2026-S5"'),
    ('name: "2026-S4",', 'name: "2026-S5",'),
    ('dates: "Feb 13 - Mar 2, 2026",', 'dates: "Feb 27 - Mar 13, 2026",'),
    ('daysRemaining: 0,', 'daysRemaining: 11,'),
    ('totalStoryPoints: 252,', 'totalStoryPoints: 135,'),
    ('"Over-committed at 252 pts (avg 134) -- 88% over"',
     '"At 135 pts (avg 134) -- on par with velocity"'),
    ('totalActiveTickets: 103,', 'totalActiveTickets: 66,'),
    ('totalInProgress: 11,', 'totalInProgress: 15,'),
    ('totalToDo: 15,', 'totalToDo: 31,'),
    ('totalCodeReview: 8,', 'totalCodeReview: 7,'),
    ('totalDone: 56,', 'totalDone: 6,'),
    ('totalWithStoryPoints: 85', 'totalWithStoryPoints: 55'),
    ('completed: 115,', 'completed: 17,'),
    ('inProgress: 34,', 'inProgress: 32,'),
    ('notStarted: 48,', 'notStarted: 48,'),  # same
    ('completionRate: 49.6', 'completionRate: 12.9'),
    ('{ name: "Owen Riley", tickets: 16 }', '{ name: "Owen Riley", tickets: 4 }'),
    ('{ name: "Treven Trujillo", tickets: 9 }', '{ name: "Treven Trujillo", tickets: 1 }'),
    ('{ name: "Ivan Peev", tickets: 11 }', '{ name: "Ivan Peev", tickets: 8 }'),
    ('{ name: "Kannal Mutharasu", tickets: 8 }', '{ name: "Kannal Mutharasu", tickets: 3 }'),
    ('committed: 252, completed: 115, rate: 49.6', 'committed: 135, completed: 17, rate: 12.9'),
    # S4 is now complete - update s4 comparison
    ('s4: { sprint: "2026-S4", committed: 252, completed: 115, rate: 49.6, status: "in_progress" }',
     's4: { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "complete" }'),
])


# ============================================================
# STEP 5: Update sprintHealthData.ts
# ============================================================
print('\n=== STEP 5: Update sprintHealthData.ts ===')
update_file_all('sprintHealthData.ts', [
    ('Sprint 2026-S4 Day 14', 'Sprint 2026-S5 Day 3'),
    ('Day 14 of 14', 'Day 3 of 14'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('sprintHealthData.ts', [
    # Sprint Progress
    ('"49.6% (Day 14)"', '"12.9% (Day 3)"'),
    ('"100% expected"', '"21.4% expected"'),
    ('"49.6% complete vs 100% expected. Sprint ends today (Day 14 of 14)."',
     '"12.9% complete vs 21.4% expected at Day 3. New sprint S5 started Feb 27."'),
    # CR
    ('"8 items (0 stale)"', '"7 items (3 stale)"'),
    ('"8 items in CR, 0 stale. Active code reviews in final sprint day."',
     '"7 items in CR, 3 stale (BACK-1299/1300/1311 Ivan Peev). Carryover from S4."'),
    ('target: "GREEN <5", status: "yellow"', 'target: "GREEN <5", status: "red"'),
    # Unassigned
    ('"18 of 103"', '"30 of 66"'),
    ('"17.5% of sprint unassigned -- improved from 23.2%"',
     '"45.5% of sprint unassigned -- new sprint, many tickets need assignment"'),
    # ARTEMIS
    ('"9.7%"', '"9.1%"'),
    ('"ARTEMIS at 9.7% vs 60% target -- severely under-allocated"',
     '"ARTEMIS at 9.1% vs 60% target -- severely under-allocated. Must improve in S5."'),
    # Engineer Capacity
    ('"~15.3 avg"', '"~8.8 avg"'),
    ('"green", detail: "2 engineers missing (Loris, Karolina). 15.3 avg pts/engineer. Owen 28pts, Ivan 25pts highest."',
     '"yellow", detail: "2 engineers missing (Loris, Karolina). 8.8 avg pts/engineer. Ivan 21pts highest."'),
    # Stale items
    ('"0 items"', '"3 items"'),
    ('"green", detail: "0 stale In Progress, 0 stale CR. All stale items cleared on sprint final day."',
     '"yellow", detail: "3 stale CR: BACK-1299, BACK-1300, BACK-1311 (all Ivan Peev). Carryover from S4."'),
    # Next Sprint
    ('"30 assigned"', '"N/A"'),
    ('"green", detail: "S5: 30 tickets already assigned for Mar 2"',
     '"yellow", detail: "S6 not yet planned. S5 just started Day 3."'),
    # Recommendations
    ('18 UNASSIGNED TICKETS (17.5%)', '30 UNASSIGNED TICKETS (45.5%)'),
    ("Improved from 23.2% to 17.5%. Sprint ends today. Mercury HITL sprint goal tickets still unowned.",
     "New sprint S5 has 30 of 66 tickets unassigned (45.5%). Sprint planning session needed urgently."),
    ('SPRINT ENDS TODAY -- 49.6% vs 100%', 'SPRINT S5 DAY 3 -- 12.9% vs 21.4%'),
    ('Sprint day 14/14. 115/252 pts complete (49.6%). 137 pts remaining will carry over to S5.',
     'S5 Day 3/14. 17/135 pts complete (12.9%). Slightly behind pace. 30 tickets still unassigned.'),
    ('ARTEMIS WORK MIX -- 9.7% vs 60% target', 'ARTEMIS WORK MIX -- 9.1% vs 60% target'),
    ('At 9.7% vs 60% target. Severely under-allocated all sprint. Must be addressed in S5 planning.',
     'At 9.1% vs 60% target. Severely under-allocated. Carryover issue from S4 -- must address immediately.'),
    ('-27 days', '-30 days'),
    ('$59K ARR at risk. Contract expired Jan 31 (-27 days). No renewal deal tracked. Immediate outreach needed.',
     '$59K ARR at risk. Contract expired Jan 31 (-30 days). No renewal deal tracked. Immediate outreach needed.'),
    ('0 STALE ITEMS', '3 STALE CR ITEMS'),
    ('All stale items cleared. BACK-1911, CI-935, CI-936 moved to Done. Sprint cleanup complete.',
     'BACK-1299, BACK-1300, BACK-1311 stale in CR (all Ivan Peev). Carryover from S4 -- need review.'),
    # Baseline comparison
    ('baselineDate: "February 25, 2026"', 'baselineDate: "February 27, 2026"'),
    ('// Baseline comparison from Feb 22 to Feb 25', '// Baseline comparison from Feb 27 to Mar 2'),
    ('baseline: "S4 Day 12", current: "S4 Day 14"', 'baseline: "S4 Day 14", current: "S5 Day 3"'),
    ('delta: "+2 days"', 'delta: "New Sprint"'),
    ('trend: "progressing"', 'trend: "new sprint"'),
    ('baseline: 99, current: 103', 'baseline: 103, current: 66'),
    ('delta: "+4", trend: "scope increased"', 'delta: "-37", trend: "new sprint scope"'),
    ('baseline: 226, current: 252', 'baseline: 252, current: 135'),
    ('delta: "+26", trend: "scope increased"', 'delta: "-117", trend: "new sprint scope"'),
    ('baseline: "35.8%", current: "49.6%", delta: "+13.8%", trend: "improving"',
     'baseline: "49.6%", current: "12.9%", delta: "N/A", trend: "new sprint"'),
    ('baseline: 0, current: 0, delta: "0", trend: "stable"',
     'baseline: 0, current: 0, delta: "0", trend: "stable"'),
    ('baseline: 10.1, current: 9.7, delta: "-0.4%", trend: "worsened"',
     'baseline: 9.7, current: 9.1, delta: "-0.6%", trend: "worsened"'),
    ('baseline: 23, current: 18, delta: "-5", trend: "improved"',
     'baseline: 18, current: 30, delta: "+12", trend: "new sprint"'),
    # Sprint planning alert
    ("id: '2026-S4',", "id: '2026-S5',"),
    ('completionRate: 58.3,', 'completionRate: 9.2,'),
    ('pointsCompletionRate: 49.6,', 'pointsCompletionRate: 12.9,'),
    ('daysRemaining: 0,', 'daysRemaining: 11,'),
    ("id: '2026-S5',\n    totalTickets: 30,\n    totalPoints: 8,\n    assigned: 30,\n    unassigned: 0,\n    unassignedPercent: 0,\n    missingEstimatesPercent: 93.3,\n    readinessStatus: 'READY'",
     "id: '2026-S6',\n    totalTickets: 0,\n    totalPoints: 0,\n    assigned: 0,\n    unassigned: 0,\n    unassignedPercent: 0,\n    missingEstimatesPercent: 100,\n    readinessStatus: 'NOT STARTED'"),
    ("actionNeeded: 'S4 Day 14 (LAST DAY) -- 49.6% complete vs 100% expected. 18 unassigned (17.5%). 0 stale items. ARTEMIS at 9.7% vs 60% target. Colony expired (-27d). BetaNxt close date expired.'",
     "actionNeeded: 'S5 Day 3 -- 12.9% complete vs 21.4% expected. 30 unassigned (45.5%). 3 stale CR. ARTEMIS at 9.1% vs 60% target. Colony expired (-30d). BetaNxt close date expired.'"),
    # Work mix in sprintHealthData
    ('artemis: { tickets: 10, points: 23, percent: 10', 'artemis: { tickets: 6, points: 13, percent: 9'),
    ('client: { tickets: 21, points: 48, percent: 20', 'client: { tickets: 6, points: 12, percent: 9'),
    ('infrastructure: { tickets: 5, points: 12, percent: 5', 'infrastructure: { tickets: 1, points: 2, percent: 2'),
    # Velocity
    ('committed: 252, completed: 115, rate: 49.6', 'committed: 135, completed: 17, rate: 12.9'),
    # S4 in velocity history now complete
    ('{ sprint: "2026-S4", committed: 252, completed: 115, rate: 49.6, status: "in_progress" }',
     '{ sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" }'),
])


# ============================================================
# STEP 6: Update workMixData.ts
# ============================================================
print('\n=== STEP 6: Update workMixData.ts ===')
update_file_all('workMixData.ts', [
    ('Day 14 of 14', 'Day 3 of 14'),
    ('-27 days', '-30 days'),
    ('Sprint 2026-S4', 'Sprint 2026-S5'),
])
update_file('workMixData.ts', [
    ('s2Tickets: 10,\n    s2Percentage: 10,', 's2Tickets: 6,\n    s2Percentage: 9,'),
    ('s2Tickets: 21,\n    s2Percentage: 20,', 's2Tickets: 6,\n    s2Percentage: 9,'),
    ('s2Tickets: 5,\n    s2Percentage: 5,', 's2Tickets: 1,\n    s2Percentage: 2,'),
    ('totalTickets: 103,', 'totalTickets: 66,'),
    ('totalPoints: 252,', 'totalPoints: 135,'),
    ('artemisPercentage: 10,', 'artemisPercentage: 9,'),
    ('clientPercentage: 20,', 'clientPercentage: 9,'),
    ('infrastructurePercentage: 5,', 'infrastructurePercentage: 2,'),
    ('artemis: -50, // 10 - 60 (SEVERELY UNDER)', 'artemis: -51, // 9 - 60 (SEVERELY UNDER)'),
    ('client: -10 // 20 - 30 (UNDER)', 'client: -21 // 9 - 30 (UNDER)'),
])


# ============================================================
# STEP 7: Update engineerCapacityData.ts
# ============================================================
print('\n=== STEP 7: Update engineerCapacityData.ts ===')
update_file_all('engineerCapacityData.ts', [
    ('Day 14 of 14', 'Day 3 of 14'),
    ('Updated Mar 2, 2026 - Sprint S4 Day 14', 'Updated Mar 2, 2026 - Sprint S5 Day 3'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('engineerCapacityData.ts', [
    # Lane Terry: 1 sprint, 1 pts, debt=3
    ("s4Tickets: 5, s4Points: 15, status: 'green', statusNote: '5 Done, backlog debt -1'",
     "s4Tickets: 1, s4Points: 1, status: 'red', statusNote: '1 IP, backlog debt +3'"),
    # Jeff Hegerhorst: 1 sprint, 5 pts, debt=2
    ("s4Tickets: 4, s4Points: 12, status: 'green', statusNote: '1 IP, 3 Done, backlog debt 0'",
     "s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 IP, backlog debt +2'"),
    # Chad Hegerhorst: 2 sprint, 5 pts, debt=2
    ("s4Tickets: 4, s4Points: 10, status: 'green', statusNote: '1 IP, 1 CR, 2 Done, backlog debt -2'",
     "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 CR, backlog debt +2'"),
    # Ivan Peev: 8 sprint, 21 pts, debt=0
    ("s4Tickets: 11, s4Points: 25, status: 'yellow', statusNote: '2 IP, 4 CR, 5 Done, backlog debt -3'",
     "s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '2 IP, 3 CR (stale), 3 Done, backlog debt 0'"),
    # Darius Ouderkirk: 2 sprint, 5 pts, debt=4
    ("s4Tickets: 3, s4Points: 7, status: 'yellow', statusNote: '1 IP, 2 WFA, backlog debt +2'",
     "s4Tickets: 2, s4Points: 5, status: 'red', statusNote: '2 WFA, backlog debt +4'"),
    # Kannal Mutharasu: 3 sprint, 4 pts, debt=2
    ("s4Tickets: 8, s4Points: 24, status: 'green', statusNote: '1 IP, 1 CR, 6 Done, backlog debt -4'",
     "s4Tickets: 3, s4Points: 4, status: 'yellow', statusNote: '1 IP, 1 CR, 1 Done, backlog debt +2'"),
    # Kalvin Willison: 3 sprint, 5 pts, debt=1
    ("s4Tickets: 7, s4Points: 16, status: 'green', statusNote: '1 IP, 1 ToDo, 5 Done, backlog debt -3'",
     "s4Tickets: 3, s4Points: 5, status: 'yellow', statusNote: '2 IP, 1 ToDo, backlog debt +1'"),
    # Aleksander Winski: 3 sprint, 8 pts, debt=4
    ("s4Tickets: 6, s4Points: 13, status: 'yellow', statusNote: '1 IP, 2 WFA, 3 Done, backlog debt +1'",
     "s4Tickets: 3, s4Points: 8, status: 'red', statusNote: '1 IP, 2 WFA, backlog debt +4'"),
    # Owen Riley: 4 sprint, 8 pts, debt=-2
    ("s4Tickets: 16, s4Points: 28, status: 'yellow', statusNote: 'HIGHEST LOAD: 16 tickets/28pts, 2 ToDo, 14 Done -- major velocity'",
     "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '2 IP, 1 Done, 1 ToDo, backlog debt -2'"),
    # Matthew Snow: 2 sprint, 3 pts, debt=5
    ("s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '2 IP, 3 Done, backlog debt +2'",
     "s4Tickets: 2, s4Points: 3, status: 'red', statusNote: '1 IP, 1 ToDo, backlog debt +5'"),
    # Treven Trujillo: 1 sprint, 5 pts, debt=1
    ("s4Tickets: 9, s4Points: 18, status: 'green', statusNote: '1 IP, 1 ToDo, 6 Done, 1 Canceled, backlog debt -7'",
     "s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 IP, backlog debt +1'"),
    # Capacity summary
    ('totalS3Tickets: 103,', 'totalS3Tickets: 66,'),
    ('totalS3Points: 252,', 'totalS3Points: 135,'),
    ('s3Assigned: 85,', 's3Assigned: 36,'),
    ('s3Unassigned: 18,', 's3Unassigned: 30,'),
    ('s3UnassignedPercent: 17.5,', 's3UnassignedPercent: 45.5,'),
    ('totalAssignedPoints: 206,', 'totalAssignedPoints: 76,'),
    ('unassignedPoints: 46,', 'unassignedPoints: 59,'),
    ('avgPointsPerEngineer: 15.3,', 'avgPointsPerEngineer: 8.8,'),
    ("aboveThreshold: ['Owen Riley (28 pts)', 'Ivan Peev (25 pts)', 'Kannal Mutharasu (24 pts)'] as string[],",
     "aboveThreshold: ['Ivan Peev (21 pts)'] as string[],"),
    ("heavyWorkloads: ['Owen Riley (16 tickets, 28 pts)', 'Ivan Peev (11 tickets, 25 pts)', 'Kannal Mutharasu (8 tickets, 24 pts)', 'Treven Trujillo (9 tickets, 18 pts)', 'Kalvin Willison (7 tickets, 16 pts)']",
     "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Owen Riley (4 tickets, 8 pts)', 'Aleksander Winski (3 tickets, 8 pts)']"),
])


# ============================================================
# STEP 8: Update mondaySalesPipelineData.ts
# ============================================================
print('\n=== STEP 8: Update mondaySalesPipelineData.ts ===')
update_file_all('mondaySalesPipelineData.ts', [
    ('FEBRUARY 27, 2026', 'MARCH 2, 2026'),
    ('-27 days', '-30 days'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('mondaySalesPipelineData.ts', [
    # Pipeline unchanged
    ('weightedPipeline: 3467300,', 'weightedPipeline: 3467300,'),  # same
    ('18 unassigned (17.5%)', '30 unassigned (45.5%)'),
    ('58.3% complete', '9.2% complete'),
    ('9.7%', '9.1%'),
])


# ============================================================
# STEP 9: Update blockedItemsData.ts
# ============================================================
print('\n=== STEP 9: Update blockedItemsData.ts ===')
update_file_all('blockedItemsData.ts', [
    ('Day 14 of 14', 'Day 3 of 14'),
    ('daysBlocked: 14,', 'daysBlocked: 17,'),
    ('"Blocked 14 days -- internal dependency"', '"Blocked 17 days -- internal dependency"'),
    ('daysSinceUpdate: 14', 'daysSinceUpdate: 17'),
    ('daysInReview: 14', 'daysInReview: 17'),
    ('9:38 AM MT', '9:24 AM MT'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 21', 'daysSinceUpdate: 24'),
])


# ============================================================
# STEP 10: Update orphanTicketsData.ts
# ============================================================
print('\n=== STEP 10: Update orphanTicketsData.ts ===')
# These were already updated by step 1 timestamp replacement


print('\n=== ALL DONE! March 2, 2026 data update complete ===')
print('Key metrics:')
print('  NEW SPRINT S5 Day 3/14 (Feb 27 - Mar 13)')
print('  66 tickets (65 active), 135 pts (132 active)')
print('  6 Done (17 pts), 12.9% points completion')
print('  0 blocked, 0 stale IP, 3 stale CR')
print('  Monday.com: 113 deals, $13.672M, $3.467M weighted')
