// ── Canadian Data Constants ──

export const CANADIAN_PROVINCES = [
  { code: 'AB', name: 'Alberta', cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'] },
  { code: 'BC', name: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'] },
  { code: 'MB', name: 'Manitoba', cities: ['Winnipeg', 'Brandon', 'Steinbach'] },
  { code: 'NB', name: 'New Brunswick', cities: ['Moncton', 'Saint John', 'Fredericton'] },
  { code: 'NL', name: 'Newfoundland and Labrador', cities: ['St. John\'s', 'Corner Brook', 'Mount Pearl'] },
  { code: 'NS', name: 'Nova Scotia', cities: ['Halifax', 'Sydney', 'Dartmouth'] },
  { code: 'NT', name: 'Northwest Territories', cities: ['Yellowknife', 'Hay River', 'Fort Smith'] },
  { code: 'NU', name: 'Nunavut', cities: ['Iqaluit', 'Rankin Inlet', 'Arviat'] },
  { code: 'ON', name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton', 'Kitchener', 'London', 'Windsor', 'Mississauga', 'Brampton'] },
  { code: 'PE', name: 'Prince Edward Island', cities: ['Charlottetown', 'Summerside', 'Stratford'] },
  { code: 'QC', name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke'] },
  { code: 'SK', name: 'Saskatchewan', cities: ['Saskatoon', 'Regina', 'Prince Albert'] },
  { code: 'YT', name: 'Yukon', cities: ['Whitehorse', 'Dawson City', 'Watson Lake'] },
] as const;

export const MAJOR_CANADIAN_CITIES = [
  { name: 'Toronto', province: 'ON', emoji: '🏙️' },
  { name: 'Montreal', province: 'QC', emoji: '🍁' },
  { name: 'Vancouver', province: 'BC', emoji: '🌊' },
  { name: 'Calgary', province: 'AB', emoji: '🏔️' },
  { name: 'Ottawa', province: 'ON', emoji: '🍂' },
  { name: 'Edmonton', province: 'AB', emoji: '❄️' },
  { name: 'Quebec City', province: 'QC', emoji: '🏰' },
  { name: 'Winnipeg', province: 'MB', emoji: '🌾' },
  { name: 'Halifax', province: 'NS', emoji: '⛵' },
  { name: 'Victoria', province: 'BC', emoji: '🌸' },
];

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment', emoji: '🏠' },
  { value: 'house', label: 'House', emoji: '🏡' },
  { value: 'condo', label: 'Condo', emoji: '🏢' },
  { value: 'townhouse', label: 'Townhouse', emoji: '🏘️' },
  { value: 'studio', label: 'Studio', emoji: '🏠' },
  { value: 'basement', label: 'Basement Suite', emoji: '🏗️' },
] as const;

export const PRICE_RANGES = [
  { label: 'Under $1,000', min: 0, max: 999 },
  { label: '$1,000 - $1,500', min: 1000, max: 1499 },
  { label: '$1,500 - $2,000', min: 1500, max: 1999 },
  { label: '$2,000 - $2,500', min: 2000, max: 2499 },
  { label: '$2,500 - $3,000', min: 2500, max: 2999 },
  { label: '$3,000 - $4,000', min: 3000, max: 3999 },
  { label: '$4,000+', min: 4000, max: Infinity },
] as const;

export const BEDROOM_OPTIONS = [
  { label: 'Studio', value: 0 },
  { label: '1 Bedroom', value: 1 },
  { label: '2 Bedrooms', value: 2 },
  { label: '3 Bedrooms', value: 3 },
  { label: '4+ Bedrooms', value: 4 },
] as const;

export const BATHROOM_OPTIONS = [
  { label: '1 Bathroom', value: 1 },
  { label: '1.5 Bathrooms', value: 1.5 },
  { label: '2 Bathrooms', value: 2 },
  { label: '2.5+ Bathrooms', value: 2.5 },
] as const;

export const RENTAL_TERMS = [
  { value: 3, label: '3 Months' },
  { value: 6, label: '6 Months' },
  { value: 12, label: '12 Months' },
] as const;

export const AMENITIES = [
  { value: 'Gym', label: 'Gym/Fitness Center', emoji: '🏋️' },
  { value: 'Pool', label: 'Swimming Pool', emoji: '🏊' },
  { value: 'Parking', label: 'Parking', emoji: '🅿️' },
  { value: 'Laundry', label: 'In-unit Laundry', emoji: '🧺' },
  { value: 'AC', label: 'Air Conditioning', emoji: '❄️' },
  { value: 'Heat', label: 'Central Heating', emoji: '🔥' },
  { value: 'Dishwasher', label: 'Dishwasher', emoji: '🍽️' },
  { value: 'Balcony', label: 'Balcony/Patio', emoji: '🌿' },
  { value: 'Storage', label: 'Storage Space', emoji: '📦' },
  { value: 'PetFriendly', label: 'Pet Friendly', emoji: '🐾' },
  { value: 'Utilities', label: 'Utilities Included', emoji: '💡' },
  { value: 'Furnished', label: 'Furnished', emoji: '🛋️' },
  { value: 'Security', label: '24/7 Security', emoji: '🔒' },
  { value: 'Concierge', label: 'Concierge', emoji: '🎩' },
  { value: 'Elevator', label: 'Elevator', emoji: '🛗' },
] as const;

export const APPLICATION_STATUSES = [
  { value: 'pending', label: 'Pending', color: '#F59E0B' },
  { value: 'under_review', label: 'Under Review', color: '#3B82F6' },
  { value: 'approved', label: 'Approved', color: '#10B981' },
  { value: 'rejected', label: 'Rejected', color: '#EF4444' },
  { value: 'cancelled', label: 'Cancelled', color: '#6B7280' },
] as const;

export const LEASE_TERMS = [
  { value: 3, label: '3-Month Lease' },
  { value: 6, label: '6-Month Lease' },
  { value: 12, label: '12-Month Lease' },
] as const;

// Helper function to get cities by province
export function getCitiesByProvince(provinceCode: string): string[] {
  const province = CANADIAN_PROVINCES.find(p => p.code === provinceCode);
  return province?.cities ? [...province.cities] : [];
}

// Helper function to get province name by code
export function getProvinceName(provinceCode: string): string {
  const province = CANADIAN_PROVINCES.find(p => p.code === provinceCode);
  return province?.name || provinceCode;
}
