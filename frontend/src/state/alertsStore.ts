import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Alert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  target: number;
  enabled: boolean;
  createdAt: string;
}

interface AlertsState {
  alerts: Alert[];
  addAlert: (symbol: string, condition: 'above' | 'below', target: number) => void;
  toggleAlert: (id: string) => void;
  deleteAlert: (id: string) => void;
}

export const useAlerts = create<AlertsState>()(
  persist(
    (set) => ({
      alerts: [],

      addAlert: (symbol, condition, target) => {
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              id: Date.now().toString(),
              symbol,
              condition,
              target,
              enabled: true,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      toggleAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
          ),
        }));
      },

      deleteAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        }));
      },
    }),
    {
      name: 'alerts-storage',
    }
  )
);
