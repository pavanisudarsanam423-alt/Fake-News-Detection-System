import React from 'react';
import { DetectionHistoryItem } from '../types';
import { History, Trash2, ArrowUpRight, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface HistoryViewProps {
  history: DetectionHistoryItem[];
  onSelectHeadline: (headline: string) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectHeadline,
  onClearHistory
}) => {
  const exportHistoryCSV = () => {
    if (history.length === 0) return;
    const headers = ['Timestamp', 'Prediction', 'Confidence', 'Model', 'Headline'];
    const rows = history.map(item => [
      `"${item.timestamp}"`,
      `"${item.prediction}"`,
      `"${(item.confidence * 100).toFixed(1)}%"`,
      `"${item.modelType}"`,
      `"${item.headline.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fake_news_detection_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            <History className="w-4 h-4" />
            <span>Audit Trail & Query History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Detection History Log
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Records of verified headlines conducted during your active account session.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportHistoryCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No detection history yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Headlines you verify will appear here with timestamps, classification outputs, and model confidence scores.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Headline</th>
                  <th className="py-3 px-4">Prediction</th>
                  <th className="py-3 px-4 text-right">Confidence</th>
                  <th className="py-3 px-4">Model</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">{item.timestamp}</td>
                    <td className="py-3 px-4 font-medium text-slate-900 max-w-md">{item.headline}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {item.prediction === 'REAL NEWS' ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          REAL NEWS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-red-700">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          FAKE NEWS
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {(item.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {item.modelType}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectHeadline(item.headline)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                      >
                        <span>Re-test</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
