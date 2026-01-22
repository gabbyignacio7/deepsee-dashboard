# Dashboard Data Sources

> Documentation for all data feeds powering the DeepSee Executive Dashboard.
> Last Updated: January 22, 2026

---

## Overview

The dashboard aggregates data from multiple sources. Currently, data collection is **manual** with plans to automate via GitHub Actions.

| Source | Update Frequency | Collection Method | Owner |
|--------|------------------|-------------------|-------|
| JIRA | As-needed | Manual JQL export | Gabriel |
| Monday.com | Weekly | Manual export | Gabriel |
| Roadmap | As-needed | Product input | Ryan/Gabriel |
| Client/ARR | Monthly | Monday.com sync | Gabriel |

---

## 1. JIRA Data (Sprint & Tickets)

### Source
- **System:** Atlassian JIRA
- **URL:** https://deepsee.atlassian.net/

### Files Updated
- `client/src/data/sprintData.ts` - Sprint metrics and ticket details
- `client/src/data/sprint1Data.ts` - Sprint 1 specific data
- `client/src/data/sprint2Data.ts` - Sprint 2 specific data
- `client/src/data/sprint3Data.ts` - Sprint 3 specific data
- `client/src/data/jiraMetrics.ts` - JIRA metrics data
- `client/src/data/blockedItemsData.ts` - Blocked tickets

### Collection Process

1. **Run JQL Query** in JIRA:
   ```
   project IN (BACK, UI, FB, CI, SC, PR) AND Sprint in openSprints() ORDER BY priority DESC, updated DESC
   ```

2. **Export Results:**
   - Click "Export" → "Export Excel CSV (all fields)"
   - Or use JIRA API (see Automation section)

3. **Format to JSON:**
   - Convert CSV to JSON format matching data file schema
   - Include: key, summary, status, assignee, storyPoints, priority, labels, epic, sprint

4. **Update Files:**
   ```bash
   # Update sprint data files with new data
   # Commit and push
   git add client/src/data/sprintData.ts
   git commit -m "chore: update JIRA data [date]"
   git push
   ```

### Data Schema
```typescript
interface JiraTicket {
  key: string;           // e.g., "BACK-1650"
  summary: string;       // Ticket title
  status: string;        // "To Do" | "In Progress" | "Done" | "Blocked"
  assignee: string;      // Developer name
  storyPoints: number;   // Estimate
  priority: string;      // "Highest" | "High" | "Medium" | "Low"
  labels: string[];      // Tags
  epicKey?: string;      // Parent epic
  epicName?: string;     // Epic name
  sprint?: string;       // Sprint name
  prdLink?: string;      // Link to PRD in Confluence
}
```

### JQL Filters by View

| Dashboard View | JQL Filter |
|----------------|------------|
| Current Sprint | `Sprint in openSprints()` |
| Blocked Items | `status = Blocked` |
| By Assignee | `assignee = "Name"` |
| PRD Tickets | `labels IN (mercury, parser, blueprint)` |

---

## 2. Monday.com Data (Sales & Pipeline)

### Source
- **System:** Monday.com
- **URL:** https://deepsee-squad.monday.com/
- **Board:** PoV & Client Tracker (ID: 18396374043)

### Files Updated
- `client/src/data/mondaySalesPipelineData.ts` - Sales pipeline data
- `client/src/data/salesPipelineData.ts` - Sales pipeline metrics
- `client/src/data/clientTrackerData.ts` - Client tracking data
- `client/src/data/pipelineData.ts` - Pipeline metrics
- `client/src/data/stageFunnelData.ts` - Sales funnel stages
- `client/src/data/topDealsData.ts` - Top deals tracking
- `client/src/data/segmentData.ts` - Market segment data

### Collection Process

1. **Navigate to Board:**
   https://deepsee-squad.monday.com/boards/18396374043

2. **Export Data:**
   - Click "..." menu → "Export board to Excel"
   - Or use Monday.com API

3. **Extract Key Fields:**
   - Client Name
   - Client Type (FMI, Bank, Cap Markets)
   - Engagement Status (Live, In Implementation, Active PoV)
   - ARR / Potential ARR
   - Stage
   - DeepSee Owner

4. **Update Files:**
   ```bash
   git add client/src/data/mondaySalesPipelineData.ts
   git commit -m "chore: update Monday.com data [date]"
   git push
   ```

### Data Schema
```typescript
interface Client {
  name: string;
  type: "FMI" | "Bank" | "Cap Markets";
  status: "Live" | "In Implementation" | "Active PoV" | "Churned";
  arr: number;           // Annual Recurring Revenue
  potentialArr?: number; // For prospects
  agent: string;         // Use case / agent type
  owner: string;         // DeepSee account owner
  stage: string;         // Pipeline stage
}
```

---

## 3. Product Roadmap Data

### Source
- **System:** Manual input from Product (Ryan)
- **Reference:** Confluence PRDs, Sprint Planning

### Files Updated
- `client/src/data/roadmapData.ts` - Features, milestones, quarterly timeline
- `client/src/data/masterFeaturesData.ts` - Master feature list
- `client/src/data/clientFeaturesData.ts` - Client-specific features
- `client/src/data/artemisData.ts` - ARTEMIS project data
- `client/src/data/artemisFoundationData.ts` - ARTEMIS foundation data
- `client/src/data/agenticPlatformData.ts` - Agentic platform features

### Collection Process

1. **Gather Input:**
   - Sync with Ryan on feature priorities
   - Review PRDs in Confluence
   - Check JIRA epics for story point totals

2. **Update Roadmap Data:**
   - Features with story points
   - Quarter assignments (Q1, Q2, Q3)
   - Milestone definitions
   - Velocity assumptions

3. **Commit Changes:**
   ```bash
   git add client/src/data/roadmapData.ts
   git commit -m "chore: update roadmap data [date]"
   git push
   ```

### Data Schema
```typescript
interface RoadmapFeature {
  id: string;
  name: string;
  description: string;
  storyPoints: number;
  quarter: "Q1" | "Q2" | "Q3";
  status: "Not Started" | "In Progress" | "Complete";
  prdLink?: string;
  jiraEpic?: string;
  dependencies?: string[];
}

interface Milestone {
  id: string;
  name: string;
  targetQuarter: string;
  description: string;
  requiredFeatures: string[];
}
```

---

## 4. Sprint Metrics (Computed)

### Source
- **Derived from:** JIRA data
- **Calculated at:** Runtime

### Related Files
- `client/src/data/sprintHealthData.ts` - Sprint health metrics
- `client/src/data/sprintAllocationData.ts` - Sprint allocation data
- `client/src/data/workMixData.ts` - Work mix breakdown
- `client/src/data/engineerAllocationData.ts` - Engineer allocation
- `client/src/data/engineerCapacityData.ts` - Engineer capacity
- `client/src/data/engineeringAlignmentData.ts` - Engineering alignment

### Metrics Computed
| Metric | Calculation |
|--------|-------------|
| Sprint Velocity | Sum of completed story points |
| Completion % | (Done tickets / Total tickets) × 100 |
| Blocked Count | Count where status = "Blocked" |
| Work Mix | ARTEMIS pts vs Client pts |
| Burn Rate | Points completed per day |

---

## 5. PRD Mappings

### Source
- **System:** Confluence
- **URL:** https://deepsee.atlassian.net/wiki/spaces/PROD/

### Files Updated
- `client/src/data/prdData.ts` - PRD data
- `client/src/data/prdUrls.ts` - PRD URL mappings

### PRD Links Reference
| PRD | Confluence URL |
|-----|----------------|
| Mercury Extraction | pages/2814476289 |
| Document Parser | pages/2815524865 |
| BluePrint | pages/2824306710 |
| Platform | pages/2823847948 |
| Project ARTEMIS | pages/2824044546 |
| Email Automation | pages/2815852545 |
| Automation & Orchestration | pages/2823913475 |

Full PRD Hub: https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2813558785

---

## 6. Other Data Files

### Security Data
- `client/src/data/sc299SecurityData.ts` - SC-299 security compliance data

### Lookup Tables
- `client/src/data/lookupTables.ts` - Shared lookup tables and mappings

### Change Log
- `client/src/data/changeLog.ts` - Dashboard change history

---

## Automation (Planned)

### JIRA API Automation

To automate JIRA data refresh via GitHub Actions:

1. **Create JIRA API Token:**
   - Go to: https://id.atlassian.com/manage-profile/security/api-tokens
   - Create token, copy value

2. **Add GitHub Secret:**
   - Repo → Settings → Secrets → Actions
   - Add `JIRA_API_TOKEN`
   - Add `JIRA_EMAIL` (your Atlassian email)

3. **GitHub Action Workflow:**
   ```yaml
   # .github/workflows/sync-jira.yml
   name: Sync JIRA Data
   on:
     schedule:
       - cron: '0 6 * * *'  # Daily at 6am UTC
     workflow_dispatch:      # Manual trigger

   jobs:
     sync:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Fetch JIRA Data
           run: |
             curl -u ${{ secrets.JIRA_EMAIL }}:${{ secrets.JIRA_API_TOKEN }} \
               "https://deepsee.atlassian.net/rest/api/3/search?jql=project%20IN%20(BACK,UI)%20AND%20Sprint%20in%20openSprints()" \
               -o client/src/data/jira-raw.json
         - name: Transform Data
           run: node scripts/transform-jira.js
         - name: Commit & Push
           run: |
             git config user.name "GitHub Action"
             git config user.email "action@github.com"
             git add client/src/data/sprintData.ts
             git commit -m "chore: auto-sync JIRA data" || exit 0
             git push
   ```

### Monday.com API Automation

Similar approach using Monday.com GraphQL API:
- API Docs: https://developer.monday.com/api-reference/docs
- Requires API token stored as `MONDAY_API_TOKEN` secret

---

## File Structure

```
client/src/data/
├── sprintData.ts              # Sprint configuration and metrics
├── sprint1Data.ts             # Sprint 1 data
├── sprint2Data.ts             # Sprint 2 data
├── sprint3Data.ts             # Sprint 3 data
├── jiraMetrics.ts             # JIRA metrics
├── blockedItemsData.ts        # Blocked items tracking
├── mondaySalesPipelineData.ts # Monday.com sales pipeline
├── salesPipelineData.ts       # Sales pipeline metrics
├── clientTrackerData.ts       # Client tracking
├── pipelineData.ts            # Pipeline metrics
├── stageFunnelData.ts         # Sales funnel stages
├── topDealsData.ts            # Top deals
├── segmentData.ts             # Market segments
├── roadmapData.ts             # Product roadmap features
├── masterFeaturesData.ts      # Master feature list
├── clientFeaturesData.ts      # Client-specific features
├── artemisData.ts             # ARTEMIS project data
├── artemisFoundationData.ts   # ARTEMIS foundation
├── agenticPlatformData.ts     # Agentic platform features
├── sprintHealthData.ts        # Sprint health metrics
├── sprintAllocationData.ts    # Sprint allocation
├── workMixData.ts             # Work mix breakdown
├── engineerAllocationData.ts  # Engineer allocation
├── engineerCapacityData.ts    # Engineer capacity
├── engineeringAlignmentData.ts# Engineering alignment
├── prdData.ts                 # PRD data
├── prdUrls.ts                 # PRD URL mappings
├── sc299SecurityData.ts       # Security compliance
├── lookupTables.ts            # Shared lookups
└── changeLog.ts               # Change history
```

---

## Refresh Checklist

### Before Sprint Planning
- [ ] Export latest JIRA data
- [ ] Update sprint dates in sprintData.ts
- [ ] Verify ticket counts match JIRA

### Weekly (Monday)
- [ ] Sync Monday.com pipeline data
- [ ] Update any ARR changes
- [ ] Check for new clients

### Monthly
- [ ] Review roadmap with Ryan
- [ ] Update quarterly feature allocations
- [ ] Reconcile PRD mappings

---

## Questions?

Contact: Gabriel Ignacio (Technical Product Manager)
Slack: @gabriel.ignacio
