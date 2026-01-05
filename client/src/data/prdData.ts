// PRD Data - Comprehensive PRD to JIRA Ticket Mapping
// Generated: January 5, 2026 at 3:00 AM MT
// Source: Confluence + JIRA

export interface PRD {
  id: string;
  name: string;
  shortName: string;
  confluenceUrl: string | null;
  sharepointUrl: string | null;
  status: "Active" | "Draft" | "Completed" | "Archived";
  owner: string;
  relatedTickets: string[];
  totalPoints: number | null;
  completedPoints: number;
  labels: string[];
  keywords: string[];
  description: string;
  category: "Core Product" | "Platform" | "Automation" | "AI/Agent";
  color: string;
}

export interface PRDTicket {
  key: string;
  summary: string;
  type: "Epic" | "Story" | "Task" | "Bug" | "Spike";
  status: "To Do" | "In Progress" | "Code Review" | "Blocked" | "Done" | "Cancelled";
  assignee: string | null;
  points: number | null;
  sprint: string;
  prdId: string | null;
  prdName: string | null;
  prdUrl: string | null;
  labels: string[];
  project: "BACK" | "UI" | "CI" | "FB" | "SC";
}

// PRD Color Mapping
export const prdColors: Record<string, string> = {
  "prd-mercury": "#3B82F6",      // Blue
  "prd-parser": "#10B981",       // Green
  "prd-blueprint": "#8B5CF6",    // Purple
  "prd-platform": "#F59E0B",     // Amber
  "prd-artemis": "#EC4899",      // Pink
  "prd-email-automation": "#06B6D4", // Cyan
  "prd-automation-orchestration": "#14B8A6", // Teal
  "prd-agent-reasoning": "#F97316", // Orange
  "prd-agentic-engine": "#EF4444", // Red
  "prd-epa-resolution": "#6366F1"  // Indigo
};

// All PRDs Master List
export const allPRDs: PRD[] = [
  // ========== CORE PRODUCT PRDs ==========
  {
    id: "prd-mercury",
    name: "Mercury Extraction PRD",
    shortName: "Mercury",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "BACK-1650", "BACK-1651", "BACK-1652", "BACK-1653", "BACK-1654", "BACK-1655",
      "BACK-1532", "BACK-1643", "BACK-1528", "BACK-1529", "BACK-1530"
    ],
    totalPoints: 24,
    completedPoints: 0,
    labels: ["prd-mercury", "mercury-extraction"],
    keywords: ["mercury", "extraction", "hmda", "colony", "sunwest", "bbva", "schema validation", "fine-tune"],
    description: "Core extraction engine for processing unstructured documents and extracting structured data fields for Colony Bank, Sunwest Bank, and BBVA",
    category: "Core Product",
    color: "#3B82F6"
  },
  {
    id: "prd-parser",
    name: "Document Classifier and Parser PRD",
    shortName: "Parser",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "BACK-1656", "BACK-1657", "BACK-1658", "BACK-1659", "BACK-1660", "BACK-1661"
    ],
    totalPoints: 31,
    completedPoints: 0,
    labels: ["prd-parser", "document-parser"],
    keywords: ["parser", "pdf", "html", "document", "classification", "multi-language", "sec filing"],
    description: "Multi-format intelligent parsing for PDF, HTML, rich text, images. Supports Colony Bank loan packets and Broadridge SEC filings",
    category: "Core Product",
    color: "#10B981"
  },
  {
    id: "prd-blueprint",
    name: "BluePrint PRD",
    shortName: "BluePrint",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "BACK-1662", "BACK-1663", "BACK-1664", "BACK-1665", "UI-734"
    ],
    totalPoints: 34,
    completedPoints: 0,
    labels: ["prd-blueprint", "blueprint"],
    keywords: ["blueprint", "agent configuration", "artemis", "template"],
    description: "Agent Configuration Framework - defines how agents understand their purpose, access knowledge, and interact with users",
    category: "Core Product",
    color: "#8B5CF6"
  },

  // ========== PLATFORM PRDs ==========
  {
    id: "prd-platform",
    name: "Platform PRD",
    shortName: "Platform",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "UI-691", "UI-718", "UI-719", "UI-727", "UI-731",
      "BACK-1402", "BACK-1648", "BACK-1649",
      "BACK-1606"
    ],
    totalPoints: null,
    completedPoints: 0,
    labels: ["platform"],
    keywords: ["platform", "deep recon", "deep pilot", "infrastructure"],
    description: "Core platform capabilities, Deep Recon, and Deep Pilot features",
    category: "Platform",
    color: "#F59E0B"
  },
  {
    id: "prd-artemis",
    name: "Project ARTEMIS PRD",
    shortName: "ARTEMIS",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824044546",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["artemis"],
    keywords: ["artemis", "next-gen", "agentic platform"],
    description: "Next-generation agentic platform rebuild initiative",
    category: "Platform",
    color: "#EC4899"
  },

  // ========== AUTOMATION PRDs ==========
  {
    id: "prd-email-automation",
    name: "Email Automation Workflow PRD",
    shortName: "Email Automation",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815852545",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "BACK-1666"
    ],
    totalPoints: null,
    completedPoints: 0,
    labels: ["email-automation"],
    keywords: ["email", "automation", "workflow", "triage", "crm"],
    description: "Email triage and automation workflows for client email processing",
    category: "Automation",
    color: "#06B6D4"
  },
  {
    id: "prd-automation-orchestration",
    name: "Automation and Orchestration PRD",
    shortName: "Orchestration",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823913475",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["automation", "orchestration"],
    keywords: ["automation", "orchestration", "workflow"],
    description: "Automation and orchestration capabilities for agent workflows",
    category: "Automation",
    color: "#14B8A6"
  },

  // ========== AI/AGENT PRDs ==========
  {
    id: "prd-agent-reasoning",
    name: "Enhanced Agent Outcome Reasoning PRD",
    shortName: "Agent Reasoning",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814803970",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [
      "BACK-1602"
    ],
    totalPoints: null,
    completedPoints: 0,
    labels: ["agent-reasoning"],
    keywords: ["agent", "reasoning", "outcome", "llm", "gpt"],
    description: "Enhanced reasoning capabilities for agent decision-making and outcomes",
    category: "AI/Agent",
    color: "#F97316"
  },
  {
    id: "prd-agentic-engine",
    name: "DeepSee Agentic Engine PRD",
    shortName: "Agentic Engine",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824372269",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["agentic-engine"],
    keywords: ["agentic", "engine", "ai"],
    description: "Core agentic engine powering DeepSee AI agents",
    category: "AI/Agent",
    color: "#EF4444"
  },
  {
    id: "prd-epa-resolution",
    name: "DeepSee AI's EPA - Automated Resolution PRD",
    shortName: "EPA Resolution",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553",
    sharepointUrl: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["epa", "resolution"],
    keywords: ["epa", "automated resolution", "exception"],
    description: "Exception Processing Agent automated resolution capabilities",
    category: "AI/Agent",
    color: "#6366F1"
  }
];

// All JIRA Tickets with PRD Mappings
export const allPRDTickets: PRDTicket[] = [
  // ========================================
  // MERCURY EXTRACTION TICKETS (11 tickets)
  // ========================================
  {
    key: "BACK-1650",
    summary: "Mercury Extraction - Unified Document Service",
    type: "Epic",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1651",
    summary: "[MERCURY] Core extraction engine performance",
    type: "Story",
    status: "To Do",
    assignee: "Konnor Willison",
    points: 8,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1652",
    summary: "[MERCURY] Colony Bank - HMDA schema validation",
    type: "Story",
    status: "To Do",
    assignee: "Kalvin Willison",
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1653",
    summary: "[MERCURY] Sunwest Bank - Extraction model",
    type: "Story",
    status: "To Do",
    assignee: "Gabriel Ignacio",
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1654",
    summary: "[MERCURY] BBVA - Term type extraction",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 3,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1655",
    summary: "[MERCURY] API documentation and developer guide",
    type: "Story",
    status: "To Do",
    assignee: "Konnor Willison",
    points: 3,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["prd-mercury", "mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1532",
    summary: "Fine-tune Mercury Extraction for Sunwest Bank",
    type: "Story",
    status: "In Progress",
    assignee: "Konnor Willison",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1643",
    summary: "Fine-tune Mercury Extraction for CTC",
    type: "Story",
    status: "In Progress",
    assignee: "Kalvin Willison",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1528",
    summary: "Mercury Extraction schema setup",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1529",
    summary: "Mercury Extraction schema setup",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["mercury-extraction"],
    project: "BACK"
  },
  {
    key: "BACK-1530",
    summary: "Mercury Extraction schema setup",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-mercury",
    prdName: "Mercury Extraction PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    labels: ["mercury-extraction"],
    project: "BACK"
  },

  // ========================================
  // DOCUMENT PARSER TICKETS (6 tickets)
  // ========================================
  {
    key: "BACK-1656",
    summary: "Document Parser - Multi-Format Intelligent Parser",
    type: "Epic",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },
  {
    key: "BACK-1657",
    summary: "[PARSER] PDF extraction for multi-page documents",
    type: "Story",
    status: "To Do",
    assignee: "Ivan Peev",
    points: 8,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },
  {
    key: "BACK-1658",
    summary: "[PARSER] HTML structured file parsing for SEC filings",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },
  {
    key: "BACK-1659",
    summary: "[PARSER] Automatic document type classification",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 8,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },
  {
    key: "BACK-1660",
    summary: "[PARSER] Multi-language extraction support",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },
  {
    key: "BACK-1661",
    summary: "[PARSER] Integration between Document Parser & Mercury",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-parser",
    prdName: "Document Parser PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815524865",
    labels: ["prd-parser", "document-parser"],
    project: "BACK"
  },

  // ========================================
  // BLUEPRINT TICKETS (5 tickets)
  // ========================================
  {
    key: "BACK-1662",
    summary: "BluePrint - Agent Configuration Framework",
    type: "Epic",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-blueprint",
    prdName: "BluePrint PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    labels: ["prd-blueprint", "blueprint"],
    project: "BACK"
  },
  {
    key: "BACK-1663",
    summary: "[BLUEPRINT] Define data model and storage",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 5,
    sprint: "2026-S1",
    prdId: "prd-blueprint",
    prdName: "BluePrint PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    labels: ["prd-blueprint", "blueprint"],
    project: "BACK"
  },
  {
    key: "BACK-1664",
    summary: "[BLUEPRINT] Auto-generate visual and agent output",
    type: "Story",
    status: "To Do",
    assignee: "Gabriel Ignacio",
    points: 8,
    sprint: "2026-S1",
    prdId: "prd-blueprint",
    prdName: "BluePrint PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    labels: ["prd-blueprint", "blueprint"],
    project: "BACK"
  },
  {
    key: "BACK-1665",
    summary: "[BLUEPRINT] Create initial library of 5 base Blueprints",
    type: "Story",
    status: "To Do",
    assignee: "Gabriel Ignacio",
    points: 13,
    sprint: "2026-S1",
    prdId: "prd-blueprint",
    prdName: "BluePrint PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    labels: ["prd-blueprint", "blueprint"],
    project: "BACK"
  },
  {
    key: "UI-734",
    summary: "[BLUEPRINT] ARTEMIS UI for BluePrint viewing",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: 8,
    sprint: "2026-S1",
    prdId: "prd-blueprint",
    prdName: "BluePrint PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2824306710",
    labels: ["prd-blueprint", "blueprint"],
    project: "UI"
  },

  // ========================================
  // PLATFORM / DEEP RECON / DEEP PILOT TICKETS (9 tickets)
  // ========================================
  {
    key: "UI-691",
    summary: "Deep Recon - Display Custom fields in Actionable Data",
    type: "Story",
    status: "Blocked",
    assignee: "Matthew Snow",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-recon"],
    project: "UI"
  },
  {
    key: "UI-718",
    summary: "DeepRecon - Display Mailbox ID in the UI",
    type: "Story",
    status: "Blocked",
    assignee: "Matthew Snow",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-recon"],
    project: "UI"
  },
  {
    key: "UI-719",
    summary: "DeepRecon - Add To column to Actionable Data Page",
    type: "Story",
    status: "Blocked",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-recon"],
    project: "UI"
  },
  {
    key: "UI-727",
    summary: "Deep Recon - Additional UI enhancements",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-recon"],
    project: "UI"
  },
  {
    key: "UI-731",
    summary: "Deep Recon - Auto-refresh Actionable Data page",
    type: "Story",
    status: "Code Review",
    assignee: "Owen Riley",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-recon"],
    project: "UI"
  },
  {
    key: "BACK-1402",
    summary: "Deep Pilot - Re-enable .zip reprocessing",
    type: "Story",
    status: "In Progress",
    assignee: "Kannal Mutharasu",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-pilot"],
    project: "BACK"
  },
  {
    key: "BACK-1648",
    summary: "Deep Pilot - Some PDF Documents are incorrectly parsed",
    type: "Bug",
    status: "In Progress",
    assignee: "Treven Trujillo",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-pilot", "bug"],
    project: "BACK"
  },
  {
    key: "BACK-1649",
    summary: "Deep Pilot - Additional fixes",
    type: "Story",
    status: "To Do",
    assignee: null,
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["deep-pilot"],
    project: "BACK"
  },
  {
    key: "BACK-1606",
    summary: "Add Non-Project Scoped Statistics Endpoints",
    type: "Story",
    status: "In Progress",
    assignee: "Ivan Peev",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-platform",
    prdName: "Platform PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
    labels: ["platform"],
    project: "BACK"
  },

  // ========================================
  // EMAIL AUTOMATION TICKETS (1 ticket)
  // ========================================
  {
    key: "BACK-1666",
    summary: "[BE] trigger automations for emails pushed to CRM",
    type: "Story",
    status: "In Progress",
    assignee: "Aleksander Winski",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-email-automation",
    prdName: "Email Automation Workflow PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2815852545",
    labels: ["email-automation"],
    project: "BACK"
  },

  // ========================================
  // AGENT REASONING TICKETS (1 ticket)
  // ========================================
  {
    key: "BACK-1602",
    summary: "Evaluate GPT-5 Responses API + Structured Outputs",
    type: "Spike",
    status: "In Progress",
    assignee: "Darius Ouderkirk",
    points: null,
    sprint: "2026-S1",
    prdId: "prd-agent-reasoning",
    prdName: "Enhanced Agent Outcome Reasoning PRD",
    prdUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814803970",
    labels: ["agent-reasoning", "spike"],
    project: "BACK"
  },

  // ========================================
  // NO PRD - INFRASTRUCTURE/DEVOPS
  // ========================================
  {
    key: "FB-2407",
    summary: "Update ml-workflows Base Image to Ubuntu 24.04",
    type: "Task",
    status: "In Progress",
    assignee: "Aleksander Winski",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["infrastructure"],
    project: "FB"
  },
  {
    key: "CI-899",
    summary: "Clean up old training datasets",
    type: "Task",
    status: "In Progress",
    assignee: "Chad Hegerhorst",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["maintenance"],
    project: "CI"
  },
  {
    key: "CI-436",
    summary: "Port over the inference pipeline to argo workflows",
    type: "Story",
    status: "In Progress",
    assignee: "Jeff Hegerhorst",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["infrastructure"],
    project: "CI"
  },
  {
    key: "CI-898",
    summary: "Upgrade JPM RDS version",
    type: "Task",
    status: "Code Review",
    assignee: "Chad Hegerhorst",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["infrastructure", "jpm"],
    project: "CI"
  },
  {
    key: "BACK-1489",
    summary: "Update classification-api Base Image to Ubuntu 24.04",
    type: "Task",
    status: "Blocked",
    assignee: null,
    points: 1,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["infrastructure"],
    project: "BACK"
  },
  {
    key: "UI-733",
    summary: "[SPIKE] Research cursor rules for one repeatable flow",
    type: "Spike",
    status: "In Progress",
    assignee: "Matthew Snow",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["spike", "research"],
    project: "UI"
  },

  // ========================================
  // NO PRD - UI TICKETS (code review)
  // ========================================
  {
    key: "UI-699",
    summary: "Update Overview > 'Message Volume Across Time'",
    type: "Story",
    status: "Code Review",
    assignee: "Owen Riley",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["ui", "overview"],
    project: "UI"
  },
  {
    key: "UI-713",
    summary: "Update Overview > 'Message Volume Across Time'",
    type: "Story",
    status: "Code Review",
    assignee: "Owen Riley",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["ui", "overview"],
    project: "UI"
  },
  {
    key: "UI-700",
    summary: "Identify the top five senders to a Project",
    type: "Story",
    status: "Code Review",
    assignee: "Owen Riley",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["ui"],
    project: "UI"
  },
  {
    key: "UI-730",
    summary: "Allow using raw values in calculation logic",
    type: "Story",
    status: "Code Review",
    assignee: "Owen Riley",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["ui"],
    project: "UI"
  },

  // ========================================
  // COMPLETED TICKETS
  // ========================================
  {
    key: "BACK-811",
    summary: "Output processing fails for large work items",
    type: "Bug",
    status: "Done",
    assignee: "Kannal Mutharasu",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["bug"],
    project: "BACK"
  },
  {
    key: "BACK-1647",
    summary: "Support Broadridge Data Cleanup",
    type: "Task",
    status: "Done",
    assignee: "Darius Ouderkirk",
    points: null,
    sprint: "2026-S1",
    prdId: null,
    prdName: null,
    prdUrl: null,
    labels: ["broadridge"],
    project: "BACK"
  }
];

// PRD Summary Statistics
export const prdSummary = {
  totalPRDs: 10,
  activePRDs: 10,
  totalLinkedTickets: 34,
  totalUnlinkedTickets: 25,

  byCategory: {
    "Core Product": ["prd-mercury", "prd-parser", "prd-blueprint"],
    "Platform": ["prd-platform", "prd-artemis"],
    "Automation": ["prd-email-automation", "prd-automation-orchestration"],
    "AI/Agent": ["prd-agent-reasoning", "prd-agentic-engine", "prd-epa-resolution"]
  },

  storyPointsByPRD: {
    mercury: { total: 24, completed: 0, percent: 0 },
    parser: { total: 31, completed: 0, percent: 0 },
    blueprint: { total: 34, completed: 0, percent: 0 }
  },

  ticketCountByPRD: {
    mercury: 11,
    parser: 6,
    blueprint: 5,
    platform: 9,
    emailAutomation: 1,
    agentReasoning: 1,
    unlinked: 25
  }
};

// PRD Filter Options for dropdowns
export const prdFilterOptions = [
  { value: "all", label: "All Tickets", count: allPRDTickets.length },
  { value: "with-prd", label: "With PRD Link", count: allPRDTickets.filter(t => t.prdId).length },
  { value: "no-prd", label: "No PRD Link", count: allPRDTickets.filter(t => !t.prdId).length },
  { value: "divider", label: "──────────", disabled: true },
  ...allPRDs.map(prd => ({
    value: prd.id,
    label: prd.shortName,
    count: prd.relatedTickets.length,
    url: prd.confluenceUrl,
    color: prd.color
  }))
];

// PRD Sidebar Navigation
export const prdSidebar = {
  title: "PRDs",
  sections: [
    {
      title: "Core Product",
      items: [
        { id: "prd-mercury", name: "Mercury", count: 11, color: "#3B82F6" },
        { id: "prd-parser", name: "Parser", count: 6, color: "#10B981" },
        { id: "prd-blueprint", name: "BluePrint", count: 5, color: "#8B5CF6" }
      ]
    },
    {
      title: "Platform",
      items: [
        { id: "prd-platform", name: "Platform", count: 9, color: "#F59E0B" },
        { id: "prd-artemis", name: "ARTEMIS", count: 0, color: "#EC4899" }
      ]
    },
    {
      title: "Automation",
      items: [
        { id: "prd-email-automation", name: "Email Automation", count: 1, color: "#06B6D4" },
        { id: "prd-automation-orchestration", name: "Orchestration", count: 0, color: "#14B8A6" }
      ]
    },
    {
      title: "AI/Agent",
      items: [
        { id: "prd-agent-reasoning", name: "Agent Reasoning", count: 1, color: "#F97316" },
        { id: "prd-agentic-engine", name: "Agentic Engine", count: 0, color: "#EF4444" },
        { id: "prd-epa-resolution", name: "EPA Resolution", count: 0, color: "#6366F1" }
      ]
    }
  ],
  footer: {
    unlinkedTickets: 25,
    label: "No PRD Link"
  }
};

// PRD Progress Widget Data
export const prdProgressWidget = {
  title: "PRD Progress",
  prds: [
    {
      id: "prd-mercury",
      name: "Mercury",
      totalPoints: 24,
      completedPoints: 0,
      tickets: 11,
      ticketsDone: 0,
      color: "#3B82F6",
      status: "Not Started"
    },
    {
      id: "prd-parser",
      name: "Parser",
      totalPoints: 31,
      completedPoints: 0,
      tickets: 6,
      ticketsDone: 0,
      color: "#10B981",
      status: "Not Started"
    },
    {
      id: "prd-blueprint",
      name: "BluePrint",
      totalPoints: 34,
      completedPoints: 0,
      tickets: 5,
      ticketsDone: 0,
      color: "#8B5CF6",
      status: "Not Started"
    },
    {
      id: "prd-platform",
      name: "Platform",
      totalPoints: null,
      completedPoints: 0,
      tickets: 9,
      ticketsDone: 0,
      color: "#F59E0B",
      status: "In Progress"
    },
    {
      id: "prd-email-automation",
      name: "Email Automation",
      totalPoints: null,
      completedPoints: 0,
      tickets: 1,
      ticketsDone: 0,
      color: "#06B6D4",
      status: "In Progress"
    }
  ],
  summary: {
    totalPRDs: 10,
    totalTickets: 34,
    totalPoints: 89,
    completedTickets: 0,
    completedPoints: 0
  }
};

// Helper Functions
export function getPRDForTicket(ticketKey: string): PRD | null {
  const ticket = allPRDTickets.find(t => t.key === ticketKey);
  if (!ticket || !ticket.prdId) return null;
  return allPRDs.find(p => p.id === ticket.prdId) || null;
}

export function getTicketsForPRD(prdId: string): PRDTicket[] {
  return allPRDTickets.filter(t => t.prdId === prdId);
}

export function getUnlinkedTickets(): PRDTicket[] {
  return allPRDTickets.filter(t => !t.prdId);
}

export function getPRDCompletion(prdId: string): { total: number; done: number; percent: number } {
  const tickets = allPRDTickets.filter(t => t.prdId === prdId);
  const done = tickets.filter(t => t.status === "Done").length;
  return {
    total: tickets.length,
    done,
    percent: tickets.length > 0 ? Math.round((done / tickets.length) * 100) : 0
  };
}

export function filterByPRD(prdId: string | null): PRDTicket[] {
  if (prdId === null) return allPRDTickets.filter(t => !t.prdId);
  return allPRDTickets.filter(t => t.prdId === prdId);
}

export function getPRDById(prdId: string): PRD | undefined {
  return allPRDs.find(p => p.id === prdId);
}

export function getPRDStatusBreakdown(prdId: string) {
  const tickets = getTicketsForPRD(prdId);
  return {
    toDo: tickets.filter(t => t.status === "To Do").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    codeReview: tickets.filter(t => t.status === "Code Review").length,
    blocked: tickets.filter(t => t.status === "Blocked").length,
    done: tickets.filter(t => t.status === "Done").length
  };
}

export function getPRDDetail(prdId: string) {
  const prd = getPRDById(prdId);
  if (!prd) return null;

  const tickets = getTicketsForPRD(prdId);
  const statusBreakdown = getPRDStatusBreakdown(prdId);

  return {
    ...prd,
    tickets,
    summary: {
      totalTickets: tickets.length,
      totalPoints: prd.totalPoints,
      completedPoints: prd.completedPoints,
      byStatus: statusBreakdown,
      byAssignee: tickets.reduce((acc, t) => {
        const assignee = t.assignee || "Unassigned";
        if (!acc[assignee]) acc[assignee] = [];
        acc[assignee].push(t);
        return acc;
      }, {} as Record<string, PRDTicket[]>)
    }
  };
}

// Data Timestamp
export const prdDataLastUpdated = "January 5, 2026 3:00 AM MT";
export const prdDataSource = "JIRA + Confluence";
