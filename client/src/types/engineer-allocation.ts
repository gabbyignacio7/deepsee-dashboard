// Engineer Allocation Data Types

export interface EngineerTicketData {
  Engineer: string;
  Ticket_ID: string;
  Ticket_Title: string;
  Project: string;
  Status: string;
  Priority: string;
  Story_Points: number | null;
  Days_In_Status: number;
  Epic: string;
  Labels: string;
}

export interface EngineerSummary {
  name: string;
  totalTickets: number;
  totalStoryPoints: number;
  tickets: {
    inProgress: EngineerTicketData[];
    toDo: EngineerTicketData[];
    codeReview: EngineerTicketData[];
    blocked: EngineerTicketData[];
    done: EngineerTicketData[];
  };
  storyPointsByStatus: {
    inProgress: number;
    toDo: number;
    codeReview: number;
    blocked: number;
    done: number;
  };
}

export interface SummaryStats {
  totalEngineers: number;
  totalActiveTickets: number;
  avgStoryPointsPerEngineer: number;
  totalStoryPoints: number;
  estimatedTickets: number;
  notEstimatedTickets: number;
}

export type SortOption = 'storyPoints' | 'ticketCount' | 'nameAsc' | 'nameDesc';
export type StatusFilter = 'All' | 'In Progress' | 'To Do' | 'Code Review' | 'Blocked' | 'Done';
