import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { workMix, getWorkMixChartData, workMixSummary } from '@/data/workMixData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface WorkMixChartProps {
  className?: string;
  showAlert?: boolean;
}

export const WorkMixChart: React.FC<WorkMixChartProps> = ({
  className = '',
  showAlert = true
}) => {
  const chartData = getWorkMixChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Sprint Work Mix vs Target</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 70]} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="actual" name="Actual %" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="target" name="Target %" fill="#D1D5DB" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Work Mix Summary Cards */}
        <div className="grid grid-cols-4 gap-2">
          {workMix.map(item => (
            <div
              key={item.category}
              className={`p-2 rounded-lg border ${
                item.status === 'on-target' ? 'border-green-200 bg-green-50' :
                item.status === 'below' ? 'border-red-200 bg-red-50' :
                'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-xs text-gray-600">{item.category}</div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                {item.s2Percentage}%
              </div>
              <div className="text-xs text-gray-500">Target: {item.target}</div>
            </div>
          ))}
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-red-800">ARTEMIS at 23% vs target 50-60%</div>
              <div className="text-sm text-red-600">
                Significant gap of {Math.abs(workMixSummary.gap.artemis)}% below target.
                Recommend prioritizing foundation epics in next sprint.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkMixChart;
