import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useSetAppPrice } from '@/hooks/useQueries';
import { CheckCircle, Rocket, Tag, Loader2 } from 'lucide-react';

interface PricingTier {
  label: string;
  value: number;
  description: string;
  badge?: string;
}

const PRICING_TIERS: PricingTier[] = [
  { label: 'Free', value: 0, description: 'Let everyone access your app for free', badge: 'Popular' },
  { label: '$0.99', value: 99, description: 'Entry-level price for casual users' },
  { label: '$1.99', value: 199, description: 'Great value for regular traders', badge: 'Recommended' },
  { label: '$4.99', value: 499, description: 'Premium tier for serious traders' },
];

interface PricingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPrice: bigint | null;
}

export default function PricingConfigModal({ open, onOpenChange, currentPrice }: PricingConfigModalProps) {
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [customPrice, setCustomPrice] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [customError, setCustomError] = useState('');

  const { mutate: setPrice, isPending } = useSetAppPrice();

  const getEffectivePrice = (): { cents: number; display: string } | null => {
    if (useCustom) {
      const val = parseFloat(customPrice);
      if (isNaN(val) || val < 0) return null;
      return { cents: Math.round(val * 100), display: val === 0 ? 'Free' : `$${val.toFixed(2)}` };
    }
    if (!selectedTier) return null;
    return {
      cents: selectedTier.value,
      display: selectedTier.label,
    };
  };

  const handleCustomChange = (val: string) => {
    setCustomPrice(val);
    setCustomError('');
    const num = parseFloat(val);
    if (val !== '' && (isNaN(num) || num < 0)) {
      setCustomError('Please enter a valid non-negative price.');
    }
  };

  const handleNext = () => {
    if (useCustom) {
      const num = parseFloat(customPrice);
      if (isNaN(num) || num < 0) {
        setCustomError('Please enter a valid non-negative price.');
        return;
      }
    } else if (!selectedTier) {
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    const effective = getEffectivePrice();
    if (!effective) return;
    setPrice(BigInt(effective.cents), {
      onSuccess: () => setStep('success'),
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('select');
      setSelectedTier(null);
      setCustomPrice('');
      setUseCustom(false);
      setCustomError('');
    }, 300);
  };

  const effective = getEffectivePrice();

  const formatCurrentPrice = (p: bigint | null) => {
    if (p === null) return null;
    const cents = Number(p);
    if (cents === 0) return 'Free';
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'select' && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Rocket className="w-5 h-5 text-primary" />
                <DialogTitle>Go Live to App Market</DialogTitle>
              </div>
              <DialogDescription>
                Set a price for your TradeBuddy app. Users will pay this once to access your published app.
                {formatCurrentPrice(currentPrice) && (
                  <span className="block mt-1 text-foreground font-medium">
                    Current price: <span className="text-primary">{formatCurrentPrice(currentPrice)}</span>
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              {PRICING_TIERS.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => { setSelectedTier(tier); setUseCustom(false); }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                    !useCustom && selectedTier?.value === tier.value
                      ? 'border-primary bg-primary/10 ring-1 ring-primary'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{tier.label}</span>
                      {tier.badge && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0">
                          {tier.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>
                  </div>
                  {!useCustom && selectedTier?.value === tier.value && (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  )}
                </button>
              ))}

              {/* Custom price */}
              <button
                type="button"
                onClick={() => { setUseCustom(true); setSelectedTier(null); }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                  useCustom
                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">Custom price</span>
                </div>
                {useCustom && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}
              </button>

              {useCustom && (
                <div className="space-y-1 px-1">
                  <Label htmlFor="custom-price" className="text-sm">
                    Enter price (USD)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                      id="custom-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={customPrice}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  {customError && <p className="text-xs text-destructive">{customError}</p>}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                disabled={(!selectedTier && !useCustom) || (useCustom && (customPrice === '' || !!customError))}
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'confirm' && effective && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Price</DialogTitle>
              <DialogDescription>
                Review the price before publishing your app live.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{effective.display}</span>
              </div>
              <p className="text-center text-sm text-muted-foreground max-w-xs">
                {effective.cents === 0
                  ? 'Your app will be available for free on the App Market.'
                  : `Users will pay ${effective.display} to access your TradeBuddy app on the App Market.`}
              </p>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep('select')} disabled={isPending}>
                Back
              </Button>
              <Button onClick={handleConfirm} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Confirm & Go Live'
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'success' && effective && (
          <>
            <DialogHeader>
              <DialogTitle>You're Live! 🎉</DialogTitle>
              <DialogDescription>
                Your app price has been set successfully.
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-semibold text-foreground text-lg">
                  Price set to <span className="text-primary">{effective.display}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Your TradeBuddy app is ready for the App Market. Share your live URL with users!
                </p>
              </div>
              <div className="w-full bg-muted rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Live URL</p>
                <p className="text-sm font-mono text-foreground break-all">
                  {window.location.hostname}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button className="w-full" onClick={handleClose}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
