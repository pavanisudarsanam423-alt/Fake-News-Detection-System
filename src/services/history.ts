import { DetectionHistoryItem } from '../types';

const STORAGE_HISTORY_KEY = 'fakenews_detection_history';

export const historyService = {
  getHistory(userId: string): DetectionHistoryItem[] {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) return [];
    try {
      const items: DetectionHistoryItem[] = JSON.parse(raw);
      return items.filter(item => item.userId === userId);
    } catch {
      return [];
    }
  },

  addEntry(entry: Omit<DetectionHistoryItem, 'id' | 'timestamp'>): DetectionHistoryItem {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    let items: DetectionHistoryItem[] = [];
    if (raw) {
      try {
        items = JSON.parse(raw);
      } catch {
        items = [];
      }
    }

    const newItem: DetectionHistoryItem = {
      ...entry,
      id: 'hist-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    items.unshift(newItem);
    // Keep last 100 entries
    if (items.length > 100) {
      items = items.slice(0, 100);
    }

    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(items));
    return newItem;
  },

  clearHistory(userId: string): void {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) return;
    try {
      const items: DetectionHistoryItem[] = JSON.parse(raw);
      const filtered = items.filter(item => item.userId !== userId);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(filtered));
    } catch {
      localStorage.removeItem(STORAGE_HISTORY_KEY);
    }
  }
};
