import { useState, useMemo, useRef } from 'react';
import SummaryCards from './SummaryCards';
import FilterBar from './FilterBar';
import WorkloadChart from './WorkloadChart';
import EngineerDetails from './EngineerDetails';
import { Button } from '@/components/ui/button';
import { Download, Clock } from 'lucide-react';
import {
  aggregateByEngineer,
  calculateSummaryStats,
  sortEngineers,
  filterEngineersBySearch,
  filterEngineersByProject,
  filterEngineersByStatus,
  filterActiveEngineers,
  getUniqueProjects
} from '@/lib/engineer-utils';
import type { SortOption, StatusFilter } from '@/types/engineer-allocation';
import { getEngineerTicketData, engineerAllocationData } from '@/data/engineerAllocationData';

export default function EngineerAllocation() {
  const ticketData = getEngineerTicketData();
  const lastUpdated = "February 9, 2026, 10:14 AM MT";
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('storyPoints');
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [expandedEngineer, setExpandedEngineer] = useState<string | null>(null);
  
  const engineerRefs = useRef<Map<string, HTMLDivElement>>(new Map());


  const availableProjects = useMemo(() => {
    if (ticketData.length === 0) return ['All'];
    return getUniqueProjects(ticketData);
  }, [ticketData]);

  const filteredEngineers = useMemo(() => {
    if (ticketData.length === 0) return [];

    let engineers = aggregateByEngineer(ticketData);
    
    // Apply filters
    engineers = filterEngineersBySearch(engineers, searchTerm);
    engineers = filterEngineersByProject(engineers, selectedProject);
    engineers = filterEngineersByStatus(engineers, selectedStatus);
    
    if (showActiveOnly) {
      engineers = filterActiveEngineers(engineers);
    }
    
    // Apply sorting
    engineers = sortEngineers(engineers, sortBy);
    
    return engineers;
  }, [ticketData, searchTerm, selectedProject, selectedStatus, sortBy, showActiveOnly]);

  const summaryStats = useMemo(() => {
    if (ticketData.length === 0) {
      return {
        totalEngineers: 0,
        totalActiveTickets: 0,
        avgStoryPointsPerEngineer: 0,
        totalStoryPoints: 0,
        estimatedTickets: 0,
        notEstimatedTickets: 0
      };
    }
    return calculateSummaryStats(ticketData);
  }, [ticketData]);

  const handleBarClick = (engineerName: string) => {
    setExpandedEngineer(engineerName);
    
    // Scroll to engineer details with smooth behavior
    setTimeout(() => {
      const detailsSection = document.querySelector('[data-engineer-details]');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleToggleExpand = (engineerName: string) => {
    setExpandedEngineer(prev => prev === engineerName ? null : engineerName);
  };

  const handleExportCSV = () => {
    if (filteredEngineers.length === 0) {
      console.log('CSV Export: No filtered engineers to export');
      return;
    }

    console.log('CSV Export: Starting export for', filteredEngineers.length, 'engineers');

    // Create CSV content with proper headers and formatted values
    const headers = [
      'Engineer',
      'Total Tickets',
      'Total Story Points',
      'Avg Story Points per Ticket',
      'In Progress Count',
      'In Progress Story Points',
      'To Do Count',
      'To Do Story Points',
      'Code Review Count',
      'Code Review Story Points',
      'Blocked Count',
      'Blocked Story Points',
      'Done Count',
      'Done Story Points'
    ];
    
    const rows = filteredEngineers.map(eng => {
      const avgStoryPoints = eng.totalTickets > 0 
        ? (eng.totalStoryPoints / eng.totalTickets).toFixed(2)
        : '0.00';
      
      return [
        eng.name,
        eng.totalTickets,
        eng.totalStoryPoints.toFixed(2),
        avgStoryPoints,
        eng.tickets.inProgress.length,
        eng.storyPointsByStatus.inProgress.toFixed(2),
        eng.tickets.toDo.length,
        eng.storyPointsByStatus.toDo.toFixed(2),
        eng.tickets.codeReview.length,
        eng.storyPointsByStatus.codeReview.toFixed(2),
        eng.tickets.blocked.length,
        eng.storyPointsByStatus.blocked.toFixed(2),
        eng.tickets.done.length,
        eng.storyPointsByStatus.done.toFixed(2)
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    console.log('CSV Export: Content created, length:', csvContent.length);

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const filename = `engineer-allocation-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    console.log('CSV Export: Creating download link for file:', filename);
    
    document.body.appendChild(link);
    
    // Give the browser a moment to process
    setTimeout(() => {
      link.click();
      console.log('CSV Export: Download link clicked');
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('CSV Export: Cleanup complete');
      }, 100);
    }, 10);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" data-testid="heading-engineer-allocation">
            Engineer Allocation Dashboard
          </h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-muted-foreground">
              Workload distribution across {summaryStats.totalEngineers} engineers
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="last-updated">
              <Clock className="w-4 h-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            data-testid="button-export-csv"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <SummaryCards stats={summaryStats} />

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showActiveOnly={showActiveOnly}
        onShowActiveOnlyChange={setShowActiveOnly}
        availableProjects={availableProjects}
      />

      <WorkloadChart
        engineers={filteredEngineers}
        onBarClick={handleBarClick}
      />

      <div data-engineer-details>
        <EngineerDetails
          engineers={filteredEngineers}
          expandedEngineer={expandedEngineer}
          onToggleExpand={handleToggleExpand}
        />
      </div>
    </div>
  );
}
