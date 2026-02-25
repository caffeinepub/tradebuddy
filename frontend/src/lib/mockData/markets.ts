export interface MarketOverview {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export const marketOverview: MarketOverview[] = [
  { label: 'S&P 500', value: '4,783.45', change: '+1.2%', isPositive: true },
  { label: 'Nasdaq', value: '15,011.35', change: '+1.8%', isPositive: true },
  { label: 'Dow Jones', value: '37,545.33', change: '+0.8%', isPositive: true },
  { label: 'Russell 2000', value: '2,045.67', change: '-0.3%', isPositive: false },
];

export const trendingStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 2.45, changePercent: 1.34 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 5.23, changePercent: 1.40 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -1.20, changePercent: -0.84 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.33, change: 3.12, changePercent: 2.05 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.48, change: -4.56, changePercent: -1.80 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 12.34, changePercent: 2.56 },
];

export const indices: Stock[] = [
  { symbol: 'SPX', name: 'S&P 500 Index', price: 4783.45, change: 56.78, changePercent: 1.20 },
  { symbol: 'IXIC', name: 'NASDAQ Composite', price: 15011.35, change: 265.12, changePercent: 1.80 },
  { symbol: 'DJI', name: 'Dow Jones Industrial', price: 37545.33, change: 298.67, changePercent: 0.80 },
];

export const watchlist: Stock[] = [
  { symbol: 'META', name: 'Meta Platforms', price: 355.64, change: 4.23, changePercent: 1.20 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 487.55, change: -2.34, changePercent: -0.48 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 148.92, change: 3.45, changePercent: 2.37 },
];
