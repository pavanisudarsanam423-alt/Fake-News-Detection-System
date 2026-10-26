import React, { useState } from 'react';
import { BENCHMARK_DATASET } from '../ml/dataset';
import { mlEngine } from '../ml/model';
import { DatasetItem, NewsLabel } from '../types';
import { Database, BarChart3, Search, Filter, ArrowUpRight, CheckCircle2, AlertTriangle, Layers, BookOpen } from 'lucide-react';

interface DatasetMetricsViewProps {
  onSelectHeadline: (headline: string) => void;
}

export const DatasetMetricsView: React.FC<DatasetMetricsViewProps> = ({ onSelectHeadline }) => {
  const metrics = mlEngine.getMetrics();
  const [filterLabel, setFilterLabel] = useState<'ALL' | NewsLabel>('ALL');
  const [filterSplit, setFilterSplit] = useState<'ALL' | 'train' | 'test'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDataset = BENCHMARK_DATASET.filter(item => {
    if (filterLabel !== 'ALL' && item.label !== filterLabel) return false;
    if (filterSplit !== 'ALL' && item.split !== filterSplit) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.headline.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const realCount = BENCHMARK_DATASET.filter(d => d.label === 'REAL').length;
  const fakeCount = BENCHMARK_DATASET.filter(d => d.label === 'FAKE').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Context */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          <Database className="w-4 h-4" />
          <span>Section 3: Machine Learning & Training Dataset Requirements</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Dataset Architecture & ML Performance Evaluation
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 max-w-3xl">
          The Fake News Detection System is trained on labeled news datasets partitioned into 80% Training and 20% Testing subsets. Features are extracted via TF-IDF vectorization and classified with Laplace-smoothed Multinomial Naive Bayes and Logistic Regression.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Test Accuracy</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {(metrics.accuracy * 100).toFixed(1)}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">High Precision</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Evaluated on unseen test set</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">F1-Score</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
              {(metrics.f1Score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Harmonic mean of Prec & Rec</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Precision / Recall</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 font-mono tabular-nums">
              {(metrics.precision * 100).toFixed(0)}% / {(metrics.recall * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Balanced false-alarm rate</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vocabulary Terms</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metrics.vocabularySize}
            </span>
            <span className="text-xs text-slate-500">Stems</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Trained TF-IDF dictionary</div>
        </div>
      </div>

      {/* Confusion Matrix & Dataset Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Confusion Matrix (Testing Set)</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">N = {metrics.testCount} test samples</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {/* TP */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4 text-center">
              <div className="text-[11px] font-semibold uppercase text-emerald-800 tracking-wider">
                True Positive (Real)
              </div>
              <div className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">
                {metrics.confusionMatrix.truePositive}
              </div>
              <div className="text-[11px] text-emerald-600 mt-0.5">Real News correctly detected</div>
            </div>

            {/* FP */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 text-center">
              <div className="text-[11px] font-semibold uppercase text-amber-800 tracking-wider">
                False Positive
              </div>
              <div className="text-2xl font-extrabold font-mono text-amber-700 mt-1">
                {metrics.confusionMatrix.falsePositive}
              </div>
              <div className="text-[11px] text-amber-600 mt-0.5">Fake classified as Real</div>
            </div>

            {/* FN */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 text-center">
              <div className="text-[11px] font-semibold uppercase text-amber-800 tracking-wider">
                False Negative
              </div>
              <div className="text-2xl font-extrabold font-mono text-amber-700 mt-1">
                {metrics.confusionMatrix.falseNegative}
              </div>
              <div className="text-[11px] text-amber-600 mt-0.5">Real classified as Fake</div>
            </div>

            {/* TN */}
            <div className="bg-red-50/70 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-[11px] font-semibold uppercase text-red-800 tracking-wider">
                True Negative (Fake)
              </div>
              <div className="text-2xl font-extrabold font-mono text-red-700 mt-1">
                {metrics.confusionMatrix.trueNegative}
              </div>
              <div className="text-[11px] text-red-600 mt-0.5">Fake News correctly caught</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Class balance in corpus:</span>
            <span className="font-semibold text-slate-700">
              {realCount} Real Articles / {fakeCount} Fake Articles (50/50 balanced)
            </span>
          </div>
        </div>

        {/* Dataset Partitioning Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Dataset Splits & Categories</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Total {BENCHMARK_DATASET.length} articles</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Training Set (80%)</span>
                <span className="font-mono">{metrics.trainCount} articles</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(metrics.trainCount / BENCHMARK_DATASET.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Testing Set (20%)</span>
                <span className="font-mono">{metrics.testCount} articles</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: `${(metrics.testCount / BENCHMARK_DATASET.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block mb-2">Domain Distribution</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Politics', 'Science & Health', 'Government & Policy', 'Technology', 'World', 'Entertainment & Viral'].map(cat => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Browser Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Labeled Benchmark Headlines</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any headline to populate it into the detector dashboard for immediate analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 sm:w-56"
              />
            </div>

            {/* Label Filter */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setFilterLabel('ALL')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLabel === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLabel('REAL')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLabel === 'REAL' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Real
              </button>
              <button
                onClick={() => setFilterLabel('FAKE')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterLabel === 'FAKE' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Fake
              </button>
            </div>

            {/* Split Filter */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setFilterSplit('ALL')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterSplit === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                All Splits
              </button>
              <button
                onClick={() => setFilterSplit('train')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterSplit === 'train' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Train
              </button>
              <button
                onClick={() => setFilterSplit('test')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  filterSplit === 'test' ? 'bg-white text-cyan-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Test
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Headline Text</th>
                <th className="py-3 px-4">True Label</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Source / Origin</th>
                <th className="py-3 px-4">Split</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDataset.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 max-w-md">{item.headline}</td>
                  <td className="py-3 px-4">
                    {item.label === 'REAL' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        REAL
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        FAKE
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{item.source}</td>
                  <td className="py-3 px-4">
                    <span className="uppercase text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.split}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectHeadline(item.headline)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
