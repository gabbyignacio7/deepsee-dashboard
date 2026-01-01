# DeepSee AI Priority Dashboard - Design Guidelines

## Design Approach

**Selected Framework**: Design System Approach using **Material Design** principles adapted for enterprise dashboards, with inspiration from **Carbon Design System** for data-heavy interfaces.

**Rationale**: This is a utility-focused, information-dense analytics dashboard where data clarity, scanability, and efficient decision-making are paramount. Visual consistency and established UI patterns will maximize usability across all five dashboard views.

## Core Design Principles

1. **Data-First Hierarchy**: Charts, tables, and KPIs are primary visual elements
2. **Scanability**: Users must quickly locate critical information (Tier 0 alerts, top priorities)
3. **Consistency**: All 5 dashboard views use identical component patterns
4. **Professional Restraint**: Clean, neutral aesthetic appropriate for executive review
5. **Responsive Density**: Information-rich on desktop, streamlined on mobile

## Typography

**Font Families**:
- Primary: Inter (via Google Fonts) - Body text, UI elements, tables
- Secondary: JetBrains Mono (via Google Fonts) - Numerical data, metrics, IDs

**Hierarchy**:
- **Dashboard Titles** (h1): 2xl, font-bold (Inter)
- **Section Headers** (h2): xl, font-semibold (Inter)
- **Card Titles** (h3): lg, font-medium (Inter)
- **KPI Values**: 3xl to 4xl, font-bold (JetBrains Mono)
- **KPI Labels**: sm, font-medium, uppercase, tracking-wide (Inter)
- **Body Text**: base, font-normal (Inter)
- **Table Headers**: sm, font-semibold, uppercase (Inter)
- **Table Data**: sm, font-normal (Inter)
- **Small Labels/Metadata**: xs, font-normal (Inter)

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16** exclusively
- Compact spacing: p-2, gap-2, m-2
- Standard spacing: p-4, gap-4, m-4
- Section spacing: p-6, gap-6, mb-8
- Large spacing: p-8, mt-12, mb-16

**Grid System**:
- Dashboard container: `max-w-7xl mx-auto px-4`
- KPI cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
- Two-column layouts: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- Charts: Full-width sections with `mb-8` separation

**Component Spacing**:
- Card padding: `p-6`
- Section margins: `mb-8` between major sections
- Table cell padding: `px-4 py-3`
- Button padding: `px-4 py-2` (medium), `px-6 py-3` (large)

## Component Library

### Navigation
- **Top Tab Bar**: Horizontal tabs with underline active state, icons + text labels
- Fixed position with subtle shadow
- Tab structure: Executive Summary | Sales Pipeline | Engineering | Product Roadmap

### Cards & Containers
- **KPI Cards**: Rounded corners (rounded-lg), subtle shadow, white background
- **Alert Cards**: Rounded corners, border-l-4 for severity indication
- **Data Cards**: Minimal borders (border), no heavy shadows, rounded-md

### Data Display

**Tables**:
- Zebra striping for row alternation
- Fixed header on scroll for long tables
- Sortable columns with arrow indicators
- Hover state on rows (cursor-pointer for clickable rows)
- Compact cell padding (px-4 py-3)
- Right-aligned numerical columns

**Charts** (Recharts):
- Bar Charts: Vertical orientation, generous spacing between bars
- Pie Charts: Labels outside with connecting lines, legend below
- Scatter Plot: Clear axis labels, gridlines, tooltip on hover
- Funnel Chart: Horizontal stages with value labels
- Consistent chart height: 300px for standard, 400px for featured charts

**KPI Metrics**:
- Large numerical value on top (3xl or 4xl)
- Small uppercase label below (xs, tracking-wide)
- Optional delta indicator with trend arrow
- Grid layout for multiple KPIs (2-4 columns)

**Badges/Tags**:
- Priority Tiers: Rounded-full with tier-specific styling, px-3 py-1, font-semibold, text-sm
- Status Badges: Rounded-md, px-2 py-1, text-xs, font-medium
- Use icons (from Lucide) alongside text where appropriate

### Forms & Filters

**Filter Panel**:
- Horizontal layout with dropdowns side-by-side
- Full-width on mobile (stacked)
- Label above dropdown (text-sm, font-medium)
- Dropdowns: Custom-styled select with chevron icon, rounded-md border

**Buttons**:
- Primary: Solid fill, rounded-md, px-4 py-2, font-medium
- Secondary: Border with transparent background, rounded-md
- Icon buttons: Square, p-2, rounded-md
- Export button: Icon + text, prominent placement (top-right)

### Interactive Elements

**Feature Cards** (Product Roadmap):
- Vertical card with tier-specific border-left accent (border-l-4)
- Title at top (font-semibold, text-base)
- Metadata grid: Client, Effort, ARR in compact rows
- Progress bar at bottom (thin, rounded-full)
- Hover: subtle shadow elevation, cursor-pointer

**Matrix Scatter Plot**:
- Clear quadrant labels in corners
- Bubble size represents Weighted ARR
- Hover tooltip with feature details
- Click to navigate to feature detail

**Back Button**:
- Arrow icon + "Back" text
- Positioned top-left of detail views
- Subtle styling (text-sm, font-medium)

## Page-Specific Guidelines

### Executive Summary
- 4-5 KPI cards in top row (grid-cols-4)
- Alert panel for Tier 0 features (prominent, full-width, red accent)
- Two-column chart section (grid-cols-2)
- Top 10 table below charts (full-width)

### Sales Pipeline
- Funnel chart as hero element (full-width, h-96)
- Stage cards in horizontal row (grid-cols-6, responsive)
- Feature mapping table (full-width, sortable)

### Engineering Capacity
- 4 capacity KPI cards (grid-cols-4)
- Blocked work alert (full-width, red accent)
- Two charts side-by-side (grid-cols-2): Pie + Bar

### Product Roadmap
- Scatter plot matrix (full-width, h-96, clear quadrants)
- Quarterly timeline with card grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Agent portfolio table (full-width)

### Feature Detail Page
- Header with large priority badge (left) and score (right)
- 2-column grid for metadata sections (grid-cols-2, responsive to grid-cols-1)
- Full-width tables for linked JIRA/opportunities
- Notes section at bottom (full-width)

## Accessibility

- Minimum touch target: 44x44px for all interactive elements
- Clear focus states with visible outline
- Color not sole indicator (use icons + text for status/priority)
- Adequate contrast ratios (WCAG AA minimum)
- Semantic HTML: proper heading hierarchy, table markup
- ARIA labels for icon-only buttons

## Images

**No images required** for this dashboard. This is a data-focused application where visual content is charts, tables, and metrics. All visual interest comes from data visualization and UI components.

## Critical Implementation Notes

- Maintain consistent spacing throughout (stick to 2, 4, 6, 8, 12, 16 unit system)
- All 5 dashboard views must use identical component styling for navigation, cards, tables, badges
- Priority tier colors are data-driven (Tier 0 = emergency accent, Tier 1 = warning accent, etc.) but NOT specified here
- Charts use Recharts library with consistent configuration (height, margins, tooltips)
- Tables must be responsive: horizontal scroll on mobile, full display on desktop
- Filter panel persists across view changes (sticky behavior)