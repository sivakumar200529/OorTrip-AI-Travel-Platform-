import { Destination, Itinerary, LocalExperience, Expense, ReviewItem } from '../types';
import { TAMIL_NADU_DESTINATIONS, SAMPLE_ITINERARY, LOCAL_EXPERIENCES, INITIAL_EXPENSES } from '../data/tamilNaduData';
import { generateSmartTamilNaduItinerary } from './plannerEngine';

const BASE_URL = '/api';

export const api = {
  // Destinations
  async getDestinations(): Promise<Destination[]> {
    try {
      const res = await fetch(`${BASE_URL}/destinations`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API unavailable, using high-fidelity local data.');
    }
    return TAMIL_NADU_DESTINATIONS;
  },

  async getDestinationById(id: string): Promise<Destination | undefined> {
    try {
      const res = await fetch(`${BASE_URL}/destinations/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }
    return TAMIL_NADU_DESTINATIONS.find(d => d.id === id);
  },

  // AI Trip Generation
  async generateTrip(params: {
    startingLocation: string;
    destination?: string;
    daysCount: number;
    budget: number;
    interests: string[];
    travelGroup: string;
    transportPreference: string;
    foodPreference: string;
    accessibility: string;
  }): Promise<Itinerary> {
    try {
      const res = await fetch(`${BASE_URL}/trips/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API unavailable, executing local AI generator engine.');
    }

    return generateSmartTamilNaduItinerary(params);
  },

  // AI Assistant Chat
  async askAI(prompt: string, context?: any): Promise<{ reply: string; quickLinks?: string[] }> {
    try {
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // fallback
    }

    // Intelligent local fallback responses
    const lower = prompt.toLowerCase();
    if (lower.includes('vegetarian') || lower.includes('food') || lower.includes('eat')) {
      return {
        reply: 'In Mahabalipuram and along ECR, I recommend **Adyar Ananda Bhavan (A2B)** on the highway for hot Ghee Sambar Mini Idlis, or **Seaview Traditional Mess** near Othavadai Street for freshly prepared banana leaf vegetarian thali. For evening snacks, try coastal Vazhaipoo (banana blossom) Vadas with ginger tea!',
        quickLinks: ['Local Food Guide', 'Save to Itinerary']
      };
    } else if (lower.includes('crowd') || lower.includes('time') || lower.includes('visit')) {
      return {
        reply: 'Current crowd density at **Shore Temple, Mahabalipuram is HIGH** (approx. 45-min wait for main photography vantage). AI recommends visiting between **06:30 AM – 08:30 AM** tomorrow morning for golden sunrise light and tranquil solitude.',
        quickLinks: ['View Crowd Forecast', 'Explore Sadras Fort Alternative']
      };
    } else if (lower.includes('temple') || lower.includes('heritage')) {
      return {
        reply: 'Tamil Nadu is home to over 33,000 ancient temples! If starting from Chennai, the golden triangle of **Kapaleeshwarar (Mylapore) → Shore Temple (Mahabalipuram) → Kailasanathar (Kanchipuram)** provides a breathtaking overview of 7th-century Dravidian sandstone and granite mastery.',
        quickLinks: ['Open Heritage Guide', 'Audio Walk']
      };
    } else if (lower.includes('tamil') || lower.includes('translate')) {
      return {
        reply: 'Here are essential Tamil travel phrases:\n- "Vanakkam" = Hello / Greetings 🙏\n- "Idhu evvalavu?" = How much is this?\n- "Sappadu nallaa irukku" = The food is very delicious!\n- "Nandri" = Thank you!',
        quickLinks: ['Audio Pronunciation', 'Tamil Cultural Guide']
      };
    } else if (lower.includes('spend') || lower.includes('budget')) {
      return {
        reply: 'You have planned a **₹5,000** budget. So far you have logged **₹3,420 (68.4%)** in expenses across transport, food, and entry passes. You still have **₹1,580 remaining**—well within your safety margin!',
        quickLinks: ['Open Smart Budget', 'Add Expense']
      };
    }

    return {
      reply: `I can help you explore Tamil Nadu! I can assist with personalized routes from ${paramsContextCity(context)}, real-time crowd alerts, temple darshan timings, or finding authentic local artisans and culinary gems. What would you like to explore next?`,
      quickLinks: ['Plan My Trip', 'Find Nearby Food', 'Smart Map']
    };
  },

  // Experiences
  async getExperiences(): Promise<LocalExperience[]> {
    try {
      const res = await fetch(`${BASE_URL}/experiences`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return LOCAL_EXPERIENCES;
  },

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    try {
      const res = await fetch(`${BASE_URL}/expenses`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return INITIAL_EXPENSES;
  },

  async addExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const item: Expense = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    try {
      const res = await fetch(`${BASE_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return item;
  }
};

function paramsContextCity(context?: any): string {
  return context?.city || 'Chennai';
}
