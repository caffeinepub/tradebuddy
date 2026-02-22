import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { marketOverview, trendingStocks, indices, watchlist } from '@/lib/mockData/markets';

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">
            <span className="animate-title-entrance inline-block">TradeBuddy</span>
          </h1>
          <p className="text-sm text-muted-foreground">Your beginner-friendly trading companion</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Market Overview */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Market Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {marketOverview.map((item) => (
              <Card key={item.label}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                  <p className={`text-sm font-medium ${item.isPositive ? 'text-success' : 'text-destructive'}`}>
                    {item.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Stocks */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Trending Stocks</h2>
          <Card>
            <CardContent className="p-0">
              {trendingStocks.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className={`flex items-center justify-between p-4 ${
                    index !== trendingStocks.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                      stock.changePercent > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${stock.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      {stock.changePercent > 0 ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <p className={`text-xs font-medium ${
                        stock.changePercent > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Indices */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Major Indices</h2>
          <div className="space-y-3">
            {indices.map((index) => (
              <Card key={index.symbol}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{index.name}</p>
                    <p className="text-xs text-muted-foreground">{index.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{index.price.toFixed(2)}</p>
                    <p className={`text-sm font-medium ${
                      index.changePercent > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {index.changePercent > 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Watchlist */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-warning fill-warning" />
            <h2 className="text-lg font-semibold">My Watchlist</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {watchlist.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className={`flex items-center justify-between p-4 ${
                    index !== watchlist.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${stock.price.toFixed(2)}</p>
                    <p className={`text-xs font-medium ${
                      stock.changePercent > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
