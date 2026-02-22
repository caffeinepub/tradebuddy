import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDemoTrading } from '@/state/demoTradingStore';
import { stockOptions } from '@/lib/mockData/trading';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { useState } from 'react';

export default function DemoTrading() {
  const { balance, positions, history, buyStock, sellStock, totalValue, profitLoss } = useDemoTrading();
  const [selectedSymbol, setSelectedSymbol] = useState(stockOptions[0].symbol);
  const [quantity, setQuantity] = useState('1');

  const selectedStock = stockOptions.find((s) => s.symbol === selectedSymbol);
  const estimatedCost = selectedStock ? selectedStock.price * (parseFloat(quantity) || 0) : 0;

  const handleBuy = () => {
    if (selectedStock && parseFloat(quantity) > 0) {
      buyStock(selectedStock.symbol, selectedStock.name, selectedStock.price, parseFloat(quantity));
      setQuantity('1');
    }
  };

  const handleSell = (symbol: string) => {
    const position = positions.find((p) => p.symbol === symbol);
    if (position) {
      const currentStock = stockOptions.find((s) => s.symbol === symbol);
      if (currentStock) {
        sellStock(symbol, currentStock.price, position.quantity);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Demo Trading</h1>
          <p className="text-sm text-muted-foreground">Practice with virtual money</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Practice Mode Banner */}
        <Alert className="border-warning bg-warning/10">
          <Info className="h-4 w-4 text-warning" />
          <AlertDescription className="text-sm">
            <strong>Practice Mode:</strong> You're trading with virtual money. No real funds are at risk.
          </AlertDescription>
        </Alert>

        {/* Account Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Virtual Cash</p>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Profit/Loss</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(profitLoss).toFixed(2)}
              </p>
              {profitLoss >= 0 ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Place Demo Order */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Place Demo Order</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Select Stock</Label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stockOptions.map((stock) => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} - ${stock.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="demo-quantity" className="text-sm mb-2 block">Quantity</Label>
              <Input
                id="demo-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Cost</span>
                <span className="font-bold">${estimatedCost.toFixed(2)}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full h-12 bg-success hover:bg-success/90"
              onClick={handleBuy}
              disabled={estimatedCost > balance}
            >
              Buy with Virtual Money
            </Button>
          </CardContent>
        </Card>

        {/* Positions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">My Positions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {positions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No positions yet</p>
            ) : (
              positions.map((position, index) => {
                const currentStock = stockOptions.find((s) => s.symbol === position.symbol);
                const currentPrice = currentStock?.price || position.avgPrice;
                const currentValue = currentPrice * position.quantity;
                const positionPL = currentValue - (position.avgPrice * position.quantity);

                return (
                  <div
                    key={position.symbol}
                    className={`p-4 ${index !== positions.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{position.symbol}</p>
                        <p className="text-xs text-muted-foreground">{position.name}</p>
                      </div>
                      <Badge variant={positionPL >= 0 ? 'default' : 'destructive'}>
                        {positionPL >= 0 ? '+' : ''}{positionPL.toFixed(2)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{position.quantity} shares @ ${position.avgPrice.toFixed(2)}</span>
                      <Button size="sm" variant="outline" onClick={() => handleSell(position.symbol)}>
                        Sell All
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Trade History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Trade History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No trades yet</p>
            ) : (
              history.slice(0, 10).map((trade, index) => (
                <div
                  key={trade.id}
                  className={`p-4 ${index !== Math.min(history.length, 10) - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'}>
                          {trade.type.toUpperCase()}
                        </Badge>
                        <span className="font-semibold">{trade.symbol}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {trade.quantity} shares @ ${trade.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${trade.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{trade.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
