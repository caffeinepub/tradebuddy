export type Screen = 'welcome' | 'home' | 'learning' | 'trading' | 'demo' | 'alerts' | 'practice' | 'profile';

export interface NavItem {
  id: Exclude<Screen, 'welcome'>;
  label: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'learning', label: 'Learn', icon: 'book' },
  { id: 'trading', label: 'Trade', icon: 'chart' },
  { id: 'demo', label: 'Practice', icon: 'play' },
  { id: 'alerts', label: 'Alerts', icon: 'bell' },
  { id: 'practice', label: 'Live', icon: 'activity' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];
