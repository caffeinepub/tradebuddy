import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { useSettings } from '@/state/settingsStore';
import { User, Moon, Sun, Rocket, Tag } from 'lucide-react';
import { useGetAppPrice } from '@/hooks/useQueries';
import PricingConfigModal from '@/components/pricing/PricingConfigModal';

export default function ProfileSettings() {
  const { theme, setTheme } = useTheme();
  const { riskLevel, setRiskLevel, notifications, setNotifications } = useSettings();
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const { data: appPrice, isLoading: priceLoading } = useGetAppPrice();

  const formatPrice = (price: bigint | null | undefined) => {
    if (price === null || price === undefined) return null;
    const cents = Number(price);
    if (cents === 0) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  const displayPrice = formatPrice(appPrice);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Profile & Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">Demo User</p>
              <p className="text-sm text-muted-foreground">demo@tradebuddy.com</p>
              <p className="text-xs text-muted-foreground mt-1">Member since Feb 2026</p>
            </div>
          </CardContent>
        </Card>

        {/* Go Live / App Market Pricing */}
        <Card className="border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <CardTitle className="text-base">App Market</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Publish your TradeBuddy app and set a price for other users to access it.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Current Price</Label>
                  {priceLoading ? (
                    <Skeleton className="h-4 w-16 mt-1" />
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {displayPrice ? (
                        <span className="text-primary font-semibold">{displayPrice}</span>
                      ) : (
                        'No price set yet'
                      )}
                    </p>
                  )}
                </div>
              </div>
              {displayPrice && (
                <Badge variant="secondary" className="text-xs">
                  {displayPrice === 'Free' ? 'Free' : 'Paid'}
                </Badge>
              )}
            </div>

            <Button
              className="w-full gap-2"
              onClick={() => setPricingModalOpen(true)}
            >
              <Rocket className="w-4 h-4" />
              {displayPrice ? 'Update Price & Go Live' : 'Set Price & Go Live'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              App Market publishing is coming soon. Set your price now to be ready!
            </p>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <Label className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Risk Level */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Level</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose your trading risk tolerance. This helps us provide better recommendations.
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={riskLevel} onValueChange={setRiskLevel}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <RadioGroupItem value="conservative" id="conservative" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="conservative" className="font-semibold cursor-pointer">
                      Conservative
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Focus on stable, low-risk investments. Suitable for beginners and long-term investors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="moderate" className="font-semibold cursor-pointer">
                      Moderate
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Balanced approach with mix of growth and stability. Good for most traders.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                  <RadioGroupItem value="aggressive" id="aggressive" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="aggressive" className="font-semibold cursor-pointer">
                      Aggressive
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Higher risk, higher potential returns. For experienced traders comfortable with volatility.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Price Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when price targets are hit</p>
              </div>
              <Switch
                checked={notifications.priceAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">AI Signals</Label>
                <p className="text-xs text-muted-foreground">Receive AI-based trading signals</p>
              </div>
              <Switch
                checked={notifications.aiSignals}
                onCheckedChange={(checked) => setNotifications({ ...notifications, aiSignals: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Market News</Label>
                <p className="text-xs text-muted-foreground">Stay updated with market news</p>
              </div>
              <Switch
                checked={notifications.marketNews}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketNews: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>© {new Date().getFullYear()} TradeBuddy</p>
          <p className="mt-1">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>

      <PricingConfigModal
        open={pricingModalOpen}
        onOpenChange={setPricingModalOpen}
        currentPrice={appPrice ?? null}
      />
    </div>
  );
}
