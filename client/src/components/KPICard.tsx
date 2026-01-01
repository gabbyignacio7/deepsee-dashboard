import { type LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: React.ReactNode;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function KPICard({ title, value, icon: Icon, color }: KPICardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  };

  const titleText = typeof title === 'string' ? title : 'kpi-card';

  return (
    <div 
      className={`${colorClasses[color]} border rounded-lg p-6 shadow-sm`}
      data-testid={`kpi-${titleText.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-8 h-8 ${iconColorClasses[color]}`} />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold text-gray-900" data-testid={`kpi-value-${titleText.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        <div className="text-sm text-gray-600 mt-1 font-medium">{title}</div>
      </div>
    </div>
  );
}
