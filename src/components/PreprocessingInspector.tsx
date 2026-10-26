import React, { useState } from 'react';
import { PreprocessingStepResult, TfidfFeatureItem } from '../types';
import { Sparkles, FileText, Filter, Scissors, Hash, Table, Info, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PreprocessingInspectorProps {
  preprocessing: PreprocessingStepResult;
  tfidfFeatures: TfidfFeatureItem[];
  modelType: string;
}

export const PreprocessingInspector: React.FC<PreprocessingInspectorProps> = ({
  preprocessing,
  tfidfFeatures,
  modelType
}) => {
  const [activeTab, setActiveTab] = useState<'nlp' | 'tfidf' | 'patterns'>('nlp');
  const [featureSearch, setFeatureSearch] = useState('');
  const specialAnalysis = preprocessing.specialCharAnalysis;

  const filteredFeatures = tfidfFeatures.filter(f =>
    f.term.toLowerCase().includes(featureSearch.toLowerCase()) ||
    f.stem.toLowerCase().includes(featureSearch.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            NLP Preprocessing & Feature Extraction Inspection
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('nlp')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'nlp'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FR4: Text Preprocessing (NLP)
          </button>
          <button
            onClick={() => setActiveTab('tfidf')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'tfidf'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FR5: TF-IDF Features ({tfidfFeatures.length})
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'patterns'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Textual Patterns & Symbols</span>
            {specialAnalysis?.isSuspicious && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      <div className="p-5">
        {activeTab === 'patterns' && specialAnalysis && (
          <div className="space-y-5">
            {/* Header banner explaining requirement */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              specialAnalysis.isSuspicious
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  specialAnalysis.isSuspicious ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {specialAnalysis.isSuspicious ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider">
                    {specialAnalysis.isSuspicious ? 'Flagged as Suspicious Pattern' : 'Normal Punctuation Pattern'}
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {specialAnalysis.isSuspicious
                      ? specialAnalysis.suspicionReason
                      : 'Special character frequency is within normal baseline journalistic parameters.'}
                  </div>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-300/60 sm:pl-4">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Symbol Density</div>
                <div className="text-xl font-bold font-mono">
                  {specialAnalysis.density}% ({specialAnalysis.totalCount} chars)
                </div>
              </div>
            </div>

            {/* Crucial specification notice */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Classification Feature Policy:</strong> This feature analyzes textual patterns including the frequency of special characters. While an unusually high number of special characters is flagged as suspicious, this metric is used strictly as an <em>additional classification feature</em> and does not independently determine whether the news is Fake or Real.
              </span>
            </div>

            {/* Detailed metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Total Special Chars</span>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                  {specialAnalysis.totalCount}
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Density in Headline</span>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                  {specialAnalysis.density}%
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Consecutive Punctuation</span>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                  {specialAnalysis.consecutivePunctuationFound ? 'Detected (!!, $$, ??)' : 'None'}
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Model Log-Odds Delta</span>
                <div className="text-xl font-bold font-mono text-indigo-600 mt-1">
                  {specialAnalysis.featureWeightAdjustment >= 0 ? `+${specialAnalysis.featureWeightAdjustment}` : specialAnalysis.featureWeightAdjustment}
                </div>
              </div>
            </div>

            {/* Found Characters breakdown */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Special Characters Inventory:
              </span>
              {specialAnalysis.foundCharacters.length === 0 ? (
                <div className="text-xs text-slate-400 italic">No non-alphanumeric special characters detected.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {specialAnalysis.foundCharacters.map((c, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-2xs text-xs font-mono flex items-center gap-2"
                    >
                      <span className="font-bold text-base text-indigo-700">{c.char}</span>
                      <span className="text-slate-500 text-[11px]">count: {c.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'nlp' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              The headline is processed through the 5-stage NLP cleaning pipeline prior to numerical vectorization:
            </p>

            {/* Pipeline Stage 1: Lowercase */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  1. Lowercase Conversion
                </span>
                <span className="text-[11px] font-mono text-slate-400">Standardized case</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-xs text-slate-700 break-words">
                {preprocessing.lowercaseText || '(Empty)'}
              </div>
            </div>

            {/* Pipeline Stage 2: Character Cleaning */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-indigo-500" />
                  2. Removing Unnecessary Characters & Punctuation
                </span>
                <span className="text-[11px] font-mono text-slate-400">Punctuation & symbols stripped</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-xs text-slate-700 break-words">
                {preprocessing.cleanedText || '(No alphanumeric text)'}
              </div>
            </div>

            {/* Pipeline Stage 3: Stopwords Removal */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-indigo-500" />
                  3. Stop Words Filtered ({preprocessing.removedStopwords.length} removed)
                </span>
                <span className="text-[11px] font-mono text-slate-400">High-frequency noise eliminated</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {preprocessing.removedStopwords.length > 0 ? (
                  preprocessing.removedStopwords.map((sw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-mono"
                    >
                      {sw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No common stop words detected in headline</span>
                )}
              </div>
              <div className="text-[11px] text-slate-500">
                Filtered tokens retained:{' '}
                <span className="font-mono text-slate-700 font-semibold">
                  {preprocessing.tokensWithoutStopwords.join(', ') || 'None'}
                </span>
              </div>
            </div>

            {/* Pipeline Stage 4 & 5: Tokenization & Stemming */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-indigo-500" />
                  4 & 5. Tokenization & Porter Stemming ({preprocessing.stemmedTokens.length} stems)
                </span>
                <span className="text-[11px] font-mono text-slate-400">Affixes stripped to base root</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {preprocessing.stemmedTokens.map((stem, idx) => {
                  const original = preprocessing.tokensWithoutStopwords[idx];
                  return (
                    <div
                      key={idx}
                      className="p-2 bg-white rounded border border-slate-200 text-xs flex flex-col justify-between"
                    >
                      <span className="text-slate-400 text-[10px] uppercase font-mono">Original</span>
                      <span className="font-medium text-slate-700">{original}</span>
                      <span className="text-indigo-500 text-[10px] uppercase font-mono mt-1">Porter Stem</span>
                      <span className="font-mono font-bold text-indigo-700">{stem}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tfidf' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">TF-IDF Formula:</span>{' '}
                <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700">
                  TF(t) × [ln((1 + N)/(1 + DF(t))) + 1]
                </code>{' '}
                with L2 vector normalization.
              </div>

              <input
                type="text"
                placeholder="Filter terms..."
                value={featureSearch}
                onChange={e => setFeatureSearch(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-200 rounded bg-white text-slate-800 placeholder-slate-400 w-full sm:w-44 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {filteredFeatures.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                No matching TF-IDF features found.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Token Term</th>
                      <th className="py-2.5 px-3">Porter Stem</th>
                      <th className="py-2.5 px-3 text-right">Count</th>
                      <th className="py-2.5 px-3 text-right">TF</th>
                      <th className="py-2.5 px-3 text-right">Doc Freq (DF)</th>
                      <th className="py-2.5 px-3 text-right">IDF Score</th>
                      <th className="py-2.5 px-3 text-right">Normalized TF-IDF</th>
                      <th className="py-2.5 px-3 text-center">Trained Pattern</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredFeatures.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-3 font-sans font-medium text-slate-900">{item.term}</td>
                        <td className="py-2 px-3 text-indigo-600 font-semibold">{item.stem}</td>
                        <td className="py-2 px-3 text-right tabular-nums">{item.rawFrequency}</td>
                        <td className="py-2 px-3 text-right tabular-nums">{item.termFrequency.toFixed(3)}</td>
                        <td className="py-2 px-3 text-right tabular-nums">{item.docFrequency}</td>
                        <td className="py-2 px-3 text-right tabular-nums text-slate-600">{item.inverseDocFrequency.toFixed(3)}</td>
                        <td className="py-2 px-3 text-right tabular-nums font-bold text-slate-900">
                          {item.tfidfWeight.toFixed(3)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.indicates === 'FAKE' ? (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800">
                              FAVORS FAKE
                            </span>
                          ) : item.indicates === 'REAL' ? (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              FAVORS REAL
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                              NEUTRAL
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Classifier: {modelType}</span>
              <span>Total vectorized vocabulary tokens: {tfidfFeatures.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
