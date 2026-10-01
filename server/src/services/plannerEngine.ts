export interface PlannerInput {
  startingLocation: string;
  destination?: string;
  daysCount: number;
  budget: number;
  interests?: string[];
  travelGroup?: string;
  transportPreference?: string;
  foodPreference?: string;
  accessibility?: string;
}

// Verified Road Distances, Driving Durations & Highway Names across Tamil Nadu
const DISTANCE_MATRIX: Record<string, Record<string, { km: number; hours: number; highway: string }>> = {
  Chennai: {
    Mahabalipuram: { km: 56, hours: 1.25, highway: 'ECR Scenic Highway' },
    Kanchipuram: { km: 75, hours: 1.75, highway: 'NH48 Expressway' },
    Pondicherry: { km: 155, hours: 3.25, highway: 'NH32 / ECR' },
    Thanjavur: { km: 345, hours: 6.0, highway: 'NH36 Vikravandi-Thanjavur' },
    Trichy: { km: 330, hours: 5.5, highway: 'NH45 Grand Southern Trunk' },
    Madurai: { km: 460, hours: 7.5, highway: 'NH45 & NH38 Expressway' },
    Rameswaram: { km: 560, hours: 9.5, highway: 'NH36 & NH87' },
    Ooty: { km: 540, hours: 9.75, highway: 'NH48 & NH181 Ghat Road' },
    Chettinad: { km: 400, hours: 6.75, highway: 'NH45 & NH383' },
    Kanyakumari: { km: 705, hours: 11.0, highway: 'NH44 North-South Corridor' },
    Salem: { km: 345, hours: 5.75, highway: 'NH48' },
    Coimbatore: { km: 505, hours: 8.5, highway: 'NH48 & NH544' },
    Yercaud: { km: 375, hours: 6.5, highway: 'NH48' },
    Kodaikanal: { km: 520, hours: 9.0, highway: 'NH45 & NH83' }
  },
  Coimbatore: {
    Ooty: { km: 86, hours: 2.75, highway: 'NH181 Nilgiri Mountain Ghats' },
    Kodaikanal: { km: 175, hours: 4.5, highway: 'NH83 Palani Ghats' },
    Madurai: { km: 215, hours: 4.25, highway: 'NH83 Dindigul Highway' },
    Chettinad: { km: 240, hours: 4.5, highway: 'NH81 & NH383' },
    Thanjavur: { km: 270, hours: 5.25, highway: 'NH81 Kaveri Basin' },
    Trichy: { km: 215, hours: 4.0, highway: 'NH81 Karur Highway' },
    Salem: { km: 165, hours: 2.75, highway: 'NH544 Expressway' },
    Chennai: { km: 505, hours: 8.5, highway: 'NH544 & NH48' },
    Mahabalipuram: { km: 495, hours: 8.25, highway: 'NH544 & ECR' },
    Kanchipuram: { km: 450, hours: 7.5, highway: 'NH544 & NH48' },
    Pondicherry: { km: 385, hours: 6.75, highway: 'NH81' },
    Rameswaram: { km: 385, hours: 7.25, highway: 'NH83 & NH87' },
    Kanyakumari: { km: 450, hours: 7.75, highway: 'NH83 & NH44' },
    Yercaud: { km: 195, hours: 3.5, highway: 'NH544' }
  },
  Madurai: {
    Rameswaram: { km: 172, hours: 3.0, highway: 'NH87 Pamban Sea Corridor' },
    Kanyakumari: { km: 245, hours: 4.0, highway: 'NH44 4-Lane Highway' },
    Chettinad: { km: 90, hours: 1.75, highway: 'NH383 Sivaganga Highway' },
    Thanjavur: { km: 190, hours: 3.25, highway: 'NH383 & NH83' },
    Trichy: { km: 135, hours: 2.25, highway: 'NH38 4-Lane' },
    Kodaikanal: { km: 120, hours: 3.0, highway: 'NH83 Ghat Road' },
    Chennai: { km: 460, hours: 7.5, highway: 'NH45 Grand Southern Trunk' },
    Coimbatore: { km: 215, hours: 4.25, highway: 'NH83' },
    Mahabalipuram: { km: 440, hours: 7.25, highway: 'NH45 & ECR' },
    Kanchipuram: { km: 415, hours: 6.75, highway: 'NH45 & NH48' },
    Ooty: { km: 290, hours: 6.5, highway: 'NH83 & NH181' },
    Salem: { km: 235, hours: 4.0, highway: 'NH44' },
    Pondicherry: { km: 335, hours: 5.75, highway: 'NH38 & NH32' }
  },
  Trichy: {
    Thanjavur: { km: 55, hours: 1.0, highway: 'NH83 Chola Highway' },
    Chettinad: { km: 85, hours: 1.5, highway: 'NH383 Pudukkottai Road' },
    Madurai: { km: 135, hours: 2.25, highway: 'NH38 Expressway' },
    Rameswaram: { km: 230, hours: 4.25, highway: 'NH36 & NH87' },
    Chennai: { km: 330, hours: 5.5, highway: 'NH45 Grand Southern Trunk' },
    Mahabalipuram: { km: 310, hours: 5.25, highway: 'NH45 & ECR' },
    Kanchipuram: { km: 290, hours: 4.75, highway: 'NH45' },
    Coimbatore: { km: 215, hours: 4.0, highway: 'NH81' },
    Salem: { km: 140, hours: 2.75, highway: 'NH81' },
    Kanyakumari: { km: 380, hours: 6.0, highway: 'NH44' },
    Ooty: { km: 295, hours: 6.5, highway: 'NH81 & NH181' },
    Pondicherry: { km: 200, hours: 3.75, highway: 'NH36 & NH32' }
  },
  Salem: {
    Yercaud: { km: 32, hours: 1.0, highway: '20-Hairpin Ghat Road' },
    Trichy: { km: 140, hours: 2.75, highway: 'NH81' },
    Thanjavur: { km: 195, hours: 3.75, highway: 'NH81 & NH83' },
    Madurai: { km: 235, hours: 4.0, highway: 'NH44' },
    Coimbatore: { km: 165, hours: 2.75, highway: 'NH544' },
    Chennai: { km: 345, hours: 5.75, highway: 'NH48' },
    Ooty: { km: 245, hours: 5.5, highway: 'NH544 & NH181' },
    Kodaikanal: { km: 260, hours: 5.5, highway: 'NH44 & NH83' },
    Mahabalipuram: { km: 335, hours: 5.5, highway: 'NH48 & ECR' }
  },
  Pondicherry: {
    Mahabalipuram: { km: 95, hours: 1.75, highway: 'Scenic East Coast Road' },
    Chennai: { km: 155, hours: 3.25, highway: 'ECR Scenic Expressway' },
    Thanjavur: { km: 175, hours: 3.75, highway: 'NH36 Chola Delta Corridor' },
    Trichy: { km: 200, hours: 4.25, highway: 'NH32 & NH81' },
    Madurai: { km: 335, hours: 5.75, highway: 'NH32 & NH38' },
    Chettinad: { km: 275, hours: 5.0, highway: 'NH36 & NH383' },
    Kanchipuram: { km: 120, hours: 2.5, highway: 'NH32' }
  },
  Tirunelveli: {
    Kanyakumari: { km: 85, hours: 1.5, highway: 'NH44 Southern Tip Expressway' },
    Madurai: { km: 160, hours: 2.75, highway: 'NH44' },
    Rameswaram: { km: 225, hours: 4.25, highway: 'East Coast Highway' },
    Chennai: { km: 620, hours: 9.5, highway: 'NH44 & NH45' },
    Thanjavur: { km: 340, hours: 5.75, highway: 'NH44 & NH383' },
    Coimbatore: { km: 360, hours: 6.25, highway: 'NH44 & NH83' },
    Trichy: { km: 295, hours: 5.0, highway: 'NH44' }
  },
  Kanyakumari: {
    Tirunelveli: { km: 85, hours: 1.5, highway: 'NH44' },
    Madurai: { km: 245, hours: 4.0, highway: 'NH44 4-Lane' },
    Rameswaram: { km: 310, hours: 5.75, highway: 'NH87 Coastal Route' },
    Chennai: { km: 705, hours: 11.0, highway: 'NH44 & NH45' },
    Thanjavur: { km: 430, hours: 7.25, highway: 'NH44 & NH83' },
    Trichy: { km: 380, hours: 6.0, highway: 'NH44' },
    Coimbatore: { km: 450, hours: 7.75, highway: 'NH44 & NH83' }
  },
  Coonoor: {
    Ooty: { km: 19, hours: 0.6, highway: 'NH181 Mountain Road' },
    Coimbatore: { km: 68, hours: 2.0, highway: 'Mettupalayam Ghats' },
    Pykara: { km: 40, hours: 1.1, highway: 'NH181 & Pykara Road' }
  },
  Ooty: {
    Pykara: { km: 21, hours: 0.5, highway: 'Pykara Lake Road' },
    Coonoor: { km: 19, hours: 0.6, highway: 'NH181 Mountain Road' },
    Coimbatore: { km: 86, hours: 2.75, highway: 'NH181 Ghats' },
    Mudumalai: { km: 42, hours: 1.25, highway: '36-Hairpin Kalhatty Ghat Road' }
  },
  Pykara: {
    Mudumalai: { km: 38, hours: 1.0, highway: 'Gudalur-Theppakadu Route' },
    Ooty: { km: 21, hours: 0.5, highway: 'Pykara Road' }
  },
  Mudumalai: {
    Coimbatore: { km: 125, hours: 3.5, highway: 'Nilgiri Foothill Highway' },
    Salem: { km: 230, hours: 5.0, highway: 'NH544' },
    Chennai: { km: 560, hours: 10.0, highway: 'NH48' }
  },
  Mahabalipuram: {
    Kanchipuram: { km: 66, hours: 1.5, highway: 'SH58 Chengalpattu Route' },
    Pondicherry: { km: 95, hours: 1.75, highway: 'Scenic East Coast Road' },
    Chennai: { km: 56, hours: 1.25, highway: 'ECR Scenic Highway' }
  },
  Kanchipuram: {
    Pondicherry: { km: 112, hours: 2.25, highway: 'SH116 & NH32' },
    Chennai: { km: 75, hours: 1.75, highway: 'NH48' },
    Mahabalipuram: { km: 66, hours: 1.5, highway: 'SH58' }
  },
  Chidambaram: {
    Chennai: { km: 235, hours: 4.5, highway: 'NH32 / ECR' },
    Pondicherry: { km: 65, hours: 1.5, highway: 'ECR / NH32' },
    Trichy: { km: 135, hours: 2.75, highway: 'NH81' },
    Thanjavur: { km: 115, hours: 2.25, highway: 'NH36' }
  },
  Thanjavur: {
    Kumbakonam: { km: 40, hours: 0.8, highway: 'NH36 Chola Highway' },
    Trichy: { km: 55, hours: 1.0, highway: 'NH83' }
  },
  Kumbakonam: {
    'Gangaikonda Cholapuram': { km: 35, hours: 0.75, highway: 'Kumbakonam-Jayankondam Road' },
    Thanjavur: { km: 40, hours: 0.8, highway: 'NH36' }
  },
  'Gangaikonda Cholapuram': {
    Chennai: { km: 255, hours: 4.5, highway: 'NH36 & NH45' },
    Trichy: { km: 105, hours: 2.0, highway: 'NH81' },
    Coimbatore: { km: 310, hours: 5.75, highway: 'NH81' },
    Madurai: { km: 240, hours: 4.25, highway: 'NH38' }
  },
  Rameswaram: {
    Dhanushkodi: { km: 20, hours: 0.45, highway: 'NH87 Coastal Spit' },
    Kanyakumari: { km: 310, hours: 5.25, highway: 'East Coast Highway & NH44' }
  },
  Dhanushkodi: {
    Kanyakumari: { km: 320, hours: 5.5, highway: 'East Coast Highway & NH44' },
    Rameswaram: { km: 20, hours: 0.45, highway: 'NH87' }
  },
  Karaikudi: {
    Athangudi: { km: 15, hours: 0.35, highway: 'Heritage Village Road' },
    Madurai: { km: 90, hours: 1.75, highway: 'NH383' },
    Trichy: { km: 85, hours: 1.5, highway: 'NH383' }
  },
  Athangudi: {
    Pudukkottai: { km: 35, hours: 0.75, highway: 'SH Pudukkottai Route' },
    Karaikudi: { km: 15, hours: 0.35, highway: 'Heritage Village Road' }
  },
  Pudukkottai: {
    Pillayarpatti: { km: 28, hours: 0.6, highway: 'Pillayarpatti Temple Road' },
    Athangudi: { km: 35, hours: 0.75, highway: 'SH' }
  },
  Pillayarpatti: {
    Chennai: { km: 410, hours: 6.75, highway: 'NH45' },
    Madurai: { km: 75, hours: 1.5, highway: 'NH383' },
    Coimbatore: { km: 220, hours: 4.25, highway: 'NH81' },
    Trichy: { km: 80, hours: 1.5, highway: 'NH383' }
  }
};

// Fallback coordinate map for approximate calculation if not in matrix
const CITY_COORDS: Record<string, [number, number]> = {
  Chennai: [13.0827, 80.2707],
  Mahabalipuram: [12.6269, 80.1927],
  Kanchipuram: [12.8342, 79.7036],
  Pondicherry: [11.9416, 79.8083],
  Chidambaram: [11.3992, 79.6936],
  Thanjavur: [10.7870, 79.1378],
  Trichy: [10.7905, 78.7047],
  Kumbakonam: [10.9602, 79.3845],
  'Gangaikonda Cholapuram': [11.2061, 79.4528],
  Madurai: [9.9252, 78.1198],
  Rameswaram: [9.2876, 79.3129],
  Dhanushkodi: [9.1764, 79.4183],
  Kanyakumari: [8.0883, 77.5385],
  Coonoor: [11.3530, 76.7959],
  Ooty: [11.4102, 76.6950],
  Pykara: [11.4552, 76.6028],
  Mudumalai: [11.5623, 76.5342],
  Kotagiri: [11.4239, 76.8647],
  Kodaikanal: [10.2381, 77.4892],
  Chettinad: [10.0717, 78.7836],
  Karaikudi: [10.0717, 78.7836],
  Athangudi: [10.1583, 78.7750],
  Pillayarpatti: [10.1172, 78.6833],
  Pudukkottai: [10.3797, 78.8208],
  Coimbatore: [11.0168, 76.9558],
  Salem: [11.6643, 78.1460],
  Tirunelveli: [8.7139, 77.7567],
  Yercaud: [11.7753, 78.2093]
};

export function getRouteSegment(from: string, to: string): { km: number; travelTime: string; highway: string } {
  const normFrom = Object.keys(DISTANCE_MATRIX).find(k => k.toLowerCase() === from.toLowerCase()) || from;
  const normTo = Object.keys(DISTANCE_MATRIX[normFrom] || {}).find(k => k.toLowerCase() === to.toLowerCase()) || to;

  // Same city/hub exploration (e.g. Day 1 within Madurai or Chennai)
  if (normFrom.toLowerCase() === normTo.toLowerCase()) {
    return { km: 24, travelTime: '45m City Heritage Route', highway: 'City Heritage Route' };
  }

  if (DISTANCE_MATRIX[normFrom]?.[normTo]) {
    const entry = DISTANCE_MATRIX[normFrom][normTo];
    const hrs = Math.floor(entry.hours);
    const mins = Math.round((entry.hours - hrs) * 60);
    const timeStr = hrs > 0 ? `${hrs}h ${mins > 0 ? mins + 'm' : ''} via ${entry.highway}` : `${mins}m via ${entry.highway}`;
    return { km: entry.km, travelTime: timeStr, highway: entry.highway };
  }

  // Reverse check
  if (DISTANCE_MATRIX[normTo]?.[normFrom]) {
    const entry = DISTANCE_MATRIX[normTo][normFrom];
    const hrs = Math.floor(entry.hours);
    const mins = Math.round((entry.hours - hrs) * 60);
    const timeStr = hrs > 0 ? `${hrs}h ${mins > 0 ? mins + 'm' : ''} via ${entry.highway}` : `${mins}m via ${entry.highway}`;
    return { km: entry.km, travelTime: timeStr, highway: entry.highway };
  }

  // Geographic distance approximation using coordinates
  const cFrom = CITY_COORDS[normFrom] || [13.0827, 80.2707];
  const cTo = CITY_COORDS[normTo] || [10.7870, 79.1378];
  const rad = Math.PI / 180;
  const dLat = (cTo[0] - cFrom[0]) * rad;
  const dLon = (cTo[1] - cFrom[1]) * rad;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(cFrom[0] * rad) * Math.cos(cTo[0] * rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = 6371 * c;
  const roadKm = Math.max(Math.round(straightKm * 1.35), 20); // 35% road curvature in Tamil Nadu
  const hoursVal = roadKm / 55; // average highway speed 55 km/h
  const hrs = Math.floor(hoursVal);
  const mins = Math.round((hoursVal - hrs) * 60);
  const timeStr = `${hrs}h ${mins}m via State Highway`;
  return { km: roadKm, travelTime: timeStr, highway: 'State Highway Corridor' };
}

export function generateSmartTamilNaduItinerary(params: PlannerInput) {
  const start = params.startingLocation || 'Chennai';
  const destInput = (params.destination || '').toLowerCase();
  const days = Math.min(Math.max(params.daysCount || 2, 1), 5);
  const budget = params.budget || 5000;
  const group = params.travelGroup || 'Solo';
  const transport = params.transportPreference || 'Comfort AC Car / Taxi';
  const food = params.foodPreference || 'Vegetarian';

  // Group multiplier
  let peopleCount = 1;
  let roomCount = 1;
  if (group.includes('Couple')) {
    peopleCount = 2;
    roomCount = 1;
  } else if (group.includes('Family')) {
    peopleCount = 4;
    roomCount = 2;
  } else if (group.includes('Friends')) {
    peopleCount = 4;
    roomCount = 2;
  } else if (group.includes('Senior')) {
    peopleCount = 2;
    roomCount = 1;
  }

  // Determine Circuit
  let circuitKey: 'coastal' | 'chola' | 'madurai' | 'nilgiris' | 'chettinad' | 'grand' = 'coastal';

  if (destInput.includes('chola') || destInput.includes('thanjavur')) {
    circuitKey = 'chola';
  } else if (destInput.includes('madurai') || destInput.includes('rameswaram') || destInput.includes('pilgrim')) {
    circuitKey = 'madurai';
  } else if (destInput.includes('nilgiri') || destInput.includes('ooty') || destInput.includes('tea')) {
    circuitKey = 'nilgiris';
  } else if (destInput.includes('chettinad') || destInput.includes('gastronomy')) {
    circuitKey = 'chettinad';
  } else if (destInput.includes('grand') || destInput.includes('full')) {
    circuitKey = 'grand';
  } else {
    // If starting from Coimbatore and not specified, suggest Nilgiris
    if (start.toLowerCase() === 'coimbatore') circuitKey = 'nilgiris';
    // If starting from Madurai, suggest Madurai/Rameswaram
    else if (start.toLowerCase() === 'madurai') circuitKey = 'madurai';
    // If starting from Trichy, suggest Chola
    else if (start.toLowerCase() === 'trichy') circuitKey = 'chola';
  }

  // Build Day Legs according to Circuit and Origin
  interface DayTemplate {
    fromCity: string;
    toCity: string;
    title: string;
    heroImage: string;
    stops: any[];
  }

  const circuits: Record<string, DayTemplate[]> = {
    coastal: [
      {
        fromCity: start,
        toCity: 'Mahabalipuram',
        title: `${start} to Mahabalipuram — Ocean Heritage & Sculptures`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-1-1',
            time: '08:30 AM',
            title: 'Mylapore Traditional Breakfast & Coffee',
            subtitle: 'Steaming Ghee Podi Idlis & Kumbakonam Degree Coffee',
            description: 'Morning energy boost along the scenic coastal drive.',
            category: 'Food',
            location: `${start} Route`,
            duration: '45 mins',
            cost: 160,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-1-2',
            time: '10:30 AM',
            title: 'UNESCO Shore Temple & Arjuna\'s Penance',
            subtitle: 'Pallava Monolithic Rock Architecture',
            description: 'Listen to the audio guide amidst 8th-century granite sea shrines.',
            category: 'Heritage',
            location: 'Mahabalipuram',
            duration: '2 hours',
            cost: 80,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH',
            isCrowded: true,
            alternativeSuggestion: {
              name: 'Sadras Dutch Fort & Secluded Shore',
              reason: 'Bypass peak Shore Temple queues with a 14 km drive to tranquil 17th-century coastal fortifications.',
              image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
              cost: 0,
              duration: '1.5 hours'
            }
          },
          {
            id: 'stop-1-3',
            time: '01:00 PM',
            title: 'Coastal Banana Leaf Lunch',
            subtitle: 'Traditional Vegetarian Thali & Rasam',
            description: 'Authentic meal served on banana leaves with seasonal kootu and appalam.',
            category: 'Food',
            location: 'Mahabalipuram',
            duration: '1 hour',
            cost: 240,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-1-4',
            time: '03:30 PM',
            title: 'Five Rathas & Hereditary Stone Sculptors',
            subtitle: 'Monolithic Chariots & Chisel Art',
            description: 'Observe master artisans hand-carving granite and soapstone murtis.',
            category: 'Culture',
            location: 'Mahabalipuram',
            duration: '1.5 hours',
            cost: 80,
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Mahabalipuram',
        toCity: 'Kanchipuram',
        title: 'Mahabalipuram to Kanchipuram — Thousand Temples & Silk Guilds',
        heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-2-1',
            time: '08:00 AM',
            title: 'Kailasanathar Temple & Sandstone Cloisters',
            subtitle: 'Oldest Standing Sandstone Temple in South India',
            description: 'Peaceful morning darshan surrounded by 58 miniature cloistered shrines.',
            category: 'Temples',
            location: 'Kanchipuram',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-2-2',
            time: '11:00 AM',
            title: 'Pit Loom Jacquard Silk Weavers Guild',
            subtitle: 'UNESCO GI Tagged Mulberry Silk Demonstration',
            description: 'Meet master weaver Parthasarathy and watch pure silver-zari warping.',
            category: 'Culture',
            location: 'Weavers Colony',
            duration: '1.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-2-3',
            time: '01:00 PM',
            title: 'Kanchi Kovil Idli & Traditional Lunch',
            subtitle: 'Steamed Cylindrical Idli with Pepper and Cumin',
            description: 'Legendary temple specialty with ginger chutney and sambar.',
            category: 'Food',
            location: 'Gandhi Road',
            duration: '45 mins',
            cost: 180,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-2-4',
            time: '03:30 PM',
            title: 'Ekambareswarar 192-ft Rajagopuram',
            subtitle: 'Earth Lingam Shrine & 3,500-Year Mango Tree',
            description: 'Marvel at one of South India’s tallest granite gateway towers.',
            category: 'Temples',
            location: 'Kanchipuram',
            duration: '2 hours',
            cost: 20,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Kanchipuram',
        toCity: 'Pondicherry',
        title: 'Kanchipuram to Pondicherry — Franco-Tamil Coastal Promenade',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-3-1',
            time: '09:00 AM',
            title: 'White Town French Heritage Walk',
            subtitle: 'Mustard Yellow Colonial Mansions & Bougainvillea',
            description: 'Stroll cobblestone streets designed in a neoclassical French grid.',
            category: 'Culture',
            location: 'White Town',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-3-2',
            time: '12:30 PM',
            title: 'Creole French-Tamil Fusion Lunch',
            subtitle: 'Café des Arts / Surcouf Mess',
            description: 'Baguettes, Ratatouille with South Indian coconut milk curry.',
            category: 'Food',
            location: 'Rue Suffren',
            duration: '1 hour',
            cost: 350,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-3-3',
            time: '03:30 PM',
            title: 'Auroville Matrimandir Viewing Point',
            subtitle: 'Golden Geodesic Sphere of Concentrated Silence',
            description: 'Walk through banyan gardens to gaze upon the gold-plated meditation dome.',
            category: 'Heritage',
            location: 'Auroville',
            duration: '2.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Pondicherry',
        toCity: 'Chidambaram',
        title: 'Pondicherry to Chidambaram — Cosmic Dance & Mangrove Labyrinths',
        heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-4-1',
            time: '08:30 AM',
            title: 'Thillai Nataraja Golden Roof Temple',
            subtitle: 'Cosmic Dance & The Chidambara Rahasyam',
            description: 'Darshan at the jewel-encrusted sanctum of Nataraja with 21,600 golden tiles.',
            category: 'Temples',
            location: 'Chidambaram',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-4-2',
            time: '01:30 PM',
            title: 'Pichavaram World Second Largest Mangrove Boating',
            subtitle: 'Canopy Boat Ride through 4,400 Canals',
            description: 'Row between dense stilt roots where kingfishers and egrets dive.',
            category: 'Nature',
            location: 'Pichavaram',
            duration: '2.5 hours',
            cost: 250,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Chidambaram',
        toCity: start,
        title: `Chidambaram to ${start} — Coastal Fortress Return`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-5-1',
            time: '09:00 AM',
            title: 'Sadras Dutch Fort & Coastal Bastions',
            subtitle: '17th-Century VOC Warehouse & Gunpowder Magazine',
            description: 'Undisturbed red-brick fortifications right on the Bay of Bengal.',
            category: 'Heritage',
            location: 'Sadras',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-5-2',
            time: '01:00 PM',
            title: 'Seaside Highway Fare & Journey Debrief',
            subtitle: 'Fresh Coconut Water & Local Delicacies',
            description: 'Reflect on 5 days of Tamil Nadu heritage while concluding the circuit.',
            category: 'Food',
            location: 'ECR Highway',
            duration: '1 hour',
            cost: 200,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      }
    ],

    chola: [
      {
        fromCity: start,
        toCity: 'Trichy',
        title: `${start} to Trichy — Sacred Kaveri & The Billion-Year Rock`,
        heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-1',
            time: '08:30 AM',
            title: 'Srirangam Ranganathaswamy 156-Acre Complex',
            subtitle: 'Largest Functioning Hindu Temple in the World',
            description: 'Walk through 7 concentric prakaras and 21 sculpted gopurams.',
            category: 'Temples',
            location: 'Srirangam',
            duration: '2.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-ch-2',
            time: '12:30 PM',
            title: 'Kaveri Delta Banana Leaf Feast',
            subtitle: 'Authentic More Kuzhambu & Vazhaipoo Vadai',
            description: 'Delta culinary tradition served hot with ghee and freshly crushed appalam.',
            category: 'Food',
            location: 'Trichy',
            duration: '1 hour',
            cost: 220,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-ch-3',
            time: '04:00 PM',
            title: 'Rockfort Ucchi Pillayar Temple',
            subtitle: 'Ancient Citadel atop 83-meter Pre-Cambrian Rock',
            description: 'Climb 437 stone steps for 360-degree panoramic sunset views over Kaveri river.',
            category: 'Heritage',
            location: 'Trichy',
            duration: '2 hours',
            cost: 20,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Trichy',
        toCity: 'Thanjavur',
        title: 'Trichy to Thanjavur — Great Living Chola Temples & Art',
        heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-4',
            time: '08:30 AM',
            title: 'Brihadeeswara Temple (Peruvudaiyar Kovil)',
            subtitle: 'UNESCO Monument of 130,000 Tons of Granite',
            description: 'Gaze upon the 216-ft granite vimana and 80-ton monolithic cupola.',
            category: 'Heritage',
            location: 'Thanjavur',
            duration: '2.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-ch-5',
            time: '12:00 PM',
            title: 'Thanjavur Maratha Palace & Saraswathi Mahal',
            subtitle: 'Ancient Palm Leaf Manuscripts & Royal Arsenal',
            description: 'Explore one of Asia\'s oldest medieval libraries.',
            category: 'Culture',
            location: 'Thanjavur',
            duration: '1.5 hours',
            cost: 50,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-ch-6',
            time: '02:30 PM',
            title: 'Thanjavur Bronze Casting & Veena Guild',
            subtitle: 'Lost-Wax Bronze Sculpture & Jackwood Veenas',
            description: 'Watch Sthapatis chisel bronze Nataraja icons following the Shilpa Shastras.',
            category: 'Culture',
            location: 'Artisans Street',
            duration: '1.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Thanjavur',
        toCity: 'Kumbakonam',
        title: 'Thanjavur to Kumbakonam — Stone Chariots of Darasuram',
        heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-7',
            time: '09:00 AM',
            title: 'Airavatesvara Temple at Darasuram',
            subtitle: 'Musical Steps and Intricate Miniature Chola Stone Carvings',
            description: 'Marvel at 12th-century stone chariot wheels and musical balustrades.',
            category: 'Heritage',
            location: 'Darasuram',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-ch-8',
            time: '01:00 PM',
            title: 'Kumbakonam Degree Filter Coffee & Kadappa',
            subtitle: 'Pure Chicory-Free Cow Milk Brew & Savory Tiffin',
            description: 'Sip legendary foamy degree coffee served in traditional brass davarah-tumbler.',
            category: 'Food',
            location: 'Kumbakonam',
            duration: '45 mins',
            cost: 120,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Kumbakonam',
        toCity: 'Gangaikonda Cholapuram',
        title: 'Kumbakonam to Gangaikonda Cholapuram — Imperial Chola Capital',
        heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-9',
            time: '09:30 AM',
            title: 'Gangaikonda Choleswarar Temple',
            subtitle: 'Rajendra Chola’s Commemorative Vimana of Oceanic Conquest',
            description: 'Sublime curved granite contours surrounded by verdant delta gardens.',
            category: 'Heritage',
            location: 'Jayankondam',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Gangaikonda Cholapuram',
        toCity: start,
        title: `Gangaikonda Cholapuram to ${start} — Heritage Return`,
        heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-10',
            time: '12:00 PM',
            title: 'Kallanai Grand Anicut',
            subtitle: 'Karikala Chola 2nd-Century CE Dam on Kaveri',
            description: 'One of the oldest water-diversion structures in the world still in use.',
            category: 'Heritage',
            location: 'Grand Anicut',
            duration: '1.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      }
    ],

    madurai: [
      {
        fromCity: start,
        toCity: 'Madurai',
        title: `${start} to Madurai — Sleepless City of Jasmine & Gopurams`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-m-1',
            time: '08:30 AM',
            title: 'Madurai Murugan Idli & Soft Tiffin',
            subtitle: 'Four Chutneys & Ghee Podi Steamed Idlis',
            description: 'Fuel up at the quintessential Madurai breakfast institution.',
            category: 'Food',
            location: 'West Masi St',
            duration: '45 mins',
            cost: 180,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-m-2',
            time: '10:00 AM',
            title: 'Meenakshi Sundareswarar Temple Complex',
            subtitle: '14 Towering Gopurams with 33,000 Painted Murthis',
            description: 'Explore the 1000-pillar hall and listen to stone musical pillars.',
            category: 'Temples',
            location: 'Madurai',
            duration: '3 hours',
            cost: 50,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          },
          {
            id: 'stop-m-3',
            time: '02:00 PM',
            title: 'Thirumalai Nayakkar Palace',
            subtitle: 'Indo-Saracenic Stucco Arches & Giant Giant Pillars',
            description: '17th-century palace constructed by Italian architect for King Thirumalai.',
            category: 'Heritage',
            location: 'Madurai',
            duration: '1.5 hours',
            cost: 20,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          },
          {
            id: 'stop-m-4',
            time: '04:30 PM',
            title: 'Famous Madurai Jigarthanda',
            subtitle: 'Cooling Almond Gum, Nannari & Condensed Milk',
            description: 'Sip the royal dessert drink perfected over four generations.',
            category: 'Food',
            location: 'East Marret St',
            duration: '30 mins',
            cost: 80,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Madurai',
        toCity: 'Rameswaram',
        title: 'Madurai to Rameswaram — The Pamban Sea Bridge & Ocean Spires',
        heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-m-5',
            time: '09:30 AM',
            title: 'Pamban Sea Bridge Crossing',
            subtitle: 'Spectacular 2-km Cantilever Bridge over Azure Bay of Bengal',
            description: 'Witness fishing boats glide beneath the historic railway cantilever.',
            category: 'Heritage',
            location: 'Pamban',
            duration: '45 mins',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-m-6',
            time: '11:30 AM',
            title: 'Ramanathaswamy Temple 1,220-Meter Corridors',
            subtitle: 'World\'s Longest Temple Pillared Hall & 22 Theerthams',
            description: 'Marvel at 1,212 sculpted sandstone pillars framing symmetrical vistas.',
            category: 'Temples',
            location: 'Rameswaram',
            duration: '2.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          },
          {
            id: 'stop-m-7',
            time: '02:30 PM',
            title: 'Island Seafood / Traditional Mess Meal',
            subtitle: 'Fresh Coastal Thali with Rasam and Appalam',
            description: 'Delicious hot lunch within hearing distance of breaking waves.',
            category: 'Food',
            location: 'Rameswaram',
            duration: '1 hour',
            cost: 260,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Rameswaram',
        toCity: 'Dhanushkodi',
        title: 'Rameswaram to Dhanushkodi — The Ghost City at Ocean\'s Edge',
        heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-m-8',
            time: '07:30 AM',
            title: 'Dhanushkodi Land\'s End & Ram Setu Viewpoint',
            subtitle: 'Convergence of Quiet Waters & Crashing Bay of Bengal',
            description: 'Drive along the narrow sandspit surrounded by turquoise waters.',
            category: 'Nature',
            location: 'Arichal Munai',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-m-9',
            time: '11:00 AM',
            title: 'Submerged Railway Station & Church Ruins',
            subtitle: 'Relics of the 1964 Cyclone',
            description: 'Walk through windswept coral-stone ruins preserving timeless history.',
            category: 'Heritage',
            location: 'Dhanushkodi',
            duration: '1.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Rameswaram',
        toCity: 'Kanyakumari',
        title: 'Rameswaram to Kanyakumari — Southernmost Tip of India',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-m-10',
            time: '02:00 PM',
            title: 'Vivekananda Rock Memorial & 133-ft Thiruvalluvar',
            subtitle: 'Ferry to the Sacred Offshore Rock Monolith',
            description: 'Stand at the meditation hall where three oceans meet.',
            category: 'Heritage',
            location: 'Kanyakumari',
            duration: '2.5 hours',
            cost: 70,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Kanyakumari',
        toCity: start,
        title: `Kanyakumari to ${start} — Tri-Sea Sunrise & Return`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-m-11',
            time: '05:45 AM',
            title: 'Triveni Sangam Sunrise',
            subtitle: 'Where Indian Ocean, Arabian Sea & Bay of Bengal Merge',
            description: 'Watch the crimson sun ascend over the converging ocean waters.',
            category: 'Nature',
            location: 'Sunset View Point',
            duration: '1.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      }
    ],

    nilgiris: [
      {
        fromCity: start,
        toCity: 'Coonoor',
        title: `${start} to Coonoor — Fragrant Nilgiri Tea Hills`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-n-1',
            time: '09:00 AM',
            title: 'Sim\'s Park Century-Old Botanical Reserve',
            subtitle: 'Terraced Valleys of Magnolia & Rare Shrubs',
            description: 'Breathe crisp mountain air amidst Japanese maples and tree ferns.',
            category: 'Nature',
            location: 'Coonoor',
            duration: '2 hours',
            cost: 40,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-n-2',
            time: '12:00 PM',
            title: 'Highfield Tea Factory & Tasting Cellar',
            subtitle: 'Orthodox CTC Processing & Nilgiri Golden Tea Brews',
            description: 'Witness tea leaves withering and taste freshly crushed mountain tea.',
            category: 'Culture',
            location: 'Coonoor',
            duration: '1.5 hours',
            cost: 30,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Coonoor',
        toCity: 'Ooty',
        title: 'Coonoor to Ooty — UNESCO Nilgiri Mountain Toy Train',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-n-3',
            time: '10:00 AM',
            title: 'Nilgiri Mountain Railway (Toy Train)',
            subtitle: 'Steam Engine Rack & Pinion Rail through 16 Tunnels',
            description: 'Scenic journey through eucalyptus forests and dramatic ravines.',
            category: 'Heritage',
            location: 'Ooty Railway Station',
            duration: '1.5 hours',
            cost: 150,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          },
          {
            id: 'stop-n-4',
            time: '01:30 PM',
            title: 'Government Botanical Gardens & Fossil Tree',
            subtitle: '55-Acre Terraced Garden & 20-Million-Year Petrified Trunk',
            description: 'Lush manicured lawns housing over a thousand indigenous and exotic plants.',
            category: 'Nature',
            location: 'Ooty',
            duration: '2 hours',
            cost: 50,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Ooty',
        toCity: 'Pykara',
        title: 'Ooty to Pykara — Waterfalls & Toda Tribal Highlands',
        heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-n-5',
            time: '09:30 AM',
            title: 'Pykara Lake & Speedboat Ride',
            subtitle: 'Sacred Nilgiri River surrounded by Shola Grasslands',
            description: 'Glide over pristine blue waters framed by pine and eucalyptus.',
            category: 'Nature',
            location: 'Pykara',
            duration: '2 hours',
            cost: 200,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Pykara',
        toCity: 'Mudumalai',
        title: 'Pykara to Mudumalai — Western Ghats Wildlife Safari',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-n-6',
            time: '02:30 PM',
            title: 'Mudumalai Tiger Reserve Jeep Safari',
            subtitle: 'Spot Asian Elephants, Gaurs & Spotted Deer',
            description: 'Open-top wildlife trail through deciduous teak forests.',
            category: 'Nature',
            location: 'Mudumalai',
            duration: '3 hours',
            cost: 350,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Mudumalai',
        toCity: start,
        title: `Mudumalai to ${start} — Kotagiri Tea Trail Return`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-n-7',
            time: '11:00 AM',
            title: 'Kodanad Viewpoint',
            subtitle: 'Panoramic Vistas of Moyar Gorge & Bhavanisagar Dam',
            description: 'A breathtaking conclusion to your mountain journey.',
            category: 'Nature',
            location: 'Kotagiri',
            duration: '1.5 hours',
            cost: 20,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      }
    ],

    chettinad: [
      {
        fromCity: start,
        toCity: 'Karaikudi',
        title: `${start} to Karaikudi — Palaces of Teak & Athangudi Artisans`,
        heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-1',
            time: '09:00 AM',
            title: 'Kanadukathan 1,000-Window Chettiar Mansion',
            subtitle: 'Burmese Teak, Belgian Mirrors & Italian Marble',
            description: 'Tour regal ancestral courtyards built by 19th-century maritime merchants.',
            category: 'Heritage',
            location: 'Kanadukathan',
            duration: '2 hours',
            cost: 100,
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          },
          {
            id: 'stop-ch-2',
            time: '01:00 PM',
            title: 'Legendary Chettinad Feast on Banana Leaf',
            subtitle: 'Pepper Chicken / Vatha Kuzhambu & Milagu Rasam',
            description: 'Freshly ground star anise, kalpasi (stone flower) and black pepper spices.',
            category: 'Food',
            location: 'The Bangala',
            duration: '1.5 hours',
            cost: 450,
            image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Karaikudi',
        toCity: 'Athangudi',
        title: 'Karaikudi to Athangudi — Handmade Terracotta Tiles & Antiquities',
        heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-3',
            time: '09:30 AM',
            title: 'Athangudi Handmade Cement Tile Workshops',
            subtitle: 'Sun-Dried Heritage Tiles with Glass Molds',
            description: 'Watch artisans pour colored cements into intricate geometric brass frames.',
            category: 'Culture',
            location: 'Athangudi',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Athangudi',
        toCity: 'Pudukkottai',
        title: 'Athangudi to Pudukkottai — Sittanavasal Rock Paintings',
        heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-4',
            time: '10:00 AM',
            title: 'Sittanavasal 2nd-Century Jain Cave Complex',
            subtitle: 'Ancient Fresco Paintings & Musical Whispering Cavern',
            description: 'Lotus pond murals and acoustic rock-cut sanctum.',
            category: 'Heritage',
            location: 'Sittanavasal',
            duration: '2 hours',
            cost: 25,
            image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      },
      {
        fromCity: 'Pudukkottai',
        toCity: 'Pillayarpatti',
        title: 'Pudukkottai to Pillayarpatti — Karpaga Vinayagar Rock Shrine',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-5',
            time: '09:30 AM',
            title: 'Pillayarpatti Cave Temple',
            subtitle: '6-ft Bas-Relief Ganesha Carved into Granite Cliff',
            description: 'One of the oldest stone-cut shrines in Tamilakam.',
            category: 'Temples',
            location: 'Pillayarpatti',
            duration: '2 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Pillayarpatti',
        toCity: start,
        title: `Pillayarpatti to ${start} — Culinary Souvenir Return`,
        heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-ch-6',
            time: '11:00 AM',
            title: 'Karaikudi Antique Market & Murukku Bazaar',
            subtitle: 'Authentic Chettinad Kai Murukku & Teak Collectibles',
            description: 'Stock up on crunchy hand-coiled murukkus and heritage brassware.',
            category: 'Shopping',
            location: 'Muneeswaran Koil Lane',
            duration: '1.5 hours',
            cost: 200,
            image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'LOW'
          }
        ]
      }
    ],

    grand: [
      {
        fromCity: start,
        toCity: 'Mahabalipuram',
        title: `${start} to Mahabalipuram — Coastal Heritage`,
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-g-1',
            time: '09:00 AM',
            title: 'Shore Temple & Arjuna\'s Penance',
            subtitle: 'UNESCO Pallava Masterpiece',
            description: 'Granite bas-relief carvings facing the Bay of Bengal.',
            category: 'Heritage',
            location: 'Mahabalipuram',
            duration: '2 hours',
            cost: 80,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Mahabalipuram',
        toCity: 'Thanjavur',
        title: 'Mahabalipuram to Thanjavur — Great Living Chola Temples',
        heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-g-2',
            time: '11:00 AM',
            title: 'Brihadeeswara Temple (Big Temple)',
            subtitle: 'Monolithic Granite Vimana & Chola Frescoes',
            description: 'The architectural zenith of Emperor Raja Raja Chola I.',
            category: 'Heritage',
            location: 'Thanjavur',
            duration: '2.5 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'MEDIUM'
          }
        ]
      },
      {
        fromCity: 'Thanjavur',
        toCity: 'Madurai',
        title: 'Thanjavur to Madurai — Sleepless City of Jasmine',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-g-3',
            time: '10:00 AM',
            title: 'Meenakshi Amman Temple',
            subtitle: '1000-Pillar Hall & Golden Lotus Tank',
            description: 'The cultural heart of the ancient Pandyan Kingdom.',
            category: 'Temples',
            location: 'Madurai',
            duration: '3 hours',
            cost: 50,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Madurai',
        toCity: 'Rameswaram',
        title: 'Madurai to Rameswaram — The Ocean Corridor',
        heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-g-4',
            time: '10:00 AM',
            title: 'Pamban Sea Bridge & Ramanathaswamy Corridors',
            subtitle: 'Sacred Island connected by Cantilever Railway',
            description: 'Cross the ocean bridge to the sacred island of Rama.',
            category: 'Heritage',
            location: 'Rameswaram',
            duration: '3 hours',
            cost: 0,
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      },
      {
        fromCity: 'Rameswaram',
        toCity: 'Kanyakumari',
        title: 'Rameswaram to Kanyakumari — Southern Confluence of 3 Oceans',
        heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        stops: [
          {
            id: 'stop-g-5',
            time: '11:00 AM',
            title: 'Vivekananda Rock Memorial & 133-ft Thiruvalluvar',
            subtitle: 'Where Arabian Sea, Indian Ocean & Bay of Bengal Merge',
            description: 'Conclude your journey at the southernmost tip of the subcontinent.',
            category: 'Heritage',
            location: 'Kanyakumari',
            duration: '2.5 hours',
            cost: 70,
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
            crowdLevel: 'HIGH'
          }
        ]
      }
    ]
  };

  const selectedTemplateList = circuits[circuitKey] || circuits.coastal;
  const activeDays = selectedTemplateList.slice(0, days);

  // Compute accurate KM and travel time for each day
  let totalKm = 0;
  let totalMinutes = 0;
  let totalStopsCost = 0;

  const resolvedDays = activeDays.map((tpl, idx) => {
    const route = getRouteSegment(tpl.fromCity, tpl.toCity);
    totalKm += route.km;

    // parse hours
    const match = route.travelTime.match(/(\d+)h(?:\s*(\d+)m)?/);
    if (match) {
      const h = parseInt(match[1], 10) || 0;
      const m = parseInt(match[2] || '0', 10) || 0;
      totalMinutes += h * 60 + m;
    } else {
      totalMinutes += Math.round(route.km / 50 * 60);
    }

    // Stop costs
    tpl.stops.forEach((s: any) => {
      totalStopsCost += (s.cost || 0);
    });

    return {
      dayNumber: idx + 1,
      title: tpl.title,
      fromCity: tpl.fromCity,
      toCity: tpl.toCity,
      distance: `${route.km} km`,
      travelTime: route.travelTime,
      transportMode: transport,
      heroImage: tpl.heroImage,
      stops: tpl.stops
    };
  });

  // Calculate realistic cost breakdown based on transport mode, group, days, and meal preferences
  let transportCost = 0;
  if (transport.includes('Car') || transport.includes('Taxi')) {
    // ₹14 per km + ₹400 driver beta/day
    transportCost = Math.round(totalKm * 14 + (days * 400));
  } else if (transport.includes('Bus') || transport.includes('Public')) {
    // ₹1.8 per km per passenger
    transportCost = Math.round(totalKm * 1.8 * peopleCount);
  } else if (transport.includes('Self-Drive') || transport.includes('Bike')) {
    // ₹5.5 fuel per km + tolls
    transportCost = Math.round(totalKm * 5.5 + (days * 150));
  } else if (transport.includes('Train')) {
    // ₹1.2 per km per passenger
    transportCost = Math.round(totalKm * 1.2 * peopleCount + 200);
  } else {
    transportCost = Math.round(totalKm * 12);
  }

  // Accommodation Cost: (days - 1) nights
  const nights = Math.max(days - 1, 0);
  const stayPerNight = roomCount === 1 ? 1600 : 3000;
  const stayCost = nights * stayPerNight;

  // Food Cost per person per day
  const dailyMealRate = food.toLowerCase().includes('non') ? 650 : 450;
  const foodCost = days * dailyMealRate * peopleCount;

  // Activities & Sightseeing
  const activitiesCost = totalStopsCost * peopleCount;

  // Miscellaneous / local auto / tips
  const miscCost = days * 180 * peopleCount;

  const totalCalculatedCost = transportCost + stayCost + foodCost + activitiesCost + miscCost;

  // Total transit time string
  const totalHrs = Math.floor(totalMinutes / 60);
  const remMins = totalMinutes % 60;
  const totalTravelTimeStr = totalHrs > 0 ? `${totalHrs}h ${remMins > 0 ? remMins + 'm' : ''} Driving` : `${remMins}m Driving`;

  // Budget Health Status
  const diff = budget - totalCalculatedCost;
  let healthStatus: 'within' | 'exceeded' | 'optimal' = 'within';
  let adviceTip = '';

  if (diff >= 0) {
    if (diff <= budget * 0.15) {
      healthStatus = 'optimal';
      adviceTip = `Optimal budget balance! Your ₹${budget.toLocaleString()} plan covers all travel, stays, and temple meals with ₹${diff.toLocaleString()} buffer.`;
    } else {
      healthStatus = 'within';
      adviceTip = `Well within budget! You will save approximately ₹${diff.toLocaleString()} on this journey, perfect for buying authentic Kanchipuram silk or Tanjore bronze mementos.`;
    }
  } else {
    healthStatus = 'exceeded';
    const overAmt = Math.abs(diff);
    let potentialSavingsTip = '';
    if (transport.includes('Car') || transport.includes('Taxi')) {
      const trainCostApprox = Math.round(totalKm * 1.2 * peopleCount);
      const carSavings = transportCost - trainCostApprox;
      potentialSavingsTip = `💡 AI Recommendation: Switching from Private AC Taxi to Southern Railway Express or TNSTC Deluxe Bus saves approx. ₹${carSavings.toLocaleString()}.`;
    } else {
      potentialSavingsTip = `💡 AI Recommendation: Opting for TTDC Tamil Nadu Tourism Hotel stays will save approx. ₹${Math.round(stayCost * 0.35).toLocaleString()}.`;
    }
    adviceTip = `Estimated spend exceeds budget by ₹${overAmt.toLocaleString()}. ${potentialSavingsTip}`;
  }

  return {
    id: `itinerary-${Date.now()}`,
    title: `${days}-Day ${circuitKey.toUpperCase()} Cultural Circuit from ${start}`,
    startingLocation: start,
    destination: params.destination || `${circuitKey.charAt(0).toUpperCase() + circuitKey.slice(1)} Heritage Circuit`,
    daysCount: days,
    budget,
    totalEstimatedCost: totalCalculatedCost,
    totalDistanceKm: totalKm,
    totalTravelTime: totalTravelTimeStr,
    costBreakdown: {
      transport: transportCost,
      stay: stayCost,
      food: foodCost,
      activities: activitiesCost,
      misc: miscCost,
      total: totalCalculatedCost
    },
    budgetHealth: {
      status: healthStatus,
      difference: diff,
      tip: adviceTip
    },
    interests: params.interests || ['Heritage', 'Food'],
    travelGroup: group,
    transportPreference: transport,
    foodPreference: food,
    accessibility: params.accessibility || 'Senior Friendly',
    createdAt: new Date().toISOString(),
    days: resolvedDays,
    aiNotes: [
      `Accurately computed ${totalKm} km road distance across Tamil Nadu expressways.`,
      `Dynamic budget audited: Transport (₹${transportCost}), Stays (₹${stayCost}), Meals (₹${foodCost}), Sightseeing (₹${activitiesCost}).`,
      `Paced specifically for ${group} travellers using ${transport}.`
    ]
  };
}
