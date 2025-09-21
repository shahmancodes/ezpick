import { CategoryData, FilterGroup } from './types';

// All available movie options
export const allMovieOptions = [
  'Action',
  'Comedy', 
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Documentary',
  'Animation',
  'Fantasy',
  'Crime',
  'Adventure',
  'Mystery',
  'Western',
  'Musical',
  'War',
  'Biography',
  'History',
  'Sport',
  'Family',
  'Superhero',
  'Zombie',
  'Vampire',
  'Time Travel',
  'Space Opera',
  'Heist',
  'Road Trip',
  'Coming of Age',
  'Disaster',
  'Psychological'
];

// Filter definitions  
const durationFilters: FilterGroup = {
  name: 'Duration',
  key: 'duration',
  type: 'multiple',
  options: [
    { value: '< 90min', label: '< 90min', description: 'Short film' },
    { value: '90-120min', label: '90-120min', description: 'Standard length' },
    { value: '120-150min', label: '120-150min', description: 'Long film' },
    { value: '> 150min', label: '> 150min', description: 'Epic length' }
  ]
};

const genreFilters: FilterGroup = {
  name: 'Genre',
  key: 'genre',
  type: 'multiple',
  options: [
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Documentary', label: 'Documentary' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Fantasy', label: 'Fantasy' }
  ]
};

const ratingFilters: FilterGroup = {
  name: 'Rating',
  key: 'rating',
  type: 'multiple',
  options: [
    { value: 'G', label: 'G', description: 'General audiences' },
    { value: 'PG', label: 'PG', description: 'Parental guidance' },
    { value: 'PG-13', label: 'PG-13', description: 'Parents strongly cautioned' },
    { value: 'R', label: 'R', description: 'Restricted' },
    { value: 'NC-17', label: 'NC-17', description: 'Adults only' }
  ]
};

const eraFilters: FilterGroup = {
  name: 'Era',
  key: 'era',
  type: 'multiple', 
  options: [
    { value: 'Classic', label: 'Classic', description: 'Before 1980' },
    { value: '80s-90s', label: '80s-90s', description: '1980-1999' },
    { value: '2000s', label: '2000s', description: '2000-2009' },
    { value: '2010s', label: '2010s', description: '2010-2019' },
    { value: 'Recent', label: 'Recent', description: '2020+' }
  ]
};

// Category data structure
export const moviesData: CategoryData = {
  name: 'Movies',
  description: 'What should I watch?',
  options: allMovieOptions,
  filters: [durationFilters, genreFilters, ratingFilters, eraFilters]
};

// Export individual filter arrays for backward compatibility
export const durationFilterOptions = durationFilters.options.map(option => option.value);
export const genreFilterOptions = genreFilters.options.map(option => option.value); 