import { CategoryData, FilterGroup } from './types';

// All available place options
export const allPlaceOptions = [
  'Park',
  'Museum',
  'Beach',
  'Mall',
  'Restaurant',
  'Cafe',
  'Library',
  'Gym',
  'Cinema',
  'Theater',
  'Zoo',
  'Aquarium',
  'Art Gallery',
  'Bookstore',
  'Arcade',
  'Bowling Alley',
  'Mini Golf',
  'Hiking Trail',
  'Lake',
  'Mountain',
  'Shopping Center',
  'Food Court',
  'Concert Hall',
  'Sports Stadium',
  'Amusement Park',
  'Water Park',
  'Botanical Garden',
  'Historic Site',
  'Observatory',
  'Science Center'
];

// Filter definitions
const distanceFilters: FilterGroup = {
  name: 'Distance', 
  key: 'distance',
  type: 'multiple',
  options: [
    { value: '< 1km', label: '< 1km', description: 'Walking distance' },
    { value: '1-5km', label: '1-5km', description: 'Short drive/bike' },
    { value: '5-10km', label: '5-10km', description: 'Medium drive' },
    { value: '> 10km', label: '> 10km', description: 'Day trip' }
  ]
};

const activityFilters: FilterGroup = {
  name: 'Activity Type',
  key: 'activity',
  type: 'multiple',
  options: [
    { value: 'Indoor', label: 'Indoor' },
    { value: 'Outdoor', label: 'Outdoor' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Educational', label: 'Educational' },
    { value: 'Active', label: 'Active' },
    { value: 'Relaxing', label: 'Relaxing' }
  ]
};

const costFilters: FilterGroup = {
  name: 'Cost',
  key: 'cost',
  type: 'multiple',
  options: [
    { value: 'Free', label: 'Free', description: 'No cost' },
    { value: '$', label: '$', description: 'Low cost' },
    { value: '$$', label: '$$', description: 'Moderate cost' },
    { value: '$$$', label: '$$$', description: 'Expensive' }
  ]
};

const timeFilters: FilterGroup = {
  name: 'Time Needed',
  key: 'time',
  type: 'multiple',
  options: [
    { value: '< 1hr', label: '< 1hr', description: 'Quick visit' },
    { value: '1-3hrs', label: '1-3hrs', description: 'Short visit' },
    { value: '3-6hrs', label: '3-6hrs', description: 'Half day' },
    { value: 'Full Day', label: 'Full Day', description: 'All day activity' }
  ]
};

// Category data structure
export const placesData: CategoryData = {
  name: 'Places',
  description: 'Where should I go?',
  options: allPlaceOptions,
  filters: [distanceFilters, activityFilters, costFilters, timeFilters]
};

// Export individual filter arrays for backward compatibility
export const distanceFilterOptions = distanceFilters.options.map(option => option.value);
export const activityFilterOptions = activityFilters.options.map(option => option.value); 