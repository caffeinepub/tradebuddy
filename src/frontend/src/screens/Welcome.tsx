import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary welcome-title">
            TradeBuddy
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-delayed">
            Your beginner-friendly trading companion
          </p>
        </div>
        
        <Button 
          onClick={onContinue}
          size="lg"
          className="w-full max-w-xs animate-fade-in-delayed-more"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
