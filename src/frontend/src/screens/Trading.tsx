import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { stockOptions, generateMockPriceData } from '@/lib/mockData/trading';
import MockPriceChart from '@/components/charts/MockPriceChart';

export default function Trading() {
  const [selectedStock, setSelectedStock] = useState(stockOptions[0]);
  const [timeframe, setTimeframe] = useState('1D');
  const [quantity, setQuantity] = useState('1');
  const [indicators, setIndicators] = useState({
    ma: false,
    rsi: false,
    macd: false,
  });

  const priceData = generateMockPriceData(selectedStock.price);
  const estimatedTotal = (parseFloat(quantity) || 0) * selectedStock.price;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Trading</h1>
          <p className="text-sm text-muted-foreground">Buy and sell stocks</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Stock Selector */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm font-medium mb-2 block">Select Stock</Label>
            <Select
              value={selectedStock.symbol}
              onValueChange={(value) => {
                const stock = stockOptions.find((s) => s.symbol === value);
                if (stock) setSelectedStock(stock);
              }}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-muted-foreground ml-2">${stock.price.toFixed(2)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold">${selectedStock.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">{selectedStock.name}</span>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Price Chart</CardTitle>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList className="h-8">
                  <TabsTrigger value="1D" className="text-xs px-3">1D</TabsTrigger>
                  <TabsTrigger value="1W" className="text-xs px-3">1W</TabsTrigger>
                  <TabsTrigger value="1M" className="text-xs px-3">1M</TabsTrigger>
                  <TabsTrigger value="3M" className="text-xs px-3">3M</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <MockPriceChart data={priceData} />
          </CardContent>
        </Card>

        {/* Indicators */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Technical Indicators</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ma" className="text-sm">Moving Average (MA)</Label>
              <Switch
                id="ma"
                checked={indicators.ma}
                onCheckedChange={(checked) => setIndicators({ ...indicators, ma: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rsi" className="text-sm">Relative Strength Index (RSI)</Label>
              <Switch
                id="rsi"
                checked={indicators.rsi}
                onCheckedChange={(checked) => setIndicators({ ...indicators, rsi: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="macd" className="text-sm">MACD</Label>
              <Switch
                id="macd"
                checked={indicators.macd}
                onCheckedChange={(checked) => setIndicators({ ...indicators, macd: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Ticket */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Place Order</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div>
              <Label htmlFor="quantity" className="text-sm mb-2 block">Quantity (Shares)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Total</span>
                <span className="text-xl font-bold">${estimatedTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button size="lg" className="h-14 text-lg font-semibold bg-success hover:bg-success/90">
                Buy
              </Button>
              <Button size="lg" variant="destructive" className="h-14 text-lg font-semibold">
                Sell
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
