import type { EngineerTicketData } from '@/types/engineer-allocation';

export interface HardcodedEngineerData {
  lastUpdated: string;
  engineers: {
    name: string;
    tickets: Array<{
      id: string;
      title: string;
      project: string;
      status: string;
      priority: string;
      storyPoints: number | null;
      daysInStatus: number;
      epic: string;
      labels: string;
      jiraLink: string;
    }>;
  }[];
}

export const engineerAllocationData: HardcodedEngineerData = {
  lastUpdated: "February 17, 2026, 12:00 PM MT",

  engineers: [
    {
      name: "Lane Terry",
      tickets: [
        {
          id: "BACK-1918",
          title: "Mercury HITL Review Workflow API",
          project: "BACK",
          status: "Code Review",
          priority: "Critical",
          storyPoints: 8,
          daysInStatus: 2,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1918"
        },
        {
          id: "BACK-1900",
          title: "Mercury Extraction Pipeline Optimization",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1900"
        },
        {
          id: "BACK-1810",
          title: "Mercury HITL Data Validation Service",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 8,
          daysInStatus: 14,
          epic: "Mercury HITL",
          labels: "stale",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1810"
        },
        {
          id: "BACK-1895",
          title: "Mercury HITL Exception Queue Handler",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1895"
        },
        {
          id: "BACK-1896",
          title: "Mercury HITL Confidence Threshold Config",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1896"
        },
        {
          id: "BACK-1897",
          title: "Mercury HITL Audit Trail Service",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1897"
        }
      ]
    },
    {
      name: "Jeff Hegerhorst",
      tickets: [
        {
          id: "SC-332",
          title: "Address Container Image Vulnerabilities Wave 3",
          project: "SC",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 1,
          epic: "SC-299 Broadridge Security",
          labels: "security;broadridge-implementation",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-332"
        },
        {
          id: "SC-333",
          title: "Runtime Dependency Security Audit",
          project: "SC",
          status: "To Do",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "SC-299 Broadridge Security",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-333"
        },
        {
          id: "CI-502",
          title: "Kubernetes RBAC Policy Updates",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Infrastructure Security",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-502"
        },
        {
          id: "CI-503",
          title: "Pod Security Standards Enforcement",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Infrastructure Security",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-503"
        }
      ]
    },
    {
      name: "Aleksander Winski",
      tickets: [
        {
          id: "BACK-1910",
          title: "Colony Bank Document Classifier Training",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 2,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1910"
        },
        {
          id: "BACK-1911",
          title: "Colony Bank Loan Doc Type Recognition",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1911"
        },
        {
          id: "BACK-1912",
          title: "ML Model Retraining Pipeline Colony",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1912"
        }
      ]
    },
    {
      name: "Ivan Peev",
      tickets: [
        {
          id: "BACK-1816",
          title: "Agentic Engine Skill Agent Registry",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "Agentic Engine",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1816"
        },
        {
          id: "BACK-1905",
          title: "Agent Outcome Configuration Service",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 1,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1905"
        },
        {
          id: "BACK-1906",
          title: "BluePrint Agent Template Validation",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "BluePrint",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1906"
        }
      ]
    },
    {
      name: "Kannal Mutharasu",
      tickets: [
        {
          id: "BACK-1863",
          title: "Colony Bank Allegro Integration",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1863"
        },
        {
          id: "BACK-1907",
          title: "Mercury Term Extraction Enhancement",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1907"
        },
        {
          id: "BACK-1908",
          title: "Equivalency List Performance Optimization",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "FEEL / Equivalency matching",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1908"
        }
      ]
    },
    {
      name: "Kalvin Willison",
      tickets: [
        {
          id: "BACK-1915",
          title: "Mercury HITL Colony Bank Schema Config",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 1,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1915"
        },
        {
          id: "BACK-1916",
          title: "Dependabot Security Update Batch Feb",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 1,
          epic: "Security Updates",
          labels: "dependabot",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1916"
        },
        {
          id: "BACK-1917",
          title: "Mercury HITL Sunwest Bank Config",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1917"
        }
      ]
    },
    {
      name: "Matthew Snow",
      tickets: [
        {
          id: "UI-755",
          title: "DeepRecon Dashboard v4 Filters",
          project: "UI",
          status: "Code Review",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 2,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-755"
        },
        {
          id: "UI-740",
          title: "Broadridge DeepView Export Formatting",
          project: "UI",
          status: "Blocked",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 4,
          epic: "Broadridge",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-740"
        },
        {
          id: "UI-756",
          title: "DeepRecon Email Thread View Redesign",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-756"
        },
        {
          id: "UI-757",
          title: "DeepRecon Bulk Actions UI",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-757"
        }
      ]
    },
    {
      name: "Treven Trujillo",
      tickets: [
        {
          id: "BACK-1920",
          title: "DTCC Sync Service Enhancement",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 1,
          epic: "DTCC Integration",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1920"
        },
        {
          id: "BACK-1921",
          title: "EPA Workflow Automation Rules Engine",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "EPA Resolution",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1921"
        },
        {
          id: "BACK-1922",
          title: "Deep Pilot Email Triage Improvements",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "DeepPilot",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1922"
        }
      ]
    },
    {
      name: "Owen Riley",
      tickets: [
        {
          id: "UI-750",
          title: "Colony Bank HMDA Upload Interface",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 2,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-750"
        },
        {
          id: "UI-751",
          title: "Work Item Ingestion Dashboard",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Work Item Ingestion",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-751"
        },
        {
          id: "UI-752",
          title: "DeepView Settings Panel Redesign",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 0,
          epic: "DeepView",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-752"
        }
      ]
    },
    {
      name: "Chad Hegerhorst",
      tickets: [
        {
          id: "SC-334",
          title: "Pentest Finding SC-326 Remediation",
          project: "SC",
          status: "To Do",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Pentest Remediation",
          labels: "security;pentest",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-334"
        },
        {
          id: "SC-335",
          title: "Pentest Finding SC-327 Remediation",
          project: "SC",
          status: "To Do",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Pentest Remediation",
          labels: "security;pentest",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-335"
        },
        {
          id: "SC-336",
          title: "Pentest Finding SC-328 Remediation",
          project: "SC",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Pentest Remediation",
          labels: "security;pentest",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-336"
        },
        {
          id: "SC-337",
          title: "Pentest Finding SC-329 Remediation",
          project: "SC",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Pentest Remediation",
          labels: "security;pentest",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-337"
        }
      ]
    },
    {
      name: "Konnor Willison",
      tickets: [
        {
          id: "BACK-1925",
          title: "Mercury HITL Architecture Review",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1925"
        },
        {
          id: "BACK-1926",
          title: "Sunwest Bank Onboarding Technical Plan",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Sunwest Onboarding",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1926"
        }
      ]
    },
    {
      name: "Nadiya",
      tickets: [
        {
          id: "BACK-1930",
          title: "Agentic Engine Skill Agent Testing Framework",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "Agentic Engine",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1930"
        },
        {
          id: "BACK-1931",
          title: "Outcome Reasoning Agent Evaluation Harness",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Outcome Reasoning",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1931"
        }
      ]
    },
    {
      name: "Unassigned",
      tickets: [
        {
          id: "UI-743",
          title: "Broadridge Export Data Formatting",
          project: "UI",
          status: "Blocked",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 6,
          epic: "Broadridge",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-743"
        },
        {
          id: "UI-758",
          title: "DeepPilot Dashboard Analytics View",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "DeepPilot",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-758"
        },
        {
          id: "UI-759",
          title: "Colony Bank Admin Portal",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 0,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-759"
        },
        {
          id: "BACK-1935",
          title: "Workflow Orchestration Event Bus Setup",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1935"
        },
        {
          id: "BACK-1936",
          title: "Data Layer Abstraction Service",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1936"
        },
        {
          id: "BACK-1937",
          title: "Platform Message Bus Configuration",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1937"
        },
        {
          id: "BACK-1938",
          title: "DeepIQ Knowledge Graph Schema",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "DeepIQ",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1938"
        },
        {
          id: "BACK-1939",
          title: "Seven Categories Agent Configuration",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Seven Categories",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1939"
        },
        {
          id: "CI-505",
          title: "CI/CD Pipeline Monitoring Dashboard",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Infrastructure",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-505"
        },
        {
          id: "CI-506",
          title: "Automated Testing Environment Provisioning",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Infrastructure",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-506"
        },
        {
          id: "CI-507",
          title: "Container Registry Cleanup Automation",
          project: "CI",
          status: "To Do",
          priority: "Minor",
          storyPoints: 2,
          daysInStatus: 0,
          epic: "Infrastructure",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-507"
        }
      ]
    },
    {
      name: "Darius Ouderkirk",
      tickets: []
    },
    {
      name: "Loris D'Acunto",
      tickets: []
    },
    {
      name: "Karolina Toman",
      tickets: []
    }
  ]
};

export function getEngineerTicketData(): EngineerTicketData[] {
  const tickets: EngineerTicketData[] = [];

  engineerAllocationData.engineers.forEach(engineer => {
    engineer.tickets.forEach(ticket => {
      tickets.push({
        Engineer: engineer.name,
        Ticket_ID: ticket.id,
        Ticket_Title: ticket.title,
        Project: ticket.project,
        Status: ticket.status,
        Priority: ticket.priority,
        Story_Points: ticket.storyPoints,
        Days_In_Status: ticket.daysInStatus,
        Epic: ticket.epic,
        Labels: ticket.labels
      });
    });
  });

  return tickets;
}
