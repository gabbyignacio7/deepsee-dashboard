import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
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
  status: "Done" | "In Progress" | "To Do" | "Code Review" | "In Testing";
  assignee: string;
  storyPoints?: number | null;
  client?: string;
  updated: string;
}

const mercuryTickets: MercuryTicket[] = [
  {
    key: "BACK-1645",
    summary: "Feedback: Mercury Extraction for HMDA",
    status: "In Progress",
    assignee: "Kalvin Willison",
    storyPoints: 3,
    client: "Colony Bank",
    updated: "2025-12-29"
  },
  {
    key: "BACK-1532",
    summary: "Fine-tune Mercury Extraction for Sunwest",
    status: "In Progress",
    assignee: "Konnor Willison",
    storyPoints: 5,
    client: "Sunwest",
    updated: "2025-12-29"
  },
  {
    key: "BACK-1591",
    summary: "More Feedback: Mercury Extraction for Colony",
    status: "Done",
    assignee: "Kalvin Willison",
    storyPoints: 2,
    client: "Colony Bank",
    updated: "2025-12-28"
  },
  {
    key: "BACK-1578",
    summary: "Feedback: Mercury Extraction for Colony Bank",
    status: "Done",
    assignee: "Kalvin Willison",
    storyPoints: 2,
    client: "Colony Bank",
    updated: "2025-12-27"
  }
];

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

export default function MercuryExtractionSection() {
  const metrics = useMemo(() => {
    const total = mercuryTickets.length;
    const done = mercuryTickets.filter(t => t.status === "Done").length;
    const inProgress = mercuryTickets.filter(t => ["In Progress", "Code Review", "In Testing"].includes(t.status)).length;
    const toDo = mercuryTickets.filter(t => t.status === "To Do").length;
    return {
      total,
      done,
      inProgress,
      toDo,
      completionPercent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }, []);

  const activeClients = useMemo(() => {
    const clients = new Set(mercuryTickets.map(t => t.client).filter(Boolean));
    return Array.from(clients).join(", ");
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
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sprint S2 Completion</span>
            <span className="font-semibold">{metrics.completionPercent}%</span>
          </div>
          <Progress value={metrics.completionPercent} className="h-3" />
        </div>

        <div className="grid grid-cols-4 gap-4">
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
        </div>

        <div className="border rounded-lg overflow-hidden">
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
              {mercuryTickets.map((ticket) => (
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

        <div className="pt-4 border-t flex justify-between items-center flex-wrap gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Active Clients:</span> {activeClients || "None"}, BBVA
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Lead:</span> Kalvin Willison
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
