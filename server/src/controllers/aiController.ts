import { Request, Response } from 'express';
import { aiService } from '../services/aiService';

export const chat = async (req: Request, res: Response) => {
  const { prompt, context } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt required' });
  const result = await aiService.chat(prompt, context);
  return res.json(result);
};

export const recommend = async (req: Request, res: Response) => {
  const { preferences, location } = req.body;
  const reply = `Based on your interest in ${preferences?.join(', ') || 'heritage and culture'}, I recommend visiting Shore Temple at 07:00 AM, followed by a filter coffee walk in Mylapore.`;
  return res.json({
    recommendations: [
      { name: 'Shore Temple', rating: 4.8, category: 'Heritage', timing: '06:30 AM' },
      { name: 'Sadras Dutch Fort', rating: 4.6, category: 'Heritage', timing: '11:00 AM' },
      { name: 'Brihadeeswara Big Temple', rating: 4.9, category: 'Heritage', timing: '04:30 PM' },
    ],
    rationale: reply
  });
};

export const itinerary = async (req: Request, res: Response) => {
  const result = await aiService.generateItinerary(req.body);
  return res.json(result);
};
