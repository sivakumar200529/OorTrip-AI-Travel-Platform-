import { Request, Response } from 'express';

let reviews = [
  {
    id: 'rev-1',
    destinationId: 'mahabalipuram',
    author: 'Karthik Raman',
    rating: 5,
    comment: 'The sunrise view of the Shore Temple is pure magic. Followed OorTrip AI recommendation to arrive at 6:30 AM and had the ocean stones entirely to myself!',
    sentiment: 'positive',
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    destinationId: 'mahabalipuram',
    author: 'Ananya Sharma',
    rating: 4,
    comment: 'Breathtaking Pallava sculptures! Parking near Five Rathas was slightly tight around noon, but stone carving workshops made the walk worthwhile.',
    sentiment: 'issue',
    date: '1 week ago'
  }
];

export const getReviews = async (req: Request, res: Response) => {
  const destId = req.query.destinationId as string;
  if (destId) {
    return res.json(reviews.filter((r) => r.destinationId === destId));
  }
  return res.json(reviews);
};

export const createReview = async (req: Request, res: Response) => {
  const { destinationId, author, rating, comment } = req.body;
  const newRev = {
    id: `rev-${Date.now()}`,
    destinationId: destinationId || 'mahabalipuram',
    author: author || 'Siva',
    rating: rating || 5,
    comment: comment || 'Wonderful experience',
    sentiment: comment?.toLowerCase().includes('crowd') || comment?.toLowerCase().includes('parking') ? 'issue' : 'positive',
    date: 'Just now'
  };
  reviews.unshift(newRev);
  return res.status(201).json(newRev);
};
