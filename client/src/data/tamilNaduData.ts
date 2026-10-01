import { Destination, LocalExperience, Artisan, TouristPass, Expense, Itinerary } from '../types';

export const TAMIL_NADU_DESTINATIONS: Destination[] = [
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    tamilName: 'மகாபலிபுரம் (மாமல்லபுரம்)',
    tagline: 'Where history meets the sea.',
    description: 'An ancient coastal seaport of the Pallava dynasty, renowned for rock-cut monoliths, UNESCO World Heritage shore temples, and exquisite stone carvings caressed by the Bay of Bengal.',
    location: 'Chengalpattu District',
    district: 'Chengalpattu',
    category: 'Heritage',
    rating: 4.8,
    reviewCount: 3840,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [12.6269, 80.1927],
    bestTime: 'October to March (Sunrise & Sunset)',
    entryFee: 40,
    duration: '3–4 hours',
    estimatedCost: 800,
    crowdLevel: 'HIGH',
    crowdForecast: {
      current: 'HIGH',
      morning: 'MEDIUM',
      afternoon: 'HIGH',
      evening: 'MEDIUM',
      bestTimeToVisit: '06:30 AM – 09:00 AM (Serene light & low crowds)',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Paved stone pathways connect the Shore Temple lawns. Wheelchair ramps installed at main monument gates.',
    },
    highlights: ['UNESCO Shore Temple', "Arjuna's Penance", "Krishna's Butterball", 'Five Rathas'],
    history: 'Constructed predominantly during the reign of Narasimhavarman I (Mamalla) in the 7th century CE, serving as the chief naval trade hub connecting ancient Tamilakam with Southeast Asia.',
    architecture: 'Pioneered free-standing Dravidian structural stone temples carved out of granite boulders, introducing pyramidal vimanas and monolithic rock shrines.',
    culturalSignificance: 'A cornerstone of South Indian classical architecture that profoundly influenced temple construction across Cambodia, Java, and Sri Lanka.',
    interestingFacts: [
      'Seven pagodas were originally said to stand here; the Shore Temple is the surviving gem.',
      'The 250-ton Krishna\'s Butterball has defied gravity on a 45-degree slope for 1200+ years.',
      'Submerged structures were confirmed off the shore after the 2004 tsunami receded.'
    ],
    audioGuideText: 'Welcome to Mahabalipuram, the jewel of Pallava maritime heritage. As you stand before the Shore Temple, listen to the Bay of Bengal waves crashing against granite carved more than thirteen hundred years ago. King Narasimhavarman sculpted this shore not just for worship, but as a lighthouse for merchant ships returning from Sri Lanka and Sumatra.',
    nearbyPlaces: [
      { name: 'Sadras Dutch Fort', distance: '14 km', category: 'Heritage' },
      { name: 'Covelong Beach', distance: '19 km', category: 'Beaches' },
      { name: 'DakshinaChitra Heritage Museum', distance: '22 km', category: 'Culture' }
    ],
    weatherInfo: {
      temp: '29°C',
      condition: 'Sunny & Coastal Breeze',
      alert: 'Crowd spike detected today. AI suggests visiting Shore Temple before 10 AM.'
    }
  },
  {
    id: 'chennai',
    name: 'Chennai',
    tamilName: 'சென்னை',
    tagline: 'The Gateway to South India & Cultural Capital.',
    description: 'A vibrant metropolitan cradle of Carnatic music, ancient Dravidian temples, colonial architecture, vibrant filter coffee culture, and the world\'s second-longest urban beach.',
    location: 'Chennai District',
    district: 'Chennai',
    category: 'Culture',
    rating: 4.7,
    reviewCount: 9120,
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [13.0827, 80.2707],
    bestTime: 'November to February',
    entryFee: 0,
    duration: '1–2 days',
    estimatedCost: 1500,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'LOW',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: 'Early morning at Marina Beach or 5:00 PM at Kapaleeshwarar Temple',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: true,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Marina Beach has a permanent disabled wooden walkway down to the sea.',
    },
    highlights: ['Kapaleeshwarar Temple', 'Marina Beach', 'Fort St. George', 'San Thome Basilica'],
    history: 'Originated from Madraspatnam founded in 1639, evolving from ancient Chola port villages like Mylapore and Triplicane into a global cultural hub.',
    architecture: 'Stunning Indo-Saracenic colonial buildings juxtaposed with vibrant Dravidian Gopurams with sculpted mythologies.',
    culturalSignificance: 'Host of the world-famous Madras December Music Season, the second largest cultural festival in the world.',
    interestingFacts: [
      'Mylapore was known to ancient Greek and Roman traders as Mylarphon over 2,000 years ago.',
      'Marina Beach spans an uninterrupted 13 kilometers.',
      'Chennai is renowned as the Health Capital of India.'
    ],
    audioGuideText: 'Welcome to Chennai, where ancient traditions blend effortlessly with modern rhythm. From the divine bells of Kapaleeshwarar to the aroma of freshly brewed Kumbakonam degree filter coffee in Mylapore, every corner speaks of warmth and heritage.',
    nearbyPlaces: [
      { name: 'Mahabalipuram', distance: '55 km', category: 'Heritage' },
      { name: 'Pulicat Lake Bird Sanctuary', distance: '54 km', category: 'Nature' },
      { name: 'Kanchipuram', distance: '72 km', category: 'Temples' }
    ]
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    tamilName: 'காஞ்சிபுரம்',
    tagline: 'The Golden City of a Thousand Temples & Silk.',
    description: 'One of India\'s seven sacred Moksha puris, celebrated for monumental granite temple spires and master weavers crafting world-renowned pure mulberry silk saris.',
    location: 'Kanchipuram District',
    district: 'Kanchipuram',
    category: 'Temples',
    rating: 4.8,
    reviewCount: 4210,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [12.8342, 79.7036],
    bestTime: 'October to March',
    entryFee: 0,
    duration: '4–6 hours',
    estimatedCost: 1200,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'HIGH',
      afternoon: 'LOW',
      evening: 'HIGH',
      bestTimeToVisit: '07:00 AM – 11:00 AM for temple darshan; afternoon for silk looms',
    },
    accessibility: {
      wheelchair: false,
      stepsCount: 'Moderate',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Ancient stone thresholds in inner sanctums require stepping over stone sills.',
    },
    highlights: ['Ekambareswarar Temple', 'Kanchi Kailasanathar Temple', 'Varadharaja Perumal Temple', 'Traditional Silk Weaving Looms'],
    history: 'Historical capital of the Pallavas from the 4th to 9th centuries, and later a key Chola center celebrated by Chinese traveler Xuanzang.',
    architecture: 'Kailasanathar Temple is the oldest sandstone temple in South India, featuring 58 small shrines along the perimeter.',
    culturalSignificance: 'Kanchipuram silk holds a UNESCO Geographical Indication (GI) tag, renowned for contrast borders woven with pure gold zari.',
    interestingFacts: [
      'Ekambareswarar temple embodies the Earth (Prithvi) element of the Pancha Bhoota Stalas.',
      'A sacred 3,500-year-old mango tree inside Ekambareswarar yielded 4 varieties of mangoes.',
      'The silk saris are woven using traditional pit looms passed through 400 years of weaver guilds.'
    ],
    audioGuideText: 'You are now entering Kanchipuram, the seat of wisdom and weaving. Here, the sandstone walls of Kailasanathar temple glow amber at sundown, and the rhythmic clatter of shuttle looms crafts the legendary Kanchipuram silk saris with pure silver and gold threads.',
    nearbyPlaces: [
      { name: 'Vedanthangal Bird Sanctuary', distance: '48 km', category: 'Nature' },
      { name: 'Mahabalipuram', distance: '66 km', category: 'Heritage' }
    ]
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry',
    tamilName: 'பாண்டிச்சேரி (புதுச்சேரி)',
    tagline: 'A French Colonial Coastal Promenade.',
    description: 'A serene union of French colonial elegance, pastel villas, tree-lined boulevards, tranquil ashrams, and pristine sun-kissed beaches.',
    location: 'Puducherry UT (Bordering TN)',
    district: 'Puducherry',
    category: 'Beaches',
    rating: 4.8,
    reviewCount: 6890,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [11.9416, 79.8083],
    bestTime: 'October to March',
    entryFee: 0,
    duration: '1–2 days',
    estimatedCost: 2000,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'LOW',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: '06:00 AM Promenade walk or late evening cafe hopping',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'None',
      liftAvailable: true,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'The French Quarter promenade is vehicle-free between 6 PM and 7:30 AM.',
    },
    highlights: ['Promenade Beach', 'Auroville Matrimandir', 'Sri Aurobindo Ashram', 'French Quarter (White Town)'],
    history: 'Ruled by France from 1674 until 1954, leaving behind an indelible Franco-Tamil cultural synthesis.',
    architecture: 'Neoclassical French villas with bougainvillea draped over arched mustard gateways.',
    culturalSignificance: 'A global experiment in universal human unity at Auroville, recognized by UNESCO.',
    interestingFacts: [
      'White Town and Heritage Tamil Town are bifurcated by a historic canal.',
      'Auroville\'s Matrimandir golden dome contains the world\'s largest optically perfect crystal sphere.',
      'French is still spoken by elders and police wear red Képi caps.'
    ],
    audioGuideText: 'Breathe in the salty sea air and fresh croissants. White Town welcomes you with cobbled lanes named Rue Suffren and Rue Dumas. Walk along the rocky promenade and witness where French joie de vivre meets Tamil seaside hospitality.',
    nearbyPlaces: [
      { name: 'Paradise Beach', distance: '8 km', category: 'Beaches' },
      { name: 'Auroville', distance: '12 km', category: 'Culture' }
    ]
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    tamilName: 'தஞ்சாவூர்',
    tagline: 'The Imperial Throne of the Great Cholas.',
    description: 'Home of the breathtaking Brihadeeswara Temple, Tanjore glass paintings, classical Thanjavur dancing dolls, and the rice bowl of Tamil Nadu fed by the sacred Kaveri.',
    location: 'Thanjavur District',
    district: 'Thanjavur',
    category: 'Heritage',
    rating: 4.9,
    reviewCount: 5420,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [10.7870, 79.1378],
    bestTime: 'October to March',
    entryFee: 0,
    duration: '4–5 hours',
    estimatedCost: 950,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'MEDIUM',
      afternoon: 'LOW',
      evening: 'HIGH',
      bestTimeToVisit: '04:30 PM – 07:00 PM when the granite turns incandescent golden',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Broad stone courtyards provide wheelchair ramps around the sanctum ambulatory.',
    },
    highlights: ['Brihadeeswarar Big Temple', 'Thanjavur Maratha Palace', 'Saraswathi Mahal Library', 'Tanjore Art Gallery'],
    history: 'Built under Emperor Raja Raja Chola I between 1003 and 1010 CE to celebrate Chola supremacy over South Asia.',
    architecture: 'The 66-meter high granite Vimana is crowned by an 80-ton monolithic cupola, constructed entirely without mortar using interlocking stones.',
    culturalSignificance: 'UNESCO World Heritage Great Living Chola Temples. Birthplace of Bharatanatyam\'s formalized margam repertoire.',
    interestingFacts: [
      'The entire Big Temple is made of 130,000 tons of granite brought from quarries 60 km away.',
      'Saraswathi Mahal Library preserves over 49,000 palm-leaf manuscripts dating back to the 16th century.',
      'The Nandi statue at the entrance is carved from a single massive rock weighing over 20 tonnes.'
    ],
    audioGuideText: 'Behold the Big Temple, Peruvudaiyar Kovil. Imagine a thousand years ago: King Raja Raja Chola standing here as temple bells pealed and bronze murtis paraded. Notice how the monumental granite tower pierces the sky, an engineering wonder that has withstood centuries of monsoons and tremors.',
    nearbyPlaces: [
      { name: 'Kumbakonam', distance: '39 km', category: 'Temples' },
      { name: 'Gangaikonda Cholapuram', distance: '72 km', category: 'Heritage' },
      { name: 'Darasuram Airavatesvara', distance: '36 km', category: 'Heritage' }
    ]
  },
  {
    id: 'madurai',
    name: 'Madurai',
    tamilName: 'மதுரை',
    tagline: 'The Sleepless City of Jasmine and Pandyan Kings.',
    description: 'One of the world\'s oldest continuously inhabited cities, revolving around the legendary Meenakshi Amman Temple, midnight food stalls, and fragrant Madurai Malli.',
    location: 'Madurai District',
    district: 'Madurai',
    category: 'Culture',
    rating: 4.9,
    reviewCount: 8870,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [9.9252, 78.1198],
    bestTime: 'October to March',
    entryFee: 50,
    duration: '1–2 days',
    estimatedCost: 1400,
    crowdLevel: 'HIGH',
    crowdForecast: {
      current: 'HIGH',
      morning: 'HIGH',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: '05:30 AM Darshan or 09:00 PM Palliarai Pooja procession',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Wheelchair assistance available at East Tower entrance for elderly and disabled pilgrims.',
    },
    highlights: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Mahal', 'Gandhi Memorial Museum', 'Madurai Street Food (Jigarthanda & Kari Dosa)'],
    history: 'Legendary capital of the Tamil Sangam poets and Pandyan dynasty, shaped in concentric lotus petals around the sanctum.',
    architecture: 'Features 14 majestic multi-colored gopurams reaching up to 52 meters, adorned with over 33,000 sculpted deities and celestial beings.',
    culturalSignificance: 'The heartland of Tamil literature and classical Tamil identity. Celebrated Chithirai festival attracts millions.',
    interestingFacts: [
      'The Thousand Pillar Hall actually has 985 exquisitely carved musical pillars that sound musical notes when tapped.',
      'Known as Thoonga Nagaram (the city that never sleeps) due to bustling night markets.',
      'Madurai Malli jasmine holds a GI tag for its distinctively intense fragrance.'
    ],
    audioGuideText: 'Vanakkam to Madurai! You are walking through lanes planned in concentric squares inspired by the lotus flower. As evening arrives, treat your senses to the taste of cold, velvety Famous Jigarthanda and witness the ceremonial evening procession carrying Lord Shiva to Meenakshi\'s chamber.',
    nearbyPlaces: [
      { name: 'Alagar Kovil', distance: '21 km', category: 'Temples' },
      { name: 'Chettinad Kanadukathan', distance: '85 km', category: 'Village Experiences' }
    ]
  },
  {
    id: 'trichy',
    name: 'Trichy (Tiruchirappalli)',
    tamilName: 'திருச்சிராப்பள்ளி',
    tagline: 'Ancient Rock Fortress on the banks of Kaveri.',
    description: 'Dominated by the dramatic 83-meter Rockfort rising above city roofs, and the island city of Srirangam housing the world\'s largest functioning Hindu temple complex.',
    location: 'Tiruchirappalli District',
    district: 'Tiruchirappalli',
    category: 'Temples',
    rating: 4.7,
    reviewCount: 4620,
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [10.7905, 78.7047],
    bestTime: 'November to February',
    entryFee: 20,
    duration: '1 day',
    estimatedCost: 1100,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'MEDIUM',
      afternoon: 'LOW',
      evening: 'HIGH',
      bestTimeToVisit: 'Sunrise climb to Rockfort Ucchi Pillayar Temple',
    },
    accessibility: {
      wheelchair: false,
      stepsCount: 'Many',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Rockfort involves climbing 437 stone steps cut into the rock; Srirangam temple is wheelchair accessible.',
    },
    highlights: ['Rockfort Ucchi Pillayar Temple', 'Sri Ranganathaswamy Temple Srirangam', 'Kallanai Grand Anicut', 'Samayapuram'],
    history: 'The rock fortress formation dates back over a billion years, making it older than the Himalayas.',
    architecture: 'Srirangam Temple spans 156 acres with 7 concentric parikramas and 21 imposing gopurams.',
    culturalSignificance: 'Prime center of Sri Vaishnavism, celebrated by the 12 Alvars.',
    interestingFacts: [
      'Kallanai Dam, built by King Karikalan Chola around 100 CE, is the 4th oldest water-diversion structure still in use in the world.',
      'Srirangam\'s Rajagopuram is 72 meters tall, one of the tallest temple towers in Asia.'
    ],
    audioGuideText: 'Look up at the monolithic geological wonder of Rockfort. As you ascend its stone-cut tunnel, the panoramic view of the Kaveri and Kollidam rivers unfolding below is unforgettable.',
    nearbyPlaces: [
      { name: 'Thanjavur', distance: '55 km', category: 'Heritage' },
      { name: 'Pudukkottai Sittanavasal Caves', distance: '50 km', category: 'Heritage' }
    ]
  },
  {
    id: 'rameswaram',
    name: 'Rameswaram',
    tamilName: 'இராமேஸ்வரம்',
    tagline: 'The Sacred Island & Coastal Gateway to the Coral Seas.',
    description: 'An enchanting island connected by the iconic Pamban Bridge over azure waters, revered for Ramanathaswamy Temple\'s endless corridors and Dhanushkodi\'s ghost town shores.',
    location: 'Ramanathapuram District',
    district: 'Ramanathapuram',
    category: 'Heritage',
    rating: 4.8,
    reviewCount: 6100,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [9.2876, 79.3129],
    bestTime: 'October to April',
    entryFee: 0,
    duration: '1–2 days',
    estimatedCost: 1600,
    crowdLevel: 'HIGH',
    crowdForecast: {
      current: 'HIGH',
      morning: 'HIGH',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: 'Early morning at Agni Theertham sea bath & sunrise at Dhanushkodi',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Paved walkways around temple corridors; Dhanushkodi requires specially permitted vehicles or battery carts.',
    },
    highlights: ['Pamban Sea Bridge', 'Ramanathaswamy Temple Corridors', 'Dhanushkodi Ghost Town', 'APJ Abdul Kalam Memorial'],
    history: 'Ancient pilgrimage destination linked to the Ramayana epic and the mythical Ram Setu (Adam\'s Bridge).',
    architecture: 'The temple third corridor is the longest in the world, spanning 1,220 meters with 1,212 intricately carved granite pillars.',
    culturalSignificance: 'One of the Char Dham sacred pilgrimage sites and home to 22 sacred teerthams.',
    interestingFacts: [
      'Pamban Bridge was India\'s first sea bridge, opening in 1914 with a double-leaf bascule section.',
      'Dhanushkodi is just 24 kilometers from Talaimannar in Sri Lanka across the Palk Strait.',
      'The water from 22 wells inside the temple has distinct temperatures and mineral compositions.'
    ],
    audioGuideText: 'Listen to the sea wind humming through the granite pillars of the third corridor. Each pillar is carved from stone transported across the sea on wooden rafts centuries ago.',
    nearbyPlaces: [
      { name: 'Dhanushkodi Beach', distance: '18 km', category: 'Beaches' },
      { name: 'Devipattinam Navagraha Temple', distance: '70 km', category: 'Temples' }
    ]
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    tamilName: 'கன்னியாகுமரி',
    tagline: 'Where Three Oceans Meet at the Tip of India.',
    description: 'The southernmost point of peninsular India where the Arabian Sea, Indian Ocean, and Bay of Bengal converge, famed for sunrise and sunset over the same horizon.',
    location: 'Kanyakumari District',
    district: 'Kanyakumari',
    category: 'Beaches',
    rating: 4.8,
    reviewCount: 7120,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [8.0883, 77.5385],
    bestTime: 'October to March (Full Moon evenings)',
    entryFee: 70,
    duration: '1 day',
    estimatedCost: 1300,
    crowdLevel: 'HIGH',
    crowdForecast: {
      current: 'HIGH',
      morning: 'HIGH',
      afternoon: 'LOW',
      evening: 'HIGH',
      bestTimeToVisit: '05:45 AM for Sunrise & 05:30 PM for Sunset over the tri-sea confluence',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Moderate',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Ferry boats to Vivekananda Rock Memorial require assistance for boarding.',
    },
    highlights: ['Vivekananda Rock Memorial', '133-ft Thiruvalluvar Statue', 'Sunset Point Triveni Sangam', 'Bhagavathy Amman Temple'],
    history: 'Revered since ancient Sangam literature as the southern frontier of Tamilakam.',
    architecture: 'The 133-foot stone statue of saint-poet Thiruvalluvar weighs 7,000 tons and represents 133 chapters of the Tirukkural.',
    culturalSignificance: 'Where Swami Vivekananda meditated on the rock in 1892 before his historic Chicago parliament address.',
    interestingFacts: [
      'On Chitra Pournami (full moon in April/May), you can watch the sunset and moonrise simultaneously in the same sky.',
      'The sands of Kanyakumari beach naturally display multi-colored mineral hues.'
    ],
    audioGuideText: 'Standing here at the tip of the subcontinent, gaze into the boundless horizon where three oceans merge. Feel the sea spray as you look upon Thiruvalluvar, representing wisdom and ethical life.',
    nearbyPlaces: [
      { name: 'Padmanabhapuram Wooden Palace', distance: '37 km', category: 'Heritage' },
      { name: 'Suchindram Thanumalayan Temple', distance: '13 km', category: 'Temples' }
    ]
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    tamilName: 'ஊட்டி (உதகமண்டலம்)',
    tagline: 'The Queen of Hill Stations in the Blue Mountains.',
    description: 'Nestled amidst the misty Nilgiri Hills with eucalyptus groves, emerald tea estates, colonial stone cottages, and the historic UNESCO Nilgiri Mountain Railway.',
    location: 'The Nilgiris District',
    district: 'Nilgiris',
    category: 'Hill Station',
    rating: 4.8,
    reviewCount: 8200,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [11.4102, 76.6950],
    bestTime: 'October to June',
    entryFee: 50,
    duration: '2–3 days',
    estimatedCost: 2800,
    crowdLevel: 'HIGH',
    crowdForecast: {
      current: 'HIGH',
      morning: 'MEDIUM',
      afternoon: 'HIGH',
      evening: 'MEDIUM',
      bestTimeToVisit: 'Morning walks through tea estates or Botanical Garden',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Moderate',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Botanical Gardens have paved wheelchair friendly pathways.',
    },
    highlights: ['Nilgiri Mountain Toy Train', 'Ooty Botanical Gardens', 'Doddabetta Peak', 'Pykara Lake & Waterfalls'],
    history: 'Developed by British collector John Sullivan in the 1820s as a summer refuge for the Madras Presidency.',
    architecture: 'Tudor and Victorian stone bungalows set against indigenous Toda tribal huts.',
    culturalSignificance: 'Homeland of the indigenous Toda, Kota, and Badaga hill communities.',
    interestingFacts: [
      'The Nilgiri Mountain Railway utilizes an ingenious rack and pinion system to climb steep mountain inclines.',
      'The Nilgiri name means "Blue Mountains", inspired by the Kurinji flower which blooms once every 12 years.'
    ],
    audioGuideText: 'Hear the whistle of the blue and cream steam engine as it chugs through emerald valleys and tunnels. The cool mountain mist smells of eucalyptus and fresh highland tea.',
    nearbyPlaces: [
      { name: 'Coonoor', distance: '19 km', category: 'Nature' },
      { name: 'Kotagiri', distance: '29 km', category: 'Nature' }
    ]
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    tamilName: 'கொடைக்கானல்',
    tagline: 'The Princess of Hill Stations & Misty Lakes.',
    description: 'A serene mountain sanctuary set atop the Palani Hills, renowned for star-shaped lakes, pine forests, cascading silver waterfalls, and homemade artisan chocolates.',
    location: 'Dindigul District',
    district: 'Dindigul',
    category: 'Hill Station',
    rating: 4.8,
    reviewCount: 6490,
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [10.2381, 77.4892],
    bestTime: 'September to May',
    entryFee: 30,
    duration: '2–3 days',
    estimatedCost: 2600,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'LOW',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: 'Early morning cycling around Kodai Lake & Coaker\'s Walk at mist rise',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'The path circling Kodai Lake is level and accessible for wheelchairs and strollers.',
    },
    highlights: ['Kodaikanal Lake', "Coaker's Walk", 'Pillar Rocks', 'Pine Forest Sanctuary'],
    history: 'Established in 1845 by American Christian missionaries and British bureaucrats escaping tropical illnesses.',
    architecture: 'Colonial stone cottages and gothic church spires nestled among pear orchards.',
    culturalSignificance: 'Famous for the rare Kurinji flower and organic hill farming.',
    interestingFacts: [
      'Kodai lake is man-made, created in 1863 by Sir Vere Henry Levinge.',
      'A rare atmospheric optical phenomenon called the "Brocken Spectre" can sometimes be seen from Coaker\'s Walk.'
    ],
    audioGuideText: 'Walk along Coaker\'s Walk on a misty morning as floating clouds sweep across the Palani valley below. The tranquil scent of pine trees and blooming plums invites pure relaxation.',
    nearbyPlaces: [
      { name: 'Berijam Lake', distance: '21 km', category: 'Nature' },
      { name: 'Vattakanal Dolphin\'s Nose', distance: '8 km', category: 'Nature' }
    ]
  },
  {
    id: 'chettinad',
    name: 'Chettinad (Karaikudi)',
    tamilName: 'செட்டிநாடு (காரைக்குடி)',
    tagline: 'Palaces of Teak, Athangudi Tiles & Legendary Spice.',
    description: 'A heritage wonderland of sprawling palatial mansions adorned with Burmese teak, Belgian chandeliers, handmade Athangudi patterned tiles, and world-acclaimed culinary art.',
    location: 'Sivaganga & Pudukkottai Districts',
    district: 'Sivaganga',
    category: 'Village Experiences',
    rating: 4.9,
    reviewCount: 3120,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [10.0717, 78.7836],
    bestTime: 'October to March',
    entryFee: 100,
    duration: '1–2 days',
    estimatedCost: 2200,
    crowdLevel: 'LOW',
    crowdForecast: {
      current: 'LOW',
      morning: 'LOW',
      afternoon: 'LOW',
      evening: 'MEDIUM',
      bestTimeToVisit: 'Morning mansion walk in Kanadukathan; 01:00 PM traditional banana-leaf meal',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Most restored heritage mansions have ground floor suites with ramp access.',
    },
    highlights: ['Kanadukathan Chettinad Palace', 'Athangudi Handmade Tile Workshops', 'Chettinad Banana Leaf Feast', 'Karaikudi Antique Street'],
    history: 'Built by the affluent Nattukottai Chettiars, pioneering maritime financiers who traded across Burma, Ceylon, and Vietnam in the 19th and early 20th centuries.',
    architecture: 'Mansions featuring hundreds of rooms, Italian marble pillars, cast-iron railings from Birmingham, and cooling egg-white plaster walls.',
    culturalSignificance: 'Chettinad cuisine is one of India\'s most celebrated culinary traditions, featuring star anise, marathi mokku, and kalpasi.',
    interestingFacts: [
      'Athangudi tiles are made purely by hand using glass moulds, river sand, and natural mineral dyes.',
      'Chettinad mansion walls were polished using a mixture containing lime, sea shells, and egg whites that remains cold in summer.'
    ],
    audioGuideText: 'Step into a Chettinad courtyard where columns of solid Burmese teak welcome you into an era of regal hospitality. Inhale the aroma of hand-pounded black pepper and roasted coriander simmering in an earthern clay pot.',
    nearbyPlaces: [
      { name: 'Pillayarpatti Karpaga Vinayagar Temple', distance: '12 km', category: 'Temples' },
      { name: 'Thirumayam Rock Fort', distance: '22 km', category: 'Heritage' }
    ]
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    tamilName: 'கோயம்புத்தூர்',
    tagline: 'The Manchester of South India at the Western Ghats.',
    description: 'A thriving industrial and educational hub ringed by mist-clad Western Ghats, renowned for the 112-foot Adiyogi Shiva bust, Siruvani sweet water, and textile craftsmanship.',
    location: 'Coimbatore District',
    district: 'Coimbatore',
    category: 'Nature',
    rating: 4.7,
    reviewCount: 5200,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [11.0168, 76.9558],
    bestTime: 'September to March',
    entryFee: 0,
    duration: '1–2 days',
    estimatedCost: 1500,
    crowdLevel: 'MEDIUM',
    crowdForecast: {
      current: 'MEDIUM',
      morning: 'LOW',
      afternoon: 'MEDIUM',
      evening: 'HIGH',
      bestTimeToVisit: 'Evening for Adiyogi Divya Darshanam laser projection',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'None',
      liftAvailable: true,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Isha Yoga Centre and Marudhamalai Temple both offer battery cars and wheelchair ramps.',
    },
    highlights: ['112-ft Adiyogi Shiva Statue', 'Marudhamalai Murugan Temple', 'Siruvani Waterfalls', 'Gass Forest Museum'],
    history: 'Ancient Kongu Nadu region, celebrated since the Chera and Chola times as a key inland trade route through the Palakkad Gap.',
    architecture: 'Guinness World Record holding 112-ft steel bust of Adiyogi designed for inner transformation.',
    culturalSignificance: 'Famous for Siruvani water, hailed as the second sweetest natural water in the world.',
    interestingFacts: [
      'The 112 feet of Adiyogi symbolizes 112 ways to attain the ultimate nature through yoga.',
      'Coimbatore supplies over 70% of the wet grinders and motor pumps manufactured in India.'
    ],
    audioGuideText: 'Standing before the colossal silhouette of Adiyogi with the Velliangiri mountains rising into the sunset, feel the profound serenity of Tamil Nadu\'s sacred mountain gateway.',
    nearbyPlaces: [
      { name: 'Pollachi Coconut Groves', distance: '40 km', category: 'Nature' },
      { name: 'Topslip Anamalai Tiger Reserve', distance: '75 km', category: 'Nature' }
    ]
  },
  {
    id: 'yercaud',
    name: 'Yercaud',
    tamilName: 'ஏற்காடு',
    tagline: 'The Jewel of the Shevaroy Hills.',
    description: 'An unhurried tranquil hill retreat surrounded by coffee plantations, orange groves, spice gardens, and the emerald Emerald Lake.',
    location: 'Salem District',
    district: 'Salem',
    category: 'Hill Station',
    rating: 4.6,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80'
    ],
    coordinates: [11.7753, 78.2093],
    bestTime: 'October to June',
    entryFee: 20,
    duration: '1–2 days',
    estimatedCost: 1800,
    crowdLevel: 'LOW',
    crowdForecast: {
      current: 'LOW',
      morning: 'LOW',
      afternoon: 'MEDIUM',
      evening: 'LOW',
      bestTimeToVisit: '07:00 AM lake walk and Lady\'s Seat sunset viewpoint',
    },
    accessibility: {
      wheelchair: true,
      stepsCount: 'Few',
      liftAvailable: false,
      parkingAvailable: true,
      restroomAvailable: true,
      seatingRestAreas: true,
      notes: 'Lake front promenade and Anna Park are paved and easily accessible.',
    },
    highlights: ['Yercaud Lake & Boating', "Lady's Seat", 'Kiliyur Waterfalls', 'Shevaroy Temple'],
    history: 'Discovered by Scottish civil servant David Cockburn in the 1820s, who introduced coffee and apples to the hills.',
    architecture: 'Charming stone church chapels and quiet colonial plantations.',
    culturalSignificance: 'Highest point in the Eastern Ghats of Tamil Nadu with sacred tribal deity shrines.',
    interestingFacts: [
      'The name Yercaud is derived from \'Yeri-Kadu\', which means \'Lake Forest\' in Tamil.',
      'Known as the poor man\'s Ooty due to its budget-friendly charm and peaceful atmosphere.'
    ],
    audioGuideText: 'Wind your way up through 20 hairpin turns overlooking the plains of Salem. At the summit, the serene waters of Yercaud Lake reflect surrounding silver oaks and coffee blossoms.',
    nearbyPlaces: [
      { name: 'Salem Mango Orchards', distance: '30 km', category: 'Food' },
      { name: 'Mettur Dam', distance: '55 km', category: 'Nature' }
    ]
  }
];

export const SAMPLE_ITINERARY: Itinerary = {
  id: 'itinerary-sample-01',
  title: 'Royal Heritage & Coastal Marvels of Tamil Nadu',
  startingLocation: 'Chennai',
  destination: 'Mahabalipuram → Kanchipuram → Thanjavur',
  daysCount: 2,
  budget: 5000,
  totalEstimatedCost: 3420,
  interests: ['Heritage', 'Temples', 'Food'],
  travelGroup: 'Solo / Friends',
  transportPreference: 'Car / AC Taxi',
  foodPreference: 'Vegetarian',
  accessibility: 'Senior Friendly',
  createdAt: '2026-10-01',
  aiNotes: [
    'AI dynamically arranged route to avoid highway peak hours on ECR.',
    'Optimized timings for cooler morning temple visits and evening beach breezes.',
    'Recommended pure-veg traditional mess dining spots matching your preferences.'
  ],
  days: [
    {
      dayNumber: 1,
      title: 'Chennai to Mahabalipuram — Ocean Heritage',
      fromCity: 'Chennai',
      toCity: 'Mahabalipuram',
      distance: '56 km',
      travelTime: '1 hr 15 mins via Scenic ECR',
      transportMode: 'Comfort AC Car',
      heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      stops: [
        {
          id: 'stop-1-1',
          time: '09:00 AM',
          title: 'Start Journey & Breakfast',
          subtitle: 'Mylapore Rayar\'s Mess / ECR Coastal Drive',
          description: 'Kickstart with steaming hot Ghee Podi Idlis, crispy Medu Vadas, and authentic Kumbakonam degree filter coffee.',
          category: 'Food',
          location: 'Chennai ECR',
          duration: '45 mins',
          cost: 180,
          image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.9815, 80.2458],
          crowdLevel: 'LOW'
        },
        {
          id: 'stop-1-2',
          time: '10:30 AM',
          title: 'UNESCO Shore Temple & Arjuna\'s Penance',
          subtitle: 'Pallava Monolithic Sculptures',
          description: 'Marvel at 1,300-year-old structural granite temples resting by the sea. Guided walk through Arjuna\'s Penance and Krishna\'s Butterball.',
          category: 'Heritage',
          location: 'Mahabalipuram',
          duration: '2 hours',
          cost: 80,
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.6169, 80.1927],
          crowdLevel: 'HIGH',
          isCrowded: true,
          alternativeSuggestion: {
            name: 'Sadras Dutch Fort & Secluded Shore',
            reason: 'Mahabalipuram is currently experiencing high crowd density. Sadras Fort is 14 km south with zero queues and stunning coastal cannons.',
            image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
            cost: 0,
            duration: '1.5 hours'
          }
        },
        {
          id: 'stop-1-3',
          time: '01:00 PM',
          title: 'Authentic Coastal Tamil Feast',
          subtitle: 'Seaview Banana Leaf Mess',
          description: 'Savor traditional vegetarian meals with spicy rasam, appalam, seasonal poriyal, and payasam served on fresh banana leaf.',
          category: 'Food',
          location: 'Mahabalipuram Fisherman Colony',
          duration: '1 hour',
          cost: 320,
          image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.6225, 80.1950],
          crowdLevel: 'MEDIUM'
        },
        {
          id: 'stop-1-4',
          time: '03:30 PM',
          title: 'Five Rathas & Stone Artisan Workshop',
          subtitle: 'Monolithic Chariots & Live Chisel Carving',
          description: 'Discover how hereditary sculptors still hand-chisel black granite statues using techniques unchanged since the Pallava empire.',
          category: 'Culture',
          location: 'Sculptors Lane, Mahabalipuram',
          duration: '1.5 hours',
          cost: 150,
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.6105, 80.1901],
          crowdLevel: 'LOW'
        },
        {
          id: 'stop-1-5',
          time: '05:30 PM',
          title: 'Sunset at Mahabalipuram Beach Promenade',
          subtitle: 'Ocean Breeze & Evening Relaxation',
          description: 'Golden hour stroll along the sandy shore with views of the illuminated Shore Temple tower in the twilight.',
          category: 'Beaches',
          location: 'Mahabalipuram Shore',
          duration: '1.5 hours',
          cost: 50,
          image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.6280, 80.1970],
          crowdLevel: 'MEDIUM'
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Kanchipuram to Thanjavur — Temple Spire Heartland',
      fromCity: 'Kanchipuram',
      toCity: 'Thanjavur',
      distance: '240 km',
      travelTime: '3.5 hrs scenic expressway drive',
      transportMode: 'Express Train / Taxi',
      heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      stops: [
        {
          id: 'stop-2-1',
          time: '08:00 AM',
          title: 'Kailasanathar Temple & Silk Guild Visit',
          subtitle: 'Oldest Sandstone Marvel & Silk Weavers',
          description: 'Early morning darshan amidst the tranquil 7th-century sandstone cloister shrines, followed by a visit to a master weaver\'s pit loom.',
          category: 'Temples',
          location: 'Kanchipuram',
          duration: '2.5 hours',
          cost: 200,
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
          coordinates: [12.8423, 79.6897],
          crowdLevel: 'LOW'
        },
        {
          id: 'stop-2-2',
          time: '12:30 PM',
          title: 'Kaveri River Highway Lunch',
          subtitle: 'Tiruvannamalai / Villupuram Bypass Traditional Thali',
          description: 'Wholesome lunch with local curd, Kaveri delta sambar, spiced vatha kuzhambu, and crunchy papad.',
          category: 'Food',
          location: 'Enroute NH32',
          duration: '45 mins',
          cost: 220,
          image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
          coordinates: [11.9400, 79.5000],
          crowdLevel: 'LOW'
        },
        {
          id: 'stop-2-3',
          time: '04:00 PM',
          title: 'Brihadeeswara Big Temple Golden Hour',
          subtitle: 'UNESCO Great Living Chola Wonder',
          description: 'Stand in awe before the 216-foot monolithic granite vimana as the late afternoon sun turns the temple walls into radiant amber gold.',
          category: 'Heritage',
          location: 'Thanjavur',
          duration: '2.5 hours',
          cost: 100,
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
          coordinates: [10.7870, 79.1378],
          crowdLevel: 'MEDIUM'
        },
        {
          id: 'stop-2-4',
          time: '07:00 PM',
          title: 'Maratha Palace & Saraswathi Mahal Library',
          subtitle: 'Ancient Palm Leaves & Bronze Gallery',
          description: 'Explore the royal Maratha corridors, bell tower, and the centuries-old collection of astronomical and medical manuscripts.',
          category: 'Culture',
          location: 'Thanjavur Palace Complex',
          duration: '1.5 hours',
          cost: 120,
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
          coordinates: [10.7932, 79.1390],
          crowdLevel: 'LOW'
        }
      ]
    }
  ]
};

export const LOCAL_EXPERIENCES: LocalExperience[] = [
  {
    id: 'exp-chettinad-cooking',
    title: 'Chettinad Heritage Culinary Masterclass',
    tamilTitle: 'செட்டிநாட்டு பாரம்பரிய சமையல் பயிலரங்கம்',
    category: 'Traditional Cooking',
    location: 'Kanadukathan, Chettinad',
    district: 'Sivaganga',
    hostName: 'Meenakshi Achi & Family',
    hostRole: '3rd Gen Chettiar Culinary Custodian',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    duration: '3.5 Hours',
    price: 850,
    rating: 4.95,
    reviewsCount: 142,
    languages: ['Tamil', 'English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Learn the secret spice roasting techniques of authentic Chettinad kitchens inside a 110-year-old courtyard mansion. Grind raw kalpasi, marathi mokku, and anasipoo in stone ammi-kallu mortars.',
    highlights: ['Fresh masala stone grinding', 'Clay pot cooking demo', 'Full 7-course banana leaf lunch', 'Handwritten spice recipe card'],
    maxGroupSize: 8,
    availability: ['Tomorrow 10:00 AM', 'Saturday 10:00 AM', 'Sunday 10:00 AM']
  },
  {
    id: 'exp-kanchi-silk-walk',
    title: 'Kanchipuram Silk Loom Guild & Jacquard Walk',
    tamilTitle: 'காஞ்சி பட்டு நெசவாளர் வரலாற்று நடை',
    category: 'Handicrafts',
    location: 'Weavers Colony, Kanchipuram',
    district: 'Kanchipuram',
    hostName: 'K. Parthasarathy',
    hostRole: 'National Award-Winning Master Weaver',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    duration: '2.5 Hours',
    price: 550,
    rating: 4.9,
    reviewsCount: 208,
    languages: ['Tamil', 'English'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Witness the centuries-old interlocking Korvai technique where two weavers work in unison. Feel pure mulberry silk and test authentic gold zari threads directly from ethical artisan cooperatives.',
    highlights: ['Try working a traditional pit loom', 'Zari gold purity demonstration', 'Direct ethical purchasing without middlemen', 'Temple sari symbolism talk'],
    maxGroupSize: 10,
    availability: ['Daily 09:30 AM', 'Daily 02:30 PM']
  },
  {
    id: 'exp-pollachi-farm-homestay',
    title: 'Pollachi Coconut & Organic Spice Farm Immersion',
    tamilTitle: 'பொள்ளாச்சி தென்னை & இயற்கை பண்ணை அனுபவம்',
    category: 'Farm Experiences',
    location: 'Anamalai Foothills, Pollachi',
    district: 'Coimbatore',
    hostName: 'Subramanian & Revathi',
    hostRole: 'Eco-Farmers & Wildlife Naturalists',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    duration: 'Half Day (5 Hours)',
    price: 1100,
    rating: 4.88,
    reviewsCount: 96,
    languages: ['Tamil', 'English', 'Malayalam'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Breathe in the lush breeze under 1,000 coconut palms overlooking the Anamalai Tiger Reserve. Savor fresh tender coconut water plucked before your eyes, bullock cart ride, and organic river-water meal.',
    highlights: ['Tree climbing and tender coconut harvest', 'Bullock cart village trail', 'Fresh Kaveri/Aliyar farm meal', 'Herbal garden guided walk'],
    maxGroupSize: 12,
    availability: ['Saturday 08:00 AM', 'Sunday 08:00 AM']
  },
  {
    id: 'exp-thanjavur-bronze-casting',
    title: 'Swamimalai Lost-Wax Bronze Sculpture Workshop',
    tamilTitle: 'சுவாமிமலை வெண்கலச் சிலை வார்ப்பு பயிலரங்கம்',
    category: 'Handicrafts',
    location: 'Swamimalai, Thanjavur',
    district: 'Thanjavur',
    hostName: 'Sthapati Radhakrishnan',
    hostRole: 'Sthapati Guild Master',
    hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    duration: '3 Hours',
    price: 750,
    rating: 4.92,
    reviewsCount: 115,
    languages: ['Tamil', 'English'],
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Learn the Chola lost-wax casting technique (Cire Perdue) documented in the Shilpa Shastras. Sculpt your own miniature beeswax prototype and witness molten bronze pouring into clay moulds.',
    highlights: ['Beeswax moulding practice', 'Molten bronze pouring demonstration', 'Take-home hand-cast brass token', 'Temple iconography explanation'],
    maxGroupSize: 6,
    availability: ['Tomorrow 02:00 PM', 'Every Tuesday & Friday 10:00 AM']
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-tanjore',
    artisanName: 'Babu Sankar Sthapati',
    craftName: 'Tanjore 22K Gold Foil Painting',
    region: 'Thanjavur',
    story: 'Preserving four generations of sacred iconography using natural limestone paste, Jaipur gems, and 22-karat gold leaf foil over seasoned jackwood boards.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'GI Tag Authenticated',
    rating: 4.9,
    products: [
      {
        id: 'prod-tanjore-1',
        title: 'Lord Ganesha 22K Gold Foil Painting (12x10")',
        price: 4800,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
        description: 'Handcrafted with genuine 22K gold foil, certified semi-precious stones, teak wood frame.',
        material: 'Teak wood, 22K Gold Leaf, Natural Gesso'
      },
      {
        id: 'prod-tanjore-2',
        title: 'Brihadeeswara Temple Mandala (16x14")',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
        description: 'Intricate architectural mandala detailing Raja Raja Chola\'s vimana in gold relief.',
        material: 'Jackwood, Gold Foil, Mineral Colors'
      }
    ]
  },
  {
    id: 'artisan-kanchipuram',
    artisanName: 'Sri Devi Silk Weavers Guild',
    craftName: 'Pure Mulberry Kanchipuram Silk',
    region: 'Kanchipuram',
    story: 'A collective of 42 master weavers operating traditional pit looms in Kanchipuram, dedicated to fair wages and genuine zari verification.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    badge: 'Silk Mark & GI Certified',
    rating: 4.95,
    products: [
      {
        id: 'prod-silk-1',
        title: 'Mayil-Chakram Border Royal Maroon Silk Stole',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
        description: 'Woven with peacock and solar chakra motifs on rich maroon pure silk yarn.',
        material: '100% Mulberry Silk, Half-fine Zari'
      }
    ]
  },
  {
    id: 'artisan-athangudi',
    artisanName: 'Muthu Palaniappan Tiles',
    craftName: 'Athangudi Handmade Geometric Heritage Tiles',
    region: 'Athangudi, Chettinad',
    story: 'Handcrafted floor tiles made using glass plates, river sand, and dry pigments, keeping 150-year-old Chettinad palace traditions alive.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'Heritage Craft Certified',
    rating: 4.88,
    products: [
      {
        id: 'prod-tile-1',
        title: 'Chettinad Floral Geometric Coaster Set (4 Pcs)',
        price: 650,
        image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=600&q=80',
        description: 'Miniature Athangudi tiles polished with natural oils, heat resistant and waterproof.',
        material: 'Mineral pigments, White cement, River sand'
      }
    ]
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', title: 'Chennai to Mahabalipuram AC Cab', category: 'Transport', amount: 1450, date: 'Today, 09:00 AM', notes: 'Pre-booked clean sedan' },
  { id: 'exp-2', title: 'Traditional Banana Leaf Lunch', category: 'Food', amount: 520, date: 'Today, 01:15 PM', notes: 'Ghee roast, meals for two' },
  { id: 'exp-3', title: 'UNESCO Monument Entry Passes', category: 'Tickets', amount: 200, date: 'Today, 10:45 AM', notes: 'Shore Temple & Five Rathas' },
  { id: 'exp-4', title: 'Hand-carved Stone Souvenir', category: 'Shopping', amount: 650, date: 'Today, 04:00 PM', notes: 'Miniature Shore Temple model' },
  { id: 'exp-5', title: 'Morning Filter Coffee & Snacks', category: 'Food', amount: 180, date: 'Today, 08:30 AM', notes: 'Rayar Mess Kumbakonam coffee' },
  { id: 'exp-6', title: 'Heritage Audio Guide & Entry', category: 'Activities', amount: 420, date: 'Today, 11:30 AM', notes: 'Official guide headset rental' }
];

export const INITIAL_TOURIST_PASS: TouristPass = {
  passNumber: 'TN-PASS-2026-8842',
  touristName: 'Siva',
  touristId: 'TN-884291',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  tier: 'Discoverer',
  points: 1250,
  ecoScore: 92,
  visitedCount: 12,
  totalDestinations: 38,
  stamps: [
    { city: 'Chennai', date: '28 Sep 2026', badgeName: 'Gateway City', icon: '🏛️' },
    { city: 'Mahabalipuram', date: '01 Oct 2026', badgeName: 'Shore Wonder', icon: '🌊' },
    { city: 'Kanchipuram', date: '01 Oct 2026', badgeName: 'Silk City', icon: '🪡' },
    { city: 'Madurai', date: '15 Sep 2026', badgeName: 'Sleepless Crown', icon: '🪔' }
  ],
  badges: [
    { id: 'badge-1', name: 'Temple Explorer', description: 'Visited 5+ ancient Dravidian temple complexes', icon: '🛕', earned: true, points: 250, unlockedAt: '15 Sep 2026' },
    { id: 'badge-2', name: 'Food Explorer', description: 'Experienced 3+ authentic regional Tamil feasts', icon: '🍲', earned: true, points: 200, unlockedAt: '28 Sep 2026' },
    { id: 'badge-3', name: 'Heritage Explorer', description: 'Walked UNESCO World Heritage granite monuments', icon: '🏛️', earned: true, points: 300, unlockedAt: 'Today' },
    { id: 'badge-4', name: 'Tamil Nadu Champion', description: 'Complete 25 destinations across all zones', icon: '👑', earned: false, points: 500 },
    { id: 'badge-5', name: 'Eco Traveler', description: 'Maintained 90+ eco-transit and local vendor score', icon: '🌿', earned: true, points: 150, unlockedAt: 'Today' }
  ]
};
