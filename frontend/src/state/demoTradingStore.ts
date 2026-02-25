import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

interface DemoTradingState {
  balance: number;
  positions: Position[];
  history: Trade[];
  buyStock: (symbol: string, name: string, price: number, quantity: number) => void;
  sellStock: (symbol: string, price: number, quantity: number) => void;
  totalValue: number;
  profitLoss: number;
}

const INITIAL_BALANCE = 100000;

export const useDemoTrading = create<DemoTradingState>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      positions: [],
      history: [],
      totalValue: INITIAL_BALANCE,
      profitLoss: 0,

      buyStock: (symbol, name, price, quantity) => {
        const total = price * quantity;
        const currentBalance = get().balance;

        if (total > currentBalance) {
          return; // Not enough balance
        }

        set((state) => {
          const existingPosition = state.positions.find((p) => p.symbol === symbol);
          let newPositions: Position[];

          if (existingPosition) {
            const totalQuantity = existingPosition.quantity + quantity;
            const totalCost = existingPosition.avgPrice * existingPosition.quantity + total;
            newPositions = state.positions.map((p) =>
              p.symbol === symbol
                ? { ...p, quantity: totalQuantity, avgPrice: totalCost / totalQuantity }
                : p
            );
          } else {
            newPositions = [...state.positions, { symbol, name, quantity, avgPrice: price }];
          }

          const newBalance = currentBalance - total;
          const positionsValue = newPositions.reduce((sum, p) => sum + p.quantity * p.avgPrice, 0);
          const totalValue = newBalance + positionsValue;
          const profitLoss = totalValue - INITIAL_BALANCE;

          return {
            balance: newBalance,
            positions: newPositions,
            history: [
              {
                id: Date.now().toString(),
                symbol,
                type: 'buy',
                quantity,
                price,
                total,
                timestamp: new Date().toLocaleString(),
              },
              ...state.history,
            ],
            totalValue,
            profitLoss,
          };
        });
      },

      sellStock: (symbol, price, quantity) => {
        const position = get().positions.find((p) => p.symbol === symbol);
        if (!position || position.quantity < quantity) {
          return; // Not enough shares
        }

        const total = price * quantity;

        set((state) => {
          const newPositions = state.positions
            .map((p) =>
              p.symbol === symbol
                ? { ...p, quantity: p.quantity - quantity }
                : p
            )
            .filter((p) => p.quantity > 0);

          const newBalance = state.balance + total;
          const positionsValue = newPositions.reduce((sum, p) => sum + p.quantity * p.avgPrice, 0);
          const totalValue = newBalance + positionsValue;
          const profitLoss = totalValue - INITIAL_BALANCE;

          return {
            balance: newBalance,
            positions: newPositions,
            history: [
              {
                id: Date.now().toString(),
                symbol,
                type: 'sell',
                quantity,
                price,
                total,
                timestamp: new Date().toLocaleString(),
              },
              ...state.history,
            ],
            totalValue,
            profitLoss,
          };
        });
      },
    }),
    {
      name: 'demo-trading-storage',
    }
  )
);
