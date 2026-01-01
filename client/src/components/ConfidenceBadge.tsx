import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidenceFactor: 1 | 2 | 3;
  description?: string;
}

export default function ConfidenceBadge({ confidenceFactor, description }: ConfidenceBadgeProps) {
  const getConfidenceConfig = (factor: 1 | 2 | 3) => {
    switch (factor) {
      case 1:
        return {
          variant: 'success' as const,
          icon: CheckCircle,
          label: 'High',
        };
      case 2:
        return {
          variant: 'warning' as const,
          icon: AlertCircle,
          label: 'Medium',
        };
      case 3:
        return {
          variant: 'destructive' as const,
          icon: AlertTriangle,
          label: 'Low',
        };
      default:
        return {
          variant: 'warning' as const,
          icon: AlertCircle,
          label: 'Medium',
        };
    }
  };

  const config = getConfidenceConfig(confidenceFactor);
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} title={description} className="gap-1" data-testid={`badge-confidence-${config.label.toLowerCase()}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
