// Export all category data
export * from './types';
export * from './food';
export * from './games';
export * from './movies';
export * from './places';

// Centralized exports for easy access
export { foodData } from './food';
export { gamesData } from './games'; 
export { moviesData } from './movies';
export { placesData } from './places';

// Category registry for dynamic access
import { foodData } from './food';
import { gamesData } from './games';
import { moviesData } from './movies';
import { placesData } from './places';

export const categoryRegistry = {
  food: foodData,
  games: gamesData,
  movies: moviesData,
  places: placesData
} as const;

export type CategoryKey = keyof typeof categoryRegistry; 