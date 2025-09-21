# Data Directory

This directory contains all the category data for the EzPick decision-making app. Each category has its own TypeScript file with options and filters.

## Structure

```
data/
├── types.ts       # TypeScript interfaces and types
├── index.ts       # Centralized exports
├── food.ts        # Food category data
├── games.ts       # Games category data  
├── movies.ts      # Movies category data
├── places.ts      # Places category data
└── README.md      # This file
```

## Usage

### Basic Import
```typescript
import { allFoodOptions, priceFilterOptions } from '@/data/food';
import { allGameOptions } from '@/data/games';
```

### Structured Import
```typescript
import { foodData, gamesData } from '@/data';
```

### Dynamic Access
```typescript
import { categoryRegistry } from '@/data';
const foodOptions = categoryRegistry.food.options;
```

## Customization

### Adding New Options
To add new food options, edit `food.ts`:
```typescript
export const allFoodOptions = [
  'Pizza',
  'Burger',
  // Add your new options here
  'Poke Bowl',
  'Acai Bowl'
];
```

### Adding New Filters
To add a new filter group, add it to the category data:
```typescript
const newFilter: FilterGroup = {
  name: 'Spice Level',
  key: 'spice',
  type: 'multiple',
  options: [
    { value: 'mild', label: 'Mild' },
    { value: 'medium', label: 'Medium' },
    { value: 'hot', label: 'Hot' },
    { value: 'extra-hot', label: 'Extra Hot' }
  ]
};

export const foodData: CategoryData = {
  name: 'Food',
  description: 'What should I eat?',
  options: allFoodOptions,
  filters: [priceFilters, cuisineFilters, newFilter] // Add here
};
```

### Creating New Categories
1. Create a new file (e.g., `books.ts`)
2. Follow the pattern of existing category files
3. Export from `index.ts`
4. Add to `categoryRegistry` in `index.ts`
5. Create a new tab component in `app/(tabs)/`

## Benefits

✅ **Organized**: Data separated from UI logic
✅ **Type-safe**: Full TypeScript support
✅ **Maintainable**: Easy to update options and filters
✅ **Extensible**: Simple to add new categories
✅ **Consistent**: Standardized data structure across categories
✅ **Flexible**: Support for both simple strings and complex objects

## Data Types

- **Simple**: Just strings for basic options
- **Enhanced**: Rich objects with metadata (see types.ts)
- **Filters**: Structured filter groups with descriptions
- **Backward Compatible**: Existing components work unchanged 