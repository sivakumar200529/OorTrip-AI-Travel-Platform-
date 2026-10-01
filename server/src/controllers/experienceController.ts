import { Request, Response } from 'express';

let experiences = [
  {
    id: 'exp-1',
    title: 'Chettinad Heritage Culinary Masterclass',
    tamilTitle: 'செட்டிநாட்டு பாரம்பரிய சமையல் பயிலரங்கம்',
    category: 'Traditional Cooking',
    location: 'Kanadukathan',
    district: 'Sivaganga',
    hostName: 'Meenakshi Achi',
    price: 850,
    duration: '3.5 Hours',
    rating: 4.95,
    reviewsCount: 142,
    languages: ['Tamil', 'English'],
    image: 'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=800&q=80',
    description: 'Learn the secret spice roasting techniques of authentic Chettinad kitchens in a 110-year-old courtyard mansion.'
  },
  {
    id: 'exp-2',
    title: 'Kanchipuram Silk Loom Guild & Jacquard Walk',
    tamilTitle: 'காஞ்சி பட்டு நெசவாளர் வரலாற்று நடை',
    category: 'Handicrafts',
    location: 'Weavers Colony',
    district: 'Kanchipuram',
    hostName: 'K. Parthasarathy',
    price: 550,
    duration: '2.5 Hours',
    rating: 4.9,
    reviewsCount: 208,
    languages: ['Tamil', 'English'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'Witness the interlocking Korvai technique and pure mulberry silk processing.'
  }
];

export const getExperiences = async (_req: Request, res: Response) => {
  return res.json(experiences);
};

export const createExperience = async (req: Request, res: Response) => {
  const item = {
    id: `exp-${Date.now()}`,
    ...req.body,
    rating: 5.0,
    reviewsCount: 0
  };
  experiences.unshift(item);
  return res.status(201).json(item);
};
