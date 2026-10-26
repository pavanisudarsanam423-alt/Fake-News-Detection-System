import React from 'react';
import { Cpu, ArrowDown, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Filter, Hash, Table } from 'lucide-react';

export const WorkflowView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          <Cpu className="w-4 h-4" />
          <span>Section 9: System Workflow & Technical Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Machine Learning Pipeline Architecture
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
          Visualizing the end-to-end data processing workflow from user input through tokenization, stemming, TF-IDF vectorization, and probabilistic classification.
        </p>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto">
          {/* Step 1: START */}
          <div className="w-full text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
              START
            </div>
            <div className="flex justify-center my-2 text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Step 2: Auth */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">FR1 & FR2</span>
            <div className="text-sm font-bold text-slate-800">User Sign Up / Sign In Authentication</div>
            <div className="text-xs text-slate-500 mt-0.5">Secure SHA-256 session issuance and access validation</div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 3: Dashboard */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">FR3</span>
            <div className="text-sm font-bold text-slate-800">Headline Input on Dashboard</div>
            <div className="text-xs text-slate-500 mt-0.5">User enters or pastes target news headline string</div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 4: NLP Preprocessing */}
          <div className="w-full bg-indigo-50/60 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">FR4: NLP Preprocessing</span>
              <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">5 Sub-stages</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-semibold text-slate-900">a. Lowercase:</span> Normalize all casing
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-semibold text-slate-900">b. Clean:</span> Strip punctuation & digits
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-semibold text-slate-900">c. Stopwords:</span> Eliminate noise words
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="font-semibold text-slate-900">d. Stemming:</span> Porter Stemmer affix stripping
              </div>
            </div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 5: Feature Extraction */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">FR5</span>
            <div className="text-sm font-bold text-slate-800">TF-IDF Vectorization</div>
            <div className="text-xs text-slate-600 mt-0.5 font-mono">
              TF(t, d) × ln((1 + N)/(1 + DF(t))) + 1 with L2 Normalization
            </div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 6: Model Classification */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">FR6</span>
            <div className="text-sm font-bold text-slate-800">Trained Machine Learning Model</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Multinomial Naive Bayes (Laplace smoothed) / Logistic Regression
            </div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 7: Classification Split */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="border-2 border-red-200 bg-red-50/60 rounded-xl p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-sm font-extrabold text-red-800 uppercase tracking-wider">FAKE NEWS</div>
              <div className="text-[11px] text-red-700 mt-1">High clickbait / viral deception probability</div>
            </div>

            <div className="border-2 border-emerald-200 bg-emerald-50/60 rounded-xl p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-sm font-extrabold text-emerald-800 uppercase tracking-wider">REAL NEWS</div>
              <div className="text-[11px] text-emerald-700 mt-1">Matches journalistic press patterns</div>
            </div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 8: Display */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">FR7</span>
            <div className="text-sm font-bold text-slate-800">Display Result & Probability Breakdown</div>
            <div className="text-xs text-slate-500 mt-0.5">Show confidence score, influential terms, and SRS project disclaimer</div>
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 9: END */}
          <div className="w-full text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-bold uppercase tracking-widest">
              LOGOUT / END
            </div>
          </div>
        </div>
      </div>

      {/* Academic Disclaimer Card */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
        <span className="font-bold block mb-1">Important Project Presentation Note (from Section 10):</span>
        The system's Fake/Real result is an ML prediction based on patterns learned from the labeled dataset. It should not be described as absolute proof that a headline is factually true or false. This distinction is especially critical in academic evaluations and project demonstrations.
      </div>
    </div>
  );
};
