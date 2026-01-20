import RoadmapTimeline from '@/components/RoadmapTimeline';
import DataFreshness from '@/components/DataFreshness';

/**
 * Product Roadmap Quarterly Timeline Page
 *
 * Board Meeting Preparation - First Week of February 2026
 *
 * Features:
 * - Q1-Q3 2026 Timeline View with visual quarter columns
 * - Auto-calculates feature placement based on velocity and story points
 * - Milestones row showing key product capability targets
 * - Velocity slider for scenario modeling (60-120 pts/sprint)
 * - Feature cards with JIRA links, progress indicators, and category badges
 * - Capacity utilization warnings per quarter
 */
export default function RoadmapPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-[1600px]">
      {/* Header with Data Freshness */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight" data-testid="heading-roadmap">
            Product Roadmap
          </h1>
          <p className="text-muted-foreground">
            Board Meeting Preparation • Q1-Q3 2026
          </p>
        </div>
        <DataFreshness />
      </div>

      {/* Roadmap Timeline Component */}
      <RoadmapTimeline />
    </div>
  );
}
