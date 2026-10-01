import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'oortrip_super_secret_jwt_key_hackathon_2026_tn';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password required' });
  }

  const assignedRole = role || 'tourist';
  const token = jwt.sign(
    { id: `user-${Date.now()}`, email, role: assignedRole },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(201).json({
    user: {
      id: `user-${Date.now()}`,
      name,
      email,
      role: assignedRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      points: 500,
      ecoScore: 85
    },
    token
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  const assignedRole = role || (email.includes('admin') ? 'admin' : email.includes('business') ? 'business' : 'tourist');
  const token = jwt.sign(
    { id: `user-${Date.now()}`, email, role: assignedRole },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    user: {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: assignedRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      points: 1250,
      ecoScore: 92
    },
    token
  });
};
