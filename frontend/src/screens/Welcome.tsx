import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface WelcomeProps {
  onContinue: () => void;
  isLoading?: boolean;
}

export default function Welcome({ onContinue, isLoading = false }: WelcomeProps) {
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
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
}
