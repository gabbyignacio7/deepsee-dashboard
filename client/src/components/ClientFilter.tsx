import { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { getClientDisplayName } from '@/lib/client-utils';

interface ClientFilterProps {
  availableClients: string[];
  selectedClients: string[];
  onChange: (clients: string[]) => void;
}

export default function ClientFilter({
  availableClients,
  selectedClients,
  onChange,
}: ClientFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleClient = (client: string) => {
    if (selectedClients.includes(client)) {
      onChange(selectedClients.filter(c => c !== client));
    } else {
      onChange([...selectedClients, client]);
    }
  };

  const clearAll = () => {
    onChange([]);
    setOpen(false);
  };

  const selectAll = () => {
    onChange(availableClients);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            data-testid="button-client-filter"
          >
            <span className="truncate">
              {selectedClients.length === 0
                ? 'Filter by Client...'
                : selectedClients.length === 1
                ? getClientDisplayName(selectedClients[0])
                : `${selectedClients.length} clients selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <div className="max-h-[400px] overflow-y-auto">
            {/* Header with actions */}
            <div className="sticky top-0 z-10 bg-background border-b px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Select Clients</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAll}
                    className="h-7 text-xs"
                    data-testid="button-select-all-clients"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="h-7 text-xs"
                    data-testid="button-clear-all-clients"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Client list */}
            <div className="p-2">
              {availableClients.map((client) => (
                <div
                  key={client}
                  className="flex items-center space-x-2 rounded-sm px-2 py-2 hover:bg-accent"
                  data-testid={`checkbox-client-${client}`}
                >
                  <Checkbox
                    id={`client-${client}`}
                    checked={selectedClients.includes(client)}
                    onCheckedChange={() => toggleClient(client)}
                  />
                  <label
                    htmlFor={`client-${client}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    {getClientDisplayName(client)}
                  </label>
                  {selectedClients.includes(client) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer with selected count */}
          {selectedClients.length > 0 && (
            <div className="border-t px-4 py-2 bg-muted">
              <div className="flex flex-wrap gap-1">
                {selectedClients.map((client) => (
                  <Badge
                    key={client}
                    variant="secondary"
                    className="text-xs"
                    data-testid={`badge-selected-client-${client}`}
                  >
                    {getClientDisplayName(client)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleClient(client);
                      }}
                      className="ml-1 hover:bg-accent rounded-full p-0.5"
                      aria-label={`Remove ${client}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
