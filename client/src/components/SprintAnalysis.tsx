import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Target, Calendar, TrendingUp } from 'lucide-react';
import {
  CURRENT_SPRINT,
  NEXT_SPRINT,
  FUTURE_SPRINT,
  ROLLOVER_HIGH_RISK,
  BLOCKED_ITEMS,
  ARTEMIS_BACKLOG,
  SPRINT_DATA_UPDATED,
  getSprintMixChartData,
  formatSprintDate
} from '@/data/sprintData';

const JIRA_BASE_URL = 'https://deepsee.atlassian.net/browse';

export default function SprintAnalysis() {
  const sprintMixData = getSprintMixChartData();

  return (
    <div className="space-y-6">
      {/* Data Timestamp */}
      <div className="text-sm text-muted-foreground text-right">
        Data updated: February 1, 2026, 7:30 PM MT
      </div>

      {/* Sprint Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Sprint Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {CURRENT_SPRINT.name}
              </span>
              <Badge variant="default">Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Completion</span>
                <span className="font-medium">{CURRENT_SPRINT.completionRate}%</span>
              </div>
              <Progress value={CURRENT_SPRINT.completionRate} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Done: {CURRENT_SPRINT.completion?.done}</div>
                <div>In Progress: {CURRENT_SPRINT.completion?.inProgress}</div>
                <div>Code Review: {CURRENT_SPRINT.completion?.codeReview}</div>
                <div>Blocked: {CURRENT_SPRINT.completion?.blocked}</div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t">
                <span>Ends: {formatSprintDate(CURRENT_SPRINT.endDate)}</span>
                <span className="text-amber-600 font-medium">{CURRENT_SPRINT.likelyRollovers} rollovers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Sprint Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {NEXT_SPRINT.name}
              </span>
              <Badge variant="outline">Planned</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">{NEXT_SPRINT.totalTickets} tickets planned</div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600 hover:bg-green-700">{NEXT_SPRINT.mix.artemis}% ARTEMIS</Badge>
                <Badge className="bg-amber-500 hover:bg-amber-600">{NEXT_SPRINT.mix.client}% Client</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">{NEXT_SPRINT.mix.infrastructure}% Infra</Badge>
              </div>
              <div className="text-sm pt-2 border-t">
                <span className="text-amber-600 font-medium">
                  {NEXT_SPRINT.assessment === 'client-heavy' ? 'Client-heavy sprint' : 'Balanced sprint'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatSprintDate(NEXT_SPRINT.startDate)} - {formatSprintDate(NEXT_SPRINT.endDate)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Sprint Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {FUTURE_SPRINT.name}
              </span>
              <Badge variant="secondary">Future</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">{FUTURE_SPRINT.totalTickets} tickets planned</div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600 hover:bg-green-700">{FUTURE_SPRINT.mix.artemis}% ARTEMIS</Badge>
                <Badge className="bg-amber-500 hover:bg-amber-600">{FUTURE_SPRINT.mix.client}% Client</Badge>
                {FUTURE_SPRINT.mix.infrastructure > 0 && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">{FUTURE_SPRINT.mix.infrastructure}% Infra</Badge>
                )}
              </div>
              <div className="text-sm pt-2 border-t">
                <span className="text-green-600 font-medium">
                  ARTEMIS-focused sprint
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatSprintDate(FUTURE_SPRINT.startDate)} - {formatSprintDate(FUTURE_SPRINT.endDate)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sprint Mix Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sprint Work Mix Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sprintMixData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sprint" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="ARTEMIS" fill="#22c55e" name="ARTEMIS" />
              <Bar dataKey="Client" fill="#f59e0b" name="Client" />
              <Bar dataKey="Infrastructure" fill="#3b82f6" name="Infrastructure" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Blocked Items Alert */}
      {BLOCKED_ITEMS.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2 text-xl">
              <AlertTriangle className="w-5 h-5" />
              Blocked Items Requiring Escalation ({BLOCKED_ITEMS.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {BLOCKED_ITEMS.map(item => (
                <div key={item.key} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded border border-red-100 dark:border-red-900">
                  <div className="flex-1">
                    <a
                      href={`${JIRA_BASE_URL}/${item.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {item.key}
                    </a>
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{item.summary}</span>
                    {item.client && (
                      <Badge variant="outline" className="ml-2 text-xs">{item.client}</Badge>
                    )}
                  </div>
                  <Badge variant="destructive">{item.blockedDays}d blocked</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rollover Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">High-Risk Rollover Candidates ({ROLLOVER_HIGH_RISK.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROLLOVER_HIGH_RISK.map(item => (
                <TableRow key={item.key}>
                  <TableCell>
                    <a
                      href={`${JIRA_BASE_URL}/${item.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.key}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-md truncate">{item.summary}</TableCell>
                  <TableCell>
                    <Badge variant={item.category === 'ARTEMIS' ? 'default' : 'secondary'}>
                      {item.category}
                    </Badge>
                    {item.client && (
                      <Badge variant="outline" className="ml-1">{item.client}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.unassigned ? (
                      <Badge variant="warning">Unassigned</Badge>
                    ) : (
                      <Badge variant="destructive">{item.staleDays}d stale</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ARTEMIS Backlog Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5" />
            ARTEMIS Backlog Available for S4
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ARTEMIS_BACKLOG.map(item => (
              <div
                key={item.key}
                className={`flex justify-between items-center p-3 rounded ${
                  item.recommended
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex-1">
                  <a
                    href={`${JIRA_BASE_URL}/${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {item.key}
                  </a>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{item.summary}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{item.priority}</Badge>
                  {item.recommended && (
                    <Badge className="bg-green-600 hover:bg-green-700">Recommended</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
