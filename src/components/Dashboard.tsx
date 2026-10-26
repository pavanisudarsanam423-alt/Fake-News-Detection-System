import React, { useState } from 'react';
import { PredictionResult, User } from '../types';
import { mlEngine } from '../ml/model';
import { PreprocessingInspector } from './PreprocessingInspector';
import {
  ShieldAlert,
  ShieldCheck,
  Send,
  RotateCcw,
  Sparkles,
  Info,
  Sliders,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Layers
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onRecordHistory: (headline: string, prediction: 'REAL NEWS' | 'FAKE NEWS', confidence: number, model: string) => void;
  initialHeadline?: string;
}

const SAMPLE_HEADLINES = [
  {
    type: 'fake',
    label: 'SRS Section 10 Example',
    text: 'Government announces free smartphones for every citizen.'
  },
  {
    type: 'fake',
    label: 'SRS FR3 Example',
    text: 'Government announces free laptops for every college student in India.'
  },
  {
    type: 'fake',
    label: 'Suspicious Symbols Pattern (!!!, $$$, ???)',
    text: '!!! SHOCKING: Government secretly giving away 100% FREE $$$ laptops to everyone right NOW ???'
  },
  {
    type: 'real',
    label: 'Real (Reuters/AP)',
    text: 'Federal Reserve leaves benchmark interest rates unchanged following two-day monetary policy meeting.'
  },
  {
    type: 'real',
    label: 'Normal Symbols (2.4%, quotes)',
    text: 'Treasury reports core inflation index stabilized at 2.4%, matching economic forecasts.'
  },
  {
    type: 'fake',
    label: 'Fake (Health Hoax)',
    text: 'Drinking boiled garlic water completely cures all viral infections within 24 hours.'
  }
];

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onLogout,
  onRecordHistory,
  initialHeadline
}) => {
  const [headline, setHeadline] = useState(initialHeadline || '');
  const [modelType, setModelType] = useState<'Multinomial Naive Bayes' | 'Logistic Regression'>('Multinomial Naive Bayes');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // If initialHeadline changes externally (from Dataset view or History)
  React.useEffect(() => {
    if (initialHeadline) {
      setHeadline(initialHeadline);
      handleDetect(initialHeadline, modelType);
    }
  }, [initialHeadline]);

  const handleDetect = (textToAnalyze?: string, selectedModel?: 'Multinomial Naive Bayes' | 'Logistic Regression') => {
    const text = (textToAnalyze !== undefined ? textToAnalyze : headline).trim();
    const model = selectedModel || modelType;

    if (!text) {
      setValidationError('Please enter or paste a news headline to analyze.');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    // Simulate minor processing settling latency for smooth feedback
    setTimeout(() => {
      const pred = mlEngine.predictHeadline(text, model);
      setResult(pred);
      setIsProcessing(false);

      onRecordHistory(text, pred.prediction, pred.confidence, model);
    }, 180);
  };

  // FR8 - Clear Input
  const handleClear = () => {
    setHeadline('');
    setResult(null);
    setValidationError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          FAKE NEWS DETECTOR
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Enter or paste any news headline to classify it through the NLP preprocessing pipeline and trained Machine Learning classifier.
        </p>
      </div>

      {/* Main Input Card - Section 5 GUI */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>Enter News Headline</span>
          </label>

          {/* Model Selection Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Model:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setModelType('Multinomial Naive Bayes');
                  if (result) handleDetect(headline, 'Multinomial Naive Bayes');
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  modelType === 'Multinomial Naive Bayes'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Naive Bayes (Multinomial)
              </button>
              <button
                type="button"
                onClick={() => {
                  setModelType('Logistic Regression');
                  if (result) handleDetect(headline, 'Logistic Regression');
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  modelType === 'Logistic Regression'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Logistic Regression
              </button>
            </div>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative">
          <textarea
            rows={4}
            value={headline}
            onChange={e => {
              setHeadline(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Enter or paste your news headline"
            className="w-full p-4 text-sm sm:text-base border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner font-sans resize-y"
          />

          {headline && (
            <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 font-mono">
              {headline.length} chars
            </div>
          )}
        </div>

        {validationError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Quick Sample Headlines */}
        <div className="pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Test with Benchmark Headline Examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_HEADLINES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setHeadline(sample.text);
                  handleDetect(sample.text, modelType);
                }}
                className={`text-xs px-2.5 py-1 rounded-md border text-left transition-colors cursor-pointer ${
                  sample.type === 'fake'
                    ? 'bg-red-50/50 hover:bg-red-50 border-red-200 text-red-800'
                    : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <span className="font-semibold mr-1.5 opacity-70">[{sample.label}]</span>
                <span className="truncate max-w-[280px] sm:max-w-xs inline-block align-bottom">{sample.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: [ DETECT NEWS ] & [ CLEAR ] - Section 5 GUI */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            disabled={isProcessing || !headline.trim()}
            onClick={() => handleDetect()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isProcessing ? 'ANALYZING...' : 'DETECT NEWS'}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg border border-slate-200 focus:outline-none transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>CLEAR</span>
          </button>
        </div>
      </div>

      {/* Result Display Card - Section 5 GUI & FR7 & Section 10 */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center pt-2">
            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-800">
              RESULT
            </span>
          </div>

          {/* Centered Box matching Section 5 ASCII GUI diagram */}
          <div className="flex justify-center">
            <div
              className={`border-4 rounded-2xl px-10 py-5 text-center shadow-lg transition-all ${
                result.prediction === 'REAL NEWS'
                  ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-red-600 border-red-700 text-white shadow-red-500/20'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-widest opacity-90 mb-1">
                Prediction:
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-wider uppercase font-mono">
                {result.prediction}
              </div>
            </div>
          </div>

          {/* Detailed ML Metrics & Explainability Container */}
          <div
            className={`border-2 rounded-xl p-6 sm:p-7 shadow-xs transition-all ${
              result.prediction === 'REAL NEWS'
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-red-50/70 border-red-300 text-red-950'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                    result.prediction === 'REAL NEWS' ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                >
                  {result.prediction === 'REAL NEWS' ? (
                    <ShieldCheck className="w-7 h-7" />
                  ) : (
                    <ShieldAlert className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Classification Status
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Prediction: {result.prediction}
                  </div>
                </div>
              </div>

              {/* Confidence Gauge */}
              <div className="bg-white/80 backdrop-blur-xs border border-slate-200/80 p-3.5 rounded-xl text-right sm:min-w-[190px]">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Model Confidence
                </div>
                <div className="text-2xl font-black font-mono tabular-nums text-slate-900 mt-0.5">
                  {(result.confidence * 100).toFixed(1)}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  Real: {(result.probabilities.real * 100).toFixed(1)}% · Fake: {(result.probabilities.fake * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Probability Bar */}
            <div className="mt-6 pt-5 border-t border-slate-200/80">
              <div className="flex justify-between text-xs font-semibold mb-1.5 font-mono">
                <span className="text-emerald-800">
                  REAL NEWS PROBABILITY: {(result.probabilities.real * 100).toFixed(1)}%
                </span>
                <span className="text-red-800">
                  FAKE NEWS PROBABILITY: {(result.probabilities.fake * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${result.probabilities.real * 100}%` }}
                ></div>
                <div
                  className="bg-red-500 h-full transition-all duration-500"
                  style={{ width: `${result.probabilities.fake * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Top Indicator Terms */}
            {result.topIndicators.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Key Lexical Signals Influencing Model:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.topIndicators.map((ind, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono border font-medium ${
                        ind.favors === 'FAKE'
                          ? 'bg-red-100/80 border-red-300 text-red-900'
                          : 'bg-emerald-100/80 border-emerald-300 text-emerald-900'
                      }`}
                    >
                      <span className="font-bold">"{ind.term}"</span> (favors {ind.favors})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Textual Pattern & Special Character Analysis Indicator */}
            {result.specialCharAnalysis && (
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <div
                  className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                    result.specialCharAnalysis.isSuspicious
                      ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                      : 'bg-white/60 border-slate-200 text-slate-700'
                  }`}
                >
                  {result.specialCharAnalysis.isSuspicious ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>Textual Pattern Analysis:</span>
                      {result.specialCharAnalysis.isSuspicious ? (
                        <span className="text-amber-800 font-extrabold uppercase font-mono tracking-wider">
                          [Suspicious Special Character Density: {result.specialCharAnalysis.density}%]
                        </span>
                      ) : (
                        <span className="text-emerald-800 font-semibold font-mono">
                          [Standard Special Character Frequency: {result.specialCharAnalysis.density}%]
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs">
                      {result.specialCharAnalysis.isSuspicious ? (
                        <span>
                          {result.specialCharAnalysis.suspicionReason}{' '}
                          <span className="font-medium text-amber-900">
                            This metric is used as an additional classification feature and does not independently determine whether the news is Fake or Real.
                          </span>
                        </span>
                      ) : (
                        <span>
                          Total of {result.specialCharAnalysis.totalCount} special character(s) detected. Evaluated as an auxiliary classification feature.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mandatory Academic Note from Section 10 */}
            <div className="mt-6 p-3.5 rounded-lg bg-white/70 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Model Disclaimer (from SRS Section 10):</strong> The system's Fake/Real result is an ML prediction based on statistical patterns learned from the labeled dataset. It should not be described as proof that a headline is factually true or false.
              </span>
            </div>
          </div>

          {/* Interactive Inspection for FR4 (NLP) & FR5 (TF-IDF) */}
          <PreprocessingInspector
            preprocessing={result.preprocessing}
            tfidfFeatures={result.tfidfFeatures}
            modelType={result.modelType}
          />
        </div>
      )}

      {/* Logout Option - Section 5 GUI */}
      <div className="text-center pt-8 border-t border-slate-200">
        <button
          type="button"
          onClick={onLogout}
          className="px-6 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          [ LOGOUT ]
        </button>
      </div>
    </div>
  );
};
