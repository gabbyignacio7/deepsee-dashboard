// Sprint Allocation Data - 2026-S3
// Last Updated: February 3, 2026 @ 3:00 PM MT
// Source: Browser Agent JIRA Extraction

export type CapacityStatus = 'green' | 'yellow' | 'red' | 'unassigned';

export interface EngineerAllocation {
  name: string;
  role: string;
  sprintTickets: number;
  sprintPoints: number | null;
  fullWorkload: number | null;
  delta: number | null;
  capacityStatus: CapacityStatus;
  statusBreakdown?: {
    done: number;
    inProgress: number;
    codeReview: number;
    toDo: number;
    blocked: number;
  };
}

export interface BlockedItem {
  key: string;
  summary: string;
  assignee: string;
  blockedSince: string;
}

export interface StaleItem {
  key: string;
  summary: string;
  assignee: string;
  lastUpdated: string;
  daysSinceUpdate: number;
}

export interface SprintOverview {
  sprint: string;
  startDate: string;
  endDate: string;
  asOf: string;
  totalTickets: number;
  completion: number;
  unassignedCount: number;
  missingEstimatesCount: number;
  statusBreakdown: {
    done: number;
    inProgress: number;
    codeReview: number;
    toDo: number;
    blocked: number;
    cancelled: number;
  };
}

export interface ArtemisProgress {
  epic: string;
  key: string;
  total: number;
  done: number;
  inProgress: number;
  toDo: number;
  percent: number;
}

export interface SprintAllocationData {
  overview: SprintOverview;
  engineers: EngineerAllocation[];
  alerts: {
    blocked: BlockedItem[];
    staleInProgress: StaleItem[];
    unassignedKeys: string[];
    missingEstimatesKeys: string[];
  };
  artemisProgress: ArtemisProgress[];
}

// ═══════════════════════════════════════════════════════════════
// SPRINT 2026-S1 DATA
// ═══════════════════════════════════════════════════════════════

export const sprint2026S1Data: SprintAllocationData = {
  overview: {
    sprint: "2026-S1",
    startDate: "2026-01-06",
    endDate: "2026-01-17",
    asOf: "2026-01-11T16:15:00-07:00",
    totalTickets: 49,
    completion: 33,
    unassignedCount: 11,
    missingEstimatesCount: 13,
    statusBreakdown: {
      done: 16,
      inProgress: 12,
      codeReview: 2,
      toDo: 17,
      blocked: 1,
      cancelled: 1
    }
  },
  engineers: [
    {
      name: "Lane Terry",
      role: "Lead Software Engineer",
      sprintTickets: 6,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green",
      statusBreakdown: { done: 5, inProgress: 1, codeReview: 0, toDo: 0, blocked: 0 }
    },
    {
      name: "Jeff Hegerhorst",
      role: "Principal DevOps Engineer",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Chad Hegerhorst",
      role: "Lead Software Engineer in Test",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Ivan Peev",
      role: "Senior Software Engineer",
      sprintTickets: 6,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "yellow",
      statusBreakdown: { done: 1, inProgress: 2, codeReview: 1, toDo: 2, blocked: 0 }
    },
    {
      name: "Darius Ouderkirk",
      role: "Principal Software Engineer",
      sprintTickets: 6,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "yellow",
      statusBreakdown: { done: 3, inProgress: 2, codeReview: 0, toDo: 1, blocked: 0 }
    },
    {
      name: "Kannal Mutharasu",
      role: "Software Engineer",
      sprintTickets: 5,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green",
      statusBreakdown: { done: 3, inProgress: 1, codeReview: 1, toDo: 0, blocked: 0 }
    },
    {
      name: "Kalvin Willison",
      role: "Junior Software Engineer",
      sprintTickets: 3,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green",
      statusBreakdown: { done: 1, inProgress: 2, codeReview: 0, toDo: 0, blocked: 0 }
    },
    {
      name: "Aleksander Winski",
      role: "Senior Software Engineer",
      sprintTickets: 3,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green",
      statusBreakdown: { done: 2, inProgress: 1, codeReview: 0, toDo: 0, blocked: 0 }
    },
    {
      name: "Owen Riley",
      role: "Staff Frontend Engineer",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Matt Snow",
      role: "Senior Frontend Engineer",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Treven Trujillo",
      role: "Software Engineer",
      sprintTickets: 3,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green",
      statusBreakdown: { done: 1, inProgress: 1, codeReview: 0, toDo: 0, blocked: 0 }
    },
    {
      name: "Konnor Willison",
      role: "Chief Architect",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Loris D'Acunto",
      role: "Chief Data Scientist",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    },
    {
      name: "Karolina Toman",
      role: "Director Forward Deployed Engineering",
      sprintTickets: 0,
      sprintPoints: null,
      fullWorkload: null,
      delta: null,
      capacityStatus: "green"
    }
  ],
  alerts: {
    blocked: [
      {
        key: "BACK-1489",
        summary: "Update classification-api Base Image to Ubuntu...",
        assignee: "Unassigned",
        blockedSince: "2020-11-12"
      }
    ],
    staleInProgress: [
      {
        key: "BACK-1532",
        summary: "Fine-tune Mercury Extraction for Sunwest Bank",
        assignee: "Konnor Willison",
        lastUpdated: "2025-11-20",
        daysSinceUpdate: 52
      }
    ],
    unassignedKeys: [
      "BACK-1721", "BACK-1715", "BACK-1663", "BACK-1661",
      "BACK-1659", "BACK-1658", "BACK-1657", "BACK-1653",
      "BACK-1649", "BACK-1489", "BACK-1427"
    ],
    missingEstimatesKeys: [
      "BACK-1674", "BACK-1669", "BACK-1663", "BACK-1661",
      "BACK-1659", "BACK-1658", "BACK-1655", "BACK-1642",
      "BACK-1608", "BACK-1532", "BACK-1530", "BACK-1529", "BACK-1528"
    ]
  },
  artemisProgress: [
    {
      epic: "Platform Infrastructure",
      key: "BACK-1680",
      total: 23,
      done: 0,
      inProgress: 0,
      toDo: 23,
      percent: 0
    },
    {
      epic: "Fabric Integration",
      key: "BACK-1704",
      total: 8,
      done: 0,
      inProgress: 0,
      toDo: 8,
      percent: 0
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getCurrentSprintData = (): SprintAllocationData => {
  return sprint2026S1Data;
};

export const getActiveEngineers = (): EngineerAllocation[] => {
  return sprint2026S1Data.engineers.filter(e => e.sprintTickets > 0);
};

export const getInactiveEngineers = (): EngineerAllocation[] => {
  return sprint2026S1Data.engineers.filter(e => e.sprintTickets === 0);
};

export const getEngineersByCapacity = (status: CapacityStatus): EngineerAllocation[] => {
  return sprint2026S1Data.engineers.filter(e => e.capacityStatus === status);
};

export const getTotalAssignedTickets = (): number => {
  return sprint2026S1Data.engineers.reduce((sum, e) => sum + e.sprintTickets, 0);
};

export const getAlertCount = (): number => {
  const { alerts } = sprint2026S1Data;
  return alerts.blocked.length +
         alerts.staleInProgress.length +
         alerts.unassignedKeys.length;
};

export const getSprintHealthScore = (): 'good' | 'warning' | 'critical' => {
  const { overview, alerts } = sprint2026S1Data;
  const unassignedPercent = (overview.unassignedCount / overview.totalTickets) * 100;
  const blockedCount = alerts.blocked.length;
  const staleCount = alerts.staleInProgress.length;

  if (blockedCount > 2 || unassignedPercent > 30 || staleCount > 3) return 'critical';
  if (blockedCount > 0 || unassignedPercent > 15 || staleCount > 1) return 'warning';
  return 'good';
};
