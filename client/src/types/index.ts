export type UserRole = 'tourist' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  points?: number;
  ecoScore?: number;
  savedPlaces?: string[];
}

export type DestinationCategory =
  | 'Heritage'
  | 'Temples'
  | 'Beaches'
  | 'Nature'
  | 'Food'
  | 'Shopping'
  | 'Culture'
  | 'Village Experiences'
  | 'Hill Station';

export type CrowdLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CrowdForecast {
  current: CrowdLevel;
  morning: CrowdLevel;
  afternoon: CrowdLevel;
  evening: CrowdLevel;
  bestTimeToVisit: string;
}

export interface AccessibilityInfo {
  wheelchair: boolean;
  stepsCount: 'None' | 'Few' | 'Moderate' | 'Many';
  liftAvailable: boolean;
  parkingAvailable: boolean;
  restroomAvailable: boolean;
  seatingRestAreas: boolean;
  notes: string;
}

export interface Destination {
  id: string;
  name: string;
  tamilName: string;
  tagline: string;
  description: string;
  location: string;
  district: string;
  category: DestinationCategory;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  coordinates: [number, number]; // [lat, lng]
  bestTime: string;
  entryFee: number;
  duration: string;
  estimatedCost: number;
  crowdLevel: CrowdLevel;
  crowdForecast: CrowdForecast;
  accessibility: AccessibilityInfo;
  highlights: string[];
  history: string;
  architecture: string;
  culturalSignificance: string;
  interestingFacts: string[];
  audioGuideText: string;
  nearbyPlaces: { name: string; distance: string; category: string }[];
  weatherInfo?: {
    temp: string;
    condition: string;
    alert?: string;
  };
}

export interface ItineraryStop {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  cost: number;
  image: string;
  coordinates: [number, number];
  crowdLevel: CrowdLevel;
  isCrowded?: boolean;
  alternativeSuggestion?: {
    name: string;
    reason: string;
    image: string;
    cost: number;
    duration: string;
  };
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  fromCity: string;
  toCity: string;
  distance: string;
  travelTime: string;
  transportMode: string;
  heroImage: string;
  stops: ItineraryStop[];
}

export interface Itinerary {
  id: string;
  title: string;
  startingLocation: string;
  destination: string;
  daysCount: number;
  budget: number;
  totalEstimatedCost: number;
  totalDistanceKm?: number;
  totalTravelTime?: string;
  costBreakdown?: {
    transport: number;
    stay: number;
    food: number;
    activities: number;
    misc: number;
    total: number;
  };
  budgetHealth?: {
    status: 'within' | 'exceeded' | 'optimal';
    difference: number;
    tip: string;
  };
  interests: string[];
  travelGroup: string;
  transportPreference: string;
  foodPreference: string;
  accessibility: string;
  createdAt: string;
  days: ItineraryDay[];
  aiNotes: string[];
}

export interface LocalExperience {
  id: string;
  title: string;
  tamilTitle: string;
  category: string;
  location: string;
  district: string;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  maxGroupSize: number;
  availability: string[];
}

export interface ArtisanProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  material: string;
}

export interface Artisan {
  id: string;
  artisanName: string;
  craftName: string;
  region: string;
  story: string;
  photo: string;
  badge: string;
  rating: number;
  products: ArtisanProduct[];
}

export interface Expense {
  id: string;
  title: string;
  category: 'Transport' | 'Food' | 'Stay' | 'Tickets' | 'Shopping' | 'Activities';
  amount: number;
  date: string;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  points: number;
  unlockedAt?: string;
}

export interface TouristPass {
  passNumber: string;
  touristName: string;
  touristId: string;
  avatar: string;
  tier: 'Explorer' | 'Traveler' | 'Discoverer' | 'Tamil Nadu Champion';
  points: number;
  ecoScore: number;
  visitedCount: number;
  totalDestinations: number;
  stamps: {
    city: string;
    date: string;
    badgeName: string;
    icon: string;
  }[];
  badges: Badge[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'trip' | 'weather' | 'crowd' | 'budget' | 'recommendation';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ReviewItem {
  id: string;
  destinationId: string;
  destinationName: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'issue';
  highlights: string[];
}
