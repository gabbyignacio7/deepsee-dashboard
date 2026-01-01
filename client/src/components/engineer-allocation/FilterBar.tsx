import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortOption, StatusFilter } from '@/types/engineer-allocation';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedProject: string;
  onProjectChange: (value: string) => void;
  selectedStatus: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  showActiveOnly: boolean;
  onShowActiveOnlyChange: (value: boolean) => void;
  availableProjects: string[];
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedProject,
  onProjectChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  showActiveOnly,
  onShowActiveOnlyChange,
  availableProjects
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search engineers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            data-testid="input-search-engineers"
          />
        </div>

        {/* Project Filter */}
        <div>
          <Select value={selectedProject} onValueChange={onProjectChange}>
            <SelectTrigger data-testid="select-project">
              <SelectValue placeholder="Project: All" />
            </SelectTrigger>
            <SelectContent>
              {availableProjects.map(project => (
                <SelectItem key={project} value={project} data-testid={`project-${project}`}>
                  Project: {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <Select value={selectedStatus} onValueChange={(value) => onStatusChange(value as StatusFilter)}>
            <SelectTrigger data-testid="select-status">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All" data-testid="status-All">Status: All</SelectItem>
              <SelectItem value="In Progress" data-testid="status-In-Progress">Status: In Progress</SelectItem>
              <SelectItem value="To Do" data-testid="status-To-Do">Status: To Do</SelectItem>
              <SelectItem value="Code Review" data-testid="status-Code-Review">Status: Code Review</SelectItem>
              <SelectItem value="Blocked" data-testid="status-Blocked">Status: Blocked</SelectItem>
              <SelectItem value="Done" data-testid="status-Done">Status: Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="storyPoints" data-testid="sort-storyPoints">Sort by: Story Points</SelectItem>
              <SelectItem value="ticketCount" data-testid="sort-ticketCount">Sort by: Ticket Count</SelectItem>
              <SelectItem value="nameAsc" data-testid="sort-nameAsc">Sort by: Name (A-Z)</SelectItem>
              <SelectItem value="nameDesc" data-testid="sort-nameDesc">Sort by: Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Show Active Only Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-active"
          checked={showActiveOnly}
          onCheckedChange={onShowActiveOnlyChange}
          data-testid="checkbox-show-active"
        />
        <Label htmlFor="show-active" className="text-sm font-normal cursor-pointer">
          Show active engineers only (exclude engineers with 0 active tickets)
        </Label>
      </div>
    </div>
  );
}
