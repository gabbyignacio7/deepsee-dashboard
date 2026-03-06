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
  lastUpdated: "March 6, 2026, 1:36 PM MT",

  engineers: [
    {
      name: "Lane Terry",
      tickets: [
        {
          id: "BACK-1938",
          title: "Deploy Email Response Generation to BBVA",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1938"
        },
        {
          id: "BACK-1860",
          title: "Mercury - email extraction",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1860"
        }
      ]
    },
    {
      name: "Jeff Hegerhorst",
      tickets: [
        {
          id: "CI-935",
          title: "Transition from GHA to AzDO Pipelines",
          project: "CI",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "Infrastructure",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-935"
        },
        {
          id: "CI-936",
          title: "AzDO Pipelines - Full Implementation",
          project: "CI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "Infrastructure",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-936"
        }
      ]
    },
    {
      name: "Chad Hegerhorst",
      tickets: [
        {
          id: "SC-331",
          title: "[PT34600_19] Insecure Business Logic - Inboxes",
          project: "SC",
          status: "To Do",
          priority: "Critical",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Pentest Remediation",
          labels: "security;pentest",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-331"
        }
      ]
    },
    {
      name: "Ivan Peev",
      tickets: [
        {
          id: "BACK-1805",
          title: "DeepPilot Client & Message Update Integration",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "DeepPilot",
          labels: "stale-cr",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1805"
        },
        {
          id: "BACK-1810",
          title: "Fix SSL Cipher Configuration",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "Security",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1810"
        },
        {
          id: "BACK-1299",
          title: "Single Model Input CLI",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 12,
          epic: "Platform",
          labels: "stale",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1299"
        },
        {
          id: "BACK-1297",
          title: "Single Model Execution Engine",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1297"
        }
      ]
    },
    {
      name: "Darius Ouderkirk",
      tickets: [
        {
          id: "BACK-1911",
          title: "Complete artemis-platform application setup",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1911"
        }
      ]
    },
    {
      name: "Kannal Mutharasu",
      tickets: [
        {
          id: "BACK-1918",
          title: "[Colony] Begin writing GAP Coverage Provider",
          project: "BACK",
          status: "Code Review",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "Colony Bank Allegro",
          labels: "stale-cr",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1918"
        },
        {
          id: "BACK-1965",
          title: "[Colony] Implement auto processing logic",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1965"
        },
        {
          id: "BACK-1862",
          title: "[Colony] Duplicate project for RV loans",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 5,
          epic: "Colony Bank Allegro",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1862"
        },
        {
          id: "BACK-1912",
          title: "API: List users - current project",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1912"
        }
      ]
    },
    {
      name: "Kalvin Willison",
      tickets: [
        {
          id: "BACK-1795",
          title: "Add AccountName2 to DTCC Output",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "DTCC Integration",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1795"
        },
        {
          id: "UI-765",
          title: "Search for subgroup by term value",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Search",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-765"
        }
      ]
    },
    {
      name: "Aleksander Winski",
      tickets: [
        {
          id: "BACK-1795",
          title: "Add AccountName2 to DTCC Output",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "DTCC Integration",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1795"
        },
        {
          id: "BACK-1921",
          title: "[Mercury HITL] Upload CSV & Create Training Set",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1921"
        },
        {
          id: "UI-773",
          title: "Mercury Extraction UI Updates",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 3,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-773"
        }
      ]
    },
    {
      name: "Owen Riley",
      tickets: [
        {
          id: "UI-766",
          title: "Deep Recon - add horizontal scrollbar",
          project: "UI",
          status: "Done",
          priority: "Minor",
          storyPoints: 1,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-766"
        },
        {
          id: "UI-764",
          title: "Deep Recon - Column widths (saved)",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-764"
        },
        {
          id: "UI-763",
          title: "Deep Recon - Filter persistence",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-763"
        },
        {
          id: "UI-762",
          title: "Deep Recon - Sort by Assignee",
          project: "UI",
          status: "Code Review",
          priority: "Minor",
          storyPoints: 1,
          daysInStatus: 1,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-762"
        },
        {
          id: "UI-761",
          title: "Deep Recon - Compact/Comfortable toggle",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-761"
        },
        {
          id: "UI-760",
          title: "Deep Recon - Multi-select actions",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-760"
        },
        {
          id: "UI-759",
          title: "Deep Recon - Keyboard navigation",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-759"
        },
        {
          id: "UI-758",
          title: "Deep Recon - Inline editing",
          project: "UI",
          status: "To Do",
          priority: "Major",
          storyPoints: 1,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-758"
        },
        {
          id: "UI-757",
          title: "Deep Recon - Column reordering",
          project: "UI",
          status: "Done",
          priority: "Minor",
          storyPoints: 1,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-757"
        },
        {
          id: "UI-755",
          title: "Deep Recon - Broadridge aggregated report",
          project: "UI",
          status: "Done",
          priority: "Major",
          storyPoints: 1,
          daysInStatus: 0,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-755"
        }
      ]
    },
    {
      name: "Matthew Snow",
      tickets: [
        {
          id: "UI-740",
          title: "Deep Recon - Add Dropdown List for Assignee",
          project: "UI",
          status: "Blocked",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 5,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-740"
        },
        {
          id: "UI-752",
          title: "Deep Recon - Dashboards Performance",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-752"
        },
        {
          id: "BACK-1908",
          title: "More Granular breakdown cross-project report",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Reporting",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1908"
        }
      ]
    },
    {
      name: "Treven Trujillo",
      tickets: [
        {
          id: "BACK-1603",
          title: "DTCC Sync - extend data from SFDC fields",
          project: "BACK",
          status: "Done",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "DTCC Integration",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1603"
        },
        {
          id: "BACK-1938",
          title: "Deploy Email Response Generation to BBVA",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1938"
        },
        {
          id: "BACK-1940",
          title: "Additional DTCC work",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "DTCC Integration",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1940"
        }
      ]
    },
    {
      name: "Konnor Willison",
      tickets: [
        {
          id: "BACK-1802",
          title: "Create Process Model Schema",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 0,
          epic: "ARTEMIS Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1802"
        }
      ]
    },
    {
      name: "Brandon Baguley",
      tickets: [
        {
          id: "BACK-1792",
          title: "JAVA - Generate/Review Unit Test Markdowns",
          project: "BACK",
          status: "Code Review",
          priority: "Minor",
          storyPoints: 1,
          daysInStatus: 5,
          epic: "Testing",
          labels: "stale-cr",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1792"
        },
        {
          id: "BACK-1964",
          title: "[Mercury HITL] Store extraction method/schema version",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury HITL",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1964"
        }
      ]
    },
    {
      name: "Unassigned",
      tickets: [
        {
          id: "UI-743",
          title: "Deep Recon - Make aggregated report exportable (Broadridge)",
          project: "UI",
          status: "Blocked",
          priority: "Critical",
          storyPoints: null,
          daysInStatus: 1,
          epic: "Broadridge",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-743"
        },
        {
          id: "BACK-1532",
          title: "Fine-tune Mercury Extraction for Sunwest Bank",
          project: "BACK",
          status: "To Do",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "sprint-goal",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1532"
        },
        {
          id: "BACK-1653",
          title: "Sunwest Bank Extraction model fine-tuning",
          project: "BACK",
          status: "To Do",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "sprint-goal",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1653"
        },
        {
          id: "BACK-1311",
          title: "Workflow Template for Single Model",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1311"
        },
        {
          id: "BACK-1300",
          title: "Single Model Output Handler CLI",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Platform",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1300"
        }
      ]
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
