import { CategoryData, FilterGroup } from './types';

// All available food options
export const allFoodOptions = [
  'Pizza',
  'Burger', 
  'Pasta',
  'Sushi',
  'Tacos',
  'Salad',
  'Sandwich',
  'Soup',
  'Steak',
  'Chicken',
  'Fish',
  'Vegetarian',
  'Thai Curry',
  'Chinese Takeout',
  'Indian Curry',
  'Mexican Bowl',
  'Greek Salad',
  'French Fries',
  'BBQ',
  'Ramen',
  'Pho',
  'Burrito',
  'Quesadilla',
  'Fried Rice',
  'Pad Thai',
  'Kebab',
  'Falafel',
  'Risotto',
  'Lasagna',
  'Noodles'
];

// Filter definitions
const priceFilters: FilterGroup = {
  name: 'Price Range',
  key: 'price',
  type: 'multiple',
  options: [
    { value: '$', label: '$', description: 'Budget-friendly' },
    { value: '$$', label: '$$', description: 'Moderate' },
    { value: '$$$', label: '$$$', description: 'Expensive' },
    { value: '$$$$', label: '$$$$', description: 'Fine dining' }
  ]
};

const cuisineFilters: FilterGroup = {
  name: 'Cuisine Type',
  key: 'cuisine',
  type: 'multiple',
  options: [
    { value: 'Italian', label: 'Italian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Asian', label: 'Asian' },
    { value: 'American', label: 'American' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Greek', label: 'Greek' }
  ]
};

const dietaryFilters: FilterGroup = {
  name: 'Dietary Options',
  key: 'dietary',
  type: 'multiple',
  options: [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' }
  ]
};

// Category data structure
export const foodData: CategoryData = {
  name: 'Food',
  description: 'What should I eat?',
  options: allFoodOptions,
  filters: [priceFilters, cuisineFilters, dietaryFilters]
};

// Export individual filter arrays for backward compatibility
export const priceFilterOptions = priceFilters.options.map(option => option.value);
export const cuisineFilterOptions = cuisineFilters.options.map(option => option.value); 