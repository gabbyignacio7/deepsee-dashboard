import React, { useState } from 'react';
import {
  pr1561Initiative,
  getMilestoneProgress,
  getInitiativeProgress,
  getPillarCoverageStatus,
  MilestoneData,
  EpicData
} from '@/data/agenticPlatformData';

const AgenticPlatformSection: React.FC = () => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'gaps'>('overview');

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

  const getPillarColor = (pillar: string) => {
    const colors: { [key: string]: string } = {
      'Platform': 'bg-blue-100 text-blue-800',
      'Automation & Orchestration': 'bg-purple-100 text-purple-800',
      'Mercury Extraction': 'bg-green-100 text-green-800',
      'Document Parser': 'bg-teal-100 text-teal-800',
      'BluePrint': 'bg-indigo-100 text-indigo-800',
      'Enhanced Agent Reasoning': 'bg-orange-100 text-orange-800',
      'Agentic Engine': 'bg-red-100 text-red-800',
      'Fabric Integration': 'bg-cyan-100 text-cyan-800'
    };
    return colors[pillar] || 'bg-gray-100 text-gray-800';
  };

  const getCoverageIcon = (status: 'full' | 'partial' | 'none') => {
    switch (status) {
      case 'full': return <span className="text-green-500">&#9632;</span>;
      case 'partial': return <span className="text-yellow-500">&#9632;</span>;
      case 'none': return <span className="text-gray-300">&#9633;</span>;
    }
  };

  const pillars = [
    'platform', 'automationOrchestration', 'mercuryExtraction', 'documentParser',
    'bluePrint', 'emailAutomation', 'enhancedAgentReasoning', 'agenticEngine',
    'epaAutomatedResolution', 'fabricIntegration'
  ];

  const pillarDisplayNames: { [key: string]: string } = {
    platform: 'Platform',
    automationOrchestration: 'Automation & Orchestration',
    mercuryExtraction: 'Mercury Extraction',
    documentParser: 'Document Parser',
    bluePrint: 'BluePrint',
    emailAutomation: 'Email Automation',
    enhancedAgentReasoning: 'Enhanced Agent Reasoning',
    agenticEngine: 'Agentic Engine',
    epaAutomatedResolution: 'EPA Automated Resolution',
    fabricIntegration: 'Fabric Integration'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="robot">&#129302;</span> DeepSee Agentic Platform
          </h2>
          <p className="text-sm text-gray-500">
            Initiative {pr1561Initiative.key} | {pr1561Initiative.totalMilestones} Milestones | {pr1561Initiative.totalEpics} Epics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(pr1561Initiative.status)}`}>
            {pr1561Initiative.status}
          </span>
          <a
            href={`https://deepsee.atlassian.net/browse/${pr1561Initiative.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View in JIRA &rarr;
          </a>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-semibold">{getInitiativeProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getInitiativeProgress()}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {(['overview', 'coverage', 'gaps'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'coverage' ? 'Pillar Coverage' : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            {pr1561Initiative.milestones.map((milestone) => (
              <div
                key={milestone.key}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  expandedMilestone === milestone.key
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow'
                }`}
                onClick={() => setExpandedMilestone(
                  expandedMilestone === milestone.key ? null : milestone.key
                )}
              >
                <div className="text-xs text-gray-500 font-mono">{milestone.key}</div>
                <div className="font-medium text-sm mt-1 line-clamp-2" title={milestone.summary}>
                  {milestone.summary}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {milestone.childCount} epics
                  </span>
                </div>
                {/* Progress bar per milestone */}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${getMilestoneProgress(milestone.key)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dependency Flow */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Execution Sequence</h3>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="px-3 py-2 bg-red-100 text-red-800 rounded-lg text-xs font-medium">
                1. PR-1562 (Infrastructure)
              </div>
              <span className="text-gray-400">&rarr;</span>
              <div className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-medium">
                2. PR-1564 (IAM)
              </div>
              <span className="text-gray-400">&rarr;</span>
              <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-xs font-medium">
                3. PR-1565 (Data)
              </div>
              <span className="text-gray-400">&rarr;</span>
              <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">
                4. PR-1563 (Orchestration)
              </div>
              <span className="text-gray-400">&rarr;</span>
              <div className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium">
                5. PR-1566 (Observability)
              </div>
            </div>
          </div>

          {/* Expanded Milestone View */}
          {expandedMilestone && (
            <MilestoneDetailView
              milestone={pr1561Initiative.milestones.find(m => m.key === expandedMilestone)!}
              getStatusColor={getStatusColor}
              getPillarColor={getPillarColor}
            />
          )}
        </>
      )}

      {activeTab === 'coverage' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {pillars.map(pillar => {
            const status = getPillarCoverageStatus(pillar);
            const milestones = pr1561Initiative.pillarCoverage[pillar] || [];
            return (
              <div
                key={pillar}
                className={`p-3 rounded-lg border ${
                  status === 'none' ? 'border-red-200 bg-red-50' :
                  status === 'partial' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getCoverageIcon(status)}
                  <span className="text-xs font-medium">{pillarDisplayNames[pillar]}</span>
                </div>
                {milestones.length > 0 ? (
                  <div className="text-xs text-gray-600">
                    {milestones.join(', ')}
                  </div>
                ) : (
                  <div className="text-xs text-red-600 font-medium">
                    <span role="img" aria-label="warning">&#9888;</span> NO COVERAGE
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'gaps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
              <span role="img" aria-label="inbox">&#128229;</span> In Milestones, NOT in PRDs
            </h3>
            <div className="space-y-2">
              {pr1561Initiative.gaps.inMilestonesNotInPRDs.map((gap, idx) => (
                <div key={idx} className="p-2 bg-orange-50 border border-orange-100 rounded text-xs">
                  {gap}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
              <span role="img" aria-label="outbox">&#128228;</span> In PRDs, NOT in Milestones
            </h3>
            <div className="space-y-2">
              {pr1561Initiative.gaps.inPRDsNotInMilestones.map((gap, idx) => (
                <div key={idx} className="p-2 bg-red-50 border border-red-100 rounded text-xs">
                  {gap}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Milestone Detail View Component
const MilestoneDetailView: React.FC<{
  milestone: MilestoneData;
  getStatusColor: (status: string) => string;
  getPillarColor: (pillar: string) => string;
}> = ({ milestone, getStatusColor, getPillarColor }) => {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {milestone.key}: {milestone.summary}
          </h3>
          {milestone.businessGoal && (
            <p className="text-sm text-gray-600 mt-1">{milestone.businessGoal}</p>
          )}
        </div>
        <div className="flex gap-2">
          {milestone.primaryPillars.map(pillar => (
            <span key={pillar} className={`text-xs px-2 py-1 rounded ${getPillarColor(pillar)}`}>
              {pillar}
            </span>
          ))}
        </div>
      </div>

      {/* Epic Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Key</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Summary</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Pillar</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Status</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Dependencies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {milestone.children.map((epic) => (
              <tr key={epic.key} className="hover:bg-gray-50">
                <td className="px-3 py-2">
                  <a
                    href={`https://deepsee.atlassian.net/browse/${epic.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-mono text-xs"
                  >
                    {epic.key}
                  </a>
                </td>
                <td className="px-3 py-2 max-w-xs">
                  <div className="truncate" title={epic.summary}>{epic.summary}</div>
                  {epic.description && (
                    <div className="text-xs text-gray-400 truncate" title={epic.description}>
                      {epic.description}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${getPillarColor(epic.pillar)}`}>
                    {epic.pillar}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(epic.status)}`}>
                    {epic.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs">
                  {epic.blockedBy && epic.blockedBy.length > 0 ? (
                    <span className="text-orange-600">
                      <span role="img" aria-label="warning">&#9888;</span> Blocked by: {epic.blockedBy.join(', ')}
                    </span>
                  ) : epic.blocks && epic.blocks.length > 0 ? (
                    <span className="text-green-600">
                      &rarr; Blocks {epic.blocks.length} items
                    </span>
                  ) : (
                    <span className="text-gray-400">&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgenticPlatformSection;
