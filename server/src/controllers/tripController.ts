import { Request, Response } from 'express';
import { generateSmartTamilNaduItinerary } from '../services/plannerEngine';

let storedTrips: any[] = [];

export const generateTrip = async (req: Request, res: Response) => {
  const {
    startingLocation,
    destination,
    daysCount,
    budget,
    interests,
    travelGroup,
    transportPreference,
    foodPreference,
    accessibility
  } = req.body;

  const itinerary = generateSmartTamilNaduItinerary({
    startingLocation: startingLocation || 'Chennai',
    destination: destination || 'Mahabalipuram & Beyond',
    daysCount: Number(daysCount) || 2,
    budget: Number(budget) || 5000,
    interests,
    travelGroup,
    transportPreference,
    foodPreference,
    accessibility
  });

  storedTrips.unshift(itinerary);
  return res.status(201).json(itinerary);
};

export const getTrips = async (_req: Request, res: Response) => {
  return res.json(storedTrips);
};

export const getTripById = async (req: Request, res: Response) => {
  const trip = storedTrips.find((t) => t.id === req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  return res.json(trip);
};

export const updateTrip = async (req: Request, res: Response) => {
  const index = storedTrips.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Trip not found' });
  storedTrips[index] = { ...storedTrips[index], ...req.body };
  return res.json(storedTrips[index]);
};
