// Common types for category data
export interface CategoryData<T = string> {
  name: string;
  description: string;
  options: T[];
  filters: FilterGroup[];
}

export interface FilterGroup {
  name: string;
  key: string;
  type: 'single' | 'multiple';
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
  description?: string;
}

// Specific item types for enhanced data
export interface FoodItem {
  name: string;
  cuisine?: string[];
  priceRange?: string;
  dietaryRestrictions?: string[];
  preparationTime?: string;
}

export interface GameItem {
  name: string;
  genre?: string[];
  platform?: string[];
  playTime?: string;
  playerCount?: string;
  rating?: string;
}

export interface MovieItem {
  name: string;
  genre?: string[];
  duration?: number;
  year?: number;
  rating?: string;
  director?: string;
}

export interface PlaceItem {
  name: string;
  type?: string[];
  distance?: string;
  cost?: string;
  indoor?: boolean;
} 