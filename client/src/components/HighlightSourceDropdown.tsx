import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface HighlightSource {
  sourceFile: string;
  calculationMethod: string;
  rawInputs: {
    label: string;
    value: string;
  }[];
  lastUpdated: string;
  jiraLinks?: {
    key: string;
    url: string;
    summary: string;
  }[];
  notes?: string;
}

export default function HighlightSourceDropdown({ source }: { source: HighlightSource }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-1">
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-0.5"
      >
        <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
        Source
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${expanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-50 rounded-md border border-gray-200 p-3 text-xs space-y-2">
          <div>
            <span className="text-gray-500">Source:</span>{' '}
            <code className="font-mono text-gray-700 bg-gray-100 px-1 py-0.5 rounded">{source.sourceFile}</code>
          </div>
          <div>
            <span className="text-gray-500">Calculation:</span>{' '}
            <span className="text-gray-700">{source.calculationMethod}</span>
          </div>
          {source.rawInputs.length > 0 && (
            <table className="w-full text-left">
              <tbody>
                {source.rawInputs.map((input, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="py-0.5 pr-3 text-gray-500 whitespace-nowrap">{input.label}</td>
                    <td className="py-0.5 font-medium text-gray-800">{input.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {source.jiraLinks && source.jiraLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {source.jiraLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.key}
                </a>
              ))}
            </div>
          )}
          <div className="text-gray-400">Data as of: {source.lastUpdated}</div>
          {source.notes && (
            <div className="bg-blue-50 border border-blue-100 rounded p-2 text-gray-600">
              {source.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
