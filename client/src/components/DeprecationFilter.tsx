import { AlertCircle, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useDashboard } from '@/components/dashboard-context';

export default function DeprecationFilter() {
  const {
    excludeDeprecated,
    setExcludeDeprecated,
    totalTicketCount,
    activeTicketCount,
    deprecatedTicketCount,
  } = useDashboard();

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Toggle Control */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <div>
              <label
                htmlFor="exclude-deprecated"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Exclude Deprecated Tickets
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Hide tickets marked for deprecation by Product team
              </p>
            </div>
          </div>
          <Switch
            id="exclude-deprecated"
            checked={excludeDeprecated}
            onCheckedChange={setExcludeDeprecated}
            data-testid="switch-exclude-deprecated"
          />
        </div>

        {/* Metrics Display */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-muted-foreground">
              {totalTicketCount.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <div className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">
                {activeTicketCount.toLocaleString()}
              </div>
              {excludeDeprecated && (
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-orange-600 dark:text-orange-400">
              {deprecatedTicketCount.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Deprecated</div>
          </div>
        </div>

        {/* Status Badge */}
        {excludeDeprecated && (
          <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              Showing {activeTicketCount.toLocaleString()} active tickets only
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
