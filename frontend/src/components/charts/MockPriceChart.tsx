import { useEffect, useRef } from 'react';
import { PricePoint } from '@/lib/mockData/trading';

interface MockPriceChartProps {
  data: PricePoint[];
}

export default function MockPriceChart({ data }: MockPriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 50, bottom: 30, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get price range
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Draw grid lines
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }

    // Draw price labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim();
    ctx.font = '11px system-ui';
    ctx.textAlign = 'left';
    
    for (let i = 0; i <= 4; i++) {
      const price = maxPrice - (priceRange / 4) * i;
      const y = padding.top + (chartHeight / 4) * i;
      ctx.fillText(`$${price.toFixed(2)}`, padding.left + chartWidth + 5, y + 4);
    }

    // Draw line chart
    if (data.length > 1) {
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const isPositive = lastPrice >= firstPrice;
      
      // Get color from CSS variables
      const lineColor = isPositive ? 
        'oklch(0.65 0.15 150)' : // success color
        'oklch(0.60 0.22 20)';   // destructive color

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      data.forEach((point, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
      gradient.addColorStop(0, isPositive ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      data.forEach((point, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
      ctx.lineTo(padding.left, padding.top + chartHeight);
      ctx.closePath();
      ctx.fill();
    }

  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-64"
      style={{ display: 'block' }}
    />
  );
}
