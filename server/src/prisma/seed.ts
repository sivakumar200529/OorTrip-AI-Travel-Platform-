import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Tamil Nadu Digital Tourism data...');

  // Hash demo password
  const hashedPassword = await bcrypt.hash('oortrip2026', 10);

  // 1. Create Demo Users
  const touristUser = await prisma.user.upsert({
    where: { email: 'siva.tourist@oortrip.ai' },
    update: {},
    create: {
      name: 'Siva',
      email: 'siva.tourist@oortrip.ai',
      password: hashedPassword,
      role: 'tourist',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      touristProfile: {
        create: {
          points: 1250,
          ecoScore: 92,
          tier: 'Discoverer',
          touristPass: {
            create: {
              passNumber: 'TN-PASS-2026-8842',
              visitedCount: 12,
              badges: {
                create: [
                  { name: 'Temple Explorer', description: 'Visited 5+ ancient Dravidian temples', icon: '🛕', points: 250 },
                  { name: 'Food Explorer', description: 'Experienced authentic regional feasts', icon: '🍲', points: 200 },
                  { name: 'Heritage Explorer', description: 'Walked UNESCO World Heritage granite monuments', icon: '🏛️', points: 300 },
                ]
              }
            }
          }
        }
      }
    }
  });

  const businessUser = await prisma.user.upsert({
    where: { email: 'partner@chettinadheritage.com' },
    update: {},
    create: {
      name: 'Meenakshi Chettinad Stays',
      email: 'partner@chettinadheritage.com',
      password: hashedPassword,
      role: 'business',
      business: {
        create: {
          companyName: 'Meenakshi Chettinad Heritage & Cuisine',
          craftType: 'Traditional Cooking & Architecture',
          district: 'Sivaganga',
          revenue: 29500
        }
      }
    }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tourism.tn.gov.in' },
    update: {},
    create: {
      name: 'TN Tourism Administrator',
      email: 'admin@tourism.tn.gov.in',
      password: hashedPassword,
      role: 'admin',
    }
  });

  console.log('Seeded Users: Tourist (Siva), Business (Meenakshi), Admin (TTDC)');

  // 2. Seed Destinations
  const destinationsData = [
    {
      id: 'mahabalipuram',
      name: 'Mahabalipuram',
      tamilName: 'மகாபலிபுரம்',
      tagline: 'Where history meets the sea.',
      description: 'An ancient coastal seaport of the Pallava dynasty, renowned for rock-cut monoliths and UNESCO World Heritage shore temples.',
      location: 'Chengalpattu District',
      district: 'Chengalpattu',
      category: 'Heritage',
      rating: 4.8,
      reviewCount: 3840,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      latitude: 12.6269,
      longitude: 80.1927,
      bestTime: 'October to March',
      entryFee: 40,
      duration: '3–4 hours',
      estimatedCost: 800,
      crowdLevel: 'HIGH',
      history: 'Built under King Narasimhavarman I in the 7th century CE as an international naval trading gateway.',
      architecture: 'Dravidian structural granite monoliths and rock-cut cave rathas.',
      culturalSignificance: 'UNESCO World Heritage monument grouping that influenced Southeast Asian architecture.',
      audioGuideText: 'Welcome to Mahabalipuram. As you gaze upon the Shore Temple, imagine 7th-century merchant ships returning from Sri Lanka and Java.'
    },
    {
      id: 'thanjavur',
      name: 'Thanjavur',
      tamilName: 'தஞ்சாவூர்',
      tagline: 'The Imperial Throne of the Great Cholas.',
      description: 'Home of the breathtaking Brihadeeswara Temple, Maratha Palace, and Tanjore art.',
      location: 'Thanjavur District',
      district: 'Thanjavur',
      category: 'Heritage',
      rating: 4.9,
      reviewCount: 5420,
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
      latitude: 10.7870,
      longitude: 79.1378,
      bestTime: 'October to March',
      entryFee: 0,
      duration: '4–5 hours',
      estimatedCost: 950,
      crowdLevel: 'MEDIUM',
      history: 'Constructed by Emperor Raja Raja Chola I between 1003 and 1010 CE.',
      architecture: 'A 66-meter monolithic granite vimana built without mortar using interlocking stones.',
      culturalSignificance: 'UNESCO Great Living Chola Temples. Birthplace of classical Bharatanatyam.',
      audioGuideText: 'Behold the Peruvudaiyar Kovil, an engineering masterpiece that has stood for over a thousand years.'
    },
    {
      id: 'madurai',
      name: 'Madurai',
      tamilName: 'மதுரை',
      tagline: 'The Sleepless City of Jasmine and Pandyan Kings.',
      description: 'Ancient lotus-shaped city centered around the magnificent Meenakshi Amman Temple.',
      location: 'Madurai District',
      district: 'Madurai',
      category: 'Culture',
      rating: 4.9,
      reviewCount: 8870,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      latitude: 9.9252,
      longitude: 78.1198,
      bestTime: 'October to March',
      entryFee: 50,
      duration: '1–2 days',
      estimatedCost: 1400,
      crowdLevel: 'HIGH',
      history: 'Ancient capital of the Tamil Sangam poets and Pandyan dynasty.',
      architecture: '14 soaring multi-colored gopurams decorated with 33,000 sculpted figures.',
      culturalSignificance: 'The living heart of Tamil literature and devotion.',
      audioGuideText: 'Vanakkam to Madurai! Walk through the concentric lotus petal lanes and experience the evening temple procession.'
    }
  ];

  for (const d of destinationsData) {
    await prisma.destination.upsert({
      where: { id: d.id },
      update: {},
      create: d
    });
  }

  console.log(`Seeded ${destinationsData.length} core destinations.`);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
