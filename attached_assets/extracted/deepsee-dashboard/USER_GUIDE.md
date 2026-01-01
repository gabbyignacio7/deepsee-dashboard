# DeepSee AI Priority Dashboard - User Guide

## 📖 Table of Contents
1. [Getting Started](#getting-started)
2. [Navigation](#navigation)
3. [Dashboard Views](#dashboard-views)
4. [Filtering & Searching](#filtering--searching)
5. [Understanding Priority Scores](#understanding-priority-scores)
6. [Interpreting Visualizations](#interpreting-visualizations)
7. [Exporting Data](#exporting-data)
8. [FAQs](#faqs)

## 🚀 Getting Started

### Accessing the Dashboard
1. Open your web browser
2. Navigate to the deployed URL (will be provided after deployment)
3. The dashboard loads automatically with all current data

### First Time Users
- **Sales Team**: Click "Sales Pipeline" tab
- **Engineering Team**: Click "Engineering" tab
- **Product Team**: Click "Product Roadmap" tab
- **Leadership**: Start with "Executive Summary"

## 🧭 Navigation

### Main Navigation Bar
Located at the top of the page with 4 main tabs:

1. **📊 Executive Summary** - High-level KPIs and priorities
2. **💰 Sales Pipeline** - Revenue forecast and opportunities
3. **⚙️ Engineering** - Capacity and workload management
4. **🗺️ Product Roadmap** - Feature timeline and portfolio

### Clicking on Features
- Click any feature card or table row to view detailed information
- Click the "← Back" button to return to the previous view

## 📊 Dashboard Views

### 1. Executive Summary Dashboard

**Hero KPIs (Top Row)**:
- **Total Pipeline ARR**: Sum of all sales opportunities
- **Weighted ARR**: Pipeline ARR adjusted by conversion probability
- **Engineering Capacity**: Total effort required (in weeks)
- **Total Features**: Number of features shown
- **Tier 0 (At Risk)**: Critical features requiring immediate attention

**Filter Panel**:
- **Quarter**: Filter by Q4 2025, Q1 2026, Q2 2026, Q3 2026, or All
- **Priority Tier**: Filter by Tier 0, 1, 2, 3, 4, or All
- **Status**: Filter by Not Started, In Progress, Blocked, Completed, or All

**Revenue at Risk Alert** (Red Section):
- Shows all Tier 0 features (revenue at risk)
- Displays client name, ARR at risk, current status
- Click to view full feature details

**Priority Distribution Charts**:
- **Bar Chart**: Feature count by priority tier
- **Pie Chart**: Weighted ARR distribution by tier

**Top 10 Features Table**:
- Ranked by Priority Score (highest first)
- Shows Tier, Weighted ARR, Effort, Client, Status
- Click any row to view feature details

### 2. Sales Pipeline Dashboard

**Sales Funnel Chart**:
- Visualizes opportunities through sales stages
- Shows Weighted ARR at each stage
- Stages: Introduction → Qualification → Proposal → POC → Contract Negotiation → Closed Won

**Opportunities by Stage**:
- Card view showing Weighted ARR and opportunity count per stage
- Quickly identify where deals are concentrated

**Feature-to-Deal Mapping Table**:
- Shows which features are required for which deals
- **Priority Tier**: Indicates development priority
- **Required For Deals**: List of opportunities needing this feature
- **Total Deal Value**: Sum of all related deals
- **Status**: Current development status
- ⚠️ **Blocked features** prevent deals from closing!

### 3. Engineering Capacity Dashboard

**Capacity KPIs**:
- **Total Backlog**: Sum of all feature effort estimates
- **In Progress**: Currently active work
- **Not Started**: Queued work
- **Total Tickets**: Number of JIRA tickets

**Blocked Work Alert** (Red Section):
- Lists all blocked JIRA tickets
- Shows Ticket ID, Title, Client
- Requires immediate attention to unblock

**Technical Debt vs Feature Work** (Pie Chart):
- Breakdown of story points by category:
  - Bug Fix
  - Feature Development
  - Technical Debt
  - Infrastructure
  - Documentation

**Story Points by Category** (Bar Chart):
- Visual comparison of effort allocation
- Helps balance technical debt vs new features

### 4. Product Roadmap Dashboard

**Replicability vs. Effort Matrix**:
This 2x2 matrix helps identify strategic priorities:

- **🎯 Quick Wins** (Top-Left Quadrant)
  - High Replicability + Low Effort
  - **Action**: Prioritize immediately for maximum ROI

- **🚀 Strategic Investments** (Top-Right Quadrant)
  - High Replicability + High Effort
  - **Action**: Plan carefully, high long-term value

- **⚡ Fill-Ins** (Bottom-Left Quadrant)
  - Low Replicability + Low Effort
  - **Action**: Use to fill capacity gaps

- **⚠️ Avoid/Question** (Bottom-Right Quadrant)
  - Low Replicability + High Effort
  - **Action**: Challenge these features—are they worth it?

**How to Use the Matrix**:
- X-axis: Effort (weeks)
- Y-axis: Replicability Score (1-5)
- Bubble size: Weighted ARR
- Hover over bubbles to see feature details
- Click bubbles to open feature detail page

**Quarterly Feature Roadmap**:
- Features organized by quarter (Q4 2025, Q1 2026, etc.)
- Color-coded cards by Priority Tier
- Shows:
  - Client
  - Effort estimate
  - Weighted ARR
  - Completion progress bar
- Click any card to view details

**Agent Type Portfolio Table**:
- Breakdown by AI agent (9 types)
- Shows:
  - Feature count per agent
  - Total Weighted ARR
  - Total effort required
- Helps balance portfolio across agents

### 5. Feature Detail Page

**Feature Header**:
- Feature name and ID
- Large Priority Tier badge (color-coded)
- Current Status badge
- **Priority Score** (large number)

**Financial Summary**:
- ARR Amount
- Weighted ARR (ARR × Conversion %)
- Revenue Type (New Contract, Expansion, etc.)
- Contract Status (Committed, POC, etc.)
- Conversion Probability %
- Deal Close Date (if applicable)

**Effort & Replicability**:
- Replicability Score (1-5 stars)
- Effort Estimate (weeks)
- T-Shirt Size (S, M, L, XL)
- Completion % with progress bar

**Client & Agent Information**:
- Primary Client
- Additional Clients (if any)
- Agent Type
- Category
- Quarter Planned

**Assignment & Ownership**:
- Assigned Engineer/PM
- Team Required
- Dependencies
- Engineering Complexity

**Linked JIRA Tickets Table**:
- All tickets mapped to this feature
- Shows Ticket ID, Title, Status, Story Points
- Total ticket count displayed

**Linked Sales Opportunities Table**:
- All deals requiring this feature
- Shows Opportunity Name, Client, Stage, ARR, Probability
- Helps understand revenue impact

**Notes & Comments**:
- Engineering Notes
- Management Notes
- Sales Notes
- Provides context and rationale

## 🔍 Filtering & Searching

### Using Filters
1. Locate the filter panel (white card with dropdowns)
2. Select one or more filter criteria
3. Dashboard updates automatically
4. Filters persist when switching between views
5. Reset by selecting "All" for each filter

### Filter Combinations
You can combine filters for precise views:
- Example: "Q4 2025" + "Tier 1" + "In Progress"
- Shows only high-priority Q4 features currently being worked on

### Tips for Effective Filtering
- **Sales**: Filter by Client to see features for specific accounts
- **Engineering**: Filter by Status to focus on blocked or in-progress work
- **Product**: Filter by Quarter to plan upcoming releases

## 📐 Understanding Priority Scores

### The Formula
```
Priority Score = (ARR × Replicability × Conversion %) ÷ Effort
```

### What It Means
A **higher score** = **higher priority**

**Example Calculation**:
- ARR: $500,000
- Replicability: 5 (benefits all clients)
- Conversion: 80%
- Effort: 8 weeks

Priority Score = (500,000 × 5 × 0.80) ÷ 8 = **250,000**

This would be a **Tier 1 (Fast Track)** feature (score ≥ 100)

### Priority Tiers Explained

| Tier | Score Range | Color | Meaning | Action |
|------|-------------|-------|---------|--------|
| **Tier 0: Emergency** | N/A (Revenue at Risk) | 🔴 Red | Existing client at risk of churn | **Drop everything** - address immediately |
| **Tier 1: Fast Track** | ≥ 100 | 🟠 Orange | High ROI features | **Prioritize** - schedule next sprint |
| **Tier 2: Standard Delivery** | 50-99 | 🟡 Yellow | Solid business case | **Plan** - schedule in quarter |
| **Tier 3: Custom Engagement** | 10-49 | 🔵 Light Blue | Client-specific work | **Evaluate** - consider alternatives |
| **Tier 4: Backlog** | < 10 | ⚪ Gray | Low priority or exploratory | **Defer** - revisit in future planning |

### Interpreting Scores

**High Priority Score Drivers**:
- ✅ High ARR (big contract value)
- ✅ High Replicability (many clients benefit)
- ✅ High Conversion (likely to close)
- ✅ Low Effort (quick to build)

**Low Priority Score Indicators**:
- ⚠️ Low ARR (small revenue impact)
- ⚠️ Low Replicability (only one client)
- ⚠️ Low Conversion (uncertain deal)
- ⚠️ High Effort (expensive to build)

### Manual Overrides
Some features may have **Manual Override** enabled:
- Leadership can override calculated priority
- Indicated in Feature Detail page
- Shows both calculated and override scores
- Use sparingly for strategic decisions

## 📊 Interpreting Visualizations

### Bar Charts
- **Height** = Magnitude (count, ARR, effort)
- **Color** = Category (tier, status, type)
- **Hover** for exact values

### Pie Charts
- **Size of slice** = Proportion of total
- **Color** = Category
- **Hover** for exact values and percentages

### Scatter Plot (Replicability Matrix)
- **X-axis** = Effort (left = less, right = more)
- **Y-axis** = Replicability (bottom = low, top = high)
- **Bubble size** = Weighted ARR
- **Hover** for feature details

### Progress Bars
- **Blue fill** = Completion percentage
- **Gray background** = Remaining work
- Shows completion status (0-100%)

### Color Coding Reference

**Priority Tiers**:
- 🔴 Red = Tier 0 (Emergency)
- 🟠 Orange = Tier 1 (Fast Track)
- 🟡 Yellow = Tier 2 (Standard)
- 🔵 Light Blue = Tier 3 (Custom)
- ⚪ Gray = Tier 4 (Backlog)

**Status**:
- 🟢 Green = Completed
- 🔵 Blue = In Progress
- 🔴 Red = Blocked
- ⚪ Gray = Not Started / Cancelled

## 📤 Exporting Data

### How to Export
1. Navigate to Executive Summary view
2. Click the "📥 Export Data" button (top right)
3. File downloads as `features-export.csv`
4. **Note**: Export includes currently filtered data

### What's Included in Export
All visible feature fields:
- Feature ID and Name
- Priority Score and Tier
- ARR and Weighted ARR
- Effort Estimate
- Client information
- Status and completion
- Dates and assignments

### Using Exported Data
- Open in Excel or Google Sheets
- Perform custom analysis
- Share with stakeholders
- Create custom reports

## ❓ FAQs

### General Questions

**Q: How often is data updated?**
A: Data is loaded from JSON files when you open the dashboard. To see new data, you'll need to reload the page after data files are updated.

**Q: Can I edit data in the dashboard?**
A: No, this is a read-only dashboard. Data must be updated in the source systems (JIRA, Monday.com, or the features database) and re-imported.

**Q: Why don't I see some features?**
A: Check your active filters! You may have filtered out features. Set all filters to "All" to see everything.

### Priority Scoring

**Q: Why is a feature with high ARR ranked low?**
A: Priority Score considers 4 factors. High effort or low replicability can lower the score even with high ARR.

**Q: What does "Revenue at Risk" mean?**
A: These are Tier 0 features tied to existing contracts that might churn if we don't deliver.

**Q: Can I change the priority scoring formula?**
A: No, the formula is standardized. However, leadership can use Manual Override for exceptional cases.

### Technical Questions

**Q: The dashboard is loading slowly. Why?**
A: The dashboard processes 47 features, 198 JIRA tickets, and 16 opportunities. With filters active, it should load in 1-3 seconds. Try clearing your browser cache.

**Q: Can I access this on mobile?**
A: Yes! The dashboard is mobile-responsive. Charts may be horizontally scrollable on small screens.

**Q: Which browsers are supported?**
A: Chrome, Firefox, Safari, and Edge (latest versions).

### Data Integration

**Q: How do features link to JIRA tickets?**
A: JIRA tickets have a `Mapped_Feature_ID` field that references the feature's `Feature_ID`.

**Q: How do features link to sales opportunities?**
A: Sales opportunities have a `Mapped_Feature_IDs` field (comma-separated) listing required features.

**Q: What if a feature has no linked tickets or deals?**
A: That's okay! The feature will still appear in the dashboard. Linked sections simply won't show.

## 📞 Support & Feedback

**For Dashboard Issues**:
- Contact Connor (Chief Architect)
- Report bugs or request features

**For Data Issues**:
- **Features**: Contact Ryan (CPO) or Product Team
- **JIRA Tickets**: Contact Engineering Team
- **Sales Opportunities**: Contact Steve (CEO) or Sales Team

**For Priority Disputes**:
- Discuss with cross-functional team (Sales, Product, Engineering)
- Escalate to leadership if needed

---

**Last Updated**: 2025-11-08
**Version**: 1.0
