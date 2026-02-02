import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, FileText, CheckCircle2, Clock, AlertCircle, Star, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MercuryTicket {
  key: string;
  summary: string;
  type: "Epic" | "Story";
  status: "Done" | "In Progress" | "To Do" | "Code Review" | "In Testing";
  assignee: string;
  storyPoints?: number | null;
  client?: string;
  updated: string;
  parent?: string;
  arrAtRisk?: string;
  priority?: "High" | "Medium" | "Low";
}

// New PRD tickets for Sprint 2026-S1
const mercuryPRDTickets: MercuryTicket[] = [
  {
    key: "BACK-1650",
    summary: "Mercury Extraction - Unified Document Service",
    type: "Epic",
    status: "To Do",
    assignee: "Unassigned",
    storyPoints: null,
    client: "Colony Bank, Sunwest Bank, BBVA",
    updated: "2026-01-01",
    priority: "High"
  },
  {
    key: "BACK-1651",
    summary: "Core extraction engine performance optimization",
    type: "Story",
    status: "To Do",
    assignee: "Konnor Willison",
    storyPoints: 8,
    client: "Colony Bank, Sunwest Bank",
    updated: "2026-01-01",
    parent: "BACK-1650",
    arrAtRisk: "$350K",
    priority: "High"
  },
  {
    key: "BACK-1652",
    summary: "Colony Bank - HMDA schema validation",
    type: "Story",
    status: "To Do",
    assignee: "Kalvin Willison",
    storyPoints: 5,
    client: "Colony Bank",
    updated: "2026-01-01",
    parent: "BACK-1650",
    arrAtRisk: "$200K",
    priority: "High"
  },
  {
    key: "BACK-1653",
    summary: "Sunwest Bank - Extraction model fine-tuning",
    type: "Story",
    status: "To Do",
    assignee: "Gabriel Ignacio",
    storyPoints: 5,
    client: "Sunwest Bank",
    updated: "2026-01-01",
    parent: "BACK-1650",
    arrAtRisk: "$150K",
    priority: "High"
  },
  {
    key: "BACK-1654",
    summary: "BBVA - Term type extraction",
    type: "Story",
    status: "To Do",
    assignee: "Unassigned",
    storyPoints: 3,
    client: "BBVA",
    updated: "2026-01-01",
    parent: "BACK-1650",
    priority: "Medium"
  },
  {
    key: "BACK-1655",
    summary: "API documentation and developer guide",
    type: "Story",
    status: "To Do",
    assignee: "Konnor Willison",
    storyPoints: 3,
    updated: "2026-01-01",
    parent: "BACK-1650",
    priority: "Low"
  }
];

// Existing production tickets
const mercuryProductionTickets: MercuryTicket[] = [
  {
    key: "BACK-1645",
    summary: "Feedback: Mercury Extraction for HMDA",
    type: "Story",
    status: "In Progress",
    assignee: "Kalvin Willison",
    storyPoints: 3,
    client: "Colony Bank",
    updated: "2025-12-29"
  },
  {
    key: "BACK-1532",
    summary: "Fine-tune Mercury Extraction for Sunwest",
    type: "Story",
    status: "In Progress",
    assignee: "Konnor Willison",
    storyPoints: 5,
    client: "Sunwest Bank",
    updated: "2025-12-29"
  },
  {
    key: "BACK-1591",
    summary: "More Feedback: Mercury Extraction for Colony",
    type: "Story",
    status: "Done",
    assignee: "Kalvin Willison",
    storyPoints: 2,
    client: "Colony Bank",
    updated: "2025-12-28"
  },
  {
    key: "BACK-1578",
    summary: "Feedback: Mercury Extraction for Colony Bank",
    type: "Story",
    status: "Done",
    assignee: "Kalvin Willison",
    storyPoints: 2,
    client: "Colony Bank",
    updated: "2025-12-27"
  },
  {
    key: "BACK-1531",
    summary: "Mercury extraction work - Initial Setup",
    type: "Story",
    status: "Done",
    assignee: "Konnor Willison",
    storyPoints: 3,
    client: "Colony Bank",
    updated: "2025-12-20"
  }
];

// Combine all tickets
const allMercuryTickets = [...mercuryPRDTickets, ...mercuryProductionTickets];

function StatusBadge({ status }: { status: MercuryTicket["status"] }) {
  const styles = {
    "Done": "bg-green-100 text-green-700 border-green-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    "To Do": "bg-gray-100 text-gray-700 border-gray-200",
    "Code Review": "bg-purple-100 text-purple-700 border-purple-200",
    "In Testing": "bg-yellow-100 text-yellow-700 border-yellow-200"
  };

  const icons = {
    "Done": <CheckCircle2 className="w-3 h-3" />,
    "In Progress": <Clock className="w-3 h-3" />,
    "To Do": <AlertCircle className="w-3 h-3" />,
    "Code Review": <FileText className="w-3 h-3" />,
    "In Testing": <Clock className="w-3 h-3" />
  };

  return (
    <Badge variant="outline" className={`text-xs flex items-center gap-1 ${styles[status]}`}>
      {icons[status]}
      {status}
    </Badge>
  );
}

function TypeBadge({ type }: { type: MercuryTicket["type"] }) {
  const styles = {
    "Epic": "bg-purple-100 text-purple-700 border-purple-200",
    "Story": "bg-blue-50 text-blue-600 border-blue-100"
  };

  return (
    <Badge variant="outline" className={`text-xs ${styles[type]}`}>
      {type === "Epic" && <Star className="w-3 h-3 mr-1" />}
      {type}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority?: string }) {
  if (!priority) return null;

  const styles: Record<string, string> = {
    "High": "bg-red-100 text-red-700 border-red-200",
    "Medium": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Low": "bg-gray-100 text-gray-600 border-gray-200"
  };

  return (
    <Badge variant="outline" className={`text-xs ${styles[priority] || ''}`}>
      {priority}
    </Badge>
  );
}

export default function MercuryExtractionSection() {
  const metrics = useMemo(() => {
    const total = allMercuryTickets.length;
    const done = allMercuryTickets.filter(t => t.status === "Done").length;
    const inProgress = allMercuryTickets.filter(t => ["In Progress", "Code Review", "In Testing"].includes(t.status)).length;
    const toDo = allMercuryTickets.filter(t => t.status === "To Do").length;

    // PRD tickets only (for story points)
    const prdPoints = mercuryPRDTickets
      .filter(t => t.storyPoints)
      .reduce((sum, t) => sum + (t.storyPoints || 0), 0);

    return {
      total,
      done,
      inProgress,
      toDo,
      prdPoints,
      completionPercent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }, []);

  const assigneeSummary = useMemo(() => {
    const summary: Record<string, number> = {};
    mercuryPRDTickets.forEach(t => {
      const name = t.assignee || "Unassigned";
      summary[name] = (summary[name] || 0) + 1;
    });
    return summary;
  }, []);

  const jiraFilterUrl = "https://deepsee.atlassian.net/issues/?jql=project%20in%20(BACK%2C%20UI)%20AND%20(summary%20~%20%27Mercury%27%20OR%20labels%20%3D%20%27Mercury%27)";

  return (
    <Card className="mt-6" data-testid="card-mercury-extraction">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <CardTitle className="text-xl">Mercury Extraction</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Document extraction service for loan packages and financial documents
              </p>
            </div>
          </div>
          <a
            href={jiraFilterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            data-testid="link-mercury-jira"
          >
            View in JIRA
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ARR At Risk Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-800">$350K+ ARR at Risk</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Colony Bank ($200K), Sunwest Bank ($150K), BBVA (expansion opportunity)
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-semibold">{metrics.completionPercent}%</span>
          </div>
          <Progress value={metrics.completionPercent} className="h-3" />
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg border" data-testid="metric-mercury-total">
            <p className="text-3xl font-bold text-gray-800">{metrics.total}</p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100" data-testid="metric-mercury-done">
            <p className="text-3xl font-bold text-green-600">{metrics.done}</p>
            <p className="text-xs text-muted-foreground mt-1">Done</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100" data-testid="metric-mercury-in-progress">
            <p className="text-3xl font-bold text-blue-600">{metrics.inProgress}</p>
            <p className="text-xs text-muted-foreground mt-1">In Progress</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border" data-testid="metric-mercury-todo">
            <p className="text-3xl font-bold text-gray-500">{metrics.toDo}</p>
            <p className="text-xs text-muted-foreground mt-1">To Do</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100" data-testid="metric-mercury-points">
            <p className="text-3xl font-bold text-purple-600">{metrics.prdPoints}</p>
            <p className="text-xs text-muted-foreground mt-1">PRD Points</p>
          </div>
        </div>

        {/* PRD Epic and Stories Section */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 px-4 py-2 border-b">
            <h3 className="font-semibold text-purple-900 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Sprint 2026-S1 PRD Tickets (24 Story Points)
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium w-[100px]">Ticket</TableHead>
                <TableHead className="font-medium w-[60px]">Type</TableHead>
                <TableHead className="font-medium">Summary</TableHead>
                <TableHead className="font-medium w-[80px]">Status</TableHead>
                <TableHead className="font-medium w-[80px]">Priority</TableHead>
                <TableHead className="font-medium w-[120px]">Assignee</TableHead>
                <TableHead className="font-medium w-[50px]">Pts</TableHead>
                <TableHead className="font-medium w-[100px]">Client</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mercuryPRDTickets.map((ticket) => (
                <TableRow
                  key={ticket.key}
                  data-testid={`row-mercury-${ticket.key}`}
                  className={ticket.type === "Epic" ? "bg-purple-50/50" : ticket.parent ? "bg-white" : ""}
                >
                  <TableCell>
                    <a
                      href={`https://deepsee.atlassian.net/browse/${ticket.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                      data-testid={`link-mercury-ticket-${ticket.key}`}
                    >
                      {ticket.parent && <span className="text-gray-400 mr-1">└</span>}
                      {ticket.key}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={ticket.type} />
                  </TableCell>
                  <TableCell className="text-sm max-w-[250px]" title={ticket.summary}>
                    <div className="truncate">{ticket.summary}</div>
                    {ticket.arrAtRisk && (
                      <span className="text-xs text-red-600 font-medium">ARR: {ticket.arrAtRisk}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ticket.assignee}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-center">
                    {ticket.storyPoints || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate" title={ticket.client}>
                    {ticket.client || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Production/Existing Work Section */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2 border-b">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Related Production Work
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Ticket</TableHead>
                <TableHead className="font-medium">Summary</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Assignee</TableHead>
                <TableHead className="font-medium">Client</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mercuryProductionTickets.map((ticket) => (
                <TableRow key={ticket.key} data-testid={`row-mercury-${ticket.key}`}>
                  <TableCell>
                    <a
                      href={`https://deepsee.atlassian.net/browse/${ticket.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                      data-testid={`link-mercury-ticket-${ticket.key}`}
                    >
                      {ticket.key}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-sm max-w-[300px] truncate" title={ticket.summary}>
                    {ticket.summary}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ticket.assignee}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ticket.client || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Assignee Summary */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium mb-2">PRD Ticket Assignees:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(assigneeSummary).map(([name, count]) => (
                  <Badge key={name} variant="secondary" className="text-xs">
                    {name}: {count}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Tech Lead:</span> Kalvin Willison
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Last Updated:</span> February 1, 2026, 7:30 PM MT
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
