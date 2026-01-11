import React, { useState } from 'react';
import {
  sprint2026S1Data,
  getActiveEngineers,
  getSprintHealthScore,
  CapacityStatus
} from '@/data/sprintAllocationData';

const SprintAllocationSection: React.FC = () => {
  const [showInactive, setShowInactive] = useState(false);
  const data = sprint2026S1Data;
  const healthScore = getSprintHealthScore();

  const getCapacityBadge = (status: CapacityStatus) => {
    switch (status) {
      case 'green': return { icon: <span className="text-green-500">&#9679;</span>, label: 'Under', class: 'bg-green-100 text-green-800' };
      case 'yellow': return { icon: <span className="text-yellow-500">&#9679;</span>, label: 'At', class: 'bg-yellow-100 text-yellow-800' };
      case 'red': return { icon: <span className="text-red-500">&#9679;</span>, label: 'Over', class: 'bg-red-100 text-red-800' };
      case 'unassigned': return { icon: <span className="text-gray-400">&#9888;</span>, label: 'N/A', class: 'bg-gray-100 text-gray-600' };
    }
  };

  const getHealthBadge = () => {
    switch (healthScore) {
      case 'good': return { icon: <span>&#10003;</span>, label: 'Healthy', class: 'bg-green-100 text-green-800' };
      case 'warning': return { icon: <span>&#9888;</span>, label: 'Attention Needed', class: 'bg-yellow-100 text-yellow-800' };
      case 'critical': return { icon: <span>&#128680;</span>, label: 'Critical', class: 'bg-red-100 text-red-800' };
    }
  };

  const health = getHealthBadge();
  const activeEngineers = getActiveEngineers();
  const displayEngineers = showInactive ? data.engineers : activeEngineers;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="chart">&#128202;</span> Sprint Allocation
          </h2>
          <p className="text-sm text-gray-500">
            {data.overview.sprint} | Updated {new Date(data.overview.asOf).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full ${health.class}`}>
            {health.icon} {health.label}
          </span>
          <a
            href="https://deepsee.atlassian.net/jira/software/projects/BACK/boards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View Board &rarr;
          </a>
        </div>
      </div>

      {/* Sprint Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{data.overview.totalTickets}</div>
          <div className="text-xs text-gray-500">Total Tickets</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{data.overview.completion}%</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{data.overview.statusBreakdown.inProgress}</div>
          <div className="text-xs text-gray-500">In Progress</div>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{data.overview.unassignedCount}</div>
          <div className="text-xs text-gray-500">Unassigned <span role="img" aria-label="warning">&#9888;</span></div>
        </div>
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{data.overview.statusBreakdown.blocked}</div>
          <div className="text-xs text-gray-500">Blocked</div>
        </div>
      </div>

      {/* Status Breakdown Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Status Distribution</span>
          <span>{data.overview.statusBreakdown.done} Done</span>
        </div>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-500"
            style={{ width: `${(data.overview.statusBreakdown.done / data.overview.totalTickets) * 100}%` }}
            title={`Done: ${data.overview.statusBreakdown.done}`}
          />
          <div
            className="bg-blue-500"
            style={{ width: `${(data.overview.statusBreakdown.inProgress / data.overview.totalTickets) * 100}%` }}
            title={`In Progress: ${data.overview.statusBreakdown.inProgress}`}
          />
          <div
            className="bg-purple-500"
            style={{ width: `${(data.overview.statusBreakdown.codeReview / data.overview.totalTickets) * 100}%` }}
            title={`Code Review: ${data.overview.statusBreakdown.codeReview}`}
          />
          <div
            className="bg-gray-300"
            style={{ width: `${(data.overview.statusBreakdown.toDo / data.overview.totalTickets) * 100}%` }}
            title={`To Do: ${data.overview.statusBreakdown.toDo}`}
          />
          <div
            className="bg-red-500"
            style={{ width: `${(data.overview.statusBreakdown.blocked / data.overview.totalTickets) * 100}%` }}
            title={`Blocked: ${data.overview.statusBreakdown.blocked}`}
          />
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Done</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500 rounded"></span> Review</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-300 rounded"></span> To Do</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span> Blocked</span>
        </div>
      </div>

      {/* Alerts Section */}
      {(data.alerts.blocked.length > 0 || data.alerts.staleInProgress.length > 0) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-3"><span role="img" aria-label="alert">&#128680;</span> Alerts</h3>
          <div className="space-y-2">
            {data.alerts.blocked.map(item => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <span className="text-red-700">
                  <span className="text-red-500">&#9679;</span> <a
                    href={`https://deepsee.atlassian.net/browse/${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono hover:underline"
                  >{item.key}</a> - {item.summary}
                </span>
                <span className="text-xs text-red-600">Blocked since {item.blockedSince}</span>
              </div>
            ))}
            {data.alerts.staleInProgress.map(item => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <span className="text-orange-700">
                  <span className="text-orange-500">&#9679;</span> <a
                    href={`https://deepsee.atlassian.net/browse/${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono hover:underline"
                  >{item.key}</a> - {item.summary}
                </span>
                <span className="text-xs text-orange-600">{item.daysSinceUpdate} days stale</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engineer Allocation Table */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Engineer Allocation</h3>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="rounded"
          />
          Show inactive ({data.engineers.length - activeEngineers.length})
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Engineer</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Role</th>
              <th className="px-3 py-2 text-center font-medium text-gray-600">Tickets</th>
              <th className="px-3 py-2 text-center font-medium text-gray-600">Progress</th>
              <th className="px-3 py-2 text-center font-medium text-gray-600">Capacity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayEngineers.map((engineer) => {
              const capacity = getCapacityBadge(engineer.capacityStatus);
              const breakdown = engineer.statusBreakdown;
              return (
                <tr key={engineer.name} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{engineer.name}</td>
                  <td className="px-3 py-2 text-gray-500 text-xs">{engineer.role}</td>
                  <td className="px-3 py-2 text-center font-mono">{engineer.sprintTickets}</td>
                  <td className="px-3 py-2">
                    {breakdown ? (
                      <div className="flex h-2 rounded-full overflow-hidden w-24 mx-auto">
                        <div className="bg-green-500" style={{ width: `${(breakdown.done / engineer.sprintTickets) * 100}%` }} />
                        <div className="bg-blue-500" style={{ width: `${(breakdown.inProgress / engineer.sprintTickets) * 100}%` }} />
                        <div className="bg-purple-500" style={{ width: `${(breakdown.codeReview / engineer.sprintTickets) * 100}%` }} />
                        <div className="bg-gray-300" style={{ width: `${(breakdown.toDo / engineer.sprintTickets) * 100}%` }} />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">&mdash;</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded ${capacity.class}`}>
                      {capacity.icon} {capacity.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {/* Unassigned Row */}
            <tr className="bg-orange-50">
              <td className="px-3 py-2 font-medium text-orange-700">UNASSIGNED</td>
              <td className="px-3 py-2 text-orange-600 text-xs">Needs Assignment</td>
              <td className="px-3 py-2 text-center font-mono text-orange-700">{data.overview.unassignedCount}</td>
              <td className="px-3 py-2 text-center">&mdash;</td>
              <td className="px-3 py-2 text-center">
                <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                  <span role="img" aria-label="warning">&#9888;</span> Action
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ARTEMIS Progress */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="font-semibold text-gray-700 mb-3">ARTEMIS Epic Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.artemisProgress.map(epic => (
            <div key={epic.key} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{epic.epic}</span>
                <a
                  href={`https://deepsee.atlassian.net/browse/${epic.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-mono"
                >
                  {epic.key}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${epic.percent}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-16 text-right">
                  {epic.done}/{epic.total} ({epic.percent}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Estimates Warning */}
      {data.overview.missingEstimatesCount > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-yellow-800">
            <span role="img" aria-label="ruler">&#128207;</span>
            <span><strong>{data.overview.missingEstimatesCount} tickets</strong> missing story point estimates</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintAllocationSection;
