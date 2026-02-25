export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface Tip {
  id: string;
  text: string;
}

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'What is Stock Trading?',
    description: 'Learn the basics of buying and selling stocks in the market.',
    difficulty: 'Beginner',
    duration: '10 min',
    category: 'Basics',
  },
  {
    id: '2',
    title: 'Understanding Market Orders',
    description: 'Discover different types of orders and when to use them.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Orders',
  },
  {
    id: '3',
    title: 'Risk Management Essentials',
    description: 'Learn how to protect your capital and manage trading risks.',
    difficulty: 'Beginner',
    duration: '20 min',
    category: 'Risk',
  },
  {
    id: '4',
    title: 'Reading Stock Charts',
    description: 'Understand candlesticks, trends, and chart patterns.',
    difficulty: 'Intermediate',
    duration: '25 min',
    category: 'Basics',
  },
  {
    id: '5',
    title: 'Stop Loss & Take Profit',
    description: 'Master the art of setting exit points for your trades.',
    difficulty: 'Intermediate',
    duration: '18 min',
    category: 'Risk',
  },
  {
    id: '6',
    title: 'Technical Indicators',
    description: 'Learn about moving averages, RSI, MACD, and more.',
    difficulty: 'Advanced',
    duration: '30 min',
    category: 'Basics',
  },
];

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Your First Trade: A Complete Guide',
    thumbnail: '/assets/generated/video-thumb-1.jpg',
    duration: '12:34',
  },
  {
    id: 'v2',
    title: 'How to Read Market Trends',
    thumbnail: '/assets/generated/video-thumb-2.jpg',
    duration: '8:45',
  },
  {
    id: 'v3',
    title: 'Common Beginner Mistakes to Avoid',
    thumbnail: '/assets/generated/video-thumb-3.jpg',
    duration: '15:20',
  },
];

export const tips: Tip[] = [
  { id: 't1', text: 'Start small and gradually increase your position sizes as you gain experience.' },
  { id: 't2', text: 'Never invest money you cannot afford to lose.' },
  { id: 't3', text: 'Diversification helps reduce risk in your portfolio.' },
  { id: 't4', text: 'Emotional trading often leads to poor decisions. Stick to your plan.' },
  { id: 't5', text: 'Keep learning! Markets evolve, and so should your knowledge.' },
  { id: 't6', text: 'Practice with demo accounts before risking real money.' },
];
