// PRD Data - Comprehensive PRD to JIRA Ticket Mapping
// Generated: January 5, 2026 at 4:00 AM MT
// Source: Confluence + JIRA + SharePoint
// Update: Added SharePoint PRD discovery integration

export interface PRD {
  id: string;
  name: string;
  shortName: string;
  confluenceUrl: string | null;
  sharepointFile: string | null;
  sharepointFolder: "working" | "completed" | null;
  status: "Active" | "Draft" | "Completed" | "Archived" | "SharePoint Only";
  owner: string;
  relatedTickets: string[];
  totalPoints: number | null;
  completedPoints: number;
  labels: string[];
  keywords: string[];
  description: string;
  category: "Core Product" | "Platform" | "Automation" | "AI/Agent" | "SharePoint Only";
  color: string;
  note?: string;
  alert?: string;
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

// SharePoint Base URLs
export const sharepointBase = {
  working: "https://deepseehq-my.sharepoint.com/personal/ryan_mcqueen_deepsee_ai/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fryan%5Fmcqueen%5Fdeepsee%5Fai%2FDocuments%2FProduct%2F0%20%2D%20PRDs%2FWorking",
  completed: "https://deepseehq-my.sharepoint.com/personal/ryan_mcqueen_deepsee_ai/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fryan%5Fmcqueen%5Fdeepsee%5Fai%2FDocuments%2FProduct%2F0%20%2D%20PRDs%2FCompleted"
};

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
  "prd-epa-resolution": "#6366F1",  // Indigo
  // SharePoint-only PRDs
  "prd-trade-recon": "#84CC16",     // Lime
  "prd-sec-filing": "#A855F7",      // Fuchsia
  "prd-broadridge-bpo": "#F472B6",  // Pink
  "prd-browser-control": "#22D3EE", // Cyan
  "prd-ssi-avaloq": "#FB923C",      // Orange
  "prd-client-interaction": "#94A3B8", // Slate
  "prd-fabric": "#64748B"           // Slate darker
};

// All PRDs Master List (17 total: 10 Confluence + 7 SharePoint-only)
export const allPRDs: PRD[] = [
  // ========== CORE PRODUCT PRDs ==========
  {
    id: "prd-mercury",
    name: "Mercury Extraction PRD",
    shortName: "Mercury",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2814476289",
    sharepointFile: "Mercury_Extraction_PRD_v1.0.docx",
    sharepointFolder: "working",
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
    sharepointFile: "Document_Classifier_Parser_PRD",
    sharepointFolder: "working",
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
    sharepointFile: "BluePrint_PRD_Full.docx",
    sharepointFolder: "working",
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
    sharepointFile: "Platform_PRD_Full.docx",
    sharepointFolder: "working",
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
    color: "#F59E0B",
    note: "Fallback PRD for Deep Recon and Deep Pilot tickets"
  },
  {
    id: "prd-artemis",
    name: "Project ARTEMIS PRD",
    shortName: "ARTEMIS",
    confluenceUrl: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823782401",
    sharepointFile: "Project_ARTEMIS_PRD_Full.docx",
    sharepointFolder: "working",
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
    sharepointFile: null,
    sharepointFolder: null,
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: ["BACK-1666"],
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
    sharepointFile: "Automation_Orchestration_PRD_Full.docx",
    sharepointFolder: "working",
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
    sharepointFile: "AGNT-OUTCOME-001_Enhanced_PRD_v2",
    sharepointFolder: "completed",
    status: "Active",
    owner: "Ryan McQueen",
    relatedTickets: ["BACK-1602"],
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
    sharepointFile: "Agentic_Engine_PRD_Full.docx",
    sharepointFolder: "working",
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
    sharepointFile: "EPA_Automated_Resolution_PRD_Full.docx",
    sharepointFolder: "working",
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
  },

  // ========== SHAREPOINT-ONLY PRDs (Not in Confluence) ==========
  {
    id: "prd-trade-recon",
    name: "Trade Reconciliation PRD",
    shortName: "Trade Recon",
    confluenceUrl: null,
    sharepointFile: "Base Blueprint Trade Reconciliation.docx",
    sharepointFolder: "working",
    status: "SharePoint Only",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["trade-recon"],
    keywords: ["trade", "reconciliation", "blueprint"],
    description: "Trade reconciliation base blueprint for financial workflows",
    category: "SharePoint Only",
    color: "#84CC16",
    alert: "Needs migration to Confluence"
  },
  {
    id: "prd-sec-filing",
    name: "SEC Filing Parser PRD (Broadridge)",
    shortName: "SEC Filing",
    confluenceUrl: null,
    sharepointFile: "SEC_Filing_Parser_PRD_Broadridge.docx",
    sharepointFolder: "working",
    status: "SharePoint Only",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["sec-filing", "broadridge"],
    keywords: ["sec", "filing", "parser", "broadridge"],
    description: "SEC filing parser for Broadridge financial documents",
    category: "SharePoint Only",
    color: "#A855F7",
    alert: "v1 and v2 available"
  },
  {
    id: "prd-broadridge-bpo",
    name: "Broadridge BPO Automation PRD",
    shortName: "Broadridge BPO",
    confluenceUrl: null,
    sharepointFile: "Broadridge BPO Automation.docx",
    sharepointFolder: "working",
    status: "SharePoint Only",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["broadridge", "bpo", "automation"],
    keywords: ["broadridge", "bpo", "automation", "business process"],
    description: "Broadridge BPO automation workflows",
    category: "SharePoint Only",
    color: "#F472B6",
    alert: "Needs migration to Confluence"
  },
  {
    id: "prd-browser-control",
    name: "Browser Control Agent PRD",
    shortName: "Browser Control",
    confluenceUrl: null,
    sharepointFile: "Browser_Control_Agent_PRD_v1.docx",
    sharepointFolder: "working",
    status: "SharePoint Only",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["browser-control", "agent"],
    keywords: ["browser", "control", "agent", "automation"],
    description: "Browser control agent for web automation tasks",
    category: "SharePoint Only",
    color: "#22D3EE"
  },
  {
    id: "prd-ssi-avaloq",
    name: "Avaloq and Statement Workflow PRD",
    shortName: "SSI/Avaloq",
    confluenceUrl: null,
    sharepointFile: "Avaloq and Statement Workflow.docx",
    sharepointFolder: "working",
    status: "SharePoint Only",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["ssi", "avaloq", "statement"],
    keywords: ["avaloq", "statement", "workflow", "ssi"],
    description: "Avaloq and statement workflow integration",
    category: "SharePoint Only",
    color: "#FB923C",
    note: "Possibly SSI related"
  },
  {
    id: "prd-client-interaction",
    name: "Client Agent Interaction PRD",
    shortName: "Client Interaction",
    confluenceUrl: null,
    sharepointFile: "AGNT-UI-001_Client_Agent_Interaction_P",
    sharepointFolder: "completed",
    status: "Completed",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["client", "agent", "interaction"],
    keywords: ["client", "agent", "interaction", "ui"],
    description: "Client agent interaction patterns and UI guidelines",
    category: "SharePoint Only",
    color: "#94A3B8"
  },
  {
    id: "prd-fabric",
    name: "DeepSee Fabric PRD",
    shortName: "Fabric",
    confluenceUrl: null,
    sharepointFile: "DeepSee_Fabric_PRD_v0.1",
    sharepointFolder: "completed",
    status: "Completed",
    owner: "Ryan McQueen",
    relatedTickets: [],
    totalPoints: null,
    completedPoints: 0,
    labels: ["fabric"],
    keywords: ["fabric", "infrastructure", "platform"],
    description: "DeepSee Fabric infrastructure layer",
    category: "SharePoint Only",
    color: "#64748B"
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

// PRD Summary Statistics (Updated with SharePoint discovery)
export const prdSummary = {
  totalPRDs: 17,
  inConfluence: 10,
  sharepointOnly: 7,
  activePRDs: 10,
  completedPRDs: 2,

  withLinkedTickets: 7,
  totalLinkedTickets: 35,
  totalUnlinkedTickets: 23,

  byCategory: {
    "Core Product": ["prd-mercury", "prd-parser", "prd-blueprint"],
    "Platform": ["prd-platform", "prd-artemis"],
    "Automation": ["prd-email-automation", "prd-automation-orchestration"],
    "AI/Agent": ["prd-agent-reasoning", "prd-agentic-engine", "prd-epa-resolution"],
    "SharePoint Only": ["prd-trade-recon", "prd-sec-filing", "prd-broadridge-bpo", "prd-browser-control", "prd-ssi-avaloq", "prd-client-interaction", "prd-fabric"]
  },

  byStatus: {
    active: 10,
    sharepointOnly: 5,
    completed: 2
  },

  storyPointsByPRD: {
    mercury: { total: 24, completed: 0, percent: 0, tickets: 11 },
    parser: { total: 31, completed: 0, percent: 0, tickets: 6 },
    blueprint: { total: 34, completed: 0, percent: 0, tickets: 5 },
    platform: { total: null, completed: 0, percent: null, tickets: 9 },
    emailAutomation: { total: null, completed: 0, percent: null, tickets: 1 },
    agentReasoning: { total: null, completed: 0, percent: null, tickets: 1 }
  },

  ticketCountByPRD: {
    mercury: 11,
    parser: 6,
    blueprint: 5,
    platform: 9,
    emailAutomation: 1,
    agentReasoning: 1,
    unlinked: 23
  },

  alerts: [
    { type: "warning", message: "7 PRDs in SharePoint need migration to Confluence" },
    { type: "info", message: "Deep Recon & Deep Pilot have no dedicated PRDs (using Platform as fallback)" }
  ]
};

// SharePoint PRD Inventory
export const sharepointInventory = {
  title: "SharePoint PRD Inventory",
  description: "PRDs stored in Ryan's SharePoint folders",

  workingFolder: {
    url: sharepointBase.working,
    files: [
      { name: "EPA_Automated_Resolution_PRD_Full.docx", inConfluence: true, recentlyModified: true },
      { name: "Agentic_Engine_PRD_Full.docx", inConfluence: true, recentlyModified: true },
      { name: "Broadridge BPO Automation.docx", inConfluence: false, alert: "Migrate to Confluence" },
      { name: "PRD Tracker.xlsx", inConfluence: false, type: "tracker" },
      { name: "BluePrint_PRD_Full.docx", inConfluence: true },
      { name: "Platform_PRD_Full.docx", inConfluence: true },
      { name: "Automation_Orchestration_PRD_Full.docx", inConfluence: true },
      { name: "Project_ARTEMIS_PRD_Full.docx", inConfluence: true },
      { name: "SEC_Filing_Parser_PRD_Broadridge.docx", inConfluence: false, versions: "v1 and v2" },
      { name: "Mercury_Extraction_PRD_v1.0.docx", inConfluence: true },
      { name: "Base Blueprint Trade Reconciliation.docx", inConfluence: false, alert: "Migrate to Confluence" },
      { name: "Document_Classifier_Parser_PRD", inConfluence: true },
      { name: "Browser_Control_Agent_PRD_v1.docx", inConfluence: false },
      { name: "Avaloq and Statement Workflow.docx", inConfluence: false, note: "Possibly SSI related" }
    ],
    totalFiles: 14,
    inConfluence: 8,
    needsMigration: 6
  },

  completedFolder: {
    url: sharepointBase.completed,
    files: [
      { name: "AGNT-OUTCOME-001_Enhanced_PRD_v2", inConfluence: true },
      { name: "AGNT-UI-001_Client_Agent_Interaction_P", inConfluence: false },
      { name: "DeepSee_Fabric_PRD_v0.1", inConfluence: false },
      { name: "Mercury_Extraction_PRD_v1.0.docx", inConfluence: true },
      { name: "Wells Fargo SSI Output.docx", inConfluence: false, note: "SSI related" }
    ],
    totalFiles: 5,
    inConfluence: 2,
    needsMigration: 3
  },

  summary: {
    totalSharePointPRDs: 19,
    inConfluence: 10,
    needsMigration: 9,
    percentSynced: 53
  }
};

// PRD Action Items
export const prdActionItems = [
  {
    priority: "HIGH" as const,
    category: "Migration",
    title: "Migrate Trade Reconciliation PRD to Confluence",
    details: "Base Blueprint Trade Reconciliation.docx exists in SharePoint but not Confluence",
    owner: "Ryan McQueen",
    sharepointFile: "Base Blueprint Trade Reconciliation.docx"
  },
  {
    priority: "HIGH" as const,
    category: "Creation",
    title: "Create Deep Recon PRD",
    details: "5 tickets using Platform PRD as fallback - no dedicated Deep Recon PRD exists",
    relatedTickets: ["UI-691", "UI-718", "UI-719", "UI-727", "UI-731"],
    owner: "Product"
  },
  {
    priority: "HIGH" as const,
    category: "Creation",
    title: "Create Deep Pilot PRD",
    details: "2 tickets using Platform PRD as fallback - no dedicated Deep Pilot PRD exists",
    relatedTickets: ["BACK-1402", "BACK-1649"],
    owner: "Product"
  },
  {
    priority: "MEDIUM" as const,
    category: "Migration",
    title: "Migrate Broadridge BPO Automation PRD",
    details: "SharePoint only - needs Confluence page",
    sharepointFile: "Broadridge BPO Automation.docx",
    owner: "Ryan McQueen"
  },
  {
    priority: "MEDIUM" as const,
    category: "Migration",
    title: "Migrate SEC Filing Parser PRD",
    details: "SharePoint has v1 and v2 - needs Confluence page",
    sharepointFile: "SEC_Filing_Parser_PRD_Broadridge.docx",
    owner: "Ryan McQueen"
  },
  {
    priority: "LOW" as const,
    category: "Consolidation",
    title: "Consolidate SSI-related PRDs",
    details: "Multiple docs may be SSI related: Avaloq and Statement Workflow.docx, Wells Fargo SSI Output.docx",
    owner: "Product"
  },
  {
    priority: "LOW" as const,
    category: "Cleanup",
    title: "Review Browser Control Agent PRD",
    details: "v1 in SharePoint - determine if active or archived",
    sharepointFile: "Browser_Control_Agent_PRD_v1.docx",
    owner: "Product"
  }
];

// Missing PRD Alerts
export const missingPRDAlerts = [
  {
    type: "warning" as const,
    feature: "Deep Recon",
    ticketCount: 5,
    fallbackPRD: "Platform PRD",
    message: "No dedicated Deep Recon PRD found in Confluence or SharePoint",
    action: "Consider creating Deep Recon PRD"
  },
  {
    type: "warning" as const,
    feature: "Deep Pilot",
    ticketCount: 2,
    fallbackPRD: "Platform PRD",
    message: "No dedicated Deep Pilot PRD found in Confluence or SharePoint",
    action: "Consider creating Deep Pilot PRD"
  },
  {
    type: "info" as const,
    feature: "Trade Reconciliation",
    ticketCount: 0,
    location: "SharePoint Only",
    message: "PRD exists in SharePoint but not Confluence",
    action: "Migrate to Confluence"
  }
];

// PRD Sync Status Widget
export const prdSyncWidget = {
  title: "PRD Sync Status",
  subtitle: "Confluence ↔ SharePoint",

  stats: {
    totalPRDs: 17,
    inBoth: 8,
    confluenceOnly: 2,
    sharepointOnly: 7
  },

  syncPercent: 47,

  chart: {
    type: "donut",
    data: [
      { label: "Synced (Both)", value: 8, color: "#10B981" },
      { label: "Confluence Only", value: 2, color: "#3B82F6" },
      { label: "SharePoint Only", value: 7, color: "#F59E0B" }
    ]
  },

  alert: "7 PRDs need migration to Confluence"
};

// PRD Coverage Widget
export const prdCoverageWidget = {
  title: "PRD Coverage",
  subtitle: "Sprint 2026-S1 Tickets",

  stats: {
    totalTickets: 58,
    withPRD: 35,
    withoutPRD: 23,
    coveragePercent: 60
  },

  breakdown: {
    coreProduct: { tickets: 22, withPRD: 22, percent: 100 },
    platform: { tickets: 9, withPRD: 9, percent: 100 },
    automation: { tickets: 1, withPRD: 1, percent: 100 },
    aiAgent: { tickets: 1, withPRD: 1, percent: 100 },
    infrastructure: { tickets: 15, withPRD: 0, percent: 0 },
    other: { tickets: 10, withPRD: 2, percent: 20 }
  },

  chart: {
    type: "bar",
    data: [
      { label: "Mercury", linked: 11, total: 11 },
      { label: "Parser", linked: 6, total: 6 },
      { label: "BluePrint", linked: 5, total: 5 },
      { label: "Platform", linked: 9, total: 9 },
      { label: "Email Auto", linked: 1, total: 1 },
      { label: "Agent Reasoning", linked: 1, total: 1 },
      { label: "No PRD", linked: 0, total: 23 }
    ]
  }
};

// PRD Filter Options for dropdowns
export const prdFilterOptions = [
  { value: "all", label: "All Tickets", count: allPRDTickets.length },
  { value: "with-prd", label: "With PRD Link", count: allPRDTickets.filter(t => t.prdId).length },
  { value: "no-prd", label: "No PRD Link", count: allPRDTickets.filter(t => !t.prdId).length },
  { value: "divider", label: "──────────", disabled: true },
  ...allPRDs.filter(p => p.confluenceUrl).map(prd => ({
    value: prd.id,
    label: prd.shortName,
    count: prd.relatedTickets.length,
    url: prd.confluenceUrl,
    color: prd.color
  })),
  { value: "divider2", label: "── SharePoint Only ──", disabled: true },
  ...allPRDs.filter(p => !p.confluenceUrl).map(prd => ({
    value: prd.id,
    label: `${prd.shortName} (SP)`,
    count: prd.relatedTickets.length,
    url: null,
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
    },
    {
      title: "SharePoint Only",
      items: [
        { id: "prd-trade-recon", name: "Trade Recon", count: 0, color: "#84CC16", alert: true },
        { id: "prd-sec-filing", name: "SEC Filing", count: 0, color: "#A855F7", alert: true },
        { id: "prd-broadridge-bpo", name: "Broadridge BPO", count: 0, color: "#F472B6", alert: true },
        { id: "prd-browser-control", name: "Browser Control", count: 0, color: "#22D3EE" },
        { id: "prd-ssi-avaloq", name: "SSI/Avaloq", count: 0, color: "#FB923C" }
      ]
    }
  ],
  footer: {
    unlinkedTickets: 23,
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
    totalPRDs: 17,
    totalTickets: 35,
    totalPoints: 89,
    completedTickets: 0,
    completedPoints: 0
  }
};

// Dashboard Metadata
export const dashboardMeta = {
  lastUpdated: "January 5, 2026, 4:00 AM MT",

  dataSources: {
    jira: {
      lastSync: "January 5, 2026, 3:00 AM MT",
      sprint: "2026-S1",
      totalTickets: 58
    },
    confluence: {
      lastSync: "January 5, 2026, 2:00 AM MT",
      totalPRDs: 10
    },
    sharepoint: {
      lastSync: "January 5, 2026, 2:30 AM MT",
      workingPRDs: 14,
      completedPRDs: 5
    },
    monday: {
      lastSync: "January 5, 2026, 3:00 AM MT",
      totalPipeline: 11830000,
      activeDeals: 78
    }
  },

  prdLinkStatus: {
    totalLinked: 35,
    linkedThisSession: 11,
    remaining: 0
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

export function getSharepointOnlyPRDs(): PRD[] {
  return allPRDs.filter(p => !p.confluenceUrl && p.sharepointFile);
}

export function getConfluencePRDs(): PRD[] {
  return allPRDs.filter(p => p.confluenceUrl);
}

export function getPRDsNeedingMigration(): PRD[] {
  return allPRDs.filter(p => !p.confluenceUrl && p.sharepointFile && p.status !== "Completed");
}

// Data Timestamp
export const prdDataLastUpdated = "January 6, 2026 9:00 AM MT";
export const prdDataSource = "JIRA + Confluence + SharePoint";
