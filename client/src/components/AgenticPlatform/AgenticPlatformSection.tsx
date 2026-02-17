import React from 'react';
import {
  platformMilestones,
  type PlatformMilestone
} from '@/data/agenticPlatformData';

const AgenticPlatformSection: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'To Do': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Backlog': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const totalMilestones = platformMilestones.length;
  const inProgressCount = platformMilestones.filter(m => m.status === 'In Progress').length;
  const planningCount = platformMilestones.filter(m => m.status === 'Planning').length;
  const doneCount = platformMilestones.filter(m => m.status === 'Done').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="robot">&#129302;</span> DeepSee Platform Milestones
          </h2>
          <p className="text-sm text-gray-500">
            {totalMilestones} Milestones | {inProgressCount} In Progress | {planningCount} Planning | {doneCount} Done
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://deepsee.atlassian.net/browse/PR-1561"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View in JIRA &rarr;
          </a>
        </div>
      </div>

      {/* Milestones Grid - 2 rows of 5 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {platformMilestones.map((milestone: PlatformMilestone) => {
          const progress = milestone.totalStoryPoints > 0
            ? Math.round((milestone.completedStoryPoints / milestone.totalStoryPoints) * 100)
            : 0;

          return (
            <div
              key={milestone.id}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(milestone.status)}`}>
                  {milestone.status}
                </span>
              </div>
              <div className="font-medium text-sm mt-1 line-clamp-2" title={milestone.name}>
                {milestone.name}
              </div>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2" title={milestone.description}>
                {milestone.description}
              </p>
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{progress}%</span>
                  <span>{milestone.completedStoryPoints}/{milestone.totalStoryPoints} pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      progress >= 70 ? 'bg-green-500' :
                      progress >= 30 ? 'bg-yellow-500' :
                      progress > 0 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${Math.max(progress, 2)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> Story points will populate as engineering starts tagging tickets with milestone labels.
          Progress bars are driven by completedStoryPoints / totalStoryPoints.
        </p>
      </div>
    </div>
  );
};

export default AgenticPlatformSection;
