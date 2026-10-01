import { Request, Response } from 'express';

let expenses = [
  { id: 'exp-1', title: 'Chennai to Mahabalipuram AC Cab', category: 'Transport', amount: 1450, date: 'Today, 09:00 AM' },
  { id: 'exp-2', title: 'Traditional Banana Leaf Lunch', category: 'Food', amount: 520, date: 'Today, 01:15 PM' },
  { id: 'exp-3', title: 'UNESCO Monument Entry Passes', category: 'Tickets', amount: 200, date: 'Today, 10:45 AM' },
  { id: 'exp-4', title: 'Hand-carved Stone Souvenir', category: 'Shopping', amount: 650, date: 'Today, 04:00 PM' },
  { id: 'exp-5', title: 'Morning Filter Coffee & Snacks', category: 'Food', amount: 180, date: 'Today, 08:30 AM' },
  { id: 'exp-6', title: 'Heritage Audio Guide & Entry', category: 'Activities', amount: 420, date: 'Today, 11:30 AM' }
];

export const getExpenses = async (_req: Request, res: Response) => {
  return res.json(expenses);
};

export const createExpense = async (req: Request, res: Response) => {
  const { title, category, amount, notes } = req.body;
  if (!title || !amount) {
    return res.status(400).json({ message: 'Title and amount required' });
  }

  const newExp = {
    id: `exp-${Date.now()}`,
    title,
    category: category || 'Food',
    amount: parseFloat(amount),
    date: 'Just now',
    notes
  };

  expenses.unshift(newExp);
  return res.status(201).json(newExp);
};
