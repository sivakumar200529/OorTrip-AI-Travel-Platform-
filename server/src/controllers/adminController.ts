import { Request, Response } from 'express';

export const getAnalytics = async (_req: Request, res: Response) => {
  return res.json({
    kpis: {
      totalTourists: 428950,
      activeTrips: 3842,
      popularDestination: 'Mahabalipuram',
      verifiedBusinesses: 1280,
      averageRating: 4.86,
      artisanDispersalRevenue: '₹1.84 Cr'
    },
    monthlyVisits: [
      { month: 'Jan', domestic: 38000, international: 12000 },
      { month: 'Feb', domestic: 42000, international: 14000 },
      { month: 'Mar', domestic: 35000, international: 9000 },
      { month: 'Apr', domestic: 28000, international: 6000 },
      { month: 'May', domestic: 31000, international: 5000 },
      { month: 'Jun', domestic: 34000, international: 7000 },
      { month: 'Jul', domestic: 39000, international: 8500 },
      { month: 'Aug', domestic: 44000, international: 11000 },
      { month: 'Sep', domestic: 48000, international: 13500 },
      { month: 'Oct', domestic: 58000, international: 18000 },
    ],
    destinationPopularity: [
      { name: 'Mahabalipuram', visits: 88400 },
      { name: 'Madurai', visits: 76200 },
      { name: 'Thanjavur', visits: 64100 },
      { name: 'Kanchipuram', visits: 58300 },
      { name: 'Ooty', visits: 52900 },
      { name: 'Pondicherry', visits: 49800 },
      { name: 'Rameswaram', visits: 44200 },
    ],
    touristInterests: [
      { name: 'Temples & Shrines', value: 42 },
      { name: 'Heritage Architecture', value: 28 },
      { name: 'Gastronomy & Messes', value: 16 },
      { name: 'Hill Stations & Lakes', value: 10 },
      { name: 'Artisan Workshops', value: 4 },
    ]
  });
};
