import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import MockPriceChart from '@/components/charts/MockPriceChart';
import { usePriceSimulation } from '@/hooks/usePriceSimulation';

export default function LiveChartPractice() {
  const { data, isRunning, speed, start, pause, reset, setSpeed } = usePriceSimulation(150);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Live Chart Practice</h1>
          <p className="text-sm text-muted-foreground">Watch simulated market movements</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Info Banner */}
        <Alert className="border-primary bg-primary/10">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Practice Mode:</strong> This chart simulates real market movements. Watch how prices move up and down to understand market behavior. Use the controls below to start, pause, or reset the simulation.
          </AlertDescription>
        </Alert>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Simulated Price Movement</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <MockPriceChart data={data} />
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Simulation Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 h-14"
                onClick={isRunning ? pause : start}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 h-14"
                onClick={reset}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm">Simulation Speed</Label>
                <span className="text-sm font-medium">{speed}x</span>
              </div>
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Points */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">What to Observe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm">
                <strong>Price Trends:</strong> Notice how prices move in waves, creating uptrends and downtrends.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm">
                <strong>Volatility:</strong> Observe how quickly prices can change and the size of price swings.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm">
                <strong>Support & Resistance:</strong> Watch for price levels where the stock tends to bounce or reverse.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm">
                <strong>Timing:</strong> Practice identifying good entry and exit points based on price movements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
