import React, { useState, useEffect } from 'react';
import { AuthSession, DetectionHistoryItem } from './types';
import { authService } from './services/auth';
import { historyService } from './services/history';
import { Header } from './components/Header';
import { AuthView } from './components/AuthView';
import { Dashboard } from './components/Dashboard';
import { DatasetMetricsView } from './components/DatasetMetricsView';
import { WorkflowView } from './components/WorkflowModal';
import { HistoryView } from './components/HistoryDrawer';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(() => authService.getCurrentSession());
  const [activeTab, setActiveTab] = useState<'detector' | 'dataset' | 'workflow' | 'history'>('detector');
  const [selectedHeadline, setSelectedHeadline] = useState<string>('');
  const [history, setHistory] = useState<DetectionHistoryItem[]>([]);

  // Load history when session is valid
  useEffect(() => {
    if (session?.user?.id) {
      setHistory(historyService.getHistory(session.user.id));
    } else {
      setHistory([]);
    }
  }, [session]);

  const handleAuthenticated = (newSession: AuthSession) => {
    setSession(newSession);
    setActiveTab('detector');
  };

  const handleLogout = () => {
    authService.logout();
    setSession(null);
    setActiveTab('detector');
    setSelectedHeadline('');
  };

  const handleRecordHistory = (
    headline: string,
    prediction: 'REAL NEWS' | 'FAKE NEWS',
    confidence: number,
    modelType: string
  ) => {
    if (!session?.user?.id) return;
    const item = historyService.addEntry({
      userId: session.user.id,
      headline,
      prediction,
      confidence,
      modelType
    });
    setHistory(prev => [item, ...prev.slice(0, 99)]);
  };

  const handleSelectHeadlineFromView = (headline: string) => {
    setSelectedHeadline(headline);
    setActiveTab('detector');
  };

  const handleClearHistory = () => {
    if (session?.user?.id) {
      historyService.clearHistory(session.user.id);
      setHistory([]);
    }
  };

  // If not authenticated, render Login / Sign-Up (FR1 & FR2)
  if (!session) {
    return <AuthView onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Header
        user={session.user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'detector' && (
          <Dashboard
            user={session.user}
            onLogout={handleLogout}
            onRecordHistory={handleRecordHistory}
            initialHeadline={selectedHeadline}
          />
        )}

        {activeTab === 'dataset' && (
          <DatasetMetricsView onSelectHeadline={handleSelectHeadlineFromView} />
        )}

        {activeTab === 'workflow' && <WorkflowView />}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onSelectHeadline={handleSelectHeadlineFromView}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Fake News Detection System</span>
            <span>·</span>
            <span>Machine Learning & NLP Framework</span>
          </div>
          <div className="text-slate-400">
            Compliant with Software Requirements Specification (SRS)
          </div>
        </div>
      </footer>
    </div>
  );
}
