import type {
  EngineerTicketData,
  EngineerSummary,
  SummaryStats,
  SortOption,
  StatusFilter
} from '@/types/engineer-allocation';

/**
 * Aggregate tickets by engineer
 */
export function aggregateByEngineer(tickets: EngineerTicketData[]): EngineerSummary[] {
  const engineerMap = new Map<string, EngineerSummary>();

  tickets.forEach(ticket => {
    if (!ticket.Engineer || ticket.Engineer.trim() === '') return;

    const engineerName = ticket.Engineer.trim();
    
    if (!engineerMap.has(engineerName)) {
      engineerMap.set(engineerName, {
        name: engineerName,
        totalTickets: 0,
        totalStoryPoints: 0,
        tickets: {
          inProgress: [],
          toDo: [],
          codeReview: [],
          blocked: [],
          done: []
        },
        storyPointsByStatus: {
          inProgress: 0,
          toDo: 0,
          codeReview: 0,
          blocked: 0,
          done: 0
        }
      });
    }

    const engineer = engineerMap.get(engineerName)!;
    engineer.totalTickets++;

    const storyPoints = ticket.Story_Points || 0;
    engineer.totalStoryPoints += storyPoints;

    // Categorize by status
    const status = ticket.Status.toLowerCase();
    if (status.includes('in progress')) {
      engineer.tickets.inProgress.push(ticket);
      engineer.storyPointsByStatus.inProgress += storyPoints;
    } else if (status.includes('to do') || status === 'new') {
      engineer.tickets.toDo.push(ticket);
      engineer.storyPointsByStatus.toDo += storyPoints;
    } else if (status.includes('code review') || status.includes('review')) {
      engineer.tickets.codeReview.push(ticket);
      engineer.storyPointsByStatus.codeReview += storyPoints;
    } else if (status.includes('blocked')) {
      engineer.tickets.blocked.push(ticket);
      engineer.storyPointsByStatus.blocked += storyPoints;
    } else if (status.includes('done') || status.includes('closed') || status.includes('complete')) {
      engineer.tickets.done.push(ticket);
      engineer.storyPointsByStatus.done += storyPoints;
    } else {
      // Default to To Do for unknown statuses
      engineer.tickets.toDo.push(ticket);
      engineer.storyPointsByStatus.toDo += storyPoints;
    }
  });

  return Array.from(engineerMap.values());
}

/**
 * Calculate summary statistics
 */
export function calculateSummaryStats(tickets: EngineerTicketData[]): SummaryStats {
  const uniqueEngineers = new Set(tickets.map(t => t.Engineer).filter(e => e && e.trim() !== ''));
  const activeTickets = tickets.filter(t => 
    !t.Status.toLowerCase().includes('done') && 
    !t.Status.toLowerCase().includes('closed')
  );
  
  // Story_Points of 0 or any number counts as estimated; null/undefined counts as not estimated
  const estimatedTickets = tickets.filter(t => t.Story_Points !== null && t.Story_Points !== undefined);
  const totalStoryPoints = estimatedTickets.reduce((sum, t) => sum + (t.Story_Points || 0), 0);
  
  return {
    totalEngineers: uniqueEngineers.size,
    totalActiveTickets: activeTickets.length,
    avgStoryPointsPerEngineer: uniqueEngineers.size > 0 ? totalStoryPoints / uniqueEngineers.size : 0,
    totalStoryPoints,
    estimatedTickets: estimatedTickets.length,
    notEstimatedTickets: tickets.length - estimatedTickets.length
  };
}

/**
 * Sort engineers based on selected option
 */
export function sortEngineers(
  engineers: EngineerSummary[],
  sortBy: SortOption
): EngineerSummary[] {
  const sorted = [...engineers];
  
  switch (sortBy) {
    case 'storyPoints':
      return sorted.sort((a, b) => b.totalStoryPoints - a.totalStoryPoints);
    case 'ticketCount':
      return sorted.sort((a, b) => b.totalTickets - a.totalTickets);
    case 'nameAsc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

/**
 * Filter engineers by search term
 */
export function filterEngineersBySearch(
  engineers: EngineerSummary[],
  searchTerm: string
): EngineerSummary[] {
  if (!searchTerm.trim()) return engineers;
  
  const lowerSearch = searchTerm.toLowerCase();
  return engineers.filter(eng => eng.name.toLowerCase().includes(lowerSearch));
}

/**
 * Filter engineers by project
 */
export function filterEngineersByProject(
  engineers: EngineerSummary[],
  project: string
): EngineerSummary[] {
  if (project === 'All') return engineers;
  
  return engineers.map(eng => {
    const filteredTickets = Object.entries(eng.tickets).reduce((acc, [status, tickets]) => {
      acc[status as keyof typeof eng.tickets] = tickets.filter(t => t.Project === project);
      return acc;
    }, {} as typeof eng.tickets);
    
    const totalTickets = Object.values(filteredTickets).flat().length;
    const totalStoryPoints = Object.values(filteredTickets).flat()
      .reduce((sum, t) => sum + (t.Story_Points || 0), 0);
    
    return {
      ...eng,
      tickets: filteredTickets,
      totalTickets,
      totalStoryPoints,
      storyPointsByStatus: {
        inProgress: filteredTickets.inProgress.reduce((sum, t) => sum + (t.Story_Points || 0), 0),
        toDo: filteredTickets.toDo.reduce((sum, t) => sum + (t.Story_Points || 0), 0),
        codeReview: filteredTickets.codeReview.reduce((sum, t) => sum + (t.Story_Points || 0), 0),
        blocked: filteredTickets.blocked.reduce((sum, t) => sum + (t.Story_Points || 0), 0),
        done: filteredTickets.done.reduce((sum, t) => sum + (t.Story_Points || 0), 0)
      }
    };
  }).filter(eng => eng.totalTickets > 0);
}

/**
 * Filter engineers by status
 */
export function filterEngineersByStatus(
  engineers: EngineerSummary[],
  status: StatusFilter
): EngineerSummary[] {
  if (status === 'All') return engineers;
  
  const statusKey = status.toLowerCase().replace(/ /g, '') as keyof EngineerSummary['tickets'];
  
  return engineers.map(eng => {
    const filteredTickets = {
      inProgress: status === 'In Progress' ? eng.tickets.inProgress : [],
      toDo: status === 'To Do' ? eng.tickets.toDo : [],
      codeReview: status === 'Code Review' ? eng.tickets.codeReview : [],
      blocked: status === 'Blocked' ? eng.tickets.blocked : [],
      done: status === 'Done' ? eng.tickets.done : []
    };
    
    const totalTickets = Object.values(filteredTickets).flat().length;
    const totalStoryPoints = Object.values(filteredTickets).flat()
      .reduce((sum, t) => sum + (t.Story_Points || 0), 0);
    
    return {
      ...eng,
      tickets: filteredTickets,
      totalTickets,
      totalStoryPoints
    };
  }).filter(eng => eng.totalTickets > 0);
}

/**
 * Filter to show only active engineers (with active tickets)
 */
export function filterActiveEngineers(engineers: EngineerSummary[]): EngineerSummary[] {
  return engineers.filter(eng => {
    const activeTickets = eng.tickets.inProgress.length + 
                         eng.tickets.toDo.length + 
                         eng.tickets.codeReview.length + 
                         eng.tickets.blocked.length;
    return activeTickets > 0;
  });
}

/**
 * Get workload color based on story points
 */
export function getWorkloadColor(storyPoints: number): string {
  if (storyPoints === 0) return '#9CA3AF'; // gray-400
  if (storyPoints <= 20) return '#34D399'; // emerald-400
  if (storyPoints <= 40) return '#FBBF24'; // amber-400
  if (storyPoints <= 60) return '#FB923C'; // orange-400
  return '#F87171'; // red-400
}

/**
 * Get days in status color
 */
export function getDaysInStatusColor(days: number): string {
  if (days < 7) return 'text-green-600';
  if (days < 15) return 'text-yellow-600';
  if (days < 30) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Get priority color
 */
export function getPriorityColor(priority: string): string {
  const p = priority.toLowerCase();
  if (p.includes('blocker')) return '#DC2626'; // red-600
  if (p.includes('critical')) return '#F59E0B'; // amber-500
  if (p.includes('major')) return '#3B82F6'; // blue-500
  if (p.includes('minor')) return '#10B981'; // green-500
  return '#6B7280'; // gray-500
}

/**
 * Get unique projects from tickets
 */
export function getUniqueProjects(tickets: EngineerTicketData[]): string[] {
  const projects = new Set(tickets.map(t => t.Project).filter(p => p && p.trim() !== ''));
  return ['All', ...Array.from(projects).sort()];
}
