"""Bulk update dashboard data files with Feb 25, 2026 extraction data."""
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, 'client', 'src', 'data')

def update_file(filename, replacements):
    path = os.path.join(DATA, filename)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        c = c.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated: {filename}')

def update_file_all(filename, replacements):
    """Replace ALL occurrences, not just first."""
    path = os.path.join(DATA, filename)
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        c = c.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated (all): {filename}')


# === jiraMetrics.ts ===
update_file('jiraMetrics.ts', [
    ('daysRemaining: 5,', 'daysRemaining: 2,'),
    ('totalStoryPoints: 197,', 'totalStoryPoints: 226,'),
    ('"Over-committed at 197 pts (avg 134) -- 47% over"', '"Over-committed at 226 pts (avg 134) -- 69% over"'),
    ('totalActiveTickets: 82,', 'totalActiveTickets: 99,'),
    ('totalInProgress: 20,', 'totalInProgress: 19,'),
    ('totalToDo: 28,', 'totalToDo: 22,'),
    ('totalCodeReview: 8,', 'totalCodeReview: 6,'),
    ('totalBlocked: 1,', 'totalBlocked: 0,'),
    ('totalDone: 17,', 'totalDone: 38,'),
    ('totalWithStoryPoints: 75', 'totalWithStoryPoints: 80'),
    ('completed: 30,', 'completed: 81,'),
    ('inProgress: 61,', 'inProgress: 53,'),
    ('notStarted: 54,', 'notStarted: 46,'),
    ('completionRate: 15.2', 'completionRate: 35.8'),
    ('{ name: "Owen Riley", tickets: 11 }', '{ name: "Owen Riley", tickets: 14 }'),
    ('{ name: "Ivan Peev", tickets: 5 }', '{ name: "Ivan Peev", tickets: 11 }'),
    ('{ name: "Kannal Mutharasu", tickets: 5 }', '{ name: "Kannal Mutharasu", tickets: 6 }'),
    ('committed: 197, completed: 30, rate: 15.2', 'committed: 226, completed: 81, rate: 35.8'),
])

# === sprintHealthData.ts ===
update_file_all('sprintHealthData.ts', [
    ('Sprint 2026-S4 Day 9', 'Sprint 2026-S4 Day 12'),
    ('Day 9 of 14', 'Day 12 of 14'),
])
update_file('sprintHealthData.ts', [
    ('"15.2% (Day 12)"', '"35.8% (Day 12)"'),
    ('"64.3% expected"', '"85.7% expected"'),
    ('"15.2% complete vs 64.3% expected at Day 12. Need 3.1x current burn rate."',
     '"35.8% complete vs 85.7% expected at Day 12. Sprint ending in 2 days."'),
    ('s2Value: 1, target: "GREEN 0-2", status: "green"',
     's2Value: 0, target: "GREEN 0-2", status: "green"'),
    ('"UI-740 (9 days, Matthew Snow). UI-743 unblocked -- moved to To Do."',
     '"0 sprint blocked items. UI-740 still in backlog blocked."'),
    ('"8 items (2 stale)"', '"6 items (0 stale)"'),
    ('"8 items in CR, BACK-1918 and BACK-1792 stale 9 days each"',
     '"6 items in CR, 0 stale. BACK-1918/1792/1805 now Done."'),
    ('"27 of 82"', '"23 of 99"'),
    ('"32.9% of sprint unassigned -- improved from 45.7% but still high"',
     '"23.2% of sprint unassigned -- improved from 32.9%"'),
    ('s2Value: "13.4%"', 's2Value: "10.1%"'),
    ('"ARTEMIS at 13.4% vs 60% target -- severely under-allocated"',
     '"ARTEMIS at 10.1% vs 60% target -- severely under-allocated"'),
    ('s2Value: "9 items"', 's2Value: "4 items"'),
    ('"7 stale In Progress (>5 days), 2 stale CR (9 days each)"',
     '"4 stale In Progress (>5 days), 0 stale CR"'),
    ('baselineDate: "February 18, 2026"', 'baselineDate: "February 22, 2026"'),
    ('baseline: "S4 Day 5", current: "S4 Day 9"', 'baseline: "S4 Day 9", current: "S4 Day 12"'),
    ('baseline: 70, current: 82, delta: "+12"', 'baseline: 82, current: 99, delta: "+17"'),
    ('baseline: 176, current: 197, delta: "+21"', 'baseline: 197, current: 226, delta: "+29"'),
    ('baseline: "13.1%", current: "15.2%", delta: "+2.1%", trend: "behind pace"',
     'baseline: "15.2%", current: "35.8%", delta: "+20.6%", trend: "improving"'),
    ('baseline: 2, current: 1, delta: "-1", trend: "improved"',
     'baseline: 1, current: 0, delta: "-1", trend: "improved"'),
    ('baseline: 29, current: 13.4, delta: "-15.6%", trend: "worsened"',
     'baseline: 13.4, current: 10.1, delta: "-3.3%", trend: "worsened"'),
    ('baseline: 32, current: 27, delta: "-5", trend: "improved"',
     'baseline: 27, current: 23, delta: "-4", trend: "improved"'),
    ('completionRate: 20.7,', 'completionRate: 38.4,'),
    ('pointsCompletionRate: 15.2,', 'pointsCompletionRate: 35.8,'),
    ('daysRemaining: 5,', 'daysRemaining: 2,'),
    ('27 UNASSIGNED TICKETS (32.9%)', '23 UNASSIGNED TICKETS (23.2%)'),
    ('Improved from 45.7% but still high. Mercury HITL sprint goal tickets still unowned. Sprint assignment session needed.',
     'Improved from 32.9%. Mercury HITL sprint goal tickets still unowned. Sprint ends Feb 27.'),
    ('SPRINT BEHIND PACE -- 15.2% vs 64.3%', 'SPRINT BEHIND PACE -- 35.8% vs 85.7%'),
    ('Need 3.1x acceleration with 5 days remaining. Sprint tracking to complete ~24% (47/197 pts). Major scope risk.',
     'Sprint ends in 2 days. 81/226 pts complete (35.8%). Major scope risk -- 145 pts remaining.'),
    ('ARTEMIS WORK MIX -- 13.4% vs 60% target', 'ARTEMIS WORK MIX -- 10.1% vs 60% target'),
    ('Worsened from 29% to 13.4%. Severely under-allocated. Sprint scope adjustment urgently needed.',
     'Worsened from 13.4% to 10.1%. Severely under-allocated. Sprint scope adjustment urgently needed.'),
    ('Colony Bank Contract EXPIRED (-23 days)', 'Colony Bank Contract EXPIRED (-25 days)'),
    ('$59K ARR at risk. Contract expired Jan 31. No renewal deal tracked in Monday.com. Immediate outreach needed.',
     '$59K ARR at risk. Contract expired Jan 31 (-25 days). No renewal deal tracked. Immediate outreach needed.'),
    ('9 STALE ITEMS (7 IP + 2 CR)', '4 STALE ITEMS (4 IP + 0 CR)'),
    ('BACK-1299 stale 16 days IP (Ivan Peev). 6 more IP items stale 9 days. BACK-1918/1792 stale 9 days in CR.',
     'BACK-1911 11d, CI-935 11d, BACK-1862 11d, CI-936 8d. Stale CR cleared -- BACK-1918/1792/1805 now Done.'),
    ('committed: 197, completed: 30, rate: 15.2', 'committed: 226, completed: 81, rate: 35.8'),
    ("artemis: { tickets: 11, points: 26, percent: 13", "artemis: { tickets: 10, points: 23, percent: 10"),
    ("client: { tickets: 14, points: 34, percent: 17", "client: { tickets: 19, points: 44, percent: 19"),
    ("infrastructure: { tickets: 5, points: 14, percent: 6", "infrastructure: { tickets: 5, points: 12, percent: 5"),
])

# === workMixData.ts ===
update_file_all('workMixData.ts', [
    ('Day 9 of 14', 'Day 12 of 14'),
])
update_file('workMixData.ts', [
    ('s2Tickets: 11,\n    s2Percentage: 13,', 's2Tickets: 10,\n    s2Percentage: 10,'),
    ('s2Tickets: 14,\n    s2Percentage: 17,', 's2Tickets: 19,\n    s2Percentage: 19,'),
    ('s2Tickets: 5,\n    s2Percentage: 6,', 's2Tickets: 5,\n    s2Percentage: 5,'),
    ('totalTickets: 82,', 'totalTickets: 99,'),
    ('totalPoints: 197,', 'totalPoints: 226,'),
    ('artemisPercentage: 13,', 'artemisPercentage: 10,'),
    ('clientPercentage: 17,', 'clientPercentage: 19,'),
    ('infrastructurePercentage: 6,', 'infrastructurePercentage: 5,'),
    ('artemis: -47, // 13 - 60 (SEVERELY UNDER)', 'artemis: -50, // 10 - 60 (SEVERELY UNDER)'),
    ('client: -13 // 17 - 30 (UNDER)', 'client: -11 // 19 - 30 (UNDER)'),
])
update_file_all('workMixData.ts', [
    ('Contract EXPIRED Jan 31 (-23 days)', 'Contract EXPIRED Jan 31 (-25 days)'),
])

# === engineerCapacityData.ts ===
update_file_all('engineerCapacityData.ts', [
    ('Day 9 of 14', 'Day 12 of 14'),
    ('Updated Feb 22, 2026 - Sprint S4 Day 9', 'Updated Feb 25, 2026 - Sprint S4 Day 12'),
])
update_file('engineerCapacityData.ts', [
    ("s4Tickets: 4, s4Points: 14, status: 'yellow', statusNote: '2 IP, 1 CR, 1 Done, backlog debt +5'",
     "s4Tickets: 5, s4Points: 15, status: 'yellow', statusNote: '1 IP, 4 Done, backlog debt +1'"),
    ("s4Tickets: 3, s4Points: 6, status: 'yellow', statusNote: '3 IP infra, backlog debt +3'",
     "s4Tickets: 4, s4Points: 7, status: 'yellow', statusNote: '3 IP, 1 Done, backlog debt +2'"),
    ("s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '2 IP, 1 Done, backlog debt +1'",
     "s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 1 CICD, 1 Done, backlog debt +1'"),
    ("s4Tickets: 5, s4Points: 12, status: 'yellow', statusNote: '2 IP (BACK-1299 stale 16d), 1 CR, 2 Done'",
     "s4Tickets: 11, s4Points: 25, status: 'yellow', statusNote: '4 IP, 4 CR, 3 Done, backlog debt -3'"),
    ("s4Tickets: 1, s4Points: 5, status: 'red', statusNote: '1 IP, backlog debt +7 -- CAPACITY CONCERN'",
     "s4Tickets: 3, s4Points: 5, status: 'red', statusNote: '1 IP, 1 CICD, 1 Done, backlog debt +6'"),
    ("s4Tickets: 5, s4Points: 17, status: 'yellow', statusNote: '1 IP, 3 CR (1 stale 9d), 1 Done, backlog debt +2'",
     "s4Tickets: 6, s4Points: 20, status: 'green', statusNote: '1 IP, 5 Done, backlog debt -1'"),
    ("s4Tickets: 3, s4Points: 8, status: 'green', statusNote: '2 IP, 1 CR, backlog debt +1'",
     "s4Tickets: 6, s4Points: 14, status: 'green', statusNote: '1 IP, 2 To Do, 3 Done, backlog debt -2'"),
    ("s4Tickets: 4, s4Points: 13, status: 'red', statusNote: '2 IP, 2 WFA, backlog debt +8 -- CAPACITY CONCERN'",
     "s4Tickets: 6, s4Points: 13, status: 'red', statusNote: '2 IP, 2 WFA, 2 Done, backlog debt +5'"),
    ("s4Tickets: 11, s4Points: 19, status: 'yellow', statusNote: 'HIGHEST LOAD: 11 tickets/19pts, 1 IP, 1 CR, 9 Done -- major velocity'",
     "s4Tickets: 14, s4Points: 25, status: 'yellow', statusNote: 'HIGHEST LOAD: 14 tickets/25pts, 2 CR, 12 Done -- major velocity'"),
    ("s4Tickets: 4, s4Points: 7, status: 'red', statusNote: '1 IP, 1 Blocked (9d), 2 Done, backlog debt +5'",
     "s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '2 IP, 3 Done, backlog debt +5'"),
    ("s4Tickets: 8, s4Points: 13, status: 'yellow', statusNote: '1 IP, 5 SC To Do, 1 Done, 1 Canceled'",
     "s4Tickets: 8, s4Points: 13, status: 'yellow', statusNote: '2 IP, 4 To Do, 1 Done, 1 Canceled'"),
    ('totalS3Tickets: 82,', 'totalS3Tickets: 99,'),
    ('totalS3Points: 197,', 'totalS3Points: 226,'),
    ('s3Assigned: 55,', 's3Assigned: 76,'),
    ('s3Unassigned: 27,', 's3Unassigned: 23,'),
    ('s3UnassignedPercent: 32.9,', 's3UnassignedPercent: 23.2,'),
    ('totalAssignedPoints: 143,', 'totalAssignedPoints: 180,'),
    ('unassignedPoints: 54,', 'unassignedPoints: 46,'),
    ('avgPointsPerEngineer: 10.2,', 'avgPointsPerEngineer: 12.9,'),
    ("aboveThreshold: ['Owen Riley (19 pts)', 'Kannal Mutharasu (17 pts)'] as string[],",
     "aboveThreshold: ['Owen Riley (25 pts)', 'Ivan Peev (25 pts)', 'Kannal Mutharasu (20 pts)'] as string[],"),
    ("heavyWorkloads: ['Owen Riley (11 tickets, 19 pts)', 'Kannal Mutharasu (5 tickets, 17 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Treven Trujillo (8 tickets, 13 pts)', 'Aleksander Winski (4 tickets, 13 pts)']",
     "heavyWorkloads: ['Owen Riley (14 tickets, 25 pts)', 'Ivan Peev (11 tickets, 25 pts)', 'Kannal Mutharasu (6 tickets, 20 pts)', 'Lane Terry (5 tickets, 15 pts)', 'Kalvin Willison (6 tickets, 14 pts)']"),
])

# === mondaySalesPipelineData.ts ===
update_file_all('mondaySalesPipelineData.ts', [
    ('FEBRUARY 22, 2026', 'FEBRUARY 25, 2026'),
    ('-23 days', '-25 days'),
])
update_file('mondaySalesPipelineData.ts', [
    ('totalPipeline: 13576000,', 'totalPipeline: 13672000,'),
    ('weightedPipeline: 3430800,', 'weightedPipeline: 3454800,'),
    ('activeDeals: 103,', 'activeDeals: 107,'),
    ('activeAccounts: 103,', 'activeAccounts: 107,'),
    ('totalAccounts: 103,', 'totalAccounts: 107,'),
    ('27 unassigned (32.9%)', '23 unassigned (23.2%)'),
    ('20.7% complete', '38.4% complete'),
    ('13.4%', '10.1%'),
])

# === blockedItemsData.ts ===
update_file_all('blockedItemsData.ts', [
    ('Day 9 of 14', 'Day 12 of 14'),
    ('daysBlocked: 9,', 'daysBlocked: 12,'),
    ('"Blocked 9 days -- internal dependency"', '"Blocked 12 days -- internal dependency"'),
    ('daysSinceUpdate: 9', 'daysSinceUpdate: 12'),
    ('daysInReview: 9', 'daysInReview: 12'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 16', 'daysSinceUpdate: 19'),
])

# === orphanTicketsData.ts ===
update_file_all('orphanTicketsData.ts', [
    ('February 22, 2026', 'February 25, 2026'),
    ('flaggedDate: "2026-02-22"', 'flaggedDate: "2026-02-25"'),
])

print('\nAll core data files updated for Feb 25, 2026!')
