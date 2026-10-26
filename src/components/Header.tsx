import React from 'react';
import { User } from '../types';
import { ShieldCheck, LogOut, Database, Cpu, History, Newspaper } from 'lucide-react';

interface HeaderProps {
  user: User;
  activeTab: 'detector' | 'dataset' | 'workflow' | 'history';
  onTabChange: (tab: 'detector' | 'dataset' | 'workflow' | 'history') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <button
              onClick={() => onTabChange('detector')}
              className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-slate-200 transition-colors text-left"
            >
              FAKE NEWS DETECTOR
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button
              onClick={() => onTabChange('detector')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'detector'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Detector</span>
            </button>

            <button
              onClick={() => onTabChange('dataset')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'dataset'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Dataset & Model</span>
            </button>

            <button
              onClick={() => onTabChange('workflow')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'workflow'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>ML Workflow</span>
            </button>

            <button
              onClick={() => onTabChange('history')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
          </nav>

          {/* Zone 3: User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-medium text-slate-200 truncate max-w-[140px] sm:max-w-[180px]">
                {user.name}
              </span>
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[140px] sm:max-w-[180px]">
                {user.email}
              </span>
            </div>

            <button
              onClick={onLogout}
              title="Terminate active session and return to Login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-red-950/40 hover:text-red-300 hover:border-red-800/50 border border-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden border-t border-slate-800 py-2 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => onTabChange('detector')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'detector' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Detector
          </button>
          <button
            onClick={() => onTabChange('dataset')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'dataset' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Dataset & Model
          </button>
          <button
            onClick={() => onTabChange('workflow')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'workflow' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            ML Workflow
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${
              activeTab === 'history' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            History
          </button>
        </div>
      </div>
    </header>
  );
};
