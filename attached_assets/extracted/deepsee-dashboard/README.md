# DeepSee AI Product Management Priority Scoring Dashboard

A comprehensive, interactive web-based dashboard that consolidates features, JIRA tickets, and sales pipeline data into a unified priority scoring framework.

## 🎯 Purpose

This dashboard serves as the single source of truth for Sales, Product Management, and Engineering teams to align on feature prioritization using objective, data-driven metrics.

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useMemo)
- **Deployment**: Vercel

## 📊 Dashboard Views

### 1. Executive Summary Dashboard
**Primary Users**: Steve (CEO), Ryan (CPO), Ken (CFO)

**Features**:
- Hero KPIs: Total Pipeline ARR, Weighted ARR, Engineering Capacity, Feature Counts
- Priority Tier Distribution charts
- Revenue at Risk Alert Panel (Tier 0 features)
- Top 10 Features by Priority Score
- Interactive filters by Quarter, Tier, Status

### 2. Sales Pipeline Dashboard
**Primary Users**: Steve (CEO/Sales), Matt (BD), Armin (GTM)

**Features**:
- Sales Funnel visualization with Weighted ARR
- Opportunities by Stage breakdown
- Feature-to-Deal Mapping table
- Revenue forecast by quarter

### 3. Engineering Capacity Dashboard
**Primary Users**: Nick (CTO), Connor (Chief Architect), Engineering Team

**Features**:
- Capacity Utilization metrics (Total Backlog, In Progress, Not Started)
- Blocked Work Alert Panel
- Technical Debt vs Feature Work breakdown
- Story Points by Category analysis

### 4. Product Roadmap Dashboard
**Primary Users**: Ryan (CPO), Gabe (PM), Nadiya (PM), Delaney (PM)

**Features**:
- Replicability vs. Effort Matrix with quadrant analysis
  - 🎯 Quick Wins (High Replicability, Low Effort)
  - 🚀 Strategic Investments (High Replicability, High Effort)
  - ⚡ Fill-Ins (Low Replicability, Low Effort)
  - ⚠️ Avoid/Question (Low Replicability, High Effort)
- Quarterly Feature Roadmap timeline
- Agent Type Portfolio breakdown

### 5. Feature Detail Page
**Purpose**: Comprehensive drill-down view for any selected feature

**Features**:
- Feature header with Priority Tier and Score
- Financial Summary (ARR, Weighted ARR, Conversion Probability)
- Effort & Replicability metrics with progress bar
- Client & Agent Information
- Assignment & Ownership details
- Linked JIRA Tickets table
- Linked Sales Opportunities table
- Notes & Comments section

## 📈 Priority Scoring Formula

```
Priority Score = (ARR × Replicability × Conversion %) ÷ Effort
```

**Where**:
- **ARR**: Annual Recurring Revenue (positive or negative)
- **Replicability**: 1-5 scale (how many clients benefit)
- **Conversion %**: Likelihood the opportunity converts to revenue (0-100%)
- **Effort**: Engineering capacity required (in weeks)

## 🎨 Priority Tiers

- **Tier 0 (Emergency)**: Revenue at risk - RED (rgb(255, 0, 0))
- **Tier 1 (Fast Track)**: Score ≥100 - ORANGE (rgb(255, 165, 0))
- **Tier 2 (Standard Delivery)**: Score 50-99 - YELLOW (rgb(255, 255, 0))
- **Tier 3 (Custom Engagement)**: Score 10-49 - LIGHT BLUE (rgb(173, 216, 230))
- **Tier 4 (Backlog)**: Score <10 - GRAY (rgb(211, 211, 211))

## 🔗 Data Integration

The dashboard integrates three data sources:

1. **Features** (`/data/features.json`) - 47 product features
2. **JIRA Tickets** (`/data/jira.json`) - 198 engineering tickets
3. **Sales Pipeline** (`/data/sales.json`) - 16 sales opportunities

**Three-Way Mapping**:
- Features ↔ JIRA Tickets via `Mapped_Feature_ID`
- Features ↔ Sales Opportunities via `Mapped_Feature_IDs`

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📤 Export Functionality

Click the "Export Data" button on any view to download filtered data as CSV.

## 🎯 Key Features

✅ **Interactive Filtering**: Filter by Quarter, Priority Tier, Status, Client, Agent Type
✅ **Real-time Calculations**: Priority Scores, Weighted ARR, Capacity metrics
✅ **Drill-Down Navigation**: Click any feature to view comprehensive details
✅ **Color-Coded Tiers**: Visual priority identification
✅ **Revenue Alerts**: Prominent warnings for at-risk revenue
✅ **Three-Way Data Mapping**: Seamless linking between Features, JIRA, and Sales
✅ **Export to CSV**: Download filtered data
✅ **Responsive Design**: Works on desktop, tablet, and mobile

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 Updating Data

To update dashboard data:

1. Replace JSON files in `/public/data/`:
   - `features.json`
   - `jira.json`
   - `sales.json`

2. Ensure data structure matches existing format

3. Rebuild and redeploy:
```bash
npm run build
```

## 👥 User Roles

**Sales Team** (Steve, Matt, Armin):
- Use Sales Pipeline Dashboard
- Focus on revenue forecast and deal-feature mapping

**Product Team** (Ryan, Gabe, Nadiya, Delaney):
- Use Product Roadmap Dashboard
- Focus on replicability matrix and quarterly planning

**Engineering Team** (Nick, Connor):
- Use Engineering Capacity Dashboard
- Focus on workload distribution and blocked work

**Leadership** (Steve, Ryan, Ken):
- Use Executive Summary Dashboard
- Focus on high-level KPIs and top priorities

## 📄 License

Proprietary - DeepSee AI Internal Use Only

## 🤝 Support

For questions or issues, contact:
- **Product Management**: Ryan (CPO)
- **Engineering**: Connor (Chief Architect)
- **Sales**: Steve (CEO)

---

**Built with ❤️ for DeepSee AI**
