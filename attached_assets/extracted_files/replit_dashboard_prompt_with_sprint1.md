# COMPREHENSIVE REPLIT DASHBOARD UPDATE PROMPT
## DeepSee AI Prioritization Dashboard - Board View Enhancement

---

## OBJECTIVE
Update the DeepSee dashboard to include Steve's Board View requirements and Ryan's three-bucket categorization from Column D of the Master_Data_Features Excel sheet. The dashboard must serve both internal stakeholders (Engineering, Product) and external stakeholders (Board, Steve).

---

## STEVE'S 5 BOARD VIEW REQUIREMENTS

The Board View tab must display:

1. **Roadmap Delivered vs Plan**
   - Show planned features by quarter (NOW/NEXT/LATER) vs actual completion status
   - Visual progress tracker comparing planned vs delivered

2. **Adoption of Top Value-Driving Features/Workflows**
   - Highlight features with highest ARR impact
   - Show adoption rates by client

3. **Reliability/Security Milestones (Enterprise Readiness)**
   - Track security vulnerability remediation progress
   - Show compliance/audit readiness status
   - Display infrastructure stability metrics

4. **Implementation Time Trend; Time-to-First-Value**
   - Track deployment duration from start to production
   - Show client onboarding velocity

5. **Support Volume and SLA Attainment**
   - Track support ticket trends
   - Display SLA compliance metrics

---

## RYAN'S THREE-BUCKET FRAMEWORK (FROM COLUMN D)

Features are categorized into three strategic buckets:

| Bucket | Count | Board Question | Description |
|--------|-------|----------------|-------------|
| **Make Money** | 45 | "How do we make money?" | Revenue-generating client activities, new contracts |
| **Don't Lose Money** | 12 | "How do we not lose money?" | Speed improvements, retention, client risk mitigation |
| **Innovation** | 17 | "How do we keep competitive advantage?" | Information graph, blueprint, cross-platform capabilities |

---

## RAW DATA: MASTER_DATA_FEATURES (74 Features)

### BUCKET DISTRIBUTION
- Make Money: 45 features (61%)
- Innovation: 17 features (23%)
- Don't Lose Money: 12 features (16%)

### QUARTER DISTRIBUTION
- NOW: 40 features
- NEXT: 22 features
- LATER: 12 features

### AGENT TYPE DISTRIBUTION
- Platform (All Agents): 31
- Platform (Analytics): 10
- DeepPilot: 6
- DeepRecon: 5
- Email Automation: 4
- Core Reconciliation: 4
- Trade Processing: 4
- Matching Engine: 3
- Security Settlements: 2
- Standing Settlement Instructions: 2
- HMDA/CRA: 1
- Loan Operations: 1
- WATCHTOWER: 1

### COMPLETE FEATURE LIST WITH BUCKETS

```json
{
  "features": [
    {"id": "F-001", "name": "Mercury Extraction", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-002", "name": "Client Agent Interaction Enhancements", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-003", "name": "DeepSee Service Fabric Internal Enhancements", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-004", "name": "Retention Prediction UI", "bucket": "Make", "agent": "Platform (Analytics)", "quarter": "NOW", "client": "BetaNXT", "artemis": false},
    {"id": "F-005", "name": "Double-click to view dashboard messages", "bucket": "Make", "agent": "Platform (Analytics)", "quarter": "NOW", "client": "Broadridge", "artemis": false},
    {"id": "F-007", "name": "Matching Engine UI", "bucket": "Make", "agent": "Matching Engine", "quarter": "NOW", "client": "Altaira", "artemis": true},
    {"id": "F-008", "name": "Information Graph Enhanced Infrastructure", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": true},
    {"id": "F-009", "name": "Enhanced Agent Outcome Reasoning and Planning", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-010", "name": "Inference / Training speed improvements", "bucket": "Don't Lose", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-011", "name": "Activity Tracing Across Agents", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-012", "name": "Exception Prediction", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "LATER", "client": "All", "artemis": true},
    {"id": "F-013", "name": "Simplified Agentic UI Implementation", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": true},
    {"id": "F-014", "name": "Information Graph UI Design", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "NEXT", "client": "All", "artemis": true},
    {"id": "F-015", "name": "MCP Integration with 3rd Party Agents", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "LATER", "client": "All", "artemis": true},
    {"id": "F-016", "name": "Enhanced Integration with 3rd Party Applications - Outlook & Ops Console", "bucket": "Don't Lose", "agent": "Email Automation", "quarter": "NOW", "client": "All", "artemis": true},
    {"id": "F-017", "name": "User configurable dashboards", "bucket": "Don't Lose", "agent": "Platform (Analytics)", "quarter": "LATER", "client": "Broadridge", "artemis": true},
    {"id": "F-018", "name": "Process Mapping and Optimization Opportunities", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "LATER", "client": "All", "artemis": true},
    {"id": "F-019", "name": "Information Graph UI Implementation", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "NEXT", "client": "All", "artemis": true},
    {"id": "F-020", "name": "Technologist and Model Review UI implementation", "bucket": "Don't Lose", "agent": "Platform (Analytics)", "quarter": "NEXT", "client": "All", "artemis": true},
    {"id": "F-021", "name": "DeepSee Service Fabric External Enhancements", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "LATER", "client": "All", "artemis": true},
    {"id": "F-022", "name": "Integrated foreign language support", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "BBVA", "artemis": true},
    {"id": "F-023", "name": "Process variation highlights", "bucket": "Innovation", "agent": "Platform (Analytics)", "quarter": "LATER", "client": "All", "artemis": false},
    {"id": "F-024", "name": "Agentic Card UI Implementation for 3rd Party Applications - Microsoft CoPilot", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": false},
    {"id": "F-025", "name": "Enhanced Testing Suite UI Implementation", "bucket": "Don't Lose", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": false},
    {"id": "F-026", "name": "DTCC Agent Onboarding - Trade Processing Phase 1", "bucket": "Make", "agent": "Trade Processing", "quarter": "NEXT", "client": "DTCC", "effort": "L-Large 8wks", "artemis": false},
    {"id": "F-027", "name": "DTCC Agent Onboarding - Trade Processing Phase 2", "bucket": "Make", "agent": "Trade Processing", "quarter": "NEXT", "client": "DTCC", "artemis": false},
    {"id": "F-028", "name": "DTCC Agent Onboarding - Core Reconciliation", "bucket": "Make", "agent": "Core Reconciliation", "quarter": "NEXT", "client": "DTCC", "artemis": false},
    {"id": "F-029", "name": "Trade Matching Engine Enhancement", "bucket": "Make", "agent": "Matching Engine", "quarter": "NEXT", "client": "Broadridge", "artemis": false},
    {"id": "F-030", "name": "Email Automation Workflow", "bucket": "Make", "agent": "Email Automation", "quarter": "NOW", "client": "Broadridge", "effort": "L-Large 8wks", "artemis": false},
    {"id": "F-031", "name": "Broadridge Critical Bug Fix - Email Processing", "bucket": "Don't Lose", "agent": "Trade Processing", "quarter": "NOW", "client": "Broadridge", "effort": "S-Small 2wks", "artemis": false, "tier": "Tier 0", "arr_at_risk": 500000},
    {"id": "F-032", "name": "JP Morgan Monthly Reconciliation Enhancement", "bucket": "Don't Lose", "agent": "Core Reconciliation", "quarter": "LATER", "client": "JP Morgan", "artemis": false},
    {"id": "F-033", "name": "DTCC Settlements Optimization", "bucket": "Make", "agent": "Security Settlements", "quarter": "LATER", "client": "DTCC", "artemis": false},
    {"id": "F-034", "name": "Accenture Email Automation Deployment - HERA", "bucket": "Don't Lose", "agent": "Email Automation", "quarter": "NOW", "client": "Accenture", "effort": "L-Large 8wks", "artemis": false},
    {"id": "F-036", "name": "HMDA / CRA Reporting - Colony Bank", "bucket": "Make", "agent": "HMDA / CRA", "quarter": "NOW", "client": "Regional Banks", "effort": "M-Medium 4wks", "artemis": false},
    {"id": "F-037", "name": "Treasury Agent Deployment - Sunwest Bank", "bucket": "Make", "agent": "Standing Settlement Instructions", "quarter": "NOW", "client": "Regional Banks", "effort": "M-Medium 4wks", "artemis": false},
    {"id": "F-038", "name": "Vantage Bank Custom Reconciliation (POC)", "bucket": "Don't Lose", "agent": "Core Reconciliation", "quarter": "NEXT", "client": "Regional Banks", "effort": "XL-Extra Large 12wks+", "artemis": false},
    {"id": "F-039", "name": "Email Automation - Response Generation Enhancement", "bucket": "Make", "agent": "Email Automation", "quarter": "NOW", "client": "All", "artemis": false},
    {"id": "F-040", "name": "Trade Processing - 100% Accuracy Validation", "bucket": "Make", "agent": "Trade Processing", "quarter": "NEXT", "client": "All", "artemis": false},
    {"id": "F-041", "name": "Security Settlements - Break Resolution Automation", "bucket": "Make", "agent": "Security Settlements", "quarter": "NEXT", "client": "Multiple", "artemis": false},
    {"id": "F-042", "name": "SSI - Real-time Data Validation", "bucket": "Make", "agent": "Standing Settlement Instructions", "quarter": "NEXT", "client": "Multiple", "artemis": false},
    {"id": "F-043", "name": "Matching Engine - External Break Detection", "bucket": "Make", "agent": "Matching Engine", "quarter": "NEXT", "client": "Multiple", "artemis": false},
    {"id": "F-045", "name": "Loan Operations - Application Automation", "bucket": "Make", "agent": "Loan Operations", "quarter": "NEXT", "client": "Multiple", "artemis": false},
    {"id": "F-046", "name": "Core Reconciliation - Multi-System Support", "bucket": "Make", "agent": "Core Reconciliation", "quarter": "LATER", "client": "Multiple", "artemis": false},
    {"id": "F-048", "name": "Ingest Email / Case (Outlook, GMAIL, ServiceNow, Salesforce, Dynamics)", "bucket": "Make", "agent": "DeepRecon", "quarter": "NOW", "client": "Multiple", "artemis": null},
    {"id": "F-049", "name": "Ingest Content (Attachment, SharePoint, SFTP, API Call)", "bucket": "Make", "agent": "DeepPilot", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-050", "name": "Success / Failure and Retry of Ingestion Message", "bucket": "Don't Lose", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-051", "name": "Summary Extraction for Initial BluePrint Messaging", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-052", "name": "Email Parsing and Normalization", "bucket": "Make", "agent": "DeepRecon", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-053", "name": "Ingestion of and Execution of Blueprint", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-054", "name": "Classification of Email Message", "bucket": "Make", "agent": "DeepRecon", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-055", "name": "Determination of Follow-on Process from Request", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-056", "name": "Link to follow on Action (Agent/ API Call / Email Response)", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-057", "name": "Plan to generate Outcome from data", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-058", "name": "Call System for Additional Required Data (Form Message / Send / Receive) to generate Work Item", "bucket": "Make", "agent": "DeepRecon", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-059", "name": "Document Parser to identify multiple docs in a single file from Financial Services Content", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-060", "name": "Deep Content Extraction - Implementation of F-001 in ARTEMIS", "bucket": "Make", "agent": "DeepPilot", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-061", "name": "Application of Business Logic from Process Map", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-062", "name": "Reconciliation across all sources to find internal mismatches primarily system to content", "bucket": "Make", "agent": "DeepPilot", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-064", "name": "Capture HITL feedback for extraction", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-065", "name": "Capture HITL feedback to correct outcome", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-066", "name": "Incorporate HITL feedback to adjust outcome", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-067", "name": "Incorporate HITL feedback to adjust business logic and update blueprint", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": null},
    {"id": "F-068", "name": "Highlight exceptions per checklist item (Missing Document, Missing Extracted term, Break, Flag for followup, Pending user feedback, pending other agent, Pending system)", "bucket": "Make", "agent": "DeepPilot", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-069", "name": "Summary of Agent's work including version of Agent, model, logic", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-070", "name": "Generate and transmit system updates and payloads", "bucket": "Make", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-071", "name": "Track success of messages both outgoing and expected responses", "bucket": "Don't Lose", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-072", "name": "Incorporates incoming messages and routes them for email responses", "bucket": "Make", "agent": "DeepRecon", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-074", "name": "DeepGraph which captures all knowledge associated with these work items to feed insights and better response", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NEXT", "client": "All", "artemis": null},
    {"id": "F-075", "name": "DeepGraph Suggestions", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "LATER", "client": "All", "artemis": null},
    {"id": "F-076", "name": "DeepPilot - Dashboards", "bucket": "Make", "agent": "DeepPilot", "quarter": "NEXT", "client": "All", "artemis": null},
    {"id": "F-077", "name": "Ability to Create on demand Dashboards from DeepSee Information Graph", "bucket": "Don't Lose", "agent": "Platform (All Agents)", "quarter": "LATER", "client": "All", "artemis": null},
    {"id": "F-078", "name": "Web Scraping Tool (Includes Login, Access Data, Structuring, and Use in Work item)", "bucket": "Make", "agent": "DeepPilot", "quarter": "LATER", "client": "All", "artemis": null},
    {"id": "F-079", "name": "Agent Library and BluePrint Selection (Includes Categories,Terms, Schema, Checklist Items)", "bucket": "Innovation", "agent": "Platform (All Agents)", "quarter": "NOW", "client": "All", "artemis": null},
    {"id": "F-080", "name": "Watchtower News Feed v1", "bucket": "Innovation", "agent": "WATCHTOWER", "quarter": "NEXT", "client": "Altaira", "artemis": null}
  ]
}
```

---

## KEY METRICS TO DISPLAY

### Summary Statistics
- Total Features: 74
- Total JIRA Tickets: 2,662 (across 6 projects: BACK, CI, FB, UI, SC, PR)
- Sales Pipeline Opportunities: 16
- ARR at Risk (Tier 0): $500K (Broadridge)

### Bucket Summary
| Bucket | Feature Count | % of Total |
|--------|--------------|------------|
| Make Money | 45 | 61% |
| Innovation | 17 | 23% |
| Don't Lose | 12 | 16% |

### Quarter Summary
| Quarter | Feature Count | % of Total |
|---------|--------------|------------|
| NOW | 40 | 54% |
| NEXT | 22 | 30% |
| LATER | 12 | 16% |

---

## DASHBOARD REQUIREMENTS

### NEW TAB: Board View
Create a new tab called "Board View" with the following components:

#### 1. Strategic Bucket Overview (Hero Section)
- Three large KPI cards showing each bucket:
  - **Make Money** (green): 45 features | $X ARR potential
  - **Don't Lose** (yellow/amber): 12 features | $500K at risk
  - **Innovation** (blue): 17 features | Competitive advantage

#### 2. Roadmap Delivered vs Plan Chart
- Horizontal bar chart or timeline showing:
  - X-axis: NOW | NEXT | LATER
  - Y-axis: Feature count
  - Color-coded by bucket (Make/Don't Lose/Innovation)
  - Show completion % for each quarter

#### 3. Feature Adoption Matrix
- Heat map or grid showing:
  - Rows: Top clients (Broadridge, DTCC, JP Morgan, Accenture, Regional Banks)
  - Columns: Agent types
  - Cell values: Feature count / adoption status

#### 4. Security & Reliability Progress
- Progress bars showing:
  - Critical vulnerabilities: X/Y resolved
  - High vulnerabilities: X/Y resolved
  - Infrastructure upgrades: status

#### 5. Time-to-Value Metrics
- Line chart showing:
  - Average deployment duration trend
  - Client onboarding velocity

#### 6. Filters
- Bucket filter (Make/Don't Lose/Innovation)
- Quarter filter (NOW/NEXT/LATER)
- Client filter
- Agent Type filter

---

## EXISTING TABS TO UPDATE

### Engineering View
- Add bucket column visualization
- Show features by bucket breakdown
- Sprint velocity by bucket

### Product Roadmap View
- Add bucket column
- Color-code features by bucket
- Filter by bucket

### Executive Dashboard
- Add bucket summary widgets
- Show ARR by bucket
- Display Tier 0 alerts prominently

---

## PRIORITY SCORING FORMULA (EXISTING)

```
Priority_Score = (ARR × Replicability × Conversion_Probability) / (Effort_Weeks × Confidence_Factor)
```

Where:
- Confidence_Factor: 1 (High), 1.5 (Medium), 2-3 (Low)

---

## IMPLEMENTATION NOTES

1. **Color Scheme**:
   - Make Money: #28a745 (green)
   - Don't Lose: #ffc107 (amber)
   - Innovation: #007bff (blue)
   - Tier 0 Alert: #dc3545 (red)

2. **Password Protection**: Dashboard is password protected (password shared via DM)

3. **Data Source**: Excel file at `2025-11-07-DeepSee-prioritization-dashboard-v3__4_.xlsx`

4. **Update Frequency**: Dashboard should auto-refresh or allow manual refresh

---

---

## SPRINT 1 LIVE DATA (As of December 5, 2025 @ 1:30 PM MT)

### SPRINT SUMMARY

| Metric | Value |
|--------|-------|
| Sprint Name | Sprint 1 |
| Sprint Goal | First sprint after Kanban transition; Wave 1 Security remediation for Broadridge |
| Start Date | December 5, 2025 |
| End Date | December 19, 2025 |
| Total Tickets | 47 |
| Total Story Points | 63 (original) / 29 remaining |
| Sprint Health | 🟢 GREEN |

### STATUS BREAKDOWN

```json
{
  "sprintStatus": {
    "toDo": { "count": 17, "points": 5, "percentage": 36 },
    "inProgress": { "count": 7, "points": 24, "percentage": 15 },
    "codeReview": { "count": 4, "points": 6, "percentage": 8 },
    "done": { "count": 20, "points": 34, "percentage": 43 },
    "blocked": { "count": 0, "points": 0, "percentage": 0 }
  }
}
```

### WAVE 1 SECURITY STATUS - COMPLETE ✅

**Target: 76% vulnerability reduction for Broadridge (Nov 24 deadline)**
**Result: 298/390 vulnerabilities addressed = 76% TARGET ACHIEVED**

```json
{
  "wave1Security": [
    {
      "ticket": "SC-302",
      "summary": "Address PostgreSQL Vulnerabilities",
      "vulnerabilities": 158,
      "status": "DONE",
      "assignee": "Jeff Hegerhorst",
      "notes": "3 PRs merged, 6 commits, build passing"
    },
    {
      "ticket": "SC-303",
      "summary": "Address mlrig-box-to-tokens Vulnerabilities",
      "vulnerabilities": 80,
      "status": "DONE",
      "assignee": "Chad Hegerhorst",
      "notes": "Labels: broadridge-implementation, wave-1"
    },
    {
      "ticket": "SC-304",
      "summary": "Address Kafka Vulnerabilities",
      "vulnerabilities": 60,
      "status": "DONE",
      "assignee": "Jeff Hegerhorst",
      "notes": "7 PRs merged, 31 commits (1 build failing - needs attention)"
    }
  ],
  "totalVulnerabilitiesAddressed": 298,
  "totalVulnerabilities": 390,
  "reductionPercentage": 76,
  "targetAchieved": true
}
```

### TICKETS IN PROGRESS (7)

```json
{
  "inProgress": [
    { "ticket": "BACK-1304", "summary": "Messages API (parent with 5 subtasks)", "assignee": "Lane Terry", "points": 13 },
    { "ticket": "BACK-1436", "summary": "Deep Recon - Always run on import Automations (Broadridge)", "assignee": "Treven Trujillo", "points": 5 },
    { "ticket": "BACK-1531", "summary": "Fine-tune Mercury Extraction for Colony Bank", "assignee": null, "points": null },
    { "ticket": "BACK-1532", "summary": "Fine-tune Mercury Extraction for Sunwest Bank", "assignee": null, "points": null },
    { "ticket": "BACK-1560", "summary": "BBVA Reconciliation Output", "assignee": "Kannal Mutharasu", "points": null },
    { "ticket": "BACK-1564", "summary": "Setup Colony HMDA Mercury Extraction Schema", "assignee": "Kalvin Willison", "points": null },
    { "ticket": "BACK-1570", "summary": "Test HMDA Mercury Extraction End-to-End", "assignee": "Kalvin Willison", "points": 3, "dueDate": "2025-12-05" }
  ]
}
```

### TICKETS IN CODE REVIEW (4)

```json
{
  "codeReview": [
    { "ticket": "BACK-1521", "summary": "Integrate SubCategory Model Calls into Prediction Pipeline", "assignee": "Aleksander Winski", "points": 3 },
    { "ticket": "BACK-1318", "summary": "Counterparties API", "assignee": "Ivan Peev", "points": null },
    { "ticket": "BACK-1322", "summary": "ML Models API", "assignee": "Ivan Peev", "points": null },
    { "ticket": "BACK-1542", "summary": "Deploy v3 API to Accenture & Demo", "assignee": "Lane Terry", "points": null }
  ]
}
```

### COMPLETED TICKETS (20) - KEY ITEMS

```json
{
  "done": [
    { "ticket": "BACK-760", "summary": "Implement RBAC for Message Endpoints", "assignee": "Treven Trujillo", "points": 5 },
    { "ticket": "BACK-761", "summary": "Implement RBAC for Automation Endpoints", "assignee": "Darius Ouderkirk", "points": 3 },
    { "ticket": "BACK-807", "summary": "Add Additional Retries for Async Operations", "assignee": "Lane Terry", "points": 8 },
    { "ticket": "BACK-806", "summary": "[BE] preprocessor becomes unavailable with high load", "assignee": "Aleksander Winski", "points": 8 },
    { "ticket": "BACK-211", "summary": "Auto-generate RBAC Configuration from API", "assignee": "Darius Ouderkirk", "points": 3 },
    { "ticket": "BACK-826", "summary": "Update Completed tab filter to include Emails moved to a Folder", "assignee": "Treven Trujillo", "points": 3 },
    { "ticket": "UI-429", "summary": "DeepRecon - Disable Mark Complete option for completed emails", "assignee": "Owen Riley", "points": 2 },
    { "ticket": "UI-431", "summary": "DeepRecon - View Email Page - Add Flagged / Not Flagged options", "assignee": "Owen Riley", "points": 1 },
    { "ticket": "UI-696", "summary": "Update sso-ui Base Image to Alpine 3.22.2", "assignee": null, "points": 1 },
    { "ticket": "SC-302", "summary": "Address PostgreSQL Vulnerabilities (158 C+H)", "assignee": "Jeff Hegerhorst", "points": null },
    { "ticket": "SC-303", "summary": "Address mlrig-box-to-tokens Vulnerabilities (80 C+H)", "assignee": "Chad Hegerhorst", "points": null },
    { "ticket": "SC-304", "summary": "Address Kafka Vulnerabilities (60 C+H)", "assignee": "Jeff Hegerhorst", "points": null },
    { "ticket": "BACK-870", "summary": "Misc Broadridge DeepView Issues", "assignee": "Darius Ouderkirk", "points": null },
    { "ticket": "BACK-850", "summary": "(Accenture) Light Extraction - Handle Merged cells", "assignee": "Aleksander Winski", "points": null },
    { "ticket": "BACK-831", "summary": "Completed ticket", "assignee": "Darius Ouderkirk", "points": null },
    { "ticket": "BACK-832", "summary": "Completed ticket", "assignee": "Kannal Mutharasu", "points": null }
  ]
}
```

### ENGINEER WORKLOAD

```json
{
  "engineerWorkload": [
    { "name": "Lane Terry", "assigned": 2, "inProgress": 1, "codeReview": 1, "done": 1, "totalPoints": 21 },
    { "name": "Jeff Hegerhorst", "assigned": 2, "inProgress": 0, "codeReview": 0, "done": 2, "totalPoints": null },
    { "name": "Chad Hegerhorst", "assigned": 1, "inProgress": 0, "codeReview": 0, "done": 1, "totalPoints": null },
    { "name": "Aleksander Winski", "assigned": 4, "inProgress": 0, "codeReview": 1, "done": 4, "totalPoints": 11 },
    { "name": "Treven Trujillo", "assigned": 3, "inProgress": 1, "codeReview": 0, "done": 2, "totalPoints": 13 },
    { "name": "Darius Ouderkirk", "assigned": 4, "inProgress": 0, "codeReview": 0, "done": 4, "totalPoints": 6 },
    { "name": "Kalvin Willison", "assigned": 2, "inProgress": 2, "codeReview": 0, "done": 0, "totalPoints": 3 },
    { "name": "Owen Riley", "assigned": 2, "inProgress": 0, "codeReview": 0, "done": 2, "totalPoints": 3 },
    { "name": "Konnor Willison", "assigned": 2, "inProgress": 0, "codeReview": 0, "done": 0, "totalPoints": null },
    { "name": "Ivan Peev", "assigned": 2, "inProgress": 0, "codeReview": 2, "done": 0, "totalPoints": null },
    { "name": "Kannal Mutharasu", "assigned": 2, "inProgress": 1, "codeReview": 0, "done": 1, "totalPoints": null },
    { "name": "Unassigned", "assigned": 12, "inProgress": 0, "codeReview": 0, "done": 0, "totalPoints": 5 }
  ]
}
```

### UNASSIGNED TICKETS (12) - NEED OWNERS

```json
{
  "unassigned": [
    { "ticket": "BACK-1548", "summary": "Enable Conditional Reconciliation", "priority": "Major", "points": 5 },
    { "ticket": "BACK-1485", "summary": "Update preprocessor Base Image to Alpine 3.22.2", "priority": "Major" },
    { "ticket": "BACK-1486", "summary": "Update core-service Base Image to Alpine 3.22.2", "priority": "Major" },
    { "ticket": "BACK-1487", "summary": "Update deeppilot-poll-inbox-trigger Base Image to Alpine 3.22.2", "priority": "Major" },
    { "ticket": "BACK-1488", "summary": "Update deepview-status-service Base Image to Alpine 3.22.2", "priority": "Major" },
    { "ticket": "BACK-1489", "summary": "Update classification-api Base Image to Alpine 3.22.2", "priority": "Major" },
    { "ticket": "BACK-1305", "summary": "Create Message API", "priority": "Major" },
    { "ticket": "BACK-1306", "summary": "Update Message API", "priority": "Major" },
    { "ticket": "SC-310", "summary": "Address deepview-status vulnerabilities", "priority": "Major" },
    { "ticket": "SC-312", "summary": "Address preprocessor vulnerabilities", "priority": "Major" },
    { "ticket": "SC-313", "summary": "Address embeddings vulnerabilities", "priority": "Major" }
  ]
}
```

### RISKS & ALERTS

```json
{
  "risks": [
    {
      "severity": "MEDIUM",
      "item": "SC-304 Build Failing",
      "description": "Kafka vulnerability ticket is merged but has 1 failing build - may need hotfix",
      "owner": "Jeff Hegerhorst"
    },
    {
      "severity": "MEDIUM", 
      "item": "12+ Unassigned Tickets",
      "description": "Multiple TO DO items need owners before Monday standup",
      "owner": "Brandon Baguley"
    },
    {
      "severity": "LOW",
      "item": "BACK-1570 Due Today",
      "description": "HMDA Mercury Extraction testing has Dec 5 due date",
      "owner": "Kalvin Willison"
    }
  ],
  "blocked": []
}
```

### SPRINT 1 WINS 🎉

```json
{
  "wins": [
    {
      "title": "Wave 1 Security Complete",
      "description": "298/390 vulnerabilities addressed (76% reduction) - Broadridge $500K ARR protected",
      "tickets": ["SC-302", "SC-303", "SC-304"]
    },
    {
      "title": "RBAC Implementation Done",
      "description": "Role-based access control for Message and Automation endpoints complete",
      "tickets": ["BACK-760", "BACK-761", "BACK-211"]
    },
    {
      "title": "Zero Blocked Tickets",
      "description": "Sprint 1 is running smoothly with no blockers on Day 1",
      "tickets": []
    }
  ]
}
```

---

## DASHBOARD SPRINT VIEW REQUIREMENTS

### NEW COMPONENT: Sprint Status Widget

Create a sprint status widget showing:

1. **Sprint Health Indicator**
   - Green circle if no blockers and >30% done
   - Yellow if blockers exist or <30% done
   - Red if critical blockers or sprint at risk

2. **Progress Bar**
   - Horizontal stacked bar showing To Do / In Progress / Code Review / Done
   - Color coded: Gray (To Do), Blue (In Progress), Purple (Code Review), Green (Done)

3. **Key Metrics Cards**
   - Total Tickets: 47
   - Story Points Remaining: 29
   - Blocked: 0
   - Days Remaining: 14

4. **Wave 1 Security Progress**
   - Special callout showing 76% complete with checkmark
   - "$500K ARR Protected" badge

5. **Engineer Capacity Table**
   - Show each engineer's workload
   - Highlight overloaded (>15 pts) or underloaded (<5 pts)

6. **Alerts Panel**
   - Show any risks or items needing attention
   - Red for blockers, Yellow for risks

---

## VERIFICATION CHECKLIST

After implementation, confirm:
- [ ] Board View tab created with all 5 Steve requirements
- [ ] Three-bucket filtering works (Make/Don't Lose/Innovation)
- [ ] All 74 features are displayed correctly
- [ ] Bucket distribution matches (45/12/17)
- [ ] Quarter distribution matches (40/22/12)
- [ ] Tier 0 alert is prominently displayed for Broadridge ($500K at risk)
- [ ] Color coding is consistent across all views
- [ ] Filters work correctly
- [ ] Existing tabs updated with bucket column
- [ ] Sprint 1 status widget displays correctly
- [ ] Sprint health shows GREEN
- [ ] Wave 1 Security shows 76% complete
- [ ] Engineer workload table is accurate
- [ ] Unassigned tickets are flagged
- [ ] Risks panel shows SC-304 build issue

---

## END OF PROMPT
