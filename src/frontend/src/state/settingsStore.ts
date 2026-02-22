import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  notifications: {
    priceAlerts: boolean;
    aiSignals: boolean;
    marketNews: boolean;
  };
}

interface SettingsStore extends Settings {
  setRiskLevel: (level: Settings['riskLevel']) => void;
  setNotifications: (notifications: Settings['notifications']) => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      riskLevel: 'moderate',
      notifications: {
        priceAlerts: true,
        aiSignals: true,
        marketNews: false,
      },
      setRiskLevel: (level) => set({ riskLevel: level }),
      setNotifications: (notifications) => set({ notifications }),
    }),
    {
      name: 'tradebuddy-settings',
    }
  )
);
