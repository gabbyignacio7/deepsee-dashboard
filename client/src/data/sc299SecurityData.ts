export interface SecuritySubtask {
  id: string;
  title: string;
  status: string;
  assignee: string | null;
  vulnerabilityCount: number | null;
  priority: string;
}

export interface SC299SecurityData {
  lastUpdated: string;
  epicId: string;
  epicTitle: string;
  totalSubtasks: number;
  targetDate: string;
  statusNote: string;
  progress: {
    completedCount: number;
    inProgressCount: number;
    codeReviewCount: number;
    toDoAssignedCount: number;
    toDoUnassignedCount: number;
    percentComplete: number;
  };
  subtasks: SecuritySubtask[];
}

export const sc299SecurityData: SC299SecurityData = {
  lastUpdated: "January 5, 2026 4:00 AM MT",
  epicId: "SC-299",
  epicTitle: "Broadridge Security Remediation",
  totalSubtasks: 13,
  targetDate: "November 24, 2025",
  statusNote: "Behind schedule - 7 sub-tasks still in To Do (unassigned)",
  
  progress: {
    completedCount: 3,
    inProgressCount: 1,
    codeReviewCount: 2,
    toDoAssignedCount: 0,
    toDoUnassignedCount: 7,
    percentComplete: 23
  },
  
  subtasks: [
    {
      id: "SC-302",
      title: "Security Remediation Sub-task",
      status: "Done",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-308",
      title: "Security Remediation Sub-task",
      status: "Done",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-309",
      title: "Security Remediation Sub-task",
      status: "Done",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-304",
      title: "Address Kafka Vulnerabilities (60 C+H)",
      status: "In Progress",
      assignee: "Jeff Hegerhorst",
      vulnerabilityCount: 60,
      priority: "Critical"
    },
    {
      id: "SC-305",
      title: "Address NATS Vulnerabilities (26 C+H)",
      status: "Code Review",
      assignee: "Jeff Hegerhorst",
      vulnerabilityCount: 26,
      priority: "Critical"
    },
    {
      id: "SC-306",
      title: "Address Argo Events Vulnerabilities (22 C+H)",
      status: "Code Review",
      assignee: "Jeff Hegerhorst",
      vulnerabilityCount: 22,
      priority: "Critical"
    },
    {
      id: "SC-303",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-307",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-310",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-311",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-312",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-313",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    },
    {
      id: "SC-314",
      title: "Security Remediation Sub-task",
      status: "To Do",
      assignee: null,
      vulnerabilityCount: null,
      priority: "Critical"
    }
  ]
};
