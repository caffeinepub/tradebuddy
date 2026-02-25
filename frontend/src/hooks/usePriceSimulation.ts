import { useState, useEffect, useRef } from 'react';
import { PricePoint } from '@/lib/mockData/trading';

export function usePriceSimulation(basePrice: number) {
  const [data, setData] = useState<PricePoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(3);
  const intervalRef = useRef<number | null>(null);
  const priceRef = useRef(basePrice);

  const generateNextPoint = () => {
    const change = (Math.random() - 0.5) * (basePrice * 0.015);
    priceRef.current = Math.max(priceRef.current + change, basePrice * 0.85);
    priceRef.current = Math.min(priceRef.current, basePrice * 1.15);

    return {
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      price: parseFloat(priceRef.current.toFixed(2)),
    };
  };

  const start = () => {
    if (data.length === 0) {
      // Initialize with some data
      const initialData: PricePoint[] = [];
      for (let i = 0; i < 20; i++) {
        initialData.push(generateNextPoint());
      }
      setData(initialData);
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    priceRef.current = basePrice;
    setData([]);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = 1000 / speed;
      intervalRef.current = window.setInterval(() => {
        setData((prevData) => {
          const newPoint = generateNextPoint();
          const newData = [...prevData, newPoint];
          // Keep last 50 points
          return newData.slice(-50);
        });
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed]);

  return {
    data,
    isRunning,
    speed,
    start,
    pause,
    reset,
    setSpeed,
  };
}
