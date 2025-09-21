import { CategoryData, FilterGroup } from './types';

// All available game options
export const allGameOptions = [
  'Puzzle',
  'Action',
  'RPG',
  'Strategy',
  'Sports',
  'Racing',
  'Fighting',
  'Adventure',
  'Simulation',
  'Horror',
  'Platformer',
  'Shooter',
  'MMORPG',
  'Battle Royale',
  'Card Game',
  'Board Game',
  'Indie',
  'Arcade',
  'Survival',
  'Sandbox',
  'Tower Defense',
  'Real-time Strategy',
  'Turn-based Strategy',
  'Roguelike',
  'Stealth',
  'Music/Rhythm',
  'Party Game',
  'Educational',
  'Trivia',
  'Word Game'
];

// Filter definitions
const timeFilters: FilterGroup = {
  name: 'Play Time',
  key: 'playtime',
  type: 'multiple',
  options: [
    { value: '< 30min', label: '< 30min', description: 'Quick session' },
    { value: '30-60min', label: '30-60min', description: 'Short session' },
    { value: '1-2hrs', label: '1-2hrs', description: 'Medium session' },
    { value: '> 2hrs', label: '> 2hrs', description: 'Long session' }
  ]
};

const playerFilters: FilterGroup = {
  name: 'Players',
  key: 'players',
  type: 'multiple',
  options: [
    { value: 'Solo', label: 'Solo', description: 'Single player' },
    { value: '2 Players', label: '2 Players', description: 'Two players' },
    { value: '3-4 Players', label: '3-4 Players', description: 'Small group' },
    { value: '5+ Players', label: '5+ Players', description: 'Large group' }
  ]
};

const genreFilters: FilterGroup = {
  name: 'Genre',
  key: 'genre', 
  type: 'multiple',
  options: [
    { value: 'Action', label: 'Action' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'RPG', label: 'RPG' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'Simulation', label: 'Simulation' },
    { value: 'Puzzle', label: 'Puzzle' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Racing', label: 'Racing' },
    { value: 'Fighting', label: 'Fighting' }
  ]
};

const platformFilters: FilterGroup = {
  name: 'Platform',
  key: 'platform',
  type: 'multiple',
  options: [
    { value: 'PC', label: 'PC' },
    { value: 'Console', label: 'Console' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'VR', label: 'VR' },
    { value: 'Board Game', label: 'Board Game' }
  ]
};

// Category data structure
export const gamesData: CategoryData = {
  name: 'Games',
  description: 'What should I play?',
  options: allGameOptions,
  filters: [timeFilters, playerFilters, genreFilters, platformFilters]
};

// Export individual filter arrays for backward compatibility
export const timeFilterOptions = timeFilters.options.map(option => option.value);
export const playerFilterOptions = playerFilters.options.map(option => option.value); 