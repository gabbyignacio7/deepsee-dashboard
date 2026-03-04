"""Bulk update dashboard data files with March 4, 2026 extraction data.

Sprint 2026-S5 Day 5 of 14 (Feb 27 - Mar 13)
JIRA: 70 tickets, 186 pts, 19 Done (42 pts), 8 Canceled (19 pts)
Monday.com: 113 deals, $13.655M raw, $3.467M weighted
Stale: 3 IP (BACK-1301/1302/1303 Ivan Peev 8d), 1 CR (BACK-1993 5d)
BIG CHANGE: Ivan Peev cleared 4 stale items to Done (BACK-1297/1299/1300/1311)
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
# STEP 1: Bulk timestamp replacement (Mar 3 -> Mar 4)
# ============================================================
print('=== STEP 1: Timestamps (Mar 3 -> Mar 4) ===')
for dirpath in [DATA, COMP, PAGES]:
    for root, dirs, files in os.walk(dirpath):
        for fname in files:
            if fname.endswith(('.ts', '.tsx')):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                if 'changeLog' not in fname:
                    content = content.replace('March 3, 2026', 'March 4, 2026')
                    content = content.replace('2026-03-03', '2026-03-04')
                    content = content.replace('10:12 AM MT', '12:09 PM MT')
                    content = content.replace('T10:12:00', 'T12:09:00')
                    content = content.replace('Day 4 of 14', 'Day 5 of 14')
                    content = content.replace('Day 4 (Active)', 'Day 5 (Active)')
                    content = content.replace('S5 Day 4', 'S5 Day 5')
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
    f.write('''export const EXTRACTION_TIMESTAMP = "2026-03-04T12:09:00-07:00";
export const LAST_UPDATED = "March 4, 2026 at 12:09 PM MT";
export function formatDataTimestamp(): string {
  return "March 4, 2026, 12:09 PM MT";
}
''')
print('  Done')


# ============================================================
# STEP 3: sprintData.ts -- S5 Day 4 -> Day 5
# ============================================================
print('\n=== STEP 3: sprintData.ts ===')
update_file('sprintData.ts', [
    # CURRENT_SPRINT
    ('totalTickets: 67,', 'totalTickets: 70,'),
    ('totalPoints: 154,', 'totalPoints: 186,'),
    ('completedTickets: 9,', 'completedTickets: 19,'),
    ('completedPoints: 23,', 'completedPoints: 42,'),
    ('toDo: 26,', 'toDo: 21,'),
    ('inProgress: 16,', 'inProgress: 15,'),
    ('codeReview: 10,', 'codeReview: 7,'),
    ('done: 9', 'done: 19'),
    ('completionRate: 13.6,', 'completionRate: 27.1,'),
    ('pointsCompletionRate: 15.2,', 'pointsCompletionRate: 22.6,'),
    ('daysRemaining: 10,', 'daysRemaining: 9,'),
    ('daysElapsed: 4,', 'daysElapsed: 5,'),
    ('mix: { artemis: 7, client: 7, infrastructure: 1 },', 'mix: { artemis: 8, client: 8, infrastructure: 1 },'),
])


# ============================================================
# STEP 4: jiraMetrics.ts
# ============================================================
print('\n=== STEP 4: jiraMetrics.ts ===')
update_file('jiraMetrics.ts', [
    ('daysRemaining: 10,', 'daysRemaining: 9,'),
    ('totalStoryPoints: 154,', 'totalStoryPoints: 186,'),
    ('"At 154 pts (avg 134) -- 15% over velocity"',
     '"At 186 pts (avg 134) -- 39% over velocity"'),
    ('totalActiveTickets: 67,', 'totalActiveTickets: 70,'),
    ('totalInProgress: 16,', 'totalInProgress: 15,'),
    ('totalToDo: 26,', 'totalToDo: 21,'),
    ('totalCodeReview: 10,', 'totalCodeReview: 7,'),
    ('totalDone: 9,', 'totalDone: 19,'),
    ('totalWithStoryPoints: 56', 'totalWithStoryPoints: 47'),
    ('completed: 23,', 'completed: 42,'),
    ('inProgress: 47,', 'inProgress: 47,'),  # stays same
    ('notStarted: 43,', 'notStarted: 55,'),
    ('completionRate: 15.2', 'completionRate: 22.6'),
    # Engineer summary - highest load
    ('{ name: "Owen Riley", tickets: 5 }', '{ name: "Owen Riley", tickets: 5 }'),
    ('{ name: "Aleksander Winski", tickets: 5 }', '{ name: "Aleksander Winski", tickets: 5 }'),
    # Sprint comparison
    ('s5: { sprint: "2026-S5", committed: 154, completed: 23, rate: 15.2, status: "in_progress" }',
     's5: { sprint: "2026-S5", committed: 186, completed: 42, rate: 22.6, status: "in_progress" }'),
])

# Replace the entire longRunningTickets array
# Remove 3 resolved CR items (1299, 1300, 1311), keep 3 IP items, add 1 new stale CR
jira_path = os.path.join(DATA, 'jiraMetrics.ts')
with open(jira_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_long_running = '''  longRunningTickets: [
    {
      id: "BACK-1299",
      title: "Single Model Input CLI",
      assignee: "Ivan Peev",
      status: "Code Review",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in Code Review -- carryover from S4"
    },
    {
      id: "BACK-1300",
      title: "Single Model Output Handler CLI",
      assignee: "Ivan Peev",
      status: "Code Review",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in Code Review -- carryover from S4"
    },
    {
      id: "BACK-1311",
      title: "Workflow Template for Single Model",
      assignee: "Ivan Peev",
      status: "Code Review",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in Code Review -- carryover from S4"
    },
    {
      id: "BACK-1301",
      title: "Single Model Workflow Orchestrator",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in In Progress"
    },
    {
      id: "BACK-1302",
      title: "Single Model Result Aggregator",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in In Progress"
    },
    {
      id: "BACK-1303",
      title: "Single Model Error Handler",
      assignee: "Ivan Peev",
      status: "In Progress",
      daysInStatus: 6,
      warningLevel: "warning",
      reason: "Stale in In Progress"
    }
  ]'''

new_long_running = '''  longRunningTickets: [
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

if old_long_running in content:
    content = content.replace(old_long_running, new_long_running)
    print('  Replaced longRunningTickets array')
else:
    print('  WARNING: longRunningTickets array not found for replacement')

with open(jira_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('  Updated: jiraMetrics.ts')


# ============================================================
# STEP 5: sprintHealthData.ts
# ============================================================
print('\n=== STEP 5: sprintHealthData.ts ===')
update_file('sprintHealthData.ts', [
    # Sprint Progress -- improved to YELLOW
    ('"15.2% (Day 5)"', '"27.1% (Day 5)"'),
    ('"28.6% expected"', '"35.7% expected"'),
    ('status: "red", detail: "15.2% complete vs 28.6% expected at Day 5. Sprint S5 picking up momentum."',
     'status: "yellow", detail: "27.1% complete vs 35.7% expected at Day 5. Major progress -- Ivan cleared 4 stale items."'),
    # Code Review Queue -- improved to YELLOW
    ('"10 items (3 stale CR + 3 stale IP)"', '"7 items (1 stale CR + 3 stale IP)"'),
    ('"10 items in CR. 3 stale CR + 3 stale IP (BACK-1299/1300/1301/1302/1303/1311 all Ivan Peev)."',
     '"7 items in CR. 1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d)."'),
    # Fix CR status to yellow
    ('status: "red", detail: "7 items in CR. 1 stale CR', 'status: "yellow", detail: "7 items in CR. 1 stale CR'),
    # Unassigned Tickets -- improved but still RED
    ('"28 of 67"', '"23 of 70"'),
    ('"41.8% of sprint unassigned -- slightly improved from 45.5% but still critical"',
     '"32.9% of sprint unassigned -- improved from 41.8% but still above 5% target"'),
    # ARTEMIS
    ('"10.4%"', '"11.4%"'),
    ('"ARTEMIS at 10.4% vs 60% target -- severely under-allocated."',
     '"ARTEMIS at 11.4% vs 60% target -- 8 tickets, still severely under-allocated."'),
    # Engineer Capacity
    ('"~10.3 avg"', '"~12.4 avg"'),
    ('"2 engineers missing (Loris, Karolina). 10.3 avg pts/engineer. Aleksander 24pts, Ivan 21pts highest."',
     '"2 engineers missing (Loris, Karolina). 12.4 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest."'),
    # Stale Items -- improved
    ('"6 items"', '"4 items"'),
    ('"3 stale CR + 3 stale IP (all Ivan Peev). BACK-1299/1300/1311 CR, BACK-1301/1302/1303 IP."',
     '"1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d). Ivan cleared 4."'),
    # Next Sprint Readiness
    ('"S6 not yet planned. S5 Day 5 -- focus on current sprint."',
     '"S6 not yet planned (9 days to sprint start). Grooming should begin."'),
    # Recommendations
    ('28 UNASSIGNED TICKETS (41.8%)', '23 UNASSIGNED TICKETS (32.9%)'),
    ('28 of 67 tickets unassigned (41.8%). Slightly improved but still critical. Sprint planning ongoing.',
     '23 of 70 tickets unassigned (32.9%). Improved from 41.8% but still far above 5% target.'),
    ('SPRINT S5 DAY 5 -- 15.2% vs 28.6%', 'SPRINT S5 DAY 5 -- 27.1% vs 35.7%'),
    ('S5 Day 5/14. 23/154 pts complete (15.2%). Behind pace (28.6% expected). 28 tickets unassigned.',
     'S5 Day 5/14. 42/186 pts complete (22.6%). Closer to pace (35.7% expected). Ivan cleared 4 stale items.'),
    ('ARTEMIS WORK MIX -- 10.4% vs 60% target', 'ARTEMIS WORK MIX -- 11.4% vs 60% target'),
    ('At 10.4% vs 60% target. Slightly improved from 9.1% but still severely under-allocated.',
     'At 11.4% vs 60% target. Marginal improvement from 10.4% but still severely under-allocated.'),
    ('-31 days', '-32 days'),
    ('6 STALE ITEMS (3 CR + 3 IP)', '4 STALE ITEMS (1 CR + 3 IP)'),
    ('Ivan Peev has 6 stale items: 3 CR (BACK-1299/1300/1311) + 3 IP (BACK-1301/1302/1303). Needs review.',
     'Ivan cleared 4 stale items to Done. Remaining: 3 IP (BACK-1301/1302/1303 8d) + 1 CR (BACK-1993 5d unassigned).'),
    # Baseline comparison
    ('baseline: "S5 Day 5", current: "S5 Day 5"', 'baseline: "S5 Day 4", current: "S5 Day 5"'),
    ('baseline: "S5 Day 4", current: "S5 Day 5", delta: "+1 day", trend: "progressing"',
     'baseline: "S5 Day 4", current: "S5 Day 5", delta: "+1 day", trend: "progressing"'),
    ('baseline: 67, current: 67, delta: "+1", trend: "scope added"',
     'baseline: 67, current: 70, delta: "+3", trend: "scope added"'),
    ('baseline: 154, current: 154, delta: "+19", trend: "scope added"',
     'baseline: 154, current: 186, delta: "+32", trend: "scope added"'),
    ('baseline: "15.2%", current: "15.2%", delta: "+2.3%", trend: "improving"',
     'baseline: "15.2%", current: "27.1%", delta: "+11.9%", trend: "improving"'),
    ('baseline: 10.4, current: 10.4, delta: "+1.3%", trend: "improved"',
     'baseline: 10.4, current: 11.4, delta: "+1.0%", trend: "improved"'),
    ('baseline: 28, current: 28, delta: "-2", trend: "improved"',
     'baseline: 28, current: 23, delta: "-5", trend: "improved"'),
    # Sprint planning alert
    ('completionRate: 13.6,', 'completionRate: 27.1,'),
    ('pointsCompletionRate: 15.2,', 'pointsCompletionRate: 22.6,'),
    ('daysRemaining: 10,', 'daysRemaining: 9,'),
    ("actionNeeded: 'S5 Day 5 -- 15.2% complete vs 28.6% expected. 28 unassigned (41.8%). 6 stale items. ARTEMIS at 10.4% vs 60% target. Colony expired (-31d). BetaNxt expired.'",
     "actionNeeded: 'S5 Day 5 -- 27.1% complete vs 35.7% expected. 23 unassigned (32.9%). 4 stale items. ARTEMIS at 11.4% vs 60% target. Colony expired (-32d). BetaNxt expired.'"),
    # Work mix
    ('artemis: { tickets: 7, points: 15, percent: 10', 'artemis: { tickets: 8, points: 18, percent: 11'),
    ('client: { tickets: 7, points: 14, percent: 10', 'client: { tickets: 8, points: 16, percent: 11'),
    # Velocity
    ('{ sprint: "2026-S5", committed: 154, completed: 23, rate: 15.2, status: "in_progress" }',
     '{ sprint: "2026-S5", committed: 186, completed: 42, rate: 22.6, status: "in_progress" }'),
])


# ============================================================
# STEP 6: workMixData.ts
# ============================================================
print('\n=== STEP 6: workMixData.ts ===')
update_file_all('workMixData.ts', [
    ('-31 days', '-32 days'),
])
update_file('workMixData.ts', [
    ('s2Tickets: 7,\n    s2Percentage: 10,\n    target: "50-60%"', 's2Tickets: 8,\n    s2Percentage: 11,\n    target: "50-60%"'),
    ('s2Tickets: 7,\n    s2Percentage: 10,\n    target: "30-35%"', 's2Tickets: 8,\n    s2Percentage: 11,\n    target: "30-35%"'),
    ('totalTickets: 67,', 'totalTickets: 70,'),
    ('totalPoints: 154,', 'totalPoints: 186,'),
    ('artemisPercentage: 10,', 'artemisPercentage: 11,'),
    ('clientPercentage: 10,', 'clientPercentage: 11,'),
    ('artemis: -50, // 10 - 60 (SEVERELY UNDER)', 'artemis: -49, // 11 - 60 (SEVERELY UNDER)'),
    ('client: -20 // 10 - 30 (UNDER)', 'client: -19 // 11 - 30 (UNDER)'),
])


# ============================================================
# STEP 7: engineerCapacityData.ts
# ============================================================
print('\n=== STEP 7: engineerCapacityData.ts ===')
update_file('engineerCapacityData.ts', [
    # Lane Terry: 1t/1pt -> 4t/14pts, 2 IP, 1 CR, 1 Done
    ("s4Tickets: 1, s4Points: 1, status: 'red', statusNote: '1 IP, backlog debt +3'",
     "s4Tickets: 4, s4Points: 14, status: 'yellow', statusNote: '2 IP, 1 CR, 1 Done, backlog debt +3'"),
    # Ivan Peev: 8t/21pts -- 4 Done (cleared stale!), 4 IP
    ("s4Tickets: 8, s4Points: 21, status: 'yellow', statusNote: '2 IP, 3 CR (stale), 3 Done, backlog debt 0'",
     "s4Tickets: 8, s4Points: 21, status: 'green', statusNote: '4 IP, 4 Done (cleared 4 stale), backlog debt -4'"),
    # Darius: 2t/5pts, 1 IP, 1 Done, debt +3
    ("s4Tickets: 2, s4Points: 5, status: 'red', statusNote: '2 WFA, backlog debt +4'",
     "s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +3'"),
    # Kannal: 6t/12pts, 1 IP, 2 ToDo, 1 CR, 2 Done, debt +1
    ("s4Tickets: 6, s4Points: 9, status: 'yellow', statusNote: '2 IP, 2 CR, 2 Done, backlog debt +2'",
     "s4Tickets: 6, s4Points: 12, status: 'yellow', statusNote: '1 IP, 2 ToDo, 1 CR, 2 Done, backlog debt +1'"),
    # Kalvin: 4t/8pts, 1 IP, 1 Done, 1 Canceled, 1 WFA, debt -1
    ("s4Tickets: 4, s4Points: 5, status: 'green', statusNote: '2 IP, 1 CR, 1 Done, backlog debt 0'",
     "s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '1 IP, 1 Done, 1 WFA, backlog debt -1'"),
    # Aleksander: 5t/19pts, 1 IP, 1 CR, 2 WFA, 1 Done, debt +3
    ("s4Tickets: 5, s4Points: 24, status: 'red', statusNote: '2 IP, 1 CR, 2 WFA, backlog debt +4'",
     "s4Tickets: 5, s4Points: 19, status: 'yellow', statusNote: '1 IP, 1 CR, 2 WFA, 1 Done, backlog debt +3'"),
    # Owen: 5t/10pts, 1 IP, 1 CR, 3 Done, debt -3
    ("s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '2 IP, 1 CR, 2 Done, backlog debt -3'",
     "s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP, 1 CR, 3 Done, backlog debt -3'"),
    # Matthew: 2t/3pts, 1 IP, 1 Done, debt +4
    ("s4Tickets: 2, s4Points: 3, status: 'red', statusNote: '1 IP, 1 ToDo, backlog debt +5'",
     "s4Tickets: 2, s4Points: 3, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +4'"),
    # Treven: 1t/5pts, 1 CR, debt +1
    ("s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 IP, backlog debt +1'",
     "s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 CR, backlog debt +1'"),
    # Capacity summary
    ('totalS3Tickets: 67,', 'totalS3Tickets: 70,'),
    ('totalS3Points: 154,', 'totalS3Points: 186,'),
    ('s3Assigned: 39,', 's3Assigned: 47,'),
    ('s3Unassigned: 28,', 's3Unassigned: 23,'),
    ('s3UnassignedPercent: 41.8,', 's3UnassignedPercent: 32.9,'),
    ('totalAssignedPoints: 103,', 'totalAssignedPoints: 117,'),
    ('unassignedPoints: 51,', 'unassignedPoints: 69,'),
    ('avgPointsPerEngineer: 10.3,', 'avgPointsPerEngineer: 12.4,'),
    ("aboveThreshold: ['Aleksander Winski (24 pts)', 'Ivan Peev (21 pts)'] as string[],",
     "aboveThreshold: ['Ivan Peev (21 pts)', 'Aleksander Winski (19 pts)'] as string[],"),
    ("belowMinimum: ['Darius Ouderkirk (5)', 'Chad Hegerhorst (5)']",
     "belowMinimum: ['Matthew Snow (3)', 'Chad Hegerhorst (5)', 'Darius Ouderkirk (5)']"),
    ("heavyWorkloads: ['Aleksander Winski (5 tickets, 24 pts)', 'Ivan Peev (8 tickets, 21 pts)', 'Owen Riley (5 tickets, 10 pts)', 'Kannal Mutharasu (6 tickets, 9 pts)']",
     "heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Kannal Mutharasu (6 tickets, 12 pts)']"),
])

# Update code review queue
update_file('engineerCapacityData.ts', [
    ("{ ticket: 'BACK-1918', summary: '[Colony] GAP Coverage Provider to Allegro', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 9 },\n  { ticket: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', assignee: 'Ivan Peev', points: 3, daysInReview: 9 },\n  { ticket: 'BACK-1792', summary: 'JAVA - Generate/Review Unit Test Markdowns', assignee: 'Brandon Baguley', points: 1, daysInReview: 9 },\n  { ticket: 'BACK-1970', summary: '[Colony] Enable conditional reconciliation', assignee: 'Kannal Mutharasu', points: 3, daysInReview: 2 },\n  { ticket: 'BACK-1913', summary: 'Use Single Entity Manager for All Queries', assignee: 'Kannal Mutharasu', points: 3, daysInReview: 2 },\n  { ticket: 'BACK-1968', summary: \"Don't Check Source for Recon Extractions\", assignee: 'Lane Terry', points: 2, daysInReview: 2 },\n  { ticket: 'BACK-1966', summary: 'API: List users with access to tenant globally', assignee: 'Kalvin Willison', points: 5, daysInReview: 2 },\n  { ticket: 'UI-778', summary: 'Fix CSV rendering', assignee: 'Owen Riley', points: 1, daysInReview: 2 }",
     "{ ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 1 },\n  { ticket: 'BACK-1930', summary: '[BE] preprocessor bugfixes accenture', assignee: 'Aleksander Winski', points: 5, daysInReview: 3 },\n  { ticket: 'BACK-2005', summary: '[Colony] Allegro Integration Feedback Feb 26', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 2 },\n  { ticket: 'BACK-1981', summary: 'Account Creation XLSX Parser', assignee: 'Treven Trujillo', points: 5, daysInReview: 1 },\n  { ticket: 'BACK-2008', summary: '[Sunwest] Troubleshoot token errors', assignee: 'Brandon Baguley', points: 1, daysInReview: 1 },\n  { ticket: 'UI-788', summary: 'Make AD filters persist through session', assignee: 'Owen Riley', points: 2, daysInReview: 1 },\n  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 5 }"),
])


# ============================================================
# STEP 8: mondaySalesPipelineData.ts
# ============================================================
print('\n=== STEP 8: mondaySalesPipelineData.ts ===')
update_file_all('mondaySalesPipelineData.ts', [
    ('MARCH 3, 2026', 'MARCH 4, 2026'),
    ('-31 days', '-32 days'),
])
update_file('mondaySalesPipelineData.ts', [
    ('28 unassigned (41.8%)', '23 unassigned (32.9%)'),
    ('13.6% complete', '27.1% complete'),
    ('10.4%', '11.4%'),
    ('$13,672,000', '$13,655,000'),
    ('13672000', '13655000'),
    ('$13.672M', '$13.655M'),
])


# ============================================================
# STEP 9: blockedItemsData.ts
# ============================================================
print('\n=== STEP 9: blockedItemsData.ts ===')
update_file_all('blockedItemsData.ts', [
    ('daysBlocked: 18,', 'daysBlocked: 19,'),
    ('"Blocked 18 days -- internal dependency"', '"Blocked 19 days -- internal dependency"'),
    ('daysSinceUpdate: 18', 'daysSinceUpdate: 19'),
    ('daysInReview: 18', 'daysInReview: 19'),
])
update_file('blockedItemsData.ts', [
    ('daysSinceUpdate: 25', 'daysSinceUpdate: 26'),
])


print('\n=== ALL DONE! March 4, 2026 update complete ===')
print('Sprint S5 Day 5/14: 70 tickets, 186 pts, 19 Done (42 pts)')
print('27.1% ticket completion, 22.6% points completion')
print('Stale: 4 (3 IP Ivan Peev + 1 CR unassigned)')
print('BIG WIN: Ivan cleared 4 stale items (BACK-1297/1299/1300/1311 -> Done)')
print('Monday.com: 113 deals, $13.655M, $3.467M weighted')
