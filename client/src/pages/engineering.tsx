import { useMemo } from 'react';
import { useDashboard } from '@/components/dashboard-context';
import { getUniqueClients } from '@/lib/client-utils';
import ClientFilter from '@/components/ClientFilter';
import DeprecationFilter from '@/components/DeprecationFilter';
import MetricTooltip from '@/components/MetricTooltip';
import DataFreshness from '@/components/DataFreshness';
import WorkMixChart from '@/components/WorkMixChart';
import EngineerAllocation from '@/components/engineer-allocation/EngineerAllocation';
import SprintAnalysis from '@/components/SprintAnalysis';
import SprintOverview from '@/components/SprintOverview';
import SprintHealthScorecard from '@/components/SprintHealthScorecard';
import BlockedItemsAlert from '@/components/BlockedItemsAlert';
import NextSprintReadiness from '@/components/NextSprintReadiness';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Users, LayoutDashboard, CalendarDays } from 'lucide-react';

export default function EngineeringDashboard() {
  const { features, jiraTickets, loading, error, allFeatures, selectedClients, setSelectedClients } = useDashboard();

  const availableClients = useMemo(() => getUniqueClients(allFeatures), [allFeatures]);

  const categoryBreakdown = useMemo(() => {
    const categories: { [key: string]: number } = {};
    jiraTickets.forEach(t => {
      categories[t.Category] = (categories[t.Category] || 0) + t.Story_Points;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [jiraTickets]);

  const blockedTickets = useMemo(() => {
    return jiraTickets.filter(t => t.Status === 'Blocked');
  }, [jiraTickets]);

  const capacityData = useMemo(() => {
    const total = features.reduce((sum, f) => sum + f.Effort_Estimate_Weeks, 0);
    const inProgress = features.filter(f => f.Current_Status === 'In Progress')
      .reduce((sum, f) => sum + f.Effort_Estimate_Weeks, 0);
    const notStarted = features.filter(f => f.Current_Status === 'Not Started')
      .reduce((sum, f) => sum + f.Effort_Estimate_Weeks, 0);
    
    return { total, inProgress, notStarted, available: Math.max(0, 520 - inProgress) };
  }, [features]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-engineering">Engineering Dashboard</h1>
          <p className="text-gray-600 mt-1">Team workload, capacity, and allocation</p>
        </div>
        <DataFreshness />
      </div>

      <Tabs defaultValue="sprint-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="sprint-analysis" data-testid="tab-sprint-analysis">
            <CalendarDays className="w-4 h-4 mr-2" />
            Sprint Analysis
          </TabsTrigger>
          <TabsTrigger value="capacity" data-testid="tab-capacity">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Capacity View
          </TabsTrigger>
          <TabsTrigger value="allocation" data-testid="tab-allocation">
            <Users className="w-4 h-4 mr-2" />
            Engineer Allocation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sprint-analysis" className="space-y-6">
          {/* Sprint Overview Cards */}
          <SprintOverview />

          {/* Next Sprint Readiness Alert */}
          <NextSprintReadiness />

          {/* Sprint Health and Blocked Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SprintHealthScorecard />
            <BlockedItemsAlert />
          </div>

          {/* Detailed Sprint Analysis */}
          <SprintAnalysis />
        </TabsContent>

        <TabsContent value="capacity" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <ClientFilter
              availableClients={availableClients}
              selectedClients={selectedClients}
              onChange={setSelectedClients}
            />
            <DeprecationFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6" data-testid="kpi-total-backlog">
              <h3 className="text-sm font-medium text-gray-600">
                <MetricTooltip type="EFFORT">Total Backlog (weeks)</MetricTooltip>
              </h3>
              <p className="text-3xl font-bold text-gray-900">{capacityData.total}w</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6" data-testid="kpi-in-progress">
              <h3 className="text-sm font-medium text-gray-600">
                <MetricTooltip type="EFFORT">In Progress (weeks)</MetricTooltip>
              </h3>
              <p className="text-3xl font-bold text-gray-900">{capacityData.inProgress}w</p>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6" data-testid="kpi-not-started">
              <h3 className="text-sm font-medium text-gray-600">
                <MetricTooltip type="EFFORT">Not Started (weeks)</MetricTooltip>
              </h3>
              <p className="text-3xl font-bold text-gray-900">{capacityData.notStarted}w</p>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6" data-testid="kpi-total-tickets">
              <h3 className="text-sm font-medium text-gray-600">Total Tickets</h3>
              <p className="text-3xl font-bold text-gray-900">{jiraTickets.length}</p>
            </div>
          </div>

          {blockedTickets.length > 0 && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6" data-testid="section-blocked-tickets">
              <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Blocked Work ({blockedTickets.length} tickets)
              </h2>
              <div className="space-y-2">
                {blockedTickets.slice(0, 10).map(ticket => (
                  <div key={ticket.Ticket_ID} className="bg-white p-3 rounded border border-red-200" data-testid={`ticket-${ticket.Ticket_ID}`}>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{ticket.Ticket_ID}: {ticket.Ticket_Summary}</span>
                      <span className="text-sm text-gray-600">{ticket.Client_Name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Mix Chart */}
          <WorkMixChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Debt vs Feature Work</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryBreakdown} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Story Points by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <EngineerAllocation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
