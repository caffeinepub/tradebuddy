import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAlerts } from '@/state/alertsStore';
import { mockAISignals } from '@/lib/mockData/aiSignals';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function Alerts() {
  const { alerts, addAlert, toggleAlert, deleteAlert } = useAlerts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: 'AAPL',
    condition: 'above',
    target: '',
  });

  const handleAddAlert = () => {
    if (newAlert.target) {
      addAlert(newAlert.symbol, newAlert.condition as 'above' | 'below', parseFloat(newAlert.target));
      setNewAlert({ symbol: 'AAPL', condition: 'above', target: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Alerts & Signals</h1>
          <p className="text-sm text-muted-foreground">Stay informed about market movements</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Price Alerts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Price Alerts</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Alert
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Price Alert</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="text-sm mb-2 block">Stock Symbol</Label>
                    <Select value={newAlert.symbol} onValueChange={(value) => setNewAlert({ ...newAlert, symbol: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AAPL">AAPL</SelectItem>
                        <SelectItem value="MSFT">MSFT</SelectItem>
                        <SelectItem value="GOOGL">GOOGL</SelectItem>
                        <SelectItem value="AMZN">AMZN</SelectItem>
                        <SelectItem value="TSLA">TSLA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Condition</Label>
                    <Select value={newAlert.condition} onValueChange={(value) => setNewAlert({ ...newAlert, condition: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Price goes above</SelectItem>
                        <SelectItem value="below">Price goes below</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="target-price" className="text-sm mb-2 block">Target Price</Label>
                    <Input
                      id="target-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newAlert.target}
                      onChange={(e) => setNewAlert({ ...newAlert, target: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddAlert}>
                    Create Alert
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No alerts set. Create one to get notified!
                </p>
              ) : (
                alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`p-4 ${index !== alerts.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Bell className={`w-5 h-5 ${alert.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="flex-1">
                          <p className="font-semibold">{alert.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            Alert when price goes {alert.condition} ${alert.target.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={alert.enabled}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteAlert(alert.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        {/* AI Signals (Mock) */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold">AI-Based Signals</h2>
            <Badge variant="outline" className="text-xs">Mock / Demo</Badge>
          </div>
          <div className="space-y-3">
            {mockAISignals.map((signal) => (
              <Card key={signal.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      signal.type === 'bullish' ? 'bg-success/10' :
                      signal.type === 'bearish' ? 'bg-destructive/10' : 'bg-muted'
                    }`}>
                      {signal.type === 'bullish' ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : signal.type === 'bearish' ? (
                        <TrendingDown className="w-5 h-5 text-destructive" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{signal.symbol}</span>
                        <Badge variant={
                          signal.type === 'bullish' ? 'default' :
                          signal.type === 'bearish' ? 'destructive' : 'secondary'
                        }>
                          {signal.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{signal.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{signal.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Confidence: {signal.confidence}%</span>
                        <span>•</span>
                        <span>{signal.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
