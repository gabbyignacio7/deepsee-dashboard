"""Bulk update dashboard data files with Feb 27, 2026 extraction data.

Sprint 2026-S4 Day 14 of 14 (LAST DAY)
JIRA: 103 tickets (96 active), 252 pts (232 active), 56 Done (115 pts)
Monday.com: 113 deals, $13.672M raw, $3.467M weighted
Reconciliation: 2 orphans, 5 status changes
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, 'client', 'src', 'data')

def update_file(filename, replacements):
    path = os.path.join(DATA, filename)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        if old in c:
            c = c.replace(old, new, 1)
        else:
            print(f'  WARNING: not found in {filename}: {old[:60]}...')
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
            print(f'  WARNING (all): not found in {filename}: {old[:60]}...')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated (all): {filename}')


# ============================================================
# STEP 1: Bulk timestamp replacement across ALL files
# ============================================================
print('=== STEP 1: Timestamp replacement (Feb 25 -> Feb 27) ===')

for root, dirs, files in os.walk(DATA):
    for fname in files:
        if fname.endswith('.ts') or fname.endswith('.tsx'):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            # Replace date strings (but NOT in changeLog entries or baseline dates)
            if 'changeLog' not in fname:
                content = content.replace('February 25, 2026', 'February 27, 2026')
                content = content.replace('2026-02-25', '2026-02-27')
            if content != original:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'  Timestamps updated: {fname}')

# Also update the component files
COMP = os.path.join(BASE, 'client', 'src', 'components')
PAGES = os.path.join(BASE, 'client', 'src', 'pages')
for dirpath in [COMP, PAGES]:
    for root, dirs, files in os.walk(dirpath):
        for fname in files:
            if fname.endswith('.tsx'):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                content = content.replace('February 25, 2026', 'February 27, 2026')
                content = content.replace('2026-02-25', '2026-02-27')
                if content != original:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'  Timestamps updated: {fname}')


# ============================================================
# STEP 2: Update timestamp.ts
# ============================================================
print('\n=== STEP 2: Update timestamp.ts ===')
ts_path = os.path.join(DATA, 'timestamp.ts')
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('''export const EXTRACTION_TIMESTAMP = "2026-02-27T09:38:00-07:00";
export const LAST_UPDATED = "February 27, 2026 at 9:38 AM MT";
export function formatDataTimestamp(): string {
  return "February 27, 2026, 9:38 AM MT";
}
''')
print('  Updated: timestamp.ts')


# ============================================================
# STEP 3: Update sprintData.ts
# ============================================================
print('\n=== STEP 3: Update sprintData.ts ===')
update_file_all('sprintData.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('Day 12', 'Day 14'),
])
update_file('sprintData.ts', [
    # Sprint totals: 99 -> 103 tickets (but active = 96), 226 -> 252 pts (232 active)
    ('totalTickets: 99,', 'totalTickets: 103,'),
    ('totalStoryPoints: 226,', 'totalStoryPoints: 252,'),
    ('daysRemaining: 2,', 'daysRemaining: 0,'),
    ('daysElapsed: 12,', 'daysElapsed: 14,'),
    # Done: 38 -> 56
    ('done: 38,', 'done: 56,'),
    ('donePoints: 81,', 'donePoints: 115,'),
    # IP: 19 -> 11
    ('inProgress: 19,', 'inProgress: 11,'),
    ('inProgressPoints: 53,', 'inProgressPoints: 34,'),
    # ToDo: 22 -> 15
    ('toDo: 22,', 'toDo: 15,'),
    ('toDoPoints: 46,', 'toDoPoints: 48,'),
    # CR: 6 -> 8
    ('codeReview: 6,', 'codeReview: 8,'),
    ('codeReviewPoints: 13,', 'codeReviewPoints: 14,'),
    # Blocked: 0 -> 0 (same)
    # Completion rates
    ('ticketCompletionRate: 38.4,', 'ticketCompletionRate: 58.3,'),
    ('pointsCompletionRate: 35.8,', 'pointsCompletionRate: 49.6,'),
    # Work mix in sprint data
    ('artemis: 10,', 'artemis: 10,'),  # same
    ('client: 19,', 'client: 21,'),
    ('infrastructure: 5,', 'infrastructure: 5,'),  # same
])


# ============================================================
# STEP 4: Update jiraMetrics.ts
# ============================================================
print('\n=== STEP 4: Update jiraMetrics.ts ===')
update_file_all('jiraMetrics.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('Day 12', 'Day 14'),
])
update_file('jiraMetrics.ts', [
    ('daysRemaining: 2,', 'daysRemaining: 0,'),
    ('totalStoryPoints: 226,', 'totalStoryPoints: 252,'),
    ('"Over-committed at 226 pts (avg 134) -- 69% over"', '"Over-committed at 252 pts (avg 134) -- 88% over"'),
    ('totalActiveTickets: 99,', 'totalActiveTickets: 103,'),
    ('totalInProgress: 19,', 'totalInProgress: 11,'),
    ('totalToDo: 22,', 'totalToDo: 15,'),
    ('totalCodeReview: 6,', 'totalCodeReview: 8,'),
    ('totalBlocked: 0,', 'totalBlocked: 0,'),
    ('totalDone: 38,', 'totalDone: 56,'),
    ('totalWithStoryPoints: 80', 'totalWithStoryPoints: 85'),
    ('completed: 81,', 'completed: 115,'),
    ('inProgress: 53,', 'inProgress: 34,'),
    ('notStarted: 46,', 'notStarted: 48,'),
    ('completionRate: 35.8', 'completionRate: 49.6'),
    ('{ name: "Owen Riley", tickets: 14 }', '{ name: "Owen Riley", tickets: 16 }'),
    ('{ name: "Ivan Peev", tickets: 11 }', '{ name: "Ivan Peev", tickets: 11 }'),
    ('{ name: "Kannal Mutharasu", tickets: 6 }', '{ name: "Kannal Mutharasu", tickets: 8 }'),
    ('{ name: "Treven Trujillo", tickets: 8 }', '{ name: "Treven Trujillo", tickets: 9 }'),
    ('committed: 226, completed: 81, rate: 35.8', 'committed: 252, completed: 115, rate: 49.6'),
    # Long running tickets - update days
    ('daysInStatus: 16,', 'daysInStatus: 19,'),  # BACK-1299
])


# ============================================================
# STEP 5: Update sprintHealthData.ts
# ============================================================
print('\n=== STEP 5: Update sprintHealthData.ts ===')
update_file_all('sprintHealthData.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('Day 12', 'Day 14'),
])
update_file('sprintHealthData.ts', [
    ('"35.8% (Day 14)"', '"49.6% (Day 14)"'),
    ('"85.7% expected"', '"100% expected"'),
    ('"35.8% complete vs 85.7% expected at Day 14. Sprint ending in 2 days."',
     '"49.6% complete vs 100% expected. Sprint ends today (Day 14 of 14)."'),
    # CR: 6 items -> 8 items
    ('"6 items (0 stale)"', '"8 items (0 stale)"'),
    ('"6 items in CR, 0 stale. BACK-1918/1792/1805 now Done."',
     '"8 items in CR, 0 stale. Active code reviews in final sprint day."'),
    # Unassigned
    ('"23 of 99"', '"18 of 103"'),
    ('"23.2% of sprint unassigned -- improved from 32.9%"',
     '"17.5% of sprint unassigned -- improved from 23.2%"'),
    # ARTEMIS
    ('s2Value: "10.1%"', 's2Value: "9.7%"'),
    ('"ARTEMIS at 10.1% vs 60% target -- severely under-allocated"',
     '"ARTEMIS at 9.7% vs 60% target -- severely under-allocated"'),
    # Engineer capacity
    ('"~12.9 avg"', '"~15.3 avg"'),
    ('"green", detail: "2 engineers missing (Loris, Karolina). 12.9 avg pts/engineer. Owen 25pts, Ivan 25pts highest."',
     '"green", detail: "2 engineers missing (Loris, Karolina). 15.3 avg pts/engineer. Owen 28pts, Ivan 25pts highest."'),
    # Stale items
    ('"4 items"', '"0 items"'),
    ('"4 stale In Progress (>5 days), 0 stale CR"',
     '"0 stale In Progress, 0 stale CR. All stale items cleared on sprint final day."'),
    ('status: "red", detail: "0 stale In Progress',
     'status: "green", detail: "0 stale In Progress'),
    # Recommendations
    ('23 UNASSIGNED TICKETS (23.2%)', '18 UNASSIGNED TICKETS (17.5%)'),
    ("Improved from 32.9%. Mercury HITL sprint goal tickets still unowned. Sprint ends Feb 27.",
     "Improved from 23.2% to 17.5%. Sprint ends today. Mercury HITL sprint goal tickets still unowned."),
    ('SPRINT BEHIND PACE -- 35.8% vs 85.7%', 'SPRINT ENDS TODAY -- 49.6% vs 100%'),
    ('Sprint ends in 2 days. 81/226 pts complete (35.8%). Major scope risk -- 145 pts remaining.',
     'Sprint day 14/14. 115/252 pts complete (49.6%). 137 pts remaining will carry over to S5.'),
    ('ARTEMIS WORK MIX -- 10.1% vs 60% target', 'ARTEMIS WORK MIX -- 9.7% vs 60% target'),
    ('Worsened from 13.4% to 10.1%. Severely under-allocated. Sprint scope adjustment urgently needed.',
     'At 9.7% vs 60% target. Severely under-allocated all sprint. Must be addressed in S5 planning.'),
    ('Colony Bank Contract EXPIRED (-25 days)', 'Colony Bank Contract EXPIRED (-27 days)'),
    ('$59K ARR at risk. Contract expired Jan 31 (-25 days). No renewal deal tracked. Immediate outreach needed.',
     '$59K ARR at risk. Contract expired Jan 31 (-27 days). No renewal deal tracked. Immediate outreach needed.'),
    ('4 STALE ITEMS (4 IP + 0 CR)', '0 STALE ITEMS'),
    ('BACK-1911 11d, CI-935 11d, BACK-1862 11d, CI-936 8d. Stale CR cleared -- BACK-1918/1792/1805 now Done.',
     'All stale items cleared. BACK-1911, CI-935, CI-936 moved to Done. Sprint cleanup complete.'),
    # Baseline comparison
    ('baselineDate: "February 22, 2026"', 'baselineDate: "February 25, 2026"'),
    ('currentDate: "February 27, 2026"', 'currentDate: "February 27, 2026"'),  # already updated by step 1
    ('baseline: "S4 Day 9", current: "S4 Day 14"', 'baseline: "S4 Day 12", current: "S4 Day 14"'),
    ('delta: "+3 days"', 'delta: "+2 days"'),
    ('baseline: 82, current: 99', 'baseline: 99, current: 103'),
    ('delta: "+17", trend: "scope increased"', 'delta: "+4", trend: "scope increased"'),
    ('baseline: 197, current: 226', 'baseline: 226, current: 252'),
    ('delta: "+29", trend: "scope increased"', 'delta: "+26", trend: "scope increased"'),
    ('baseline: "15.2%", current: "35.8%", delta: "+20.6%", trend: "improving"',
     'baseline: "35.8%", current: "49.6%", delta: "+13.8%", trend: "improving"'),
    ('baseline: 1, current: 0, delta: "-1", trend: "improved"',
     'baseline: 0, current: 0, delta: "0", trend: "stable"'),
    ('baseline: 13.4, current: 10.1, delta: "-3.3%", trend: "worsened"',
     'baseline: 10.1, current: 9.7, delta: "-0.4%", trend: "worsened"'),
    ('baseline: 27, current: 23, delta: "-4", trend: "improved"',
     'baseline: 23, current: 18, delta: "-5", trend: "improved"'),
    # Sprint planning alert
    ('completionRate: 38.4,', 'completionRate: 58.3,'),
    ('pointsCompletionRate: 35.8,', 'pointsCompletionRate: 49.6,'),
    ('daysRemaining: 2,', 'daysRemaining: 0,'),
    # Action needed
    ("actionNeeded: 'S4 Day 12 -- 35.8% complete vs 85.7% expected. 23 unassigned (23.2%). 4 stale items. ARTEMIS at 10.1% vs 60% target. Colony expired (-25d). BetaNxt close date expired.'",
     "actionNeeded: 'S4 Day 14 (LAST DAY) -- 49.6% complete vs 100% expected. 18 unassigned (17.5%). 0 stale items. ARTEMIS at 9.7% vs 60% target. Colony expired (-27d). BetaNxt close date expired.'"),
    # Work mix in sprintHealthData
    ('artemis: { tickets: 10, points: 23, percent: 10', 'artemis: { tickets: 10, points: 23, percent: 10'),  # same
    ('client: { tickets: 19, points: 44, percent: 19', 'client: { tickets: 21, points: 48, percent: 20'),
    # Velocity
    ('committed: 226, completed: 81, rate: 35.8', 'committed: 252, completed: 115, rate: 49.6'),
])


# ============================================================
# STEP 6: Update workMixData.ts
# ============================================================
print('\n=== STEP 6: Update workMixData.ts ===')
update_file_all('workMixData.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('-25 days', '-27 days'),
])
update_file('workMixData.ts', [
    ('s2Tickets: 19,\n    s2Percentage: 19,', 's2Tickets: 21,\n    s2Percentage: 20,'),
    ('totalTickets: 99,', 'totalTickets: 103,'),
    ('totalPoints: 226,', 'totalPoints: 252,'),
    ('artemisPercentage: 10,', 'artemisPercentage: 10,'),  # same
    ('clientPercentage: 19,', 'clientPercentage: 20,'),
    ('artemis: -50, // 10 - 60 (SEVERELY UNDER)', 'artemis: -50, // 10 - 60 (SEVERELY UNDER)'),
    ('client: -11 // 19 - 30 (UNDER)', 'client: -10 // 20 - 30 (UNDER)'),
])


# ============================================================
# STEP 7: Update engineerCapacityData.ts
# ============================================================
print('\n=== STEP 7: Update engineerCapacityData.ts ===')
update_file_all('engineerCapacityData.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('Updated Feb 25, 2026 - Sprint S4 Day 12', 'Updated Feb 27, 2026 - Sprint S4 Day 14'),
])
update_file('engineerCapacityData.ts', [
    # Lane Terry: 5 sprint, 15 pts, debt=-1
    ("s4Tickets: 5, s4Points: 15, status: 'yellow', statusNote: '1 IP, 4 Done, backlog debt +1'",
     "s4Tickets: 5, s4Points: 15, status: 'green', statusNote: '5 Done, backlog debt -1'"),
    # Jeff Hegerhorst: 4 sprint, 12 pts, debt=0
    ("s4Tickets: 4, s4Points: 7, status: 'yellow', statusNote: '3 IP, 1 Done, backlog debt +2'",
     "s4Tickets: 4, s4Points: 12, status: 'green', statusNote: '1 IP, 3 Done, backlog debt 0'"),
    # Chad Hegerhorst: 4 sprint, 10 pts, debt=-2
    ("s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 1 CICD, 1 Done, backlog debt +1'",
     "s4Tickets: 4, s4Points: 10, status: 'green', statusNote: '1 IP, 1 CR, 2 Done, backlog debt -2'"),
    # Ivan Peev: 11 sprint, 25 pts, debt=-3
    ("s4Tickets: 11, s4Points: 25, status: 'yellow', statusNote: '4 IP, 4 CR, 3 Done, backlog debt -3'",
     "s4Tickets: 11, s4Points: 25, status: 'yellow', statusNote: '2 IP, 4 CR, 5 Done, backlog debt -3'"),
    # Darius Ouderkirk: 3 sprint, 7 pts, debt=2
    ("s4Tickets: 3, s4Points: 5, status: 'red', statusNote: '1 IP, 1 CICD, 1 Done, backlog debt +6'",
     "s4Tickets: 3, s4Points: 7, status: 'yellow', statusNote: '1 IP, 2 WFA, backlog debt +2'"),
    # Kannal Mutharasu: 8 sprint, 24 pts, debt=-4
    ("s4Tickets: 6, s4Points: 20, status: 'green', statusNote: '1 IP, 5 Done, backlog debt -1'",
     "s4Tickets: 8, s4Points: 24, status: 'green', statusNote: '1 IP, 1 CR, 6 Done, backlog debt -4'"),
    # Kalvin Willison: 7 sprint, 16 pts, debt=-3
    ("s4Tickets: 6, s4Points: 14, status: 'green', statusNote: '1 IP, 2 To Do, 3 Done, backlog debt -2'",
     "s4Tickets: 7, s4Points: 16, status: 'green', statusNote: '1 IP, 1 ToDo, 5 Done, backlog debt -3'"),
    # Aleksander Winski: 6 sprint, 13 pts, debt=1
    ("s4Tickets: 6, s4Points: 13, status: 'red', statusNote: '2 IP, 2 WFA, 2 Done, backlog debt +5'",
     "s4Tickets: 6, s4Points: 13, status: 'yellow', statusNote: '1 IP, 2 WFA, 3 Done, backlog debt +1'"),
    # Owen Riley: 16 sprint, 28 pts, debt=-11
    ("s4Tickets: 14, s4Points: 25, status: 'yellow', statusNote: 'HIGHEST LOAD: 14 tickets/25pts, 2 CR, 12 Done -- major velocity'",
     "s4Tickets: 16, s4Points: 28, status: 'yellow', statusNote: 'HIGHEST LOAD: 16 tickets/28pts, 2 ToDo, 14 Done -- major velocity'"),
    # Matthew Snow: 5 sprint, 10 pts, debt=2
    ("s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '2 IP, 3 Done, backlog debt +5'",
     "s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '2 IP, 3 Done, backlog debt +2'"),
    # Treven Trujillo: 9 sprint, 18 pts, debt=-7
    ("s4Tickets: 8, s4Points: 13, status: 'yellow', statusNote: '2 IP, 4 To Do, 1 Done, 1 Canceled'",
     "s4Tickets: 9, s4Points: 18, status: 'green', statusNote: '1 IP, 1 ToDo, 6 Done, 1 Canceled, backlog debt -7'"),
    # Capacity summary
    ('totalS3Tickets: 99,', 'totalS3Tickets: 103,'),
    ('totalS3Points: 226,', 'totalS3Points: 252,'),
    ('s3Assigned: 76,', 's3Assigned: 85,'),
    ('s3Unassigned: 23,', 's3Unassigned: 18,'),
    ('s3UnassignedPercent: 23.2,', 's3UnassignedPercent: 17.5,'),
    ('totalAssignedPoints: 180,', 'totalAssignedPoints: 206,'),
    ('unassignedPoints: 46,', 'unassignedPoints: 46,'),
    ('avgPointsPerEngineer: 12.9,', 'avgPointsPerEngineer: 15.3,'),
    ("aboveThreshold: ['Owen Riley (25 pts)', 'Ivan Peev (25 pts)', 'Kannal Mutharasu (20 pts)'] as string[],",
     "aboveThreshold: ['Owen Riley (28 pts)', 'Ivan Peev (25 pts)', 'Kannal Mutharasu (24 pts)'] as string[],"),
    ("heavyWorkloads: ['Owen Riley (14 tickets, 25 pts)', 'Ivan Peev (11 tickets, 25 pts)', 'Kannal Mutharasu (6 tickets, 20 pts)', 'Lane Terry (5 tickets, 15 pts)', 'Kalvin Willison (6 tickets, 14 pts)']",
     "heavyWorkloads: ['Owen Riley (16 tickets, 28 pts)', 'Ivan Peev (11 tickets, 25 pts)', 'Kannal Mutharasu (8 tickets, 24 pts)', 'Treven Trujillo (9 tickets, 18 pts)', 'Kalvin Willison (7 tickets, 16 pts)']"),
])


# ============================================================
# STEP 8: Update mondaySalesPipelineData.ts
# ============================================================
print('\n=== STEP 8: Update mondaySalesPipelineData.ts ===')
update_file_all('mondaySalesPipelineData.ts', [
    ('FEBRUARY 25, 2026', 'FEBRUARY 27, 2026'),
    ('-25 days', '-27 days'),
])
update_file('mondaySalesPipelineData.ts', [
    ('totalPipeline: 13672000,', 'totalPipeline: 13672000,'),  # same
    ('weightedPipeline: 3454800,', 'weightedPipeline: 3467300,'),
    ('activeDeals: 107,', 'activeDeals: 113,'),
    ('activeAccounts: 107,', 'activeAccounts: 113,'),
    ('totalAccounts: 107,', 'totalAccounts: 113,'),
    ('23 unassigned (23.2%)', '18 unassigned (17.5%)'),
    ('38.4% complete', '58.3% complete'),
    ('10.1%', '9.7%'),
])


# ============================================================
# STEP 9: Update blockedItemsData.ts
# ============================================================
print('\n=== STEP 9: Update blockedItemsData.ts ===')
update_file_all('blockedItemsData.ts', [
    ('Day 12 of 14', 'Day 14 of 14'),
    ('daysBlocked: 12,', 'daysBlocked: 14,'),
    ('"Blocked 12 days -- internal dependency"', '"Blocked 14 days -- internal dependency"'),
    ('daysSinceUpdate: 12', 'daysSinceUpdate: 14'),
    ('daysInReview: 12', 'daysInReview: 14'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 19', 'daysSinceUpdate: 21'),
])


# ============================================================
# STEP 10: Update orphanTicketsData.ts
# ============================================================
print('\n=== STEP 10: Update orphanTicketsData.ts ===')
update_file_all('orphanTicketsData.ts', [
    ('February 25, 2026', 'February 27, 2026'),
    ('flaggedDate: "2026-02-25"', 'flaggedDate: "2026-02-27"'),
])


print('\n=== ALL DONE! Feb 27, 2026 data update complete ===')
print('Key metrics:')
print('  Sprint S4 Day 14/14 (LAST DAY)')
print('  103 tickets (96 active), 252 pts (232 active)')
print('  56 Done (115 pts), 49.6% points completion')
print('  0 stale IP, 0 stale CR')
print('  Monday.com: 113 deals, $13.672M, $3.467M weighted')
