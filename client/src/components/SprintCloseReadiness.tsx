import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, CheckCircle, AlertTriangle } from "lucide-react";
import { SPRINT_2_DATA } from "@/data/sprint2Data";

export default function SprintCloseReadiness() {
  const { sprintCloseReadiness, sprint } = SPRINT_2_DATA;

  return (
    <Card data-testid="card-sprint-close-readiness">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Flag className="w-5 h-5" />
          Sprint Close Readiness
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {sprint.daysRemaining} days remaining
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-green-500 pl-4" data-testid="section-likely-complete">
            <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Likely to Complete
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {sprintCloseReadiness.likelyToComplete.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
            <p className="text-sm font-medium text-green-600 mt-2">
              Achievable: {sprintCloseReadiness.achievable}
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4" data-testid="section-at-risk">
            <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              At Risk of Carryover
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {sprintCloseReadiness.atRisk.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
            <p className="text-sm font-medium text-red-600 mt-2">
              Expected carryover: {sprintCloseReadiness.expectedCarryover}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-gray-700 mb-3">Final {sprint.daysRemaining} Days Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {sprintCloseReadiness.finalActions.map((action) => (
              <div 
                key={action.priority} 
                className="flex items-center gap-2 text-muted-foreground"
                data-testid={`action-priority-${action.priority}`}
              >
                <span className={`font-bold ${
                  action.color === 'red' ? 'text-red-500' :
                  action.color === 'yellow' ? 'text-yellow-500' :
                  action.color === 'blue' ? 'text-blue-500' :
                  action.color === 'purple' ? 'text-purple-500' : 'text-gray-500'
                }`}>
                  {action.priority}.
                </span>
                {action.action}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
