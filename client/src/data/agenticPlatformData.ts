// PR-1561 DeepSee Agentic Platform - Complete Initiative Data
// Last Updated: March 6, 2026 @ 1:36 PM MT
// Source: Browser Agent Analysis

export interface EpicData {
  key: string;
  summary: string;
  type: 'Epic' | 'Spike';
  status: 'To Do' | 'In Progress' | 'Done' | 'Planning';
  points: number | null;
  pillar: string;
  blocks?: string[];
  blockedBy?: string[];
  description?: string;
}

export interface MilestoneData {
  key: string;
  summary: string;
  status: 'Planning' | 'In Progress' | 'Done' | 'Backlog';
  childCount: number;
  totalPoints: number | null;
  primaryPillars: string[];
  children: EpicData[];
  description?: string;
  businessGoal?: string;
}

export interface InitiativeData {
  key: string;
  summary: string;
  type: 'Initiative';
  status: string;
  reporter: string;
  totalMilestones: number;
  totalEpics: number;
  totalPoints: number | null;
  milestones: MilestoneData[];
  crossMilestoneDependencies: {
    from: string;
    to: string;
    relationship: 'blocks' | 'relates to';
  }[];
  pillarCoverage: {
    [key: string]: string[];
  };
  gaps: {
    inMilestonesNotInPRDs: string[];
    inPRDsNotInMilestones: string[];
  };
}

// ═══════════════════════════════════════════════════════════════
// PR-1562: INFRASTRUCTURE AND DEPLOYMENT FOUNDATION
// ═══════════════════════════════════════════════════════════════
export const pr1562Data: MilestoneData = {
  key: "PR-1562",
  summary: "Infrastructure and Deployment Foundation",
  status: "Planning",
  childCount: 6,
  totalPoints: null,
  primaryPillars: ["Platform"],
  description: "Deploy foundational Azure infrastructure for the DeepSee AI platform including Microsoft Foundry, private networking, tenant-isolated data storage, managed identities, and observability components.",
  businessGoal: "Enable development teams to build and deploy AI agents on a secure, compliant, enterprise-grade infrastructure foundation that supports complete tenant isolation and meets financial services security requirements.",
  children: [
    {
      key: "CI-918",
      summary: "Core Network and Microsoft Foundry Provisioning",
      type: "Epic",
      status: "Done",
      points: null,
      pillar: "Platform",
      blocks: ["CI-919", "CI-920", "CI-921", "CI-922", "CI-923"],
      description: "Microsoft Foundry account deployment with managed identity, Virtual Network with private subnets and endpoints"
    },
    {
      key: "CI-919",
      summary: "Tenant-Isolated Data Storage",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blockedBy: ["CI-918"],
      blocks: ["CI-920", "CI-923"],
      description: "Azure Cosmos DB, Blob Storage, AI Search, Container Registry"
    },
    {
      key: "CI-920",
      summary: "Identity and Service Authentication Infrastructure",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blockedBy: ["CI-918", "CI-919"],
      blocks: ["CI-923"],
      description: "Service authentication infrastructure setup"
    },
    {
      key: "CI-921",
      summary: "Security and Encryption Infrastructure",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blockedBy: ["CI-918"],
      blocks: ["CI-923"],
      description: "Azure Key Vault with CMK capability"
    },
    {
      key: "CI-922",
      summary: "Observability Infrastructure",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blockedBy: ["CI-918"],
      blocks: ["CI-923"],
      description: "Application Insights and Log Analytics"
    },
    {
      key: "CI-923",
      summary: "Multi-Environment Terraform Deployment",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blockedBy: ["CI-918", "CI-919", "CI-920", "CI-921", "CI-922"],
      description: "Terraform IaC modules for multi-environment deployment - FINAL SINK EPIC"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// PR-1563: AGENT ORCHESTRATION PLATFORM
// ═══════════════════════════════════════════════════════════════
export const pr1563Data: MilestoneData = {
  key: "PR-1563",
  summary: "Agent Orchestration Platform",
  status: "Planning",
  childCount: 8,
  totalPoints: null,
  primaryPillars: ["Automation & Orchestration", "Agentic Engine", "BluePrint", "Enhanced Agent Reasoning"],
  description: "Build the core platform for defining, executing, and managing AI agents and workflows. Includes declarative agent definitions, workflow orchestration patterns, tool integration, agent memory, conversation management, and Workspace Assistant.",
  businessGoal: "Enable Ops Managers to create and configure AI agents through a self-service interface without writing code.",
  children: [
    {
      key: "BACK-1731",
      summary: "Declarative Agent Definition and Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "BluePrint",
      blocks: ["BACK-1734", "BACK-1745", "BACK-1754", "BACK-1737"],
      description: "YAML-based declarative agent configuration with runtime updates, versioning, and rollback"
    },
    {
      key: "BACK-1734",
      summary: "Workflow Orchestration Engine",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Automation & Orchestration",
      blockedBy: ["BACK-1731"],
      description: "Sequential, Concurrent, Handoff, Group Chat, and Magentic One patterns"
    },
    {
      key: "BACK-1745",
      summary: "Tool Integration Framework",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Agentic Engine",
      blockedBy: ["BACK-1731"],
      description: "Function Calling, Code Interpreter, File Search, MCP Servers, OpenAPI tools"
    },
    {
      key: "BACK-1746",
      summary: "Agent Memory System",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "Chat Summary Memory and User Profile Memory with Extraction/Consolidation/Retrieval phases"
    },
    {
      key: "BACK-1757",
      summary: "Conversation and Thread Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      blocks: ["BACK-1737"],
      description: "Thread management, Cosmos DB persistence, session continuation, thread branching"
    },
    {
      key: "BACK-1759",
      summary: "External Connections and Integrations",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "OAuth 2.0, API keys, M365 connections, Key Vault encryption, health monitoring"
    },
    {
      key: "BACK-1754",
      summary: "Workspace Assistant and NL Workflow Creation",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "BluePrint",
      blockedBy: ["BACK-1734", "BACK-1731"],
      description: "Natural language chat interface for YAML workflow generation"
    },
    {
      key: "BACK-1737",
      summary: "Multi-Agent Collaboration Patterns",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Automation & Orchestration",
      blockedBy: ["BACK-1734", "BACK-1757", "BACK-1731"],
      description: "Handoff, group chat, hierarchical orchestration with context preservation"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// PR-1564: IDENTITY AND ACCESS MANAGEMENT
// ═══════════════════════════════════════════════════════════════
export const pr1564Data: MilestoneData = {
  key: "PR-1564",
  summary: "Identity and Access Management",
  status: "Planning",
  childCount: 8,
  totalPoints: null,
  primaryPillars: ["Platform"],
  description: "Implement authentication, authorization, and credential management with self-service configuration capabilities. Includes SSO, SCIM provisioning, RBAC, conditional access policies, and secure credential management.",
  businessGoal: "Enable tenant administrators to configure identity and access management through self-service interfaces without requiring DeepSee platform support.",
  children: [
    {
      key: "BACK-1725",
      summary: "Self-Service SSO Configuration",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "SAML 2.0 and OpenID Connect SSO configuration"
    },
    {
      key: "BACK-1729",
      summary: "SCIM User Provisioning",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "SCIM provisioning with Microsoft Entra ID integration"
    },
    {
      key: "BACK-1738",
      summary: "Platform Role-Based Access Control",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Platform role hierarchy (Ops User, Ops Manager, Tech Oversight, Business Manager)"
    },
    {
      key: "BACK-1740",
      summary: "Workspace-Level Access Control",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Workspace-level permissions with tenant isolation"
    },
    {
      key: "BACK-1752",
      summary: "Conditional Access Policies",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Conditional access policies with latency <100ms"
    },
    {
      key: "BACK-1742",
      summary: "Connection Credential Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Secure credential storage for external integrations"
    },
    {
      key: "BACK-1747",
      summary: "Service Identity Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Service identity and managed identity configuration"
    },
    {
      key: "BACK-1755",
      summary: "Audit and Compliance Logging",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Comprehensive audit logging for compliance"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// PR-1565: DATA INGESTION AND CONTENT UNDERSTANDING
// ═══════════════════════════════════════════════════════════════
export const pr1565Data: MilestoneData = {
  key: "PR-1565",
  summary: "Data Ingestion and Content Understanding",
  status: "Planning",
  childCount: 8,
  totalPoints: null,
  primaryPillars: ["Mercury Extraction", "Document Parser"],
  description: "Build the content processing pipeline for ingesting documents, audio, video, and connecting to enterprise data sources. Uses Azure AI Content Understanding for multimodal extraction.",
  businessGoal: "Enable Ops Managers to configure data sources and knowledge bases that agents can access for grounded responses, supporting financial services use cases.",
  children: [
    {
      key: "BACK-1758",
      summary: "Document Ingestion Pipeline",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Document Parser",
      description: "Multi-format document support (PDF, DOCX, XLSX, PPTX, TXT, images)"
    },
    {
      key: "BACK-1732",
      summary: "Multimodal Content Processing",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Document Parser",
      description: "OCR with 98% accuracy target, table extraction including cross-page tables"
    },
    {
      key: "BACK-1736",
      summary: "Enterprise Data Source Connectors",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "SharePoint, Outlook, Microsoft Fabric connectors"
    },
    {
      key: "BACK-1726",
      summary: "Custom Analyzers and Field Extraction",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Mercury Extraction",
      description: "Custom field extraction schemas with confidence scores"
    },
    {
      key: "BACK-1730",
      summary: "Search Index Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Azure AI Search index management"
    },
    {
      key: "BACK-1739",
      summary: "Knowledge Source Configuration",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Knowledge base configuration and management"
    },
    {
      key: "BACK-1750",
      summary: "Ingestion Pipeline Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Pipeline orchestration and monitoring"
    },
    {
      key: "BACK-1753",
      summary: "GraphRAG Knowledge Graph Integration",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "GraphRAG knowledge graph integration for enhanced retrieval"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// PR-1566: OBSERVABILITY AND GOVERNANCE
// ═══════════════════════════════════════════════════════════════
export const pr1566Data: MilestoneData = {
  key: "PR-1566",
  summary: "Observability and Governance",
  status: "Planning",
  childCount: 12,
  totalPoints: null,
  primaryPillars: ["Platform", "Enhanced Agent Reasoning"],
  description: "Implement comprehensive observability, evaluation, safety, and governance capabilities for production AI agent systems.",
  businessGoal: "Ensure production AI agents operate safely, reliably, and within organizational policies.",
  children: [
    {
      key: "BACK-1743",
      summary: "Distributed Tracing Infrastructure",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "OpenTelemetry-based distributed tracing"
    },
    {
      key: "BACK-1748",
      summary: "Performance Monitoring and Dashboards",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Performance dashboards with <5-minute lag"
    },
    {
      key: "BACK-1756",
      summary: "Alerting and Notifications",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Alert delivery within 2 minutes of threshold breach"
    },
    {
      key: "BACK-1741",
      summary: "Agent Quality Evaluation",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "Agent quality metrics and evaluation framework"
    },
    {
      key: "BACK-1733",
      summary: "Content Safety and Guardrails",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "Azure AI Content Safety integration, Prompt Shields for jailbreak detection (95%+ accuracy)"
    },
    {
      key: "BACK-1735",
      summary: "Agent Registry and Lifecycle Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Agentic Engine",
      description: "Agent registry with lifecycle management"
    },
    {
      key: "BACK-1727",
      summary: "AI Red Teaming",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "Red teaming capabilities for agent security testing"
    },
    {
      key: "BACK-1728",
      summary: "Audit Logging and Compliance",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "60-second audit log queryability"
    },
    {
      key: "BACK-1760",
      summary: "Continuous Production Monitoring",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Real-time production monitoring and alerting"
    },
    {
      key: "BACK-1749",
      summary: "Responsible AI Policy Management",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "RAI policy configuration and enforcement"
    },
    {
      key: "BACK-1751",
      summary: "Observability RBAC and Data Visibility",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Platform",
      description: "Role-based access control for observability data"
    },
    {
      key: "BACK-1744",
      summary: "Reinforcement Fine-Tuning Integration",
      type: "Epic",
      status: "To Do",
      points: null,
      pillar: "Enhanced Agent Reasoning",
      description: "RLHF integration for agent improvement"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// BACK-1942: DEEPIQ & DEEPGRAPH - CONTEXT INTELLIGENCE PLATFORM
// ═══════════════════════════════════════════════════════════════
export interface DeepIQTicket {
  key: string;
  summary: string;
  type: 'Epic' | 'Story';
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium';
  parentEpic: string;
  businessCategory: string;
  prdLink: string;
}

export const deepIQTickets: DeepIQTicket[] = [
  {
    key: "BACK-1942",
    summary: "DeepIQ & DeepGraph: Context Intelligence Platform",
    type: "Epic",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1943",
    summary: "DeepGraph: Real-Time Agent Data Ingestion Pipeline",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1944",
    summary: "DeepGraph: Triples-Based Context Graph Data Model",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1945",
    summary: "DeepGraph: Graph Query Engine with Pattern Matching",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1946",
    summary: "DeepIQ: Proactive Insight Engine (Alerts, Anomalies, Patterns)",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1947",
    summary: "DeepIQ: Contextual Insight Display in Existing Interfaces",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1948",
    summary: "DeepIQ: Self-Service Analytics Dashboard",
    type: "Story",
    status: "To Do",
    priority: "Medium",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1949",
    summary: "DeepIQ: Counterfactual \"What-If\" Analysis",
    type: "Story",
    status: "To Do",
    priority: "Medium",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1950",
    summary: "DeepIQ: Complete Decision Trace Logging & Audit Trail",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1951",
    summary: "DeepIQ: Compliance Reporting & Regulatory Export",
    type: "Story",
    status: "To Do",
    priority: "Medium",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  },
  {
    key: "BACK-1952",
    summary: "DeepIQ: Security, Scalability & Infrastructure Requirements",
    type: "Story",
    status: "To Do",
    priority: "High",
    parentEpic: "BACK-1942",
    businessCategory: "DeepIQ (ARTEMIS)",
    prdLink: "https://deepseehq-my.sharepoint.com/:w:/g/personal/ryan_mcqueen_deepsee_ai/IQBUWf7CMc1WQIqKN71_aKKsAfxR0-O8-hUJuPG5pN_egrA?e=wpRP2F"
  }
];

// ═══════════════════════════════════════════════════════════════
// PLATFORM MILESTONES (10 new milestones - replaces old 5 PR-15xx)
// Updated: March 6, 2026
// ═══════════════════════════════════════════════════════════════
export interface PlatformMilestone {
  id: string;
  jiraKey: string;
  name: string;
  label: string;
  description: string;
  status: 'In Progress' | 'Planning' | 'Done' | 'To Do';
  completedStoryPoints: number;
  totalStoryPoints: number;
  remainingStoryPoints: number;
  features: string[];
}

export const platformMilestones: PlatformMilestone[] = [
  {
    id: "ms-knowledge-extraction",
    jiraKey: "PR-1573",
    name: "Knowledge Extraction",
    label: "milestone:knowledge_extraction",
    description: "Document understanding, entity extraction, content classification, Mercury extraction capabilities",
    status: "In Progress",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-reasoning-planning",
    jiraKey: "PR-1574",
    name: "Reasoning and Planning",
    label: "milestone:reasoning_and_planning",
    description: "Agent reasoning chains, decision logic, planning capabilities, enhanced agent reasoning",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-agentic-engine",
    jiraKey: "PR-1572",
    name: "Agentic Engine",
    label: "milestone:agentic_engine",
    description: "Core agent runtime, tool integration framework, agent memory, execution engine",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-integrations",
    jiraKey: "PR-1571",
    name: "Integrations",
    label: "milestone:integrations",
    description: "External system connectivity, API gateways, Fabric integration, partner platform connectors",
    status: "In Progress",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-process-intelligence",
    jiraKey: "PR-1569",
    name: "Process Intelligence (DeepIQ/DeepGraph)",
    label: "milestone:process_intelligence",
    description: "Knowledge graphs, process mining, operational analytics, DeepIQ dashboard, DeepGraph visualization",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-deepsee-blueprints",
    jiraKey: "PR-1570",
    name: "DeepSee Blueprints",
    label: "milestone:deepsee_blueprints",
    description: "Pre-trained agent blueprints — Email Automation, Trade Reconciliation, Security Settlements, SSI, One View, Matching Engine, DeepPilot, Loan Operations, Process Reconciliation",
    status: "In Progress",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-firm-specific-blueprints",
    jiraKey: "PR-1567",
    name: "Firm-Specific Blueprints",
    label: "milestone:firm_specific_blueprints",
    description: "Client-customized agent configurations — Broadridge, DTCC, JP Morgan, Colony Bank, Accenture specific implementations",
    status: "In Progress",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-analyst-workspace",
    jiraKey: "PR-1568",
    name: "Analyst Workspace",
    label: "milestone:analyst_workspace",
    description: "Analyst-facing UI, investigation tools, exception handling workflows, human-in-the-loop interfaces",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-manager-workspace",
    jiraKey: "PR-1575",
    name: "Manager Workspace",
    label: "milestone:manager_workspace",
    description: "Supervisory dashboards, team performance metrics, escalation management, approval workflows",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  },
  {
    id: "ms-technology-workspace",
    jiraKey: "PR-1576",
    name: "Technology Workspace",
    label: "milestone:technology_workspace",
    description: "Platform administration, infrastructure monitoring, deployment management, system configuration",
    status: "Planning",
    completedStoryPoints: 0,
    totalStoryPoints: 0,
    remainingStoryPoints: 0,
    features: []
  }
];

// ═══════════════════════════════════════════════════════════════
// PR-1561: COMPLETE INITIATIVE (Legacy 5-milestone structure)
// ═══════════════════════════════════════════════════════════════
export const pr1561Initiative: InitiativeData = {
  key: "PR-1561",
  summary: "DeepSee Agentic Platform",
  type: "Initiative",
  status: "Backlog",
  reporter: "Konnor Willison",
  totalMilestones: 5,
  totalEpics: 42,
  totalPoints: null,
  milestones: [
    pr1562Data,
    pr1563Data,
    pr1564Data,
    pr1565Data,
    pr1566Data
  ],
  crossMilestoneDependencies: [
    { from: "PR-1562", to: "PR-1563", relationship: "blocks" },
    { from: "PR-1562", to: "PR-1564", relationship: "blocks" },
    { from: "PR-1562", to: "PR-1565", relationship: "blocks" },
    { from: "PR-1562", to: "PR-1566", relationship: "blocks" },
    { from: "PR-1564", to: "PR-1563", relationship: "relates to" },
    { from: "PR-1565", to: "PR-1563", relationship: "relates to" }
  ],
  pillarCoverage: {
    platform: ["PR-1562", "PR-1564", "PR-1566"],
    automationOrchestration: ["PR-1563"],
    mercuryExtraction: ["PR-1565"],
    documentParser: ["PR-1565"],
    bluePrint: ["PR-1563"],
    emailAutomation: [], // GAP
    enhancedAgentReasoning: ["PR-1563", "PR-1565", "PR-1566"],
    agenticEngine: ["PR-1563", "PR-1566"],
    epaAutomatedResolution: [], // GAP
    fabricIntegration: ["PR-1565"]
  },
  gaps: {
    inMilestonesNotInPRDs: [
      "GraphRAG Knowledge Graph Integration",
      "AI Red Teaming",
      "Reinforcement Fine-Tuning Integration",
      "MCP Server Connectors"
    ],
    inPRDsNotInMilestones: [
      "Email Automation",
      "EPA Automated Resolution",
      "Power BI Integration"
    ]
  }
};

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const getInitiativeProgress = (): number => {
  const allEpics = pr1561Initiative.milestones.flatMap(m => m.children);
  const done = allEpics.filter(e => e.status === 'Done').length;
  return Math.round((done / allEpics.length) * 100);
};

export const getMilestoneProgress = (milestoneKey: string): number => {
  const milestone = pr1561Initiative.milestones.find(m => m.key === milestoneKey);
  if (!milestone) return 0;
  const done = milestone.children.filter(e => e.status === 'Done').length;
  return Math.round((done / milestone.children.length) * 100);
};

export const getEpicsByPillar = (pillar: string): EpicData[] => {
  return pr1561Initiative.milestones.flatMap(m =>
    m.children.filter(e => e.pillar === pillar)
  );
};

export const getBlockedEpics = (): EpicData[] => {
  return pr1561Initiative.milestones.flatMap(m =>
    m.children.filter(e => e.blockedBy && e.blockedBy.length > 0)
  );
};

export const getRootDependencies = (): EpicData[] => {
  return pr1561Initiative.milestones.flatMap(m =>
    m.children.filter(e => e.blocks && e.blocks.length > 0 && (!e.blockedBy || e.blockedBy.length === 0))
  );
};

export const getPillarCoverageStatus = (pillar: string): 'full' | 'partial' | 'none' => {
  const coverage = pr1561Initiative.pillarCoverage[pillar];
  if (!coverage || coverage.length === 0) return 'none';
  if (coverage.length >= 2) return 'full';
  return 'partial';
};
