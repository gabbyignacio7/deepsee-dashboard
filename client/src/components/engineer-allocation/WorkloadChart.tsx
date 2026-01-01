import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { getWorkloadColor } from '@/lib/engineer-utils';
import type { EngineerSummary } from '@/types/engineer-allocation';

interface WorkloadChartProps {
  engineers: EngineerSummary[];
  onBarClick: (engineerName: string) => void;
  maxDisplay?: number;
}

export default function WorkloadChart({ engineers, onBarClick, maxDisplay = 15 }: WorkloadChartProps) {
  const displayEngineers = engineers.slice(0, maxDisplay);
  const hasMore = engineers.length > maxDisplay;

  const chartData = displayEngineers.map(eng => ({
    name: eng.name,
    storyPoints: eng.totalStoryPoints,
    ticketCount: eng.totalTickets,
    color: getWorkloadColor(eng.totalStoryPoints)
  }));

  const maxStoryPoints = Math.max(...chartData.map(d => d.storyPoints), 1);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-popover p-3 rounded-lg border shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-sm">Story Points: {data.storyPoints}</p>
        <p className="text-sm">Tickets: {data.ticketCount}</p>
        <p className="text-xs text-muted-foreground mt-1">Click to expand details</p>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Workload by Engineer (Story Points)</h2>
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No engineer data available
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={Math.max(300, displayEngineers.length * 40)}>
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[0, maxStoryPoints * 1.1]}
                label={{ value: 'Story Points', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={110}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="storyPoints" 
                onClick={(data) => onBarClick(data.name)}
                cursor="pointer"
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    data-testid={`bar-${entry.name.replace(/\s+/g, '-')}`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {hasMore && (
            <div className="mt-4 text-center">
              <Button variant="outline" data-testid="button-show-more">
                <ChevronDown className="w-4 h-4 mr-2" />
                {engineers.length - maxDisplay} more engineers...
              </Button>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#34D399' }} />
              <span className="text-muted-foreground">Light (0-20 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FBBF24' }} />
              <span className="text-muted-foreground">Moderate (21-40 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FB923C' }} />
              <span className="text-muted-foreground">Heavy (41-60 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F87171' }} />
              <span className="text-muted-foreground">Very Heavy (60+ pts)</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
