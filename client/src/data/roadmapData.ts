// Roadmap Data - Updated January 20, 2026
// Source: JIRA Epics + PRDs + Ryan's milestone definitions
// Auto-calculates quarter placement based on velocity

export const ROADMAP_CONFIG = {
  lastUpdated: "2026-01-20T13:00:00-07:00",
  averageVelocity: 80, // story points per sprint
  sprintDurationWeeks: 2,
  currentSprint: "2026-S2",
  currentSprintEnd: "2026-01-30",
};

// Quarter definitions for 2026
export interface Quarter {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sprints: string[];
  totalCapacity: number;
  color: string;
}

export const QUARTERS: Quarter[] = [
  {
    id: "Q1-2026",
    name: "Q1 2026",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    sprints: ["S1", "S2", "S3", "S4", "S5", "S6"],
    totalCapacity: 480, // 6 sprints x 80 pts
    color: "#3B82F6", // blue
  },
  {
    id: "Q2-2026",
    name: "Q2 2026",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    sprints: ["S7", "S8", "S9", "S10", "S11", "S12"],
    totalCapacity: 480,
    color: "#8B5CF6", // purple
  },
  {
    id: "Q3-2026",
    name: "Q3 2026",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    sprints: ["S13", "S14", "S15", "S16", "S17", "S18"],
    totalCapacity: 480,
    color: "#10B981", // green
  },
];

// Product capability milestones (business outcomes, not just features)
export interface Milestone {
  id: string;
  name: string;
  description: string;
  targetQuarter: string;
  dependencies: string[]; // feature IDs required
  completionPercentage: number;
  icon: string;
  businessValue: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "M1",
    name: "End-to-End Email Processing",
    description: "Complete pattern: receive -> categorize -> extract -> send to system -> respond",
    targetQuarter: "Q1-2026",
    dependencies: ["F1", "F2", "F3", "F4"],
    completionPercentage: 30,
    icon: "mail",
    businessValue: "Enables full email automation for DTCC, Accenture, Broadridge",
  },
  {
    id: "M2",
    name: "DeepIQ v1.0",
    description: "First production-ready intelligent query system with context awareness",
    targetQuarter: "Q1-2026",
    dependencies: ["F5", "F6"],
    completionPercentage: 15,
    icon: "brain",
    businessValue: "Natural language queries across client data",
  },
  {
    id: "M3",
    name: "DeepGraph Basic Context",
    description: "First basic context graph for relationship mapping",
    targetQuarter: "Q2-2026",
    dependencies: ["F7", "F8"],
    completionPercentage: 0,
    icon: "network",
    businessValue: "Entity relationship visualization for compliance",
  },
  {
    id: "M4",
    name: "ARTEMIS Platform 70%",
    description: "Core platform infrastructure enabling all agent capabilities",
    targetQuarter: "Q1-2026",
    dependencies: ["F1", "F2", "F5", "F9", "F10"],
    completionPercentage: 21,
    icon: "layers",
    businessValue: "Foundation for all product capabilities",
  },
  {
    id: "M5",
    name: "ARTEMIS Platform 100%",
    description: "Complete ARTEMIS platform with all 8 layers",
    targetQuarter: "Q2-2026",
    dependencies: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    completionPercentage: 21,
    icon: "target",
    businessValue: "Full platform capability for enterprise scale",
  },
];

// Features/Epics with story points and JIRA links
export interface QuarterAllocation {
  quarter: string;
  allocatedPoints: number;
  percentageOfFeature: number;
}

export interface RoadmapFeature {
  id: string;
  name: string;
  category: "Platform" | "Automation" | "Intelligence" | "Integration" | "Client";
  totalStoryPoints: number;
  completedStoryPoints: number;
  remainingStoryPoints: number;
  priority: number; // 1 = highest
  jiraEpicKey?: string;
  jiraEpicUrl?: string;
  prdLink?: string;
  quarters: QuarterAllocation[];
  status: "Not Started" | "In Progress" | "Complete";
  color: string;
}

export const ROADMAP_FEATURES: RoadmapFeature[] = [
  // ARTEMIS Platform Features
  {
    id: "F1",
    name: "Mercury Extraction",
    category: "Platform",
    totalStoryPoints: 89,
    completedStoryPoints: 0,
    remainingStoryPoints: 89,
    priority: 1,
    jiraEpicKey: "BACK-1650",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1650",
    prdLink: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823782401/Mercury+Extraction+PRD",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 89, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#3B82F6",
  },
  {
    id: "F2",
    name: "Document Parser",
    category: "Platform",
    totalStoryPoints: 76,
    completedStoryPoints: 0,
    remainingStoryPoints: 76,
    priority: 2,
    jiraEpicKey: "BACK-1656",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1656",
    prdLink: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823782402/Document+Parser+PRD",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 76, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#8B5CF6",
  },
  {
    id: "F3",
    name: "Document Classifier",
    category: "Intelligence",
    totalStoryPoints: 45,
    completedStoryPoints: 0,
    remainingStoryPoints: 45,
    priority: 3,
    jiraEpicKey: "BACK-1658",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1658",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 45, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#10B981",
  },
  {
    id: "F4",
    name: "Response Generator",
    category: "Automation",
    totalStoryPoints: 55,
    completedStoryPoints: 0,
    remainingStoryPoints: 55,
    priority: 4,
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 35, percentageOfFeature: 64 },
      { quarter: "Q2-2026", allocatedPoints: 20, percentageOfFeature: 36 },
    ],
    status: "Not Started",
    color: "#F59E0B",
  },
  {
    id: "F5",
    name: "DeepIQ Query Engine",
    category: "Intelligence",
    totalStoryPoints: 120,
    completedStoryPoints: 18,
    remainingStoryPoints: 102,
    priority: 5,
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 60, percentageOfFeature: 50 },
      { quarter: "Q2-2026", allocatedPoints: 60, percentageOfFeature: 50 },
    ],
    status: "In Progress",
    color: "#EF4444",
  },
  {
    id: "F6",
    name: "Context Memory System",
    category: "Intelligence",
    totalStoryPoints: 80,
    completedStoryPoints: 0,
    remainingStoryPoints: 80,
    priority: 6,
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 40, percentageOfFeature: 50 },
      { quarter: "Q2-2026", allocatedPoints: 40, percentageOfFeature: 50 },
    ],
    status: "Not Started",
    color: "#EC4899",
  },
  {
    id: "F7",
    name: "DeepGraph Knowledge Base",
    category: "Intelligence",
    totalStoryPoints: 150,
    completedStoryPoints: 0,
    remainingStoryPoints: 150,
    priority: 7,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 100, percentageOfFeature: 67 },
      { quarter: "Q3-2026", allocatedPoints: 50, percentageOfFeature: 33 },
    ],
    status: "Not Started",
    color: "#6366F1",
  },
  {
    id: "F8",
    name: "Entity Resolution Engine",
    category: "Intelligence",
    totalStoryPoints: 90,
    completedStoryPoints: 0,
    remainingStoryPoints: 90,
    priority: 8,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 90, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#14B8A6",
  },
  {
    id: "F9",
    name: "DTCC Scalability",
    category: "Client",
    totalStoryPoints: 65,
    completedStoryPoints: 0,
    remainingStoryPoints: 65,
    priority: 9,
    jiraEpicKey: "BACK-1232",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1232",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 65, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#F97316",
  },
  {
    id: "F10",
    name: "UI Dashboard Improvements",
    category: "Platform",
    totalStoryPoints: 40,
    completedStoryPoints: 12,
    remainingStoryPoints: 28,
    priority: 10,
    jiraEpicKey: "UI-694",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/UI-694",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 40, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#84CC16",
  },
  {
    id: "F11",
    name: "Multi-Tenant Architecture",
    category: "Platform",
    totalStoryPoints: 100,
    completedStoryPoints: 0,
    remainingStoryPoints: 100,
    priority: 11,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 60, percentageOfFeature: 60 },
      { quarter: "Q3-2026", allocatedPoints: 40, percentageOfFeature: 40 },
    ],
    status: "Not Started",
    color: "#0EA5E9",
  },
  {
    id: "F12",
    name: "Advanced Analytics Dashboard",
    category: "Platform",
    totalStoryPoints: 70,
    completedStoryPoints: 0,
    remainingStoryPoints: 70,
    priority: 12,
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 70, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#A855F7",
  },
];

// Helper functions
export const calculateQuarterLoad = (quarterId: string): number => {
  return ROADMAP_FEATURES.reduce((total, feature) => {
    const quarterAlloc = feature.quarters.find(q => q.quarter === quarterId);
    return total + (quarterAlloc?.allocatedPoints || 0);
  }, 0);
};

export const calculateQuarterCapacity = (quarterId: string, velocity: number = ROADMAP_CONFIG.averageVelocity): number => {
  const quarter = QUARTERS.find(q => q.id === quarterId);
  return quarter ? quarter.sprints.length * velocity : 0;
};

export const calculateQuarterUtilization = (quarterId: string, velocity: number = ROADMAP_CONFIG.averageVelocity): number => {
  const load = calculateQuarterLoad(quarterId);
  const capacity = calculateQuarterCapacity(quarterId, velocity);
  return capacity > 0 ? Math.round((load / capacity) * 100) : 0;
};

export const getMilestoneProgress = (milestoneId: string): number => {
  const milestone = MILESTONES.find(m => m.id === milestoneId);
  if (!milestone) return 0;

  const dependencyFeatures = ROADMAP_FEATURES.filter(f =>
    milestone.dependencies.includes(f.id)
  );

  const totalPoints = dependencyFeatures.reduce((sum, f) => sum + f.totalStoryPoints, 0);
  const completedPoints = dependencyFeatures.reduce((sum, f) => sum + f.completedStoryPoints, 0);

  return totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
};

export const getFeaturesByQuarter = (quarterId: string): RoadmapFeature[] => {
  return ROADMAP_FEATURES.filter(f =>
    f.quarters.some(q => q.quarter === quarterId)
  ).sort((a, b) => a.priority - b.priority);
};

export const estimateCompletionQuarter = (feature: RoadmapFeature, velocity: number = 80): string => {
  const sprintsNeeded = Math.ceil(feature.remainingStoryPoints / velocity);
  const weeksNeeded = sprintsNeeded * 2;
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (weeksNeeded * 7));

  const month = completionDate.getMonth();
  const year = completionDate.getFullYear();

  if (month < 3) return `Q1-${year}`;
  if (month < 6) return `Q2-${year}`;
  if (month < 9) return `Q3-${year}`;
  return `Q4-${year}`;
};

// Summary statistics
export const getRoadmapSummary = (velocity: number = ROADMAP_CONFIG.averageVelocity) => ({
  totalFeatures: ROADMAP_FEATURES.length,
  totalStoryPoints: ROADMAP_FEATURES.reduce((sum, f) => sum + f.totalStoryPoints, 0),
  completedStoryPoints: ROADMAP_FEATURES.reduce((sum, f) => sum + f.completedStoryPoints, 0),
  remainingStoryPoints: ROADMAP_FEATURES.reduce((sum, f) => sum + f.remainingStoryPoints, 0),
  totalMilestones: MILESTONES.length,
  q1Load: calculateQuarterLoad("Q1-2026"),
  q2Load: calculateQuarterLoad("Q2-2026"),
  q3Load: calculateQuarterLoad("Q3-2026"),
  q1Utilization: calculateQuarterUtilization("Q1-2026", velocity),
  q2Utilization: calculateQuarterUtilization("Q2-2026", velocity),
  q3Utilization: calculateQuarterUtilization("Q3-2026", velocity),
});

export const ROADMAP_SUMMARY = getRoadmapSummary();
