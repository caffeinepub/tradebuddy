export interface StockOption {
  symbol: string;
  name: string;
  price: number;
}

export interface PricePoint {
  time: string;
  price: number;
  volume?: number;
}

export const stockOptions: StockOption[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.33 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.48 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22 },
  { symbol: 'META', name: 'Meta Platforms', price: 355.64 },
];

export function generateMockPriceData(basePrice: number, points: number = 50): PricePoint[] {
  const data: PricePoint[] = [];
  let price = basePrice;
  const now = Date.now();
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * (basePrice * 0.02);
    price = Math.max(price + change, basePrice * 0.9);
    price = Math.min(price, basePrice * 1.1);
    
    data.push({
      time: new Date(now - (points - i) * 60000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000,
    });
  }
  
  return data;
}
