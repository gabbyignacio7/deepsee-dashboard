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
  lastUpdated: "January 5, 2026 4:00 AM MT",
  
  engineers: [
    {
      name: "Lane Terry",
      tickets: [
        {
          id: "BACK-1542",
          title: "Deploy v3 API to Accenture & Demo",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 5,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1542"
        },
        {
          id: "BACK-1308",
          title: "Get Message Details API",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 12,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1308"
        },
        {
          id: "BACK-1307",
          title: "Get Messages API",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 12,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1307"
        },
        {
          id: "BACK-1304",
          title: "Messages API",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 19,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1304"
        },
        {
          id: "BACK-1224",
          title: "Research and plan major scalability refactor",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 66,
          epic: "Broadridge Scalability",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1224"
        },
        {
          id: "BACK-1430",
          title: "ArrayIndexOutOfBounds Processing Actors",
          project: "BACK",
          status: "To Do",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1430"
        },
        {
          id: "BACK-1196",
          title: "Fix email status synchronization between Outlook and DeepView",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 13,
          daysInStatus: 82,
          epic: "Broadridge Scalability",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1196"
        },
        {
          id: "BACK-1126",
          title: "Auto Annotate SSI",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1126"
        }
      ]
    },
    {
      name: "Jeff Hegerhorst",
      tickets: [
        {
          id: "SC-304",
          title: "Address Kafka Vulnerabilities (60 C+H)",
          project: "SC",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 8,
          daysInStatus: 5,
          epic: "SC-299 Broadridge Security",
          labels: "security;broadridge-implementation",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-304"
        },
        {
          id: "SC-305",
          title: "Address NATS Vulnerabilities (26 C+H)",
          project: "SC",
          status: "Code Review",
          priority: "Critical",
          storyPoints: 8,
          daysInStatus: 9,
          epic: "SC-299 Broadridge Security",
          labels: "security;broadridge-implementation",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-305"
        },
        {
          id: "SC-306",
          title: "Address Argo Events Vulnerabilities (22 C+H)",
          project: "SC",
          status: "Code Review",
          priority: "Critical",
          storyPoints: 8,
          daysInStatus: 9,
          epic: "SC-299 Broadridge Security",
          labels: "security;broadridge-implementation",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-306"
        },
        {
          id: "CI-286",
          title: "[Placeholder] Remaining Lambdas",
          project: "CI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 22,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-286"
        },
        {
          id: "FB-786",
          title: "Set up separate PROD/non-PROD Azure accounts",
          project: "FB",
          status: "Blocked",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 15,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/FB-786"
        },
        {
          id: "CI-481",
          title: "Messages can be Developed Locally",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-481"
        },
        {
          id: "CI-283",
          title: "Add database provisioning to the tiltfile",
          project: "CI",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/CI-283"
        }
      ]
    },
    {
      name: "Aleksander Winski",
      tickets: [
        {
          id: "BACK-1562",
          title: "Include new terms in Preprocessor Prediction",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1562"
        },
        {
          id: "BACK-1521",
          title: "Integrate SubCategory Model Calls into Prediction",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 10,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1521"
        },
        {
          id: "BACK-1099",
          title: "[BE][SSLException] when connecting to prediction service",
          project: "BACK",
          status: "To Do",
          priority: "Critical",
          storyPoints: 13,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1099"
        }
      ]
    },
    {
      name: "Darius Ouderkirk",
      tickets: [
        {
          id: "BACK-1382",
          title: "Export for Vantage Commercial Lending Work Items",
          project: "BACK",
          status: "In Progress",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 35,
          epic: "Regional Banks Onboarding",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1382"
        },
        {
          id: "BACK-1501",
          title: "Content Maps for the specific products",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 15,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1501"
        },
        {
          id: "BACK-1484",
          title: "Attachments from salesforce case emails",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 12,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1484"
        },
        {
          id: "BACK-882",
          title: "Update Classifier and DeepRecon API services",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 45,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-882"
        },
        {
          id: "BACK-1117",
          title: "Implement intent-agent logic in the extractor-service",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 13,
          daysInStatus: 44,
          epic: "Migrate Intent Agent to Extractor Service",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1117"
        },
        {
          id: "PABE-582",
          title: "Call shared action from deployment jobs",
          project: "PABE",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/PABE-582"
        },
        {
          id: "BACK-986",
          title: "Design and implement enterprise-grade database",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 13,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-986"
        }
      ]
    },
    {
      name: "Ivan Peev",
      tickets: [
        {
          id: "BACK-1322",
          title: "ML Models API",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1322"
        },
        {
          id: "BACK-1320",
          title: "Inboxes/Data Sources API",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1320"
        },
        {
          id: "BACK-1318",
          title: "Counterparties API",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 5,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1318"
        },
        {
          id: "BACK-1319",
          title: "Datasets API",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 0,
          epic: "DeepRecon API",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1319"
        }
      ]
    },
    {
      name: "Kannal Mutharasu",
      tickets: [
        {
          id: "BACK-1560",
          title: "BBVA Reconciliation Output",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1560"
        },
        {
          id: "BACK-1526",
          title: "Create new term type for checkbox extraction",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 10,
          epic: "Regional Banks Onboarding",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1526"
        },
        {
          id: "BACK-1468",
          title: "Use equivalency lists on full strings",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 18,
          epic: "FEEL / Equivalency matching",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1468"
        },
        {
          id: "BACK-1540",
          title: "Deep Pilot - unexisting extractions are shown",
          project: "BACK",
          status: "Code Review",
          priority: "Critical",
          storyPoints: 3,
          daysInStatus: 2,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1540"
        },
        {
          id: "BACK-1527",
          title: "Populate the values for checkbox terms",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1527"
        }
      ]
    },
    {
      name: "Kalvin Willison",
      tickets: [
        {
          id: "BACK-1489",
          title: "Update classification-api Base Image to Ubuntu 24.04 LTS",
          project: "BACK",
          status: "Blocked",
          priority: "Major",
          storyPoints: 1,
          daysInStatus: 4,
          epic: "Security Updates",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1489"
        },
        {
          id: "BACK-1580",
          title: "Update dependencies: Review 8 Dependabot PRs",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 2,
          epic: "",
          labels: "dependabot",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1580"
        },
        {
          id: "BACK-1586",
          title: "Update node-forge from 1.3.1 to 1.3.3",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 2,
          epic: "",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1586"
        },
        {
          id: "BACK-1591",
          title: "More Feedback: Mercury Extraction for Colony Bank",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 1,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1591"
        },
        {
          id: "BACK-1578",
          title: "Feedback: Mercury Extraction for Colony Bank",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 3,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1578"
        },
        {
          id: "BACK-1589",
          title: "Update starlette from 0.45.3 to 0.49.1",
          project: "BACK",
          status: "Code Review",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 2,
          epic: "",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1589"
        },
        {
          id: "BACK-1570",
          title: "Test HMDA Mercury Extraction End-to-End",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1570"
        },
        {
          id: "BACK-1494",
          title: "Update promethia-api Base Image",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Security Updates",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1494"
        },
        {
          id: "BACK-1493",
          title: "Update workflows-python-executor Base Image",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Security Updates",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1493"
        },
        {
          id: "BACK-1492",
          title: "Update workflows-events-consumer Base Image",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Security Updates",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1492"
        },
        {
          id: "BACK-1588",
          title: "Dependabot update",
          project: "BACK",
          status: "Done",
          priority: "Minor",
          storyPoints: null,
          daysInStatus: 0,
          epic: "",
          labels: "dependabot",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1588"
        },
        {
          id: "BACK-1587",
          title: "Update urllib3",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "",
          labels: "security",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1587"
        },
        {
          id: "BACK-1575",
          title: "Enhance Mercury Extraction Schema Parameters",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1575"
        },
        {
          id: "BACK-1564",
          title: "Setup Colony HMDA Mercury Extraction Schema",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1564"
        }
      ]
    },
    {
      name: "Loris D'Acunto",
      tickets: [
        {
          id: "NSI-41",
          title: "Dataset Normalization (Software)",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 26,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-41"
        },
        {
          id: "NSI-23",
          title: "Change Message-ID domains and References",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 23,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-23"
        },
        {
          id: "NSI-20",
          title: "Anonymization of sender and receivers",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 29,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-20"
        },
        {
          id: "NSI-19",
          title: "Header Anonymization",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 31,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-19"
        },
        {
          id: "NSI-17",
          title: "Dataset Normalization",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 36,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-17"
        },
        {
          id: "NSI-10",
          title: "Set Up",
          project: "NSI",
          status: "In Progress",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 50,
          epic: "Data Anonymization",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/NSI-10"
        }
      ]
    },
    {
      name: "Chad Hegerhorst",
      tickets: [
        {
          id: "SC-303",
          title: "Address mlrig-box-to-tokens Vulnerabilities (80 C+H)",
          project: "SC",
          status: "Done",
          priority: "Critical",
          storyPoints: 5,
          daysInStatus: 2,
          epic: "Wave 1 Security",
          labels: "security,wave1",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-303"
        },
        {
          id: "SC-311",
          title: "Address core-service vulnerabilities",
          project: "SC",
          status: "To Do",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 0,
          epic: "Wave 2 Security",
          labels: "security,wave2",
          jiraLink: "https://deepsee.atlassian.net/browse/SC-311"
        }
      ]
    },
    {
      name: "Matthew Snow",
      tickets: [
        {
          id: "UI-690",
          title: "DeepRecon Dashboard Updates",
          project: "UI",
          status: "Done",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 1,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-690"
        },
        {
          id: "UI-701",
          title: "DeepRecon Filter Improvements",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 2,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-701"
        }
      ]
    },
    {
      name: "Treven Trujillo",
      tickets: [
        {
          id: "BACK-760",
          title: "Implement RBAC for Message Endpoints",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 3,
          epic: "RBAC",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-760"
        },
        {
          id: "BACK-826",
          title: "Update Completed tab filter to include Emails moved to a Folder",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 2,
          epic: "",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-826"
        },
        {
          id: "BACK-1545",
          title: "Deep Pilot - Email Processing Optimization",
          project: "BACK",
          status: "In Progress",
          priority: "Major",
          storyPoints: 5,
          daysInStatus: 4,
          epic: "DeepPilot",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1545"
        }
      ]
    },
    {
      name: "Owen Riley",
      tickets: [
        {
          id: "UI-429",
          title: "DeepRecon - Disable Mark Complete option for completed emails",
          project: "UI",
          status: "Done",
          priority: "Major",
          storyPoints: 2,
          daysInStatus: 2,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-429"
        },
        {
          id: "UI-431",
          title: "DeepRecon - View Email Page - Add Flagged / Not Flagged options",
          project: "UI",
          status: "Done",
          priority: "Major",
          storyPoints: 1,
          daysInStatus: 2,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-431"
        },
        {
          id: "UI-445",
          title: "DeepRecon - Dashboard Polish",
          project: "UI",
          status: "In Progress",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 3,
          epic: "DeepRecon",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/UI-445"
        }
      ]
    },
    {
      name: "Konnor Willison",
      tickets: [
        {
          id: "BACK-1565",
          title: "Mercury Extraction - Colony Bank Configuration",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1565"
        },
        {
          id: "BACK-1566",
          title: "Mercury Extraction - Sunwest Bank Configuration",
          project: "BACK",
          status: "To Do",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 0,
          epic: "Mercury Extraction",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1566"
        }
      ]
    },
    {
      name: "Nadiya",
      tickets: [
        {
          id: "BACK-1117",
          title: "Implement intent-agent logic in extractor-service",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: 8,
          daysInStatus: 3,
          epic: "Extractor",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1117"
        },
        {
          id: "BACK-1540",
          title: "Deep Pilot - unexisting extractions shown on Email Request",
          project: "BACK",
          status: "Done",
          priority: "Major",
          storyPoints: null,
          daysInStatus: 2,
          epic: "DeepPilot",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/BACK-1540"
        },
        {
          id: "FB-2409",
          title: "Train models for subcategories for Accenture",
          project: "FB",
          status: "Done",
          priority: "Major",
          storyPoints: 3,
          daysInStatus: 2,
          epic: "ML Training",
          labels: "",
          jiraLink: "https://deepsee.atlassian.net/browse/FB-2409"
        }
      ]
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
