export interface AISignal {
  id: string;
  symbol: string;
  type: 'bullish' | 'bearish' | 'neutral';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
}

export const mockAISignals: AISignal[] = [
  {
    id: 's1',
    symbol: 'AAPL',
    type: 'bullish',
    title: 'Strong Bullish Momentum',
    description: 'Technical indicators show strong upward momentum with RSI at 65 and MACD crossing above signal line.',
    confidence: 78,
    timestamp: '2 hours ago',
  },
  {
    id: 's2',
    symbol: 'TSLA',
    type: 'bearish',
    title: 'High Volatility Warning',
    description: 'Increased volatility detected. Consider tightening stop-loss levels or reducing position size.',
    confidence: 72,
    timestamp: '4 hours ago',
  },
  {
    id: 's3',
    symbol: 'MSFT',
    type: 'bullish',
    title: 'Breakout Opportunity',
    description: 'Price breaking above resistance level with strong volume. Potential continuation pattern forming.',
    confidence: 85,
    timestamp: '6 hours ago',
  },
  {
    id: 's4',
    symbol: 'GOOGL',
    type: 'neutral',
    title: 'Consolidation Phase',
    description: 'Stock trading in tight range. Wait for clear direction before entering new positions.',
    confidence: 65,
    timestamp: '1 day ago',
  },
];
