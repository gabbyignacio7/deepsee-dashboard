// Roadmap Data - Updated February 3, 2026
// Source: JIRA Epics + PRDs + Ryan's milestone definitions
// Auto-calculates quarter placement based on velocity
// Board Meeting Preparation Update - Added descriptions and Q4 2026

export const ROADMAP_CONFIG = {
  lastUpdated: "2026-02-06T14:22:00-07:00",
  averageVelocity: 80, // story points per sprint
  sprintDurationWeeks: 2,
  currentSprint: "2026-S3",
  currentSprintEnd: "2026-02-13",
};

// Quarter definitions for 2026
export interface Quarter {
  id: string;
  name: string;
  version?: string;
  startDate: string;
  endDate: string;
  sprints: string[];
  totalCapacity: number;
  color: string;
  isPlanned?: boolean; // For Q4 2026 which is projected/not committed
}

export const QUARTERS: Quarter[] = [
  {
    id: "Q1-2026",
    name: "Q1 2026",
    version: "V3.0 – Snow Canyon",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    sprints: ["S1", "S2", "S3", "S4", "S5", "S6"],
    totalCapacity: 480, // 6 sprints x 80 pts
    color: "#3B82F6", // blue
  },
  {
    id: "Q2-2026",
    name: "Q2 2026",
    version: "V3.2 – Snow Canyon",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    sprints: ["S7", "S8", "S9", "S10", "S11", "S12"],
    totalCapacity: 480,
    color: "#8B5CF6", // purple
  },
  {
    id: "Q3-2026",
    name: "Q3 2026",
    version: "V3.5 – Snow Canyon",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    sprints: ["S13", "S14", "S15", "S16", "S17", "S18"],
    totalCapacity: 480,
    color: "#10B981", // green
  },
  {
    id: "Q4-2026",
    name: "Q4 2026",
    version: "V4.0 – TBD",
    startDate: "2026-10-01",
    endDate: "2026-12-31",
    sprints: ["S19", "S20", "S21", "S22", "S23", "S24"],
    totalCapacity: 480,
    color: "#F97316", // orange
    isPlanned: true, // Indicates this is projected/not committed
  },
];

// Product capability milestones (business outcomes, not just features)
export interface Milestone {
  id: string;
  name: string;
  description: string;
  targetQuarter: string;
  dependencies: string[]; // feature IDs required
  /** @deprecated Use getMilestoneProgress(milestoneId) instead. This static value is not maintained. */
  completionPercentage: number;
  icon: string;
  businessValue: string;
}

// Detail view types for milestone completeness breakdown
export interface MilestoneFeatureDetail {
  id: string;
  name: string;
  status: string;
  category: string;
  totalStoryPoints: number;
  completedStoryPoints: number;
  remainingStoryPoints: number;
  jiraEpicKey: string | null;
  jiraEpicUrl: string | null;
  completionPercentage: number;
}

export interface MilestoneDetails {
  milestoneId: string;
  milestoneName: string;
  description: string;
  targetQuarter: string;
  businessValue: string;
  features: MilestoneFeatureDetail[];
  summary: {
    totalFeatures: number;
    totalStoryPoints: number;
    completedStoryPoints: number;
    remainingStoryPoints: number;
    overallCompletionPercentage: number;
  };
  missingDependencyIds: string[];
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
  {
    id: "M6",
    name: "Enterprise Ready v4.0",
    description: "Full enterprise deployment capabilities with SSO, compliance, and self-service",
    targetQuarter: "Q4-2026",
    dependencies: ["F13", "F14", "F15", "F16", "F17", "F18"],
    completionPercentage: 0,
    icon: "shield",
    businessValue: "Enterprise-grade deployment for large bank clients",
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
  description: string; // Human-readable description for board meeting
  category: "Platform" | "Automation" | "Intelligence" | "Integration" | "Client" | "Capability" | "Dashboard" | "UX";
  totalStoryPoints: number;
  completedStoryPoints: number;
  remainingStoryPoints: number;
  priority: number; // 1 = highest
  jiraEpicKey?: string;
  jiraEpicUrl?: string;
  prdLink?: string;
  prdStatus?: "active" | "pending" | "none"; // For link validation visual indicators
  quarters: QuarterAllocation[];
  status: "Not Started" | "In Progress" | "Complete" | "Planned";
  color: string;
  isPlanned?: boolean; // For Q4 2026 items
}

// PRD Index fallback URL - Use when no specific PRD exists
const PRD_INDEX_URL = "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2813558785/Product+Requirements+Documents+PRDs";

// Valid PRD URLs extracted from Confluence - February 3, 2026
export const PRD_URLS = {
  mercury: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289", // Mercury Extraction
  mercuryUnified: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815885318", // Mercury Extraction: Unified Service
  agentReasoning: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814803970", // Enhanced Agent Outcome Reasoning and Planning (Working)
  agentReasoningCompleted: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2816147457", // Enhanced Outcome Reasoning (Completed)
  documentClassifierColony: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865", // Document Classifier - Colony/Broadridge
  documentClassifierLoan: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815590401", // Document Classifier - Loan/SEC
  clientInteraction: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2816049153", // Enhancing Client Agent Interaction
  emailAutomation: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815852545", // Email Automation Workflow
  sevenCategories: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815721476", // Seven Categories (DeepGraph, Service Fabric, etc.)
  fabric: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815721483", // DeepSee Fabric
  browserControl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815983617", // Browser Control Agent
  workItemExcel: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2816180227", // Work Item Excel Output
  platform: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948", // Platform PRD
  blueprint: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710", // Blue Print PRD
  epaResolution: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553", // EPA Automated Resolution
  agenticEngine: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824372269", // Agentic Engine
  workItemIngestion: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2828926977", // Work Item Ingestion
  automationOrchestration: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823913475", // Automation and Orchestration
  artemis: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824044546", // Project ARTEMIS PRD
  prdIndex: PRD_INDEX_URL,
} as const;

export const ROADMAP_FEATURES: RoadmapFeature[] = [
  // ========== Q1 2026 Features (V3.0 – Snow Canyon) ==========
  {
    id: "F1",
    name: "Mercury Extraction Enhancements",
    description: "Improvements to the Mercury document extraction service for better handling of complex multi-page financial documents.",
    category: "Platform",
    totalStoryPoints: 89,
    completedStoryPoints: 51,
    remainingStoryPoints: 38,
    priority: 1,
    jiraEpicKey: "BACK-1650",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1650",
    prdLink: PRD_URLS.mercury,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 89, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#3B82F6",
  },
  {
    id: "F2",
    name: "Document Classifier & Parser",
    description: "Agent that identifies document types within mixed packets (loan docs, compliance forms, trade confirms) and routes them to specialized extraction models.",
    category: "Platform",
    totalStoryPoints: 76,
    completedStoryPoints: 0,
    remainingStoryPoints: 76,
    priority: 2,
    jiraEpicKey: "BACK-1656",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1656",
    prdLink: PRD_URLS.documentClassifierColony,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 76, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#8B5CF6",
  },
  {
    id: "F3",
    name: "Response Generator",
    description: "Automated email response drafting agent that generates contextually appropriate replies to client inquiries based on extracted data and business rules.",
    category: "Automation",
    totalStoryPoints: 55,
    completedStoryPoints: 0,
    remainingStoryPoints: 55,
    priority: 3,
    jiraEpicKey: "BACK-1666",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1666",
    prdLink: PRD_URLS.emailAutomation,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 35, percentageOfFeature: 64 },
      { quarter: "Q2-2026", allocatedPoints: 20, percentageOfFeature: 36 },
    ],
    status: "Not Started",
    color: "#F59E0B",
  },
  {
    id: "F4",
    name: "Email Process Automation",
    description: "End-to-end automation of email-triggered workflows including intake, classification, extraction, routing, and response generation.",
    category: "Automation",
    totalStoryPoints: 65,
    completedStoryPoints: 38,
    remainingStoryPoints: 27,
    priority: 4,
    prdLink: PRD_URLS.emailAutomation,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 65, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#10B981",
  },
  {
    id: "F5",
    name: "Information Graph Enhanced Infrastructure",
    description: "Build the knowledge graph backend that maps relationships across financial entities, counterparties, accounts, and instruments.",
    category: "Intelligence",
    totalStoryPoints: 120,
    completedStoryPoints: 20,
    remainingStoryPoints: 100,
    priority: 5,
    prdLink: PRD_URLS.sevenCategories,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 60, percentageOfFeature: 50 },
      { quarter: "Q2-2026", allocatedPoints: 60, percentageOfFeature: 50 },
    ],
    status: "In Progress",
    color: "#EF4444",
  },
  {
    id: "F6",
    name: "Enhanced Agent Outcome Reasoning and Planning",
    description: "Improve agent decision-making with multi-step reasoning, outcome prediction, and explainable AI for audit trails.",
    category: "Intelligence",
    totalStoryPoints: 80,
    completedStoryPoints: 0,
    remainingStoryPoints: 80,
    priority: 6,
    jiraEpicKey: "BACK-1602",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/BACK-1602",
    prdLink: PRD_URLS.agentReasoningCompleted,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 40, percentageOfFeature: 50 },
      { quarter: "Q2-2026", allocatedPoints: 40, percentageOfFeature: 50 },
    ],
    status: "Not Started",
    color: "#EC4899",
  },
  {
    id: "F7",
    name: "SSI Validation Agent",
    description: "Standing Settlement Instructions validation agent that cross-references SSI data against reference databases to catch errors before settlement.",
    category: "Automation",
    totalStoryPoints: 45,
    completedStoryPoints: 0,
    remainingStoryPoints: 45,
    priority: 7,
    prdLink: PRD_URLS.blueprint,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 45, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#6366F1",
  },
  {
    id: "F8",
    name: "Trade Reconciliation Enhancements",
    description: "Improvements to the DeepRecon trade reconciliation agent for faster break detection and automated resolution suggestions.",
    category: "Automation",
    totalStoryPoints: 50,
    completedStoryPoints: 0,
    remainingStoryPoints: 50,
    priority: 8,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 50, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#14B8A6",
  },
  {
    id: "F9",
    name: "Inference / Training Speed Improvements",
    description: "Optimize model inference latency and training pipeline throughput to reduce processing time for high-volume clients.",
    category: "Platform",
    totalStoryPoints: 40,
    completedStoryPoints: 0,
    remainingStoryPoints: 40,
    priority: 9,
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 40, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#F97316",
  },
  {
    id: "F10",
    name: "Activity Tracing Across Agents",
    description: "End-to-end traceability showing how data flows across multiple agents, enabling compliance teams to audit the full decision chain.",
    category: "Platform",
    totalStoryPoints: 35,
    completedStoryPoints: 0,
    remainingStoryPoints: 35,
    priority: 10,
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 35, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#84CC16",
  },
  {
    id: "F11",
    name: "Exception Prediction",
    description: "Predictive analytics identifying likely processing exceptions before they occur, enabling proactive resolution.",
    category: "Intelligence",
    totalStoryPoints: 55,
    completedStoryPoints: 0,
    remainingStoryPoints: 55,
    priority: 11,
    prdLink: PRD_URLS.epaResolution,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 55, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#0EA5E9",
  },
  {
    id: "F12",
    name: "Simplified Agentic UI Implementation",
    description: "Engineering implementation of the simplified UI design from Q4 2025, deploying the new interface to production.",
    category: "UX",
    totalStoryPoints: 60,
    completedStoryPoints: 0,
    remainingStoryPoints: 60,
    priority: 12,
    jiraEpicKey: "UI-694",
    jiraEpicUrl: "https://deepsee.atlassian.net/browse/UI-694",
    prdLink: PRD_URLS.platform,
    prdStatus: "active",
    quarters: [
      { quarter: "Q1-2026", allocatedPoints: 60, percentageOfFeature: 100 },
    ],
    status: "In Progress",
    color: "#A855F7",
  },

  // ========== Q2 2026 Features (V3.2 – Snow Canyon) ==========
  {
    id: "F20",
    name: "MCP Integration with 3rd Party Agents",
    description: "Integration with Microsoft Copilot Protocol enabling DeepSee agents to interoperate with third-party AI agents in the Azure ecosystem.",
    category: "Integration",
    totalStoryPoints: 80,
    completedStoryPoints: 0,
    remainingStoryPoints: 80,
    priority: 13,
    prdLink: PRD_URLS.fabric,
    prdStatus: "active",
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 80, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#3B82F6",
  },
  {
    id: "F21",
    name: "Enhanced Integration with 3rd Party Applications",
    description: "Native integrations with Microsoft Outlook and operations console tools for seamless agent access within existing banking workflows.",
    category: "Integration",
    totalStoryPoints: 70,
    completedStoryPoints: 0,
    remainingStoryPoints: 70,
    priority: 14,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 70, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#8B5CF6",
  },
  {
    id: "F22",
    name: "User Configurable Dashboards",
    description: "Enable end-users to customize their dashboard layouts, widgets, and data views without engineering intervention.",
    category: "Dashboard",
    totalStoryPoints: 50,
    completedStoryPoints: 0,
    remainingStoryPoints: 50,
    priority: 15,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 50, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#10B981",
  },
  {
    id: "F23",
    name: "Process Mapping and Optimization",
    description: "Analytics showing process bottlenecks and optimization recommendations based on agent activity data across workflows.",
    category: "Intelligence",
    totalStoryPoints: 65,
    completedStoryPoints: 0,
    remainingStoryPoints: 65,
    priority: 16,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 65, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#F59E0B",
  },
  {
    id: "F24",
    name: "Information Graph UI Implementation",
    description: "Engineering build of the knowledge graph visualization interface designed in Q1.",
    category: "Dashboard",
    totalStoryPoints: 75,
    completedStoryPoints: 0,
    remainingStoryPoints: 75,
    priority: 17,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 75, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#EF4444",
  },
  {
    id: "F25",
    name: "Technologist and Model Review UI",
    description: "Interface for model governance teams to review, validate, and approve AI agent configurations and outputs.",
    category: "Dashboard",
    totalStoryPoints: 45,
    completedStoryPoints: 0,
    remainingStoryPoints: 45,
    priority: 18,
    quarters: [
      { quarter: "Q2-2026", allocatedPoints: 45, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#EC4899",
  },

  // ========== Q3 2026 Features (V3.5 – Snow Canyon) ==========
  {
    id: "F30",
    name: "DeepSee Service Fabric External Enhancements",
    description: "Extend the platform's service fabric to support external partner integrations (Broadridge, Accenture) with secure multi-tenant communication.",
    category: "Platform",
    totalStoryPoints: 100,
    completedStoryPoints: 0,
    remainingStoryPoints: 100,
    priority: 19,
    prdLink: PRD_URLS.fabric,
    prdStatus: "active",
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 100, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#6366F1",
  },
  {
    id: "F31",
    name: "Integrated Foreign Language Support",
    description: "Multi-language processing enabling agents to handle documents and communications in non-English languages for global banking clients.",
    category: "Platform",
    totalStoryPoints: 80,
    completedStoryPoints: 0,
    remainingStoryPoints: 80,
    priority: 20,
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 80, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#14B8A6",
  },
  {
    id: "F32",
    name: "Process Variation Highlights",
    description: "Automated detection and flagging of process deviations from standard workflows, supporting compliance monitoring and quality assurance.",
    category: "Intelligence",
    totalStoryPoints: 55,
    completedStoryPoints: 0,
    remainingStoryPoints: 55,
    priority: 21,
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 55, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#F97316",
  },
  {
    id: "F33",
    name: "Agentic Card UI for 3rd Party Applications",
    description: "Embeddable agent interface cards that can be deployed within third-party banking applications.",
    category: "UX",
    totalStoryPoints: 60,
    completedStoryPoints: 0,
    remainingStoryPoints: 60,
    priority: 22,
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 60, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#84CC16",
  },
  {
    id: "F34",
    name: "Enhanced Testing Suite UI",
    description: "Comprehensive testing framework interface for validating agent configurations, regression testing, and model performance benchmarking.",
    category: "Dashboard",
    totalStoryPoints: 70,
    completedStoryPoints: 0,
    remainingStoryPoints: 70,
    priority: 23,
    quarters: [
      { quarter: "Q3-2026", allocatedPoints: 70, percentageOfFeature: 100 },
    ],
    status: "Not Started",
    color: "#0EA5E9",
  },

  // ========== Q4 2026 Features (V4.0 – TBD) - PLANNED ==========
  {
    id: "F40",
    name: "Advanced Compliance Automation",
    description: "Automated regulatory reporting and compliance monitoring agents for HMDA, CRA, SEC filing requirements.",
    category: "Capability",
    totalStoryPoints: 120,
    completedStoryPoints: 0,
    remainingStoryPoints: 120,
    priority: 24,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 120, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#3B82F6",
    isPlanned: true,
  },
  {
    id: "F41",
    name: "Multi-Agent Orchestration v2",
    description: "Next-generation agent coordination enabling complex multi-step workflows across 5+ agents with conditional branching.",
    category: "Capability",
    totalStoryPoints: 100,
    completedStoryPoints: 0,
    remainingStoryPoints: 100,
    priority: 25,
    prdLink: PRD_URLS.automationOrchestration,
    prdStatus: "active",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 100, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#8B5CF6",
    isPlanned: true,
  },
  {
    id: "F42",
    name: "Client Self-Service Portal",
    description: "Self-service portal for clients to configure agent parameters, view analytics, and manage their DeepSee deployment.",
    category: "Dashboard",
    totalStoryPoints: 90,
    completedStoryPoints: 0,
    remainingStoryPoints: 90,
    priority: 26,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 90, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#10B981",
    isPlanned: true,
  },
  {
    id: "F43",
    name: "Real-Time Processing Pipeline",
    description: "Shift from batch to real-time document processing for time-sensitive trading and settlement operations.",
    category: "Capability",
    totalStoryPoints: 110,
    completedStoryPoints: 0,
    remainingStoryPoints: 110,
    priority: 27,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 110, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#F59E0B",
    isPlanned: true,
  },
  {
    id: "F44",
    name: "Enterprise SSO & RBAC",
    description: "Enterprise single sign-on integration and role-based access controls for large bank deployments.",
    category: "Platform",
    totalStoryPoints: 75,
    completedStoryPoints: 0,
    remainingStoryPoints: 75,
    priority: 28,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 75, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#EF4444",
    isPlanned: true,
  },
  {
    id: "F45",
    name: "Mobile Agent Interface",
    description: "Mobile-responsive agent interface for on-the-go monitoring and approvals by banking operations managers.",
    category: "UX",
    totalStoryPoints: 65,
    completedStoryPoints: 0,
    remainingStoryPoints: 65,
    priority: 29,
    prdLink: PRD_INDEX_URL,
    prdStatus: "pending",
    quarters: [
      { quarter: "Q4-2026", allocatedPoints: 65, percentageOfFeature: 100 },
    ],
    status: "Planned",
    color: "#EC4899",
    isPlanned: true,
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

export const getMilestoneDetails = (milestoneId: string): MilestoneDetails | null => {
  const milestone = MILESTONES.find(m => m.id === milestoneId);
  if (!milestone) return null;

  const foundFeatures: MilestoneFeatureDetail[] = [];
  const missingIds: string[] = [];

  for (const depId of milestone.dependencies) {
    const feature = ROADMAP_FEATURES.find(f => f.id === depId);
    if (!feature) {
      missingIds.push(depId);
      continue;
    }
    foundFeatures.push({
      id: feature.id,
      name: feature.name,
      status: feature.status,
      category: feature.category,
      totalStoryPoints: feature.totalStoryPoints,
      completedStoryPoints: feature.completedStoryPoints,
      remainingStoryPoints: feature.remainingStoryPoints,
      jiraEpicKey: feature.jiraEpicKey ?? null,
      jiraEpicUrl: feature.jiraEpicUrl ?? null,
      completionPercentage: feature.totalStoryPoints > 0
        ? Math.round((feature.completedStoryPoints / feature.totalStoryPoints) * 100)
        : 0,
    });
  }

  const totalStoryPoints = foundFeatures.reduce((s, f) => s + f.totalStoryPoints, 0);
  const completedStoryPoints = foundFeatures.reduce((s, f) => s + f.completedStoryPoints, 0);
  const remainingStoryPoints = foundFeatures.reduce((s, f) => s + f.remainingStoryPoints, 0);

  return {
    milestoneId: milestone.id,
    milestoneName: milestone.name,
    description: milestone.description,
    targetQuarter: milestone.targetQuarter,
    businessValue: milestone.businessValue,
    features: foundFeatures,
    summary: {
      totalFeatures: foundFeatures.length,
      totalStoryPoints,
      completedStoryPoints,
      remainingStoryPoints,
      overallCompletionPercentage: totalStoryPoints > 0
        ? Math.round((completedStoryPoints / totalStoryPoints) * 100)
        : 0,
    },
    missingDependencyIds: missingIds,
  };
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
  q4Load: calculateQuarterLoad("Q4-2026"),
  q1Utilization: calculateQuarterUtilization("Q1-2026", velocity),
  q2Utilization: calculateQuarterUtilization("Q2-2026", velocity),
  q3Utilization: calculateQuarterUtilization("Q3-2026", velocity),
  q4Utilization: calculateQuarterUtilization("Q4-2026", velocity),
});

export const ROADMAP_SUMMARY = getRoadmapSummary();
