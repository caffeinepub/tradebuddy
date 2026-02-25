import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import Welcome from './screens/Welcome';
import HomeDashboard from './screens/HomeDashboard';
import Learning from './screens/Learning';
import Trading from './screens/Trading';
import DemoTrading from './screens/DemoTrading';
import Alerts from './screens/Alerts';
import LiveChartPractice from './screens/LiveChartPractice';
import ProfileSettings from './screens/ProfileSettings';
import BottomNav from './components/nav/BottomNav';
import type { Screen } from './lib/navigation';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const { isInitializing } = useInternetIdentity();

  const handleContinue = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onContinue={handleContinue} isLoading={isInitializing} />;
      case 'home':
        return <HomeDashboard />;
      case 'learning':
        return <Learning />;
      case 'trading':
        return <Trading />;
      case 'demo':
        return <DemoTrading />;
      case 'alerts':
        return <Alerts />;
      case 'practice':
        return <LiveChartPractice />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        {renderScreen()}
        {currentScreen !== 'welcome' && (
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
