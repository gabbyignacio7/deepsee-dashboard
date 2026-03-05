"""Bulk update dashboard data files with March 5, 2026 extraction data.

Sprint 2026-S5 Day 6 of 14 (Feb 27 - Mar 13)
JIRA: 72 tickets, 190 pts, 26 Done (66 pts), 8 Canceled (19 pts)
Monday.com: 113 deals, $13.655M raw, $3.467M weighted (unchanged)
Stale: 5 IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d) + 1 CR (BACK-1993 6d) = 6
7 tickets moved to Done overnight. Strong velocity day.
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
            print(f'  WARNING: not found in {filename}: {old[:80]}...')
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
            print(f'  WARNING (all): not found in {filename}: {old[:80]}...')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'  Updated (all): {filename}')


# ============================================================
# STEP 1: Bulk timestamp replacement (Mar 4 -> Mar 5)
# ============================================================
print('=== STEP 1: Timestamps (Mar 4 -> Mar 5) ===')
for dirpath in [DATA, COMP, PAGES]:
    for root, dirs, files in os.walk(dirpath):
        for fname in files:
            if fname.endswith(('.ts', '.tsx')):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                if 'changeLog' not in fname:
                    content = content.replace('March 4, 2026', 'March 5, 2026')
                    content = content.replace('2026-03-04', '2026-03-05')
                    content = content.replace('12:09 PM MT', '10:49 AM MT')
                    content = content.replace('T12:09:00', 'T10:49:00')
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
    f.write('''export const EXTRACTION_TIMESTAMP = "2026-03-05T10:49:00-07:00";
export const LAST_UPDATED = "March 5, 2026 at 10:49 AM MT";
export function formatDataTimestamp(): string {
  return "March 5, 2026, 10:49 AM MT";
}
''')
print('  Done')


# ============================================================
# STEP 3: sprintData.ts -- S5 Day 5 -> Day 6
# ============================================================
print('\n=== STEP 3: sprintData.ts ===')
update_file_all('sprintData.ts', [
    ('Day 5 of 14', 'Day 6 of 14'),
    ('Day 5 (Active)', 'Day 6 (Active)'),
    ('S5 Day 5', 'S5 Day 6'),
])
update_file('sprintData.ts', [
    ('totalTickets: 70,', 'totalTickets: 72,'),
    ('totalPoints: 186,', 'totalPoints: 190,'),
    ('completedTickets: 19,', 'completedTickets: 26,'),
    ('completedPoints: 42,', 'completedPoints: 66,'),
    ('toDo: 21,', 'toDo: 19,'),
    ('inProgress: 15,', 'inProgress: 12,'),
    ('codeReview: 7,', 'codeReview: 7,'),
    ('done: 19', 'done: 26'),
    ('completionRate: 27.1,', 'completionRate: 36.1,'),
    ('pointsCompletionRate: 22.6,', 'pointsCompletionRate: 34.7,'),
    ('daysRemaining: 9,', 'daysRemaining: 8,'),
    ('daysElapsed: 5,', 'daysElapsed: 6,'),
    ('mix: { artemis: 8, client: 8, infrastructure: 1 },', 'mix: { artemis: 8, client: 9, infrastructure: 1 },'),
])


# ============================================================
# STEP 4: jiraMetrics.ts
# ============================================================
print('\n=== STEP 4: jiraMetrics.ts ===')
update_file_all('jiraMetrics.ts', [
    ('Day 5 of 14', 'Day 6 of 14'),
])
update_file('jiraMetrics.ts', [
    ('daysRemaining: 9,', 'daysRemaining: 8,'),
    ('totalStoryPoints: 186,', 'totalStoryPoints: 190,'),
    ('"At 186 pts (avg 134) -- 39% over velocity"',
     '"At 190 pts (avg 134) -- 42% over velocity"'),
    ('totalActiveTickets: 70,', 'totalActiveTickets: 72,'),
    ('totalInProgress: 15,', 'totalInProgress: 12,'),
    ('totalToDo: 21,', 'totalToDo: 19,'),
    ('totalDone: 19,', 'totalDone: 26,'),
    ('completed: 42,', 'completed: 66,'),
    ('inProgress: 47,', 'inProgress: 38,'),
    ('notStarted: 55,', 'notStarted: 49,'),
    ('completionRate: 22.6', 'completionRate: 34.7'),
    # Sprint comparison
    ('s5: { sprint: "2026-S5", committed: 186, completed: 42, rate: 22.6, status: "in_progress" }',
     's5: { sprint: "2026-S5", committed: 190, completed: 66, rate: 34.7, status: "in_progress" }'),
])

# Replace longRunningTickets array
jira_path = os.path.join(DATA, 'jiraMetrics.ts')
with open(jira_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_long = '''  longRunningTickets: [
    {
      id: "BACK-1301",
      title: "ML Label or Challenge Input CLI",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 8,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 8 days"
    },
    {
      id: "BACK-1302",
      title: "ML Label or Challenge Output Handler CLI",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 8,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 8 days"
    },
    {
      id: "BACK-1303",
      title: "ML Label or Challenge Workflow Template",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 8,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 8 days"
    },
    {
      id: "BACK-1993",
      title: "Documents Stuck in Mercury Causing Bottleneck",
      assignee: "Unassigned",
      status: "Code Review",
      daysInStatus: 5,
      warningLevel: "warning",
      reason: "Stale in Code Review -- 5 days, unassigned"
    }
  ]'''

new_long = '''  longRunningTickets: [
    {
      id: "BACK-1301",
      title: "ML Label or Challenge Input CLI",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 9,
      warningLevel: "critical",
      reason: "Stale in In Progress -- 9 days"
    },
    {
      id: "BACK-1302",
      title: "ML Label or Challenge Output Handler CLI",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 9,
      warningLevel: "critical",
      reason: "Stale in In Progress -- 9 days"
    },
    {
      id: "BACK-1303",
      title: "ML Label or Challenge Workflow Template",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 9,
      warningLevel: "critical",
      reason: "Stale in In Progress -- 9 days"
    },
    {
      id: "BACK-1298",
      title: "ML Label or Challenge Workflow",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 6 days, parent ticket"
    },
    {
      id: "UI-780",
      title: "Handle 401 (Unauthorized) errors better",
      assignee: "Owen Riley",
      status: "In Progress",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in In Progress -- 6 days"
    },
    {
      id: "BACK-1993",
      title: "Documents Stuck in Mercury Causing Bottleneck",
      assignee: "Unassigned",
      status: "Code Review",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in Code Review -- 6 days, unassigned"
    }
  ]'''

if old_long in content:
    content = content.replace(old_long, new_long)
    print('  Replaced longRunningTickets array')
else:
    print('  WARNING: longRunningTickets array not found')

with open(jira_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('  Updated: jiraMetrics.ts')


# ============================================================
# STEP 5: sprintHealthData.ts
# ============================================================
print('\n=== STEP 5: sprintHealthData.ts ===')
# Note: Step 1 already changed "Day 5" to "Day 6" and "S5 Day 5" to "S5 Day 6"
# So we match on post-Step-1 values
health_path = os.path.join(DATA, 'sprintHealthData.ts')
with open(health_path, 'r', encoding='utf-8') as f:
    hc = f.read()

# Sprint Progress
hc = hc.replace(
    '{ metric: "Sprint Progress", s2Value: "27.1% (Day 5)", target: "35.7% expected", status: "yellow", detail: "27.1% complete vs 35.7% expected at Day 5. Major progress -- Ivan cleared 4 stale items." }',
    '{ metric: "Sprint Progress", s2Value: "36.1% (Day 6)", target: "42.9% expected", status: "yellow", detail: "36.1% complete vs 42.9% expected at Day 6. Strong velocity -- 7 tickets Done overnight." }'
) if '27.1% (Day 5)' in hc else print('  WARNING: Sprint Progress s2Value not found, trying post-step1...')

# If Step 1 changed "Day 5" to "Day 6" in the s2Value, try that
if '"27.1% (Day 6)"' in hc:
    hc = hc.replace(
        '{ metric: "Sprint Progress", s2Value: "27.1% (Day 6)", target: "35.7% expected", status: "yellow", detail: "27.1% complete vs 35.7% expected at Day 6. Major progress -- Ivan cleared 4 stale items." }',
        '{ metric: "Sprint Progress", s2Value: "36.1% (Day 6)", target: "42.9% expected", status: "yellow", detail: "36.1% complete vs 42.9% expected at Day 6. Strong velocity -- 7 tickets Done overnight." }'
    )

# Code Review Queue -- same count but update stale detail
hc = hc.replace(
    '"7 items (1 stale CR + 3 stale IP)"',
    '"7 items (1 stale CR + 5 stale IP)"'
)
hc = hc.replace(
    '"7 items in CR. 1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d)."',
    '"7 items in CR. 1 stale CR (BACK-1993 6d) + 5 stale IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d)."'
)
# Fix CR status back to red (5+1=6 stale items is a lot)
hc = hc.replace(
    'status: "yellow", detail: "7 items in CR. 1 stale CR (BACK-1993 6d)',
    'status: "red", detail: "7 items in CR. 1 stale CR (BACK-1993 6d)'
)

# Unassigned
hc = hc.replace('"23 of 70"', '"22 of 72"')
hc = hc.replace(
    '"32.9% of sprint unassigned -- improved from 41.8% but still above 5% target"',
    '"30.6% of sprint unassigned -- improved from 32.9%. Trending down but still above 5% target."'
)

# ARTEMIS
hc = hc.replace('"11.4%"', '"11.1%"', 1)
hc = hc.replace(
    '"ARTEMIS at 11.4% vs 60% target -- 8 tickets, still severely under-allocated."',
    '"ARTEMIS at 11.1% vs 60% target -- 8 tickets, still severely under-allocated."'
)

# Engineer Capacity
hc = hc.replace('"~12.4 avg"', '"~12.7 avg"')
hc = hc.replace(
    '"2 engineers missing (Loris, Karolina). 12.4 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest."',
    '"2 engineers missing (Loris, Karolina). 12.7 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest."'
)

# Stale Items -- INCREASED from 4 to 6
hc = hc.replace('"4 items"', '"6 items"')
hc = hc.replace(
    '"1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d). Ivan cleared 4."',
    '"1 stale CR (BACK-1993 6d) + 5 stale IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d). Stale increased."'
)
hc = hc.replace(
    'status: "yellow", detail: "1 stale CR (BACK-1993 6d) + 5 stale IP',
    'status: "red", detail: "1 stale CR (BACK-1993 6d) + 5 stale IP'
)

# Next Sprint
hc = hc.replace(
    '"S6 not yet planned (9 days to sprint start). Grooming should begin."',
    '"S6 not yet planned (8 days to sprint start). Grooming must begin this week."'
)

# Recommendations
hc = hc.replace('23 UNASSIGNED TICKETS (32.9%)', '22 UNASSIGNED TICKETS (30.6%)')
hc = hc.replace(
    '23 of 70 tickets unassigned (32.9%). Improved from 41.8% but still far above 5% target.',
    '22 of 72 tickets unassigned (30.6%). Trending down from 32.9% but still far above 5% target.'
)
hc = hc.replace('SPRINT S5 DAY 6 -- 27.1% vs 35.7%', 'SPRINT S5 DAY 6 -- 36.1% vs 42.9%')
hc = hc.replace(
    'S5 Day 6/14. 42/186 pts complete (22.6%). Closer to pace (35.7% expected). Ivan cleared 4 stale items.',
    'S5 Day 6/14. 66/190 pts complete (34.7%). Strong velocity day -- 7 tickets Done. Closing gap on pace.'
)
hc = hc.replace('ARTEMIS WORK MIX -- 11.4% vs 60% target', 'ARTEMIS WORK MIX -- 11.1% vs 60% target')
hc = hc.replace(
    'At 11.4% vs 60% target. Marginal improvement from 10.4% but still severely under-allocated.',
    'At 11.1% vs 60% target. Essentially flat. Must address in S6 planning.'
)
hc = hc.replace('-32 days', '-33 days')
hc = hc.replace('4 STALE ITEMS (1 CR + 3 IP)', '6 STALE ITEMS (1 CR + 5 IP)')
hc = hc.replace(
    'Ivan cleared 4 stale items to Done. Remaining: 3 IP (BACK-1301/1302/1303 8d) + 1 CR (BACK-1993 5d unassigned).',
    '6 stale items (up from 4). 5 IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d) + 1 CR (BACK-1993 6d).'
)

# Baseline comparison
hc = hc.replace(
    '{ metric: "Sprint", baseline: "S5 Day 4", current: "S5 Day 6", delta: "+1 day", trend: "progressing" }',
    '{ metric: "Sprint", baseline: "S5 Day 5", current: "S5 Day 6", delta: "+1 day", trend: "progressing" }'
)
hc = hc.replace(
    '{ metric: "Tickets", baseline: 67, current: 70, delta: "+3", trend: "scope added" }',
    '{ metric: "Tickets", baseline: 70, current: 72, delta: "+2", trend: "scope added" }'
)
hc = hc.replace(
    '{ metric: "Points", baseline: 154, current: 186, delta: "+32", trend: "scope added" }',
    '{ metric: "Points", baseline: 186, current: 190, delta: "+4", trend: "scope added" }'
)
hc = hc.replace(
    '{ metric: "Completion", baseline: "15.2%", current: "27.1%", delta: "+11.9%", trend: "improving" }',
    '{ metric: "Completion", baseline: "27.1%", current: "36.1%", delta: "+9.0%", trend: "improving" }'
)
hc = hc.replace(
    '{ metric: "ARTEMIS %", baseline: 10.4, current: 11.4, delta: "+1.0%", trend: "improved" }',
    '{ metric: "ARTEMIS %", baseline: 11.4, current: 11.1, delta: "-0.3%", trend: "flat" }'
)
hc = hc.replace(
    '{ metric: "Unassigned", baseline: 28, current: 23, delta: "-5", trend: "improved" }',
    '{ metric: "Unassigned", baseline: 23, current: 22, delta: "-1", trend: "improved" }'
)

# Sprint planning alert
hc = hc.replace('completionRate: 27.1,', 'completionRate: 36.1,')
hc = hc.replace('pointsCompletionRate: 22.6,', 'pointsCompletionRate: 34.7,')
hc = hc.replace('daysRemaining: 9,', 'daysRemaining: 8,')
hc = hc.replace(
    "actionNeeded: 'S5 Day 6 -- 27.1% complete vs 35.7% expected. 23 unassigned (32.9%). 4 stale items. ARTEMIS at 11.4% vs 60% target. Colony expired (-32d). BetaNxt expired.'",
    "actionNeeded: 'S5 Day 6 -- 36.1% complete vs 42.9% expected. 22 unassigned (30.6%). 6 stale items. ARTEMIS at 11.1% vs 60% target. Colony expired (-33d). BetaNxt expired.'"
)

# Work mix
hc = hc.replace(
    "artemis: { tickets: 8, points: 18, percent: 11, target: '60%', status: 'below' as const }",
    "artemis: { tickets: 8, points: 18, percent: 11, target: '60%', status: 'below' as const }"
)  # unchanged
hc = hc.replace(
    "client: { tickets: 8, points: 16, percent: 11, target: '30%', status: 'below' as const }",
    "client: { tickets: 9, points: 18, percent: 13, target: '30%', status: 'below' as const }"
)

# Velocity
hc = hc.replace(
    '{ sprint: "2026-S5", committed: 186, completed: 42, rate: 22.6, status: "in_progress" }',
    '{ sprint: "2026-S5", committed: 190, completed: 66, rate: 34.7, status: "in_progress" }'
)

with open(health_path, 'w', encoding='utf-8') as f:
    f.write(hc)
print('  Updated: sprintHealthData.ts (direct edit)')


# ============================================================
# STEP 6: workMixData.ts
# ============================================================
print('\n=== STEP 6: workMixData.ts ===')
update_file_all('workMixData.ts', [
    ('Day 5 of 14', 'Day 6 of 14'),
    ('-32 days', '-33 days'),
])
update_file('workMixData.ts', [
    # Client: 8->9 tickets, 11->13%
    ('s2Tickets: 8,\n    s2Percentage: 11,\n    target: "30-35%"', 's2Tickets: 9,\n    s2Percentage: 13,\n    target: "30-35%"'),
    ('totalTickets: 70,', 'totalTickets: 72,'),
    ('totalPoints: 186,', 'totalPoints: 190,'),
    ('clientPercentage: 11,', 'clientPercentage: 13,'),
    ('client: -19 // 11 - 30 (UNDER)', 'client: -17 // 13 - 30 (UNDER)'),
])


# ============================================================
# STEP 7: engineerCapacityData.ts
# ============================================================
print('\n=== STEP 7: engineerCapacityData.ts ===')
update_file_all('engineerCapacityData.ts', [
    ('Day 5 of 14', 'Day 6 of 14'),
    ('S5 Day 5', 'S5 Day 6'),
])
update_file('engineerCapacityData.ts', [
    # Lane: 4t/14pts, 2 Done, 2 CR
    ("s4Tickets: 4, s4Points: 14, status: 'yellow', statusNote: '2 IP, 1 CR, 1 Done, backlog debt +3'",
     "s4Tickets: 4, s4Points: 14, status: 'green', statusNote: '2 CR, 2 Done, backlog debt +2'"),
    # Jeff: 3t/12pts (was 2t/10pts)
    ("s4Tickets: 2, s4Points: 10, status: 'yellow', statusNote: '2 IP, backlog debt +2'",
     "s4Tickets: 3, s4Points: 12, status: 'yellow', statusNote: '1 IP, 1 CR, 1 Done, backlog debt +2'"),
    # Ivan: 8t/21pts, 4 IP, 4 Done
    ("s4Tickets: 8, s4Points: 21, status: 'green', statusNote: '4 IP, 4 Done (cleared 4 stale), backlog debt -4'",
     "s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '4 IP (3 stale 9d), 4 Done, backlog debt -4'"),
    # Darius: 2t/5pts, 1 Done, 1 CR
    ("s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +3'",
     "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 CR, 1 Done, backlog debt +3'"),
    # Kannal: 6t/13pts, 1 IP, 1 ToDo, 3 Done, 1 CR
    ("s4Tickets: 6, s4Points: 12, status: 'yellow', statusNote: '1 IP, 2 ToDo, 1 CR, 2 Done, backlog debt +1'",
     "s4Tickets: 6, s4Points: 13, status: 'green', statusNote: '1 IP, 1 ToDo, 1 CR, 3 Done, backlog debt 0'"),
    # Kalvin: 4t/8pts, 2 Done, 1 Canceled, 1 WFA
    ("s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '1 IP, 1 Done, 1 WFA, backlog debt -1'",
     "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '2 Done, 1 WFA, backlog debt -2'"),
    # Aleksander: 5t/19pts, 1 IP, 2 Done, 2 WFA
    ("s4Tickets: 5, s4Points: 19, status: 'yellow', statusNote: '1 IP, 1 CR, 2 WFA, 1 Done, backlog debt +3'",
     "s4Tickets: 5, s4Points: 19, status: 'yellow', statusNote: '1 IP, 2 Done, 2 WFA, backlog debt +2'"),
    # Owen: 5t/10pts, 1 IP, 4 Done
    ("s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP, 1 CR, 3 Done, backlog debt -3'",
     "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP (stale 6d), 4 Done, backlog debt -4'"),
    # Matthew: 3t/5pts (was 2t/3pts), 1 IP, 2 Done
    ("s4Tickets: 2, s4Points: 3, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +4'",
     "s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 2 Done, backlog debt +3'"),
    # Treven: 2t/10pts (was 1t/5pts), 1 IP, 1 Done
    ("s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 CR, backlog debt +1'",
     "s4Tickets: 2, s4Points: 10, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt 0'"),
    # Capacity summary
    ('totalS3Tickets: 70,', 'totalS3Tickets: 72,'),
    ('totalS3Points: 186,', 'totalS3Points: 190,'),
    ('s3Assigned: 47,', 's3Assigned: 50,'),
    ('s3Unassigned: 23,', 's3Unassigned: 22,'),
    ('s3UnassignedPercent: 32.9,', 's3UnassignedPercent: 30.6,'),
    ('totalAssignedPoints: 117,', 'totalAssignedPoints: 127,'),
    ('unassignedPoints: 69,', 'unassignedPoints: 63,'),
    ('avgPointsPerEngineer: 12.4,', 'avgPointsPerEngineer: 12.7,'),
    ("heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Kannal Mutharasu (6 tickets, 12 pts)']",
     "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Kannal Mutharasu (6 tickets, 13 pts)']"),
])

# Update code review queue
update_file('engineerCapacityData.ts', [
    ("{ ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 1 },\n  { ticket: 'BACK-1930', summary: '[BE] preprocessor bugfixes accenture', assignee: 'Aleksander Winski', points: 5, daysInReview: 3 },\n  { ticket: 'BACK-2005', summary: '[Colony] Allegro Integration Feedback Feb 26', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 2 },\n  { ticket: 'BACK-1981', summary: 'Account Creation XLSX Parser', assignee: 'Treven Trujillo', points: 5, daysInReview: 1 },\n  { ticket: 'BACK-2008', summary: '[Sunwest] Troubleshoot token errors', assignee: 'Brandon Baguley', points: 1, daysInReview: 1 },\n  { ticket: 'UI-788', summary: 'Make AD filters persist through session', assignee: 'Owen Riley', points: 2, daysInReview: 1 },\n  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 5 }",
     "{ ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 2 },\n  { ticket: 'BACK-1980', summary: 'AWS SQS to Kafka Camel Adapter', assignee: 'Lane Terry', points: 5, daysInReview: 1 },\n  { ticket: 'BACK-2005', summary: '[Colony] Allegro Integration Feedback Feb 26', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 3 },\n  { ticket: 'CI-950', summary: 'Create UAT/Production Tenant Endpoints', assignee: 'Jeff Hegerhorst', points: 2, daysInReview: 1 },\n  { ticket: 'BACK-2000', summary: 'Store content understanding response in S3', assignee: 'Darius Ouderkirk', points: 0, daysInReview: 1 },\n  { ticket: 'BACK-2008', summary: '[Sunwest] Troubleshoot token errors', assignee: 'Brandon Baguley', points: 1, daysInReview: 2 },\n  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 6 }"),
])


# ============================================================
# STEP 8: mondaySalesPipelineData.ts
# ============================================================
print('\n=== STEP 8: mondaySalesPipelineData.ts ===')
update_file_all('mondaySalesPipelineData.ts', [
    ('MARCH 4, 2026', 'MARCH 5, 2026'),
    ('-32 days', '-33 days'),
])
update_file('mondaySalesPipelineData.ts', [
    ('23 unassigned (32.9%)', '22 unassigned (30.6%)'),
    ('27.1% complete', '36.1% complete'),
    ('11.4%', '11.1%'),
])


# ============================================================
# STEP 9: blockedItemsData.ts
# ============================================================
print('\n=== STEP 9: blockedItemsData.ts ===')
update_file_all('blockedItemsData.ts', [
    ('daysBlocked: 19,', 'daysBlocked: 20,'),
    ('"Blocked 19 days -- internal dependency"', '"Blocked 20 days -- internal dependency"'),
    ('daysSinceUpdate: 19', 'daysSinceUpdate: 20'),
    ('daysInReview: 19', 'daysInReview: 20'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 26', 'daysSinceUpdate: 27'),
])


print('\n=== ALL DONE! March 5, 2026 update complete ===')
print('Sprint S5 Day 6/14: 72 tickets, 190 pts, 26 Done (66 pts)')
print('36.1% ticket completion, 34.7% points completion')
print('Stale: 6 (5 IP + 1 CR). 7 tickets Done overnight.')
print('Monday.com: 113 deals, $13.655M, $3.467M weighted (unchanged)')
