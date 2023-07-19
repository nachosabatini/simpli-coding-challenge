import { Request, Response } from 'express';
import Lead from '../models/Lead';

// Create a new lead
export const createLead = async (req: Request, res: Response) => {
  const { name, email, phone, product } = req.body;

  try {
    const lead = new Lead({
      name,
      email,
      phone,
      product,
    });
    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();

    res.json({
      leads: leads,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
