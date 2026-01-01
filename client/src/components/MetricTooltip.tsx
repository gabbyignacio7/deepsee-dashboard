import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type MetricType = 'WEIGHTED_ARR' | 'ARR' | 'REPLICABILITY' | 'CONVERSION_PROBABILITY' | 'EFFORT' | 'PRIORITY_SCORE';

interface MetricTooltipProps {
  children: React.ReactNode;
  type?: MetricType;
  content?: string;
  className?: string;
}

interface TooltipDefinition {
  title: string;
  description: string;
  formula?: string;
  scale?: string;
  example?: string;
  whyMatters: string;
}

// Comprehensive tooltip definitions matching specification
export const METRIC_TOOLTIPS: Record<MetricType, TooltipDefinition> = {
  WEIGHTED_ARR: {
    title: "Weighted ARR",
    description: "The expected revenue value of an opportunity, accounting for the likelihood it will actually close.",
    formula: "ARR Amount × Conversion Probability",
    example: "Deal worth $100,000/year with 50% chance of closing = $50,000 Weighted ARR",
    whyMatters: "Helps us prioritize opportunities based on realistic revenue expectations, not just potential contract values."
  },
  ARR: {
    title: "ARR (Annual Recurring Revenue)",
    description: "The total annual contract value from a client for this feature or opportunity. This is the actual or projected recurring revenue per year.",
    formula: "Total Contract Value ÷ Contract Term (in years)",
    example: "Client signs 3-year contract for $750K total = $250K/year ARR",
    whyMatters: "ARR is the primary revenue metric we use to measure business value and prioritize features that drive sustainable, recurring income. This is the 'maximum potential' - see Weighted ARR for probability-adjusted values."
  },
  REPLICABILITY: {
    title: "Replicability Score",
    description: "How many clients would benefit from this feature. Higher scores mean the feature can be reused across multiple clients (platform feature), while lower scores indicate client-specific customization.",
    formula: "Subjective score: Number of potential benefiting clients / Total client base × 10",
    scale: "1-10 scale:\n• 10 = Benefits ALL clients (universal platform feature)\n• 7-9 = Benefits multiple clients (high reusability)\n• 4-6 = Benefits some clients (moderate reusability)\n• 1-3 = Benefits one client only (custom work)",
    example: "Email automation agent = 10 (all clients use email)\nCustom DTCC integration = 2 (specific to one client)",
    whyMatters: "Platform features with high replicability create more long-term value than one-off customizations. We prioritize work that can serve multiple clients."
  },
  CONVERSION_PROBABILITY: {
    title: "Conversion Probability",
    description: "The likelihood that a sales opportunity will close successfully and become a signed contract, expressed as a percentage.",
    formula: "Conversion Probability (%) = Sales stage confidence + Deal strength factors",
    scale: "0-100% scale:\n• 90-100% = Contract signed or imminent\n• 70-89% = Strong interest, likely to close\n• 50-69% = Qualified opportunity, moderate confidence\n• 25-49% = Early stage, uncertain outcome\n• 0-24% = Long shot or exploratory",
    example: "POC completed successfully = 80% probability\nInitial discovery call only = 30% probability",
    whyMatters: "Used to calculate Weighted ARR and helps us focus on opportunities most likely to generate revenue. Higher probability deals get higher priority."
  },
  EFFORT: {
    title: "Effort (T-Shirt Size)",
    description: "Estimated engineering effort required to deliver the feature, categorized by complexity and time investment.",
    scale: "Size categories:\n• XS (Extra Small) = 1-3 days: Simple changes, minor UI updates, quick fixes\n• S (Small) = 4-7 days (1 week): Small features, isolated changes, single component work\n• M (Medium) = 2-3 weeks: Standard feature development, multiple components\n• L (Large) = 4-6 weeks: Complex features, significant architecture changes\n• XL (Extra Large) = 7+ weeks (2+ months): Major platform changes, new agent development",
    formula: "Priority Formula: (ARR × Replicability × Conversion Probability) ÷ Effort",
    whyMatters: "Helps balance workload and identify 'quick wins' (low effort, high value). Used in priority calculations to favor features with better value-to-effort ratios."
  },
  PRIORITY_SCORE: {
    title: "Priority Score",
    description: "Composite score combining revenue potential, replicability, conversion likelihood, and engineering effort to rank features objectively.",
    formula: "(ARR × Replicability × Conversion Probability × Confidence Factor) ÷ Effort",
    whyMatters: "Provides a data-driven ranking system to align Sales, Product, and Engineering on what to build next. Higher scores indicate better ROI opportunities."
  }
};

export default function MetricTooltip({ children, type, content, className = "" }: MetricTooltipProps) {
  const tooltipData = type ? METRIC_TOOLTIPS[type] : null;
  
  if (!tooltipData && !content) return <>{children}</>;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1.5 cursor-help ${className}`}>
            {children}
            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity" data-testid={type ? `tooltip-icon-${type.toLowerCase()}` : "tooltip-icon"} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-md p-4" data-testid={type ? `tooltip-content-${type.toLowerCase()}` : "tooltip-content"}>
          <div className="space-y-2.5 text-sm">
            {tooltipData ? (
              <>
                <div className="font-semibold text-base border-b pb-1.5">{tooltipData.title}</div>
                <p className="leading-relaxed">{tooltipData.description}</p>
                
                {tooltipData.formula && (
                  <div className="pt-1.5 border-t">
                    <p className="font-semibold text-xs text-muted-foreground mb-1">Formula:</p>
                    <p className="font-mono text-xs bg-muted/50 p-2 rounded">{tooltipData.formula}</p>
                  </div>
                )}
                
                {tooltipData.scale && (
                  <div className="pt-1.5 border-t">
                    <p className="font-semibold text-xs text-muted-foreground mb-1">Scale:</p>
                    <p className="text-xs whitespace-pre-line leading-relaxed">{tooltipData.scale}</p>
                  </div>
                )}
                
                {tooltipData.example && (
                  <div className="pt-1.5 border-t">
                    <p className="font-semibold text-xs text-muted-foreground mb-1">Example:</p>
                    <p className="text-xs whitespace-pre-line leading-relaxed">{tooltipData.example}</p>
                  </div>
                )}
                
                <div className="pt-1.5 border-t bg-muted/30 -mx-4 -mb-4 px-4 py-2.5 rounded-b">
                  <p className="font-semibold text-xs text-muted-foreground mb-1">Why it matters:</p>
                  <p className="text-xs leading-relaxed">{tooltipData.whyMatters}</p>
                </div>
              </>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
