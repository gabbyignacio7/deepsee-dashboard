import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDaysInStatusColor, getPriorityColor } from '@/lib/engineer-utils';
import type { EngineerSummary, EngineerTicketData } from '@/types/engineer-allocation';

interface EngineerDetailsProps {
  engineers: EngineerSummary[];
  expandedEngineer: string | null;
  onToggleExpand: (engineerName: string) => void;
}

export default function EngineerDetails({ engineers, expandedEngineer, onToggleExpand }: EngineerDetailsProps) {
  if (engineers.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No engineers to display</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Detailed Breakdown</h2>
      
      {engineers.map(engineer => (
        <EngineerCard
          key={engineer.name}
          engineer={engineer}
          isExpanded={expandedEngineer === engineer.name}
          onToggle={() => onToggleExpand(engineer.name)}
        />
      ))}
    </div>
  );
}

interface EngineerCardProps {
  engineer: EngineerSummary;
  isExpanded: boolean;
  onToggle: () => void;
}

function EngineerCard({ engineer, isExpanded, onToggle }: EngineerCardProps) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover-elevate active-elevate-2 text-left"
        data-testid={`engineer-card-${engineer.name.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
          <div>
            <h3 className="font-semibold text-lg">{engineer.name}</h3>
            <p className="text-sm text-muted-foreground">
              {engineer.totalTickets} tickets, {engineer.totalStoryPoints} story points
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {engineer.tickets.blocked.length > 0 && (
            <Badge variant="destructive" data-testid={`badge-blocked-${engineer.name}`}>
              {engineer.tickets.blocked.length} Blocked
            </Badge>
          )}
          {engineer.tickets.inProgress.length > 0 && (
            <Badge className="bg-blue-500" data-testid={`badge-in-progress-${engineer.name}`}>
              {engineer.tickets.inProgress.length} In Progress
            </Badge>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t p-4 space-y-4 bg-muted/30">
          {engineer.tickets.inProgress.length > 0 && (
            <StatusSection
              title="In Progress"
              tickets={engineer.tickets.inProgress}
              storyPoints={engineer.storyPointsByStatus.inProgress}
              color="blue"
            />
          )}
          
          {engineer.tickets.blocked.length > 0 && (
            <StatusSection
              title="Blocked"
              tickets={engineer.tickets.blocked}
              storyPoints={engineer.storyPointsByStatus.blocked}
              color="red"
            />
          )}
          
          {engineer.tickets.codeReview.length > 0 && (
            <StatusSection
              title="Code Review"
              tickets={engineer.tickets.codeReview}
              storyPoints={engineer.storyPointsByStatus.codeReview}
              color="purple"
            />
          )}
          
          {engineer.tickets.toDo.length > 0 && (
            <StatusSection
              title="To Do"
              tickets={engineer.tickets.toDo}
              storyPoints={engineer.storyPointsByStatus.toDo}
              color="gray"
            />
          )}
          
          {engineer.tickets.done.length > 0 && (
            <StatusSection
              title="Done"
              tickets={engineer.tickets.done}
              storyPoints={engineer.storyPointsByStatus.done}
              color="green"
            />
          )}
        </div>
      )}
    </Card>
  );
}

interface StatusSectionProps {
  title: string;
  tickets: EngineerTicketData[];
  storyPoints: number;
  color: 'blue' | 'red' | 'purple' | 'gray' | 'green';
}

function StatusSection({ title, tickets, storyPoints, color }: StatusSectionProps) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400',
    gray: 'text-gray-600 dark:text-gray-400',
    green: 'text-green-600 dark:text-green-400'
  };

  return (
    <div className="space-y-2">
      <h4 className={`font-semibold ${colorClasses[color]}`}>
        {title} ({tickets.length}): {storyPoints} pts
      </h4>
      
      <div className="space-y-2">
        {tickets.map(ticket => (
          <TicketRow key={ticket.Ticket_ID} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

interface TicketRowProps {
  ticket: EngineerTicketData;
}

function TicketRow({ ticket }: TicketRowProps) {
  const jiraUrl = `https://deepsee.atlassian.net/browse/${ticket.Ticket_ID}`;
  const daysColor = getDaysInStatusColor(ticket.Days_In_Status);
  const priorityColor = getPriorityColor(ticket.Priority);

  return (
    <div 
      className="flex items-start gap-3 p-3 bg-card rounded-lg border"
      data-testid={`ticket-${ticket.Ticket_ID}`}
    >
      {/* Priority indicator */}
      <div 
        className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
        style={{ backgroundColor: priorityColor }}
        title={ticket.Priority}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <a
            href={jiraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline inline-flex items-center gap-1"
            data-testid={`link-${ticket.Ticket_ID}`}
          >
            {ticket.Ticket_ID}
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-sm text-muted-foreground truncate">
            {ticket.Ticket_Title}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {ticket.Story_Points !== null && (
            <Badge variant="secondary" className="text-xs">
              {ticket.Story_Points} pts
            </Badge>
          )}
          {ticket.Story_Points === null && (
            <Badge variant="secondary" className="text-xs">
              No estimate
            </Badge>
          )}
          <span className={`text-xs ${daysColor}`}>
            {ticket.Days_In_Status} days in status
          </span>
          {ticket.Epic && (
            <span className="text-xs text-muted-foreground truncate max-w-xs">
              Epic: {ticket.Epic}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
